"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog } from "@base-ui/react/dialog";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { buttonVariants } from "@/components/ui/button";
import { Press } from "@/components/motion/press";

gsap.registerPlugin(useGSAP);

// design.md §4.9 — six top-level items plus a primary CTA. Security sits at
// top level because it is the first question this buyer asks. No Resources
// menu until there is something behind it.
const NAV_LINKS = [
  { label: "How it works", href: "#workflow" },
  { label: "For firms", href: "/for-firms" },
  { label: "Security", href: "/security" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(headerRef.current, {
        y: -16,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    },
    { scope: headerRef },
  );

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-white transition-shadow duration-150 ease-out"
      style={{ boxShadow: scrolled ? "0 1px 0 rgba(3,1,36,.06)" : "none" }}
    >
      <nav
        aria-label="Main"
        className="site-gutter mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between"
      >
        <Link href="/" aria-label="OrditAI home" className="shrink-0">
          <Image
            src="/logo.png"
            alt="OrditAI"
            width={220}
            height={50}
            className="h-6 w-auto"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="type-body-s text-ink transition-colors duration-150 ease-out hover:text-violet"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-6">
          <Link
            href="/sign-in"
            className="type-body-s hidden font-medium text-ink transition-colors duration-150 ease-out hover:text-violet lg:inline"
          >
            Sign in
          </Link>
          <Press>
            <Link href="#contact" className={buttonVariants()}>
              Book a demo
            </Link>
          </Press>

          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex size-10 shrink-0 items-center justify-center rounded-lg text-ink transition-colors duration-150 ease-out hover:bg-neutral-50 lg:hidden"
            >
              {menuOpen ? (
                <X aria-hidden className="size-6" />
              ) : (
                <Menu aria-hidden className="size-6" />
              )}
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Backdrop className="fixed inset-0 z-40 bg-ink/20 transition-opacity duration-200 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 lg:hidden" />
              <Dialog.Popup className="site-gutter fixed inset-x-0 top-18 z-40 max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-neutral-100 bg-white pt-2 pb-8 shadow-[0_12px_28px_-12px_rgba(3,1,36,0.12)] transition-[opacity,transform] duration-200 ease-out data-ending-style:-translate-y-2 data-ending-style:opacity-0 data-starting-style:-translate-y-2 data-starting-style:opacity-0 lg:hidden">
                <Dialog.Title className="sr-only">Menu</Dialog.Title>

                <ul className="flex flex-col divide-y divide-neutral-100">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="type-h3 block py-4 text-ink transition-colors duration-150 ease-out hover:text-violet"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 border-t border-neutral-100 pt-6">
                  <Link
                    href="/sign-in"
                    onClick={() => setMenuOpen(false)}
                    className={buttonVariants({ variant: "outline", className: "w-full" })}
                  >
                    Sign in
                  </Link>
                </div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
