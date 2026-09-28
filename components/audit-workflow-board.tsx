"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useSectionReveal } from "@/hooks/use-section-reveal";
import { useParallax } from "@/hooks/use-parallax";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Audit page — the workflow board itself: the screen a procedure actually
 *  lives on, status, ownership, risk, evidence and review all in one place.
 *  Same framed-screenshot pattern as EnterpriseDashboard (design.md §5.5). */
export function AuditWorkflowBoard() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useSectionReveal(headerRef, { targets: [".type-label", "h2", ".awb-desc"] });

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
        <div ref={headerRef} className="max-w-2xl">
          <p className="type-label text-violet">Inside an engagement</p>
          <h2 className="type-h2 mt-5 text-ink">
            Seven stages, sixty-seven procedures,{" "}
            <span className="text-violet">one screen.</span>
          </h2>
          <p className="awb-desc type-body mt-6 text-body">
            The workflow board is where the engagement actually lives. Every
            procedure carries its status, who is responsible, the risk that
            drove it, the evidence behind it and who still has to review it.
          </p>
        </div>

        <div ref={imageRef} className="mt-12 overflow-hidden rounded-site border border-neutral-200 lg:mt-16">
          <Image
            src="/audit-workflow.png"
            alt="Audit workflow board showing all seven stages and their procedures, each with status, responsibility, risk, evidence and review"
            width={1440}
            height={1240}
            sizes="(min-width: 1024px) 1280px, 92vw"
            className="h-auto w-full"
          />
        </div>

        <p className="type-caption mt-4 text-body">
          Ordit enterprise · 05 · Audit Workflow
        </p>
      </div>
    </section>
  );
}

export default AuditWorkflowBoard;
