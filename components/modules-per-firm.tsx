"use client";

import { useRef, useState } from "react";

import { useSectionReveal } from "@/hooks/use-section-reveal";

const MODULES = [
  {
    key: "accounting",
    title: "Accounting",
    body: "Manage the firm’s books and accounting workflows.",
  },
  {
    key: "auditing",
    title: "Auditing",
    body: "Manage audit engagements and workpapers.",
  },
] as const;

type ModuleKey = (typeof MODULES)[number]["key"];

/** For firms — "Run both, or run one": copy left, module switches right.
 *  The cards are live toggles so the "on or off" claim can be tried. */
export function ModulesPerFirm() {
  const copyRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState<Record<ModuleKey, boolean>>({
    accounting: true,
    auditing: true,
  });

  useSectionReveal(copyRef, { targets: [".type-label", "h2", ".type-lead"] });

  return (
    <section className="site-gutter site-section relative overflow-hidden bg-white">
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div ref={copyRef}>
          <p className="type-label text-violet">
            Modules, per firm
          </p>

          <h2 className="type-h2 mt-6 text-ink">
            Run both,
            <br />
            <span className="text-violet">or run one.</span>
          </h2>

          <p className="type-lead mt-7 max-w-[36rem] text-body">
            An administrator turns accounting and auditing on or off for the
            whole organisation, or for a region. People only see the module
            they work in.
          </p>
        </div>

        <div className="rounded-site border border-neutral-200 bg-neutral-25 p-4 sm:p-6">
          <ul className="grid gap-4 sm:grid-cols-2">
            {MODULES.map(({ key, title, body }) => {
              const on = enabled[key];
              return (
                <li
                  key={key}
                  className="flex flex-col rounded-site border border-neutral-200 bg-white card-pad"
                >
                  <h3 className="type-h3 text-ink">{title}</h3>
                  <p className="mt-2 text-base text-body">{body}</p>
                  <button
                    type="button"
                    aria-pressed={on}
                    aria-label={`${title}: ${on ? "enabled" : "disabled"}. Toggle.`}
                    onClick={() => setEnabled((s) => ({ ...s, [key]: !s[key] }))}
                    className={`mt-5 inline-flex w-fit items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                      on
                        ? "bg-violet-50 text-violet"
                        : "bg-neutral-100 text-body"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`size-3 rounded-full transition-colors ${
                        on ? "bg-violet" : "bg-neutral-300"
                      }`}
                    />
                    {on ? "Enabled" : "Disabled"}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex flex-col gap-3 rounded-site border border-neutral-200 bg-white card-pad sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-ink">
                Read-only access for the audit committee
              </h3>
              <p className="mt-1 text-base text-body">
                Give the audit committee read-only access to relevant
                information.
              </p>
            </div>
            <span className="w-fit shrink-0 rounded-lg bg-violet-50 px-3.5 py-2 text-sm font-medium text-violet">
              Optional
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ModulesPerFirm;
