import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

/** Multi-line text input — same tokens as Input, taller and resizable
 *  vertically only so the layout can't be broken sideways. */
function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "type-body-s min-h-36 w-full resize-y rounded-lg border border-neutral-200 bg-white px-4 py-[13px] text-ink transition-colors duration-150 ease-out placeholder:text-neutral-400 hover:border-neutral-300 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
