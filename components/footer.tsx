"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Press } from "@/components/motion/press";
import { useBackgroundDrift } from "@/hooks/use-background-drift";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Accounting", href: "/accounting" },
       { label: "Auditing", href: "/audit" },
      { label: "For firms", href: "/for-firms" },
      { label: "Security", href: "/security" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Sign in", href: "/sign-in" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

/** Footer — brand, tagline and demo CTA on the left, three link columns on
 *  the right, then a single utility bar, all over footerbg.png. */
export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const utilityRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: footerRef.current, start: "top 92%", once: true },
        defaults: { ease: "power3.out" },
      });

      tl.from(brandRef.current, { y: 20, autoAlpha: 0, duration: 0.6 })
        .from(
          columnsRef.current ? Array.from(columnsRef.current.children) : [],
          { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.08 },
          "-=0.35",
        )
        .from(utilityRef.current, { y: 10, autoAlpha: 0, duration: 0.4 }, "-=0.2");
    },
    { scope: footerRef },
  );

  // Subtle depth on the footer's orbital-line background artwork.
  useBackgroundDrift(footerRef, { distance: 3 });

  return (
    <footer
      ref={footerRef}
      className="site-gutter bg-neutral-25 bg-cover bg-center pt-16 lg:pt-[104px]"
      style={{ backgroundImage: "url(/footerbg.png)" }}
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-x-24">
          {/* Brand */}
          <div ref={brandRef} className="flex flex-col items-start">
            <Link href="/" aria-label="OrditAI home" className="w-fit">
              <Image
                src="/logo.png"
                alt="OrditAI"
                width={220}
                height={50}
                className="h-[52px] w-auto"
              />
            </Link>
            <p className="type-lead mt-5 max-w-[26rem] text-body">
              AI that works with you, so you stay in control.
            </p>
            <Press className="mt-8">
              <Link
                href="/contact"
                className={cn(
                  buttonVariants(),
                  "px-8",
                )}
              >
                Book a demo
                <ArrowRight aria-hidden />
              </Link>
            </Press>
          </div>

          {/* Link columns */}
          <div ref={columnsRef} className="grid grid-cols-2 gap-x-16 gap-y-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="type-label uppercase text-neutral-400">
                  {col.title}
                </p>
                <ul className="mt-6 flex flex-col gap-4">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="type-body-s text-ink transition-colors duration-150 ease-out hover:text-violet"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Utility bar */}
        <div ref={utilityRef} className="type-caption mt-14 flex flex-col gap-2 border-t border-neutral-200 py-8 text-body sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} OrditAI</p>
          <p>Built for audit firms</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
