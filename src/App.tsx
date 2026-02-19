import { useState, useEffect, useCallback, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const sh = (arr: any[]) => [...arr].sort(() => Math.random() - 0.5);
const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
const OK = ["Браво!", "Точно!", "Супер!", "Молодец!", "Вярно!", "Отлично!"];
const FAIL = ["Не-а!", "Не съвсем!", "Почти!", "Упс!", "Мимо!"];
const CHART_COLORS = ["#8b5cf6","#0ea5e9","#10b981","#f59e0b","#f43f5e","#6366f1","#ec4899","#14b8a6","#a855f7","#fb923c"];
const STORAGE_KEY = "bg-trainer-v3";
const ACCENT = "#E60023";

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
  { q: "нос", label: "мужской род", answer: "-ът", hint: "нос" },
  { q: "зъб", label: "мужской род", answer: "-ът", hint: "зуб" },
  { q: "хляб", label: "мужской род", answer: "-ът", hint: "хлеб" },
  { q: "вятър", label: "мужской род", answer: "-ът", hint: "ветер" },
  { q: "жена", label: "женский род", answer: "-та", hint: "женщина" },
  { q: "книга", label: "женский род", answer: "-та", hint: "книга" },
  { q: "улица", label: "женский род", answer: "-та", hint: "улица" },
  { q: "майка", label: "женский род", answer: "-та", hint: "мама" },
  { q: "вода", label: "женский род", answer: "-та", hint: "вода" },
  { q: "нощ", label: "женский род", answer: "-та", hint: "ночь" },
  { q: "дете", label: "средний род", answer: "-то", hint: "ребёнок" },
  { q: "море", label: "средний род", answer: "-то", hint: "море" },
  { q: "село", label: "средний род", answer: "-то", hint: "село" },
  { q: "яйце", label: "средний род", answer: "-то", hint: "яйцо" },
  { q: "небе", label: "средний род", answer: "-то", hint: "небо" },
  { q: "дърво", label: "средний род", answer: "-то", hint: "дерево" },
  { q: "деца", label: "множественное число", answer: "-та", hint: "дети" },
  { q: "книги", label: "множественное число", answer: "-те", hint: "книги" },
  { q: "мъже", label: "множественное число", answer: "-те", hint: "мужчины" },
  { q: "градове", label: "множественное число", answer: "-те", hint: "города" },
  { q: "жени", label: "множественное число", answer: "-те", hint: "женщины" },
];
const ARTICLE_OPTIONS = ["-ът", "-та", "-то", "-те", "-а"];
const DATA_GENDER = [
  { q: "мъж", answer: "мужской", hint: "мужчина" },
  { q: "стол", answer: "мужской", hint: "стул" },
  { q: "град", answer: "мужской", hint: "город" },
  { q: "ден", answer: "мужской", hint: "день" },
  { q: "нос", answer: "мужской", hint: "нос" },
  { q: "зъб", answer: "мужской", hint: "зуб" },
  { q: "хляб", answer: "мужской", hint: "хлеб" },
  { q: "вятър", answer: "мужской", hint: "ветер" },
  { q: "жена", answer: "женский", hint: "женщина" },
  { q: "книга", answer: "женский", hint: "книга" },
  { q: "нощ", answer: "женский", hint: "ночь" },
  { q: "улица", answer: "женский", hint: "улица" },
  { q: "майка", answer: "женский", hint: "мама" },
  { q: "вода", answer: "женский", hint: "вода" },
  { q: "врата", answer: "женский", hint: "дверь" },
  { q: "дете", answer: "средний", hint: "ребёнок" },
  { q: "море", answer: "средний", hint: "море" },
  { q: "село", answer: "средний", hint: "село" },
  { q: "сърце", answer: "средний", hint: "сердце" },
  { q: "яйце", answer: "средний", hint: "яйцо" },
  { q: "небе", answer: "средний", hint: "небо" },
  { q: "дърво", answer: "средний", hint: "дерево" },
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
  { q: "нос", answer: "носове", hint: "нос", decoys: ["носи", "носе", "носа"] },
  { q: "зъб", answer: "зъби", hint: "зуб", decoys: ["зъбове", "зъбе", "зъба"] },
  { q: "брат", answer: "братя", hint: "брат", decoys: ["братове", "брати", "брате"] },
  { q: "гора", answer: "гори", hint: "лес", decoys: ["горове", "горе", "горите"] },
  { q: "дума", answer: "думи", hint: "слово", decoys: ["думове", "думе", "думата"] },
  { q: "майка", answer: "майки", hint: "мама", decoys: ["майкове", "майке", "майката"] },
  { q: "куче", answer: "кучета", hint: "собака", decoys: ["кучи", "кучове", "куче"] },
  { q: "дърво", answer: "дървета", hint: "дерево", decoys: ["дърви", "дървове", "дървото"] },
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
  { q: "то", label: "винительный падеж", answer: "го", hint: "его (ср.р.)" },
  { q: "то", label: "дательный падеж", answer: "му", hint: "ему (ср.р.)" },
  { q: "ние", label: "винительный падеж", answer: "ни", hint: "нас" },
  { q: "ние", label: "дательный падеж", answer: "ни", hint: "нам" },
  { q: "вие", label: "винительный падеж", answer: "ви", hint: "вас" },
  { q: "вие", label: "дательный падеж", answer: "ви", hint: "вам" },
  { q: "те", label: "винительный падеж", answer: "ги", hint: "их" },
  { q: "те", label: "дательный падеж", answer: "им", hint: "им" },
];
const DATA_POSSESS = [
  { q: "мой", label: "мужской род, полная форма", answer: "моят / мой", hint: "мой (полн.)" },
  { q: "моя", label: "женский род, полная форма", answer: "моята / моя", hint: "моя (полн.)" },
  { q: "мой", label: "краткая форма", answer: "ми", hint: "мой (кратк.)" },
  { q: "твой", label: "мужской род, полная форма", answer: "твоят / твой", hint: "твой (полн.)" },
  { q: "твоя", label: "женский род, полная форма", answer: "твоята / твоя", hint: "твоя (полн.)" },
  { q: "твой", label: "краткая форма", answer: "ти", hint: "твой (кратк.)" },
  { q: "негов", label: "мужской род, полная форма", answer: "неговият", hint: "его (полн.)" },
  { q: "негов", label: "краткая форма", answer: "му", hint: "его (кратк.)" },
  { q: "неин", label: "женский род, полная форма", answer: "нейният", hint: "её (полн.)" },
  { q: "неин", label: "краткая форма", answer: "ѝ", hint: "её (кратк.)" },
  { q: "наш", label: "мужской род, полная форма", answer: "нашият / наш", hint: "наш (полн.)" },
  { q: "наш", label: "краткая форма", answer: "ни", hint: "наш (кратк.)" },
  { q: "ваш", label: "мужской род, полная форма", answer: "вашият / ваш", hint: "ваш (полн.)" },
  { q: "ваш", label: "краткая форма", answer: "ви", hint: "ваш (кратк.)" },
  { q: "техен", label: "краткая форма", answer: "им", hint: "их (кратк.)" },
];
const DATA_NEGATION = [
  { q: "аз съм студент", answer: "аз не съм студент", hint: "я студент" },
  { q: "тя има куче", answer: "тя няма куче", hint: "у неё есть собака" },
  { q: "те идват", answer: "те не идват", hint: "они приходят" },
  { q: "аз винаги пия кафе", answer: "аз никога не пия кафе", hint: "я всегда пью кофе" },
  { q: "искам нещо", answer: "не искам нищо", hint: "хочу что-нибудь" },
  { q: "някой е тук", answer: "никой не е тук", hint: "кто-то здесь" },
  { q: "ти знаеш", answer: "ти не знаеш", hint: "ты знаешь" },
  { q: "има време", answer: "няма време", hint: "есть время" },
  { q: "аз знам", answer: "аз не знам", hint: "я знаю" },
  { q: "тя чете", answer: "тя не чете", hint: "она читает" },
  { q: "той обича музика", answer: "той не обича музика", hint: "он любит музыку" },
  { q: "имам пари", answer: "нямам пари", hint: "у меня есть деньги" },
  { q: "ние чакаме", answer: "ние не чакаме", hint: "мы ждём" },
  { q: "той дойде", answer: "той не дойде", hint: "он пришёл" },
];
const DATA_BUILD = [
  { words: ["какво", "правиш", "?"], translation: "Что делаешь?" },
  { words: ["къде", "живееш", "?"], translation: "Где живёшь?" },
  { words: ["кога", "идваш", "?"], translation: "Когда придёшь?" },
  { words: ["как", "се", "казваш", "?"], translation: "Как тебя зовут?" },
  { words: ["колко", "струва", "?"], translation: "Сколько стоит?" },
  { words: ["защо", "плачеш", "?"], translation: "Почему плачешь?" },
  { words: ["откъде", "си", "?"], translation: "Откуда ты?" },
  { words: ["какво", "искаш", "да", "ядеш", "?"], translation: "Что хочешь есть?" },
  { words: ["къде", "е", "гарата", "?"], translation: "Где вокзал?" },
  { words: ["кога", "тръгва", "влакът", "?"], translation: "Когда отправляется поезд?" },
  { words: ["как", "се", "чувстваш", "?"], translation: "Как себя чувствуешь?" },
  { words: ["кой", "е", "той", "?"], translation: "Кто он?" },
  { words: ["какво", "има", "там", "?"], translation: "Что там есть?" },
  { words: ["колко", "струва", "кафето", "?"], translation: "Сколько стоит кофе?" },
  { words: ["кога", "спиш", "?"], translation: "Когда ты спишь?" },
  { words: ["как", "се", "казва", "тя", "?"], translation: "Как её зовут?" },
  { words: ["защо", "не", "идваш", "?"], translation: "Почему не приходишь?" },
  { words: ["откъде", "е", "тя", "?"], translation: "Откуда она?" },
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
  { words: ["Четеш", "книги"], liPosition: 0, result: "Четеш ли книги?", translation: "Читаешь книги?" },
  { words: ["Живееш", "тук"], liPosition: 0, result: "Живееш ли тук?", translation: "Живёшь здесь?" },
  { words: ["Харесваш", "ме"], liPosition: 0, result: "Харесваш ли ме?", translation: "Нравлюсь тебе?" },
  { words: ["Учиш", "български"], liPosition: 0, result: "Учиш ли български?", translation: "Учишь болгарский?" },
  { words: ["Пиеш", "кафе"], liPosition: 0, result: "Пиеш ли кафе?", translation: "Пьёшь кофе?" },
  { words: ["Работиш", "тук"], liPosition: 0, result: "Работиш ли тук?", translation: "Работаешь здесь?" },
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
    { id: "sym_pick", icon: "🎯", label: "Подбери форму", desc: "Выбери форму для местоимения", type: "pick", data: () => DATA_SYM },
    { id: "sym_fill", icon: "⚡", label: "На скорость", desc: "Выбери форму с таймером", type: "timed", data: () => DATA_SYM },
  ]},
  { id: "imam", name: "Имам / искам", modes: [
    { id: "imam_pick", icon: "🤲", label: "Имам", desc: "Спряжение «имам»", type: "pick", data: () => DATA_IMAM },
    { id: "iskam_pick", icon: "🌟", label: "Искам", desc: "Спряжение «искам»", type: "pick", data: () => DATA_ISKAM },
  ]},
  { id: "article", name: "Артикли", modes: [
    { id: "art_pick", icon: "🏷️", label: "Добавь артикль", desc: "Выбери правильный суффикс", type: "pickOpt", data: () => ({ items: DATA_ARTICLE, opts: ARTICLE_OPTIONS }) },
  ]},
  { id: "gender", name: "Род существительных", modes: [
    { id: "gen_pick", icon: "🔍", label: "Определи род", desc: "м.р., ж.р. или ср.р.?", type: "pickOpt", data: () => ({ items: DATA_GENDER, opts: GENDER_OPTIONS }) },
  ]},
  { id: "plural", name: "Множественное число", modes: [
    { id: "pl_pick", icon: "📚", label: "Образуй мн.ч.", desc: "Выбери правильную форму", type: "pickFrom", data: () => DATA_PLURAL },
  ]},
  { id: "possess", name: "Притежательные", modes: [
    { id: "poss_pick", icon: "🔑", label: "Чей? Чья?", desc: "Выбери притежательную форму", type: "pickFrom", data: () => DATA_POSSESS },
  ]},
  { id: "neg", name: "Отрицание", modes: [
    { id: "neg_tf", icon: "❌", label: "Отрицание", desc: "Выбери правильное отрицание", type: "negation", data: () => DATA_NEGATION },
  ]},
  { id: "ques", name: "Порядок слов в вопросах", modes: [
    { id: "q_build", icon: "🧩", label: "Собери вопрос", desc: "Расставь слова по порядку", type: "build", data: () => DATA_BUILD },
    { id: "q_li", icon: "💬", label: "Вставь «ли»", desc: "Найди место для «ли»", type: "li", data: () => DATA_LI },
  ]},
];
const ALL_MODES = CATEGORIES.flatMap(c => c.modes);
const MODE_LABELS: Record<string, string> = {};
ALL_MODES.forEach(m => MODE_LABELS[m.id] = `${m.icon} ${m.label}`);

// === UI COMPONENTS ===

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-900 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
}

function NavHeader({ title, onBack, right }: { title: string; onBack: () => void; right?: React.ReactNode }) {
  return (
    <div className="bg-white/95 border-b border-[#f0f0f0] sticky top-0 z-50 h-14 flex items-center justify-between px-4 shrink-0">
      <BackButton onClick={onBack} />
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
      <div className="w-10 flex items-center justify-end">{right}</div>
    </div>
  );
}

function Reaction({ text }: { text: string }) {
  return (
    <div className="h-9 flex items-center justify-center">
      {text ? <div className="text-xl font-black text-gray-900 animate-bounce">{text}</div> : null}
    </div>
  );
}

function Progress({ cur, total, score, accent = false }: { cur: number; total: number; score: number; accent?: boolean }) {
  return (
    <>
      <div className="flex justify-between w-full text-xs font-bold text-gray-400 mb-3">
        <span>{cur + 1}/{total}</span>
        <span>{score} pts</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-10">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${(cur / total) * 100}%`, backgroundColor: accent ? ACCENT : '#111111' }}
        />
      </div>
    </>
  );
}

function Correction({ show, text }: { show: boolean; text: string }) {
  return (
    <div className="h-6 flex items-center justify-center">
      {show ? <span className="text-emerald-600 text-sm font-semibold">✓ {text}</span> : null}
    </div>
  );
}

function AnswerBtn({ val, sel, correctVal, onClick, className = "", children }: {
  val: string; sel: string | null; correctVal: string; onClick: () => void; className?: string; children?: React.ReactNode;
}) {
  let cls = "bg-white border-2 border-[#E9E9E9] text-[#111111] hover:border-[#111111] cursor-pointer active:bg-[#111111] active:text-white active:border-[#111111]";
  if (sel !== null) {
    if (val === correctVal)     cls = "bg-emerald-500 text-white border-emerald-500 cursor-default";
    else if (val === sel)       cls = `bg-[${ACCENT}] text-white border-[${ACCENT}] cursor-default`;
    else                         cls = "bg-white text-gray-300 border-[#E9E9E9] cursor-default";
  }
  return (
    <button
      onClick={sel === null ? onClick : undefined}
      className={`rounded-[20px] font-semibold transition-all ${cls} ${className}`}
    >
      {children ?? val}
    </button>
  );
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

function PickEngine({ data, onComplete, accent = false }: {
  data: () => DataItem[]; onComplete: (s: number, t: number, e: number) => void; accent?: boolean;
}) {
  const items = data();
  const [qs] = useState(() => sh(items) as DataItem[]);
  const [options, setOptions] = useState<DataItem[]>([]);
  const { cur, sel, corr, reaction, score, answer } = useGame(qs, onComplete, 10, 1800);

  useEffect(() => { setOptions(sh(items) as DataItem[]); }, [cur]);

  const item = qs[cur];
  const shownAnswer = corr || item.answer;
  const shownHint = items.find(x => x.answer === shownAnswer)?.hint || item.hint;

  return (
    <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto no-scrollbar">
      <Progress cur={cur} total={qs.length} score={score} accent={accent} />
      <div className="flex-1 flex flex-col items-center justify-center mb-8">
        <h1 className="text-7xl font-black text-gray-900 mb-2 tracking-tighter">{item.q}</h1>
        <p className="text-lg font-semibold text-gray-400">({item.hint})</p>
        {sel !== null && (
          <div className="text-center mt-6">
            <div className="text-3xl font-black text-gray-900">{shownAnswer}</div>
            <div className="text-base text-gray-400 mt-1">{shownHint}</div>
          </div>
        )}
      </div>
      <Reaction text={reaction} />
      <div className="w-full grid grid-cols-3 gap-3 mb-4">
        {options.map((o, j) =>
          <AnswerBtn key={o.answer + j} val={o.answer} sel={sel} correctVal={shownAnswer}
            onClick={() => answer(o.answer, item.answer)} className="h-16 text-lg" />
        )}
      </div>
    </div>
  );
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
  return (
    <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto no-scrollbar">
      <Progress cur={cur} total={qs.length} score={score} />
      <div className="flex-1 flex flex-col items-center justify-center mb-6">
        <div className={`text-2xl font-mono font-black mb-6 ${timeLeft <= 3 ? "text-red-500" : "text-gray-400"}`}>
          ⏱ {timeLeft}с
        </div>
        <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tight">{item.q} ___</h1>
        <p className="text-base font-medium text-gray-400">({item.hint})</p>
      </div>
      <Reaction text={reaction} />
      <div className="w-full grid grid-cols-2 gap-3 mb-4">
        {item.options.map((o: DataItem, j: number) =>
          <AnswerBtn key={o.answer + j} val={o.answer} sel={sel} correctVal={corr || item.answer}
            onClick={() => go(o)} className="h-16 text-xl" />
        )}
      </div>
    </div>
  );
}

function PickOptEngine({ data, onComplete }: { data: () => { items: DataItem[]; opts: string[] }; onComplete: (s: number, t: number, e: number) => void }) {
  const { items, opts: options } = data();
  const [qs] = useState(() => sh(items).slice(0, 15) as DataItem[]);
  const { cur, sel, reaction, score, answer } = useGame(qs, onComplete, 10, 1000);

  const item = qs[cur];
  return (
    <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto no-scrollbar">
      <Progress cur={cur} total={qs.length} score={score} />
      <div className="flex-1 flex flex-col items-center justify-center mb-6">
        <h1 className="text-6xl font-black text-gray-900 mb-2 tracking-tighter">{item.q}</h1>
        {item.label && <div className="text-sm font-semibold text-gray-400 mb-1">{item.label}</div>}
        <p className="text-base font-medium text-gray-400">({item.hint})</p>
        <Correction show={sel !== null && sel !== item.answer} text={`${item.answer} → ${item.hint}`} />
      </div>
      <Reaction text={reaction} />
      <div className="flex flex-wrap gap-3 justify-center w-full mb-4">
        {options.map(o =>
          <AnswerBtn key={o} val={o} sel={sel} correctVal={item.answer}
            onClick={() => answer(o, item.answer)} className="px-6 py-4 text-lg" />
        )}
      </div>
    </div>
  );
}

function PickFromEngine({ data, onComplete }: { data: () => DataItem[]; onComplete: (s: number, t: number, e: number) => void }) {
  const items = data();
  const [qs] = useState(() => sh(items).slice(0, 15) as DataItem[]);
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
  return (
    <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto no-scrollbar">
      <Progress cur={cur} total={qs.length} score={score} />
      <div className="flex-1 flex flex-col items-center justify-center mb-6">
        <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tighter">{item.q}</h1>
        {item.label && <div className="text-sm font-semibold text-gray-400 mb-1">{item.label}</div>}
        <p className="text-base font-medium text-gray-400">({item.hint})</p>
        <Correction show={sel !== null && sel !== item.answer} text={item.answer} />
      </div>
      <Reaction text={reaction} />
      <div className="w-full grid grid-cols-2 gap-3 mb-4">
        {options.map((o, j) =>
          <AnswerBtn key={o.answer + j} val={o.answer} sel={sel} correctVal={item.answer}
            onClick={() => answer(o.answer, item.answer)} className="py-4 text-lg" />
        )}
      </div>
    </div>
  );
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
  const [qs] = useState(() => sh(items).slice(0, 12) as DataItem[]);
  const [options, setOptions] = useState<DataItem[]>([]);
  const { cur, sel, reaction, score, answer } = useGame(qs, onComplete, 15, 1200);

  useEffect(() => {
    const decoys = makeNegDecoys(qs[cur].answer).map(a => ({ ...qs[cur], answer: a }));
    setOptions(sh([qs[cur], ...decoys]) as DataItem[]);
  }, [cur]);

  const item = qs[cur];
  return (
    <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto no-scrollbar">
      <Progress cur={cur} total={qs.length} score={score} accent />
      <div className="flex-1 flex flex-col items-center justify-center mb-6 text-center">
        <p className="text-xs font-bold mb-3 uppercase tracking-widest" style={{ color: ACCENT }}>Задача</p>
        <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">{item.q}</h1>
        <p className="text-base font-medium text-gray-500">({item.hint})</p>
      </div>
      <Reaction text={reaction} />
      <div className="w-full flex flex-col gap-3 mb-4">
        {options.map((o, j) => {
          let btnCls = "bg-white border-2 border-[#E9E9E9] text-[#111111] hover:border-[#111111] cursor-pointer";
          let circleStyle = "border-gray-200";
          if (sel !== null) {
            if (o.answer === item.answer) { btnCls = "bg-emerald-500 text-white border-emerald-500 cursor-default"; circleStyle = "border-white bg-white/30"; }
            else if (o.answer === sel)    { btnCls = `text-white border-[${ACCENT}] cursor-default`; circleStyle = "border-white bg-white/30"; }
            else                           { btnCls = "bg-white text-gray-300 border-[#E9E9E9] cursor-default"; circleStyle = "border-gray-100"; }
          }
          return (
            <button
              key={o.answer + j}
              onClick={sel === null ? () => answer(o.answer, item.answer) : undefined}
              style={sel !== null && o.answer === sel && o.answer !== item.answer ? { backgroundColor: ACCENT } : undefined}
              className={`w-full p-5 text-left text-base font-semibold flex items-center gap-3 rounded-[20px] transition-all ${btnCls}`}
            >
              <span className="flex-1">{o.answer}</span>
              <div className={`w-5 h-5 rounded-full border-2 shrink-0 transition-all ${circleStyle}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BuildEngine({ data, onComplete }: { data: () => BuildItem[]; onComplete: (s: number, t: number, e: number) => void }) {
  const items = data();
  const [qs] = useState(() => sh(items).slice(0, 12) as BuildItem[]);
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

  return (
    <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto no-scrollbar">
      <div className="flex justify-between w-full text-xs font-bold text-gray-400 mb-3">
        <span>{cur + 1}/{qs.length}</span><span>{score} pts</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-8">
        <div className="h-full rounded-full transition-all duration-300 bg-[#111111]" style={{ width: `${(cur / qs.length) * 100}%` }} />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center w-full mb-4">
        <p className="text-sm font-semibold text-gray-400 mb-4">{qs[cur].translation}</p>
        <div className="flex flex-wrap gap-2 min-h-[60px] p-4 bg-gray-50 rounded-[20px] border-2 border-dashed border-gray-200 w-full justify-center items-center mb-3">
          {placed.length === 0 && <span className="text-gray-400 text-sm font-medium">Нажми на слова ниже...</span>}
          {placed.map((word, i) =>
            <button key={word + i} onClick={() => removeWord(word, i)}
              className={`px-3 py-2 rounded-[14px] font-bold text-base transition-all cursor-pointer shadow-sm ${done ? (i < target.length && word === target[i] ? "bg-emerald-500 text-white" : "bg-[#E60023] text-white") : "bg-[#111111] text-white hover:bg-gray-800"}`}>
              {word}
            </button>
          )}
          {placed.length > 0 && <span className="text-gray-400 font-bold text-xl">?</span>}
        </div>
        <Correction show={done && placed.join(" ") + " ?" !== qs[cur].words.join(" ")} text={qs[cur].words.join(" ")} />
      </div>
      <Reaction text={reaction} />
      <div className="flex flex-wrap gap-2 justify-center w-full min-h-[56px] items-start">
        {pool.map((word, i) =>
          <button key={word + i} onClick={() => addWord(word, i)}
            className="px-4 py-3 bg-white border-2 border-[#E9E9E9] text-[#111111] rounded-[14px] font-bold text-base hover:border-[#111111] cursor-pointer transition-all">
            {word}
          </button>
        )}
      </div>
    </div>
  );
}

function LiEngine({ data, onComplete }: { data: () => LiItem[]; onComplete: (s: number, t: number, e: number) => void }) {
  const items = data();
  const [qs] = useState(() => sh(items).slice(0, 12) as LiItem[]);
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
  return (
    <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto no-scrollbar">
      <div className="flex justify-between w-full text-xs font-bold text-gray-400 mb-3">
        <span>{cur + 1}/{qs.length}</span><span>{score} pts</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-10">
        <div className="h-full rounded-full transition-all duration-300 bg-[#111111]" style={{ width: `${(cur / qs.length) * 100}%` }} />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center w-full mb-6">
        <p className="text-sm font-semibold text-gray-400 mb-2">{q.translation}</p>
        <p className="text-sm font-medium text-gray-500 mb-6">
          Нажми на место для <span className="font-bold text-gray-900">ли</span>
        </p>
        <div className="flex flex-wrap items-center gap-2 justify-center w-full">
          {q.words.map((word, i) =>
            <div key={i} className="flex items-center gap-1">
              <span className="px-3 py-2 bg-[#F2F2F2] rounded-[14px] text-gray-900 font-bold text-lg">{word}</span>
              <button onClick={() => go(i)}
                className={`w-10 h-10 rounded-[14px] font-bold text-sm transition-all flex items-center justify-center border-2 border-dashed
                  ${sel === null ? "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white cursor-pointer" : ""}
                  ${sel === i && i === q.liPosition ? "bg-emerald-500 text-white border-emerald-500" : ""}
                  ${sel === i && i !== q.liPosition ? `bg-[${ACCENT}] text-white border-[${ACCENT}]` : ""}
                  ${sel !== null && sel !== i && i === q.liPosition ? "bg-emerald-500 text-white border-emerald-500 animate-pulse" : ""}
                  ${sel !== null && sel !== i && i !== q.liPosition ? "border-gray-200 text-gray-300" : ""}`}>
                ли
              </button>
            </div>
          )}
          <span className="text-gray-400 font-bold text-xl ml-1">?</span>
        </div>
        <div className="mt-4">
          <Correction show={sel !== null} text={q.result} />
        </div>
      </div>
      <Reaction text={reaction} />
    </div>
  );
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

// === RESULTS ===
function Results({ score, time, errors, onRestart, onMenu }: {
  score: number; time: number; errors: number; onRestart: () => void; onMenu: () => void;
}) {
  const seconds = Math.floor(time / 1000);
  const accuracy = Math.max(0, Math.round((1 - errors / (errors + 8)) * 100));
  const emoji = score >= 80 ? "🏆" : score >= 40 ? "👍" : "💪";
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 gap-6 text-center">
      <div className="text-7xl">{emoji}</div>
      <h1 className="text-3xl font-black text-gray-900 tracking-tight">Готово!</h1>
      <div className="text-6xl font-black" style={{ color: ACCENT }}>{score}</div>
      <div className="flex gap-6 text-gray-500 text-sm font-semibold">
        <span>⏱ {seconds}с</span>
        <span>❌ {errors}</span>
        <span>🎯 {accuracy}%</span>
      </div>
      <div className="flex gap-3 mt-2 w-full max-w-xs">
        <button
          onClick={onRestart}
          className="flex-1 py-4 rounded-full font-bold text-white text-base shadow-lg transition-all active:scale-[0.98]"
          style={{ backgroundColor: ACCENT }}
        >
          Ещё раз
        </button>
        <button
          onClick={onMenu}
          className="flex-1 py-4 rounded-full font-bold text-gray-900 bg-[#F2F2F2] text-base transition-all active:scale-[0.98] active:bg-[#E0E0E0]"
        >
          Меню
        </button>
      </div>
    </div>
  );
}

// === ANALYTICS ===
function Analytics({ history, onBack, onClear }: {
  history: HistoryEntry[]; onBack: () => void; onClear: () => void;
}) {
  if (!history.length) return (
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

  const statCards = [
    { icon: "🎮", value: total, label: "игр" },
    { icon: "⭐", value: bestScore, label: "лучший" },
    { icon: "📈", value: average, label: "средний" },
    { icon: "❌", value: totalErrors, label: "ошибок" },
    { icon: "🎯", value: Math.max(0, Math.round((1 - totalErrors / (totalErrors + total * 8)) * 100)) + "%", label: "точность" },
    { icon: "🏅", value: Object.keys(byMode).length, label: "режимов" },
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

  const startGame = (id: string) => {
    setModeId(id); setScreen("game"); setGameKey(k => k + 1); setShowRef(false);
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-gray-400 font-semibold">Загрузка...</div>
    </div>
  );

  const currentMode = ALL_MODES.find(m => m.id === modeId);
  const Engine = currentMode ? ENGINES[currentMode.type] : null;
  const isVerb = modeId?.startsWith("sym") || modeId?.startsWith("imam") || modeId?.startsWith("iskam");

  return (
    <div className="h-screen overflow-hidden bg-white flex flex-col items-center">
      <div className="relative w-full h-screen max-w-md mx-auto flex flex-col overflow-hidden bg-white">

        {/* === HOME/MENU === */}
        {screen === "menu" && (
          <div className="flex-1 flex flex-col px-4 pt-2 pb-6 overflow-y-auto no-scrollbar">
            {/* Header */}
            <div className="flex flex-col items-center justify-center mt-4 mb-8">
              <div className="w-8 h-6 rounded overflow-hidden relative mb-3 shadow-sm ring-1 ring-black/5">
                <div className="absolute top-0 w-full h-1/3 bg-white" />
                <div className="absolute top-1/3 w-full h-1/3 bg-[#00966E]" />
                <div className="absolute bottom-0 w-full h-1/3 bg-[#D62612]" />
              </div>
              <h1 className="text-3xl font-black text-center text-gray-900 tracking-tight leading-tight">
                Български
              </h1>
              <p className="text-sm font-semibold text-gray-400 mt-1">Ниво А0 • Тренажёр</p>
            </div>

            {/* Mode grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {ALL_MODES.map(m => (
                <button
                  key={m.id}
                  onClick={() => startGame(m.id)}
                  className="bg-[#F2F2F2] rounded-[28px] aspect-square flex flex-col items-center justify-center p-3 group transition-all active:scale-[0.96] active:bg-[#E0E0E0]"
                >
                  <div className="mb-2 p-3 rounded-full bg-white text-gray-900 shadow-sm group-hover:scale-110 transition-transform text-2xl leading-none flex items-center justify-center">
                    {m.icon}
                  </div>
                  <span className="text-[11px] font-bold text-center leading-tight text-gray-800">
                    {m.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Random exercise button */}
            <button
              onClick={() => startGame(ALL_MODES[Math.floor(Math.random() * ALL_MODES.length)].id)}
              className="w-full py-4 flex items-center justify-center gap-2 mt-auto mb-3 rounded-full font-bold text-white text-base transition-all active:scale-[0.98] active:opacity-90 bg-[#111111]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 3 21 3 21 8" />
                <line x1="4" y1="20" x2="21" y2="3" />
                <polyline points="21 16 21 21 16 21" />
                <line x1="15" y1="15" x2="21" y2="21" />
              </svg>
              <span>Случайное упражнение</span>
            </button>

            {/* Analytics button */}
            <button
              onClick={() => setScreen("analytics")}
              className="w-full py-4 flex items-center justify-center gap-2 mb-2 rounded-full font-bold text-white text-base shadow-lg transition-all active:scale-[0.98] active:opacity-90"
              style={{ backgroundColor: ACCENT }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
              <span>Аналитика</span>
              {history.length > 0 && <span className="text-white/70 text-sm font-semibold">({history.length})</span>}
            </button>
          </div>
        )}

        {/* === GAME === */}
        {screen === "game" && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <NavHeader
              title={currentMode?.label ?? ""}
              onBack={() => setScreen("menu")}
              right={isVerb ? (
                <button
                  onClick={() => setShowRef(s => !s)}
                  className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors"
                >
                  📖
                </button>
              ) : undefined}
            />

            {/* Verb conjugation reference table */}
            {showRef && currentMode && (() => {
              const verbData = currentMode.data() as DataItem[];
              return (
                <div className="mx-4 mt-3 bg-gray-50 rounded-[20px] border border-gray-100 overflow-hidden">
                  <div className="grid grid-cols-3">
                    {verbData.map((form, i) => (
                      <div key={form.q} className={`px-3 py-2 text-center text-sm ${i % 3 !== 2 ? "border-r border-gray-100" : ""} ${i < verbData.length - 3 ? "border-b border-gray-100" : ""}`}>
                        <span className="text-gray-400 font-semibold">{form.q} </span>
                        <span className="text-gray-900 font-black">{form.answer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {Engine && <Engine key={gameKey} data={currentMode!.data} onComplete={handleComplete} />}
          </div>
        )}

        {/* === RESULTS === */}
        {screen === "results" && result && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <NavHeader title="Результат" onBack={() => setScreen("menu")} />
            <Results
              score={result.score} time={result.time} errors={result.errors}
              onRestart={() => { setGameKey(k => k + 1); setScreen("game"); }}
              onMenu={() => setScreen("menu")}
            />
          </div>
        )}

        {/* === ANALYTICS === */}
        {screen === "analytics" && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <NavHeader
              title="Аналитика"
              onBack={() => setScreen("menu")}
              right={
                <button
                  onClick={() => { clearHistory(); setHistory([]); }}
                  className="text-xs font-bold text-gray-400 hover:text-[#E60023] transition-colors"
                >
                  Сброс
                </button>
              }
            />
            <Analytics
              history={history}
              onBack={() => setScreen("menu")}
              onClear={() => { clearHistory(); setHistory([]); }}
            />
          </div>
        )}

      </div>
    </div>
  );
}
