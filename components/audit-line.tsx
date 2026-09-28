"use client";

import { useRef } from "react";

import { useSectionReveal } from "@/hooks/use-section-reveal";
import { useCardStagger } from "@/hooks/use-card-stagger";

const COLUMNS = [
  {
    key: "george",
    title: "George prepares",
    sub: "Recorded against his name, always reviewable.",
    rail: "bg-ai-rail",
    surface: "bg-ai-surface",
    points: [
      "Selects and stratifies the sample",
      "Ties every item to its evidence",
      "Tests controls and reperforms calculations",
      "Flags exceptions against materiality",
      "Drafts the conclusion",
      "Keeps the activity trail current",
    ],
  },
  {
    key: "you",
    title: "You decide",
    sub: "Recorded against your name. Never delegated.",
    rail: "bg-ink",
    surface: "bg-white border border-neutral-200",
    points: [
      "Set materiality",
      "Judge whether a risk is significant",
      "Accept, edit or reject every conclusion",
      "Instruct George, and request more evidence",
      "Assign and reassign the work",
      "Sign the opinion",
    ],
  },
];

/** Audit page — "Where the line sits": George's prepared-by column beside
 *  the auditor's reviewed-by column, rail colour carrying the same
 *  attribution semantics as the Attribution Stamp (design.md §4.3). */
export function AuditLine() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useSectionReveal(headerRef, { targets: [".type-label", "h2"] });
  useCardStagger(gridRef, { cardSelector: ".line-card" });

  return (
    <section className="site-gutter site-section bg-neutral-25">
      <div className="mx-auto max-w-[1280px]">
        <div ref={headerRef} className="mx-auto max-w-[44rem] text-center">
          <p className="type-label text-violet">Where the line sits</p>
          <h2 className="type-h2 mt-5 text-ink">
            George does the work. The judgment stays yours.
          </h2>
        </div>

        <div ref={gridRef} className="mt-14 grid gap-6 lg:grid-cols-2">
          {COLUMNS.map(({ key, title, sub, rail, surface, points }) => (
            <div key={key} className={`line-card rounded-site card-pad ${surface}`}>
              <h3 className="type-h3 text-ink">{title}</h3>
              <p className="mt-1 type-body-s text-body">{sub}</p>

              <ul className="mt-6">
                {points.map((point, i) => (
                  <li
                    key={point}
                    className={`flex items-start gap-3 py-3.5 ${
                      i < points.length - 1 ? "border-b border-neutral-200/70" : ""
                    }`}
                  >
                    <span className={`mt-1 h-4 w-[3px] shrink-0 rounded-xs ${rail}`} aria-hidden />
                    <span className="type-body-s text-ink">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AuditLine;
