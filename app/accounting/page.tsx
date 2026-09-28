import type { Metadata } from "next";

import { AccountingCapabilities } from "@/components/accounting-capabilities";
import { AccountingCta } from "@/components/accounting-cta";
import { AccountingHero } from "@/components/accounting-hero";
import { Footer } from "@/components/footer";
import { InsideTheLedger } from "@/components/inside-the-ledger";
import { Navbar } from "@/components/navbar";
import { OneWorkbench } from "@/components/one-workbench";
import { PostingFlow } from "@/components/posting-flow";

export const metadata: Metadata = {
  title: "Accounting — OrditAI",
  description:
    "George drafts the entry, shows the reasoning and the documents behind it, and stops. A named person approves it, and the ledger records which of you did what.",
};

export default function AccountingPage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Navbar />
      <main>
        <AccountingHero />
        <InsideTheLedger />
        <PostingFlow />
        <AccountingCapabilities />
        <OneWorkbench />
        <AccountingCta />
      </main>
      <Footer />
    </div>
  );
}
