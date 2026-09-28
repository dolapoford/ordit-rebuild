"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/** Audit page hero — same reveal vocabulary as AccountingHero/ForFirmsHero,
 *  but the module eyebrow is the pill badge (see Challenge's "With OrditAI"
 *  tag) rather than plain type-label text. No CTA pair: this hero is a
 *  module recap, not a conversion moment. */
export function AuditHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(badgeRef.current, { y: 16, autoAlpha: 0, duration: 0.5 }, 0.1)
        .from(
          sectionRef.current?.querySelectorAll(".audit-hero-line") ?? [],
          { yPercent: 100, duration: 0.7, stagger: 0.08 },
          "-=0.25",
        )
        .from(bodyRef.current, { y: 16, autoAlpha: 0, duration: 0.5 }, "-=0.35");
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="site-gutter relative flex min-h-[480px] items-center overflow-hidden bg-white"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <span
          ref={badgeRef}
          className="type-label w-fit rounded-full bg-violet-50 px-4 py-2 text-violet"
        >
          Module 02 · Auditing
        </span>

        <h1 className="type-display mt-6 max-w-2xl text-ink">
          <span className="block overflow-hidden">
            <span className="audit-hero-line block">Seven stages.</span>
          </span>
          <span className="block overflow-hidden">
            <span className="audit-hero-line block text-violet">One engagement.</span>
          </span>
        </h1>

        <p ref={bodyRef} className="type-body mt-6 max-w-[36rem] text-body">
          An audit runs in a fixed order, and so does the module. Here is
          what happens at each stage — what George prepares, and what stays
          with you. Where the accounting module is on, the file reads
          straight from the ledger.
        </p>
      </div>
    </section>
  );
}

export default AuditHero;
