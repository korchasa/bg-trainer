import type { Localized } from "./i18n/types";

export interface HistoryEntry {
  mode: string;
  score: number;
  time: number;
  errors: number;
  ts: number;
  lessonId?: string;
  round?: boolean;
  qsTotal?: number;
}

export interface Lesson {
  id: string;
  num: number;
  title: Localized<string>;
  modeIds: string[];
  available: boolean;
}

export interface DataItem {
  q: string;
  answer: string;
  hint: Localized<string>;
  label?: Localized<string>;
  decoys?: string[];
  rule?: Localized<string>;
}

export interface BuildItem {
  words: string[];
  translation: Localized<string>;
}

export interface LiItem {
  words: string[];
  liPosition: number;
  result: string;
  translation: Localized<string>;
}

/**
 * FR-FRAME: one labelled position in a sentence frame. `role` names the job the
 * word does ("кто", "что делает"), never the word itself — the label must not
 * give the answer away.
 */
export interface FrameSlot {
  role: Localized<string>;
  word: string;
}

export interface FrameItem {
  slots: FrameSlot[];
  translation: Localized<string>;
  /**
   * Word orders that are also correct Bulgarian for the same translation, written
   * out in full. Only meaningful from step 3 on, where the learner chooses the
   * order and the length; below that the frame already fixes both.
   */
  alt?: string[];
  hint?: Localized<string>;
  rule?: Localized<string>;
}

/**
 * FR-FRAME-LADDER: how much of the sentence the drill hands over.
 *   1 — labelled roles, one slot per word: the frame is given, the words are recalled.
 *   2 — slots without labels: the length is given, the grammar is not.
 *   3 — an empty line: order and length are the learner's, words come from the bank.
 *   4 — typing: no bank, no line, nothing but the translation.
 * The step is a property of the lesson, so support fades as the course advances.
 */
export type FrameStep = 1 | 2 | 3 | 4;

/**
 * `bank` belongs to the mode, not to the item: it stays whole while `sliceData`
 * cuts `items` down to the session size. A per-item bank would hand the learner
 * exactly the words of the current sentence, which is the `build` drill.
 * At step 4 the bank is never rendered; it still defines the mode's vocabulary
 * and is what `scripts/check-lesson-lexicon.mjs` validates the sentences against.
 */
export interface FrameData {
  step: FrameStep;
  items: FrameItem[];
  bank: string[];
}

export interface MatchItem {
  left: string;
  right: string;
  hint: Localized<string>;
}

export interface OddItem {
  words: string[];
  odd: string;
  hint: Localized<string>;
  rule?: Localized<string>;
}

export interface ParadigmItem {
  verb: string;
  pronouns: string[];
  forms: string[];
  hint: Localized<string>;
  rule?: Localized<string>;
}

export type EngineType =
  | "pick" | "timed" | "pickOpt" | "pickFrom"
  | "negation" | "build" | "li" | "type"
  | "match" | "odd" | "paradigm" | "frame";

export interface PickOptData {
  items: DataItem[];
  opts: string[];
}

export interface Mode {
  id: string;
  icon: string;
  label: Localized<string>;
  desc: Localized<string>;
  type: EngineType;
  data: () => DataItem[] | PickOptData | BuildItem[] | LiItem[] | MatchItem[] | OddItem[] | ParadigmItem[] | FrameData;
}

export interface Category {
  id: string;
  name: Localized<string>;
  modes: Mode[];
}

export interface GameResult {
  score: number;
  time: number;
  errors: number;
}

export type Screen = "lessons" | "lesson" | "game" | "results" | "analytics";

export type SessionPace = "quick" | "standard" | "deep";

export interface ItemMastery {
  level: number;
  lastTs: number;
  attempts: number;
}

export type ModeMastery = Record<string, ItemMastery>;
export type MasteryStore = Record<string, ModeMastery>;

export interface MasteryEvent {
  modeId: string;
  itemId: string;
  ok: boolean;
  fast: boolean;
  ts: number;
  hinted?: boolean;
}
