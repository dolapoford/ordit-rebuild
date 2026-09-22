"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type UseCardStaggerOptions = {
  cardSelector: string;
  imageSelector?: string;
  start?: string;
};

/** 01 → 02 → 03 card stagger, with each card's visual mask-revealing in behind it. */
export function useCardStagger(
  scope: RefObject<Element | null>,
  { cardSelector, imageSelector, start = "top 75%" }: UseCardStaggerOptions,
) {
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = scope.current?.querySelectorAll(cardSelector);
      if (!cards?.length) return;
      const compact = window.matchMedia("(max-width: 1023px)").matches;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: scope.current, start, once: true },
      });

      tl.from(cards, {
        y: compact ? 18 : 25,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: compact ? 0.1 : 0.15,
      });

      if (imageSelector) {
        const images = scope.current?.querySelectorAll(`${cardSelector} ${imageSelector}`);
        if (images?.length) {
          tl.fromTo(
            images,
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 0.55,
              ease: "power2.out",
              stagger: compact ? 0.1 : 0.15,
            },
            "<+=0.15",
          );
        }
      }
    },
    { scope, dependencies: [] },
  );
}
