import { PricingToggle } from "@/components/pricing-toggle";

/** Pricing page hero — flanked "Pricing" eyebrow, violet headline and the
 *  billing-period toggle, over a flat neutral-25 ground. */
export function PricingHero() {
  return (
    <section className="site-gutter site-section relative overflow-hidden bg-neutral-25 text-center">
      <div className="relative mx-auto max-w-[46rem]">
        <p className="type-label flex items-center justify-center gap-4 text-violet">
          <span className="h-px w-10 bg-violet/40" aria-hidden />
          Pricing
          <span className="h-px w-10 bg-violet/40" aria-hidden />
        </p>

        <h1 className="type-display mt-6 text-ink">
          Put George on an
          <br />
          <span className="text-violet">engagement</span> this week.
        </h1>

        <p className="type-body mt-6 text-body">
          Every plan includes a free 30-day trial. No card required to start.
        </p>

        <PricingToggle />
      </div>
    </section>
  );
}

export default PricingHero;
