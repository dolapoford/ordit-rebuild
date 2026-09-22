"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";

const EASE = [0.4, 0, 0.2, 1] as const;

const cardVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.015 },
};
const iconVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
};

/** Light enterprise-controls card — GSAP owns its wrapper's scroll entrance;
 *  this component owns only the hover interaction (card + icon scale). */
export function ControlCard({
  title,
  body,
  icon: Icon,
}: {
  title: string;
  body: string;
  icon: LucideIcon;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial="rest"
      whileHover={reduced ? undefined : "hover"}
      variants={cardVariants}
      transition={{ duration: 0.2, ease: EASE }}
      className="rounded-site border border-neutral-200 bg-white p-6"
    >
      <motion.span
        variants={iconVariants}
        transition={{ duration: 0.2, ease: EASE }}
        className="control-icon flex size-14 items-center justify-center rounded-full bg-violet-50 text-violet"
      >
        <Icon aria-hidden className="size-6" strokeWidth={1.75} />
      </motion.span>
      <h3 className="control-title type-h3 mt-5 text-ink">{title}</h3>
      <p className="control-body type-body-s mt-2 text-body">{body}</p>
    </motion.div>
  );
}
