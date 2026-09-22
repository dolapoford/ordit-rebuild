"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type UseBackgroundDriftOptions = {
  /** Percentage points the background-position-Y drifts across the scroll range. */
  distance?: number;
  start?: string;
  end?: string;
};

/** Very subtle scrub drift on a CSS background-image's vertical position —
 *  for sections whose "orbital"/curve artwork is baked into a raster asset
 *  rather than separate animatable layers. */
export function useBackgroundDrift(
  target: RefObject<HTMLElement | null>,
  { distance = 6, start = "top bottom", end = "bottom top" }: UseBackgroundDriftOptions = {},
) {
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.matchMedia("(max-width: 767px)").matches) return;
      if (!target.current) return;

      gsap.fromTo(
        target.current,
        { backgroundPositionY: `${50 - distance}%` },
        {
          backgroundPositionY: `${50 + distance}%`,
          ease: "none",
          scrollTrigger: { trigger: target.current, start, end, scrub: true },
        },
      );
    },
    { scope: target, dependencies: [distance] },
  );
}
