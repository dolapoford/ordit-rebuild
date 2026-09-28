"use client";

import { useRef } from "react";

import { useSectionReveal } from "@/hooks/use-section-reveal";
import { useCardStagger } from "@/hooks/use-card-stagger";

const STEPS = [
  {
    step: "01",
    title: "He drafts.",
    body: "George proposes the entry from the source document, and writes down why. The draft sits on the AI ground, marked as his.",
  },
  {
    step: "02",
    title: "You check the reasoning.",
    body: "The documents behind the entry, the accounts chosen and the period applied are all shown. Change any of it.",
  },
  {
    step: "03",
    title: "You post it.",
    body: "The entry enters the ledger under your name, with his draft kept beside it and the change from one to the other recorded.",
  },
];

/** Accounting page — the three-step posting flow, cards bridged by short
 *  connector lines at desktop; a plain stacked list on mobile. */
export function PostingFlow() {
  const headerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useSectionReveal(headerRef, { targets: [".type-label", "h2"] });
  useCardStagger(rowRef, { cardSelector: ".flow-step" });

  return (
    <section className="site-gutter site-section bg-white">
      <div className="mx-auto max-w-[1280px]">
        <div ref={headerRef}>
          <p className="type-label text-violet">
            How a posting happens
          </p>
          <h2 className="type-h2 mt-5 text-ink">
            George drafts. <span className="text-violet">You post.</span>
          </h2>
        </div>

        <div ref={rowRef} className="mt-12 flex flex-col items-stretch gap-5 lg:mt-16 lg:flex-row lg:gap-0">
          {STEPS.map((item, i) => (
            <div key={item.step} className="flex flex-1 flex-col lg:flex-row lg:items-stretch">
              <article className="flow-step flex-1 rounded-xl border border-violet-100 bg-violet-50/50 px-6 py-6 lg:px-7 lg:py-7">
                <p className="type-body-s font-semibold text-violet">{item.step}</p>
                <h3 className="type-h3 mt-3 text-ink">{item.title}</h3>
                <p className="type-body-s mt-2 text-body">{item.body}</p>
              </article>

              {i < STEPS.length - 1 && (
                <div className="hidden w-8 shrink-0 items-center justify-center lg:flex" aria-hidden>
                  <span className="h-px w-full bg-violet-200" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PostingFlow;
