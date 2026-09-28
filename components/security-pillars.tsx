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
    title: "Client data is separated",
    body: "Data belonging to one client is separated from another’s at the tenant boundary, and from another person at your own firm by role and permission.",
  },
  {
    number: "02",
    title: "Access follows the role",
    body: "A person sees the engagements they were invited to and nothing else, with access following the role they already hold at your firm — mapped from Microsoft Entra ID rather than maintained twice.",
  },
  {
    number: "03",
    title: "Audit activity is recorded",
    body: "Audit activity is tracked across the engagement, working-paper access is restricted and logged by role, and administrative changes are visible in the app.",
  },
];

/** Security page commitments — three numbered cards under a centred
 *  heading. The cards rise in sequence as the grid enters view. */
export function SecurityPillars() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  useSectionReveal(headerRef, { targets: [".type-label", "h2", ".type-lead"] });

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = gridRef.current ? Array.from(gridRef.current.children) : [];
      if (!cards.length) return;
      const compact = window.matchMedia("(max-width: 1023px)").matches;

      gsap.from(cards, {
        y: compact ? 16 : 24,
        autoAlpha: 0,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true },
      });
    },
    { scope: gridRef },
  );

  return (
    <section className="site-gutter site-section bg-white">
      <div className="mx-auto max-w-[1280px]">
        <div ref={headerRef} className="mx-auto max-w-3xl text-center">
          <p className="type-label text-violet">
            Built on three commitments
          </p>
          <h2 className="type-h2 mt-5 text-ink">
            <span className="text-violet">Three commitments</span> the product
            is built around.
          </h2>
          <p className="type-lead mx-auto mt-5 max-w-2xl text-body">
            These describe how Ordit is designed to behave. They are stated here
            as design intent and must be confirmed by Ordit before publication.
          </p>
        </div>

        <ul ref={gridRef} className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16">
          {COMMITMENTS.map(({ number, title, body }) => (
            <li
              key={number}
              className="rounded-site border border-neutral-200 bg-neutral-25 card-pad"
            >
              <span className="flex size-[52px] items-center justify-center rounded-lg bg-violet-50 type-label text-violet">
                {number}
              </span>
              <h3 className="type-h3 mt-6 text-ink">{title}</h3>
              <p className="type-body-s mt-3 text-body">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default SecurityPillars;
