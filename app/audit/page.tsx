import type { Metadata } from "next";

import { AuditAccountingLink } from "@/components/audit-accounting-link";
import { AuditCta } from "@/components/audit-cta";
import { AuditHero } from "@/components/audit-hero";
import { AuditInitiation } from "@/components/audit-initiation";
import { AuditLine } from "@/components/audit-line";
import { AuditPreparationLog } from "@/components/audit-preparation-log";
import { AuditWorkflowBoard } from "@/components/audit-workflow-board";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Workflow } from "@/components/workflow";

export const metadata: Metadata = {
  title: "Auditing — OrditAI",
  description:
    "An audit runs in a fixed order, and so does the module. What George prepares at each stage, and what stays with you.",
}; 

export default function AuditPage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Navbar />
      <main>
        <AuditHero />
        <Workflow />
        <AuditWorkflowBoard />
        <AuditInitiation />
        <AuditPreparationLog />
        <AuditLine />
        <AuditAccountingLink />
        <AuditCta />
      </main>
      <Footer />
    </div>
  );
}
