"use client";

import { useRef } from "react";
import {
  ChartNoAxesColumn,
  Clock,
  Columns2,
  Eye,
  Globe,
  Lock,
  Network,
  Users,
  Workflow,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useSectionReveal } from "@/hooks/use-section-reveal";
import { ControlCard } from "@/components/motion/control-card";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CONTROLS = [
  {
    title: "Single sign-on",
    body: "Microsoft Entra ID, multi-tenant, with external federation. Roles and groups map straight to permissions.",
    icon: Lock,
  },
  {
    title: "Roles & permissions",
    body: "Administrator, partner, manager, senior, auditor, reviewer and read-only — or define your own.",
    icon: Users,
  },
  {
    title: "Engagement separation",
    body: "Every client and engagement is its own workspace. People see only the sessions they are invited to.",
    icon: Columns2,
  },
  {
    title: "Audit trail & access logs",
    body: "Who did what, where, when and what changed — with working-paper access logs restricted by role.",
    icon: Clock,
  },
  {
    title: "Field-level visibility",
    body: "Hide configured fields from defined users, so sensitive values stay with the people who need them.",
    icon: Eye,
  },
  {
    title: "Delegated administration",
    body: "Hand administration to regional or departmental leads without giving away the whole organisation.",
    icon: Network,
  },
  {
    title: "Risk configuration",
    body: "Defining your own factors and weightings is in development. Risk levels already map to testing depth.",
    icon: ChartNoAxesColumn,
  },
  {
    title: "Workflow configuration",
    body: "Shape stages and procedures to your methodology, and roll the template out across the firm.",
    icon: Workflow,
  },
  {
    title: "English & French",
    body: "Switch language per user, with defaults set for each tenant.",
    icon: Globe,
  },
];

const ROW_PARALLAX = [5, 10, 15];

/** For firms — "Enterprise controls": centred heading over a 3×3 card grid.
 *  Reveals row by row, like a control panel coming online, with a very
 *  subtle per-row parallax for depth. */
export function EnterpriseControls() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  useSectionReveal(headerRef, { targets: [".type-label", "h2", ".type-lead"] });

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = gridRef.current ? Array.from(gridRef.current.children) : [];
      if (!cards.length) return;
      const compact = window.matchMedia("(max-width: 1023px)").matches;
      const rows = [cards.slice(0, 3), cards.slice(3, 6), cards.slice(6, 9)];

      const tl = gsap.timeline({
        scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true },
      });

      rows.forEach((row, i) => {
        tl.from(
          row,
          {
            y: compact ? 14 : 20,
            autoAlpha: 0,
            scale: 0.98,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.1,
          },
          i === 0 ? 0 : "-=0.2",
        );

        const inner = row.flatMap((card) =>
          Array.from(card.querySelectorAll(".control-icon, .control-title, .control-body")),
        );
        if (inner.length) {
          tl.from(
            inner,
            { y: 6, autoAlpha: 0, duration: 0.3, ease: "power2.out", stagger: 0.03 },
            "<+=0.1",
          );
        }
      });
    },
    { scope: gridRef },
  );

  // Row parallax — extremely subtle, for depth rather than movement.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.matchMedia("(max-width: 767px)").matches) return;
      const cards = gridRef.current ? Array.from(gridRef.current.children) : [];
      if (!cards.length) return;
      const rows = [cards.slice(0, 3), cards.slice(3, 6), cards.slice(6, 9)];

      rows.forEach((row, i) => {
        const distance = ROW_PARALLAX[i];
        gsap.fromTo(
          row,
          { y: distance },
          {
            y: -distance,
            ease: "none",
            scrollTrigger: { trigger: gridRef.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: gridRef },
  );

  return (
    <section
      id="enterprise-controls"
      className="site-gutter site-section relative overflow-hidden bg-neutral-25"
    >
      <div className="relative mx-auto max-w-[1280px]">
        <div ref={headerRef} className="mx-auto max-w-[44rem] text-center">
          <p className="type-label text-violet">Enterprise controls</p>
          <h2 className="type-h1 mt-5 text-ink">
            Everything a firm needs to run{" "}
            <span className="text-violet">audits at scale.</span>
          </h2>
          <p className="type-lead mx-auto mt-6 max-w-[34rem] text-body">
            Give every team the right access, control and visibility — so your
            firm runs with confidence.
          </p>
        </div>

        <ul ref={gridRef} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CONTROLS.map(({ title, body, icon }) => (
            <li key={title}>
              <ControlCard title={title} body={body} icon={icon} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default EnterpriseControls;
