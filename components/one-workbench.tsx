"use client";

import { useRef } from "react";

import { useSectionReveal } from "@/hooks/use-section-reveal";

/** Accounting page — closing bridge to the auditing module: same ledger,
 *  same firm, no export between them. accounting-bg.png ground, reused
 *  from the hero to bookend the page. */
export function OneWorkbench() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionReveal(sectionRef, { targets: [".type-label", "h2", ".ow-desc"] });

  return (
    <section
      ref={sectionRef}
      className="site-gutter site-section relative overflow-hidden bg-white md:bg-[url('/accounting-bg.png')] md:bg-cover md:bg-right"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-2xl">
          <p className="type-label text-violet">
            One workbench
          </p>
          <h2 className="type-h2 mt-5 text-ink">
            If you audit too, <span className="text-violet">it is the same data.</span>
          </h2>
          <p className="ow-desc type-body mt-6 text-body">
            The auditing module reads the books the accounting module keeps —
            no export, no re-keying, no second copy to reconcile. A firm that
            runs only one module never sees the other, and the separation
            between a firm&rsquo;s own books and a client engagement is
            absolute either way.
          </p>
        </div>
      </div>
    </section>
  );
}

export default OneWorkbench;
