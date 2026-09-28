import type { Metadata } from "next";

import { EnterpriseControls } from "@/components/enterprise-controls";
import { Footer } from "@/components/footer";
import { ForFirmsHero } from "@/components/for-firms-hero";
import { ModulesPerFirm } from "@/components/modules-per-firm";
import { Navbar } from "@/components/navbar";
import { RfiCta } from "@/components/rfi-cta";
import { ScaleStats } from "@/components/scale-stats";
import { Oversight } from "@/components/oversight";
import { OrgMirrored } from "@/components/org-mirrored";

export const metadata: Metadata = {
  title: "For firms — OrditAI",
  description:
    "Sign in with the identity you already use. Mirror your organisation, your roles and your teams, and keep every client and engagement apart.",
};

export default function ForFirmsPage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Navbar />
      <main>
        <ForFirmsHero />
         <ModulesPerFirm />
        <OrgMirrored />
        <EnterpriseControls />
        <Oversight />
        <ScaleStats />
        <RfiCta />
      </main>
      <Footer />
    </div>
  );
}
