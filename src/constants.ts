export const OK = ["Браво!", "Точно!", "Супер!", "Молодец!", "Вярно!", "Отлично!"];
export const FAIL = ["Не-а!", "Не съвсем!", "Почти!", "Упс!", "Мимо!"];
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
export const PACE_LABELS: Record<import("./types").SessionPace, { short: string; desc: string }> = {
  quick: { short: "Быстро", desc: "3 вопроса" },
  standard: { short: "Обычно", desc: "5 вопросов" },
  deep: { short: "Длинно", desc: "8 вопросов" },
};
