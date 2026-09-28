"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useSectionReveal } from "@/hooks/use-section-reveal";
import { useParallax } from "@/hooks/use-parallax";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Audit page — "Day one": the Initiation stage's empty state. Copy left,
 *  screenshot right, same two-column grid as OrgMirrored (design.md §5.1
 *  vocabulary applied to a stage illustration rather than the hero). */
export function AuditInitiation() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useSectionReveal(copyRef, { targets: [".type-label", "h2", ".ai-desc"] });

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
    <section ref={sectionRef} className="site-gutter site-section bg-neutral-25">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div ref={copyRef}>
            <p className="type-label text-violet">Day one</p>

            <h2 className="type-h2 mt-5 text-ink">An empty engagement says so.</h2>

            <p className="ai-desc type-body mt-6 max-w-[28rem] text-body">
              Nothing has been prepared, uploaded or signed off yet. Initiation
              comes first — client acceptance, independence and the engagement
              letter — and George only begins once that is signed off. On a
              first-year audit there is no prior year to roll forward, and the
              product says that too rather than showing an empty rollover.
            </p>
          </div>

          <div
            ref={imageRef}
            className="mx-auto w-full max-w-[420px] overflow-hidden rounded-site border border-neutral-200 lg:mx-0 lg:max-w-none"
          >
            <Image
              src="/initiation.png"
              alt="Initiation stage in its start-here empty state: nothing prepared or signed off yet, with engagement-team, acceptance, independence and engagement-letter steps not started"
              width={772}
              height={862}
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="h-auto w-full"
            />
          </div>
        </div>

        <p className="type-caption mt-4 text-body">
          Ordit enterprise · engagement initiation, first-year audit
        </p>
      </div>
    </section>
  );
}

export default AuditInitiation;
