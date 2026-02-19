export interface HistoryEntry {
  mode: string;
  score: number;
  time: number;
  errors: number;
  ts: number;
}

export interface DataItem {
  q: string;
  answer: string;
  hint: string;
  label?: string;
  decoys?: string[];
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

export type EngineType = "pick" | "timed" | "pickOpt" | "pickFrom" | "negation" | "build" | "li";

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

export type Screen = "menu" | "game" | "results" | "analytics";
