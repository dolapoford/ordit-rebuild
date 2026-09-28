"use client";

import { useRef } from "react";
import {
  BarChart3,
  ClipboardList,
  FileText,
  Layers,
  TrendingUp,
  User,
} from "lucide-react";

import { useSectionReveal } from "@/hooks/use-section-reveal";
import { useCardStagger } from "@/hooks/use-card-stagger";

const CAPABILITIES = [
  {
    icon: FileText,
    title: "Journals and postings",
    body: "Draft, review and post journals against the entity's chart of accounts. George prepares; a named person posts.",
  },
  {
    icon: Layers,
    title: "Multi-entity books",
    body: "Keep separate sets of books for separate entities, with access following the role a person already holds.",
  },
  {
    icon: BarChart3,
    title: "Financial statements",
    body: "Produce statements from the posted ledger, with each figure traceable to the entries beneath it.",
  },
  {
    icon: ClipboardList,
    title: "Reports",
    body: "Run the reports the practice needs on the period, on the entity, or across entities.",
  },
  {
    icon: TrendingUp,
    title: "Forecasts and predictions",
    body: "Project forward from the posted history, with the basis of each projection shown.",
  },
  {
    icon: User,
    title: "Attribution on every entry",
    body: "Every line carries its author, its timestamp and its reason. Nothing in the ledger is anonymous.",
  },
];

/** Accounting page — the module's capability set, six cards on a fixed grid. */
export function AccountingCapabilities() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useSectionReveal(headerRef, { targets: [".type-label", "h2"] });
  useCardStagger(gridRef, { cardSelector: "article" });

  return (
    <section className="site-gutter site-section bg-white">
      <div className="mx-auto max-w-[1280px]">
        <div ref={headerRef}>
          <p className="type-label text-violet">
            Capabilities
          </p>
          <h2 className="type-h2 mt-5 text-ink">
            Everything the books need, <span className="text-violet">in one place.</span>
          </h2>
        </div>

        <div ref={gridRef} className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {CAPABILITIES.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="rounded-site border border-neutral-200 bg-white card-pad"
            >
              <span className="flex size-12 items-center justify-center rounded-lg bg-violet-50 text-violet">
                <Icon aria-hidden className="size-5" strokeWidth={1.75} />
              </span>

              <h3 className="type-h3 mt-5 text-ink">{title}</h3>
              <p className="type-body-s mt-2 text-body">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AccountingCapabilities;
