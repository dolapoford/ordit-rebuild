"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type UseSectionRevealOptions = {
  /** Selectors within scope, animated in sequence — one step per selector. */
  targets: string[];
  /** "scroll" (default) triggers once the section enters; "load" plays immediately. */
  trigger?: "scroll" | "load";
  y?: number;
  duration?: number;
  start?: string;
};

/** Eyebrow → headline → description → visual, as one sequenced timeline. */
export function useSectionReveal(
  scope: RefObject<Element | null>,
  { targets, trigger = "scroll", y = 24, duration = 0.7, start = "top 75%" }: UseSectionRevealOptions,
) {
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const compact = window.matchMedia("(max-width: 1023px)").matches;
      const dist = compact ? y * 0.6 : y;
      const dur = compact ? duration * 0.85 : duration;

      const tl = gsap.timeline({
        scrollTrigger:
          trigger === "scroll"
            ? { trigger: scope.current, start, once: true }
            : undefined,
      });

      targets.forEach((selector, i) => {
        const els = scope.current?.querySelectorAll(selector);
        if (!els?.length) return;
        tl.from(
          els,
          { y: dist, autoAlpha: 0, duration: dur, ease: "power3.out", stagger: 0.08 },
          i === 0 ? undefined : `-=${dur * 0.55}`,
        );
      });
    },
    { scope, dependencies: [trigger] },
  );
}
