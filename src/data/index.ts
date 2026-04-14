import type { DataItem, BuildItem, LiItem, Category } from "../types";

const SYM_RULE = "«съм» — неправильный глагол-связка. Парадигма: съм/си/е · сме/сте/са.";
export const DATA_SYM: DataItem[] = [
  { q: "Аз", answer: "съм", hint: "я есть", rule: SYM_RULE },
  { q: "Ти", answer: "си", hint: "ты есть", rule: SYM_RULE },
  { q: "Той/Тя/То", answer: "е", hint: "он/она есть", rule: SYM_RULE },
  { q: "Ние", answer: "сме", hint: "мы есть", rule: SYM_RULE },
  { q: "Вие", answer: "сте", hint: "вы есть", rule: SYM_RULE },
  { q: "Те", answer: "са", hint: "они есть", rule: SYM_RULE },
];

const IMAM_RULE = "A-спряжение: -ам/-аш/-а · -аме/-ате/-ат.";
export const DATA_IMAM: DataItem[] = [
  { q: "Аз", answer: "имам", hint: "я имею", rule: IMAM_RULE },
  { q: "Ти", answer: "имаш", hint: "ты имеешь", rule: IMAM_RULE },
  { q: "Той/Тя/То", answer: "има", hint: "он имеет", rule: IMAM_RULE },
  { q: "Ние", answer: "имаме", hint: "мы имеем", rule: IMAM_RULE },
  { q: "Вие", answer: "имате", hint: "вы имеете", rule: IMAM_RULE },
  { q: "Те", answer: "имат", hint: "они имеют", rule: IMAM_RULE },
];

const ISKAM_RULE = "A-спряжение (как «имам»): -ам/-аш/-а · -аме/-ате/-ат.";
export const DATA_ISKAM: DataItem[] = [
  { q: "Аз", answer: "искам", hint: "я хочу", rule: ISKAM_RULE },
  { q: "Ти", answer: "искаш", hint: "ты хочешь", rule: ISKAM_RULE },
  { q: "Той/Тя/То", answer: "иска", hint: "он хочет", rule: ISKAM_RULE },
  { q: "Ние", answer: "искаме", hint: "мы хотим", rule: ISKAM_RULE },
  { q: "Вие", answer: "искате", hint: "вы хотите", rule: ISKAM_RULE },
  { q: "Те", answer: "искат", hint: "они хотят", rule: ISKAM_RULE },
];

const ART_M_RULE = "м.р. ед.ч.: определённый артикль -ът (полный) / -а (краткий).";
const ART_F_RULE = "ж.р. ед.ч.: определённый артикль -та.";
const ART_N_RULE = "ср.р. ед.ч.: определённый артикль -то.";
const ART_PL_I_RULE = "мн.ч. на -и/-е: артикль -те.";
const ART_PL_A_RULE = "мн.ч. на -а (ср.р. и несколько исключений): артикль -та.";
export const DATA_ARTICLE: DataItem[] = [
  { q: "мъж", label: "мужской род", answer: "-ът", hint: "мужчина", rule: ART_M_RULE },
  { q: "стол", label: "мужской род", answer: "-ът", hint: "стул", rule: ART_M_RULE },
  { q: "град", label: "мужской род", answer: "-ът", hint: "город", rule: ART_M_RULE },
  { q: "нос", label: "мужской род", answer: "-ът", hint: "нос", rule: ART_M_RULE },
  { q: "зъб", label: "мужской род", answer: "-ът", hint: "зуб", rule: ART_M_RULE },
  { q: "хляб", label: "мужской род", answer: "-ът", hint: "хлеб", rule: ART_M_RULE },
  { q: "вятър", label: "мужской род", answer: "-ът", hint: "ветер", rule: ART_M_RULE },
  { q: "жена", label: "женский род", answer: "-та", hint: "женщина", rule: ART_F_RULE },
  { q: "книга", label: "женский род", answer: "-та", hint: "книга", rule: ART_F_RULE },
  { q: "улица", label: "женский род", answer: "-та", hint: "улица", rule: ART_F_RULE },
  { q: "майка", label: "женский род", answer: "-та", hint: "мама", rule: ART_F_RULE },
  { q: "вода", label: "женский род", answer: "-та", hint: "вода", rule: ART_F_RULE },
  { q: "нощ", label: "женский род", answer: "-та", hint: "ночь", rule: ART_F_RULE },
  { q: "дете", label: "средний род", answer: "-то", hint: "ребёнок", rule: ART_N_RULE },
  { q: "море", label: "средний род", answer: "-то", hint: "море", rule: ART_N_RULE },
  { q: "село", label: "средний род", answer: "-то", hint: "село", rule: ART_N_RULE },
  { q: "яйце", label: "средний род", answer: "-то", hint: "яйцо", rule: ART_N_RULE },
  { q: "небе", label: "средний род", answer: "-то", hint: "небо", rule: ART_N_RULE },
  { q: "дърво", label: "средний род", answer: "-то", hint: "дерево", rule: ART_N_RULE },
  { q: "деца", label: "множественное число", answer: "-та", hint: "дети", rule: ART_PL_A_RULE },
  { q: "книги", label: "множественное число", answer: "-те", hint: "книги", rule: ART_PL_I_RULE },
  { q: "мъже", label: "множественное число", answer: "-те", hint: "мужчины", rule: ART_PL_I_RULE },
  { q: "градове", label: "множественное число", answer: "-те", hint: "города", rule: ART_PL_I_RULE },
  { q: "жени", label: "множественное число", answer: "-те", hint: "женщины", rule: ART_PL_I_RULE },
];
export const ARTICLE_OPTIONS = ["-ът", "-та", "-то", "-те", "-а"];

export const DATA_GENDER: DataItem[] = [
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
export const GENDER_OPTIONS = ["мужской", "женский", "средний"];

// DECOYS: real Bulgarian plurals of other nouns — no fabricated forms.
const PL_RULE_FI = "ж.р. на -а → мн.ч. -и.";
const PL_RULE_MI = "м.р. односложный/многосложный → мн.ч. -и (часто).";
const PL_RULE_M_OVE = "м.р. односложный → мн.ч. -ове.";
const PL_RULE_M_E = "м.р. односложный на шипящий/конец слова → мн.ч. -е (мъже).";
const PL_RULE_IRREG = "нерегулярная форма — запомнить.";
const PL_RULE_N_ETA = "ср.р. на -е/-о → мн.ч. -ета.";
export const DATA_PLURAL: DataItem[] = [
  { q: "книга", answer: "книги", hint: "книга", decoys: ["жени", "думи", "майки"], rule: PL_RULE_FI },
  { q: "жена", answer: "жени", hint: "женщина", decoys: ["книги", "маси", "думи"], rule: PL_RULE_FI },
  { q: "маса", answer: "маси", hint: "стол", decoys: ["книги", "жени", "гори"], rule: PL_RULE_FI },
  { q: "мъж", answer: "мъже", hint: "мужчина", decoys: ["братя", "носове", "зъби"], rule: PL_RULE_M_E },
  { q: "стол", answer: "столове", hint: "стул", decoys: ["маси", "градове", "носове"], rule: PL_RULE_M_OVE },
  { q: "град", answer: "градове", hint: "город", decoys: ["столове", "носове", "зъби"], rule: PL_RULE_M_OVE },
  { q: "дете", answer: "деца", hint: "ребёнок", decoys: ["кучета", "дървета", "очи"], rule: PL_RULE_IRREG },
  { q: "око", answer: "очи", hint: "глаз", decoys: ["уши", "ръце", "дни"], rule: PL_RULE_IRREG },
  { q: "ухо", answer: "уши", hint: "ухо", decoys: ["очи", "ръце", "нощи"], rule: PL_RULE_IRREG },
  { q: "ден", answer: "дни", hint: "день", decoys: ["нощи", "думи", "книги"], rule: PL_RULE_MI },
  { q: "нощ", answer: "нощи", hint: "ночь", decoys: ["дни", "думи", "жени"], rule: PL_RULE_FI },
  { q: "ръка", answer: "ръце", hint: "рука", decoys: ["очи", "уши", "нощи"], rule: PL_RULE_IRREG },
  { q: "нос", answer: "носове", hint: "нос", decoys: ["зъби", "столове", "градове"], rule: PL_RULE_M_OVE },
  { q: "зъб", answer: "зъби", hint: "зуб", decoys: ["носове", "столове", "мъже"], rule: PL_RULE_MI },
  { q: "брат", answer: "братя", hint: "брат", decoys: ["мъже", "зъби", "носове"], rule: PL_RULE_IRREG },
  { q: "гора", answer: "гори", hint: "лес", decoys: ["книги", "думи", "маси"], rule: PL_RULE_FI },
  { q: "дума", answer: "думи", hint: "слово", decoys: ["книги", "жени", "гори"], rule: PL_RULE_FI },
  { q: "майка", answer: "майки", hint: "мама", decoys: ["жени", "книги", "думи"], rule: PL_RULE_FI },
  { q: "куче", answer: "кучета", hint: "собака", decoys: ["деца", "дървета", "очи"], rule: PL_RULE_N_ETA },
  { q: "дърво", answer: "дървета", hint: "дерево", decoys: ["кучета", "деца", "очи"], rule: PL_RULE_N_ETA },
];

export const DATA_PRONOUN_SHORT: DataItem[] = [
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

export const DATA_POSSESS: DataItem[] = [
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

export const DATA_NEGATION: DataItem[] = [
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

export const DATA_BUILD: BuildItem[] = [
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

export const DATA_KAZVAM: DataItem[] = [
  { q: "Аз (се)", answer: "казвам", hint: "я зовусь" },
  { q: "Ти (се)", answer: "казваш", hint: "ты зовёшься" },
  { q: "Той/Тя/То (се)", answer: "казва", hint: "он зовётся" },
  { q: "Ние (се)", answer: "казваме", hint: "мы зовёмся" },
  { q: "Вие (се)", answer: "казвате", hint: "вы зовётесь" },
  { q: "Те (се)", answer: "казват", hint: "они зовутся" },
];

export const DATA_GOVORYA: DataItem[] = [
  { q: "Аз", answer: "говоря", hint: "я говорю" },
  { q: "Ти", answer: "говориш", hint: "ты говоришь" },
  { q: "Той/Тя/То", answer: "говори", hint: "он говорит" },
  { q: "Ние", answer: "говорим", hint: "мы говорим" },
  { q: "Вие", answer: "говорите", hint: "вы говорите" },
  { q: "Те", answer: "говорят", hint: "они говорят" },
];

export const DATA_COUNTRY_LANG: DataItem[] = [
  { q: "България", answer: "български", hint: "язык Болгарии", decoys: ["руски", "сръбски", "гръцки"] },
  { q: "Русия", answer: "руски", hint: "язык России", decoys: ["български", "полски", "украински"] },
  { q: "Англия", answer: "английски", hint: "язык Англии", decoys: ["немски", "френски", "испански"] },
  { q: "Германия", answer: "немски", hint: "язык Германии", decoys: ["английски", "нидерландски", "френски"] },
  { q: "Франция", answer: "френски", hint: "язык Франции", decoys: ["испански", "италиански", "немски"] },
  { q: "Испания", answer: "испански", hint: "язык Испании", decoys: ["португалски", "италиански", "френски"] },
  { q: "Италия", answer: "италиански", hint: "язык Италии", decoys: ["испански", "френски", "румънски"] },
  { q: "Гърция", answer: "гръцки", hint: "язык Греции", decoys: ["турски", "български", "италиански"] },
  { q: "Турция", answer: "турски", hint: "язык Турции", decoys: ["гръцки", "арабски", "персийски"] },
  { q: "Китай", answer: "китайски", hint: "язык Китая", decoys: ["японски", "корейски", "виетнамски"] },
  { q: "Япония", answer: "японски", hint: "язык Японии", decoys: ["китайски", "корейски", "английски"] },
  { q: "Полша", answer: "полски", hint: "язык Польши", decoys: ["чешки", "словашки", "руски"] },
  { q: "Чехия", answer: "чешки", hint: "язык Чехии", decoys: ["словашки", "полски", "немски"] },
  { q: "Сърбия", answer: "сръбски", hint: "язык Сербии", decoys: ["хърватски", "словенски", "български"] },
  { q: "Унгария", answer: "унгарски", hint: "язык Венгрии", decoys: ["румънски", "словашки", "сръбски"] },
  { q: "Америка", answer: "английски", hint: "язык США", decoys: ["испански", "френски", "немски"] },
];

// DECOYS: real nationality forms for other countries — no fabricated words.
export const DATA_NATIONALITY: DataItem[] = [
  { q: "България (м.)", answer: "българин", hint: "мужчина из Болгарии", decoys: ["българка", "англичанин", "руснак"] },
  { q: "България (ж.)", answer: "българка", hint: "женщина из Болгарии", decoys: ["българин", "англичанка", "рускиня"] },
  { q: "Русия (м.)", answer: "руснак", hint: "мужчина из России", decoys: ["рускиня", "българин", "японец"] },
  { q: "Русия (ж.)", answer: "рускиня", hint: "женщина из России", decoys: ["руснак", "българка", "японка"] },
  { q: "Англия (м.)", answer: "англичанин", hint: "мужчина из Англии", decoys: ["англичанка", "българин", "германец"] },
  { q: "Англия (ж.)", answer: "англичанка", hint: "женщина из Англии", decoys: ["англичанин", "българка", "германка"] },
  { q: "Германия (м.)", answer: "германец", hint: "мужчина из Германии", decoys: ["германка", "испанец", "италианец"] },
  { q: "Германия (ж.)", answer: "германка", hint: "женщина из Германии", decoys: ["германец", "испанка", "италианка"] },
  { q: "Испания (м.)", answer: "испанец", hint: "мужчина из Испании", decoys: ["испанка", "италианец", "германец"] },
  { q: "Испания (ж.)", answer: "испанка", hint: "женщина из Испании", decoys: ["испанец", "италианка", "германка"] },
  { q: "Италия (м.)", answer: "италианец", hint: "мужчина из Италии", decoys: ["италианка", "испанец", "германец"] },
  { q: "Италия (ж.)", answer: "италианка", hint: "женщина из Италии", decoys: ["италианец", "испанка", "германка"] },
  { q: "Гърция (м.)", answer: "грък", hint: "мужчина из Греции", decoys: ["гъркиня", "българин", "руснак"] },
  { q: "Гърция (ж.)", answer: "гъркиня", hint: "женщина из Греции", decoys: ["грък", "българка", "рускиня"] },
  { q: "Япония (м.)", answer: "японец", hint: "мужчина из Японии", decoys: ["японка", "испанец", "италианец"] },
  { q: "Япония (ж.)", answer: "японка", hint: "женщина из Японии", decoys: ["японец", "испанка", "италианка"] },
];

// DECOYS: real feminine profession forms from other items; "фотограф" is invariant (m=f).
export const DATA_PROFESSION: DataItem[] = [
  { q: "студент", answer: "студентка", hint: "студент → ж.р.", decoys: ["преподавателка", "журналистка", "писателка"] },
  { q: "преподавател", answer: "преподавателка", hint: "преподаватель → ж.р.", decoys: ["студентка", "журналистка", "писателка"] },
  { q: "журналист", answer: "журналистка", hint: "журналист → ж.р.", decoys: ["студентка", "преподавателка", "писателка"] },
  { q: "фотограф", answer: "фотограф", hint: "фотограф → ж.р. (совпадает)", decoys: ["журналистка", "студентка", "актриса"] },
  { q: "писател", answer: "писателка", hint: "писатель → ж.р.", decoys: ["студентка", "журналистка", "преподавателка"] },
  { q: "актьор", answer: "актриса", hint: "актёр → ж.р.", decoys: ["студентка", "преподавателка", "журналистка"] },
];

export const DATA_GREETING: DataItem[] = [
  { q: "07:00 — встреча утром", answer: "Добро утро", hint: "доброе утро" },
  { q: "09:00 — пришёл в офис", answer: "Добро утро", hint: "доброе утро" },
  { q: "13:00 — встреча днём", answer: "Добър ден", hint: "добрый день" },
  { q: "15:00 — дневной визит", answer: "Добър ден", hint: "добрый день" },
  { q: "19:00 — встреча вечером", answer: "Добър вечер", hint: "добрый вечер" },
  { q: "21:00 — поздний вечер", answer: "Добър вечер", hint: "добрый вечер" },
  { q: "23:00 — перед сном", answer: "Лека нощ", hint: "спокойной ночи" },
  { q: "00:30 — ночью прощание", answer: "Лека нощ", hint: "спокойной ночи" },
];
export const GREETING_OPTIONS = ["Добро утро", "Добър ден", "Добър вечер", "Лека нощ"];

export const DATA_NALI: DataItem[] = [
  { q: "Ти си от България, нали? (да)", answer: "Да.", hint: "подтвердить" },
  { q: "Ти си студент, нали? (нет, не студент)", answer: "Не.", hint: "отрицать" },
  { q: "Говориш български, нали? (да)", answer: "Да.", hint: "подтвердить" },
  { q: "Тя е преподавателка, нали? (нет)", answer: "Не.", hint: "отрицать" },
  { q: "Имаш време, нали? (да)", answer: "Да.", hint: "подтвердить" },
  { q: "Те са от Русия, нали? (нет)", answer: "Не.", hint: "отрицать" },
  { q: "Вие сте журналист, нали? (да)", answer: "Да.", hint: "подтвердить" },
  { q: "Той е фотограф, нали? (нет)", answer: "Не.", hint: "отрицать" },
];
export const NALI_OPTIONS = ["Да.", "Не."];

export const DATA_LI: LiItem[] = [
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

export const CATEGORIES: Category[] = [
  { id: "sym", name: "Глагол «съм»", modes: [
    { id: "sym_pick", icon: "🎯", label: "Подбери форму", desc: "Выбери форму для местоимения", type: "pick", data: () => DATA_SYM },
    { id: "sym_fill", icon: "⚡", label: "На скорость", desc: "Выбери форму с таймером", type: "timed", data: () => DATA_SYM },
    { id: "sym_type", icon: "⌨️", label: "Впиши форму", desc: "Введи форму «съм» с клавиатуры", type: "type", data: () => DATA_SYM },
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
  { id: "l1_extra", name: "Урок 1 · дополнительно", modes: [
    { id: "kazvam_pick", icon: "🪪", label: "Казвам се", desc: "Спряжение «казвам се»", type: "pick", data: () => DATA_KAZVAM },
    { id: "govorya_pick", icon: "🗣️", label: "Говоря", desc: "Спряжение «говоря»", type: "pick", data: () => DATA_GOVORYA },
    { id: "country_lang_pick", icon: "🌍", label: "Страна → язык", desc: "Язык страны", type: "pickFrom", data: () => DATA_COUNTRY_LANG },
    { id: "nationality_pick", icon: "🧑‍🤝‍🧑", label: "Национальность", desc: "Страна + пол → национальность", type: "pickFrom", data: () => DATA_NATIONALITY },
    { id: "profession_pick", icon: "💼", label: "Профессия ж.р.", desc: "Мужская → женская форма", type: "pickFrom", data: () => DATA_PROFESSION },
    { id: "greeting_pick", icon: "👋", label: "Приветствия", desc: "Выбери приветствие по времени", type: "pickOpt", data: () => ({ items: DATA_GREETING, opts: GREETING_OPTIONS }) },
    { id: "nali_pick", icon: "❓", label: "Ответ на «нали»", desc: "Да / Не на вопрос с «нали»", type: "pickOpt", data: () => ({ items: DATA_NALI, opts: NALI_OPTIONS }) },
  ]},
];

export const ALL_MODES = CATEGORIES.flatMap(c => c.modes);

export const MODE_LABELS: Record<string, string> = {
  ...Object.fromEntries(ALL_MODES.map(m => [m.id, `${m.icon} ${m.label}`])),
  "round:l1": "🎲 Раунд · Урок 1",
};
