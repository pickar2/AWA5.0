import { cn } from "@/lib/utils";
import type { JSX } from "solid-js";

export const TextArea = (
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
