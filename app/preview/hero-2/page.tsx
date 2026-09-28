import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { GeorgeBand } from "@/components/george-band";
import { Hero2 } from "@/components/hero-2";
import { Modules } from "@/components/modules";
import { Navbar } from "@/components/navbar";
import { WhoGeorgeIs } from "@/components/who-george-is";

export const metadata: Metadata = {
  title: "Hero preview — OrditAI",
};

export default function Hero2PreviewPage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Navbar />
      <main>
        <Hero2 />
        <Modules />
        <WhoGeorgeIs/>
        <GeorgeBand />
      </main>
      <Footer />
    </div>
  );
}
