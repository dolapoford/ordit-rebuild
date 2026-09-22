"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useSectionReveal } from "@/hooks/use-section-reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** For firms — "Your organisation, mirrored": copy left, hierarchy
 *  illustration right, over a soft violet wash.
 *
 *  The hierarchy artwork is a single flat image (organisation → region →
 *  department → audit team → engagement → assigned users, baked into one
 *  PNG), not separate layers we can sequence individually. A scroll-scrubbed
 *  top-to-bottom clip-path wipe simulates the organisation being
 *  progressively mapped as the user scrolls, without redrawing the asset. */
export function OrgMirrored() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useSectionReveal(copyRef, { targets: [".type-label", "h2", ".type-lead"] });

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        imageWrapRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.4, ease: "power1.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true } },
      );

      gsap.fromTo(
        imageWrapRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "top 25%", scrub: true },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="site-gutter site-section relative overflow-hidden bg-neutral-25">
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
        <div ref={copyRef}>
          <p className="type-label flex items-center gap-3 text-violet">
            Your organisation, mirrored
            <span className="h-px w-10 bg-violet" aria-hidden />
          </p>

          <h2 className="type-h1 mt-6 text-ink">
            From the firm down to the person on the{" "}
            <span className="text-violet">engagement.</span>
          </h2>

          <p className="type-lead mt-7 max-w-[36rem] text-body">
            Regions, departments and audit teams sit exactly where they do in
            your firm. Roles and groups come across from Microsoft Entra ID, so
            what a person can see and do follows the role they already hold.
          </p>
        </div>

        <div ref={imageWrapRef} className="mx-auto w-full max-w-[680px] lg:max-w-none">
          <Image
            src="/organization.png"
            alt="Hierarchy from organisation to region, department, audit team, engagement and assigned users"
            width={1398}
            height={1125}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}

export default OrgMirrored;
