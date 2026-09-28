import type { LabelHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

/** Form field label. design.md §10.2 flags form components as not yet in
 *  the system — this borrows the existing type-label token (used for
 *  table headers and footer columns) rather than inventing a new size. */
function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("type-label block text-neutral-400", className)}
      {...props}
    />
  );
}

export { Label };
