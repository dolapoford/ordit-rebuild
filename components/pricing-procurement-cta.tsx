import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Pricing page — light banner strip for firms with a formal buying
 *  process: the security.png artwork bleeds off the left edge, copy sits
 *  beside it, and a single "Talk to us" button closes the row. */
export function PricingProcurementCta() {
  return (
    <section className="site-gutter bg-white pb-20 lg:pb-32">
      <div className="relative mx-auto flex max-w-[1280px] flex-col gap-6 overflow-hidden rounded-xl bg-neutral-25 px-8 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-8 sm:pl-[13rem]">
        <Image
          src="/security.png"
          alt=""
          aria-hidden
          width={1234}
          height={1140}
          className="pointer-events-none absolute -left-20 top-1/2 hidden w-[220px] -translate-y-1/2 opacity-70 sm:block"
        />

        <div className="relative max-w-[38rem]">
          <h2 className="type-h3 text-ink">
            Larger firm, or a formal procurement process?
          </h2>
          <p className="type-body-s mt-2 text-body">
            Annual invoicing, security review, and answers to your
            questionnaire before you commit.
          </p>
        </div>

        <Link
          href="#contact"
          className={cn(buttonVariants(), "relative shrink-0 max-sm:w-full")}
        >
          Talk to us
        </Link>
      </div>
    </section>
  );
}

export default PricingProcurementCta;
