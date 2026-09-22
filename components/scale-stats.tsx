"use client";

import { useRef } from "react";
import { Box, Laptop, Users, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useBackgroundDrift } from "@/hooks/use-background-drift";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATS = [
  { icon: Users, value: "10,000+", label: "concurrent users", countTo: 10000 },
  { icon: Zap, value: "Zero", label: "downtime on upgrades" },
  { icon: Box, value: "Containerised", label: "deployment" },
  { icon: Laptop, value: "Every", label: "modern browser" },
];

/** For firms — four-up stat strip separated by hairline dividers. Only the
 *  one genuinely numeric stat (10,000+) counts up; the rest just reveal. */
export function ScaleStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const items = gridRef.current ? Array.from(gridRef.current.children) : [];
      if (!items.length) return;
      const compact = window.matchMedia("(max-width: 1023px)").matches;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true },
      });

      const inner = items.flatMap((item) =>
        Array.from(item.querySelectorAll(".stat-icon, .stat-value, .stat-label")),
      );
      tl.from(inner, {
        y: compact ? 10 : 16,
        autoAlpha: 0,
        duration: 0.4,
        ease: "power3.out",
        stagger: 0.06,
      });

      items.forEach((item, i) => {
        const countTo = STATS[i]?.countTo;
        if (!countTo) return;
        const valueEl = item.querySelector<HTMLElement>(".stat-value");
        if (!valueEl) return;
        const counter = { val: 0 };
        tl.to(
          counter,
          {
            val: countTo,
            duration: 1.1,
            ease: "power2.out",
            onUpdate: () => {
              valueEl.textContent = `${Math.round(counter.val).toLocaleString()}+`;
            },
          },
          "<",
        );
      });
    },
    { scope: gridRef },
  );

  useBackgroundDrift(sectionRef, { distance: 5 });

  return (
    <section
      ref={sectionRef}
      className="site-gutter site-section relative overflow-hidden bg-white bg-cover bg-center"
      style={{ backgroundImage: "url(/metric.png)" }}
    >
      <ul ref={gridRef} className="relative mx-auto grid max-w-[1280px] grid-cols-2 gap-y-12 lg:grid-cols-4 lg:gap-y-0">
        {STATS.map(({ icon: Icon, value, label }) => (
          <li
            key={value}
            className="flex flex-col items-center px-4 text-center odd:border-r odd:border-neutral-200 max-lg:last:border-r-0 lg:border-r lg:border-neutral-200 lg:last:border-r-0 lg:odd:border-r"
          >
            <span className="stat-icon flex size-[72px] items-center justify-center rounded-full bg-violet-50 text-violet">
              <Icon aria-hidden className="size-7" strokeWidth={1.75} />
            </span>
            <p className="stat-value mt-6 text-[clamp(1.75rem,3.2vw,3rem)] font-bold leading-none tracking-[-0.04em] text-ink">
              {value}
            </p>
            <p className="stat-label mt-3 text-base text-body lg:text-lg">{label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ScaleStats;
