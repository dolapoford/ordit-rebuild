"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useSectionReveal } from "@/hooks/use-section-reveal";
import { useParallax } from "@/hooks/use-parallax";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** design.md §5.6 — Attribution band: the one section whose only job is to
 *  state the rule underneath everything else. */
export function HumanLoop() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useSectionReveal(copyRef, { targets: [".type-label", "h2", "p"] });

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

  useParallax(imageRef, { trigger: sectionRef, distance: 24 });

  return (
    <section
      ref={sectionRef}
      id="human-in-the-loop"
      className="site-gutter site-section overflow-hidden bg-white"
    >
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        {/* Copy */}
        <div ref={copyRef} className="flex flex-col">
          <p className="type-label text-violet">
            Human in the loop, structurally
          </p>

          <h2 className="type-h2 mt-6 text-ink">
            George occupies the{" "}
            <span className="whitespace-nowrap">prepared-by</span> line.
            <br />
            <span className="text-violet">
              Never the <span className="whitespace-nowrap">reviewed-by</span>{" "}
              line.
            </span>
          </h2>

          <p className="type-body mt-6 max-w-[36rem] text-body">
            An auditor signs the opinion and carries the liability. That cannot
            be delegated to software, so Ordit never asks you to.{" "}
            <strong className="font-medium text-ink">AI-authored work</strong>{" "}
            sits on its own tinted ground and is never mistaken for yours — and
            the reviewed-by line stays empty until a person fills it.
          </p>
        </div>

        {/* Illustration — transparent PNG, sits directly on the page */}
        <div ref={imageRef} className="relative lg:-mr-6">
          <Image
            src="/human-loop.png"
            alt="A prepared-by line filled in by George, and a reviewed-by line reading “Awaiting your review”"
            width={1600}
            height={983}
            sizes="(min-width: 1024px) 55vw, 90vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}

export default HumanLoop;
