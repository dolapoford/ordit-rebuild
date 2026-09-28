import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { ContactHero } from "@/components/contact-hero";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Contact — OrditAI",
  description:
    "A product question, a security review, an RFI — one message reaches the right person.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Navbar />
      <main>
        <ContactHero />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
