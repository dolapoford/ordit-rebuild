import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Press } from "@/components/motion/press";

type CtaAction = {
  label: string;
  href: string;
  /** Show the trailing arrow icon. Defaults to true. */
  icon?: boolean;
};

type CtaPanelProps = {
  heading: ReactNode;
  /** Omit for a heading-only panel. */
  description?: ReactNode;
  primary: CtaAction;
  secondary: CtaAction;
  /** Panel background — an image URL, a flat colour, or any CSS value. */
  panelClassName?: string;
  panelStyle?: CSSProperties;
};

/** Reusable closing-CTA panel: centred heading, supporting line and a
 *  primary/secondary pill pair, over a caller-supplied panel background.
 *  Used for the homepage close and can be reused wherever a page needs
 *  its own closing pitch (e.g. the security page's "request the pack"). */
export function CtaPanel({
  heading,
  description,
  primary,
  secondary,
  panelClassName,
  panelStyle,
}: CtaPanelProps) {
  return (
    <section
      id="contact"
      className="site-gutter site-section scroll-mt-24 bg-white"
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1280px] flex-col items-center rounded-xl px-6 py-20 text-center sm:py-28 lg:py-36",
          panelClassName,
        )}
        style={panelStyle}
      >
        <h2 className="type-h2 max-w-[44rem] text-ink">{heading}</h2>

        {description && (
          <p className="type-body mt-6 max-w-[28rem] text-body">
            {description}
          </p>
        )}

        <div className="mt-10 flex flex-col gap-3 max-sm:w-full sm:flex-row sm:items-center">
          <Press hoverScale={1.03} className="max-sm:w-full">
            <Link
              href={primary.href}
              className={cn(buttonVariants(), "px-8 max-sm:w-full")}
            >
              {primary.label}
              {primary.icon !== false && <ArrowRight aria-hidden />}
            </Link>
          </Press>
          <Press className="max-sm:w-full">
            <Link
              href={secondary.href}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "bg-white px-8 max-sm:w-full",
              )}
            >
              {secondary.label}
              {secondary.icon && <ArrowRight aria-hidden />}
            </Link>
          </Press>
        </div>
      </div>
    </section>
  );
}

export default CtaPanel;
