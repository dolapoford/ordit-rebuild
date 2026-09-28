"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog } from "@base-ui/react/dialog";
import { ChevronDown, Menu, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { buttonVariants } from "@/components/ui/button";
import { Press } from "@/components/motion/press";

gsap.registerPlugin(useGSAP);

// design.md §4.9 — six top-level items plus a primary CTA. Security sits at
// top level because it is the first question this buyer asks. No Resources
// menu until there is something behind it.
const MODULE_LINKS = [
  { label: "Accounting", href: "/accounting" },
  { label: "Auditing", href: "/audit" },
];

const HOME_LINK = { label: "Home", href: "/" };

const NAV_LINKS = [
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
          <li>
            <Link
              href={HOME_LINK.href}
              className="type-body-s text-ink transition-colors duration-150 ease-out hover:text-violet"
            >
              {HOME_LINK.label}
            </Link>
          </li>

          <li className="group relative">
            <button
              type="button"
              className="type-body-s flex cursor-default items-center gap-1 text-ink transition-colors duration-150 ease-out group-hover:text-violet group-focus-within:text-violet"
            >
              Modules
              <ChevronDown
                aria-hidden
                className="size-3.5 transition-transform duration-150 ease-out group-hover:rotate-180 group-focus-within:rotate-180"
              />
            </button>

            <div className="invisible absolute top-full left-0 z-50 pt-3 opacity-0 transition-[opacity,visibility] duration-150 ease-out group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <ul className="min-w-44 rounded-lg border border-neutral-200 bg-white p-1.5">
                {MODULE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="type-body-s block rounded-md px-3 py-2.5 text-ink transition-colors duration-150 ease-out hover:bg-neutral-50 hover:text-violet"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

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
            <Link href="/contact" className={buttonVariants()}>
              Book a demo
            </Link>
          </Press>

          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex size-11 shrink-0 items-center justify-center rounded-lg text-ink transition-colors duration-150 ease-out hover:bg-neutral-50 lg:hidden"
            >
              {menuOpen ? (
                <X aria-hidden className="size-6" />
              ) : (
                <Menu aria-hidden className="size-6" />
              )}
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Backdrop className="fixed inset-0 z-40 bg-ink/20 transition-opacity duration-200 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 lg:hidden" />
              <Dialog.Popup className="site-gutter fixed inset-x-0 top-18 z-40 max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-neutral-200 bg-white pt-2 pb-8 transition-[opacity,transform] duration-200 ease-out data-ending-style:-translate-y-2 data-ending-style:opacity-0 data-starting-style:-translate-y-2 data-starting-style:opacity-0 lg:hidden">
                <Dialog.Title className="sr-only">Menu</Dialog.Title>

                <ul className="flex flex-col divide-y divide-neutral-200">
                  <li>
                    <Link
                      href={HOME_LINK.href}
                      onClick={() => setMenuOpen(false)}
                      className="type-h3 block py-4 text-ink transition-colors duration-150 ease-out hover:text-violet"
                    >
                      {HOME_LINK.label}
                    </Link>
                  </li>
                  <li className="py-4">
                    <p className="type-label text-neutral-400">Modules</p>
                    <ul className="mt-2 flex flex-col">
                      {MODULE_LINKS.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="type-h3 block py-2 text-ink transition-colors duration-150 ease-out hover:text-violet"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
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

                <div className="mt-4 border-t border-neutral-200 pt-6">
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
