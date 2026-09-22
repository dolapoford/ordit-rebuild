"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type UseParallaxOptions = {
  trigger?: RefObject<Element | null>;
  distance?: number;
  start?: string;
  end?: string;
};

/** Subtle scroll-scrubbed vertical parallax for a single element. Skipped on
 *  phones and with reduced motion — depth is a desktop/tablet nicety. */
export function useParallax(
  target: RefObject<HTMLElement | null>,
  { trigger, distance = 30, start = "top bottom", end = "bottom top" }: UseParallaxOptions = {},
) {
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.matchMedia("(max-width: 767px)").matches) return;
      if (!target.current) return;

      gsap.to(target.current, {
        y: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: trigger?.current ?? target.current,
          start,
          end,
          scrub: true,
        },
      });
    },
    { scope: target, dependencies: [distance] },
  );
}
