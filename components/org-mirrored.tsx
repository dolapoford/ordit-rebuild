"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useSectionReveal } from "@/hooks/use-section-reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** For firms — "How a firm is shaped": copy left, hierarchy diagram right
 *  (organisation → clients → engagements → invited people, drawn as inline
 *  SVG). A scroll-scrubbed top-to-bottom clip-path wipe maps the hierarchy
 *  in as the user scrolls. */
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
          <p className="type-label text-violet">How a firm is shaped</p>

          <h2 className="type-h2 mt-6 text-ink">
            Organisation, client,{" "}
            <span className="text-violet">
              engagement, people.
            </span>
          </h2>

          <p className="type-lead mt-7 max-w-[36rem] text-body">
            A firm is a hierarchy, and an audit file inherits it. Who can open
            an engagement, who can approve a procedure and who can sign a report
            all follow from where a person sits in that structure — not from a
            setting someone remembered to tick.
          </p>
        </div>

        <div
          ref={imageWrapRef}
          className="mx-auto w-full max-w-[680px] rounded-site border border-neutral-200 bg-white p-3 sm:p-5 lg:max-w-none"
        >
          <svg
            viewBox="0 0 875 560"
            role="img"
            aria-label="Hierarchy: an organisation contains clients, each client has engagements, and only invited people can access an engagement"
            className="h-auto w-full font-sans"
          >

            <g fill="none" stroke="var(--color-neutral-300)" strokeWidth="2">
              <path d="M437 122V156M172 192V176a20 20 0 0 1 20-20H685a20 20 0 0 1 20 20V192M437 156V192" />
              <path d="M438 262V293M343 328V313a20 20 0 0 1 20-20H515a20 20 0 0 1 20 20V328" />
            </g>

            <rect x="280" y="47" width="315" height="75" rx="14" fill="var(--color-violet)" />
            <text x="437.5" y="90" textAnchor="middle" fill="#fff" fontSize="19" fontWeight="500" letterSpacing="1.5">
              ORGANISATION
            </text>

            {[
              { x: 57, w: 230, t: "CLIENT 01" },
              { x: 322, w: 232, t: "CLIENT 02" },
              { x: 590, w: 230, t: "CLIENT 03" },
            ].map(({ x, w, t }) => (
              <g key={t}>
                <rect x={x} y="192" width={w} height="70" rx="12" fill="#fff" stroke="var(--color-neutral-200)" />
                <text x={x + w / 2} y="233" textAnchor="middle" fill="var(--color-ink)" fontSize="18" fontWeight="500">
                  {t}
                </text>
              </g>
            ))}

            <rect x="272" y="328" width="144" height="55" rx="10" fill="var(--color-violet-50)" />
            <rect x="463" y="328" width="144" height="55" rx="10" fill="var(--color-violet-50)" />
            <text x="434" y="416" textAnchor="middle" fill="var(--color-body)" fillOpacity="0.8" fontSize="16" letterSpacing="1">
              ENGAGEMENTS
            </text>

            {[
              "var(--color-violet)",
              "var(--color-violet-500)",
              "var(--color-violet-300)",
              "var(--color-neutral-300)",
              "var(--color-neutral-300)",
            ].map((fill, i) => (
              <circle key={i} cx={322 + i * 56.5} cy="462" r="17" fill={fill} />
            ))}
            <text x="435" y="516" textAnchor="middle" fill="var(--color-body)" fontSize="19" letterSpacing="1.5">
              ONLY THE PEOPLE INVITED
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}

export default OrgMirrored;
