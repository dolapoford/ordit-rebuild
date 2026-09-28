"use client";

import { useRef } from "react";

import { useSectionReveal } from "@/hooks/use-section-reveal";
import { useCardStagger } from "@/hooks/use-card-stagger";

const POINTS = [
  {
    title: "In the books",
    body: "Drafts entries, prepares statements and flags what looks wrong before anything is posted.",
  },
  {
    title: "In the engagement",
    body: "Selects the sample, ties every item to its evidence and drafts the conclusion.",
  },
  {
    title: "In both",
    body: "Every line carries his name and a timestamp. Nothing is final until a person accepts it.",
  },
];

/** Dark band, right after "Who George is" — george-bg.png ground. Two-column
 *  header (headline left, supporting line right) over a three-up point row. */
export function GeorgeBand() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useSectionReveal(headerRef, { targets: [".gb-eyebrow", "h2", ".gb-desc"] });
  useCardStagger(gridRef, { cardSelector: ".gb-point" });

  return (
    <section
      className="site-gutter site-section bg-ink bg-cover bg-center text-white"
      style={{ backgroundImage: "url(/george-bg.png)" }}
    >
      <div className="mx-auto max-w-[1280px]">
        <div ref={headerRef} className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <p className="gb-eyebrow text-sm text-violet-300">The AI inside it</p>
            <h2 className="type-h1 mt-4 text-white">George works in both.</h2>
          </div>

          <p className="gb-desc type-body max-w-md text-white/70 lg:justify-self-end">
            George is embedded in the workbench, not bolted onto one module.
            He drafts the journal entry and he drafts the audit conclusion —
            and in both cases the work is authored, timestamped and waiting
            for a person to accept it.
          </p>
        </div>

        <div ref={gridRef} className="mt-14 grid gap-8 sm:grid-cols-3 lg:mt-16 lg:gap-16">
          {POINTS.map((point) => (
            <div key={point.title} className="gb-point border-t border-white/15 pt-6">
              <h3 className="type-h3 text-white">{point.title}</h3>
              <p className="type-body-s mt-2 text-white/60">{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GeorgeBand;
