import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PricingHero } from "@/components/pricing-hero";
import { PricingIncluded } from "@/components/pricing-included";
import { PricingPlans } from "@/components/pricing-plans";
import { PricingProcurementCta } from "@/components/pricing-procurement-cta";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Pricing — OrditAI",
  description:
    "Put George on an engagement this week. Every plan includes a free 30-day trial, no card required.",
};

export default function PricingPage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Navbar />
      <main>
        <Reveal trigger="load">
          <PricingHero />
        </Reveal>
        <Reveal>
          <PricingPlans />
        </Reveal>
        <Reveal>
          <PricingIncluded />
        </Reveal>
        <Reveal>
          <PricingProcurementCta />
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
