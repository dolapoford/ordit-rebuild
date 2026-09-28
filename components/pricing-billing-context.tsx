"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type BillingPeriod = "monthly" | "yearly";

type PricingBillingContextValue = {
  period: BillingPeriod;
  setPeriod: (period: BillingPeriod) => void;
};

const PricingBillingContext = createContext<PricingBillingContextValue | null>(null);

export function PricingBillingProvider({ children }: { children: ReactNode }) {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  return (
    <PricingBillingContext.Provider value={{ period, setPeriod }}>
      {children}
    </PricingBillingContext.Provider>
  );
}

export function usePricingBilling() {
  const ctx = useContext(PricingBillingContext);
  if (!ctx) {
    throw new Error("usePricingBilling must be used within a PricingBillingProvider");
  }
  return ctx;
}
