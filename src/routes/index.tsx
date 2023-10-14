import type { RunInfo } from "@/components/AWA5.0Interpreter";
import {
  State,
  runCode,
  awatismsToAwa,
  awaToAwatisms,
} from "@/components/AWA5.0Interpreter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Accessor, JSX, JSXElement, Setter } from "solid-js";
import { createSignal, onCleanup, onMount, type VoidComponent } from "solid-js";

const TextArea = (
  props: JSX.TextareaHTMLAttributes<HTMLTextAreaElement>
): JSX.Element => {
  return (
    <textarea
      rows="3"
      spellcheck={false}
      {...props}
      class={cn(
        "border-[1px] border-border bg-slate-900 p-1 outline-none transition-colors hover:bg-slate-800 focus:bg-slate-800 focus:border-x-slate-200 disabled:opacity-50 resize",
        props.class
      )}
    />
  );
};

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

  let lastResolve: ((value: string | PromiseLike<string>) => void) | undefined;

  const stopExecution = () => {
    setRunInfo({ ...runInfo(), state: State.Stopped });
    setWaitingForInput(false);

    if (lastResolve) {
      lastResolve("");
    }
  };

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

  const getInput = async (): Promise<string> => {
    setWaitingForInput(true);
    setRunInfo({ ...runInfo(), state: State.Paused });
    return new Promise((resolve) => {
      lastResolve = resolve;
      inputButtonRef!.addEventListener(
        "click",
        () => {
          setWaitingForInput(false);
          setRunInfo({ ...runInfo(), state: State.Running });
          lastResolve = undefined;
          resolve(userInputRef!.value);
        },
        { once: true }
      );
    });
  };

  return (
    <>
      <main class="bg-slate-900 min-h-screen">
        <div class="flex absolute justify-center items-center w-full h-full opacity-30 pointer-events-none">
          <div class="relative">
            <div class="absolute w-[33%] h-[17%] top-[8%] right-[27%] rounded-full rotate-[20deg] cursor-[grabbing] pointer-events-auto" />
            <img
              class="pointer-events-none select-none"
              src="/AWA5.0/jellyAwa.png"
              alt="Jelly art by Sena Bonbon"
            />
          </div>
        </div>
        <div class="flex absolute top-4 right-4 flex-col gap-4">
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
              variant={"outline"}
              disabled={!waitingForInput()}
              onClick={() => {
                setWaitingForInput(false);
              }}
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
              disabled={runInfo().state == State.Running}
            />
          </div>
        </div>
        <div class="absolute bottom-1 left-1">Awa5.0 Logo by Sena Bonbon</div>
      </main>
    </>
  );
};

export default Home;
