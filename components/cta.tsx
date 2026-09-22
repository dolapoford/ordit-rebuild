"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { CtaPanel } from "@/components/cta-panel";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Closing CTA — centred headline over the Cta-bg.png panel, two doors:
 *  Book a demo (firm) and Start free (individual). The reveal is scoped
 *  locally so the shared CtaPanel (also used by /security) stays untouched. */
export function Cta() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const heading = scopeRef.current?.querySelector("h2");
      const description = scopeRef.current?.querySelector("p");
      const actions = scopeRef.current?.querySelector(".mt-10");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: scopeRef.current, start: "top 75%", once: true },
        defaults: { ease: "power3.out" },
      });

      if (heading) tl.from(heading, { autoAlpha: 0, y: 24, duration: 0.7 });
      if (description) tl.from(description, { autoAlpha: 0, y: 16, duration: 0.5 }, "-=0.35");
      if (actions) tl.from(actions, { autoAlpha: 0, y: 16, scale: 0.98, duration: 0.5 }, "-=0.3");
    },
    { scope: scopeRef },
  );

  return (
    <div ref={scopeRef} className="contents">
      <CtaPanel
        panelClassName="bg-cover bg-center"
        panelStyle={{ backgroundImage: "url(/Cta-bg.png)" }}
        heading={
          <>
            Put George on your{" "}
            <span className="block text-violet">next engagement.</span>
          </>
        }
        description="Start on your own engagement today, or bring George to the whole firm."
        primary={{ label: "Book a demo", href: "#contact" }}
        secondary={{ label: "Start free", href: "/sign-up" }}
      />
    </div>
  );
}

export default Cta;
