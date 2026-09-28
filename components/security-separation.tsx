"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useSectionReveal } from "@/hooks/use-section-reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Security page — "The first question a firm asks": hierarchy artwork on
 *  the left, the plain-language answer on the right. */
export function SecuritySeparation() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useSectionReveal(copyRef, { targets: [".type-label", "h2", ".type-lead"] });

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(imageRef.current, {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="site-gutter site-section relative overflow-hidden bg-white">
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div ref={imageRef} className="mx-auto w-full max-w-[680px] lg:max-w-none">
          <Image
            src="/tenants.png"
            alt="Organisation with three clients; the second client holds two engagements, open only to the people invited"
            width={1512}
            height={1040}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="h-auto w-full"
          />
        </div>

        <div ref={copyRef}>
          <p className="type-label text-violet">
            The first question a firm asks
          </p>

          <h2 className="type-h2 mt-6 text-ink">
            One client’s data is held{" "}
            <span className="text-violet">apart from another’s.</span>
          </h2>

          <p className="type-lead mt-7 max-w-[36rem] text-body">
            Client data is separated between tenants, and role- and
            permission-level segregation inside a tenant controls what each
            person at your firm can reach. You are entitled to know exactly how
            far that goes before you ask, so we have set it out here rather than
            waiting to be asked.
          </p>
        </div>
      </div>
    </section>
  );
}

export default SecuritySeparation;
