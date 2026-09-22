"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

const OPTIONS = ["Monthly", "Yearly", "Extended access"] as const;

/** Pricing page billing-period switch. Purely presentational for now — only
 *  monthly prices exist in PricingPlans, so switching tabs re-styles the
 *  active pill without changing the numbers below. Wire in Yearly/Extended
 *  pricing once that data exists. */
export function PricingToggle() {
  const [active, setActive] = useState<(typeof OPTIONS)[number]>("Monthly");

  return (
    <div
      role="tablist"
      aria-label="Billing period"
      className="mx-auto mt-10 inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-1.5"
    >
      {OPTIONS.map((option) => {
        const isActive = option === active;
        return (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setActive(option)}
            className={cn(
              "type-body-s rounded-full px-6 py-2.5 font-medium whitespace-nowrap transition-colors duration-150 ease-out",
              isActive
                ? "bg-violet text-white"
                : "text-body hover:text-ink",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default PricingToggle;
