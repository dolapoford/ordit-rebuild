import { Check } from "lucide-react";

const POINTS = [
  "Every line attributed to its author",
  "Full activity trail on every engagement",
  "Human review before anything is final",
  "George never signs an opinion",
];

/** Pricing page — "On every plan, at every price": the four guarantees
 *  that hold regardless of tier, so they read as the product's floor
 *  rather than something to upgrade into. */
export function PricingIncluded() {
  return (
    <section className="site-gutter site-section relative overflow-hidden bg-neutral-25 text-center">
      <div className="relative mx-auto max-w-[50rem]">
        <p className="type-label text-violet">On every plan, at every price</p>

        <h2 className="type-display mt-5 text-ink">
          The parts that matter
          <br />
          <span className="text-violet">are not an upgrade.</span>
        </h2>

        <p className="type-body mx-auto mt-6 max-w-[38rem] text-body">
          Attribution, the activity trail and the review step are not
          features you buy — they are how the product works.
        </p>
      </div>

      <ul className="relative mx-auto mt-14 grid max-w-[1280px] gap-5 text-left sm:grid-cols-2 lg:grid-cols-4">
        {POINTS.map((point) => (
          <li
            key={point}
            className="rounded-site border border-neutral-200 bg-white p-6"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-violet-50 text-violet">
              <Check aria-hidden className="size-6" strokeWidth={2.5} />
            </span>
            <p className="mt-5 text-lg leading-[1.4] text-ink">{point}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PricingIncluded;
