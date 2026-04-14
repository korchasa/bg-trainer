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
  title: string;
  modeIds: string[];
  available: boolean;
}

export interface DataItem {
  q: string;
  answer: string;
  hint: string;
  label?: string;
  decoys?: string[];
  rule?: string;
}

export interface BuildItem {
  words: string[];
  translation: string;
}

export interface LiItem {
  words: string[];
  liPosition: number;
  result: string;
  translation: string;
}

export type EngineType = "pick" | "timed" | "pickOpt" | "pickFrom" | "negation" | "build" | "li" | "type";

export interface PickOptData {
  items: DataItem[];
  opts: string[];
}

export interface Mode {
  id: string;
  icon: string;
  label: string;
  desc: string;
  type: EngineType;
  data: () => DataItem[] | PickOptData | BuildItem[] | LiItem[];
  sessionSize?: number;
}

export interface Category {
  id: string;
  name: string;
  modes: Mode[];
}

export interface GameResult {
  score: number;
  time: number;
  errors: number;
}

export type Screen = "lessons" | "lesson" | "game" | "results" | "analytics";

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
