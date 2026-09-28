"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Press } from "@/components/motion/press";

gsap.registerPlugin(useGSAP);

/** Accounting page hero — single column, no product panel. Same vocabulary
 *  as ForFirmsHero/SecurityHero: eyebrow, type-display headline split into
 *  reveal lines, body, CTA pair. */
export function AccountingHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(eyebrowRef.current, { y: 16, autoAlpha: 0, duration: 0.5 }, 0.1)
        .from(
          sectionRef.current?.querySelectorAll(".acct-hero-line") ?? [],
          { yPercent: 100, duration: 0.7, stagger: 0.08 },
          "-=0.25",
        )
        .from(bodyRef.current, { y: 16, autoAlpha: 0, duration: 0.5 }, "-=0.35")
        .from(ctaRef.current, { y: 16, autoAlpha: 0, duration: 0.5 }, "-=0.3");
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="site-gutter relative flex min-h-[560px] items-center overflow-hidden bg-white md:bg-[url('/accounting-bg.png')] md:bg-cover md:bg-right lg:min-h-155"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <p ref={eyebrowRef} className="type-body-s text-neutral-400">
          Module 01 · Accounting
        </p>

        <h1 className="type-display mt-6 max-w-3xl text-ink">
          <span className="block overflow-hidden">
            <span className="acct-hero-line block">Keep the books,</span>
          </span>
          <span className="block overflow-hidden">
            <span className="acct-hero-line block">
              with <span className="text-violet">George</span> in them.
            </span>
          </span>
        </h1>

        <p ref={bodyRef} className="type-body mt-7 max-w-[36rem] text-body">
          George drafts the entry, shows the reasoning and the documents
          behind it, and stops. A named person approves it, and the ledger
          records which of you did what.
        </p>

        <div ref={ctaRef} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Press className="max-sm:w-full">
            <Link href="/sign-up" className={cn(buttonVariants(), "max-sm:w-full")}>
              Start free
              <ArrowRight aria-hidden />
            </Link>
          </Press>
          <Press className="max-sm:w-full">
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "outline" }), "max-sm:w-full")}
            >
              Book a demo
            </Link>
          </Press>
        </div>
      </div>
    </section>
  );
}

export default AccountingHero;
