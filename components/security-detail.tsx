"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useSectionReveal } from "@/hooks/use-section-reveal";
import { useParallax } from "@/hooks/use-parallax";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ROWS: { label: string; value: string }[] = [
  {
    label: "Encryption in transit",
    value: "TLS 1.3 with FIPS-validated ciphers",
  },
  { label: "Encryption at rest", value: "All client data encrypted at rest" },
  {
    label: "Tenant separation",
    value:
      "Client data is separated between tenants. Role- and permission-level segregation within a tenant is in development.",
  },
  {
    label: "Identity",
    value: "Microsoft Entra ID — multi-tenant, with external federation",
  },
  {
    label: "Access logs",
    value: "Working-paper access restricted and logged by role",
  },
  {
    label: "Administrative changes",
    value: "Every change recorded and visible in the app",
  },
  { label: "Backups", value: "Rollback and restoration from backup" },
  {
    label: "At close-out",
    value: "Authorised disposal of transitory data when the file closes",
  },
  {
    label: "Deployment",
    value: "Containerised, with rolling zero-downtime upgrades",
  },
  { label: "Availability", value: "Service-level and uptime reporting" },
  {
    label: "Hosting, sub-processors & certifications",
    value: "Set out in full in the security pack",
  },
];

/** Security page — "In detail": copy and decorative artwork on the left,
 *  a scannable spec sheet of every answer a procurement review asks for
 *  on the right. The table reveals container → rows → label/value, as if
 *  each requirement is being checked off. */
export function SecurityDetail() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDListElement>(null);

  useSectionReveal(leftRef, { targets: [".type-label", "h2", "p"] });

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        illustrationRef.current,
        { autoAlpha: 0, scale: 0.95, y: 20 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: illustrationRef.current, start: "top 85%", once: true },
        },
      );
    },
    { scope: sectionRef },
  );
  useParallax(illustrationRef, { trigger: sectionRef, distance: 18 });

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rows = tableRef.current ? Array.from(tableRef.current.children) : [];
      if (!rows.length) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: tableRef.current, start: "top 80%", once: true },
      });

      tl.fromTo(
        tableRef.current,
        { autoAlpha: 0, scale: 0.99 },
        { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power2.out" },
      );

      rows.forEach((row, i) => {
        const dt = row.querySelector("dt");
        const dd = row.querySelector("dd");
        tl.from(row, { y: 8, autoAlpha: 0.7, duration: 0.35, ease: "power2.out" }, i === 0 ? "-=0.15" : "-=0.25");
        if (dt) tl.from(dt, { autoAlpha: 0, duration: 0.25 }, "<+=0.03");
        if (dd) tl.from(dd, { autoAlpha: 0, duration: 0.25 }, "<+=0.08");
      });
    },
    { scope: tableRef },
  );

  return (
    <section ref={sectionRef} className="site-gutter site-section relative overflow-hidden bg-neutral-25">
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <div ref={leftRef}>
          <p className="type-label text-violet">In detail</p>

          <h2 className="type-h1 mt-6 text-ink">
            The answers a <span className="text-violet">security review</span>{" "}
            asks for.
          </h2>

          <p className="mt-7 max-w-[30rem] text-lg leading-[1.6] text-body">
            Everything a procurement team needs to score us, in one place.
          </p>

          <div ref={illustrationRef} className="mx-auto mt-10 hidden max-w-[26rem] lg:block">
            <Image
              src="/security.png"
              alt=""
              aria-hidden
              width={1234}
              height={1140}
              className="h-auto w-full"
            />
          </div>
        </div>

        <dl ref={tableRef} className="rounded-site border border-neutral-200 bg-white px-8 sm:px-10">
          {ROWS.map(({ label, value }) => (
            <div
              key={label}
              className="grid gap-2 border-b border-neutral-100 py-6 last:border-b-0 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8"
            >
              <dt className="font-semibold text-ink">{label}</dt>
              <dd className="text-body">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default SecurityDetail;
