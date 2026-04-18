---
name: generate-lesson-games
description: Generates bg-trainer game data (DataItem arrays, mode definitions, lesson registration) from a Bulgarian textbook lesson file at documents/lessons/lesson-N.md. Use when the user asks to cover / port / add / generate games (modes, drills, exercises) for a specific lesson file, enable a lesson marked "Скоро", or extend an existing lesson's mode coverage. Encodes project-specific engine selection, item schemas, i18n (ru/uk) rules, and gotchas learned from post-release fixes (disambiguation, Lq "/" split, no-context judgments, LiEngine focus markers, rule/hint/label separation).
---

# Generate Lesson Games

Convert a Bulgarian textbook lesson at `documents/lessons/lesson-{N}.md` into playable game modes: per-lesson data file (`src/data/lesson{N}.ts`), category + mode registration in `src/data/index.ts`, and `modeIds[]` + `available: true` in `src/data/lessons.ts`.

## Inputs the user must supply

- The lesson file path (e.g., `documents/lessons/lesson-4.md`). Ask if not given.
- Optional: list of grammar topics to prioritize. If missing, cover every topic the lesson introduces.

If the file does not exist or is empty → STOP and ask the user.

## Workflow

1. **Read the lesson file in full.** Grammar tables, dialogues, exercise prompts, vocabulary lists, and the lesson's cultural/semantic framing all become drill material. Do not skim.
2. **Read `documents/i18n-glossary.md`** for current RU↔UK terminology. Append new rows before adding new translation terms.
3. **Read an existing per-lesson data module** matching the lesson's complexity (e.g., `src/data/lesson1.ts` for verb paradigms + vocab; `src/data/lesson2.ts` for gender/article/plural/possessive; `src/data/lesson3.ts` for short possessives + demonstratives + family). Mirror its structure: shared `RULE` / `HINT` constants at top of each section, then the exported `DATA_*` array.
4. **Inventory topics → pick engines.** See [references/engines.md](references/engines.md) for the selection matrix, session sizes, and required item fields per engine.
5. **Draft data items.** Follow the item schema rules and gotchas below. Minimum ≥10 items per mode (L1 historically allowed ≥6, but aim for 10+).
6. **Create `src/data/lesson{N}.ts`.** Export each `DATA_*` (and its `*_OPTIONS` for `pickOpt`). Import `Localized`, types, and shared `LABEL_M/F/N/PL` from `./lesson1` if applicable.
7. **Wire into `src/data/index.ts`.** Add imports, add `export * from "./lesson{N}"`, append a category (or append to existing `l{N}_extra`) with each `Mode`. Imperative `label`/`desc`.
8. **Enable in `src/data/lessons.ts`.** Set `available: true` and fill `modeIds` in the order modes should appear.
9. **Update `documents/requirements.md`** FR-LESSONS acceptance: add `[x]` line with evidence (file paths).
10. **Run `npm run build`** (maps to `check`) — fixes type errors, confirms no drift.
11. **Verify in browser** via `npm run dev` — spot-check 2–3 modes per lesson.

## Type reference (from `src/types.ts`)

```ts
DataItem     { q: string; answer: string; hint: Localized<string>; label?; decoys?; rule? }
BuildItem    { words: string[]; translation: Localized<string> }     // words may end in "?" or "."
LiItem       { words: string[]; liPosition: number; result: string; translation: Localized<string> }
MatchItem    { left: string; right: string; hint: Localized<string> }
OddItem      { words: string[]; odd: string; hint: Localized<string>; rule? }
ParadigmItem { verb: string; pronouns: string[]; forms: string[]; hint: Localized<string>; rule? }
PickOptData  { items: DataItem[]; opts: string[] }                   // `pickOpt` data()
Mode         { id; icon; label: Localized; desc: Localized; type: EngineType; data: () => ... }
```

`Localized<T> = { ru: T; uk: T }` — both keys always present (compiler-enforced).

## Item schema rules

### Bulgarian content — never translated

These fields hold source-language content and stay Bulgarian:
`DataItem.q` (usually), `DataItem.answer`, `DataItem.decoys`,
`BuildItem.words`, `LiItem.words`, `LiItem.result`,
`MatchItem.left`, `MatchItem.right`, `OddItem.words`, `OddItem.odd`,
`ParadigmItem.verb`, `ParadigmItem.pronouns`, `ParadigmItem.forms`.

### Localized fields (ru + uk required)

`DataItem.hint`, `DataItem.label`, `DataItem.rule`,
`BuildItem.translation`, `LiItem.translation`,
`MatchItem.hint`, `OddItem.hint`, `OddItem.rule`, `ParadigmItem.hint`, `ParadigmItem.rule`,
`Mode.label`, `Mode.desc`, `Category.name`, `Lesson.title`.

Share `Localized<string>` constants across items that use the same rule/hint to cut duplication:

```ts
const SYM_RULE: Localized<string> = {
  ru: "«съм» — неправильный глагол-связка. Парадигма: съм/си/е · сме/сте/са.",
  uk: "«съм» — неправильне дієслово-зв'язка. Парадигма: съм/си/е · сме/сте/са.",
};
export const DATA_SYM: DataItem[] = [
  { q: "Аз", answer: "съм", hint: { ru: "я есть", uk: "я є" }, rule: SYM_RULE },
  ...
];
```

### `DataItem.q` dual-locale trick

`q` is a plain string, not `Localized<string>`. Six engines (`pick`, `pickFrom`, `pickOpt`, `timed`, `type`, `negation`) route `q` through `Lq(q)` which splits on exactly one ` / ` and returns the locale side. Use this only when the prompt itself is an L1 translation gloss that differs between RU and UK:

- `"мальчик / хлопчик"` → RU sees "мальчик", UK sees "хлопчик".
- `"брат"` → stays "брат" in both (single value, no `/`).
- `"Ти ли си студент?"` → grammatical Bulgarian prompt, passes through unchanged.

Never use ` / ` for anything else in `q` (the splitter will mangle it). For `LiItem.result`, `MatchItem.*`, `BuildItem.words`, `OddItem.words`: never insert ` / ` — they are not routed through `Lq`.

### `label` disambiguates, `hint` glosses, `rule` explains

- **`label`** (optional): short localized tag next to the question — use when `q` alone is ambiguous (duplicate emojis, repeated stems). Example: `DATA_KAK_SI` with two 😄-like emojis uses `label` to distinguish "отлично" vs "хорошо".
- **`hint`** (required): L1 gloss that appears after answering or when the user taps "Подсказка". Keep semantic, not a spoiler.
- **`rule`** (optional): full grammar rule shown on mistake. Reuse a shared `*_RULE` constant across all items of the same paradigm/category.

### Decoys must be plausibly wrong, never correct

For `pickFrom`, supply 3 `decoys` per item — forms the learner might produce by L1 interference. Do NOT include the correct answer among decoys. Example (aff → neg transform):

```ts
{ q: "Аз съм студент.", answer: "Аз не съм студент.",
  hint: HINT_NEG, rule: TRANS_NEG_RULE,
  decoys: ["Аз съм не студент.", "Не аз съм студент.", "Аз не студент съм."] }
```

### `Mode.desc` must be an imperative instruction

Rendered inline above the question as the task prompt. Actionable, not topical:

- Good: `"Выбери форму «казвам се» для местоимения"`
- Bad: `"Спряжение «казвам се»"` (topical label)

### `Mode.label` is the menu title; keep localized + short

Bulgarian verb/term stays as-is in both locales: `{ ru: "Живея", uk: "Живея" }`. Translate surrounding words.

## Gotchas — learned from post-release fixes

### No-context judgment modes are forbidden

Removed `vf_pick` / `l3_vf_pick` ("Вярно / Не е вярно") because they asked learners to judge statements against a lesson text never shown in-app. **Every item must be answerable from what the UI displays.** If the textbook exercise relies on a reading passage, either skip it or restructure into a self-contained drill.

### `LiEngine` needs a focus marker in the translation

`LiItem.translation` may wrap the focused verb with `*word*`; `LiEngine` renders that span underlined. Required when word order alone does not uniquely identify which word carries "ли":

```ts
{ words: ["Говориш", "български"], liPosition: 0,
  result: "Говориш ли български?",
  translation: { ru: "*Говоришь* по-болгарски?", uk: "*Розмовляєш* болгарською?" } }
```

Without the marker, `liPosition: 0` is still valid but pedagogically ambiguous.

### Don't leak the answer in `q`

Replace textual spoilers with non-verbal cues:

- `DATA_NALI` used `(да)` / `(не)` as situation hints → replaced with `👍` / `👎` emoji so the Bulgarian prompt reads natural while the cue remains.
- `DATA_GREETING` used generic `"доброе утро"` hints → replaced with time-range hints (`"утро (до 11:00)"`) plus a shared `GREETING_RULE` defining the boundaries, so the item is answerable from the clock alone.

### Duplicate q-cues need `label`

If two items share the same emoji/stem `q`, add a localized `label` to differentiate — else the learner sees "🙂" twice with no way to tell which answer was expected.

### `TypeEngine` does whitelist-only normalization

Input passes through `trim + lowercase + collapse whitespace`. **No character substitutions.** `ѝ`, stress marks, soft signs all survive. When authoring `answer` strings for `type` modes: write exactly what the learner must type. No mixed case, no leading/trailing spaces.

### `BuildEngine` sentence endings

Words array may end with `?` (question) or `.` (statement). For multi-sentence `build` items (e.g., profile cards), use `.` as a separate word between sentences:

```ts
words: ["Той", "се", "казва", "Ханс", ".", "Той", "е", "от", "Германия", ".", "Говори", "немски"]
```

### `NegEngine` auto-generates decoys

Pass plain `DataItem[]` whose `answer` is the correct Bulgarian negation. The engine shuffles the answer words to build 2 wrong options. No `decoys` needed — supplying them has no effect.

### Session size per engine (affects authoring volume)

- `pick`, `timed`, `type`, `negation` (internally 12), `odd`, `paradigm`, `match`: consume all items you provide (or `slice(0, 12)` for neg/li/build).
- `pickFrom`, `pickOpt`: slice to 15.

Aim for ≥15 items on `pickFrom`/`pickOpt` modes so sessions have variety; ≥12 for `li`/`build`/`negation`; ≥6 for `pick`/`paradigm` (one full paradigm = 6 slots).

### `pickOpt` options are a closed set

`*_OPTIONS: string[]` — every `item.answer` must be in that array. Verify by scanning.

### Use existing engines before inventing new ones

The engine set is: `pick | timed | pickOpt | pickFrom | negation | build | li | type | match | odd | paradigm`. A new lesson almost never justifies a new engine. Pick the closest fit.

## Engine quick-picker

- Closed paradigm by pronoun (verb conjugation) → `pick`
- Same, with time pressure for automaticity → `timed`
- Productive recall (type the form) → `type`
- Fixed short answer set (gender, article, да/нет, preposition, demonstrative) → `pickOpt` + `*_OPTIONS`
- Open set with per-item confusable decoys (plural, agreement, antonym, transformation) → `pickFrom`
- Word ordering → `build`
- Particle "ли" placement → `li`
- "не"-insertion → `negation`
- Pair tapping (A ↔ B mapping) → `match`
- Odd-one-out of 4 tiles → `odd`
- Whole 6-slot paradigm fill → `paradigm`

Full rationale + required fields → [references/engines.md](references/engines.md).

## Post-generation checklist

- [ ] Every `DataItem` has `hint` (with both `ru` and `uk`).
- [ ] Every `answer` is verbatim from the lesson's Bulgarian source or derivable by the rule being taught.
- [ ] No item asks the learner to judge against a hidden passage.
- [ ] `pickFrom` items have 3 `decoys` each; correct answer is not among them.
- [ ] `pickOpt` items: every `answer` appears in `*_OPTIONS`.
- [ ] `LiItem.translation` marks focus with `*word*` when the translation is ambiguous.
- [ ] Items with duplicate `q` strings carry distinct `label` fields.
- [ ] `Mode.desc` is imperative ("Выбери…", "Собери…"), not topical.
- [ ] Mode registered in `src/data/index.ts` AND its id listed in `LESSONS[i].modeIds` in `src/data/lessons.ts`.
- [ ] `LESSONS[i].available = true` if this is the lesson being enabled.
- [ ] `npm run build` passes (strict TS + Vite bundle).
- [ ] SRS `FR-LESSONS` acceptance row updated with evidence.

## Final response format

Report back inline: list of modes added (id, engine, item count), files modified, build result. Do not generate a standalone .md report file.
