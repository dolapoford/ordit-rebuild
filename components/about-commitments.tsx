"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useSectionReveal } from "@/hooks/use-section-reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COMMITMENTS = [
  {
    number: "01",
    title: "The signature stays human",
    body: "We will not build a feature that lets a posted entry or an audit conclusion reach a report without a named person accepting it.",
  },
  {
    number: "02",
    title: "Every line has an author",
    body: "Everything George does is attributed, timestamped and reversible — in the ledger and in the audit file alike. Nothing is anonymous.",
  },
  {
    number: "03",
    title: "Entities and engagements never mix",
    body: "Every firm is its own tenant, every entity its own set of books, every engagement its own workspace. Data never crosses those lines.",
  },
  {
    number: "04",
    title: "No number we cannot support",
    body: "If we cannot show you the working behind a claim, we do not make the claim.",
  },
  {
    number: "05",
    title: "The modules are the firm’s choice",
    body: "Run accounting on its own, auditing on its own, or both together. An administrator decides what is enabled, and can change it at any time.",
  },
  {
    number: "06",
    title: "George is embedded, not bolted on",
    body: "He works inside the same workbench, on the same data, under the same permissions as the people around him. There is no separate AI tool to reconcile against.",
  },
];

/** "What we hold to" — six commitments in a 2×3 grid, numbered like a
 *  charter rather than illustrated like a feature list. */
export function AboutCommitments() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  useSectionReveal(headerRef, { targets: [".type-label", "h2"] });

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = gridRef.current ? Array.from(gridRef.current.children) : [];
      if (!cards.length) return;
      const compact = window.matchMedia("(max-width: 1023px)").matches;

      gsap.from(cards, {
        y: compact ? 16 : 22,
        autoAlpha: 0,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: gridRef.current, start: "top 78%", once: true },
      });
    },
    { scope: gridRef },
  );

  return (
    <section className="site-gutter site-section bg-white">
      <div className="mx-auto max-w-[1280px]">
        <div ref={headerRef} className="max-w-2xl">
          <p className="type-label text-violet">What we hold to</p>
          <h2 className="type-h2 mt-5 text-ink">
            Six commitments the product is built around.
          </h2>
        </div>

        <ul ref={gridRef} className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16">
          {COMMITMENTS.map(({ number, title, body }) => (
            <li
              key={number}
              className="rounded-site border border-neutral-200 bg-neutral-25 card-pad"
            >
              <p className="type-label text-violet">{number}</p>
              <h3 className="type-h3 mt-4 text-ink">{title}</h3>
              <p className="type-body-s mt-3 max-w-[28rem] text-body">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default AboutCommitments;
