"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { AttributionStamp } from "@/components/attribution-stamp";
import { useSectionReveal } from "@/hooks/use-section-reveal";
import { useParallax } from "@/hooks/use-parallax";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** "Why George prepares instead of decides" — copy on the left, the real
 *  AttributionStamp on the right so the argument is shown structurally
 *  rather than illustrated. Sits on a tinted panel, same shape as the
 *  homepage's HumanLoop section but with the actual component as proof. */
export function AboutWhy() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useSectionReveal(copyRef, { targets: [".type-label", "h2", "p"] });

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(cardRef.current, {
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

  useParallax(cardRef, { trigger: sectionRef, distance: 18 });

  return (
    <section ref={sectionRef} className="bg-neutral-25 py-20 md:py-28">
      <div className="site-gutter mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <div ref={copyRef} className="flex flex-col">
          <p className="type-label text-violet">
            Why George prepares instead of decides
          </p>

          <div className="mt-6 flex flex-col gap-5">
            <p className="type-body text-body">
              An accountant posts an entry and a controller certifies the
              statements. An auditor signs an opinion and carries personal
              liability for it. In both cases a name goes on the work, and when
              the work is questioned — at close, in a review, by a regulator,
              in a court — that person has to show how each figure was arrived
              at and on what evidence.
            </p>
            <p className="type-body text-body">
              Most AI tools are built the other way around: they produce an
              answer and ask you to trust it. In almost every other industry
              that trade is worth making. In accounting and audit it is
              worthless, because a figure you cannot defend is not a figure at
              all.
            </p>
            <p className="type-body text-body">
              So we started from attribution rather than automation. Every
              piece of work George does — a drafted journal, a sampled
              population, a completed procedure — is authored, timestamped,
              evidenced and reversible. He prepares. You review. You sign. The
              record shows which of you did what, and it will still show it in
              three years when somebody asks.
            </p>
          </div>
        </div>

        <div
          ref={cardRef}
          className="flex items-center justify-center rounded-xl bg-violet-50 p-8 sm:p-10"
        >
          <AttributionStamp
            className="max-w-sm"
            preparedAt="09:42"
            reviewedBy={{ name: "A. Abdulrahman", at: "16:20" }}
          />
        </div>
      </div>
    </section>
  );
}

export default AboutWhy;
