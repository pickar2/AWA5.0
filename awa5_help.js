var Insn;
(function (Insn) {
  Insn[(Insn["nop"] = 0)] = "nop";
  Insn[(Insn["prn"] = 1)] = "prn";
  Insn[(Insn["pr1"] = 2)] = "pr1";
  Insn[(Insn["red"] = 3)] = "red";
  Insn[(Insn["r3d"] = 4)] = "r3d";
  Insn[(Insn["blo"] = 5)] = "blo";
  Insn[(Insn["sbm"] = 6)] = "sbm";
  Insn[(Insn["pop"] = 7)] = "pop";
  Insn[(Insn["dpl"] = 8)] = "dpl";
  Insn[(Insn["srn"] = 9)] = "srn";
  Insn[(Insn["mrg"] = 10)] = "mrg";
  Insn[(Insn["4dd"] = 11)] = "4dd";
  Insn[(Insn["sub"] = 12)] = "sub";
  Insn[(Insn["mul"] = 13)] = "mul";
  Insn[(Insn["div"] = 14)] = "div";
  Insn[(Insn["cnt"] = 15)] = "cnt";
  Insn[(Insn["lbl"] = 16)] = "lbl";
  Insn[(Insn["jmp"] = 17)] = "jmp";
  Insn[(Insn["eql"] = 18)] = "eql";
  Insn[(Insn["lss"] = 19)] = "lss";
  Insn[(Insn["gr8"] = 20)] = "gr8";
  Insn[(Insn["trm"] = 31)] = "trm";
})(Insn || (Insn = {}));

const AwaSCII2 =
  "AWawJELYHOSIUMjelyhosiumPCNTpcntBDFGRbdfgr0123456789 .,!'()~_/;\n";

const numberToAwa = (num, bits, signed) => {
  let str = "";
  if (signed) bits--;
  for (let i = 0; i < bits; i++) {
    str = ((num & 1) == 0 ? " awa" : "wa") + str;
    num = num >> 1;
  }
  if (signed) str = (num < 0 ? "wa" : " awa") + str;
  return str;
};

const translateToAwa = (str) => {
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
    const ins = Insn[insText];
    if (!ins) continue;
    if (ins !== Insn.blo) ret += "\n " + numberToAwa(ins, 5, false);

    if (val === "") {
      continue;
    }

    if (ins == Insn.blo) {
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
            .split("");
          if (modifiers.reverse) letters.reverse();

          let counter = 0;
          for (const letter of letters) {
            ret += "\n " + numberToAwa(Insn.blo, 5, false);
            ret += numberToAwa(AwaSCII2.indexOf(letter), 8, true);
            counter++;
            if (modifiers.surround && (counter & 31) == 31) {
              ret += "\n " + numberToAwa(Insn.srn, 5, false);
              ret += numberToAwa(31, 5, false);
              if (counter > 31) ret += "\n " + numberToAwa(Insn.mrg, 5, false);
            }
          }
          if (modifiers.surround && (counter & 31) !== 31) {
            ret += "\n " + numberToAwa(Insn.srn, 5, false);
            ret += numberToAwa(letters.length & 31, 5, false);
            if (counter > 31) ret += "\n " + numberToAwa(Insn.mrg, 5, false);
          }
        }
      } else {
        let num = parseInt(val);
        if (num >= -128 && num <= 127) {
          ret += "\n " + numberToAwa(Insn.blo, 5, false);
          ret += numberToAwa(parseInt(val), 8, true);
        } else {
          let counter = 0;
          const sign = Math.sign(num);
          num = Math.abs(num);
          while (num > 0) {
            ret += "\n " + numberToAwa(Insn.blo, 5, false);
            ret += numberToAwa(num & 63, 8, true);
            for (let i = 0; i < counter; i++) {
              ret += "\n " + numberToAwa(Insn.blo, 5, false);
              ret += numberToAwa(64, 8, true);
              ret += "\n " + numberToAwa(Insn.mul, 5, false);
            }
            if (counter > 0) ret += "\n " + numberToAwa(Insn["4dd"], 5, false);
            num = num >> 6;
            counter++;
          }
          if (sign < 0) {
            ret += "\n " + numberToAwa(Insn.blo, 5, false);
            ret += numberToAwa(-1, 8, true);
            ret += "\n " + numberToAwa(Insn.mul, 5, false);
          }
        }
      }
    }

    if (
      ins == Insn.sbm ||
      ins == Insn.srn ||
      ins == Insn.lbl ||
      ins == Insn.jmp
    ) {
      ret += numberToAwa(parseInt(val), 5, false);
    }
  }

  return ret;
};

const updateTranslation = () => {
  const input = document.getElementById("awatismCode");
  const output = document.getElementById("awanaryCode");
  output.value = translateToAwa(input.value);

  const copyCode = document.getElementById("copyCodeAutomatically");
  if (copyCode.checked) {
    document.getElementById("codeField").value = output.value;
  }
};
