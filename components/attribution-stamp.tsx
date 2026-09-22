/**
 * design.md §4.3 — Attribution Stamp. The most important component in the
 * system: the argument the whole site rests on, expressed structurally.
 *
 * Rules that cannot be broken:
 *  1. George's name is on the prepared-by line and never the reviewed-by line.
 *  2. The reviewed-by line is never pre-filled in a default or empty state.
 *  3. Never shown without both lines.
 *  4. Full width at every breakpoint.
 */

type Row = {
  label: string;
  value: string;
  rail: string;
};

function StampRow({ label, value, rail }: Row) {
  return (
    <div className="flex items-stretch gap-3.5">
      {/* 3px rail, full row height, flush to the left edge */}
      <span className={`w-[3px] shrink-0 rounded-xs ${rail}`} aria-hidden />
      <div className="py-[11px] pr-[14px]">
        <p className="text-[10px] font-medium uppercase leading-[1.4] tracking-[0.1em] text-neutral-400">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-normal leading-[1.4] text-ink">
          {value}
        </p>
      </div>
    </div>
  );
}

export function AttributionStamp({
  preparedBy = "George",
  preparedAt,
  reviewedBy,
  className = "",
}: {
  preparedBy?: string;
  preparedAt: string;
  /** Leave empty until a person signs. */
  reviewedBy?: { name: string; at: string };
  className?: string;
}) {
  return (
    <div
      className={`w-full overflow-hidden rounded-lg border border-neutral-200 bg-white ${className}`}
    >
      <StampRow
        label="Prepared by"
        value={`${preparedBy} · ${preparedAt}`}
        rail="bg-ai-rail"
      />
      <div className="border-t border-neutral-200">
        {reviewedBy ? (
          <StampRow
            label="Reviewed by"
            value={`${reviewedBy.name} · ${reviewedBy.at}`}
            rail="bg-ink"
          />
        ) : (
          <StampRow
            label="Reviewed by"
            value="Awaiting your review"
            rail="bg-unsigned"
          />
        )}
      </div>
    </div>
  );
}

export default AttributionStamp;
