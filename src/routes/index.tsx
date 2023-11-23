import type { RunInfo } from "@/AWA5.0Interpreter";
import {
  State,
  runCode,
  awatismsToAwa,
  awaToAwatisms,
} from "@/AWA5.0Interpreter";
import { Header } from "@/components/ui/Header";
import { TextArea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/button";
import type { Accessor, JSXElement, Setter } from "solid-js";
import { createSignal, onCleanup, onMount, type VoidComponent } from "solid-js";

const RunState = (props: {
  info: Accessor<RunInfo>;
  setState: Setter<RunInfo>;
}): JSXElement => {
  let interval: NodeJS.Timeout;

  onMount(() => {
    interval = setInterval(() => {
      const info = props.info();
      if (info.state == State.Running) {
        info.timeMillis = Date.now() - info.startTime;
        props.setState({ ...info });
      }
    }, 10);
  });
  onCleanup(() => clearInterval(interval));

  return (
    <>
      {props.info().state == State.Stopped && <span>Not running</span>}
      {props.info().state == State.Paused && <span>Paused</span>}
      {props.info().state == State.Running && (
        <span>Running for {props.info().timeMillis}ms</span>
      )}
    </>
  );
};

const Home: VoidComponent = () => {
  const [runInfo, setRunInfo] = createSignal<RunInfo>({
    state: State.Stopped,
    startTime: 0,
    timeMillis: 0,
  });
  const [waitingForInput, setWaitingForInput] = createSignal(false);

  let userInputRef: HTMLTextAreaElement | undefined;
  let awaInputRef: HTMLTextAreaElement | undefined;
  let outputRef: HTMLTextAreaElement | undefined;
  let inputButtonRef: HTMLButtonElement | undefined;

  let awatismInputRef: HTMLTextAreaElement | undefined;

  const updateTranslation = () => {
    if (!awatismInputRef || !awaInputRef) return;

    awaInputRef.value = awatismsToAwa(awatismInputRef.value);
  };

  const updateDecompilation = () => {
    if (!awatismInputRef || !awaInputRef) return;

    awatismInputRef.value = awaToAwatisms(awaInputRef.value);
  };

  const writeToOutput = (str: string) => {
    if (!outputRef) return;
    outputRef.value += str;
    outputRef.scrollTop = outputRef.scrollHeight;
  };

  const setOutput = (str: string) => {
    if (!outputRef) return;
    outputRef.value = str;
  };

  let lastResolve: ((value: string | PromiseLike<string>) => void) | undefined;

  const inputCallback = () => {
    if (lastResolve) {
      setWaitingForInput(false);
      setRunInfo({ ...runInfo(), state: State.Running });
      lastResolve(userInputRef!.value);
    }
  };

  const getInput = async (): Promise<string> => {
    setWaitingForInput(true);
    setRunInfo({ ...runInfo(), state: State.Paused });
    return new Promise((resolve) => {
      lastResolve = resolve;
      inputButtonRef!.addEventListener("click", inputCallback, { once: true });
    });
  };

  const stopExecution = () => {
    setRunInfo({ ...runInfo(), state: State.Stopped });
    setWaitingForInput(false);
    inputButtonRef?.removeEventListener("click", inputCallback);

    if (lastResolve) {
      lastResolve("");
    }
  };

  return (
    <>
      <main class="bg-slate-900 min-h-screen">
        <Header />
        <div class="flex absolute justify-center items-center w-full opacity-30 pointer-events-none">
          <div class="relative">
            <div class="opacity-0 absolute w-[33%] h-[17%] top-[8%] right-[27%] rounded-full rotate-[20deg] cursor-[grabbing] pointer-events-auto" />
            <img
              class="pointer-events-none select-none"
              src="/AWA5.0/jellyAwa.png"
              alt="Jelly art by Sena Bonbon"
            />
          </div>
        </div>
        <div class="float-right p-4">
          <TextArea
            ref={awatismInputRef}
            class="w-[500px] resize-y"
            name="awatism-input"
            id="awatism-input"
            rows={10}
            onchange={updateTranslation}
            onkeyup={updateTranslation}
          />
        </div>
        <div class="flex flex-col gap-4 p-4">
          <div class="flex gap-2">
            <TextArea
              ref={userInputRef}
              class="w-[500px]"
              name="user-input"
              id="user-input"
              disabled={!waitingForInput()}
            />
            <Button
              class="w-24"
              variant={"outline"}
              disabled={!waitingForInput()}
              ref={inputButtonRef}
            >
              Input
            </Button>
          </div>
          <div class="flex gap-2">
            <TextArea
              ref={awaInputRef}
              class="w-[500px]"
              name="awa-input"
              id="awa-input"
              disabled={runInfo().state == State.Running}
              onchange={updateDecompilation}
              onkeyup={updateDecompilation}
              value={"awa"}
              placeholder="awa..."
              rows={10}
            />
            <div class="flex flex-col gap-2 justify-center">
              <RunState info={runInfo} setState={setRunInfo} />
              <Button
                class="w-24"
                variant={"outline"}
                disabled={runInfo().state != State.Stopped}
                onclick={() => {
                  if (!awaInputRef || !userInputRef || !outputRef) return;
                  setRunInfo({
                    state: State.Running,
                    startTime: Date.now(),
                    timeMillis: 0,
                  });

                  outputRef.value = "";

                  void runCode(
                    awaInputRef!.value,
                    writeToOutput,
                    setOutput,
                    getInput,
                    runInfo,
                    setRunInfo
                  );
                }}
              >
                Run
              </Button>
              <Button
                class="w-24"
                variant={"outline"}
                disabled={runInfo().state == State.Stopped}
                onclick={stopExecution}
              >
                Stop
              </Button>
            </div>
          </div>
          <div class="flex gap-2">
            <TextArea
              ref={outputRef}
              class="w-[500px]"
              name="output"
              id="output"
              readonly
            />
            <div class="flex flex-col gap-2">
              <Button
                class="w-24"
                variant={"outline"}
                disabled={runInfo().state != State.Stopped}
                onclick={() => {
                  if (outputRef) {
                    outputRef.value = "";
                  }
                }}
              >
                Clear
              </Button>
            </div>
          </div>
          {/* <div class="flex flex-col w-[400px] gap-1">
            <div class="flex flex-row justify-center">
              <TextArea
                class="resize-none h-7 w-12 text-center py-0"
                innerText={"400"}
                maxLength={4}
                oninput={(e) => {
                  const numbers = e.target.value.replace(/\D+/gi, "");
                  e.target.value = numbers;
                }}
              />
              <span class="px-2 select-none">X</span>
              <TextArea
                class="resize-none h-7 w-12 text-center py-0"
                innerText={"300"}
                maxLength={4}
                oninput={(e) => {
                  const numbers = e.target.value.replace(/\D+/gi, "");
                  e.target.value = numbers;
                }}
              />
            </div>
            <div class="flex relative">
              <div class="absolute w-full h-full flex text-center items-center justify-center pointer-events-none">
                <span class="select-none">No content</span>
              </div>

              <canvas
                width={400}
                height={300}
                class="border-[1px] border-border z-10 bg-slate-950/70"
              />
            </div>
          </div> */}
        </div>
        <div class="fixed bottom-1 right-1">Awa5.0 Logo by Sena Bonbon</div>
      </main>
    </>
  );
};

export default Home;
