"use client";

import { usePricingBilling, type BillingPeriod } from "@/components/pricing-billing-context";
import { cn } from "@/lib/utils";

const OPTIONS: { label: string; value: BillingPeriod }[] = [
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

/** Pricing page billing-period switch. Drives PricingPlans via
 *  PricingBillingProvider — selecting Yearly changes the prices shown below. */
export function PricingToggle() {
  const { period, setPeriod } = usePricingBilling();

  return (
    <div
      role="tablist"
      aria-label="Billing period"
      className="mx-auto mt-10 inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-1.5"
    >
      {OPTIONS.map((option) => {
        const isActive = option.value === period;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setPeriod(option.value)}
            className={cn(
              "type-body-s rounded-full px-6 py-2.5 font-medium whitespace-nowrap transition-colors duration-150 ease-out",
              isActive
                ? "bg-violet text-white"
                : "text-body hover:text-ink",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default PricingToggle;
