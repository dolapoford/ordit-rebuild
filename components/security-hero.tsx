"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Security page hero — violet-bar eyebrow, two-line headline with the
 *  key phrase in violet, and a short supporting paragraph. */
export function SecurityHero() {
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
          sectionRef.current?.querySelectorAll(".sec-hero-line") ?? [],
          { yPercent: 100, duration: 0.7, stagger: 0.08 },
          "-=0.15",
        )
        .from(bodyRef.current, { y: 15, autoAlpha: 0, duration: 0.5 }, "-=0.35");
    },
    { scope: sectionRef },
  );

  // Restrained scroll-away parallax — the hero is intentionally minimal.
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
          <span ref={eyebrowTextRef}>Security</span>
        </p>

        <h1 className="type-display mt-6 max-w-[16em] text-ink">
          <span className="block overflow-hidden">
            <span className="sec-hero-line block">Where your clients&rsquo; data goes,</span>
          </span>
          <span className="block overflow-hidden">
            <span className="sec-hero-line block">
              and <span className="text-violet">who can reach it</span>
            </span>
          </span>
        </h1>

        <p ref={bodyRef} className="type-lead mt-8 max-w-[36rem] text-body">
          You hold confidential financial records under professional privilege. Before you put any of it into a tool, you are entitled to a straight answer about where it lives, who can see it, and what happens when you leave.
        </p>
      </div>
    </section>
  );
}

export default SecurityHero;
