import type { Metadata } from "next";
import { Caveat, Host_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SmoothScroll } from "@/components/smooth-scroll";

// Host Grotesk throughout, weights 300–800 (variable).
const host = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

// Handwritten margin notes only.
const caveat = Caveat({ subsets: ["latin"], variable: "--font-hand" });

export const metadata: Metadata = {
  title: "OrditAI — Audit workflows built for humans",
  description:
    "George is an AI preparer, not an AI auditor. He prepares; you review; you sign.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", host.variable, caveat.variable)}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
