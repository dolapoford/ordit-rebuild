import { Challenge } from "@/components/challenge";
import { Cta } from "@/components/cta";
import { Defensible } from "@/components/defensible";
import { Footer } from "@/components/footer";
import { ForFirms } from "@/components/for-firms";
import { Hero } from "@/components/hero";
import { HumanLoop } from "@/components/human-loop";
import { Navbar } from "@/components/navbar";
import { WhoGeorgeIs } from "@/components/who-george-is";
import { Modules } from "@/components/modules";
import { Hero2 } from "@/components/hero-2";
import { GeorgeBand } from "@/components/george-band";
import { EnterpriseDashboard } from "@/components/enterprise-dashboard";
export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Navbar />

      <main>
        <Hero2 />
        <Modules/>
        <EnterpriseDashboard />
        <WhoGeorgeIs />
        <GeorgeBand/>
        {/* <Challenge /> */}
        <HumanLoop />
        <Defensible />
        <ForFirms />
        <Cta />
      </main>

      <Footer />
    </div>
  );
}
