"use client";

import { useRef } from "react";
import { Clock, Copy, Lock, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PILLARS: {
  title: string;
  body: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Isolation",
    body: "Every firm is its own tenant and every engagement its own workspace. Data never crosses either line.",
    icon: Copy,
  },
  {
    title: "Access",
    body: "Single sign-on, role-based permissions and field-level visibility decide exactly who sees what.",
    icon: Lock,
  },
  {
    title: "Accountability",
    body: "Every action, every access and every administrative change is logged, searchable and visible in the app.",
    icon: Clock,
  },
];

function PillarIcon({ icon: Icon }: { icon: LucideIcon }) {
  const reduced = useReducedMotion();
  return (
    <span className="pillar-icon flex size-16 items-center justify-center rounded-full bg-violet-50 text-violet">
      <motion.span
        className="flex items-center justify-center"
        whileHover={reduced ? undefined : { scale: 1.05 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <Icon aria-hidden className="size-7" strokeWidth={2} />
      </motion.span>
    </span>
  );
}

/** Security page pillars — three columns separated by hairline dividers.
 *  Isolation → Access → Accountability reveal in sequence, each divider
 *  drawing in as the column after it appears. */
export function SecurityPillars() {
  const gridRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = gridRef.current ? Array.from(gridRef.current.children) : [];
      if (!cards.length) return;
      const compact = window.matchMedia("(max-width: 1023px)").matches;

      const dividers = cards
        .map((card) => card.querySelector(".pillar-divider"))
        .filter((d): d is Element => Boolean(d));
      if (dividers.length) gsap.set(dividers, { transformOrigin: "top" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: gridRef.current, start: "top 78%", once: true },
        defaults: { ease: "power3.out" },
      });

      cards.forEach((card, i) => {
        tl.from(card, { y: compact ? 18 : 25, autoAlpha: 0, duration: 0.55 }, i === 0 ? 0 : "-=0.3")
          .from(card.querySelector(".pillar-icon"), { scale: 0.9, duration: 0.4, ease: "power2.out" }, "<");

        const divider = card.querySelector(".pillar-divider");
        if (divider) {
          tl.fromTo(divider, { scaleY: 0 }, { scaleY: 1, duration: 0.5, ease: "power2.out" }, "<");
        }
      });
    },
    { scope: gridRef },
  );

  return (
    <section className="site-gutter bg-white pb-20 md:pb-28">
      <ul ref={gridRef} className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-12 md:grid-cols-3 md:gap-0">
        {PILLARS.map(({ title, body, icon }, i) => (
          <li
            key={title}
            className="relative md:px-12 md:first:pl-0 md:last:pr-0"
          >
            {i > 0 && (
              <span
                aria-hidden
                className="pillar-divider absolute inset-y-0 left-0 hidden w-px bg-neutral-100 md:block"
              />
            )}
            <PillarIcon icon={icon} />
            <h2 className="mt-8 text-3xl font-semibold tracking-[-0.02em] text-ink">
              {title}
            </h2>
            <p className="mt-4 max-w-[26rem] text-lg leading-[1.6] text-body">
              {body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SecurityPillars;
