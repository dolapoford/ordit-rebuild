"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  Link2,
  ListChecks,
  Layers,
  Paperclip,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { buttonVariants } from "@/components/ui/button";
import { Press } from "@/components/motion/press";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MODULE_CARDS = [
  {
    key: "accounting",
    icon: BookOpen,
    label: "Module 01",
    title: "Accounting",
    heading: "Keep the books.",
    body: "Everything you need to prepare, manage and review financial information — in one place.",
    features: [
      { icon: FileText, label: "Journals and ledgers, single entity or many" },
      { icon: BarChart3, label: "Financial statements, prepared and reviewed" },
      { icon: Calendar, label: "Reports on the schedule you set" },
      { icon: TrendingUp, label: "Forecasts and predictions" },
      { icon: Paperclip, label: "Source documents attached to the entries they support" },
    ],
    cta: "Explore accounting",
    href: "/accounting",
    image: "/account-two.png",
  },
  {
    key: "auditing",
    icon: ShieldCheck,
    label: "Module 02",
    title: "Auditing",
    heading: "Run the engagement.",
    body: "A complete audit workflow, from planning to closure — with everything in one file.",
    features: [
      { icon: Layers, label: "The seven-stage audit workflow" },
      { icon: FileText, label: "Procedures, evidence and findings in one file" },
      { icon: Link2, label: "Cross-referenced reporting" },
      { icon: Clock, label: "Prior-year rollover and guarded close-out" },
      { icon: ListChecks, label: "A complete, searchable activity trail" },
    ],
    cta: "Explore auditing",
    href: "/audit",
    image: "/audit-two.png",
  },
] as const;

/** "One workbench, two modules" — accounting and auditing shown as
 *  independently switchable modules of the same product. */
export function Modules() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        defaults: { ease: "power3.out" },
      });

      tl.from(
        headerRef.current?.querySelectorAll(".type-label, .type-lead") ?? [],
        { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.1 },
      )
        .from(
          sectionRef.current?.querySelectorAll(".modules-line") ?? [],
          { yPercent: 100, duration: 0.7, stagger: 0.08 },
          "-=0.3",
        )
        .from(
          cardsRef.current?.children ?? [],
          { y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.12 },
          "-=0.25",
        )
        .from(footerRef.current, { autoAlpha: 0, y: 10, duration: 0.4 }, "-=0.2");
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="site-gutter site-section bg-white">
      <div className="mx-auto max-w-[1280px]">
        <div ref={headerRef} className="mx-auto max-w-3xl text-center">
          <p className="type-label text-violet">Two modules, one workbench</p>
          <h2 className="type-h1 mt-5 text-ink">
            <span className="block overflow-hidden">
              <span className="modules-line block">
                Turn on what <span className="text-violet">your firm</span> does.
              </span>
            </span>
          </h2>
          <p className="type-lead mx-auto mt-5 max-w-2xl text-body">
          Accounting and auditing are the same workbench, with the same attribution, the same audit trail and the same George underneath. A firm that only audits never sees the ledger. A firm that only keeps books never sees an engagement file. A firm that does both works across one set of data.
          </p>
        </div>

        <div ref={cardsRef} className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2">
          {MODULE_CARDS.map(
            ({ key, icon: Icon, label, title, heading, body, features, cta, href, image }) => (
              <article
                key={key}
                className="relative flex flex-col overflow-hidden rounded-xl border border-neutral-200 p-8 lg:p-10"
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 640px, 92vw"
                  className="pointer-events-none absolute inset-0 -z-10 scale-110 object-cover"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-white via-white via-55% to-white/0"
                />

                <div className="relative z-10 flex items-center gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet">
                    <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="type-label text-neutral-400">{label}</p>
                    <p className="type-body-s font-semibold text-violet">{title}</p>
                  </div>
                </div>

                <h3 className="type-h1 relative z-10 mt-6 text-ink">{heading}</h3>
                <p className="type-body-s relative z-10 mt-3 max-w-md text-body">{body}</p>

                <ul className="relative z-10 mt-6 flex max-w-md flex-col gap-3">
                  {features.map(({ icon: FeatureIcon, label: featureLabel }) => (
                    <li key={featureLabel} className="flex items-center gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet">
                        <FeatureIcon aria-hidden className="size-4" strokeWidth={1.75} />
                      </span>
                      <span className="type-body-s text-body">{featureLabel}</span>
                    </li>
                  ))}
                </ul>

                <Press className="relative z-10 mt-8 w-fit">
                  <Link href={href} className={buttonVariants()}>
                    {cta}
                    <ArrowRight aria-hidden />
                  </Link>
                </Press>
              </article>
            ),
          )}
        </div>

        <p ref={footerRef} className="type-caption mt-8 text-neutral-400">
          Enabled per firm by an administrator, and changeable at any time.
        </p>
      </div>
    </section>
  );
}

export default Modules;
