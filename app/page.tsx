import { Challenge } from "@/components/challenge";
import { Cta } from "@/components/cta";
import { Defensible } from "@/components/defensible";
import { Footer } from "@/components/footer";
import { ForFirms } from "@/components/for-firms";
import { Hero } from "@/components/hero";
import { HumanLoop } from "@/components/human-loop";
import { Navbar } from "@/components/navbar";
import { WhoGeorgeIs } from "@/components/who-george-is";
import { Workflow } from "@/components/workflow";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Navbar />

      <main>
        <Hero />
        <WhoGeorgeIs />
        <Challenge />
        {/* Workflow ("An audit engagement, end to end.") is intentionally
            unanimated beyond its own existing pinned-scroll mechanics. */}
        <Workflow />
        <HumanLoop />
        <Defensible />
        <ForFirms />
        <Cta />
      </main>

      <Footer />
    </div>
  );
}
