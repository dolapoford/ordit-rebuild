"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * "An audit isn't a prompt. It's a process." — the strongest scroll sequence
 * on the page outside the (untouched) workflow belt: headline reveals first,
 * then the old-way visual, then the connector, then the new-way visual,
 * then the footer strip. Not a blanket fade.
 */
export function Challenge() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const oldRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const newRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

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
          sectionRef.current?.querySelectorAll(".challenge-line") ?? [],
          { yPercent: 100, duration: 0.7, stagger: 0.08 },
          "-=0.3",
        )
        .fromTo(
          oldRef.current,
          { autoAlpha: 0, scale: 0.98, y: 20 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.7 },
          "-=0.2",
        )
        .fromTo(
          arrowRef.current,
          { autoAlpha: 0, scale: 0 },
          { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" },
          "-=0.3",
        )
        .fromTo(
          newRef.current,
          { autoAlpha: 0, scale: 0.98, y: 24 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.7 },
          "-=0.25",
        )
        .from(footerRef.current, { autoAlpha: 0, y: 12, duration: 0.5 }, "-=0.2");
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="the-challenge"
      className="site-gutter site-section bg-neutral-25"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div ref={headerRef} className="mx-auto max-w-4xl text-center">
          <p className="type-label text-neutral-400">The challenge</p>
          <h2 className="type-h1 mt-5 text-ink">
            <span className="block overflow-hidden">
              <span className="challenge-line block">An audit isn&rsquo;t a prompt.</span>
            </span>
            <span className="block overflow-hidden">
              <span className="challenge-line block text-violet">It&rsquo;s a process.</span>
            </span>
          </h2>
          <p className="type-lead mx-auto mt-5 max-w-3xl text-body">
            Audits move through planning, risk assessment, procedures, evidence,
            review, findings and reporting. Today, that work is often scattered
            across tools, files and people. Ordit brings it all together in one
            connected environment.
          </p>
        </div>

        {/* Old way vs new way */}
        <div className="relative mt-12 grid gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-24">
          <div ref={oldRef} className="flex flex-col">
            <span className="type-label w-fit rounded-full bg-neutral-100 px-4 py-2 text-neutral-800">
              The old way
            </span>
            <h3 className="type-h3 mt-5 text-ink">
              Fragmented. Time-consuming. Hard to track.
            </h3>
            <p className="type-body-s mt-2 max-w-md text-body">
              Files in different tools. Conversations in different places.
              Critical context gets lost.
            </p>
            <div className="relative mt-6 aspect-[3/2] w-full">
              <Image
                src="/old.png"
                alt="Emails, spreadsheets, documents, team chats, workpapers, findings and meetings scattered across separate tools"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-contain mix-blend-multiply"
              />
            </div>
          </div>

          {/* Arrow between the two columns */}
          <div
            ref={arrowRef}
            aria-hidden
            className="flex items-center justify-center lg:absolute lg:left-1/2 lg:top-[62%] lg:-translate-x-1/2 lg:-translate-y-1/2"
          >
            <span className="flex size-14 items-center justify-center rounded-full border border-neutral-200 bg-white text-violet lg:size-16">
              <ArrowRight className="hidden size-6 lg:block" />
              <ArrowDown className="size-6 lg:hidden" />
            </span>
          </div>

          <div ref={newRef} className="flex flex-col">
            <span className="type-label w-fit rounded-full bg-violet-50 px-4 py-2 text-violet">
              With OrditAI
            </span>
            <h3 className="type-h3 mt-5 text-ink">
              One engagement. Everything connected.
            </h3>
            <p className="type-body-s mt-2 max-w-md text-body">
              Keep your documents, workpapers, communications, findings and
              history in one place — with AI and your team working together.
            </p>
            <div className="relative mt-6 aspect-[3/2] w-full overflow-hidden rounded-site border border-neutral-200">
              <Image
                src="/new.png"
                alt="OrditAI engagement dashboard for ACME Holdings 2025 Audit, showing progress, recent activity and key items"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Footer strip */}
        <div ref={footerRef} className="type-label mt-12 flex flex-col items-start justify-between gap-3 text-neutral-400 sm:flex-row sm:items-center">
          <p className="flex items-center gap-4">
            <span className="h-px w-12 bg-neutral-300" aria-hidden />
            Built for the way audit teams really work
          </p>
          <p className="flex items-center gap-4">
            <span className="h-px w-12 bg-neutral-300" aria-hidden />
            People · Process · Evidence · Trust
          </p>
        </div>
      </div>
    </section>
  );
}

export default Challenge;
