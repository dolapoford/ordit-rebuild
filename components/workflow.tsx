"use client";

import { useEffect, useRef, useState } from "react";

import { AttributionStamp } from "@/components/attribution-stamp";

/**
 * design.md §5.4 / §6.2 — pinned horizontal scroll.
 *
 * Vertical scroll drives the belt one to one: p (0–1 across the pinned range,
 * clamped) → translate3d(-p × 700vw). No easing on the belt, so an auditor
 * scrubbing back to stage 03 lands on stage 03. Below 820px, or with reduced
 * motion, nothing pins — panels simply stack and the stepper is hidden.
 */

const STAGES = [
  {
    key: "Initiation",
    title: "Initiation.",
    lead: "Before any work, the ground rules.",
    points: [
      "client, scope and independence checks confirmed",
      "the team assigned, and who reviews whom",
      "last year's file linked, so nothing starts from zero",
      "the client and engagement hierarchy this sits in is in development",
    ],
  },
  {
    key: "Planning",
    title: "Planning.",
    lead: "Last year's thinking, carried forward.",
    points: [
      "materiality and performance materiality set",
      "prior-year planning rolled forward for review, not re-typed",
      "the procedure list drawn from it",
    ],
  },
  {
    key: "Risk",
    title: "Risk.",
    lead: "The rating decides how hard you look.",
    points: [
      "risks identified and rated against the engagement",
      "testing depth follows the rating",
      "defining your own factors and weightings is in development",
    ],
  },
  {
    key: "Execution",
    title: "Execution.",
    lead: "George does the work, and shows it.",
    points: [
      "sample selected and stratified from the population",
      "each item traced to contract, delivery note and remittance",
      "exceptions flagged against materiality, conclusion drafted",
    ],
    stamp: true,
  },
  {
    key: "Review",
    title: "Review.",
    lead: "Nothing is accepted until you accept it.",
    points: [
      "accept, edit or reject each drafted conclusion",
      "a rejection is recorded with your reason, and George reworks from it",
      "editing inside the procedure, and the sign-off history behind it, are in development",
    ],
  },
  {
    // Naming rule (§8.1): "Close-out", not "Completion".
    key: "Close-out",
    title: "Close-out.",
    lead: "The file will not close while anything is open.",
    points: [
      "mandatory procedures, outstanding evidence and findings must clear",
      "the incomplete items are named, not just counted",
      "partner approval before the engagement closes",
    ],
  },
  {
    key: "Reporting",
    title: "Reporting.",
    lead: "Every figure, back to the procedure that produced it.",
    points: [
      "findings cross-reference into the report",
      "report versions kept, with what changed between them",
      "references are produced after the audit today",
    ],
  },
];

const COUNT = STAGES.length; // 7 stages, 8 panels including the title

// Pinned only where horizontal movement makes sense.
const PIN_QUERY = "(min-width: 820px) and (prefers-reduced-motion: no-preference)";

const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));

// Stage word: 104px at 1440 (7.2vw), tracked per the display rule.
const STAGE_WORD =
  "text-[clamp(3rem,7.2vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.045em] text-ink";

export function Workflow() {
  const outerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const beltRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const connectorRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    const belt = beltRef.current;
    const bar = barRef.current;
    if (!outer || !sticky || !belt || !bar) return;

    let frame = 0;
    let last = -1;

    const reset = () => {
      belt.style.transform = "";
      sticky.style.backgroundColor = "";
      bar.style.transform = "";
      connectorRefs.current.forEach((c) => c && (c.style.transform = ""));
      last = -1;
      setCounter(0);
    };

    const update = () => {
      frame = 0;
      const range = outer.offsetHeight - window.innerHeight;
      const p = range > 0 ? clamp(-outer.getBoundingClientRect().top / range) : 0;

      // The belt is 800% of the viewport; one panel is 12.5% of it.
      belt.style.transform = `translate3d(${-p * 87.5}%, 0, 0)`;

      // #FFFFFF → #F6F2FE (attribution/ai-surface): the only colour that moves.
      sticky.style.backgroundColor = `rgb(${255 - 9 * p}, ${255 - 13 * p}, ${255 - p})`;

      bar.style.transform = `scaleY(${p})`;
      connectorRefs.current.forEach((c, k) => {
        if (c) c.style.transform = `scaleX(${clamp(p * COUNT - (k + 1))})`;
      });

      // A sub-pixel offset at the very top must still read 00.
      const next = p < 0.002 ? 0 : clamp(Math.ceil(p * COUNT), 0, COUNT);
      if (next !== last) {
        last = next;
        setCounter(next);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const attach = () => {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      update();
    };
    const detach = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };
    const onChange = () => {
      detach();
      if (mq.matches) attach();
      else reset();
    };

    if (mq.matches) attach();
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      detach();
    };
  }, []);

  return (
    <section
      id="workflow"
      ref={outerRef}
      aria-label="The audit workflow, stage by stage"
      className="relative bg-white min-[820px]:motion-safe:h-[calc(100vh+665vh)]"
    >
      <div
        ref={stickyRef}
        className="overflow-hidden min-[820px]:motion-safe:sticky min-[820px]:motion-safe:top-0 min-[820px]:motion-safe:h-screen"
      >
        {/* Counter + progress bar — hidden when unpinned */}
        <div
          aria-hidden
          className="absolute right-6 top-12 z-20 hidden flex-col items-end gap-2 min-[820px]:motion-safe:flex"
        >
          <p className="text-xs tabular-nums text-neutral-400">
            <span className="font-semibold text-ink">
              {String(counter).padStart(2, "0")}
            </span>{" "}
            / {String(COUNT).padStart(2, "0")}
          </p>
          <div className="relative mr-1 h-[120px] w-[3px] rounded-xs bg-neutral-200">
            <div
              ref={barRef}
              className="absolute inset-0 origin-top rounded-xs bg-violet"
              style={{ transform: "scaleY(0)" }}
            />
          </div>
        </div>

        {/* Stepper — seven marks, 26px connectors (§4.8) */}
        <ol
          aria-hidden
          className="absolute bottom-16 left-1/2 z-20 hidden -translate-x-1/2 items-center min-[820px]:motion-safe:flex"
        >
          {STAGES.map((stage, i) => {
            const n = i + 1;
            const active = counter === n;
            const passed = counter > n;
            return (
              <li key={stage.key} className="flex items-center">
                <span className="relative flex h-3 w-[86px] items-center justify-center">
                  <span
                    className={`block rounded-full transition-all duration-300 ease-out ${
                      active
                        ? "size-[11px] bg-violet"
                        : passed
                          ? "size-[9px] bg-ink"
                          : "size-[9px] bg-neutral-200"
                    }`}
                  />
                  <span
                    className={`absolute left-1/2 top-[22px] -translate-x-1/2 whitespace-nowrap text-[9.5px] font-medium uppercase tracking-[0.11em] transition-opacity duration-300 ease-out ${
                      counter >= n ? "opacity-100" : "opacity-0"
                    } ${active ? "text-violet" : "text-neutral-400"}`}
                  >
                    {stage.key}
                  </span>
                </span>
                {n < COUNT && (
                  <span className="relative block h-px w-[26px] bg-neutral-200">
                    <span
                      ref={(el) => {
                        connectorRefs.current[i] = el;
                      }}
                      className="absolute inset-0 origin-left bg-ink"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </span>
                )}
              </li>
            );
          })}
        </ol>

        {/* The belt */}
        <div
          ref={beltRef}
          className="flex flex-col min-[820px]:motion-safe:h-full min-[820px]:motion-safe:w-[800%] min-[820px]:motion-safe:flex-row min-[820px]:motion-safe:will-change-transform"
        >
          {/* 00 — title */}
          <article className="site-gutter flex min-h-[70vh] flex-col items-center justify-center py-13 text-center min-[820px]:motion-safe:h-full min-[820px]:motion-safe:w-[12.5%] min-[820px]:motion-safe:shrink-0 min-[820px]:motion-safe:py-0">
            <h2 className={STAGE_WORD}>
              An audit engagement,
              <br />
              end to end.
            </h2>
            <p className="type-lead mt-8 max-w-[31rem] text-body">
              Seven stages, in the order an audit actually runs. Each one names
              what happens inside it, what George is allowed to touch, and
              whether it works in the product today.
            </p>
            <p className="type-label mt-10 max-w-2xl text-neutral-400">
              Engagement · Planning · Risk · Execution · Review · Close-out ·
              Reporting
            </p>
          </article>

          {/* 01–07 — the stages */}
          {STAGES.map((stage, i) => (
            <article
              key={stage.key}
              className="site-gutter relative flex min-h-[70vh] flex-col justify-center overflow-hidden py-13 min-[820px]:motion-safe:h-full min-[820px]:motion-safe:w-[12.5%] min-[820px]:motion-safe:shrink-0 min-[820px]:motion-safe:px-[11vw] min-[820px]:motion-safe:py-0"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-[3vw] top-1/2 -translate-y-1/2 select-none text-[clamp(10rem,24vw,26rem)] font-bold leading-none tracking-[-0.06em] text-violet/[0.06]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative max-w-[46rem]">
                <p className="sr-only">
                  Stage {i + 1} of {COUNT}
                </p>
                <h3 className={STAGE_WORD}>{stage.title}</h3>
                <p className="mt-7 max-w-[24rem] text-[clamp(1.25rem,1.7vw,1.5rem)] leading-[1.3] text-ink">
                  {stage.lead}
                </p>

                <ul className="mt-7 flex flex-col gap-3.5">
                  {stage.points.map((point) => (
                    <li
                      key={point}
                      className="type-body-s flex items-baseline gap-3 text-body"
                    >
                      <span
                        aria-hidden
                        className="h-[2px] w-4 shrink-0 translate-y-[-3px] rounded-xs bg-neutral-300"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                {stage.stamp && (
                  <AttributionStamp
                    className="mt-10 max-w-md"
                    preparedAt="14 Mar, 09:42"
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Workflow;
