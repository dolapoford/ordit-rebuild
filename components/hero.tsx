"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Link2, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { buttonVariants } from "@/components/ui/button";
import { Press } from "@/components/motion/press";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Three short facts, one line each — details live further down the page.
const FACTS = [
  { icon: FileText, label: "Shows his working" },
  { icon: Link2, label: "Every line attributed" },
  { icon: ShieldCheck, label: "Never signs an opinion" },
];

/**
 * design.md §5.1 — two columns: copy left, product panel right.
 * Eyebrow → headline → body → fact chips → CTA pair. One idea per row, one
 * primary action, and the Attribution Stamp is the only product detail shown.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLUListElement>(null);
  const georgeRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);

  // On-load choreography: eyebrow → headline lines → body → CTA → facts →
  // George → the attribution stamp riding on his panel.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(eyebrowRef.current, { y: 16, autoAlpha: 0, duration: 0.5 }, 0.15)
        .from(
          sectionRef.current?.querySelectorAll(".hero-line") ?? [],
          { yPercent: 100, duration: 0.7, stagger: 0.08 },
          "-=0.25",
        )
        .from(bodyRef.current, { y: 16, autoAlpha: 0, duration: 0.5 }, "-=0.35")
        .from(ctaRef.current, { y: 16, autoAlpha: 0, duration: 0.5 }, "-=0.3")
        .from(factsRef.current, { y: 12, autoAlpha: 0, duration: 0.5 }, "-=0.3")
        .fromTo(
          georgeRef.current,
          { autoAlpha: 0, scale: 0.94, y: 30 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.8 },
          "-=0.4",
        )
        .fromTo(
          stampRef.current,
          { autoAlpha: 0, y: 15, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.6 },
          "-=0.35",
        );
    },
    { scope: sectionRef },
  );

  // Scroll parallax: George drifts a little, his panel's supporting card a
  // little more, keeping the copy column essentially still.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.matchMedia("(max-width: 767px)").matches) return;

      const trigger = { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(georgeRef.current, { y: -20, ease: "none", scrollTrigger: trigger });
      gsap.to(stampRef.current, { y: -36, ease: "none", scrollTrigger: { ...trigger } });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="site-gutter bg-white pb-13 pt-8 lg:pb-[104px] lg:pt-14">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Copy */}
        <div className="flex flex-col">
          <p ref={eyebrowRef} className="type-label text-violet">
            AI preparer for modern audit teams
          </p>

          <h1 className="type-display mt-6 text-ink">
            <span className="block overflow-hidden">
              <span className="hero-line block">George prepares.</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block text-violet">You review.</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block">You sign.</span>
            </span>
          </h1>

          <p ref={bodyRef} className="type-body mt-7 max-w-[30rem] text-body">
            George is an AI preparer, not an AI auditor. He does the work a
            first-year associate does, then he stops. The signature stays
            yours.
          </p>

          {/* Primary first; on mobile both go full width and stack */}
          <div ref={ctaRef} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Press className="max-sm:w-full">
              <Link
                href="/sign-up"
                className={`${buttonVariants()} max-sm:w-full`}
              >
                Start free
                <ArrowRight aria-hidden />
              </Link>
            </Press>
            <Press className="max-sm:w-full">
              <Link
                href="#how-it-works"
                className={`${buttonVariants({ variant: "outline" })} max-sm:w-full`}
              >
                See what George does
              </Link>
            </Press>
          </div>

          <ul ref={factsRef} className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-neutral-200 pt-6">
            {FACTS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="type-caption flex items-center gap-2 text-body"
              >
                <Icon className="size-4 text-violet" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Product panel: George on the AI surface, with the stamp */}
        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
          <div
            ref={georgeRef}
            className="relative flex h-[420px] items-end justify-center overflow-hidden rounded-xl bg-ai-surface sm:h-[500px] lg:h-[580px]"
          >
            <Image
              src="/george.png"
              alt="George, the AI preparer, smiling with arms crossed"
              width={1024}
              height={1536}
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="h-[108%] w-auto max-w-none translate-y-[6%]"
            />
          </div>

          <div
            ref={stampRef}
            className="absolute bottom-6 left-4 w-[260px] shadow-none sm:left-6 lg:-left-8 lg:bottom-12 lg:w-[300px]"
          >
            <Image
              src="/hero-review.png"
              alt="Attribution stamp showing George's prepared work with a timestamp"
              width={900}
              height={369}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
