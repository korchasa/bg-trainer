---
status: done
implements:
  - FR-A11Y-TEXT
  - FR-A11Y-CONTRAST
  - FR-RESPONSIVE-LAYOUT
---
# iOS readability & accessibility pass

## Goal

Real-device testing on iPhone 13 surfaced five readability defects. Fix the root causes,
not the symptoms, and make the layout adapt to window width instead of assuming one phone.

## Overview

### Context

Reported by user on iPhone 13:
1. Button text touches the button borders.
2. Task prompt too small.
3. Error explanation too small.
4. Sentence-final periods appear where they carry no meaning.
5. Lesson-menu labels too small.

### Current State (evidence)

- `AnswerBtn` base class has **no horizontal padding**: `src/components/ui/AnswerBtn.tsx:32`.
  4 of 5 call sites pass height only — `PickEngine.tsx:70` (`h-16 text-lg`),
  `TimedEngine.tsx:93`, `PickFromEngine.tsx:65`, `NegEngine`. Only `PickOptEngine.tsx:59` sets `px-6 py-4`.
  On iPhone 13 with `grid-cols-3` a button is 106pt wide with 0 inner padding.
- Type scale spans 9px → 72px (8×). 49 sites at ≤12px; 10 sites at 9–11px
  (`LessonScreen.tsx:84` = 9px, `LessonsScreen.tsx:84` = 10px, `LessonScreen.tsx:78` = 11px).
- `TaskPrompt.tsx:8` renders the screen's main instruction at 12px gray-500.
- Error rule: `Correction.tsx:7` 12px, `PickEngine.tsx:61` 12px, `ErrorDialog.tsx:28` 14px.
- Contrast on white: `gray-400` = 2.54:1 (below AA 4.5:1), `gray-300` = 1.47:1, `gray-500` = 4.83:1.
- `index.html:5` sets `user-scalable=no` — honoured by WKWebView (unlike Safari), so pinch-zoom is dead.
- 534/2778 `q` values end in `.`; 140 `answer` values do too, incl. `"Да."` / `"Не."` as button labels.
- `itemKey()` uses `o.q` verbatim (`src/utils/itemKey.ts:6`) → **data must not be edited**,
  or every user's mastery record is orphaned. Strip at render time only.
- `TARGETED_DEVICE_FAMILY = "1"` (iPhone-only) — confirmed decision, stays.
- Container is `max-w-md` (`App.tsx:228`).

### Constraints

- No test runner in the project (AGENTS.md "Key Decisions"). Verification = `npm run build` + visual check.
- iOS deployment target 15.0 → no CSS container queries (iOS 16+), no regex lookbehind (Safari 16.4+).
- Mastery keys derive from raw `q` — display-layer changes only, never data edits.
- Stay iPhone-only; make layout depend on window width, not device.

## Definition of Done

- [x] No interactive text below 13px; body/instruction text ≥15px; task prompt and error rule ≥15px. Evidence: `tailwind.config.js:13-25`; `! grep -rn 'text-\[0\.[0-7][0-9]*rem\]' src --include='*.tsx'` empty
- [x] Answer buttons have horizontal padding and wrap long words instead of clipping. Evidence: `src/components/ui/AnswerBtn.tsx:39`
- [x] Answer options laid out by longest-option length (1/2/3 columns), single shared component. Evidence: `src/components/ui/AnswerGrid.tsx:13-24`, used by all 5 choice engines
- [x] Text-size setting persists and offers "system" (Dynamic Type, capped) plus 3 manual steps. Evidence: `src/utils/textScale.ts:15-31`, `src/components/ui/TextSizeControl.tsx`; verified by reload — stored value `xlarge`, root font-size 20.8px
- [x] Pinch-zoom re-enabled. Evidence: `index.html:7`
- [x] `gray-400` replaced by ≥4.5:1 greys for meaningful text. Evidence: `! grep -rn 'text-gray-300\|text-gray-400' src --include='*.tsx'` empty
- [x] Sentence-final period stripped at render for stimulus and answer text; `?`, `!`, `…` preserved. Evidence: `src/utils/displayText.ts:11-17`; verified in-app — stimulus "Те са от Гърция", dialog "Те не са от Гърция", rule keeps its period
- [x] Abbreviation periods survive — strip is applied per call site, not inside `Correction`/`ErrorDialog`. Evidence: verified in-app — "✓ един → м.р." keeps the trailing dot
- [x] Lesson tiles: no truncation, ≥15px titles. Game tiles converted to rows. Pace = single-line segments. Evidence: `src/components/screens/LessonsScreen.tsx:83`, `src/components/screens/LessonScreen.tsx:35-54,65-94`
- [x] `npm run build` clean; visual check at 320 / 390 / 430pt widths. Evidence: build exit 0; browser checks at 320×568, 390×844, 430×932 — no horizontal overflow at normal or 1.3x scale

## Solution

1. `tailwind.config.js` — rescale `fontSize`: xs 13, sm 15, base 17, lg 19, xl 21, 2xl 24,
   3xl 30, 4xl 36, 5xl 44, 6xl 52, 7xl 60. Add `xs: 380px` screen for narrow-phone tuning.
2. `src/index.css` — `html { font-size: calc(16px * var(--fs-scale)) }`, `--fs-scale: 1`.
3. `src/utils/textScale.ts` — `TextScale = "system" | "normal" | "large" | "xlarge"`;
   `measureSystemScale()` reads computed size of a probe styled `font: -apple-system-body`,
   divides by 17 (Dynamic Type "Large" baseline), clamps to [1, 1.4]; persist via `getRaw/setRaw`;
   register key in `storage.ts` `TRACKED_KEYS`; re-measure on `visibilitychange`.
4. `src/utils/displayText.ts` — `stripFinalPeriod()`: drop a single trailing `.` unless preceded by `.`.
5. `src/components/ui/AnswerGrid.tsx` — columns from longest option: ≤5 → 3, ≤11 → 2, else 1.
6. `AnswerBtn` — base `px-4 py-3 min-h-[3.5rem] break-words leading-tight`; drop `h-16` at call sites.
7. Contrast sweep: `gray-400` → `gray-500`/`gray-600` for meaningful text; `gray-300` → `gray-500`.
8. `index.html` — `user-scalable=no` → `maximum-scale=5.0`.
9. `LessonsScreen` — drop `truncate`, title 15px, add text-size control next to language switch.
10. `LessonScreen` — game tiles → rows; pace → one-line segments + separate count line.
11. Strings: add `paceHint`, `textSize*` keys; fix "айтем" wording.
