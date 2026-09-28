"use client";

import { useRef } from "react";
import { User } from "lucide-react";

import { useSectionReveal } from "@/hooks/use-section-reveal";
import { useCardStagger } from "@/hooks/use-card-stagger";

const TEAM = [
  { name: "Temidayo Dauda", role: "Founder", known: true },
  { name: "Practice", role: "Chartered accountants and practising auditors", known: true },
  { name: "Engineering", role: "Systems built for regulated data", known: true },
  { name: "Advisory", role: "Partners who still sign files", known: true },
];

/** "Who builds it" — four-up team grid. Only the founder is named today;
 *  the rest hold their place as grey placeholder cards rather than being
 *  hidden, so the section is honest about where hiring stands. */
export function AboutTeam() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useSectionReveal(headerRef, { targets: [".type-label", "h2"] });
  useCardStagger(gridRef, { cardSelector: "article" });

  return (
    <section className="site-gutter site-section bg-white">
      <div className="mx-auto max-w-[1280px]">
        <div ref={headerRef} className="max-w-2xl">
          <p className="type-label text-violet">Who builds it</p>
          <h2 className="type-h2 mt-5 text-ink">
            Accountants, auditors and engineers, in the same room.
          </h2>
        </div>

        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-2 gap-5 lg:mt-16 lg:grid-cols-4"
        >
          {TEAM.map(({ name, role, known }, i) => (
            <article key={`${name}-${i}`} className="flex flex-col">
              <div className="flex aspect-square items-center justify-center rounded-site bg-neutral-100">
                <span className="flex size-16 items-center justify-center rounded-full bg-neutral-200 text-neutral-400">
                  <User aria-hidden className="size-7" strokeWidth={1.75} />
                </span>
              </div>
              <p
                className={
                  known
                    ? "mt-4 font-semibold text-ink"
                    : "mt-4 font-semibold text-neutral-400"
                }
              >
                {name}
              </p>
              <p className="mt-1 type-body-s text-body">{role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutTeam;
