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
  const eyebrowTextRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(eyebrowTextRef.current, { autoAlpha: 0, y: 16, duration: 0.5 }, 0.1)
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
    <section ref={sectionRef} className="site-gutter bg-white site-section">
      <div ref={contentRef} className="mx-auto w-full max-w-[1280px]">
        <p className="type-label text-violet">
          <span ref={eyebrowTextRef}>About OrditAI</span>
        </p>

        <h1 className="type-display mt-6 max-w-[20em] text-ink">
          <span className="block overflow-hidden">
            <span className="about-hero-line block">The books and the file</span>
          </span>
          <span className="block overflow-hidden">
            <span className="about-hero-line block">
              <span className="text-violet">both have to hold up.</span>
            </span>
          </span>
        </h1>

        <p ref={bodyRef} className="type-lead mt-8 max-w-[36rem] text-body">
          One is reviewed at close, the other is reviewed by a regulator. Both
          make the same demand: show the working. That is why OrditAI is one
          workbench with two modules — and an AI that prepares but never signs.
        </p>
      </div>
    </section>
  );
}

export default AboutHero;
