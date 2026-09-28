"use client";

import { useRef } from "react";
import Image from "next/image";

import { useSectionReveal } from "@/hooks/use-section-reveal";
import { useCardStagger } from "@/hooks/use-card-stagger";

const CARDS = [
  {
    step: "01",
    label: "A preparer, not a signer",
    image: "/paper.png",
    alt: "A working paper checklist beside George, smiling with arms crossed",
    title: "A preparer, not a signer",
    body: "Both sides of the profession already have this role. A junior prepares the workpaper and a senior signs it; an accountant drafts the entry and a controller approves it. George is the one doing the preparing — tireless, consistent, and always working under review.",
  },
  {
    step: "02",
    label: "He shows his working",
    image: "/data.png",
    alt: "Four completed steps: sample drawn, evidence tied, calculation reperformed, exceptions flagged",
    title: "He shows his working",
    body: "Sampling, tie-outs, reperformance and a drafted conclusion on an engagement. Journals and a drafted statement in the books. Every step is attributed to him, timestamped, and open for you to change.",
  },
  {
    step: "03",
    label: "He never signs",
    image: "/review.png",
    alt: "Prepared by George, reviewed by: awaiting your review",
    title: "He never signs",
    body: "There is one line George cannot reach. The opinion carries a human name and so does the approved entry, because a person carries the liability for both — and no amount of accuracy transfers that.",
    note: true,
  },
];

export function WhoGeorgeIs() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useSectionReveal(headerRef, { targets: [".type-label", "h2", ".type-lead"] });
  useCardStagger(gridRef, { cardSelector: "article", imageSelector: "img" });

  return (
    <section
      id="how-it-works"
      className="site-gutter site-section bg-white"
    >
      <div className="mx-auto max-w-[1280px]">
        <div ref={headerRef} className="mx-auto max-w-3xl text-center">
          <p className="type-label text-violet">
            Who George is
          </p>

          <h2 className="type-h2 mt-5 text-ink">
            A colleague with one <em className="font-semibold">job</em>,
            <br className="hidden sm:block" /> and one thing he is{" "}
            <span className="text-violet">never allowed to do.</span>
          </h2>

          <p className="type-lead mx-auto mt-5 max-w-[36rem] text-body">
            Accounting and audit both already have a word for someone who does the work and hands it up for review. George is that person, and nothing more than that person.
          </p>
        </div>

        <div ref={gridRef} className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {CARDS.map((card) => (
            <article
              key={card.step}
              className="relative flex flex-col rounded-site border border-neutral-200 bg-white px-6 pb-6 pt-[22px] lg:px-[26px] lg:pb-[26px]"
            >
              <p className="type-label flex items-center gap-4 text-violet">
                <span className="tabular-nums">{card.step}</span>
                <span className="h-px w-9 bg-neutral-300" aria-hidden />
                {card.label}
              </p>

              <div className="relative mt-5 aspect-[3/2] overflow-hidden rounded-lg">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>

              {card.note && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-2 bottom-[40%] rotate-[-9deg] sm:right-3"
                >
                  <p className="font-[family-name:var(--font-hand)] text-[26px] leading-[1.05] text-violet">
                    Human
                    <br />
                    <span className="ml-3">oversight always</span>
                  </p>
                  <svg
                    viewBox="0 0 170 24"
                    className="ml-2 mt-1 h-5 w-40 text-violet"
                    fill="none"
                  >
                    <path
                      d="M2 20 C 50 12, 110 6, 168 3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}

              <h3 className="type-h3 mt-6 text-ink">{card.title}</h3>
              <p className="type-body-s mt-2 text-body">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhoGeorgeIs;
