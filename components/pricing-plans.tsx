import Link from "next/link";
import { Check } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Basic",
    price: "$15.00",
    description:
      "For a solo practitioner who wants George on one engagement at a time.",
    features: [
      "1 workspace",
      "AI access — limited allowance",
      "File upload — limited allowance",
      "Single user",
      "5 financial reports per month",
      "Single entity journal access",
    ],
  },
  {
    name: "Professional",
    price: "$30.00",
    description:
      "For a small practice running several client engagements in parallel.",
    highlight: true,
    features: [
      "Everything in Basic",
      "Up to 50 workspaces",
      "Invite up to 10 collaborators",
      "Full AI access",
      "Financial forecasts and predictions",
      "50 financial reports and statements per month",
    ],
  },
  {
    name: "Enterprise",
    price: "$50.00",
    description:
      "For a firm that needs no ceiling on engagements, people or output.",
    features: [
      "Everything in Professional",
      "Unlimited workspaces",
      "Unlimited collaborators",
      "Advanced AI access",
      "Advanced financial forecasts and predictions",
      "Unlimited financial reports and statements",
    ],
  },
];

/** Pricing page — three-tier plan grid. Professional is raised and coloured
 *  to read as the recommended tier; the other two share the plain card
 *  style used across the site (border-neutral-200 on white). */
export function PricingPlans() {
  return (
    <section className="site-gutter bg-white pb-20 lg:pb-32">
      <ul className="mx-auto grid max-w-[1280px] gap-6 lg:grid-cols-3 lg:items-start">
        {PLANS.map((plan) => (
          <li
            key={plan.name}
            className={cn(
              "relative flex flex-col rounded-site border p-8",
              plan.highlight
                ? "border-transparent bg-violet text-white lg:-my-6 lg:py-14"
                : "border-neutral-200 bg-white",
            )}
          >
            {plan.highlight && (
              <span className="absolute right-8 top-8 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white">
                Most popular
              </span>
            )}

            <p
              className={cn(
                "type-label",
                plan.highlight ? "text-white/70" : "text-neutral-400",
              )}
            >
              {plan.name}
            </p>

            <p className="mt-5 flex items-baseline gap-1.5">
              <span className="text-5xl font-bold tracking-[-0.02em]">
                {plan.price}
              </span>
              <span
                className={cn(
                  "text-base",
                  plan.highlight ? "text-white/70" : "text-body",
                )}
              >
                /month
              </span>
            </p>

            <p
              className={cn(
                "mt-4 text-base leading-[1.6]",
                plan.highlight ? "text-white/80" : "text-body",
              )}
            >
              {plan.description}
            </p>

            <Link
              href="#contact"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-7 w-full",
                plan.highlight && "border-transparent bg-white text-ink hover:bg-neutral-50",
              )}
            >
              Get started
            </Link>

            <ul
              className={cn(
                "mt-8 space-y-4 border-t pt-7",
                plan.highlight ? "border-white/15" : "border-neutral-100",
              )}
            >
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-base">
                  <span
                    className={cn(
                      "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                      plan.highlight
                        ? "bg-white/20 text-white"
                        : "bg-violet-50 text-violet",
                    )}
                  >
                    <Check aria-hidden className="size-3" strokeWidth={3} />
                  </span>
                  <span
                    className={plan.highlight ? "text-white/90" : "text-ink/80"}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <p
              className={cn(
                "mt-6 text-sm",
                plan.highlight ? "text-white/60" : "text-neutral-400",
              )}
            >
              Full feature list on request
            </p>
          </li>
        ))}
      </ul>

      <p className="type-label mt-10 text-center text-neutral-400">
        Free 30-day trial · No credit card required
      </p>
    </section>
  );
}

export default PricingPlans;
