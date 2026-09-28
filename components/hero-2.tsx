"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { buttonVariants } from "@/components/ui/button";
import { Press } from "@/components/motion/press";

gsap.registerPlugin(useGSAP);

/** Alternate hero — centered "one workbench" layout with the George avatar
 *  and procedure-card mockup. Standalone from `Hero`; nothing here is shared. */
export function Hero2() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(pillRef.current, { y: 16, autoAlpha: 0, duration: 0.5 }, 0.15)
        .from(
          sectionRef.current?.querySelectorAll(".h2-line") ?? [],
          { yPercent: 100, duration: 0.7, stagger: 0.08 },
          "-=0.25",
        )
        .from(bodyRef.current, { y: 16, autoAlpha: 0, duration: 0.5 }, "-=0.35")
        .from(ctaRef.current, { y: 16, autoAlpha: 0, duration: 0.5 }, "-=0.3")
        .from(captionRef.current, { autoAlpha: 0, duration: 0.4 }, "-=0.3")
        .fromTo(
          visualRef.current,
          { autoAlpha: 0, y: 40, scale: 0.97 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.8 },
          "-=0.35",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white bg-[url('/dash-background.png')] bg-cover bg-top pt-16 pb-20 lg:pt-24 lg:pb-28"
    >
      <div className="site-gutter relative mx-auto flex max-w-[1000px] flex-col items-center text-center">
        <div
          ref={pillRef}
          className="flex max-w-full items-center gap-1.5 rounded-full border border-violet-50 bg-white/80 py-1 pr-3 pl-1 shadow-[0_1px_2px_rgba(3,1,36,0.04)] backdrop-blur-sm sm:gap-2 sm:py-1.5 sm:pr-4 sm:pl-1.5"
        >
          <span className="shrink-0 rounded-full bg-violet px-2 py-0.5 text-[10px] leading-[1.4] font-medium text-white sm:type-caption sm:px-2.5 sm:py-0.5">
            New
          </span>
          <span className="flex items-center gap-1 text-xs whitespace-nowrap text-ink sm:type-body-s sm:gap-1.5">
            One workbench for accounting and audit
            <ArrowRight aria-hidden className="size-3 shrink-0 sm:size-3.5" />
          </span>
        </div>

        <h1 className="type-display mt-6 text-ink">
          <span className="block overflow-hidden">
            <span className="h2-line block">Accounting and audit,</span>
          </span>
          <span className="block overflow-hidden">
            <span className="h2-line block text-violet">in one workbench.</span>
          </span>
        </h1>

        <p ref={bodyRef} className="type-body mt-6 max-w-[38rem] text-body">
          Ordit is the enterprise workbench for accountants and auditors, with
          George — an AI — working inside it. Run both modules, or switch one
          off. Either way the judgment stays with the person who signs.
        </p>

        <div ref={ctaRef} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Press hoverScale={1.03}>
            <Link href="/contact" className={buttonVariants()}>
              Book a demo
              <ArrowRight aria-hidden />
            </Link>
          </Press>
          <Press>
            <Link href="/sign-up" className={buttonVariants({ variant: "outline" })}>
              Start free
            </Link>
          </Press>
        </div>

        <p ref={captionRef} className="type-caption mt-4 text-body">
          Free 30-day trial · No card required
        </p>
      </div>

      {/* Product mockup */}
      <div
        ref={visualRef}
        className="relative mx-auto mt-16 w-full max-w-[1000px] px-5 lg:mt-20"
      >
        <div className="overflow-hidden rounded-xl shadow-[0_24px_64px_-20px_rgba(3,1,36,0.22)]">
          <Image
            src="/dashboard-hero.png"
            alt="Revenue recognition procedure reviewed and drafted by George, awaiting sign-off"
            width={1515}
            height={1039}
            priority
            sizes="(min-width: 1024px) 960px, 92vw"
            className="h-auto w-full"
          />
        </div>

        {/* George avatar + label, overlapping the card's top-right corner */}
        <div className="absolute -top-10 right-2 flex items-center gap-3 sm:right-6 lg:-top-12 lg:right-10">
          <div className="relative">
            <Image
              src="/geogre-profile.png"
              alt="George, the AI audit partner"
              width={220}
              height={220}
              className="size-16 rounded-full object-cover shadow-[0_8px_20px_-6px_rgba(3,1,36,0.25)] sm:size-20"
            />
            <span className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full bg-white shadow-[0_2px_6px_rgba(3,1,36,0.15)]">
              <Sparkles aria-hidden className="size-3.5 text-violet" />
            </span>
          </div>
          <div className="hidden rounded-xl border border-neutral-100 bg-white px-4 py-2 shadow-[0_12px_28px_-12px_rgba(3,1,36,0.12)] sm:block">
            <p className="type-body-s flex items-center gap-1.5 font-medium text-ink">
              <span className="size-1.5 rounded-full bg-violet" aria-hidden />
              George
            </p>
            <p className="type-caption text-body">Your AI preparer — <br/>in the ledger and the audit file.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero2;
