import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SecurityCta } from "@/components/security-cta";
import { SecurityDetail } from "@/components/security-detail";
import { SecurityHero } from "@/components/security-hero";
import { SecurityPillars } from "@/components/security-pillars";

export const metadata: Metadata = {
  title: "Security — OrditAI",
  description:
    "Where your clients' data goes, and who can reach it. A straight answer about where confidential financial records live and who can see them.",
};

export default function SecurityPage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Navbar />
      <main>
        <SecurityHero />
        <SecurityPillars />
        <SecurityDetail />
        <SecurityCta />
      </main>
      <Footer />
    </div>
  );
}
