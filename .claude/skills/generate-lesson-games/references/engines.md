# Engine Selection Reference

One-page matrix for matching a textbook topic to the correct engine. Read this after the main SKILL.md when sizing a new lesson.

## Selection matrix

- **pick** — single closed paradigm, learner picks the form that matches a pronoun cue.
  - Data: `DataItem[]`; `q` = pronoun label ("Аз"), `answer` = verb form.
  - Decoys: engine auto-draws 2 wrong forms from the same dataset.
  - Options count: 3 (shown as 3-column grid). Session size: all items (usually 6 for a paradigm).
  - Example: verb conjugation (съм, имам, казвам се, говоря, живея, зная, следвам, занимавам се).

- **timed** — same shape as `pick`, with a countdown and speed bonus.
  - Data: `DataItem[]`; identical schema to `pick`.
  - Options count: 4 (2×2 grid). Decoys: engine auto-draws 3 wrong from dataset.
  - Speed-gate: timer disabled and no speed bonus until mastery level ≥ 5.
  - Use sparingly — only for verbs that benefit from automaticity after recognition.

- **type** — productive recall via keyboard.
  - Data: `DataItem[]`; `q` = cue (pronoun / digit / translation), `answer` = exact Bulgarian string.
  - Normalization: trim + lowercase + collapse whitespace only. No substitutions.
  - Author `answer` lowercase unless uppercase is semantic (proper noun). No trailing punctuation unless required.

- **pickOpt** — fixed option pool shared by all items.
  - Data: `PickOptData` = `{ items: DataItem[]; opts: string[] }`. Every `item.answer` must appear in `opts`.
  - Session size: 15 (sliced). Authoring volume: ≥15 items.
  - Use for: articles (-ът/-та/-то/-те/-та), gender (мужской/женский/средний), да/не, preposition sets, demonstratives (този/тази/…), short possessives (ми/ти/му/й/ни/ви/им/си), greeting-by-time, има/няма, един/една/едно, ето го/я/ги.

- **pickFrom** — open set with per-item `decoys`.
  - Data: `DataItem[]`; each item must have `decoys: [3 strings]`. Engine picks all 3 when decoys present, else samples 3 other items' answers.
  - Session size: 15 (sliced). Authoring volume: ≥15 items.
  - Use for: plurals, adjective agreement, antonyms, directional adjectives (северен/южен/…), professions m↔f, vocabulary translation, transformation (aff→neg, aff→Q, ти→Вие), possessive forms, counted form.

- **negation** — construct Bulgarian negation from shuffled answer words.
  - Data: `DataItem[]`; `q` = affirmative, `answer` = correct Bulgarian negation string. No `decoys` needed.
  - Engine shuffles `answer.split(" ")` to build 2 wrong options.
  - Session size: 12. Authoring volume: ≥12.

- **build** — drag words into the correct order.
  - Data: `BuildItem[]` = `{ words, translation }`. Sentence may end with `?` or `.` (or no terminator for mid-build fragments).
  - Multi-sentence: insert `.` as its own word between sentences (see `DATA_PROFILE_BUILD`).
  - `translation`: locale-aware, no focus markers needed.
  - Session size: 12 (sliced). Authoring volume: ≥12.

- **li** — tap the position after which "ли" goes.
  - Data: `LiItem[]` = `{ words, liPosition, result, translation }`.
  - `words`: Bulgarian words WITHOUT "ли" (the gap). `liPosition` = index in `words` array after which "ли" lands.
  - `result`: complete Bulgarian sentence with "ли" in place, used as the correction display.
  - `translation.ru/uk` may wrap the focused word with `*word*` — `LiEngine` underlines it.
  - Session size: 12 (sliced). Authoring volume: ≥12.

- **match** — pair tapping (left column ↔ right column).
  - Data: `MatchItem[]` = `{ left, right, hint }`. Both sides Bulgarian.
  - Session = all pairs once. +10 per first-try correct pair; errors = unique wrong-left ids.
  - Use for: страна↔език, страна↔националност (м), профессия м↔ж, местоимение↔притяж, слово↔с артиклем, м.↔ж. родственники.

- **odd** — pick the intruder tile.
  - Data: `OddItem[]` = `{ words: [4 items], odd, hint, rule? }`.
  - 3 of 4 share a category, 1 does not. `odd` is the intruder.
  - Authoring: use `rule` to explain why on mistake. Vary category types (paradigm, gender, category: country vs language vs nationality).

- **paradigm** — fill 6-slot verb paradigm in one screen.
  - Data: `ParadigmItem[]` = `{ verb, pronouns, forms, hint, rule? }`.
  - `pronouns` usually `["Аз", "Ти", "Той/Тя/То", "Ние", "Вие", "Те"]` (or `["Аз", "Ти", "Той", "Ние", "Вие", "Те"]` for possessives).
  - `forms[i]` corresponds to `pronouns[i]`. Engine shuffles `forms` into pool and scores +5 per correct slot.
  - Use for: each verb or each gender/number row of possessives.

## Volume targets per mode

- L1: ≥6 items per mode (minimum historical rule).
- L2+: ≥10 items, ≥15 for `pickOpt`/`pickFrom` so slicing to 15 still draws variety.

## Session mechanics (affects UX perception)

- `pick`/`pickOpt`/`pickFrom`/`timed`/`type`/`odd`: session = 15 questions (or all if fewer). Re-queue: wrong answers reinsert 4–6 positions later via `retryBuffer`.
- `build`/`li`/`negation`: slice to 12.
- `match`: single-board, session ends when all pairs matched.
- `paradigm`: one item = one 6-slot board; advances on full fill.

## Cross-mode coverage for one grammar topic

When a grammar rule supports it, layer multiple engines for spaced retrieval:

1. `pickOpt` or `pickFrom` — recognition.
2. `type` — productive recall.
3. `paradigm` — schema/relational.
4. `timed` — automaticity (only after mastery ≥ 5 unlocks the timer).
5. `match` / `odd` — relational encoding and boundary drill.
6. `build` — integrative sentence production.

Not every topic needs all layers. L2 used this fully for gender/article/possessive; L3 did the same for short possessives/demonstratives/живея.

## Shared constants pattern

Group items that share a rule:

```ts
const POSS_SHORT_RULE: Localized<string> = {
  ru: "Краткие притяж.: аз→ми, ти→ти, той/то→му, тя→й, ние→ни, вие→ви, те→им; возвратное → си.",
  uk: "Короткі присв.: аз→ми, ти→ти, той/то→му, тя→й, ние→ни, вие→ви, те→им; зворотне → си.",
};

const L3_POSS_SHORT_OPTIONS = ["ми", "ти", "му", "й", "ни", "ви", "им", "си"];

export const DATA_L3_POSS_SHORT: DataItem[] = [
  { q: "...", answer: "ми", hint: { ru: "...", uk: "..." }, rule: POSS_SHORT_RULE },
  ...
];
```

Pattern keeps each item terse and the rule definition single-sourced.
