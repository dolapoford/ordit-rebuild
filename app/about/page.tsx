import type { Metadata } from "next";

import { AboutCommitments } from "@/components/about-commitments";
import { AboutCta } from "@/components/about-cta";
import { AboutHero } from "@/components/about-hero";
import { AboutTeam } from "@/components/about-team";
import { AboutWhy } from "@/components/about-why";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "About — OrditAI",
  description:
    "Audit is the one profession where the work has to be checkable. That is not a constraint we design around — it is the reason OrditAI exists in the shape it does.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Navbar />
      <main>
        <AboutHero />
        <AboutWhy />
        <AboutCommitments />
        <AboutTeam />
        <AboutCta />
      </main>
      <Footer />
    </div>
  );
}
