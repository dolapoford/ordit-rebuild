import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

/** Text input. Not yet in design.md (§10.2) — built from existing tokens
 *  rather than a one-off value: neutral-200 border, radius/lg, Site/Body S
 *  type, and the global 2px violet focus ring already defined for :focus-visible. */
function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "type-body-s w-full rounded-lg border border-neutral-200 bg-white px-4 py-[13px] text-ink transition-colors duration-150 ease-out placeholder:text-neutral-400 hover:border-neutral-300 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
