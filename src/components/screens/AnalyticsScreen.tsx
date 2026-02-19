import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import { CHART_COLORS, ACCENT } from "../../constants";
import { MODE_LABELS } from "../../data";
import type { HistoryEntry } from "../../types";

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
  const byMode: Record<string, { count: number; total: number }> = {};
  history.forEach(h => {
    if (!byMode[h.mode]) byMode[h.mode] = { count: 0, total: 0 };
    byMode[h.mode].count++;
    byMode[h.mode].total += h.score;
  });
  const modeData = Object.entries(byMode).map(([key, v], i) => ({
    name: MODE_LABELS[key] || key,
    games: v.count,
    avg: Math.round(v.total / v.count),
    value: v.count,
    fill: CHART_COLORS[i % CHART_COLORS.length],
  }));
  const last20 = history.slice(-20).map((h, i) => ({ n: i + 1, score: h.score, errors: h.errors || 0 }));

  const statCards = [
    { icon: "🎮", value: total, label: "игр" },
    { icon: "⭐", value: bestScore, label: "лучший" },
    { icon: "📈", value: average, label: "средний" },
    { icon: "❌", value: totalErrors, label: "ошибок" },
    { icon: "🎯", value: Math.max(0, Math.round((1 - totalErrors / (totalErrors + total * 8)) * 100)) + "%", label: "точность" },
    { icon: "🏅", value: Object.keys(byMode).length, label: "режимов" },
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

        <div className="border border-gray-100 rounded-[28px] p-6 bg-white shadow-sm">
          <h3 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wider">По режимам</h3>
          <div className="flex gap-4 items-center">
            <ResponsiveContainer width="40%" height={100}>
              <PieChart>
                <Pie data={modeData} dataKey="value" cx="50%" cy="50%" outerRadius={44} innerRadius={20}>
                  {modeData.map((_, i) => <Cell key={i} fill={modeData[i].fill} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-1.5 text-xs flex-1">
              {modeData.map((m, i) => (
                <div key={m.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                  <span className="text-gray-700 font-semibold truncate flex-1">{m.name}</span>
                  <span className="text-gray-400 font-bold shrink-0">×{m.games}</span>
                </div>
              ))}
            </div>
          </div>
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
