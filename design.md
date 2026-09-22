# Ordit — Landing Page Design System

**Scope:** orditai.com only — the marketing site. Not the enterprise application.
**Source of truth:** Figma file *Ordit Design System* (`4OXfFMVrCVymP8h1cXniTS`).
**Version:** 1.0 · 19 Sep 2026

---

## 1. How to use this

Three rules govern everything below.

**The colour architecture and the typeface are locked.** `#4E2DBE`, `#030124`, `#5E626A` and Host Grotesk came from the existing brand and do not change. Every other value in this document is a system layer built underneath them — neutrals, tints, semantic colours — and those are ours to adjust.

**Tokens before values.** If you are typing a hex code or a pixel number that isn't in section 2, stop and check whether a token already covers it. New tokens are fine; one-off values are not.

**Nothing on this site claims a capability without a source.** Section 8 is not a style guide section — it is a hard constraint on copy, and it exists because the audience is auditors, whose profession is checking whether claims are supported.

---

## 2. Foundations

### 2.1 Colour

#### Locked — inherited, do not change

| Token | Value | Use |
|---|---|---|
| `locked/violet` | `#4E2DBE` | The single accent. Primary buttons, the AI rail, active state, links. |
| `locked/ink` | `#030124` | Headlines, high-emphasis text, the human rail. |
| `locked/body-grey` | `#5E626A` | Body copy. |
| `locked/gradient-1` | `#492AB1` | Inherited gradient stop. |
| `locked/gradient-2` | `#A855F7` | Inherited gradient stop. |
| `locked/gradient-3` | `#FB8C3C` | Inherited gradient stop. |

The three gradient stops are inherited from the current site. They are **not used** in either redesign direction — the accent does more work when it is one colour, not a spectrum. Keep the tokens so the value is recorded; do not introduce them into new work without a decision.

#### Neutrals

| Token | Value | Use |
|---|---|---|
| `system/neutral-0` | `#FFFFFF` | Page ground, card fill. |
| `system/neutral-25` | `#FBFAFD` | Alternating section ground, sunken panels, table headers. |
| `system/neutral-50` | `#F5F4F9` | Secondary sunken fill. |
| `system/neutral-100` | `#EDEBF3` | Placeholder blocks, inactive fills. |
| `system/neutral-200` | `#E1DEE9` | **Default border.** Every card, table, input and divider. |
| `system/neutral-300` | `#C9C5D4` | Stronger rule — bullet dashes, unsigned rail. |
| `system/neutral-400` | `#9A95A8` | Labels, meta, captions, reference codes. |
| `system/neutral-600` | `#5E626A` | Body text (mirrors `locked/body-grey`). |
| `system/neutral-800` | `#2E2B3A` | Text on tinted grounds where ink is too heavy. |

The neutrals are biased violet, not pure grey. That is deliberate: a pure `#E5E5E5` border next to `#4E2DBE` reads as two unrelated systems.

#### Violet ramp

| Token | Value | Use |
|---|---|---|
| `system/violet-50` | `#EFEBFB` | Chip and callout tint. |
| `system/violet-300` | `#A88BF7` | Dark-mode accent; decorative only in light. |
| `system/violet-500` | `#7C5CE0` | AI rail, secondary accent. |
| `system/violet-700` | `#3E2398` | Pressed state on primary. |

#### Semantic — status

| Token | Value | Background | Means |
|---|---|---|---|
| `status/not-started` | `#9A95A8` | — | Nothing has happened yet. |
| `status/ai-working` | `#7C5CE0` | `status-bg/ai` `#F1EBFD` | George is running. |
| `status/ai-drafted` | `#4E2DBE` | `status-bg/ai` | George has finished and stopped. |
| `status/awaiting-review` | `#B26A12` | `status-bg/awaiting-review` `#FBF3E4` | A human must act. |
| `status/approved` | `#16A34A` | `status-bg/approved` `#E9F6EE` | A human has accepted it. |
| `status/rejected` | `#B3352A` | `status-bg/rejected` `#FBEDEB` | A human has sent it back. |
| `status/blocked` | `#6E6880` | — | Cannot proceed. |

#### Semantic — risk

| Token | Value | Background |
|---|---|---|
| `risk/low` | `#16A34A` | `risk-bg/low` `#E9F6EE` |
| `risk/medium` | `#C08419` | `risk-bg/medium` `#FBF3E4` |
| `risk/high` | `#C2472F` | `risk-bg/high` `#FBEBE7` |
| `risk/critical` | `#8F1D14` | `risk-bg/critical` `#F6E2E0` |

#### Semantic — attribution

The signature system of the product. See §4.3.

| Token | Value | Means |
|---|---|---|
| `attribution/ai-rail` | `#7C5CE0` | The prepared-by rail. Always George. |
| `attribution/ai-surface` | `#F6F2FE` | Ground behind AI-authored content. |
| `attribution/human-rail` | `#030124` | The reviewed-by rail, once signed. |
| `attribution/human-surface` | `#FFFFFF` | Ground behind human-authored content. |
| `attribution/unsigned` | `#C9C5D4` | The reviewed-by rail while empty. |

#### Semantic — evidence

| Token | Value | Means |
|---|---|---|
| `evidence/present` | `#16A34A` | Received and attached. |
| `evidence/partial` | `#C08419` | Some of it. |
| `evidence/missing` | `#C2472F` | Requested, not received. |

#### Colour rules

1. **One accent.** Violet is the only decorative colour. Semantic colours (status, risk, evidence) carry meaning and never appear as decoration.
2. **Semantic colour is never the brand colour by accident.** If something is violet, it is either the accent or it is AI-authored. Nothing else.
3. **Tints are computed, not eyeballed.** A tinted background is the semantic colour mixed with white at 88%. The system already stores the six most-used as `*-bg/*` tokens; compute the rest the same way.
4. **Green means a human approved it.** Not "good". Not "success". An auditor reads green as *signed off*, and using it for a marketing tick mark devalues it.
5. **No gradients** in new work.

---

### 2.2 Typography

**Host Grotesk** throughout. Available on Google Fonts; weights 300–800 variable.

```html
<link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@300..800&display=swap">
```

Always declare a fallback stack: `"Host Grotesk", "Helvetica Neue", Arial, sans-serif`.

#### Site ramp — marketing surfaces

| Style | Size | Weight | Tracking | Line height | Use |
|---|---|---|---|---|---|
| `Site/Display` | 64 | Bold (700) | −4.5% | 92% | Hero headline, oversized stage words. |
| `Site/H1` | 48 | SemiBold (600) | −3% | 100% | Page headers. |
| `Site/H2` | 36 | SemiBold | −2.5% | 110% | Section headlines. |
| `Site/H3` | 24 | Medium (500) | −1.5% | 130% | Card titles, sub-headlines. |
| `Site/Lead` | 20 | Light (300) | 0 | 150% | Section standfirsts. |
| `Site/Body` | 18 | Regular (400) | 0 | 155% | Long-form body. |
| `Site/Body S` | 16 | Regular | 0 | 155% | Card body, dense copy. |
| `Site/Caption` | 14 | Regular | 0 | 145% | Notes, footnotes. |
| `Site/Label` | 12 | Medium | +12% uppercase | 140% | Eyebrows, column headers. |

#### App ramp — product surfaces shown inside the page

The procedure card, the engagement dashboard and the stage illustrations are renderings of the application. They use a tighter ramp so they read as software rather than as marketing.

| Style | Size | Weight | Use |
|---|---|---|---|
| `App/Title` | 20 | SemiBold | Panel titles. |
| `App/Section` | 16 | SemiBold | Group headings. |
| `App/Body` | 14 | Regular | Panel body. |
| `App/Body Strong` | 14 | Medium | Values, emphasis. |
| `App/Meta` | 12 | Regular | Timestamps, secondary data. |
| `App/Label` | 11 | Medium | Field labels, uppercase where used. |

#### Typography rules

1. **Display sizes get negative tracking.** Above 40px, tighten. −4.5% at 64px and above, −3% at 48, −2.5% at 36, −1.5% at 24, 0 below that.
2. **Light weight is for leads only.** 300 at 19–24px reads elegant; at 15px it reads broken.
3. **Measure caps at ~65 characters** for body copy, ~26ch for a large thesis line.
4. **Uppercase always gets tracking** — +10% to +14%. Never set uppercase at default tracking.
5. **`text-wrap: balance`** on every headline.
6. **Tabular numerals** wherever figures align in a column: `font-variant-numeric: tabular-nums`.

---

### 2.3 Space

A 4px base. Use the token, not the number.

| Token | Value | | Token | Value |
|---|---|---|---|---|
| `space/1` | 4 | | `space/8` | 32 |
| `space/2` | 8 | | `space/10` | 40 |
| `space/3` | 12 | | `space/12` | 48 |
| `space/4` | 16 | | `space/16` | 64 |
| `space/5` | 20 | | `space/20` | 80 |
| `space/6` | 24 | | `space/28` | 112 |

### 2.4 Radius

| Token | Value | Use |
|---|---|---|
| `radius/xs` | 2 | Rails, bars, tiny marks. |
| `radius/sm` | 4 | Placeholder blocks, small icons. |
| `radius/md` | 6 | Inline pills, stage rows. |
| `radius/lg` | 8 | **Default** — buttons, cards, inputs, callouts. |
| `radius/site` | 12 | Large panels, feature cards. |
| `radius/xl` | 16 | Full-bleed panels. |
| `radius/full` | 999 | Chips, dots. |

One radius per object; never mix corners on the same element.

### 2.5 Layout

| | Desktop | Mobile |
|---|---|---|
| Frame width | 1440 | 390 |
| Side gutter | 80 | 20 |
| Content width | 1280 | 350 |
| Column grid | 3 × 413, gap 20 | 1 column |
| Section padding-block | 96 / 104 | 52 |
| Tall sections | 120 | 64 |

**Exception:** the pinned workflow panels (§5.4) use a 160px gutter because the stage word runs at 104px and needs the air.

Breakpoint: **820px**. Above it, the pinned scroll runs; below it, everything stacks to one column. There is no tablet-specific layout — the desktop layout holds down to 820 and the mobile layout holds up to it.

---

## 3. Elevation and borders

The site is flat. Depth is expressed with a 1px `system/neutral-200` border and a ground change, not with shadow.

| Level | Treatment |
|---|---|
| Page | `system/neutral-0` or `system/neutral-25`, alternating by section |
| Card | `neutral-0` fill, 1px `neutral-200` border, `radius/lg` or `radius/site` |
| Sunken | `neutral-25` fill, 1px `neutral-200` border |
| Not-yet-built | 1px **dashed** `neutral-300` or tinted accent border |

The dashed border is load-bearing: it marks a thing that is designed but not functional, so nobody builds a live input over it. Used on the enterprise search field and the unanswered security facts.

**Shadow** appears in exactly one place: the sticky nav once the page has scrolled, at `0 1px 0 rgba(3,1,36,.06)`. Nowhere else.

---

## 4. Components

### 4.1 Button

Figma: `Button` component set — `Kind=Primary | Secondary | Text`.

| | Fill | Text | Border |
|---|---|---|---|
| Primary | `locked/violet` | `neutral-0` | none |
| Secondary | transparent | `locked/ink` | 1px `neutral-200` |
| Text | transparent | `locked/violet` | none |

Padding `13px 20px`, `radius/lg`, label at `Site/Body S` Medium.
Hover: primary darkens to `system/violet-700`; secondary border goes to `neutral-300`.
Focus: 2px `locked/violet` outline at 2px offset. Never remove it.
On mobile, primary and secondary CTAs go **full width** and stack with `space/3`.

### 4.2 Chip

Padding `4px 9px`, `radius/full`, label at 10–11px Medium, uppercase optional.
Fill is the semantic colour at 88% white; text is the semantic colour at full strength.

Variants in use: risk, evidence state, and the illustrative-client marker. The Available / Partial / Building status chip is documented in §8.3 — **it has been removed from the pinned workflow section**, and whether it stays elsewhere is an open decision.

### 4.3 Attribution Stamp

Figma: `Attribution Stamp` component set — `State=Awaiting | Signed`.

The most important component in the system. It is the argument the whole site rests on, expressed structurally.

```
┌─────────────────────────────────────┐
│ ▍ PREPARED BY                       │   rail: attribution/ai-rail
│ ▍ George · 14 Mar, 09:42            │
├─────────────────────────────────────┤
│ ▍ REVIEWED BY                       │   rail: attribution/unsigned (Awaiting)
│ ▍ Awaiting your review              │         attribution/human-rail (Signed)
└─────────────────────────────────────┘
```

- Rail: 3px wide, full row height, `radius/xs`, flush to the left edge with no padding.
- Row padding: `11px 14px 11px 0`.
- Label: `App/Label` at 9–10px, `neutral-400`, +10% tracking, uppercase.
- Value: `App/Body` 12–14px, `locked/ink`.
- Container: `neutral-0` fill, 1px `neutral-200`, `radius/lg`.

**Rules that cannot be broken:**

1. George's name appears on the **prepared-by** line and never on the reviewed-by line.
2. The reviewed-by line is never pre-filled in a default or empty state.
3. The stamp is never shown without both lines. A prepared-by line alone is a different, weaker claim.
4. It survives every breakpoint at full width. If something must be cut at 390px, it is not this.

### 4.4 Card

`neutral-0` fill, 1px `neutral-200`, `radius/lg` (content) or `radius/site` (feature).
Padding `22px 26px 26px`. Internal gap `space/2` to `space/3`.
Title at `Site/H3` or 15px Medium; body at `Site/Body S` or 14px; optional reference line at 11px Medium `neutral-400`.
In a 3-column grid, cards are fixed at 413 wide and **hug vertically** — do not equalise heights. Uneven bottoms are correct; stretched cards with dead space are not.

### 4.5 Table

Container: 1px `neutral-200`, `radius/site`, `clipsContent`.
Header row: `neutral-25` fill, labels at `Site/Label` in `neutral-400`.
Body rows: `neutral-0`, 1px `neutral-200` bottom border, none on the last row.
Cell padding `12px 18px`, vertically centred.
Reference columns are fixed-width; the description column fills.

### 4.6 Callout

A tinted row with a 3px rail, used for a guardrail or a build note.
Fill: semantic colour at 93% white. Rail: semantic colour, `radius/xs`, 34px tall.
Padding `14px 16px`, `radius/lg`, gap `space/3`.
Label at 11px Medium in the semantic colour; body at 12–14px `locked/ink`.

### 4.7 Stage pill

Closed: `radius/md`, 1px `neutral-200`, padding `15px 20px 15px 24px`, number + name + `+`.
Open: `attribution/ai-surface` fill, 1px `locked/violet`, padding `22px 20px 24px 24px`, plus body copy and a meta line.
Only one pill is open at a time.

### 4.8 Stepper

Seven marks with 26px connectors.
Dot 9px `neutral-200`; passed 9px `locked/ink`; current 11px `locked/violet`.
Label at 9.5px Medium +11% tracking, `neutral-400`; visible only once passed, `locked/violet` when current.
Connector fills `locked/ink` proportionally as the transition runs.

### 4.9 Nav and footer

`Nav / Desktop`, `Nav / Mobile`, `Footer / Desktop v2`, `Footer / Mobile`.

Nav carries **six** top-level items: Platform · For firms · Security · Pricing · About · Sign in, plus a primary Book a demo. Security sits at top level because it is the first question this buyer asks and it should never be two clicks deep. There is no Resources menu until there is something behind it.

Footer v2: five columns (Product, For firms, Standards, Company, contact block) → oversized wordmark → utility bar. On mobile the columns collapse to accordion rows; the wordmark survives because it costs nothing at that width.

---

## 5. Section patterns

The landing page is built from a small vocabulary. Each pattern has a fixed job.

### 5.1 Hero

Two columns: copy left at ~620, product panel right, bleeding off the right edge. Eyebrow → headline at `Site/Display` → body → fact chips → CTA pair. The panel is a rendering of a real procedure, carrying the Attribution Stamp.
A written marker sits under the chips when the panel depicts capability still in development — a chip in the panel header will bleed off-canvas and go unread.

### 5.2 Standards marquee

An infinite horizontal belt of framework names, doubled and translated by `-50%`, with `mask-image` edge fades. Names only — the heading describes the standards an auditor's file is reviewed against and makes no claim about what George is trained on.

### 5.3 The chain

Ten links — Organisation through Report — as ten equal columns under a segmented rail, each segment coloured by whether that link exists today. The brief calls this the central organising principle of the product, so it is drawn whole in one place rather than implied across several sections.

### 5.4 Pinned workflow scroll

The section pins for the length of seven transitions while eight panels move sideways. Covered in full in §6.

### 5.5 Engagement dashboard

A framed panel with an engagement header, then six tiles in a 3 × 2 grid, then a three-card row for the management and organisation levels. The client is always obviously fictional and carries a marker saying so — never a real client name, and never one of the names on the testimonials.

### 5.6 Attribution band

Copy left, the stamp alone on a tinted ground right. The one section whose only job is to state the rule underneath everything else.

### 5.7 Traceability

Three illustrated cards — evidence room, cross-references, activity trail — each with its own state rather than one claim covering all three.

### 5.8 Testimonials

Horizontal scroll-snap carousel, one card per client, `scroll-snap-type: x mandatory`.

### 5.9 Two doors

Self-serve left, enterprise right. Both doors always appear; removing one is a business decision, not a layout decision.

---

## 6. Motion

### 6.1 Principles

1. **Motion explains sequence, not personality.** Every animation on this site shows the order in which audit work happens.
2. **Scroll-driven beats time-driven.** If the user controls it, they can re-read it.
3. **One moment per section.** Two competing animations in one viewport is one too many.
4. **Everything has a still state that reads.** The first frame must make sense with no motion at all.

### 6.2 The pinned horizontal scroll

| | |
|---|---|
| Scroll length | `100vh + 7 × 95vh` |
| Transform | `translate3d(−p × 700vw, 0, 0)` where p is 0–1, clamped |
| Easing | **None** on the belt. The panel edge tracks the wheel one-to-one |
| Stepper | Seven marks filled at `p × 7`; connectors fill proportionally |
| Counter | `ceil(p × 7)` clamped 0–7 — reads `00` on the title panel |
| Ground | `#FFFFFF` → `#F6F2FE` interpolated across p. The only colour that moves |
| Reduced motion | Unpins entirely; panels stack vertically, stepper and counter hidden |

The no-easing decision is deliberate: an auditor scrubbing back to stage 03 should land on stage 03.

### 6.3 Hero sequence

3000ms, driven by a single `render(t)` function so it can be scrubbed. Beats: conclusion types in (250–1750) · three evidence rows resolve (950–1700) · exception log stops red (1700–2000) · reviewed-by rail pulses once (2150–2900), and then stops. It never completes.

### 6.4 Standard durations

| Interaction | Duration | Curve |
|---|---|---|
| Hover, focus | 150ms | `ease-out` |
| Chip, dot state change | 300ms | `ease` |
| Accordion open | 320ms | `cubic-bezier(.2,.8,.2,1)` |
| Section ground shift | 500ms | `ease` |
| Scroll-driven | — | none |

### 6.5 Reduced motion

`prefers-reduced-motion: reduce` unpins the workflow section, freezes the marquee, ends the hero sequence at its final frame, and disables the carousel's smooth scroll. Content is never hidden by the fallback — only movement is removed.

---

## 7. Accessibility

- **Contrast:** body `#5E626A` on white is 5.9:1. `neutral-400` `#9A95A8` is 2.8:1 — labels and meta only, never body copy, never below 11px on a tinted ground.
- **Focus** is always visible: 2px `locked/violet` at 2px offset.
- **Status is never colour alone.** Every chip carries a word. Every rail carries a label.
- **The animated hero** has the full conclusion text in a visually-hidden sibling; the animated node is `aria-hidden`. No `aria-live` — it would announce mid-typing.
- **Touch targets** 44 × 44 minimum on mobile.
- **The pinned section** must remain reachable by keyboard; tab order follows panel order regardless of transform.

---

## 8. Content rules

This section is what makes the system Ordit's rather than generic. It is not stylistic.

### 8.1 Naming

| Say | Not |
|---|---|
| George — AI **preparer** | George — AI Audit Partner |
| Prepared by · Reviewed by | Generated by · Verified by |
| Engagement | Project, case, job |
| Procedure | Task, step |
| Workpaper | Document, file |
| Close-out | Completion, wrap-up |

*Partner* is the most senior human role in an audit firm — the one who signs the opinion. It cannot be given to software.

### 8.2 Voice

Short declaratives. Concrete nouns. The audience checks claims for a living, so specificity reads as competence and superlatives read as risk. No "revolutionary", no "10×", no invented efficiency or revenue figures.

### 8.3 The claim rule

**No capability sentence ships without a source in the claim register.** If a sentence has no reference, it is either unverified or invented, and it comes out.

Where a capability is still being built, the **sentence** says so — "defining your own factors and weightings is in development" — rather than a status label doing it. Status chips were removed from the pinned workflow section in v2; whether they remain on the chain, dashboard, traceability and For firms bands is an open decision.

### 8.4 Never say

- "Certified" for ISO 27001 or SOC 2 — say **in progress**, and only with a date you will stand behind.
- "Separation is **enforced by the system**" — client data is separated between tenants; role- and permission-level segregation within a tenant is in development.
- "**Automatically**" about risk driving testing depth — the link exists, the configuration does not.
- Anything in the present tense about cross-referencing, in-workflow instruction, or the review-and-edit loop.
- Any efficiency, accuracy or revenue figure that is not in a source document.

---

## 9. Figma file map

| Page | Holds |
|---|---|
| Foundations | Colour, radius and space variables; text styles |
| Components | Attribution Stamp, Button, Nav, Footer v1 / v2, seven stage illustrations |
| Site — Desktop / Mobile | The original direction, six pages each |
| Alt — Desktop | The Legora-referenced direction, six pages, plus the corrected **v2** frames |
| Workflow — horizontal scroll | The eight-panel track, pinned viewport, motion spec |
| Wireframe — Home v2 | Grey-box wireframe, desktop and mobile, with annotation strips |

**Variable collections:** `Ordit / Colour`, `Ordit / Radius`, `Ordit / Space` — single mode each. A dark mode has been designed in the prototypes but is **not yet tokenised** in Figma.

---

## 10. Not in the system yet

Named so nobody assumes coverage that doesn't exist.

1. **Dark mode tokens.** The scroll prototype defines a full dark palette in CSS. It has not been added to the Figma collections as a second mode.
2. **Form components.** No input, select, checkbox or validation state exists. The site currently has no forms beyond CTAs.
3. **The Alt direction has no mobile set.** Mobile still runs the original direction plus the v2 wireframe.
4. **Illustration style is defined by example, not by rule.** Seven stage illustrations exist as components; there is no written spec for drawing an eighth.
5. **Iconography.** There is no icon set. Every mark on the site today is either a component or a drawn rectangle.
6. **Communications** has no pattern, because there is no answer yet on whether the capability exists.
