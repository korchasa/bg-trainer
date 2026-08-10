---
date: "2026-08-02"
status: done
implements: [FR-BUILD, FR-ENGINES]
tags: [engine, build, punctuation, ux]
related_tasks: []
---
# Build engine: punctuation is a fixed template, never a user tile

## Goal

In sentence-construction drills the learner practises **word order**, not typography.
Hunting for a `.` / `,` / `?` tile among the words adds friction that teaches nothing.
The answer area becomes a template with punctuation frozen in place; the learner only
fills the word slots.

## Overview

### Context

User report: "Из уроков с построением предложений, окончание предложения
точка/вопросительный/восклицательный знаки, не должен ставить пользователь.
Это неудобно." Chosen shape, per the user: "перенести все знаки препинания в шаблон,
в который пользователь вставляет свои слова" — **all** punctuation, commas included.

`BuildEngine` already does a narrow version of this: a trailing `"?"` is dropped from the
pool and rendered as a static span (`BuildEngine.tsx:32,36,42,94`). It was never
generalised — it fires only on `"?"` and only on the **last** token, so every other mark,
and every mid-chain sentence break, stays a draggable tile.

Measured inventory of punctuation tiles across all 229 `BuildItem`s:

- `DATA_BUILD` (`lesson1.ts:318`) — 35 `?`
- `DATA_PROFILE_BUILD` (`lesson1.ts:889`) — 26 `.` (13 items × 2 mid-chain breaks)
- `DATA_L4_HOURS_BUILD` (`lesson4.ts:669`) — 3 `?`
- `DATA_L5_BUILD` (`lesson5.ts:410,413`) — 2 `?`, 1 `,`
- `DATA_L5_KOGATO_BUILD` (`lesson5.ts:424`) — 10 `,`
- `DATA_L6_DA_BUILD` (`lesson6.ts:206`) — 2 `?`
- `DATA_L6_DIR_BUILD` (`lesson6.ts:547`) — 4 `?`, 1 `,`
- `DATA_L7_BUILD` (`lesson7.ts:577,589`) — 3 `?`, 1 `.`
- `DATA_L7_MARKET_BUILD` (`lesson7.ts:597,598`) — 5 `?`, 1 `,`
- `DATA_L8_BUILD` (`lesson8.ts:576`) — 3 `?`

Totals: 57 `?`, 27 `.`, 13 `,`, zero `!` and zero `…`. Of these, only the 57 `?` are
handled today; 40 tiles are still dragged by hand, 26 of them in the single
`profile_build` mode — almost certainly what the user hit.

### Current State

- `src/components/engines/BuildEngine.tsx` — 14 modes use `type: "build"`.
  `endsWithQuestion` (line 32) is the one-token special case; `target` (line 42) is the
  comparison sequence; the pool is `shuffle(target)` (line 36); the static `?` renders at
  line 94 once ≥1 tile is placed. Placed tiles are a flat list, not slots.
- `src/components/ui/Correction.tsx` — renders `text` verbatim on purpose (see its header
  comment: callers own punctuation decisions, because a trailing dot may be an
  abbreviation). `BuildEngine.tsx:96` feeds it `words.join(" ")`, which today yields
  `"Костюмът ми харесва ."` and `"какво правиш ?"` — a stray space before the mark.
- `src/utils/itemKey.ts:11` — the `BuildItem` mastery key is `words.join("|")`. **Editing
  the `words` arrays rewrites those keys and silently drops the learner's mastery history
  for the affected items.** A render-side template keeps them byte-identical.
- `src/i18n/strings.ts:44,105` — `tapWordsBelow` is shared with `ParadigmEngine.tsx:117`,
  so dropping it from `BuildEngine` would not orphan the key, but it also need not be
  dropped.
- No test runner exists (`package.json` has `dev` / `build` / `preview` / iOS scripts
  only). `npm run build` = `tsc && vite build` is the only automated gate. Node is v24, so
  a plain `.mjs` script under `scripts/` runs with no tooling added.

### Constraints

- Data files are read-only for this task: mastery keys (`words.join("|")`) must stay
  byte-identical, so the template is **derived from `words` at render time**, not stored.
- `Correction` keeps its verbatim contract; composition happens in the caller.
- Punctuation stays visible in the answer area — the learner sees the finished sentence,
  they just never place a mark.
- No new dependency and no test framework: verification is a `.mjs` data-invariant script
  plus `npm run build` plus a manual pass.
- Scope is the `build` engine only. `li`, `negation` and `paradigm` are untouched.

### Accepted difficulty changes

Both follow from "все знаки препинания в шаблон" and are accepted, not overlooked:

- `l5_kogato_build` (10 items): the clause comma is now given, so the learner sees where
  the subordinate clause breaks instead of deducing it. The mode's stated drill is word
  order inside the clause (`desc`: "Расставь слова в придаточном"), not comma placement,
  so the trained skill survives — the exercise just starts from a stronger scaffold.
- `profile_build` (13 items): a full slot skeleton reveals how many words belong to each
  of the three sentences. The mode already announces "Собери 3 предложения", so the
  sentence count was never hidden; the per-sentence length is newly visible.

### Affected Surface

Surface cross-check by `surface-scout` was not dispatched — the session's operating rules
forbid spawning subagents unless the user asks. The enumeration below is the planner's
own, produced by reading every engine and counting the data with a script.

- `src/components/engines/BuildEngine.tsx` — covered-by Solution steps 2-4
- `src/components/engines/BuildEngine.tsx:96` (`Correction` call, `words.join(" ")`) — covered-by Solution step 5
- `src/utils/punct.ts` (new) — covered-by Solution step 1
- `DATA_PROFILE_BUILD` `lesson1.ts:889`, 26 `.` tiles — covered-by Solution step 2 (render-side; data untouched)
- `DATA_L7_BUILD` `lesson7.ts:589`, 1 trailing `.` — covered-by Solution step 2 (render-side; data untouched)
- 13 `,` tiles in `DATA_L5_BUILD`, `DATA_L5_KOGATO_BUILD`, `DATA_L6_DIR_BUILD`, `DATA_L7_MARKET_BUILD` — covered-by Solution step 2; the comma moves into the template per the user's "все знаки препинания"
- 57 `?` tiles across 8 constants — covered-by Solution step 2; existing behaviour must not regress
- `src/components/engines/LiEngine.tsx` — not affected: `?` is already a static span (`LiEngine.tsx:91`) and 0 of 39 `LiItem.words` arrays carry any punctuation token
- `src/components/engines/NegEngine.tsx` — not affected: options are word-order permutations of `answer` strings, which carry no punctuation by design (`NegEngine.tsx:39-45`)
- `src/components/engines/ParadigmEngine.tsx` — not affected: its tile bank is `item.forms` (verb forms), no punctuation tokens (`ParadigmEngine.tsx:36`)
- `src/components/ui/Correction.tsx` — not affected: its header comment fixes verbatim pass-through as the contract
- `src/utils/itemKey.ts:11` — not affected by a render-side template; would break mastery keys under a data-side fix
- `src/utils/sliceData.ts:29` — not affected: picks N items, no per-token logic
- `src/i18n/strings.ts:44,105` `tapWordsBelow` — covered-by Solution step 3 (kept, shown while the template is empty)
- FR-A11Y-CONTRAST (`requirements.md:393`) — covered-by Solution step 3: template marks use `text-gray-600` (7.56:1), matching today's static `?`; `text-gray-300` / `text-gray-400` stay unused, so the FR's own grep evidence keeps passing
- FR-RESPONSIVE-LAYOUT (`requirements.md:401`) — covered-by Solution step 3 and the 320 / 390pt DoD item: the template adds up to 12 wrapping children and reflows as each slot fills
- `CLAUDE.md:100` "Exercise punctuation" paragraph — covered-by Solution step 7 (it currently states the learner drags `"."` tiles)
- `documents/requirements.md` (new FR-BUILD under FR-ENGINES) — covered-by Solution step 7
- `documents/index.md` — covered-by Solution step 7
- Out-of-order removal semantics (tap a placed word → the rest shift left across a mark) — deferred — human choice; see `## Follow-ups`

## Definition of Done

- [x] No `build` pool ever offers a punctuation tile, and every punctuation token in the
      data is rendered by the template. Asserted over all `src/data/*.ts` with the
      punctuation set read from `src/utils/punct.ts` (single source of truth).
      (FR-BUILD. Test: `scripts/check-build-punct.mjs`.
      Evidence: `node scripts/check-build-punct.mjs`)
- [x] `profile_build` shows the two sentence breaks as fixed template marks; the pool holds
      only words. (FR-BUILD. Test: manual — korchasa, `npm run dev` → урок 1 →
      "Расскажи о человеке". Evidence: `npm run dev`)
- [x] `l5_kogato_build` shows the clause comma as a fixed template mark; the pool holds
      only words. (FR-BUILD. Test: manual — korchasa, `npm run dev` → урок 5 →
      "Собери когато / който". Evidence: `npm run dev`)
- [x] Trailing-`?` items keep working: no `?` in the pool, `?` visible in the template.
      (FR-BUILD. Test: manual — korchasa, `npm run dev` → урок 1 → build-режим вопросов.
      Evidence: `npm run dev`)
- [x] A finished sentence is still scored `+15` and coloured per word exactly as before;
      punctuation is never coloured and never clickable. (FR-BUILD.
      Test: manual — korchasa. Evidence: `npm run dev`)
- [x] Mastery keys unchanged: no `words` array in `src/data/*.ts` differs from `HEAD`.
      (FR-MASTERY. Test: `git diff --stat -- 'src/data/*.ts'`.
      Evidence: `git diff --stat -- 'src/data/*.ts'` prints nothing)
- [x] `Correction` for build items renders with no space before a mark
      (`"Костюмът ми харесва."`, `"какво правиш?"`). (FR-BUILD. Test: manual — korchasa.
      Evidence: `npm run dev`)
- [x] No horizontal overflow at 320 and 390pt widths on the 12-token `profile_build` items,
      empty and fully filled. (FR-RESPONSIVE-LAYOUT. Test: manual — korchasa, browser at
      320 / 390pt. Evidence: `npm run dev`)
- [x] `text-gray-300` / `text-gray-400` still absent from `src/**/*.tsx`.
      (FR-A11Y-CONTRAST. Test: the FR's own grep evidence.
      Evidence: `! grep -rn 'text-gray-300\|text-gray-400' src --include='*.tsx'`)
- [x] Type-check and bundle stay green. (FR-ENGINES. Test: build gate.
      Evidence: `npm run build`)
- [x] Add the FR-BUILD section to `documents/requirements.md` with `**Acceptance:**`
      filled, register FR-BUILD in `documents/index.md`, and correct `CLAUDE.md:100`,
      which still says the learner drags `"."` tiles. (FR-BUILD. Test: manual — korchasa.
      Evidence: `git diff -- documents/ CLAUDE.md`)

## Solution

Selected shape: **punctuation as a render-time template derived from `words`.** The data
files are not touched, so mastery keys survive; the engine stops treating `"?"` as a
special case and treats every punctuation token uniformly.

### 1. New `src/utils/punct.ts`

Single source of truth for what counts as punctuation, plus the joiner the caller needs.

```ts
// FR-BUILD: punctuation is engine-rendered furniture, never a learner tile.
export const PUNCT = new Set([".", ",", "?", "!", "…"]);

export const isPunct = (token: string): boolean => PUNCT.has(token);

/** Join sentence tokens for display: no space before a punctuation token. */
export function joinTokens(tokens: string[]): string {
  return tokens.reduce((acc, tok, i) =>
    i === 0 || isPunct(tok) ? acc + tok : acc + " " + tok, "");
}
```

The set is exactly the five marks a Bulgarian A0 sentence can carry. `;` and `:` are left
out on purpose: the data has none, and a set that lists marks nobody writes is a guess,
not a contract. `!` and `…` are absent from today's data too but stay in — they are the
marks the user named, and a future author writing one must get template behaviour.

### 2. `BuildEngine`: derive the template

Replace `endsWithQuestion` / `target` (lines 32, 36, 42) with a memoised derivation of the
current item:

- `words` — the untouched `qs[cur].words`.
- `target = words.filter(w => !isPunct(w))` — the comparison sequence and the pool source.
- `slotOf: number[]` — index-parallel to `words`; for a word token it holds its position in
  `target`, for a punctuation token `-1`. Computed once per item with `useMemo` keyed on
  `cur`, so the render pass stays pure (no mutable counter inside `.map`).

`useEffect` on `cur` sets `setPool(shuffle(target))` — punctuation can no longer reach the
pool because it never enters `target`.

`addWord` is unchanged apart from comparing against the new `target`: completion is still
`np.length === target.length`, scoring still `+15`, `onItemAnswer(itemKey(qs[cur]), ...)`
still keys off the **original** item, so mastery keys are untouched.

### 3. `BuildEngine`: render the template

The answer container maps over `words`, not over `placed`:

- punctuation token → `<span>` styled as furniture: `text-gray-600 font-bold text-xl`
  (7.56:1, the same class today's static `?` uses at line 94 — FR-A11Y-CONTRAST bans
  `text-gray-300` / `text-gray-400` and its evidence is a repo-wide grep), `select-none`,
  no `onClick`, never coloured by the answer check.
- word token, slot filled → the existing `<button>` with the existing green/red/black
  classes, `onClick={() => removeWord(placed[slot], slot)}`.
- word token, slot empty → an inert placeholder: dashed pill
  (`min-w-12 h-10 rounded-[14px] border-2 border-dashed border-gray-300`, `aria-hidden`)
  so the sentence skeleton, including its marks, is visible from the first render. The
  border colour is fine — the FR bans those greys for **text**, and the grep it cites
  matches `text-gray-300`, not `border-gray-300`.

The container keeps `flex-wrap`, so a filled slot growing from a 48pt pill to a full word
reflows the row. That is inherent to any fill-the-slots layout; what must be proven is
that it never overflows horizontally — hence the 320 / 390pt DoD item. `profile_build`
is the worst case at 12 tokens.

`tapWordsBelow` stays, shown while `placed.length === 0`, above the skeleton.
`removeWord` keeps its current shift-left semantics (see `## Follow-ups`).

### 4. Delete the `?` special case

Line 94's `{placed.length > 0 && endsWithQuestion && <span>?</span>}` is removed —
the template in step 3 subsumes it, and the `?` is now visible from the first render
instead of after the first tile.

### 5. Fix the `Correction` text

`BuildEngine.tsx:96` becomes `text={joinTokens(qs[cur].words)}` and the `show` condition
compares against `target`:
`show={done && placed.join(" ") !== target.join(" ")}`. `Correction` itself is not touched.

### 6. New `scripts/check-build-punct.mjs`

Plain Node (v24, no dependency). It:

1. `import { PUNCT } from "../src/utils/punct.ts"` — Node 24 strips TS types natively and
   `punct.ts` has no imports of its own, so the set has exactly one definition and a
   rename breaks the script loudly. Fallback if stripping is off:
   `node --experimental-strip-types scripts/check-build-punct.mjs`;
2. regex-scans every `words: [...]` array in `src/data/*.ts`;
3. fails if any array is punctuation-only, or ends up empty after filtering — those would
   produce an empty pool;
4. prints the per-constant tile census (the `## Overview` table above) so a data author can
   see at a glance what the template will render;
5. exits non-zero on any failure.

Run: `node scripts/check-build-punct.mjs`.

### 7. Documentation

- `documents/requirements.md` — add `### 3.4.4 FR-BUILD` next to FR-MATCH / FR-ODD /
  FR-PARADIGM: template semantics, the pool-never-contains-punctuation invariant, the
  mastery-key constraint, with `**Acceptance:**` evidence lines.
- `documents/index.md` — the FR-BUILD row (already added by the planning step) gets its
  status updated from `[ ]` to implemented once the code lands.
- `CLAUDE.md:100` — rewrite the clause that lists `"."` word tiles "the learner drags into
  place"; after this change punctuation inside `words` is template furniture. The rest of
  that paragraph (no meaningless sentence-final periods in `q` / `answer` / prose, keep
  meaningful ones like `ул.`, `м.р.`) stays as is.

### Verification

```bash
node scripts/check-build-punct.mjs
git diff --stat -- 'src/data/*.ts'
npm run build
npm run dev   # урок 1 «Расскажи о человеке», урок 5 «Собери когато / който», урок 7 build
```

## Follow-ups

- Found while verifying: `.github/workflows/preview.yml:57` posts the preview URL as
  `https://bgtrainer.korchasa.dev/preview/<dir>/`, but previews are published to GitHub
  Pages under `app.bgtrainer.korchasa.dev`. The posted URL returns HTTP 200 — Cloudflare
  Pages serves the marketing landing for any path — so the comment looks correct while
  showing the wrong site. Stale since the repo split. One-line fix, out of scope here.
- Found while verifying: mode `q_build` ("Собери вопрос", `DATA_BUILD`, 35 items, 35 of the
  57 `?` tiles in the project) is defined in `src/data/index.ts:190` but its id appears in
  no `modeIds` list in `src/data/lessons.ts`, so it is unreachable from the UI. The
  template change covers it, but nobody can play it. Out of scope here — someone should
  decide whether to wire it into lesson 1 or delete it.
- Line-wrap grouping was added during implementation, beyond the written Solution: a mark
  and the word before it render as one non-wrapping unit, otherwise a line break can
  orphan a "." at the start of the next row. Recorded in FR-BUILD.
- Surface cross-check (`surface-scout`) did not run — session rules forbid spawning
  subagents unless the user asks for one.
- Independent critique (`plan-critic`) did not run for the same reason; the critique in
  this task's session was self-produced.
- Removal semantics stay as today: tapping a placed word returns it to the pool and shifts
  the following words one slot left, which can visually carry a word across a template
  mark. A true slot model (tap → leave a hole, completion = all slots filled) fits the
  template metaphor better but is a separate change the user did not ask for.
- Authoring ergonomics: with punctuation now pure presentation, `BuildItem` could carry the
  sentence as one string and derive tiles from it. Rejected here because it rewrites
  `words` and therefore every affected mastery key.
