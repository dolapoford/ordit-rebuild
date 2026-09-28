"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useSectionReveal } from "@/hooks/use-section-reveal";
import { useParallax } from "@/hooks/use-parallax";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Accounting page — a real journal entry, George's drafted reasoning
 *  attached to it, and both lines of the Attribution Stamp underneath. */
export function InsideTheLedger() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useSectionReveal(headerRef, { targets: [".type-label", "h2"] });

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
          <p className="type-label text-violet">Inside the ledger</p>
          <h2 className="type-h2 mt-5 text-ink">
            An entry George drafted, and{" "}
            <span className="text-violet">the reason</span> he gives for it.
          </h2>
        </div>

        <div ref={imageRef} className="mt-12 lg:mt-16">
          <Image
            src="/accounting-inside.png"
            alt="A journal entry for Fordsoft Ltd, awaiting approval, with George's reasoning for deferring part of the revenue to April and both lines of the Attribution Stamp"
            width={1713}
            height={919}
            sizes="(min-width: 1024px) 1280px, 92vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}

export default InsideTheLedger;
