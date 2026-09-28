"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { CtaPanel } from "@/components/cta-panel";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Pricing page close — same CtaPanel shell as the homepage/security close,
 *  over a flat neutral panel. The reveal is scoped locally so the shared
 *  CtaPanel stays untouched. */
export function PricingProcurementCta() {
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
        panelClassName="bg-cover bg-center"
        panelStyle={{ backgroundImage: "url(/Cta-bg.png)" }}
        heading="Larger firm, or a formal procurement process?"
        description="Annual invoicing, security review, and answers to your questionnaire before you commit."
        primary={{ label: "Talk to us", href: "#contact" }}
        secondary={{ label: "Start free", href: "/sign-up", icon: false }}
      />
    </div>
  );
}

export default PricingProcurementCta;
