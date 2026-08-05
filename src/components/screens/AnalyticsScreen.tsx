import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { ACCENT } from "../../constants";
import { ALL_MODES } from "../../data";
import { LESSONS, LESSON_BY_ID } from "../../data/lessons";
import { useI18n } from "../../i18n/context";
import type { HistoryEntry, Mode } from "../../types";

const MODE_BY_ID: Record<string, Mode> = Object.fromEntries(ALL_MODES.map(m => [m.id, m]));
const MODE_TO_LESSON: Record<string, string> = (() => {
  const m: Record<string, string> = {};
  for (const l of LESSONS) for (const id of l.modeIds) m[id] = l.id;
  return m;
})();

function lessonOf(h: HistoryEntry): string | null {
  if (h.lessonId) return h.lessonId;
  if (h.mode.startsWith("round:")) return h.mode.slice(6);
  return MODE_TO_LESSON[h.mode] ?? null;
}

interface Props {
  history: HistoryEntry[];
  onBack: () => void;
  onClearHistory: () => void;
  onClearMastery: () => void;
}

export function AnalyticsScreen({ history, onBack, onClearHistory, onClearMastery }: Props) {
  const { t, f, L } = useI18n();

  const modeIcon = (modeId: string): string => {
    if (modeId.startsWith("round:")) return "🎲";
    return MODE_BY_ID[modeId]?.icon ?? "·";
  };
  const modeName = (modeId: string): string => {
    if (modeId.startsWith("round:")) {
      const lid = modeId.slice(6);
      const lesson = LESSON_BY_ID[lid];
      return lesson ? `${t("roundLabel")} · ${f("lessonNum", lesson.num)}` : t("roundLabel");
    }
    const m = MODE_BY_ID[modeId];
    return m ? L(m.label) : modeId;
  };

  if (!history.length) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
        <p className="text-gray-600 text-lg font-semibold">{t("noData")}</p>
        <button
          onClick={onBack}
          className="px-8 py-4 bg-[#F2F2F2] text-gray-900 font-bold rounded-full transition-all active:bg-[#E0E0E0]"
        >
          {t("backMenu")}
        </button>
      </div>
    );
  }

  const total = history.length;
  const average = Math.round(history.reduce((s, h) => s + h.score, 0) / total);
  const totalErrors = history.reduce((s, h) => s + (h.errors || 0), 0);
  const bestScore = Math.max(...history.map(h => h.score));
  // FR-ANALYTICS: only sessions that recorded how many answers they held. A
  // session stored before `qsTotal` existed used to be assumed eight answers
  // long, which quietly turned a 35-answer session with 12 errors into 12 errors
  // out of 8 and clamped it to 0%. An entry without the count contributes to
  // neither side of the fraction; once none are left, the distinction disappears
  // on its own, which is why nothing on screen explains it.
  const measured = history.filter(h => typeof h.qsTotal === "number");
  const totalQs = measured.reduce((s, h) => s + h.qsTotal!, 0);
  const measuredErrors = measured.reduce((s, h) => s + (h.errors || 0), 0);
  const byLesson: Record<string, { count: number; rounds: number; score: number; errors: number; measuredErrors: number; qs: number; best: number }> = {};
  let unassigned = 0;
  history.forEach(h => {
    const lid = lessonOf(h);
    if (!lid) { unassigned++; return; }
    if (!byLesson[lid]) byLesson[lid] = { count: 0, rounds: 0, score: 0, errors: 0, measuredErrors: 0, qs: 0, best: 0 };
    const b = byLesson[lid];
    b.count++;
    if (h.round) b.rounds++;
    b.score += h.score;
    b.errors += h.errors || 0;
    if (typeof h.qsTotal === "number") { b.qs += h.qsTotal; b.measuredErrors += h.errors || 0; }
    if (h.score > b.best) b.best = h.score;
  });
  const lessonRows = LESSONS
    .filter(l => byLesson[l.id])
    .map(l => {
      const b = byLesson[l.id];
      const acc = b.qs > 0 ? Math.max(0, Math.round((1 - b.measuredErrors / b.qs) * 100)) : null;
      return { id: l.id, num: l.num, title: L(l.title), ...b, avg: Math.round(b.score / b.count), acc };
    });
  const last20 = history.slice(-20).map((h, i) => ({ n: i + 1, score: h.score, errors: h.errors || 0 }));

  const statCards = [
    { icon: "🎮", value: total, label: t("statGames") },
    { icon: "⭐", value: bestScore, label: t("statBest") },
    { icon: "📈", value: average, label: t("statAvg") },
    { icon: "❌", value: totalErrors, label: t("statErrors") },
    { icon: "🎯", value: totalQs > 0 ? Math.max(0, Math.round((1 - measuredErrors / totalQs) * 100)) + "%" : "—", label: t("statAccuracy") },
    { icon: "📚", value: lessonRows.length, label: t("statLessons") },
  ];

  return (
    <div className="flex flex-col overflow-y-auto no-scrollbar">
      <div className="p-6 flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-3">
          {statCards.map((c, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-3 flex flex-col items-center justify-center aspect-[3/2] border border-gray-100">
              <span className="text-lg mb-1">{c.icon}</span>
              <span className="text-xl font-black text-gray-900">{c.value}</span>
            </div>
          ))}
        </div>

        {lessonRows.length > 0 && (
          <div className="border border-gray-100 rounded-[28px] p-6 bg-white shadow-sm">
            <h3 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wider">{t("byLessons")}</h3>
            <div className="flex flex-col gap-3">
              {lessonRows.map(l => (
                <div key={l.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-base font-black text-gray-900 shrink-0">
                    {l.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-black text-gray-900">{f("lessonNum", l.num)}</div>
                    <div className="text-sm font-semibold text-gray-600 leading-snug">{l.title}</div>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <div className="flex flex-col items-center">
                      <span className="text-base font-black text-gray-900">{l.count}</span>
                      <span className="text-xs font-bold text-gray-500 uppercase">{t("shortGames")}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-base font-black text-gray-900">{l.avg}</span>
                      <span className="text-xs font-bold text-gray-500 uppercase">{t("shortAvg")}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-base font-black" style={{ color: ACCENT }}>{l.acc === null ? "—" : `${l.acc}%`}</span>
                      <span className="text-xs font-bold text-gray-500 uppercase">{t("shortAcc")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {unassigned > 0 && (
              <div className="text-xs font-bold text-gray-500 mt-3 text-center">
                {f("unassignedCount", unassigned)}
              </div>
            )}
          </div>
        )}

        <div className="border border-gray-100 rounded-[28px] p-6 bg-white shadow-sm">
          <h3 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wider">{t("last20")}</h3>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={last20}>
              <XAxis dataKey="n" tick={{ fill: "#6b7280", fontSize: 13 }} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 13 }} />
              <Tooltip
                contentStyle={{ background: "#ffffff", border: "1px solid #f0f0f0", borderRadius: 12, fontSize: 15 }}
                itemStyle={{ color: "#111111" }}
              />
              <Line type="monotone" dataKey="score" stroke="#111111" strokeWidth={2} dot={{ r: 3, fill: "#111111" }} name={t("scoreSeries")} />
              <Line type="monotone" dataKey="errors" stroke={ACCENT} strokeWidth={2} dot={{ r: 3, fill: ACCENT }} name={t("errorsSeries")} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-gray-100 rounded-[28px] p-6 bg-white shadow-sm">
          <h3 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wider">{t("dataSection")}</h3>
          <div className="flex flex-col gap-2">
            <button
              onClick={onClearHistory}
              className="w-full px-4 py-3 text-sm font-bold text-gray-900 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 active:scale-[0.98] transition-all"
            >
              {t("resetHistory")}
            </button>
            <button
              onClick={onClearMastery}
              className="w-full px-4 py-3 text-sm font-bold text-white rounded-2xl active:scale-[0.98] transition-all"
              style={{ backgroundColor: ACCENT }}
            >
              {t("resetMastery")}
            </button>
          </div>
        </div>

        <div className="border border-gray-100 rounded-[28px] p-6 bg-white shadow-sm mb-6">
          <h3 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wider">{t("history")}</h3>
          <div className="flex flex-col gap-0">
            {history.slice(-15).reverse().map((h, i) => (
              <div key={i} className="flex items-center justify-between gap-2 py-3 border-b border-gray-100 last:border-0">
                <span className="text-xs font-bold text-gray-500 shrink-0">
                  {new Date(h.ts).toLocaleDateString(t("dateLocale"), { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                </span>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-1.5 rounded-full bg-gray-100 shrink-0">
                    <span className="text-sm">{modeIcon(h.mode)}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-800 truncate">
                    {modeName(h.mode)}
                  </span>
                </div>
                <span className="text-base font-black shrink-0" style={{ color: ACCENT }}>+{h.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
