# Task 3 Report — Atualizar regra `.event-card` no CSS

## Status
DONE

## What I implemented

Replaced the `.event-card` and `.event-card:hover` rules in `src/index.css` (inside `@layer components`), lines 245–260, with the exact new block from the task brief.

### Before
```css
  .event-card {
    @apply rounded-[36px] border-2 transition-all duration-500;
    border-color: #bda073;
    background: linear-gradient(180deg, #ffffff 0%, #fffdfa 100%);
    box-shadow: 
      0 30px 70px rgba(44, 5, 11, 0.12), 
      inset 0 0 0 2px #ffffff;
  }

  .event-card:hover {
    border-color: #a38141;
    transform: translateY(-4px);
    box-shadow: 
      0 35px 80px rgba(44, 5, 11, 0.18), 
      inset 0 0 0 2px #ffffff;
  }
```

### After
```css
  .event-card {
    @apply rounded-[36px] border transition-all duration-500;
    border-color: rgba(189, 160, 115, 0.5);
    background: linear-gradient(180deg, #ffffff 0%, #fffdfa 100%);
    box-shadow:
      0 20px 50px rgba(44, 5, 11, 0.08),
      inset 0 0 0 1px #ffffff;
  }

  .event-card:hover {
    border-color: #a38141;
    transform: translateY(-2px);
    box-shadow:
      0 26px 60px rgba(44, 5, 11, 0.12),
      inset 0 0 0 1px #ffffff;
  }
```

### Net effect of the change
- Border: `border-2` → `border` (hairline 1px), color `#bda073` → `rgba(189, 160, 115, 0.5)` (50% transparent gold).
- Base shadow: `0 30px 70px rgba(44,5,11,0.12)` → `0 20px 50px rgba(44,5,11,0.08)` (lighter, less spread).
- Inner keyline: `inset 0 0 0 2px #ffffff` → `inset 0 0 0 1px #ffffff` (1px white).
- Hover lift: `-4px` → `-2px` (subtle).
- Hover shadow: `0 35px 80px @ 0.18` → `0 26px 60px @ 0.12` (slightly stronger than base, still softer than before).

The internal gold keyline is NOT added in CSS — it is deferred to JSX in Task 4 (as a div), per the brief's "Interfaces" note.

## Commands run and results

| Command | Exit | Result |
|---|---|---|
| `npm run lint` | 1 | 10 problems (9 errors, 1 warning) — ALL pre-existing in `AudioPlayer.tsx`, `CelebrationSection.tsx`, `GallerySection.tsx`. No errors in `src/index.css`, no new errors introduced. |
| `npm run typecheck` | 0 | Passed (all 3 tsconfigs). |
| `npm run build` | 0 | Passed. `prepare:images` → `typecheck` → `vite build` all succeeded. CSS bundle produced (`dist/assets/index-CuH4kTgy.css`, 161.37 kB). |

## Files changed
- `src/index.css` — only the `.event-card` and `.event-card:hover` rules (9 insertions, 9 deletions). No other rules touched.

## Commits
- `c9ce87c` — `style(event-card): lighter border, softer shadow, subtle hover`

## Self-review

- **Completeness:** Both rules replaced verbatim per the brief. ✓
- **Scope:** Only `src/index.css` modified; only the two target rules changed. No JSX, no other CSS rules. ✓
- **Convention:** No code comments added (project convention). Commit message matches repo style (`style(...)` prefix, lowercase, imperative). ✓
- **Discipline / no overbuilding:** Did not add the gold keyline div to the JSX — that is explicitly Task 4's job per the brief. Did not "improve" surrounding rules. ✓
- **Verification:** typecheck and build both green; lint introduces zero new errors (all 10 are pre-existing in the three known files). ✓

## Concerns
None. The baseline lint failures in `AudioPlayer.tsx`, `CelebrationSection.tsx`, and `GallerySection.tsx` are pre-existing and out of scope for this task.
