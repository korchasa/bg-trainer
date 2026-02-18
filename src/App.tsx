import { useState, useEffect, useCallback, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const sh = (arr: any[]) => [...arr].sort(() => Math.random() - 0.5);
const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
const OK = ["🎉 Браво!","✨ Точно!","🔥 Супер!","💪 Молодец!","⚡ Вярно!","🌟 Отлично!"];
const FAIL = ["😅 Не-а!","🤔 Не съвсем!","💫 Почти!","🙈 Упс!","😬 Мимо!"];
const CHART_COLORS = ["#8b5cf6","#0ea5e9","#10b981","#f59e0b","#f43f5e","#6366f1","#ec4899","#14b8a6","#a855f7","#fb923c"];
const STORAGE_KEY = "bg-trainer-v3";

interface HistoryEntry {
  mode: string;
  score: number;
  time: number;
  errors: number;
  ts: number;
}

function loadHistory(): HistoryEntry[] { try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; } }
function saveHistory(h: HistoryEntry[]) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(h.slice(-200))); } catch {} }
function clearHistory() { try { localStorage.removeItem(STORAGE_KEY); } catch {} }

// === DATA ===
const DATA_SYM = [
  { q: "Аз", answer: "съм", hint: "я есть" },
  { q: "Ти", answer: "си", hint: "ты есть" },
  { q: "Той/Тя/То", answer: "е", hint: "он/она есть" },
  { q: "Ние", answer: "сме", hint: "мы есть" },
  { q: "Вие", answer: "сте", hint: "вы есть" },
  { q: "Те", answer: "са", hint: "они есть" },
];
const DATA_IMAM = [
  { q: "Аз", answer: "имам", hint: "я имею" },
  { q: "Ти", answer: "имаш", hint: "ты имеешь" },
  { q: "Той/Тя/То", answer: "има", hint: "он имеет" },
  { q: "Ние", answer: "имаме", hint: "мы имеем" },
  { q: "Вие", answer: "имате", hint: "вы имеете" },
  { q: "Те", answer: "имат", hint: "они имеют" },
];
const DATA_ISKAM = [
  { q: "Аз", answer: "искам", hint: "я хочу" },
  { q: "Ти", answer: "искаш", hint: "ты хочешь" },
  { q: "Той/Тя/То", answer: "иска", hint: "он хочет" },
  { q: "Ние", answer: "искаме", hint: "мы хотим" },
  { q: "Вие", answer: "искате", hint: "вы хотите" },
  { q: "Те", answer: "искат", hint: "они хотят" },
];
const DATA_ARTICLE = [
  { q: "мъж", label: "мужской род", answer: "-ът", hint: "мужчина" },
  { q: "стол", label: "мужской род", answer: "-ът", hint: "стул" },
  { q: "град", label: "мужской род", answer: "-ът", hint: "город" },
  { q: "жена", label: "женский род", answer: "-та", hint: "женщина" },
  { q: "книга", label: "женский род", answer: "-та", hint: "книга" },
  { q: "улица", label: "женский род", answer: "-та", hint: "улица" },
  { q: "дете", label: "средний род", answer: "-то", hint: "ребёнок" },
  { q: "море", label: "средний род", answer: "-то", hint: "море" },
  { q: "село", label: "средний род", answer: "-то", hint: "село" },
  { q: "деца", label: "множественное число", answer: "-та", hint: "дети" },
  { q: "книги", label: "множественное число", answer: "-те", hint: "книги" },
  { q: "мъже", label: "множественное число", answer: "-те", hint: "мужчины" },
];
const ARTICLE_OPTIONS = ["-ът", "-та", "-то", "-те", "-а"];
const DATA_GENDER = [
  { q: "мъж", answer: "мужской", hint: "мужчина" },
  { q: "стол", answer: "мужской", hint: "стул" },
  { q: "град", answer: "мужской", hint: "город" },
  { q: "ден", answer: "мужской", hint: "день" },
  { q: "жена", answer: "женский", hint: "женщина" },
  { q: "книга", answer: "женский", hint: "книга" },
  { q: "нощ", answer: "женский", hint: "ночь" },
  { q: "улица", answer: "женский", hint: "улица" },
  { q: "дете", answer: "средний", hint: "ребёнок" },
  { q: "море", answer: "средний", hint: "море" },
  { q: "село", answer: "средний", hint: "село" },
  { q: "сърце", answer: "средний", hint: "сердце" },
];
const GENDER_OPTIONS = ["мужской", "женский", "средний"];
const DATA_PLURAL = [
  { q: "книга", answer: "книги", hint: "книга", decoys: ["книгове", "книге", "книга"] },
  { q: "жена", answer: "жени", hint: "женщина", decoys: ["женове", "жене", "жена"] },
  { q: "маса", answer: "маси", hint: "стол", decoys: ["масове", "масе", "маса"] },
  { q: "мъж", answer: "мъже", hint: "мужчина", decoys: ["мъжи", "мъжове", "мъжа"] },
  { q: "стол", answer: "столове", hint: "стул", decoys: ["столи", "столе", "стола"] },
  { q: "град", answer: "градове", hint: "город", decoys: ["гради", "граде", "града"] },
  { q: "дете", answer: "деца", hint: "ребёнок", decoys: ["дети", "детета", "детове"] },
  { q: "око", answer: "очи", hint: "глаз", decoys: ["окове", "оки", "очета"] },
  { q: "ухо", answer: "уши", hint: "ухо", decoys: ["ухове", "уха", "ушета"] },
  { q: "ден", answer: "дни", hint: "день", decoys: ["денове", "дене", "дена"] },
  { q: "нощ", answer: "нощи", hint: "ночь", decoys: ["нощове", "нощта", "ноще"] },
  { q: "ръка", answer: "ръце", hint: "рука", decoys: ["ръки", "ръкове", "ръката"] },
];
const DATA_PRONOUN_SHORT = [
  { q: "аз", label: "винительный падеж", answer: "ме", hint: "меня" },
  { q: "аз", label: "дательный падеж", answer: "ми", hint: "мне" },
  { q: "ти", label: "винительный падеж", answer: "те", hint: "тебя" },
  { q: "ти", label: "дательный падеж", answer: "ти", hint: "тебе" },
  { q: "той", label: "винительный падеж", answer: "го", hint: "его" },
  { q: "той", label: "дательный падеж", answer: "му", hint: "ему" },
  { q: "тя", label: "винительный падеж", answer: "я", hint: "её" },
  { q: "тя", label: "дательный падеж", answer: "ѝ", hint: "ей" },
  { q: "ние", label: "винительный падеж", answer: "ни", hint: "нас" },
  { q: "те", label: "винительный падеж", answer: "ги", hint: "их" },
];
const DATA_POSSESS = [
  { q: "мой", label: "мужской род, полная форма", answer: "моят / мой", hint: "мой (полн.)" },
  { q: "моя", label: "женский род, полная форма", answer: "моята / моя", hint: "моя (полн.)" },
  { q: "мой", label: "краткая форма", answer: "ми", hint: "мой (кратк.)" },
  { q: "твой", label: "краткая форма", answer: "ти", hint: "твой (кратк.)" },
  { q: "негов", label: "мужской род, полная форма", answer: "неговият", hint: "его (полн.)" },
  { q: "негов", label: "краткая форма", answer: "му", hint: "его (кратк.)" },
  { q: "неин", label: "женский род, полная форма", answer: "нейният", hint: "её (полн.)" },
  { q: "неин", label: "краткая форма", answer: "ѝ", hint: "её (кратк.)" },
  { q: "наш", label: "краткая форма", answer: "ни", hint: "наш (кратк.)" },
  { q: "ваш", label: "краткая форма", answer: "ви", hint: "ваш (кратк.)" },
  { q: "техен", label: "краткая форма", answer: "им", hint: "их (кратк.)" },
];
const DATA_NEGATION = [
  { q: "Аз съм студент.", answer: "Аз не съм студент.", hint: "Я студент." },
  { q: "Тя има куче.", answer: "Тя няма куче.", hint: "У неё есть собака." },
  { q: "Те идват.", answer: "Те не идват.", hint: "Они приходят." },
  { q: "Аз винаги пия кафе.", answer: "Аз никога не пия кафе.", hint: "Я всегда пью кофе." },
  { q: "Искам нещо.", answer: "Не искам нищо.", hint: "Хочу что-нибудь." },
  { q: "Някой е тук.", answer: "Никой не е тук.", hint: "Кто-то здесь." },
  { q: "Ти знаеш.", answer: "Ти не знаеш.", hint: "Ты знаешь." },
  { q: "Има време.", answer: "Няма време.", hint: "Есть время." },
];
const DATA_BUILD = [
  { words: ["Какво", "правиш", "?"], translation: "Что делаешь?" },
  { words: ["Къде", "живееш", "?"], translation: "Где живёшь?" },
  { words: ["Кога", "идваш", "?"], translation: "Когда придёшь?" },
  { words: ["Как", "се", "казваш", "?"], translation: "Как тебя зовут?" },
  { words: ["Колко", "струва", "?"], translation: "Сколько стоит?" },
  { words: ["Защо", "плачеш", "?"], translation: "Почему плачешь?" },
  { words: ["Откъде", "си", "?"], translation: "Откуда ты?" },
  { words: ["Какво", "искаш", "да", "ядеш", "?"], translation: "Что хочешь есть?" },
  { words: ["Къде", "е", "гарата", "?"], translation: "Где вокзал?" },
  { words: ["Кога", "тръгва", "влакът", "?"], translation: "Когда отправляется поезд?" },
  { words: ["Как", "се", "чувстваш", "?"], translation: "Как себя чувствуешь?" },
];
const DATA_LI = [
  { words: ["Говориш", "български"], liPosition: 0, result: "Говориш ли български?", translation: "Говоришь по-болгарски?" },
  { words: ["Искаш", "кафе"], liPosition: 0, result: "Искаш ли кафе?", translation: "Хочешь кофе?" },
  { words: ["Имаш", "време"], liPosition: 0, result: "Имаш ли време?", translation: "Есть время?" },
  { words: ["Разбираш", "ме"], liPosition: 0, result: "Разбираш ли ме?", translation: "Понимаешь меня?" },
  { words: ["Можеш", "да", "помогнеш"], liPosition: 0, result: "Можеш ли да помогнеш?", translation: "Можешь помочь?" },
  { words: ["Знаеш", "къде", "е"], liPosition: 0, result: "Знаеш ли къде е?", translation: "Знаешь, где это?" },
  { words: ["Обичаш", "музика"], liPosition: 0, result: "Обичаш ли музика?", translation: "Любишь музыку?" },
  { words: ["Вярваш", "ми"], liPosition: 0, result: "Вярваш ли ми?", translation: "Веришь мне?" },
];

// === CATEGORIES & MODES ===
interface DataItem {
  q: string;
  answer: string;
  hint: string;
  label?: string;
  decoys?: string[];
}

interface BuildItem {
  words: string[];
  translation: string;
}

interface LiItem {
  words: string[];
  liPosition: number;
  result: string;
  translation: string;
}

interface Mode {
  id: string;
  icon: string;
  label: string;
  desc: string;
  type: string;
  data: () => any;
}

interface Category {
  id: string;
  name: string;
  modes: Mode[];
}

const CATEGORIES: Category[] = [
  { id: "sym", name: "Глагол «съм»", modes: [
    { id: "sym_pick", icon: "🔗", label: "Подбери форму", desc: "Выбери форму для местоимения", type: "pick", data: () => DATA_SYM },
    { id: "sym_fill", icon: "⏱", label: "На скорость", desc: "Выбери форму с таймером", type: "timed", data: () => DATA_SYM },
  ]},
  { id: "imam", name: "Имам / искам", modes: [
    { id: "imam_pick", icon: "🔗", label: "Имам", desc: "Спряжение «имам»", type: "pick", data: () => DATA_IMAM },
    { id: "iskam_pick", icon: "🔗", label: "Искам", desc: "Спряжение «искам»", type: "pick", data: () => DATA_ISKAM },
  ]},
  { id: "article", name: "Артикли", modes: [
    { id: "art_pick", icon: "📎", label: "Добавь артикль", desc: "Выбери правильный суффикс", type: "pickOpt", data: () => ({ items: DATA_ARTICLE, opts: ARTICLE_OPTIONS }) },
  ]},
  { id: "gender", name: "Род существительных", modes: [
    { id: "gen_pick", icon: "⚥", label: "Определи род", desc: "м.р., ж.р. или ср.р.?", type: "pickOpt", data: () => ({ items: DATA_GENDER, opts: GENDER_OPTIONS }) },
  ]},
  { id: "plural", name: "Множественное число", modes: [
    { id: "pl_pick", icon: "👥", label: "Образуй мн.ч.", desc: "Выбери правильную форму", type: "pickFrom", data: () => DATA_PLURAL },
  ]},
  { id: "possess", name: "Притежательные", modes: [
    { id: "poss_pick", icon: "🏠", label: "Чей? Чья?", desc: "Выбери притежательную форму", type: "pickFrom", data: () => DATA_POSSESS },
  ]},
  { id: "neg", name: "Отрицание", modes: [
    { id: "neg_tf", icon: "🚫", label: "Отрицание", desc: "Выбери правильное отрицание", type: "negation", data: () => DATA_NEGATION },
  ]},
  { id: "ques", name: "Порядок слов в вопросах", modes: [
    { id: "q_build", icon: "🧩", label: "Собери вопрос", desc: "Расставь слова по порядку", type: "build", data: () => DATA_BUILD },
    { id: "q_li", icon: "📍", label: "Вставь «ли»", desc: "Найди место для «ли»", type: "li", data: () => DATA_LI },
  ]},
];
const ALL_MODES = CATEGORIES.flatMap(c => c.modes);
const MODE_LABELS: Record<string, string> = {};
ALL_MODES.forEach(m => MODE_LABELS[m.id] = `${m.icon} ${m.label}`);

// === UI COMPONENTS ===
function Reaction({ text }: { text: string }) {
  return <div className="h-9 flex items-center justify-center">
    {text ? <div className="text-2xl font-bold animate-bounce">{text}</div> : null}
  </div>;
}

function Progress({ cur, total, score }: { cur: number; total: number; score: number }) {
  return <>
    <div className="flex justify-between w-full max-w-sm text-sm text-gray-500">
      <span>{cur + 1}/{total}</span><span>Очки: {score}</span>
    </div>
    <div className="w-full max-w-sm bg-gray-800 rounded-full h-2">
      <div className="h-2 rounded-full bg-violet-500 transition-all" style={{ width: `${(cur / total) * 100}%` }} />
    </div>
  </>;
}

function Correction({ show, text }: { show: boolean; text: string }) {
  return <div className="h-6 flex items-center justify-center">
    {show ? <span className="text-emerald-400 text-sm">✓ {text}</span> : null}
  </div>;
}

// === AnswerBtn ===
function AnswerBtn({ val, sel, correctVal, onClick, className = "", children }: {
  val: string; sel: string | null; correctVal: string; onClick: () => void; className?: string; children?: React.ReactNode;
}) {
  let cls = "bg-gray-800 text-white border border-gray-600 hover:bg-gray-700 cursor-pointer";
  if (sel !== null) {
    if (val === correctVal)        cls = "bg-emerald-500 text-white border-emerald-400";
    else if (val === sel)          cls = "bg-red-500 text-white border-red-400";
    else                           cls = "bg-gray-800 text-gray-500 border-gray-700";
  }
  return <button onClick={onClick}
    className={`rounded-xl font-bold transition-all shadow-md ${cls} ${sel !== null ? "cursor-default" : ""} ${className}`}>
    {children ?? val}
  </button>;
}

// === useTimer ===
function useTimer(onExpire: () => void, seconds = 8) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => { if (ref.current) clearInterval(ref.current); }, []);

  const reset = useCallback(() => {
    if (ref.current) clearInterval(ref.current);
    setTimeLeft(seconds);
    ref.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { if (ref.current) clearInterval(ref.current); onExpire(); return 0; }
        return t - 1;
      });
    }, 1000);
  }, [seconds, onExpire]);

  useEffect(() => () => { if (ref.current) clearInterval(ref.current); }, []);

  return { timeLeft, stop, reset };
}

// === useGame ===
function useGame(qs: DataItem[], onComplete: (score: number, time: number, errors: number) => void, pts = 10, delay = 1000) {
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const [corr, setCorr] = useState<string | null>(null);
  const [reaction, setReaction] = useState("");
  const [score, setScore] = useState(0);
  const [t0] = useState(Date.now());
  const sRef = useRef(0), eRef = useRef(0);

  const advance = useCallback(() => {
    if (cur + 1 < qs.length) {
      setCur(c => c + 1); setSel(null); setCorr(null); setReaction("");
    } else {
      onComplete(sRef.current, Date.now() - t0, eRef.current);
    }
  }, [cur, qs.length, onComplete, t0]);

  const answer = useCallback((val: string, correctVal: string, extraPts = 0) => {
    if (sel !== null) return false;
    setSel(val);
    const ok = val === correctVal;
    if (ok) {
      const ns = score + pts + extraPts;
      setScore(ns); sRef.current = ns; setReaction(pick(OK));
    } else {
      setCorr(correctVal); eRef.current++; setReaction(pick(FAIL));
    }
    setTimeout(advance, delay);
    return ok;
  }, [sel, score, pts, delay, advance]);

  return { cur, sel, corr, reaction, score, advance, answer };
}

// === GAME ENGINES ===
function PickEngine({ data, onComplete }: { data: () => DataItem[]; onComplete: (s: number, t: number, e: number) => void }) {
  const items = data();
  const [qs] = useState(() => sh(items) as DataItem[]);
  const [options, setOptions] = useState<DataItem[]>([]);
  const { cur, sel, corr, reaction, score, answer } = useGame(qs, onComplete, 10, 1800);

  useEffect(() => { setOptions(sh(items) as DataItem[]); }, [cur]);

  const item = qs[cur];
  const shownAnswer = corr || item.answer;
  const shownHint = items.find(x => x.answer === shownAnswer)?.hint || item.hint;

  return <div className="flex flex-col items-center gap-4">
    <Progress cur={cur} total={qs.length} score={score} />
    <Reaction text={reaction} />
    <div className="text-center">
      <div className="text-4xl font-bold text-violet-400 mb-2">{item.q}</div>
      <div className="text-gray-500 text-sm">({item.hint})</div>
    </div>
    {sel !== null && <div className="text-center py-2">
      <div className="text-3xl font-bold text-white">{shownAnswer}</div>
      <div className="text-lg text-gray-400 mt-1">{shownHint}</div>
    </div>}
    <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
      {options.map((o, j) =>
        <AnswerBtn key={o.answer + j} val={o.answer} sel={sel} correctVal={shownAnswer}
          onClick={() => answer(o.answer, item.answer)} className="px-3 py-3 text-lg" />
      )}
    </div>
  </div>;
}

function TimedEngine({ data, onComplete }: { data: () => DataItem[]; onComplete: (s: number, t: number, e: number) => void }) {
  const items = data();
  const [qs] = useState(() => sh(items).map((item: DataItem) => {
    const wrong = items.filter(x => x.answer !== item.answer).sort(() => Math.random() - .5).slice(0, 3);
    return { ...item, options: sh([item, ...wrong]) };
  }));
  const { cur, sel, corr, reaction, score, advance, answer } = useGame(qs, onComplete, 10, 1200);

  const { timeLeft, stop, reset } = useTimer(useCallback(() => {
    advance();
  }, [advance]));

  useEffect(() => { reset(); }, [cur]);

  const go = (o: DataItem) => {
    stop();
    const bonus = Math.max(0, timeLeft * 2);
    answer(o.answer, qs[cur].answer, bonus);
  };

  const item = qs[cur];
  return <div className="flex flex-col items-center gap-4">
    <Progress cur={cur} total={qs.length} score={score} />
    <Reaction text={reaction} />
    <div className={`text-2xl font-mono font-bold ${timeLeft <= 3 ? "text-red-400" : "text-gray-400"}`}>⏱ {timeLeft}с</div>
    <div className="text-center">
      <div className="text-4xl font-bold text-white mb-2">{item.q} ___</div>
      <div className="text-gray-500 text-sm">({item.hint})</div>
    </div>
    <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
      {item.options.map((o: DataItem, j: number) =>
        <AnswerBtn key={o.answer + j} val={o.answer} sel={sel} correctVal={corr || item.answer}
          onClick={() => go(o)} className="px-4 py-4 text-xl" />
      )}
    </div>
  </div>;
}

function PickOptEngine({ data, onComplete }: { data: () => { items: DataItem[]; opts: string[] }; onComplete: (s: number, t: number, e: number) => void }) {
  const { items, opts: options } = data();
  const [qs] = useState(() => sh(items).slice(0, 10) as DataItem[]);
  const { cur, sel, reaction, score, answer } = useGame(qs, onComplete, 10, 1000);

  const item = qs[cur];
  return <div className="flex flex-col items-center gap-4">
    <Progress cur={cur} total={qs.length} score={score} />
    <Reaction text={reaction} />
    <div className="text-center">
      <div className="text-4xl font-bold text-violet-400 mb-1">{item.q}</div>
      {item.label && <div className="text-gray-500 text-xs mb-1">{item.label}</div>}
      <div className="text-gray-500 text-sm">({item.hint})</div>
    </div>
    <Correction show={sel !== null && sel !== item.answer} text={`${item.answer} → ${item.hint}`} />
    <div className="flex flex-wrap gap-3 justify-center w-full max-w-sm">
      {options.map(o =>
        <AnswerBtn key={o} val={o} sel={sel} correctVal={item.answer}
          onClick={() => answer(o, item.answer)} className="px-5 py-3 text-lg" />
      )}
    </div>
  </div>;
}

function PickFromEngine({ data, onComplete }: { data: () => DataItem[]; onComplete: (s: number, t: number, e: number) => void }) {
  const items = data();
  const [qs] = useState(() => sh(items).slice(0, 10) as DataItem[]);
  const [options, setOptions] = useState<DataItem[]>([]);
  const { cur, sel, reaction, score, answer } = useGame(qs, onComplete, 10, 1000);

  useEffect(() => {
    const item = qs[cur];
    const wrongAnswers = item.decoys
      ? sh(item.decoys).slice(0, 3).map((a: string) => ({ ...item, answer: a }))
      : sh(items.filter(x => x.answer !== item.answer)).slice(0, 3);
    setOptions(sh([item, ...wrongAnswers]) as DataItem[]);
  }, [cur]);

  const item = qs[cur];
  return <div className="flex flex-col items-center gap-4">
    <Progress cur={cur} total={qs.length} score={score} />
    <Reaction text={reaction} />
    <div className="text-center">
      <div className="text-3xl font-bold text-violet-400 mb-1">{item.q}</div>
      {item.label && <div className="text-gray-500 text-xs mb-1">{item.label}</div>}
      <div className="text-gray-500 text-sm">({item.hint})</div>
    </div>
    <Correction show={sel !== null && sel !== item.answer} text={item.answer} />
    <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
      {options.map((o, j) =>
        <AnswerBtn key={o.answer + j} val={o.answer} sel={sel} correctVal={item.answer}
          onClick={() => answer(o.answer, item.answer)} className="px-4 py-3 text-lg" />
      )}
    </div>
  </div>;
}

function makeNegDecoys(corr: string): string[] {
  const words = corr.split(" ");
  const decoys = new Set<string>();
  let attempts = 0;
  while (decoys.size < 2 && attempts < 40) {
    attempts++;
    const shuffled = sh([...words]).join(" ");
    if (shuffled !== corr) decoys.add(shuffled);
  }
  return [...decoys].slice(0, 2);
}

function NegEngine({ data, onComplete }: { data: () => DataItem[]; onComplete: (s: number, t: number, e: number) => void }) {
  const items = data();
  const [qs] = useState(() => sh(items).slice(0, 8) as DataItem[]);
  const [options, setOptions] = useState<DataItem[]>([]);
  const { cur, sel, reaction, score, answer } = useGame(qs, onComplete, 15, 1200);

  useEffect(() => {
    const decoys = makeNegDecoys(qs[cur].answer).map(a => ({ ...qs[cur], answer: a }));
    setOptions(sh([qs[cur], ...decoys]) as DataItem[]);
  }, [cur]);

  const item = qs[cur];
  return <div className="flex flex-col items-center gap-4">
    <Progress cur={cur} total={qs.length} score={score} />
    <Reaction text={reaction} />
    <div className="text-center">
      <div className="text-sm text-gray-500 mb-1">Сделай отрицание:</div>
      <div className="text-2xl font-bold text-white mb-1">{item.q}</div>
      <div className="text-gray-500 text-sm">({item.hint})</div>
    </div>
    <Correction show={sel !== null && sel !== item.answer} text={item.answer} />
    <div className="flex flex-col gap-3 w-full max-w-sm">
      {options.map((o, j) =>
        <AnswerBtn key={o.answer + j} val={o.answer} sel={sel} correctVal={item.answer}
          onClick={() => answer(o.answer, item.answer)} className="px-4 py-3 text-base text-left" />
      )}
    </div>
  </div>;
}

function BuildEngine({ data, onComplete }: { data: () => BuildItem[]; onComplete: (s: number, t: number, e: number) => void }) {
  const items = data();
  const [qs] = useState(() => sh(items).slice(0, 8) as BuildItem[]);
  const [cur, setCur] = useState(0);
  const [placed, setPlaced] = useState<string[]>([]);
  const [pool, setPool] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [reaction, setReaction] = useState("");
  const [score, setScore] = useState(0);
  const [t0] = useState(Date.now());
  const sRef = useRef(0), eRef = useRef(0);

  useEffect(() => {
    setPool(sh(qs[cur].words.filter(w => w !== "?")));
    setPlaced([]); setDone(false); setReaction("");
  }, [cur]);

  const target = qs[cur].words.filter(w => w !== "?");

  const addWord = (word: string, index: number) => {
    if (done) return;
    const np = [...placed, word];
    setPlaced(np);
    setPool(pool.filter((_, j) => j !== index));
    if (np.length === target.length) {
      const ok = np.every((w, j) => w === target[j]);
      setDone(true);
      if (ok) { const ns = score + 15; setScore(ns); sRef.current = ns; setReaction(pick(OK)); }
      else { eRef.current++; setReaction(pick(FAIL)); }
      setTimeout(() => {
        if (cur + 1 < qs.length) setCur(c => c + 1);
        else onComplete(sRef.current, Date.now() - t0, eRef.current);
      }, 1200);
    }
  };

  const removeWord = (word: string, index: number) => {
    if (done) return;
    setPool([...pool, word]);
    setPlaced(placed.filter((_, j) => j !== index));
  };

  return <div className="flex flex-col items-center gap-4">
    <Progress cur={cur} total={qs.length} score={score} />
    <Reaction text={reaction} />
    <div className="text-gray-500 text-sm">{qs[cur].translation}</div>
    <div className="flex flex-wrap gap-2 min-h-[56px] p-3 bg-gray-800 rounded-xl border-2 border-dashed border-gray-600 w-full max-w-sm justify-center items-center">
      {placed.length === 0 && <span className="text-gray-600 text-sm">Нажми на слова ниже...</span>}
      {placed.map((word, i) =>
        <button key={word + i} onClick={() => removeWord(word, i)}
          className={`px-3 py-2 rounded-lg font-bold text-lg transition-all cursor-pointer shadow-md ${done ? (i < target.length && word === target[i] ? "bg-emerald-500 text-white" : "bg-red-500 text-white") : "bg-violet-500 text-white hover:bg-violet-600"}`}>
          {word}
        </button>
      )}
      {placed.length > 0 && <span className="text-gray-500 font-bold text-xl">?</span>}
    </div>
    <Correction show={done && placed.join(" ") + " ?" !== qs[cur].words.join(" ")} text={qs[cur].words.join(" ")} />
    <div className="flex flex-wrap gap-2 justify-center w-full max-w-sm min-h-[56px] items-start">
      {pool.map((word, i) =>
        <button key={word + i} onClick={() => addWord(word, i)}
          className="px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-xl font-bold text-lg hover:bg-gray-700 cursor-pointer shadow-md transition-all">
          {word}
        </button>
      )}
    </div>
  </div>;
}

function LiEngine({ data, onComplete }: { data: () => LiItem[]; onComplete: (s: number, t: number, e: number) => void }) {
  const items = data();
  const [qs] = useState(() => sh(items).slice(0, 8) as LiItem[]);
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const [reaction, setReaction] = useState("");
  const [score, setScore] = useState(0);
  const [t0] = useState(Date.now());
  const sRef = useRef(0), eRef = useRef(0);

  const go = (position: number) => {
    if (sel !== null) return;
    setSel(position);
    const ok = position === qs[cur].liPosition;
    if (ok) { const ns = score + 15; setScore(ns); sRef.current = ns; setReaction(pick(OK)); }
    else { eRef.current++; setReaction(pick(FAIL)); }
    setTimeout(() => {
      if (cur + 1 < qs.length) { setCur(c => c + 1); setSel(null); setReaction(""); }
      else onComplete(sRef.current, Date.now() - t0, eRef.current);
    }, 1500);
  };

  const q = qs[cur];
  return <div className="flex flex-col items-center gap-4">
    <Progress cur={cur} total={qs.length} score={score} />
    <Reaction text={reaction} />
    <div className="text-gray-500 text-sm">{q.translation}</div>
    <div className="text-sm text-gray-400">Нажми на место для <span className="text-amber-400 font-bold">ли</span></div>
    <div className="flex flex-wrap items-center gap-1 justify-center w-full max-w-md">
      {q.words.map((word, i) =>
        <div key={i} className="flex items-center gap-1">
          <span className="px-3 py-2 bg-gray-800 rounded-lg text-white font-bold text-lg border border-gray-700">{word}</span>
          <button onClick={() => go(i)} className={`w-10 h-10 rounded-lg font-bold text-sm transition-all flex items-center justify-center border-2 border-dashed
            ${sel === null ? "border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white cursor-pointer" : ""}
            ${sel === i && i === q.liPosition ? "bg-emerald-500 text-white border-emerald-400" : ""}
            ${sel === i && i !== q.liPosition ? "bg-red-500 text-white border-red-400" : ""}
            ${sel !== null && sel !== i && i === q.liPosition ? "bg-emerald-500 text-white border-emerald-400 animate-pulse" : ""}
            ${sel !== null && sel !== i && i !== q.liPosition ? "border-gray-700 text-gray-600" : ""}`}>
            ли
          </button>
        </div>
      )}
      <span className="text-gray-500 font-bold text-xl ml-1">?</span>
    </div>
    <Correction show={sel !== null} text={q.result} />
  </div>;
}

const ENGINES: Record<string, React.ComponentType<any>> = {
  pick: PickEngine,
  timed: TimedEngine,
  pickOpt: PickOptEngine,
  pickFrom: PickFromEngine,
  negation: NegEngine,
  build: BuildEngine,
  li: LiEngine,
};

// === RESULTS & ANALYTICS ===
function Results({ score, time, errors, onRestart, onMenu }: {
  score: number; time: number; errors: number; onRestart: () => void; onMenu: () => void;
}) {
  const seconds = Math.floor(time / 1000);
  const emoji = score >= 80 ? "🏆" : score >= 40 ? "👍" : "💪";
  const accuracy = Math.max(0, Math.round((1 - errors / (errors + 8)) * 100));
  return <div className="flex flex-col items-center gap-5 text-center">
    <div className="text-6xl">{emoji}</div>
    <div className="text-3xl font-bold text-white">Готово!</div>
    <div className="text-5xl font-bold text-violet-400">{score}</div>
    <div className="flex gap-6 text-gray-400 text-sm">
      <span>⏱ {seconds}с</span><span>❌ {errors}</span><span>🎯 {accuracy}%</span>
    </div>
    <div className="flex gap-3 mt-3">
      <button onClick={onRestart} className="px-6 py-3 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-xl shadow-lg">Ещё раз</button>
      <button onClick={onMenu} className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl shadow-lg">Меню</button>
    </div>
  </div>;
}

function Analytics({ history, onBack, onClear }: {
  history: HistoryEntry[]; onBack: () => void; onClear: () => void;
}) {
  if (!history.length) return <div className="flex flex-col items-center gap-6">
    <div className="text-gray-400 text-lg">Пока нет данных!</div>
    <button onClick={onBack} className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl shadow-lg">← Меню</button>
  </div>;

  const total = history.length;
  const average = Math.round(history.reduce((s, h) => s + h.score, 0) / total);
  const totalErrors = history.reduce((s, h) => s + (h.errors || 0), 0);
  const bestScore = Math.max(...history.map(h => h.score));
  const byMode: Record<string, { count: number; total: number }> = {};
  history.forEach(h => {
    if (!byMode[h.mode]) byMode[h.mode] = { count: 0, total: 0 };
    byMode[h.mode].count++; byMode[h.mode].total += h.score;
  });
  const modeData = Object.entries(byMode).map(([key, v], i) => ({
    name: MODE_LABELS[key] || key, games: v.count,
    avg: Math.round(v.total / v.count), value: v.count, fill: CHART_COLORS[i % CHART_COLORS.length],
  }));
  const last20 = history.slice(-20).map((h, i) => ({ n: i + 1, score: h.score, errors: h.errors || 0 }));

  return <div className="flex flex-col gap-5">
    <div className="flex justify-between items-center">
      <button onClick={onBack} className="text-gray-500 hover:text-white text-sm">← Меню</button>
      <span className="text-lg font-bold text-white">📊 Аналитика</span>
      <button onClick={onClear} className="text-red-400 hover:text-red-300 text-xs">Сбросить</button>
    </div>
    <div className="grid grid-cols-3 gap-2">
      {([["🎮",total],["⭐",bestScore],["📈",average],["❌",totalErrors],["🎯",Math.max(0,Math.round((1-totalErrors/(totalErrors+total*8))*100))+"%"],["🏅",Object.keys(byMode).length]] as [string, string|number][]).map(([l,v],i)=>
        <div key={i} className="bg-gray-800 rounded-xl p-2 text-center border border-gray-700">
          <div className="text-xs text-gray-500">{l}</div><div className="text-lg font-bold text-white">{v}</div>
        </div>
      )}
    </div>
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
      <div className="text-sm text-gray-400 mb-2">Последние 20</div>
      <ResponsiveContainer width="100%" height={130}>
        <LineChart data={last20}>
          <XAxis dataKey="n" tick={{ fill: "#6b7280", fontSize: 10 }} />
          <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} />
          <Tooltip contentStyle={{ background: "#1f2937", border: "1px solid #374151", borderRadius: 8 }} />
          <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 2 }} name="Очки" />
          <Line type="monotone" dataKey="errors" stroke="#f43f5e" strokeWidth={2} dot={{ r: 2 }} name="Ошибки" />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
      <div className="text-sm text-gray-400 mb-2">По режимам</div>
      <div className="flex gap-3 items-center">
        <ResponsiveContainer width="35%" height={100}>
          <PieChart><Pie data={modeData} dataKey="value" cx="50%" cy="50%" outerRadius={40} innerRadius={18}>
            {modeData.map((_, i) => <Cell key={i} fill={modeData[i].fill} />)}
          </Pie></PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-0.5 text-xs flex-1">
          {modeData.map((m, i) =>
            <div key={m.name} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
              <span className="text-gray-300 truncate">{m.name}</span><span className="text-gray-500">×{m.games}</span>
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
      <div className="text-sm text-gray-400 mb-2">История</div>
      <div className="max-h-36 overflow-y-auto space-y-0.5">
        {history.slice(-15).reverse().map((h, i) =>
          <div key={i} className="flex justify-between text-xs py-0.5 border-b border-gray-700">
            <span className="text-gray-400">{new Date(h.ts).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</span>
            <span className="text-gray-300 truncate max-w-[120px]">{MODE_LABELS[h.mode] || h.mode}</span>
            <span className="text-white font-bold">{h.score}</span>
          </div>
        )}
      </div>
    </div>
  </div>;
}

// === APP ===
export default function App() {
  const [screen, setScreen] = useState("menu");
  const [modeId, setModeId] = useState<string | null>(null);
  const [result, setResult] = useState<{ score: number; time: number; errors: number } | null>(null);
  const [gameKey, setGameKey] = useState(0);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRef, setShowRef] = useState(false);

  useEffect(() => { setHistory(loadHistory()); setLoading(false); }, []);

  const handleComplete = useCallback((score: number, time: number, errors = 0) => {
    const entry: HistoryEntry = { mode: modeId!, score, time, errors, ts: Date.now() };
    const nh = [...history, entry];
    setHistory(nh); saveHistory(nh);
    setResult({ score, time, errors }); setScreen("results");
  }, [modeId, history]);

  const startGame = (id: string) => { setModeId(id); setScreen("game"); setGameKey(k => k + 1); setShowRef(false); };

  if (loading) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Загрузка...</div>;

  const currentMode = ALL_MODES.find(m => m.id === modeId);
  const Engine = currentMode ? ENGINES[currentMode.type] : null;
  const isVerb = modeId?.startsWith("sym") || modeId?.startsWith("imam") || modeId?.startsWith("iskam");

  return <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-12 p-4">
    <div className="w-full max-w-lg">
      {screen === "menu" && <div className="flex flex-col items-center gap-4">
        <div className="text-5xl mb-1">🇧🇬</div>
        <h1 className="text-3xl font-bold text-center mb-2">Тренажёр Болгарского A0</h1>
        <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
          {ALL_MODES.map(m =>
            <button key={m.id} onClick={() => startGame(m.id)}
              className="aspect-square flex flex-col items-center justify-center gap-1 bg-gray-800 hover:bg-gray-700 text-white rounded-2xl shadow-md transition-all border border-gray-700 p-2">
              <div className="text-3xl">{m.icon}</div>
              <div className="text-xs font-bold text-center leading-tight">{m.label}</div>
            </button>
          )}
        </div>
        <button onClick={() => setScreen("analytics")}
          className="w-full max-w-sm mt-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-2xl shadow-md transition-all border border-gray-600 flex items-center justify-center gap-2">
          <span className="text-xl">📊</span> Аналитика {history.length > 0 && <span className="text-gray-400 text-sm">({history.length})</span>}
        </button>
      </div>}

      {screen === "game" && <div>
        <div className="flex justify-between items-center mb-5">
          <button onClick={() => setScreen("menu")} className="text-gray-500 hover:text-white text-sm">← Меню</button>
          <span className="text-gray-400 text-sm font-medium">{currentMode?.label}</span>
          {isVerb
            ? <button onClick={() => setShowRef(s => !s)} className="text-gray-500 hover:text-white text-sm">{showRef ? "Скрыть 📖" : "📖"}</button>
            : <div className="w-8" />}
        </div>
        {showRef && currentMode && (() => {
          const verbData = currentMode.data() as DataItem[];
          return <div className="w-full max-w-md mx-auto mb-4">
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
              <div className="grid grid-cols-3 gap-0 text-sm">
                {verbData.map((form, i) =>
                  <div key={form.q} className={`px-3 py-2 text-center ${i < verbData.length - 1 ? "border-b border-gray-700" : ""} ${i % 3 !== 2 ? "border-r border-gray-700" : ""}`}>
                    <span className="text-violet-400 font-bold">{form.q}</span>{" "}
                    <span className="text-white font-semibold">{form.answer}</span>
                  </div>
                )}
              </div>
            </div>
          </div>;
        })()}
        {Engine && <Engine key={gameKey} data={currentMode!.data} onComplete={handleComplete} />}
      </div>}

      {screen === "results" && result && <Results
        score={result.score} time={result.time} errors={result.errors}
        onRestart={() => { setGameKey(k => k + 1); setScreen("game"); }}
        onMenu={() => setScreen("menu")} />}

      {screen === "analytics" && <Analytics
        history={history} onBack={() => setScreen("menu")}
        onClear={() => { clearHistory(); setHistory([]); }} />}
    </div>
  </div>;
}
