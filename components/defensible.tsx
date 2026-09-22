"use client";

import { useRef } from "react";
import Image from "next/image";

import { useSectionReveal } from "@/hooks/use-section-reveal";
import { useCardStagger } from "@/hooks/use-card-stagger";

const CARDS = [
  {
    title: "Evidence room",
    body: "Upload contracts, spreadsheets, decks and mail against an engagement, and add the data fields you need.",
    image: "/dashboard.png",
    alt: "Evidence files — contract, spreadsheet, email, deck and report — each marked as received, with an add-file slot",
  },
  {
    title: "Cross-references",
    body: "Finding #12 traces to the procedure that raised it, the contract beneath it, and the report version that carries it.",
    image: "/flowchart.png",
    alt: "Finding #12 linked to its related procedure, source document and report reference",
  },
  {
    title: "Activity trail",
    body: "Audit activity is tracked across the engagement as the work happens.",
    image: "/timeline.png",
    alt: "A timeline of engagement activity: file uploaded, procedure updated, finding created, reviewed by partner",
  },
];

/** design.md §5.7 — Traceability: three illustrated cards, each with its own
 *  state rather than one claim covering all three. */
export function Defensible() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useSectionReveal(headerRef, { targets: [".type-label", "h2", ".type-lead"] });
  useCardStagger(gridRef, { cardSelector: "article", imageSelector: "img" });

  return (
    <section
      id="defensible"
      className="site-gutter site-section bg-neutral-25"
    >
      <div className="mx-auto max-w-[1280px]">
        <div ref={headerRef} className="mx-auto max-w-4xl text-center">
          <p className="type-label flex items-center justify-center gap-5 text-violet">
            <span className="h-px w-14 bg-neutral-300" aria-hidden />
            Defensible by construction
            <span className="h-px w-14 bg-neutral-300" aria-hidden />
          </p>

          <h2 className="type-h1 mt-6 text-ink">
            If it is in the file, you can{" "}
            <span className="text-violet">prove where it came from.</span>
          </h2>

          <p className="type-lead mx-auto mt-5 max-w-2xl text-body">
            Three capabilities at three different stages.
          </p>
        </div>

        {/* 3 × 413, gap 20 — cards hug vertically */}
        <div ref={gridRef} className="mt-12 grid items-start gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="flex flex-col rounded-site border border-neutral-200 bg-white px-6 pb-6 pt-[22px] lg:px-[26px] lg:pb-[26px]"
            >
              <div className="relative aspect-[1691/930] w-full overflow-hidden rounded-lg bg-neutral-25">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                  className="object-cover mix-blend-multiply"
                />
              </div>

              <h3 className="type-h3 mt-6 text-ink">{card.title}</h3>
              <p className="type-body-s mt-2 text-body">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Defensible;
