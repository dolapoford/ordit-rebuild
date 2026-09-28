"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Contact page hero — same eyebrow/headline/body choreography as the
 *  About and Security heroes: restrained, text-only, no product artwork. */
export function ContactHero() {
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
          sectionRef.current?.querySelectorAll(".contact-hero-line") ?? [],
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
          <span ref={eyebrowTextRef}>Contact</span>
        </p>

        <h1 className="type-display mt-6 max-w-[18em] text-ink">
          <span className="block overflow-hidden">
            <span className="contact-hero-line block">Tell us what you need,</span>
          </span>
          <span className="block overflow-hidden">
            <span className="contact-hero-line block">
              <span className="text-violet">we&rsquo;ll take it from there.</span>
            </span>
          </span>
        </h1>

        <p ref={bodyRef} className="type-lead mt-8 max-w-[36rem] text-body">
          A product question, a security review, an RFI — one message
          reaches the right person. No ticket number, no queue.
        </p>
      </div>
    </section>
  );
}

export default ContactHero;
