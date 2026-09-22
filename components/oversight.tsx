"use client";

import { useRef } from "react";
import { Check, FileText, Building2, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useSectionReveal } from "@/hooks/use-section-reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LEVELS = [
  {
    n: "01",
    title: "Engagement",
    sub: "For the team doing the work.",
    icon: FileText,
    points: [
      "Audit progress and current phase",
      "Procedures completed and outstanding",
      "Open findings and risks",
      "Team activity",
    ],
  },
  {
    n: "02",
    title: "Management",
    sub: "For the people running the practice.",
    icon: Users,
    points: [
      "Active engagements and their status",
      "Audit coverage",
      "Outstanding reviews",
      "Team capacity and risk trends",
    ],
  },
  {
    n: "03",
    title: "Organisation",
    sub: "For the firm as a whole.",
    icon: Building2,
    points: [
      "Overall audit activity",
      "Coverage across entities",
      "Resources and availability",
      "Performance and service levels",
    ],
  },
];

// Decorative bars: heights in px, opacity rising to the solid final bar.
const BARS = [
  { h: 28, o: 0.18 },
  { h: 38, o: 0.25 },
  { h: 50, o: 0.32 },
  { h: 62, o: 0.42 },
  { h: 74, o: 0.55 },
  { h: 84, o: 1 },
];

/** For firms — "Oversight at every level": three audience cards, staged like
 *  live dashboards — card, then icon, then the chart growing, then the
 *  checklist. */
export function Oversight() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  useSectionReveal(headerRef, { targets: [".type-label", "h2", ".type-lead"] });

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = gridRef.current ? Array.from(gridRef.current.children) : [];
      if (!cards.length) return;
      const compact = window.matchMedia("(max-width: 1023px)").matches;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: gridRef.current, start: "top 78%", once: true },
      });

      tl.from(cards, {
        y: compact ? 16 : 24,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.15,
      });

      cards.forEach((card, i) => {
        const icon = card.querySelector(".oversight-icon");
        const bars = card.querySelectorAll(".oversight-bar");
        const points = card.querySelectorAll(".oversight-point");
        if (bars.length) gsap.set(bars, { transformOrigin: "bottom" });

        tl.from(icon, { autoAlpha: 0, scale: 0.9, duration: 0.3, ease: "power2.out" }, i === 0 ? "-=0.25" : "-=0.35")
          .from(bars, { scaleY: 0, duration: 0.45, ease: "power2.out", stagger: 0.05 }, "-=0.1")
          .from(points, { autoAlpha: 0, y: 8, duration: 0.3, ease: "power2.out", stagger: 0.04 }, "-=0.15");
      });
    },
    { scope: gridRef },
  );

  return (
    <section className="site-gutter site-section relative overflow-hidden bg-neutral-25">
      <div className="relative mx-auto max-w-[1280px]">
        <div ref={headerRef}>
          <p className="type-label flex items-center gap-4 text-violet">
            Oversight at every level
            <span className="h-px w-12 bg-violet/60" aria-hidden />
          </p>
          <h2 className="type-h1 mt-6 text-ink">
            See the engagement,
            <br className="hidden sm:block" /> the team and the{" "}
            <span className="text-violet">whole firm.</span>
          </h2>
          <p className="type-lead mt-6 max-w-[34rem] text-body">
            From day-to-day progress to firm-wide performance, get the visibility
            you need to lead with confidence.
          </p>
        </div>

        <ul ref={gridRef} className="mt-14 grid gap-5 md:grid-cols-3">
          {LEVELS.map(({ n, title, sub, icon: Icon, points }) => (
            <li
              key={title}
              className="relative rounded-site border border-neutral-200 bg-white p-8"
            >
              <span className="absolute right-8 top-8 text-base text-body/60">
                {n}
              </span>
              <span className="oversight-icon flex size-[74px] items-center justify-center rounded-full bg-violet-50 text-violet">
                <Icon aria-hidden className="size-7" strokeWidth={1.75} />
              </span>
              <h3 className="type-h3 mt-6 text-ink">{title}</h3>
              <p className="mt-1 text-base text-body">{sub}</p>

              <div
                aria-hidden
                className="mt-6 flex h-[88px] items-end gap-3 border-b border-neutral-200 px-10 pb-px"
              >
                {BARS.map(({ h, o }, i) => (
                  <span
                    key={i}
                    className="oversight-bar w-[30px] flex-1 rounded-md bg-violet"
                    style={{ height: h, opacity: o, maxWidth: 32 }}
                  />
                ))}
              </div>

              <ul className="mt-8 space-y-3.5">
                {points.map((p) => (
                  <li key={p} className="oversight-point flex items-center gap-4 text-base text-ink/80">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet">
                      <Check aria-hidden className="size-4" strokeWidth={2.5} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Oversight;
