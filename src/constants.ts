import type { Localized } from "./i18n/types";

export const OK: Localized<string[]> = {
  ru: ["Браво!", "Точно!", "Супер!", "Молодец!", "Вярно!", "Отлично!"],
  uk: ["Браво!", "Точно!", "Супер!", "Молодець!", "Вярно!", "Чудово!"],
};
export const FAIL: Localized<string[]> = {
  ru: ["Не-а!", "Не съвсем!", "Почти!", "Упс!", "Мимо!"],
  uk: ["Ні-і!", "Не зовсім!", "Майже!", "Упс!", "Мимо!"],
};

export const CHART_COLORS = [
  "#8b5cf6", "#0ea5e9", "#10b981", "#f59e0b", "#f43f5e",
  "#6366f1", "#ec4899", "#14b8a6", "#a855f7", "#fb923c",
];
export const STORAGE_KEY = "bg-trainer-v3";
export const ACCENT = "#E60023";

// FR-PACE: session size per pace. Round = ROUND_GAMES × SESSION_SIZE_BY_PACE[pace].
// Anchors: WM (Cowan 4±1), Cepeda distributed practice, Duolingo ~5-min norm, Bjork desirable difficulty.
export const SESSION_SIZE_BY_PACE: Record<import("./types").SessionPace, number> = {
  quick: 3,
  standard: 5,
  deep: 8,
};
export const ROUND_GAMES = 3;
export const PACE_STORAGE_KEY = "bg-trainer-pace-v1";
export const DEFAULT_PACE: import("./types").SessionPace = "standard";

export const PACE_SHORT_LABELS: Localized<Record<import("./types").SessionPace, string>> = {
  ru: { quick: "Быстро", standard: "Обычно", deep: "Длинно" },
  uk: { quick: "Швидко", standard: "Звично", deep: "Довго" },
};
