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

export type EngineType = "pick" | "timed" | "pickOpt" | "pickFrom" | "negation" | "build" | "li" | "type";

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
  data: () => DataItem[] | PickOptData | BuildItem[] | LiItem[];
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
