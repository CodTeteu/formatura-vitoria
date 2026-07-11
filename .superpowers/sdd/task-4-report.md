# Task 4 Report — Refazer o JSX do card em `CelebrationSection.tsx`

## Status: DONE

## What I implemented

### Step 1 — Imports block (lines 1-13)
Added two new component imports after `SectionHeading` and before `useEmblaCarousel`, exactly per the brief:

```tsx
import { CornerBrackets } from "@/components/ui/CornerBrackets";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
```

All other imports retained verbatim (React, framer-motion, lucide icons, sonner, inviteData, buildGoogleCalendarUrl, copyToClipboard, ResponsiveImage, SectionHeading, useEmblaCarousel, cn).

### Step 2 — `.event-card` inner JSX (the per-event card in the `.map`)
Replaced the entire `.event-card` div (opening tag + content + closing tag) with the new "editorial ticket" JSX from the brief. Kept the outer container `<div key={event.id} className="min-w-0 pl-4 md:pl-6 lg:pl-8 flex-[0_0_100%] flex">` and the `))}` closing of the `.map`.

New card structure:
- Opening div padding changed `p-6 xs:p-8 sm:p-10` → `p-7 xs:p-8 sm:p-9` (hairline per Task 3).
- Hairline inner gold frame: `absolute inset-2 border border-[rgba(189,160,115,0.22)] rounded-[28px]` (was `inset-3.5 border-2 border-[#bda073]/40`).
- Full-bleed image with `CornerBrackets inset={6} size={22}` (removed old `border-2 rounded-2xl shadow-md` frame).
- Floating white badge overlay straddling image/info boundary: `absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 ... bg-[#fffdfb] border border-[rgba(189,160,115,0.6)]` with Clock + event name (was an inline vinho-gradient pill).
- Date/time block (kept `dateLong` serif + `às {timeText}` script).
- `OrnamentalDivider className="mt-5 mb-5"` between time and venue (new).
- Local block kept (label + venueName).
- Minimal address block: no white box — just a hairline gradient span + centered text + discrete uppercase "Copiar" text button (was a `border-2 bg-[#fffbf7]/80` rounded box with icon-only copy).
- Agenda button: vinho solid `bg-[#2c050b]` with hairline `border border-[#bda073]` (was a 3-stop gradient with `border-2`).
- Maps/Waze: hairline `border border-[#bda073]` creme buttons, removed `hover:-translate-y-0.5` (was `border-2`).

### Deviation from literal brief text (encoding fix — justified)
The brief file (`task-4-brief.md`) contains UTF-8 mojibake on Portuguese characters:
- `Ã s` → used `às`
- `Copiar endereÃ§o` → used `Copiar endereço`
- `â€"` → used `—` (em dash)
- `VitÃ³ria CÃ©zar` → used `Vitória Cézar`
- `ComemoraÃ§Ã£o` → used `Comemoração`

These exact correct characters already existed in the source file at the same locations (e.g. old line 140 `às`, old line 159 `Copiar endereço`, old lines 176-177). Transcribing the mojibake verbatim would have corrupted the source. The semantic content is identical to the brief's intent; only the byte encoding was corrected. No structural or token change beyond that.

## Commands run and results

| Command | Result |
|---|---|
| `npm run lint` | 10 problems (9 errors, 1 warning) — **all pre-existing**, none new |
| `npm run typecheck` | Clean pass (no output) |
| `npm run build` | Clean pass — 2221 modules, built in 19.62s |

### Lint errors breakdown (all pre-existing)
**`CelebrationSection.tsx`** (my file — 2 pre-existing, shifted +2 lines from the 2 added imports):
- L17:38 `@typescript-eslint/no-explicit-any` — `quickNoteIcons: Record<string, any>` (was L15) — baseline debt, out of scope (quickNotes).
- L47:5 `react-hooks/set-state-in-effect` — embla `useEffect` `setScrollSnaps(...)` (was L45) — baseline debt, out of scope (Embla logic).

**`AudioPlayer.tsx`** (not touched): L47/52/61/68 `react-refresh/only-export-components`; L87/L107 `set-state-in-effect`.

**`GallerySection.tsx`** (not touched): L31 `react-hooks/immutability`; L67 `react-hooks/exhaustive-deps` (warning).

No NEW lint errors were introduced.

## Files changed
- `src/components/sections/CelebrationSection.tsx` (1 file, +23 / -26)

## Commit
- `4d17230` — `feat(celebration): redesign event cards — editorial ticket style`

## Self-review findings
- **Spec coverage:** complete. Both steps implemented per brief; outer `.map` container and closing preserved; Embla/quickNotes/SectionHeading/handleCopyAddress/blobs/dots/arrows/drag-cue untouched.
- **Scope discipline:** only the imports block + `.event-card` inner JSX changed. No other files touched.
- **Imports:** no unused-import lint errors; all lucide icons remain used (Shirt/Users/Camera in quickNotes; Calendar/Check/Copy/MapPin/Navigation/Clock/ChevronDown/ChevronLeft/ChevronRight in card/carousel/accordion). `copyToClipboard` still referenced by `handleCopyAddress`.
- **Comments:** none added (project convention). Old inline JSX comments removed as part of the replaced block (they were not in the brief's new JSX).
- **Visual inspection (Step 5):** not run — no browser available in this environment; left for the human reviewer. The structural/className requirements from the brief are all present in the written JSX.

## Concerns
- One justified deviation: corrected UTF-8 mojibake in Portuguese text (documented above). Flagging for transparency. If strict byte-verbatim adherence to the brief is required despite the corruption, this would need revisiting — but doing so would break the source's Portuguese strings.
- Manual visual QA (Step 5 of the brief) was not performed in this environment.
