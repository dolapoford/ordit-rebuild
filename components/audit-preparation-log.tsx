"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useSectionReveal } from "@/hooks/use-section-reveal";
import { useParallax } from "@/hooks/use-parallax";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Audit page — the procedure workbench's preparation log: one workpaper,
 *  every exchange between George and the auditor kept in order. Same
 *  framed-screenshot pattern as AuditWorkflowBoard (design.md §5.5). */
export function AuditPreparationLog() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useSectionReveal(headerRef, { targets: [".type-label", "h2", ".apl-desc"] });

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(imageRef.current, {
        autoAlpha: 0,
        scale: 0.97,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
    },
    { scope: sectionRef },
  );

  useParallax(imageRef, { trigger: sectionRef, distance: 16 });

  return (
    <section ref={sectionRef} className="site-gutter site-section bg-white">
      <div className="mx-auto max-w-[1280px]">
        <div ref={headerRef} className="max-w-2xl">
          <p className="type-label text-violet">The preparation log</p>
          <h2 className="type-h2 mt-5 text-ink">
            Every exchange between George and{" "}
            <span className="text-violet">the auditor, kept.</span>
          </h2>
          <p className="apl-desc type-body mt-6 text-body">
            This is one workpaper. George works, explains what he found, and
            stops when he cannot conclude. The senior instructs him, he
            continues, she edits and approves. Nine months later the file
            still shows exactly who did which part.
          </p>
        </div>

        <div ref={imageRef} className="mt-12 overflow-hidden rounded-site border border-neutral-200 lg:mt-16">
          <Image
            src="/prepare.png"
            alt="Procedure workbench preparation log: George works, explains a finding, requests missing evidence, the senior instructs and reviews, and both sign off — every step timestamped and attributed"
            width={1440}
            height={1400}
            sizes="(min-width: 1024px) 1280px, 92vw"
            className="h-auto w-full"
          />
        </div>

        <p className="type-caption mt-4 text-body">
          Ordit enterprise · 07 · Procedure Workbench
        </p>
      </div>
    </section>
  );
}

export default AuditPreparationLog;
