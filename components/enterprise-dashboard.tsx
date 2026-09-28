"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useSectionReveal } from "@/hooks/use-section-reveal";
import { useParallax } from "@/hooks/use-parallax";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Home — "The workbench": the enterprise dashboard a firm opens each
 *  morning, with work assigned, work waiting, and George's overnight
 *  actions all attributed on one screen. */
export function EnterpriseDashboard() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useSectionReveal(headerRef, { targets: [".type-label", "h2", ".ed-desc"] });

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
          <p className="type-label text-violet">The workbench</p>
          <h2 className="type-h2 mt-5 text-ink">
            Six engagements, five things needing you, and{" "}
            <span className="text-violet">what George did overnight.</span>
          </h2>
          <p className="ed-desc type-body mt-6 text-body">
            This is the screen a firm opens in the morning. Work assigned to
            you, work waiting on you, and every action George took while you
            were away — each one attributed and reversible.
          </p>
        </div>

        <div ref={imageRef} className="mt-12 overflow-hidden rounded-site border border-neutral-200 lg:mt-16">
          <Image
            src="/Enterprise-Dashboard.png"
            alt="Enterprise dashboard showing engagements, work assigned to you, work awaiting you, and George's overnight actions"
            width={1440}
            height={1180}
            sizes="(min-width: 1024px) 1280px, 92vw"
            className="h-auto w-full"
          />
        </div>

        <p className="type-caption mt-4 text-body">
          Ordit enterprise · 01 · Enterprise Dashboard
        </p>
      </div>
    </section>
  );
}

export default EnterpriseDashboard;
