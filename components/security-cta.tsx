"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { CtaPanel } from "@/components/cta-panel";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Security page close — same CtaPanel shell as the homepage CTA, over a
 *  flat violet-tinted panel instead of the Cta-bg.png artwork. The reveal is
 *  scoped locally so the shared CtaPanel (also used by the homepage) stays
 *  untouched. */
export function SecurityCta() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const card = scopeRef.current?.querySelector("section > div");
      const heading = card?.querySelector("h2");
      const description = card?.querySelector("p");
      const actions = card?.querySelector(".mt-10");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: scopeRef.current, start: "top 78%", once: true },
        defaults: { ease: "power3.out" },
      });

      if (card) tl.fromTo(card, { autoAlpha: 0, scale: 0.97, y: 20 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.6 });
      if (heading) {
        tl.fromTo(
          heading,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6 },
          "-=0.3",
        );
      }
      if (description) tl.from(description, { autoAlpha: 0, y: 12, duration: 0.4 }, "-=0.3");
      if (actions) tl.from(actions, { autoAlpha: 0, y: 12, scale: 0.98, duration: 0.4 }, "-=0.25");
    },
    { scope: scopeRef },
  );

  return (
    <div ref={scopeRef} className="contents">
      <CtaPanel
        panelClassName="bg-violet-50"
        heading="Take the security pack to your review."
        description="Architecture, hosting, sub-processors, certifications and policies — everything your committee will ask for."
        primary={{ label: "Request the security pack", href: "#contact", icon: false }}
        secondary={{ label: "Talk to us", href: "#contact" }}
      />
    </div>
  );
}

export default SecurityCta;
