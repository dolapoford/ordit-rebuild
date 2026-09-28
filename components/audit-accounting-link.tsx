"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { buttonVariants } from "@/components/ui/button";
import { Press } from "@/components/motion/press";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Audit page — small cross-link banner back to the accounting module, the
 *  reverse of OneWorkbench's "same data" pitch on the accounting page. */
export function AuditAccountingLink() {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(cardRef.current, {
        y: 20,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 85%", once: true },
      });
    },
    { scope: cardRef },
  );

  return (
    <section className="site-gutter py-6 lg:py-10">
      <div
        ref={cardRef}
        className="mx-auto flex max-w-[1280px] flex-col gap-6 rounded-xl bg-violet-50 px-8 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10"
      >
        <div>
          <h3 className="type-h3 text-ink">Keeping the books as well?</h3>
          <p className="type-body-s mt-2 text-body">
            The accounting module posts to the same ledger this audit file
            reads from.
          </p>
        </div>

        <Press className="self-start sm:self-center">
          <Link
            href="/accounting"
            className={`${buttonVariants({ variant: "link", size: "text" })} shrink-0`}
          >
            Explore accounting
            <ArrowRight aria-hidden />
          </Link>
        </Press>
      </div>
    </section>
  );
}

export default AuditAccountingLink;
