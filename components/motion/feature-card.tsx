"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";

const EASE = [0.4, 0, 0.2, 1] as const;

const cardVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
};
const iconVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
};
const contentVariants: Variants = {
  rest: { x: 0 },
  hover: { x: 2 },
};

/** Dark-section feature card — GSAP owns its wrapper's scroll entrance;
 *  this component owns only the hover interaction (scale/icon/text shift). */
export function FeatureCard({
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
    <motion.article
      initial="rest"
      whileHover={reduced ? undefined : "hover"}
      variants={cardVariants}
      transition={{ duration: 0.2, ease: EASE }}
      className="rounded-site border border-white/10 bg-white/[0.03] p-6"
    >
      <motion.span
        variants={iconVariants}
        transition={{ duration: 0.2, ease: EASE }}
        className="flex size-[54px] items-center justify-center rounded-full bg-white/10 text-violet-300"
      >
        <Icon aria-hidden className="size-6" strokeWidth={1.75} />
      </motion.span>
      <motion.div variants={contentVariants} transition={{ duration: 0.2, ease: EASE }}>
        <h3 className="type-h3 mt-6 text-white">{title}</h3>
        <p className="type-body-s mt-3 text-white/65">{body}</p>
      </motion.div>
    </motion.article>
  );
}
