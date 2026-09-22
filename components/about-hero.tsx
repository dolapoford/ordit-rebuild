"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** About page hero — same eyebrow/headline/body choreography as the
 *  security hero, restrained since this is a statement of purpose, not a
 *  pitch. */
export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const eyebrowTextRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power2.out" }, 0.1)
        .from(eyebrowTextRef.current, { autoAlpha: 0, x: -8, duration: 0.4 }, "-=0.3")
        .from(
          sectionRef.current?.querySelectorAll(".about-hero-line") ?? [],
          { yPercent: 100, duration: 0.7, stagger: 0.08 },
          "-=0.15",
        )
        .from(bodyRef.current, { y: 15, autoAlpha: 0, duration: 0.5 }, "-=0.35");
    },
    { scope: sectionRef },
  );

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.matchMedia("(max-width: 767px)").matches) return;

      gsap.to(contentRef.current, {
        y: -20,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="site-gutter bg-white py-20 md:py-28 lg:py-32">
      <div ref={contentRef} className="mx-auto w-full max-w-[1280px]">
        <p className="flex items-center gap-5 text-lg font-semibold text-violet">
          <span
            ref={lineRef}
            aria-hidden
            className="h-1 w-[72px] origin-left rounded-full bg-violet"
          />
          <span ref={eyebrowTextRef}>About OrditAI</span>
        </p>

        <h1 className="type-display mt-6 max-w-[20em] text-ink">
          <span className="block overflow-hidden">
            <span className="about-hero-line block">Audit is the one profession</span>
          </span>
          <span className="block overflow-hidden">
            <span className="about-hero-line block">
              where the work <span className="text-violet">has to be checkable.</span>
            </span>
          </span>
        </h1>

        <p ref={bodyRef} className="mt-8 max-w-[36rem] text-lg leading-[1.6] text-body lg:text-xl">
          That is not a constraint we design around. It is the reason the
          product exists in the shape it does.
        </p>
      </div>
    </section>
  );
}

export default AboutHero;
