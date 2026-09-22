"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Press } from "@/components/motion/press";
import { useBackgroundDrift } from "@/hooks/use-background-drift";

gsap.registerPlugin(useGSAP);

/** For firms page hero — copy on the left over firm-hero.png, whose artwork
 *  sits on the right and fades to near-white where the text lands. */
export function ForFirmsHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(eyebrowRef.current, { y: 16, autoAlpha: 0, duration: 0.5 }, 0.1)
        .from(
          sectionRef.current?.querySelectorAll(".ff-hero-line") ?? [],
          { yPercent: 100, duration: 0.7, stagger: 0.08 },
          "-=0.25",
        )
        .from(bodyRef.current, { y: 16, autoAlpha: 0, duration: 0.5 }, "-=0.35")
        .fromTo(
          primaryRef.current,
          { autoAlpha: 0, y: 10, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 },
          "-=0.3",
        )
        .fromTo(
          secondaryRef.current,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          "-=0.35",
        );
    },
    { scope: sectionRef },
  );

  useBackgroundDrift(sectionRef, { distance: 4 });

  return (
    <section
      ref={sectionRef}
      className="site-gutter relative flex min-h-[560px] items-center overflow-hidden bg-neutral-25 py-16 md:bg-[url('/firm-hero.png')] md:bg-cover md:bg-position-[70%_center] lg:min-h-155 lg:bg-right"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <p ref={eyebrowRef} className="type-label flex items-center gap-3 text-violet">
          For firms
          <span className="h-px w-10 bg-violet" aria-hidden />
        </p>

        <h1 className="type-display mt-6 text-ink">
          <span className="block overflow-hidden">
            <span className="ff-hero-line block">Built for the way</span>
          </span>
          <span className="block overflow-hidden">
            <span className="ff-hero-line block text-violet-700">audit firms actually work.</span>
          </span>
        </h1>

        <p ref={bodyRef} className="type-lead mt-7 max-w-[36rem] text-body">
          Sign in with the identity you already use. Mirror your organisation,
          your roles and your teams. Keep every client and engagement apart —
          and see all of it from one place.
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <div ref={primaryRef}>
            <Press hoverScale={1.03} className="max-sm:w-full">
              <Link href="#contact" className={cn(buttonVariants(), "max-sm:w-full")}>
                Book a demo
                <ArrowRight aria-hidden />
              </Link>
            </Press>
          </div>
          <div ref={secondaryRef}>
            <Press className="max-sm:w-full">
              <Link
                href="#contact"
                className={cn(buttonVariants({ variant: "outline" }), "bg-white max-sm:w-full")}
              >
                Talk to us
              </Link>
            </Press>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForFirmsHero;
