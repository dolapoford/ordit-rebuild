"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Subtle hover/tap scale for buttons and links — Framer Motion owns this,
 *  never GSAP, so the two systems never fight over the same transform. */
export function Press({
  children,
  className,
  hoverScale = 1.02,
}: {
  children: ReactNode;
  className?: string;
  /** Override the hover scale — e.g. 1.03 for a hero primary CTA. */
  hoverScale?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      className={className ? `inline-block ${className}` : "inline-block"}
      whileHover={reduced ? undefined : { scale: hoverScale }}
      whileTap={reduced ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.span>
  );
}
