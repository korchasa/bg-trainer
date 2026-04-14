import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { ACCENT } from "../../constants";
import { MODE_LABELS } from "../../data";
import { LESSONS } from "../../data/lessons";
import type { HistoryEntry } from "../../types";

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
  onClear: () => void;
}

export function AnalyticsScreen({ history, onBack, onClear }: Props) {
  if (!history.length) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
        <p className="text-gray-400 text-lg font-semibold">Пока нет данных!</p>
        <button
          onClick={onBack}
          className="px-8 py-4 bg-[#F2F2F2] text-gray-900 font-bold rounded-full transition-all active:bg-[#E0E0E0]"
        >
          ← Меню
        </button>
      </div>
    );
  }

  const total = history.length;
  const average = Math.round(history.reduce((s, h) => s + h.score, 0) / total);
  const totalErrors = history.reduce((s, h) => s + (h.errors || 0), 0);
  const bestScore = Math.max(...history.map(h => h.score));
  const totalQs = history.reduce((s, h) => s + (h.qsTotal ?? 8), 0);
  const byLesson: Record<string, { count: number; rounds: number; score: number; errors: number; qs: number; best: number }> = {};
  let unassigned = 0;
  history.forEach(h => {
    const lid = lessonOf(h);
    if (!lid) { unassigned++; return; }
    if (!byLesson[lid]) byLesson[lid] = { count: 0, rounds: 0, score: 0, errors: 0, qs: 0, best: 0 };
    const b = byLesson[lid];
    b.count++;
    if (h.round) b.rounds++;
    b.score += h.score;
    b.errors += h.errors || 0;
    b.qs += h.qsTotal ?? (h.round ? 15 : 8);
    if (h.score > b.best) b.best = h.score;
  });
  const lessonRows = LESSONS
    .filter(l => byLesson[l.id])
    .map(l => {
      const b = byLesson[l.id];
      const acc = Math.max(0, Math.round((1 - b.errors / Math.max(b.qs, 1)) * 100));
      return { id: l.id, num: l.num, title: l.title, ...b, avg: Math.round(b.score / b.count), acc };
    });
  const last20 = history.slice(-20).map((h, i) => ({ n: i + 1, score: h.score, errors: h.errors || 0 }));

  const statCards = [
    { icon: "🎮", value: total, label: "игр" },
    { icon: "⭐", value: bestScore, label: "лучший" },
    { icon: "📈", value: average, label: "средний" },
    { icon: "❌", value: totalErrors, label: "ошибок" },
    { icon: "🎯", value: Math.max(0, Math.round((1 - totalErrors / Math.max(totalQs, 1)) * 100)) + "%", label: "точность" },
    { icon: "📚", value: lessonRows.length, label: "уроков" },
  ];

  void onClear; // exposed for parent but currently triggered via NavHeader

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
            <h3 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wider">По урокам</h3>
            <div className="flex flex-col gap-3">
              {lessonRows.map(l => (
                <div key={l.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-base font-black text-gray-900 shrink-0">
                    {l.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black text-gray-900">Урок {l.num}</div>
                    <div className="text-[11px] font-semibold text-gray-400 truncate">{l.title}</div>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-black text-gray-900">{l.count}</span>
                      <span className="text-[9px] font-bold text-gray-400 uppercase">игр</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-black text-gray-900">{l.avg}</span>
                      <span className="text-[9px] font-bold text-gray-400 uppercase">ср.</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-black" style={{ color: ACCENT }}>{l.acc}%</span>
                      <span className="text-[9px] font-bold text-gray-400 uppercase">точн.</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {unassigned > 0 && (
              <div className="text-[10px] font-bold text-gray-400 mt-3 text-center">
                Без привязки к уроку: {unassigned}
              </div>
            )}
          </div>
        )}

        <div className="border border-gray-100 rounded-[28px] p-6 bg-white shadow-sm">
          <h3 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wider">Последние 20</h3>
          <ResponsiveContainer width="100%" height={130}>
            <LineChart data={last20}>
              <XAxis dataKey="n" tick={{ fill: "#9ca3af", fontSize: 10 }} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} />
              <Tooltip
                contentStyle={{ background: "#ffffff", border: "1px solid #f0f0f0", borderRadius: 12, fontSize: 12 }}
                itemStyle={{ color: "#111111" }}
              />
              <Line type="monotone" dataKey="score" stroke="#111111" strokeWidth={2} dot={{ r: 3, fill: "#111111" }} name="Очки" />
              <Line type="monotone" dataKey="errors" stroke={ACCENT} strokeWidth={2} dot={{ r: 3, fill: ACCENT }} name="Ошибки" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-gray-100 rounded-[28px] p-6 bg-white shadow-sm mb-6">
          <h3 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wider">История</h3>
          <div className="flex flex-col gap-0">
            {history.slice(-15).reverse().map((h, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <span className="text-xs font-bold text-gray-400">
                  {new Date(h.ts).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                </span>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-gray-100">
                    <span className="text-xs">{(MODE_LABELS[h.mode] || h.mode).split(" ")[0]}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-800 max-w-[100px] truncate">
                    {(MODE_LABELS[h.mode] || h.mode).split(" ").slice(1).join(" ")}
                  </span>
                </div>
                <span className="text-sm font-black" style={{ color: ACCENT }}>+{h.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
