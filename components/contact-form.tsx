"use client";

import { useActionState, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useFormStatus } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { submitContactForm, type ContactFormState } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Press } from "@/components/motion/press";
import { useSectionReveal } from "@/hooks/use-section-reveal";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const INITIAL_STATE: ContactFormState = {
  status: "idle",
  message: "",
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Press className="max-sm:w-full" hoverScale={1.03}>
      <Button type="submit" disabled={pending} className="px-8 max-sm:w-full">
        {pending ? "Sending…" : "Send message"}
        {!pending && <ArrowRight aria-hidden />}
      </Button>
    </Press>
  );
}

/** Contact page — copy and other ways to reach us on the left (same shape
 *  as SecurityDetail's left column), the form itself in a bordered card on
 *  the right. Carries id="contact" so the shared nav/footer "Book a demo"
 *  and "#contact" links land here, same as CtaPanel does on other pages. */
export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, INITIAL_STATE);
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLFormElement>(null);

  useSectionReveal(leftRef, { targets: [".type-label", "h2", "p", "a"] });

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        cardRef.current,
        { autoAlpha: 0, scale: 0.98, y: 20 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 82%", once: true },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="site-gutter site-section scroll-mt-24 bg-neutral-25"
    >
      <div className="mx-auto grid max-w-[1280px] items-start gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <div ref={leftRef}>
          <p className="type-label text-violet">Other ways to reach us</p>

          <h2 className="type-h2 mt-6 text-ink">
            Prefer <span className="text-violet">email</span> to a form?
          </h2>

          <p className="mt-7 max-w-[30rem] text-lg leading-[1.6] text-body">
            Write to us directly and a person will reply — not an autoresponder.
          </p>

          <a
            href="mailto:hello@orditai.com"
            className="type-h3 mt-6 inline-block text-violet transition-colors duration-150 ease-out hover:text-violet-700"
          >
            hello@orditai.com
          </a>

          <dl className="mt-10 flex flex-col gap-6 border-t border-neutral-200 pt-8">
            <div>
              <dt className="type-label text-neutral-400">Response time</dt>
              <dd className="type-body-s mt-1.5 text-ink">Within one business day</dd>
            </div>
            <div>
              <dt className="type-label text-neutral-400">Running a security review or RFI</dt>
              <dd className="mt-1.5">
                <Link
                  href="/security"
                  className="type-body-s text-violet transition-colors duration-150 ease-out hover:text-violet-700"
                >
                  See the security pack →
                </Link>
              </dd>
            </div>
          </dl>
        </div>

        <form
          ref={cardRef}
          action={formAction}
          noValidate
          className="rounded-site border border-neutral-200 bg-white card-pad lg:px-10 lg:py-10"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                aria-invalid={Boolean(state.errors.name)}
                aria-describedby={state.errors.name ? "name-error" : undefined}
                className="mt-2"
              />
              {state.errors.name && (
                <p id="name-error" className="type-caption mt-1.5 text-risk-high">
                  {state.errors.name}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-invalid={Boolean(state.errors.email)}
                aria-describedby={state.errors.email ? "email-error" : undefined}
                className="mt-2"
              />
              {state.errors.email && (
                <p id="email-error" className="type-caption mt-1.5 text-risk-high">
                  {state.errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <Label htmlFor="firm">Firm name (optional)</Label>
            <Input id="firm" name="firm" type="text" autoComplete="organization" className="mt-2" />
          </div>

          <div className="mt-6">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              required
              aria-invalid={Boolean(state.errors.message)}
              aria-describedby={state.errors.message ? "message-error" : undefined}
              className="mt-2"
            />
            {state.errors.message && (
              <p id="message-error" className="type-caption mt-1.5 text-risk-high">
                {state.errors.message}
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <SubmitButton />
            {state.status !== "idle" && (
              <div
                role="status"
                aria-live="polite"
                className={cn(
                  "type-body-s rounded-lg border-l-[3px] px-4 py-3 sm:flex-1",
                  state.status === "success"
                    ? "border-violet bg-violet-50 text-ink"
                    : "border-risk-high bg-risk-bg-high text-risk-high",
                )}
              >
                {state.message}
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
