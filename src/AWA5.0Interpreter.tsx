import type { Accessor, Setter } from "solid-js";
import { boolean } from "zod";

export enum awatisms {
  "nop" = 0,
  "prn" = 1,
  "pr1" = 2,
  "red" = 3,
  "r3d" = 4,
  "blo" = 5,
  "sbm" = 6,
  "pop" = 7,
  "dpl" = 8,
  "srn" = 9,
  "mrg" = 10,
  "4dd" = 11,
  "sub" = 12,
  "mul" = 13,
  "div" = 14,
  "cnt" = 15,
  "lbl" = 16,
  "jmp" = 17,
  "eql" = 18,
  "lss" = 19,
  "gr8" = 20,
  "clr" = 29,
  "slp" = 30,
  "trm" = 31,
}

function ReadAwaTalk(awaBlock: string): number[] {
  const commands: number[] = [];

  //Clean the input, including caps-cleaning
  const cleanedAwas = awaBlock
    .replace(/[^aw]+/gi, "")
    .toLowerCase()
    .replaceAll("aa", "a a");

  //Find the first awa
  let awaIndex = 0;
  for (; awaIndex < cleanedAwas.length - 3; awaIndex++) {
    if (cleanedAwas.substr(awaIndex, 3) == "awa") {
      awaIndex += 3;
      break;
    }
  }
  if (awaIndex >= cleanedAwas.length - 3) return commands;

  //Continue from there
  let bitCounter = 0;
  let targetBit = 5;
  let newValue = 0;

  let param = false;
  let signed = false; //Not implemented yet

  while (awaIndex < cleanedAwas.length - 1) {
    //Determine if it's 0, 1 or error
    if (cleanedAwas.substr(awaIndex, 2) == "wa") {
      //Set the newValue to all 0b1's if it's a signed negative number
      if (bitCounter == 0 && signed) {
        newValue = -1;
      } else {
        newValue <<= 1;
        newValue += 1;
      }
      awaIndex += 2;
      bitCounter++;
    } else if (
      awaIndex < cleanedAwas.length - 3 &&
      cleanedAwas.substr(awaIndex, 4) == " awa"
    ) {
      bitCounter++;
      newValue <<= 1;
      awaIndex += 4;
    } else {
      //Incorrect formatting, we'll just keep stepping til the awas are aligned
      awaIndex++;
    }

    //When the correct bit count is reached, add the new command or parameter
    if (bitCounter >= targetBit) {
      //signed/unsigned are handled automatically due to two's complement format
      commands.push(newValue);

      //clean up
      bitCounter = 0;
      if (param) {
        targetBit = 5;
        param = false;
        signed = false;
      } else {
        //determine what to do here
        switch (newValue) {
          case awatisms.blo:
          case awatisms.sbm:
          case awatisms.srn:
          case awatisms.lbl:
          case awatisms.jmp:
            //idk, fill in later, I'm out of time
            if (newValue == awatisms.blo) {
              targetBit = 8;
              signed = true;
            } else {
              targetBit = 5;
              signed = false;
            }
            param = true;
            break;
          default:
            //values are already correct, no change
            break;
        }
      }
      newValue = 0;
    }
  }

  return commands;
}

export enum State {
  Stopped,
  Paused,
  Running,
}

export type RunInfo = {
  state: State;
  startTime: number;
  timeMillis: number;
};

export type Bubble = number | Bubble[];

function isDouble(bubble: Bubble) {
  return Array.isArray(bubble);
}

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function runCode(
  codeStr: string,
  writeToOutput: (str: string) => void,
  setOutput: (str: string) => void,
  getInput: () => Promise<string>,
  info: Accessor<RunInfo>,
  setState: Setter<RunInfo>
) {
  const stop = () => setState({ ...info(), state: State.Stopped });
  const commandsList = ReadAwaTalk(codeStr);

  //Do initial code check for lbls
  const lblTable: number[] = [];
  const bubbleAbyss: Bubble[] = [];

  // let commandsCount = 0;
  for (let i = 0; i < commandsList.length; i++) {
    // commandsCount++;
    switch (commandsList[i]) {
      case awatisms.lbl:
        //Main case to catch, store in table
        lblTable[commandsList[i + 1]] = i + 1; //store position of label under the label parameter tag
        i++;
        break;
      case awatisms.blo:
      case awatisms.sbm:
      case awatisms.srn:
      case awatisms.jmp:
        i++;
        break;
      default:
        break;
    }
  }

  //step through each
  let i = 0;
  // let commandTime = 0;
  let executed = 0;
  while (i < commandsList.length && info().state != State.Stopped) {
    executed++;
    if (executed == 5000) {
      await timeout(0);
      executed = 0;
    }

    switch (commandsList[i]) {
      case awatisms.nop: {
        break;
      }

      case awatisms.prn: {
        const bubble = bubbleAbyss.pop();
        if (typeof bubble === "undefined") break;
        writeToOutput(printBubble("", bubble, false));
        break;
      }

      case awatisms.pr1: {
        const bubble = bubbleAbyss.pop();
        if (typeof bubble === "undefined") break;
        writeToOutput(printBubble("", bubble, true));
        break;
      }

      case awatisms.red: {
        const input = await getInput();
        const newBubble = [];
        for (let j = input.length - 1; j >= 0; j--) {
          const awaVal = AwaSCII.indexOf(input.substr(j, 1));
          if (awaVal != -1) newBubble.push(awaVal);
        }
        //read as characters
        bubbleAbyss.push(newBubble);
        break;
      }

      case awatisms.r3d: {
        const input = await getInput();
        //read single number, assume it's clean enough
        const num = parseInt(input);
        bubbleAbyss.push(num);
        break;
      }

      case awatisms.blo: {
        i++;
        bubbleAbyss.push(commandsList[i]);
        break;
      }

      case awatisms.sbm: {
        i++;
        const bubble = bubbleAbyss.pop();
        if (typeof bubble === "undefined") break;

        if (commandsList[i] == 0) {
          bubbleAbyss.unshift(bubble);
        } else {
          bubbleAbyss.splice(bubbleAbyss.length - commandsList[i], 0, bubble);
        }
        break;
      }

      case awatisms.pop: {
        const bubble = bubbleAbyss.pop();
        if (typeof bubble === "undefined") break;
        if (isDouble(bubble)) {
          while (true) {
            const shifted = (bubble as Bubble[]).shift();
            if (typeof shifted === "undefined") break;
            bubbleAbyss.push(shifted);
          }
        }
        break;
      }

      case awatisms.dpl: {
        const newBubble = structuredClone(bubbleAbyss[bubbleAbyss.length - 1]);
        bubbleAbyss.push(newBubble);
        break;
      }

      case awatisms.srn: {
        i++;
        const newBubble: Bubble[] = [];
        for (let j = 0; j < commandsList[i]; j++) {
          const bubble = bubbleAbyss.pop();
          if (typeof bubble === "undefined") break;
          newBubble.unshift(bubble);
        }
        bubbleAbyss.push(newBubble);
        break;
      }

      case awatisms.mrg: {
        const bubble1 = bubbleAbyss.pop();
        const bubble2 = bubbleAbyss.pop();

        if (typeof bubble1 === "undefined" || typeof bubble2 === "undefined")
          break;

        const b1IsDouble = isDouble(bubble1);
        const b2IsDouble = isDouble(bubble2);

        if (!b1IsDouble && !b2IsDouble) {
          const newBubble = [];
          newBubble.push(bubble2);
          newBubble.push(bubble1);

          bubbleAbyss.push(newBubble);
        } else if (b1IsDouble && !b2IsDouble) {
          (bubble1 as Bubble[]).unshift(bubble2);
          bubbleAbyss.push(bubble1);
        } else if (!b1IsDouble && b2IsDouble) {
          (bubble2 as Bubble[]).push(bubble1);
          bubbleAbyss.push(bubble2);
        } else {
          while (true) {
            const shifted = (bubble1 as Bubble[]).shift();
            if (typeof shifted === "undefined") break;
            (bubble2 as Bubble[]).push(shifted);
          }
          bubbleAbyss.push(bubble2);
        }

        break;
      }

      case awatisms["4dd"]: {
        const bubble1 = bubbleAbyss.pop();
        const bubble2 = bubbleAbyss.pop();
        if (typeof bubble1 === "undefined" || typeof bubble2 === "undefined")
          break;

        bubbleAbyss.push(addBubbles(bubble1, bubble2));
        break;
      }

      case awatisms.sub: {
        const bubble1 = bubbleAbyss.pop();
        const bubble2 = bubbleAbyss.pop();
        if (typeof bubble1 === "undefined" || typeof bubble2 === "undefined")
          break;

        bubbleAbyss.push(subBubbles(bubble1, bubble2));
        break;
      }

      case awatisms.mul: {
        const bubble1 = bubbleAbyss.pop();
        const bubble2 = bubbleAbyss.pop();
        if (typeof bubble1 === "undefined" || typeof bubble2 === "undefined")
          break;

        bubbleAbyss.push(mulBubbles(bubble1, bubble2));
        break;
      }

      case awatisms.div: {
        const bubble1 = bubbleAbyss.pop();
        const bubble2 = bubbleAbyss.pop();
        if (typeof bubble1 === "undefined" || typeof bubble2 === "undefined")
          break;

        bubbleAbyss.push(divBubbles(bubble1, bubble2));
        break;
      }

      case awatisms.cnt: {
        if (isDouble(bubbleAbyss[bubbleAbyss.length - 1]))
          bubbleAbyss.push(
            (bubbleAbyss[bubbleAbyss.length - 1] as Bubble[]).length
          );
        else bubbleAbyss.push(0);
        break;
      }

      case awatisms.lbl: {
        //No function, skip the parameter
        i++;
        break;
      }

      case awatisms.jmp: {
        i++;
        if (commandsList[i] in lblTable) i = lblTable[commandsList[i]];
        break;
      }

      case awatisms.eql: {
        if (
          !isDouble(bubbleAbyss[bubbleAbyss.length - 1]) &&
          !isDouble(bubbleAbyss[bubbleAbyss.length - 2]) &&
          bubbleAbyss[bubbleAbyss.length - 1] ==
            bubbleAbyss[bubbleAbyss.length - 2]
        ) {
          //True, execute next line
        } else {
          const nextCommand = commandsList[i + 1];
          switch (nextCommand) {
            case awatisms.lbl:
            case awatisms.blo:
            case awatisms.sbm:
            case awatisms.srn:
            case awatisms.jmp:
              i += 2;
              break;
            default:
              i++;
              break;
          }
        }
        break;
      }

      case awatisms.lss: {
        if (
          !isDouble(bubbleAbyss[bubbleAbyss.length - 1]) &&
          !isDouble(bubbleAbyss[bubbleAbyss.length - 2]) &&
          bubbleAbyss[bubbleAbyss.length - 1] <
            bubbleAbyss[bubbleAbyss.length - 2]
        ) {
          //True, execute next line
        } else {
          const nextCommand = commandsList[i + 1];
          switch (nextCommand) {
            case awatisms.lbl:
            case awatisms.blo:
            case awatisms.sbm:
            case awatisms.srn:
            case awatisms.jmp:
              i += 2;
              break;
            default:
              i++;
              break;
          }
        }
        break;
      }

      case awatisms.gr8: {
        if (
          !isDouble(bubbleAbyss[bubbleAbyss.length - 1]) &&
          !isDouble(bubbleAbyss[bubbleAbyss.length - 2]) &&
          bubbleAbyss[bubbleAbyss.length - 1] >
            bubbleAbyss[bubbleAbyss.length - 2]
        ) {
          //True, execute next line
        } else {
          const nextCommand = commandsList[i + 1];
          switch (nextCommand) {
            case awatisms.lbl:
            case awatisms.blo:
            case awatisms.sbm:
            case awatisms.srn:
            case awatisms.jmp:
              i += 2;
              break;
            default:
              i++;
              break;
          }
        }
        break;
      }

      case awatisms.clr: {
        setOutput("");
        break;
      }

      case awatisms.slp: {
        const bubble = bubbleAbyss.pop();
        if (typeof bubble === "undefined") break;
        if (isDouble(bubble)) break;

        await timeout(bubble as number);
        break;
      }

      case awatisms.trm: {
        stop();
        break;
      }
    }

    //Next command
    // if (commandsList[i] != awatisms.lbl) commandTime++;
    i++;
  }

  stop();

  //   "commands: " + commandsCount + "   time: " + commandTime;
}

function addBubbles(bubble1: Bubble, bubble2: Bubble): Bubble {
  const b1IsDouble = isDouble(bubble1);
  const b2IsDouble = isDouble(bubble2);

  if (!b1IsDouble && !b2IsDouble) {
    return (bubble1 as number) + (bubble2 as number);
  } else if (b1IsDouble && !b2IsDouble) {
    const bubble1Arr = bubble1 as Bubble[];

    bubble1Arr.forEach((element, index) => {
      bubble1Arr[index] = addBubbles(element, bubble2);
    });
    return bubble1;
  } else if (!b1IsDouble && b2IsDouble) {
    const bubble2Arr = bubble2 as Bubble[];

    bubble2Arr.forEach((element, index) => {
      bubble2Arr[index] = addBubbles(bubble1, element);
    });
    return bubble2;
  } else {
    const bubble1Arr = bubble1 as Bubble[];
    const bubble2Arr = bubble2 as Bubble[];

    const newBubble = [];
    let i = 0;
    for (; i < bubble1Arr.length && i < bubble2Arr.length; i++)
      newBubble.unshift(
        addBubbles(
          bubble1Arr[bubble1Arr.length - 1 - i],
          bubble2Arr[bubble2Arr.length - 1 - i]
        )
      );

    //leave out any unpaired bubbles
    return newBubble;
  }
}

function subBubbles(bubble1: Bubble, bubble2: Bubble): Bubble {
  const b1IsDouble = isDouble(bubble1);
  const b2IsDouble = isDouble(bubble2);

  if (!b1IsDouble && !b2IsDouble) {
    return (bubble1 as number) - (bubble2 as number);
  } else if (b1IsDouble && !b2IsDouble) {
    const bubble1Arr = bubble1 as Bubble[];

    bubble1Arr.forEach((element, index) => {
      bubble1Arr[index] = subBubbles(element, bubble2);
    });
    return bubble1;
  } else if (!b1IsDouble && b2IsDouble) {
    const bubble2Arr = bubble2 as Bubble[];

    bubble2Arr.forEach((element, index) => {
      bubble2Arr[index] = subBubbles(bubble1, element);
    });
    return bubble2;
  } else {
    const bubble1Arr = bubble1 as Bubble[];
    const bubble2Arr = bubble2 as Bubble[];

    const newBubble = [];
    let i = 0;
    for (; i < bubble1Arr.length && i < bubble2Arr.length; i++)
      newBubble.unshift(
        subBubbles(
          bubble1Arr[bubble1Arr.length - 1 - i],
          bubble2Arr[bubble2Arr.length - 1 - i]
        )
      );

    //leave out any unpaired bubbles
    return newBubble;
  }
}

function mulBubbles(bubble1: Bubble, bubble2: Bubble): Bubble {
  const b1IsDouble = isDouble(bubble1);
  const b2IsDouble = isDouble(bubble2);

  if (!b1IsDouble && !b2IsDouble) {
    return (bubble1 as number) * (bubble2 as number);
  } else if (b1IsDouble && !b2IsDouble) {
    const bubble1Arr = bubble1 as Bubble[];

    bubble1Arr.forEach((element, index) => {
      bubble1Arr[index] = mulBubbles(element, bubble2);
    });
    return bubble1;
  } else if (!b1IsDouble && b2IsDouble) {
    const bubble2Arr = bubble2 as Bubble[];

    bubble2Arr.forEach((element, index) => {
      bubble2Arr[index] = mulBubbles(bubble1, element);
    });
    return bubble2;
  } else {
    const bubble1Arr = bubble1 as Bubble[];
    const bubble2Arr = bubble2 as Bubble[];

    const newBubble = [];
    let i = 0;
    for (; i < bubble1Arr.length && i < bubble2Arr.length; i++)
      newBubble.unshift(
        mulBubbles(
          bubble1Arr[bubble1Arr.length - 1 - i],
          bubble2Arr[bubble2Arr.length - 1 - i]
        )
      );

    //leave out any unpaired bubbles
    return newBubble;
  }
}

function divBubbles(bubble1: Bubble, bubble2: Bubble): Bubble {
  const b1IsDouble = isDouble(bubble1);
  const b2IsDouble = isDouble(bubble2);

  const newDivBubble = [];

  if (!b1IsDouble && !b2IsDouble) {
    const bubble1Num = bubble1 as number;
    const bubble2Num = bubble2 as number;

    newDivBubble.push(bubble1Num % bubble2Num);
    const temp = bubble1Num / bubble2Num;
    newDivBubble.push(Math[temp < 0 ? "ceil" : "floor"](temp));
    return newDivBubble;
  } else if (b1IsDouble && !b2IsDouble) {
    const bubble1Arr = bubble1 as Bubble[];

    bubble1Arr.forEach((element, index) => {
      bubble1Arr[index] = divBubbles(element, bubble2);
    });
    return bubble1;
  } else if (!b1IsDouble && b2IsDouble) {
    const bubble2Arr = bubble2 as Bubble[];

    bubble2Arr.forEach((element, index) => {
      bubble2Arr[index] = divBubbles(bubble1, element);
    });
    return bubble2;
  } else {
    const bubble1Arr = bubble1 as Bubble[];
    const bubble2Arr = bubble2 as Bubble[];

    const newBubble = [];
    let i = 0;
    for (; i < bubble1Arr.length && i < bubble2Arr.length; i++)
      newBubble.unshift(
        divBubbles(
          bubble1Arr[bubble1Arr.length - 1 - i],
          bubble2Arr[bubble2Arr.length - 1 - i]
        )
      );

    //leave out any unpaired bubbles
    return newBubble;
  }
}

const AwaSCII =
  "AWawJELYHOSIUMjelyhosiumPCNTpcntBDFGRbdfgr0123456789 .,!'()~_/;\n"; //???

function printBubble(
  currentString: string,
  bubble: Bubble,
  numbersOut: boolean
) {
  if (!isDouble(bubble)) {
    const bubbleNum = bubble as number;
    if (numbersOut) {
      //print number directly
      currentString += bubbleNum + " ";
      // writeToOutput(bubbleNum + " ");
    } else {
      //use AwaSCII
      if (bubbleNum >= 0 && bubbleNum < AwaSCII.length) {
        currentString += AwaSCII[bubbleNum];
        // writeToOutput(AwaSCII[bubbleNum]);
      }
    }
  } else {
    const bubbleArr = bubble as Bubble[];
    for (let i = bubbleArr.length - 1; i >= 0; i--) {
      currentString = printBubble(currentString, bubbleArr[i], numbersOut);
    }
    // currentString += " ";
    // writeToOutput(" ");
  }
  return currentString;
}

const numberToAwa = (num: number, bits: number, signed: boolean) => {
  let str = "";
  if (signed) bits--;
  for (let i = 0; i < bits; i++) {
    str = ((num & 1) == 0 ? " awa" : "wa") + str;
    num = num >> 1;
  }
  if (signed) str = (num < 0 ? "wa" : " awa") + str;
  return str;
};

export const awatismsToAwa = (str: string) => {
  const lines = str.split("\n");
  let ret = "awa";
  for (let line of lines) {
    line = line.trimStart();
    const indexOfHash = line.indexOf("#");
    if (indexOfHash !== -1) {
      line = line.substring(0, indexOfHash);
    }
    const [insText, val] = [line.substring(0, 3), line.substring(4)];

    if (insText === "") continue;
    const ins = awatisms[insText as keyof typeof awatisms];
    if (!ins) continue;
    if (ins !== awatisms.blo) ret += "\n " + numberToAwa(ins, 5, false);

    if (val === "") {
      continue;
    }

    if (ins == awatisms.blo) {
      if (val.startsWith('"')) {
        const indexOfClosingQoutes = val.substring(1).indexOf('"');
        if (indexOfClosingQoutes !== -1 && val.length > 2) {
          const modifiers = { reverse: false, surround: false };
          const possibleModifiers = val.substring(indexOfClosingQoutes + 2);
          for (const mod of possibleModifiers) {
            if (mod == "r") modifiers.reverse = true;
            if (mod == "s") modifiers.surround = true;
          }

          const letters = val
            .substring(1, indexOfClosingQoutes + 1)
            .replaceAll(/\\n/g, "\n")
            .split("")
            .filter((letter) => AwaSCII.indexOf(letter) !== -1);
          if (modifiers.reverse) letters.reverse();

          let counter = 0;
          let needMerge = false;
          for (const letter of letters) {
            ret += "\n " + numberToAwa(awatisms.blo, 5, false);
            ret += numberToAwa(AwaSCII.indexOf(letter), 8, true);
            counter++;
            if (modifiers.surround && counter === 31) {
              ret += "\n " + numberToAwa(awatisms.srn, 5, false);
              ret += numberToAwa(31, 5, false);
              if (needMerge) ret += "\n " + numberToAwa(awatisms.mrg, 5, false);
              needMerge = true;
              counter = 0;
            }
          }
          if (modifiers.surround && counter !== 0) {
            ret += "\n " + numberToAwa(awatisms.srn, 5, false);
            ret += numberToAwa(counter, 5, false);
            if (needMerge) ret += "\n " + numberToAwa(awatisms.mrg, 5, false);
          }
        }
      } else {
        let num = parseInt(val);
        if (num >= -128 && num <= 127) {
          ret += "\n " + numberToAwa(awatisms.blo, 5, false);
          ret += numberToAwa(parseInt(val), 8, true);
        } else {
          let counter = 0;
          let hasNumber = false;
          const sign = Math.sign(num);
          num = Math.abs(num);
          while (num > 0) {
            const currentNum = num & 63;
            if (currentNum !== 0) {
              ret += "\n " + numberToAwa(awatisms.blo, 5, false);
              ret += numberToAwa(currentNum, 8, true);
              for (let i = 0; i < counter; i++) {
                ret += "\n " + numberToAwa(awatisms.blo, 5, false);
                ret += numberToAwa(64, 8, true);
                ret += "\n " + numberToAwa(awatisms.mul, 5, false);
              }
              if (hasNumber)
                ret += "\n " + numberToAwa(awatisms["4dd"], 5, false);
              hasNumber = true;
            }
            counter++;
            num = num >> 6;
          }
          if (sign < 0) {
            ret += "\n " + numberToAwa(awatisms.blo, 5, false);
            ret += numberToAwa(-1, 8, true);
            ret += "\n " + numberToAwa(awatisms.mul, 5, false);
          }
        }
      }
    }

    if (
      ins == awatisms.sbm ||
      ins == awatisms.srn ||
      ins == awatisms.lbl ||
      ins == awatisms.jmp
    ) {
      ret += numberToAwa(parseInt(val), 5, false);
    }
  }

  return ret;
};

export const awaToAwatisms = (str: string): string => {
  const cleaned = str
    .replace(/[^aw]+/gi, "")
    .toLowerCase()
    .replaceAll("aa", "a a");
  const indexOfFirstAwa = cleaned.indexOf("awa");

  if (indexOfFirstAwa == -1) return "";

  const codeOf0 = "0".charCodeAt(0);
  const arr = cleaned
    .substring(indexOfFirstAwa + 3)
    .replaceAll(" awa", "0")
    .replaceAll("wa", "1")
    .split("")
    .map((s) => s.charCodeAt(0) - codeOf0);

  const commands: number[] = [];
  let readingAwatism = true;
  let readingSign = false;
  let bitsToRead = 5;
  let currentNumber = 0;
  for (let i = 0; i < arr.length; i++) {
    bitsToRead--;
    if (readingSign) {
      currentNumber = -arr[i];
      readingSign = false;
    } else {
      currentNumber &= ~(1 << bitsToRead);
      currentNumber |= arr[i] << bitsToRead;
    }
    if (bitsToRead > 0) continue;

    commands.push(currentNumber);
    if (readingAwatism) {
      if (
        currentNumber == awatisms.sbm ||
        currentNumber == awatisms.srn ||
        currentNumber == awatisms.lbl ||
        currentNumber == awatisms.jmp
      ) {
        bitsToRead = 5;
        readingAwatism = false;
        readingSign = false;
      } else if (currentNumber == awatisms.blo) {
        bitsToRead = 8;
        readingAwatism = false;
        readingSign = true;
      } else {
        bitsToRead = 5;
        readingAwatism = true;
        readingSign = false;
      }
    } else {
      bitsToRead = 5;
      readingAwatism = true;
      readingSign = false;
    }
    currentNumber = 0;
  }

  // const commands = ReadAwaTalk(str);
  let text = "";

  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];

    text += awatisms[cmd];

    if (
      cmd == awatisms.sbm ||
      cmd == awatisms.srn ||
      cmd == awatisms.lbl ||
      cmd == awatisms.jmp ||
      cmd == awatisms.blo
    ) {
      i++;
      text += " " + commands[i];
    }

    text += "\n";
  }

  return text;
};
