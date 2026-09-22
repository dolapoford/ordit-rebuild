"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  /** "scroll" (default) animates in as the section enters the viewport; "load" animates once on mount, for above-the-fold content like a hero. */
  trigger?: "scroll" | "load";
  y?: number;
  duration?: number;
  delay?: number;
  className?: string;
};

export function Reveal({
  children,
  trigger = "scroll",
  y = 32,
  duration = 0.8,
  delay = 0,
  className,
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(containerRef.current, {
        y,
        autoAlpha: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger:
          trigger === "scroll"
            ? {
                trigger: containerRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              }
            : undefined,
      });
    },
    { scope: containerRef, dependencies: [trigger, y, duration, delay] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
