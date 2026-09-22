"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Press } from "@/components/motion/press";
import { useBackgroundDrift } from "@/hooks/use-background-drift";
import { useParallax } from "@/hooks/use-parallax";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** For firms — "Running an RFI?" dark banner card over talk-back.png, with the
 *  talk-file.png artwork bleeding off the bottom edge. Dark ground uses
 *  locked/ink; violet-300 is the designated dark-mode accent (design.md §2.1). */
export function RfiCta() {
  const cardRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: cardRef.current, start: "top 80%", once: true },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        cardRef.current,
        { autoAlpha: 0, scale: 0.98, y: 20 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.7 },
      )
        .from(eyebrowRef.current, { y: 14, autoAlpha: 0, duration: 0.45 }, "-=0.35")
        .from(
          cardRef.current?.querySelectorAll(".rfi-line") ?? [],
          { yPercent: 100, duration: 0.6, stagger: 0.07 },
          "-=0.25",
        )
        .from(bodyRef.current, { y: 12, autoAlpha: 0, duration: 0.4 }, "-=0.3")
        .from(ctaRef.current, { y: 12, autoAlpha: 0, duration: 0.4 }, "-=0.25")
        .fromTo(
          foregroundRef.current,
          { autoAlpha: 0, y: 24, scale: 0.97 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.6 },
          "-=0.3",
        );
    },
    { scope: cardRef },
  );

  useBackgroundDrift(cardRef, { distance: 4 });
  useParallax(foregroundRef, { trigger: cardRef, distance: 20 });

  return (
    <section id="contact" className="site-gutter bg-neutral-25 py-12 lg:py-20">
      <div
        ref={cardRef}
        className="relative mx-auto max-w-[1280px] overflow-hidden rounded-xl bg-ink bg-cover bg-center"
        style={{ backgroundImage: "url(/talk-back.png)" }}
      >
        <div ref={foregroundRef} className="absolute inset-0">
          <Image
            src="/talk-file.png"
            alt=""
            width={1234}
            height={1275}
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-[24%] hidden w-[27%] translate-y-[14%] lg:block"
          />
        </div>

        <div className="relative flex flex-col gap-10 px-6 py-12 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-[8.5%] lg:py-20">
          <div className="max-w-[40rem]">
            <p ref={eyebrowRef} className="type-label flex items-center gap-3 text-violet-300">
              Formal evaluations
              <span className="h-px w-6 bg-violet-300" aria-hidden />
            </p>
            <h2 className="type-h1 mt-5 text-white">
              <span className="block overflow-hidden">
                <span className="rfi-line block">Running an RFI?</span>
              </span>
              <span className="block overflow-hidden">
                <span className="rfi-line block text-violet-300">Send it to us.</span>
              </span>
            </h2>
            <p ref={bodyRef} className="type-lead mt-6 max-w-[34rem] text-white/65">
              We will answer it line by line and arrange a security review
              before you commit to anything.
            </p>
          </div>

          <div ref={ctaRef} className="self-start lg:self-center">
            <Press>
              <Link
                href="#contact"
                className={cn(
                  buttonVariants(),
                  "bg-white text-ink hover:bg-neutral-50 max-sm:w-full",
                )}
              >
                Talk to us
                <ArrowRight aria-hidden />
              </Link>
            </Press>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RfiCta;
