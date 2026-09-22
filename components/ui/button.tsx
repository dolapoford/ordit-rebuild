import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/**
 * design.md §4.1 — Button.
 * default = Primary (violet), outline = Secondary (1px neutral-200),
 * link = Text (violet). Padding 13px 20px, radius/lg, label Site/Body S Medium.
 * Hover: primary → violet-700; secondary border → neutral-300.
 * Focus: the global 2px violet outline at 2px offset — never removed.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg text-base font-medium leading-[1.55] whitespace-nowrap select-none transition-colors duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-violet text-white hover:bg-violet-700",
        outline:
          "border border-neutral-200 bg-transparent text-ink hover:border-neutral-300",
        secondary:
          "border border-neutral-200 bg-transparent text-ink hover:border-neutral-300",
        link: "bg-transparent text-violet hover:text-violet-700",
        ghost: "bg-transparent text-ink hover:bg-neutral-50",
        destructive:
          "bg-status-bg-rejected text-status-rejected hover:bg-risk-bg-critical",
      },
      size: {
        default: "px-5 py-[13px] [&_svg:not([class*='size-'])]:size-[18px]",
        sm: "px-4 py-2 text-sm [&_svg:not([class*='size-'])]:size-4",
        text: "px-1 py-[13px] [&_svg:not([class*='size-'])]:size-[18px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
