"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, FileText, Layers, User, Users } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSectionReveal } from "@/hooks/use-section-reveal";
import { useCardStagger } from "@/hooks/use-card-stagger";
import { Press } from "@/components/motion/press";
import { FeatureCard } from "@/components/motion/feature-card";

const FEATURES = [
  {
    title: "Single sign-on",
    body: "Sign in with Microsoft Entra ID and inherit the roles and groups people already hold.",
    icon: User,
  },
  {
    title: "Roles & permissions",
    body: "Partner, manager, senior, reviewer, read-only. What a person can do follows their role.",
    icon: Users,
  },
  {
    title: "Engagement separation",
    body: "Every client and engagement is its own workspace. People see only what they are invited to.",
    icon: Layers,
  },
  {
    title: "Complete audit trail",
    body: "Every action, change and sign-off — logged, searchable, and restricted by role.",
    icon: FileText,
  },
];

/** For firms — dark enterprise band over firmBg.png: headline + CTA on top,
 *  four capability cards below. Dark ground uses locked/ink; violet-300 is
 *  the designated dark-mode accent (design.md §2.1). */
export function ForFirms() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useSectionReveal(headerRef, { targets: [".ff-eyebrow", "h2", ".ff-desc", ".ff-cta"] });
  useCardStagger(gridRef, { cardSelector: ".ff-card" });

  return (
    <section
      id="for-firms"
      className="site-gutter site-section scroll-mt-24 bg-ink bg-cover bg-center text-white"
      style={{ backgroundImage: "url(/firmBg.png)" }}
    >
      <div className="mx-auto max-w-[1280px]">
        <div ref={headerRef} className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <p className="ff-eyebrow type-label flex items-center gap-4 text-violet-300">
              FOR FIRMS
              <span className="h-px w-16 bg-violet-300/60" aria-hidden />
            </p>
            <h2 className="type-h1 mt-6 text-white">
              Built for the way audit firms{" "}
              <span className="text-violet-300">actually work.</span>
            </h2>
          </div>

          <div>
            <p className="ff-desc type-body max-w-[32rem] text-white/70">
              Your organisation, your roles and your separation rules —
              inherited from the identity you already use, and enforced on
              every engagement.
            </p>
            <Press className="ff-cta mt-8 max-sm:w-full">
              <Link
                href="/for-firms"
                className={cn(buttonVariants(), "max-sm:w-full")}
              >
                Explore for firms
                <ArrowRight aria-hidden />
              </Link>
            </Press>
          </div>
        </div>

        <div ref={gridRef} className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="ff-card">
              <FeatureCard title={feature.title} body={feature.body} icon={feature.icon} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ForFirms;
