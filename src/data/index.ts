import type { DataItem, BuildItem, LiItem, Category } from "../types";
import type { Localized } from "../i18n/types";

const SYM_RULE: Localized<string> = {
  ru: "«съм» — неправильный глагол-связка. Парадигма: съм/си/е · сме/сте/са.",
  uk: "«съм» — неправильне дієслово-зв'язка. Парадигма: съм/си/е · сме/сте/са.",
};
export const DATA_SYM: DataItem[] = [
  { q: "Аз", answer: "съм", hint: { ru: "я есть", uk: "я є" }, rule: SYM_RULE },
  { q: "Ти", answer: "си", hint: { ru: "ты есть", uk: "ти є" }, rule: SYM_RULE },
  { q: "Той/Тя/То", answer: "е", hint: { ru: "он/она есть", uk: "він/вона є" }, rule: SYM_RULE },
  { q: "Ние", answer: "сме", hint: { ru: "мы есть", uk: "ми є" }, rule: SYM_RULE },
  { q: "Вие", answer: "сте", hint: { ru: "вы есть", uk: "ви є" }, rule: SYM_RULE },
  { q: "Те", answer: "са", hint: { ru: "они есть", uk: "вони є" }, rule: SYM_RULE },
];

const IMAM_RULE: Localized<string> = {
  ru: "A-спряжение: -ам/-аш/-а · -аме/-ате/-ат.",
  uk: "A-дієвідміна: -ам/-аш/-а · -аме/-ате/-ат.",
};
export const DATA_IMAM: DataItem[] = [
  { q: "Аз", answer: "имам", hint: { ru: "я имею", uk: "я маю" }, rule: IMAM_RULE },
  { q: "Ти", answer: "имаш", hint: { ru: "ты имеешь", uk: "ти маєш" }, rule: IMAM_RULE },
  { q: "Той/Тя/То", answer: "има", hint: { ru: "он имеет", uk: "він має" }, rule: IMAM_RULE },
  { q: "Ние", answer: "имаме", hint: { ru: "мы имеем", uk: "ми маємо" }, rule: IMAM_RULE },
  { q: "Вие", answer: "имате", hint: { ru: "вы имеете", uk: "ви маєте" }, rule: IMAM_RULE },
  { q: "Те", answer: "имат", hint: { ru: "они имеют", uk: "вони мають" }, rule: IMAM_RULE },
];

const NYAMAM_RULE: Localized<string> = {
  ru: "Отрицание «имам» → «нямам». Спряжение: нямам/нямаш/няма · нямаме/нямате/нямат.",
  uk: "Заперечення «имам» → «нямам». Відмінювання: нямам/нямаш/няма · нямаме/нямате/нямат.",
};
export const DATA_NYAMAM: DataItem[] = [
  { q: "Аз", answer: "нямам", hint: { ru: "я не имею", uk: "я не маю" }, rule: NYAMAM_RULE },
  { q: "Ти", answer: "нямаш", hint: { ru: "ты не имеешь", uk: "ти не маєш" }, rule: NYAMAM_RULE },
  { q: "Той/Тя/То", answer: "няма", hint: { ru: "он не имеет", uk: "він не має" }, rule: NYAMAM_RULE },
  { q: "Ние", answer: "нямаме", hint: { ru: "мы не имеем", uk: "ми не маємо" }, rule: NYAMAM_RULE },
  { q: "Вие", answer: "нямате", hint: { ru: "вы не имеете", uk: "ви не маєте" }, rule: NYAMAM_RULE },
  { q: "Те", answer: "нямат", hint: { ru: "они не имеют", uk: "вони не мають" }, rule: NYAMAM_RULE },
];

const ISKAM_RULE: Localized<string> = {
  ru: "A-спряжение (как «имам»): -ам/-аш/-а · -аме/-ате/-ат.",
  uk: "A-дієвідміна (як «имам»): -ам/-аш/-а · -аме/-ате/-ат.",
};
export const DATA_ISKAM: DataItem[] = [
  { q: "Аз", answer: "искам", hint: { ru: "я хочу", uk: "я хочу" }, rule: ISKAM_RULE },
  { q: "Ти", answer: "искаш", hint: { ru: "ты хочешь", uk: "ти хочеш" }, rule: ISKAM_RULE },
  { q: "Той/Тя/То", answer: "иска", hint: { ru: "он хочет", uk: "він хоче" }, rule: ISKAM_RULE },
  { q: "Ние", answer: "искаме", hint: { ru: "мы хотим", uk: "ми хочемо" }, rule: ISKAM_RULE },
  { q: "Вие", answer: "искате", hint: { ru: "вы хотите", uk: "ви хочете" }, rule: ISKAM_RULE },
  { q: "Те", answer: "искат", hint: { ru: "они хотят", uk: "вони хочуть" }, rule: ISKAM_RULE },
];

const ART_M_RULE: Localized<string> = {
  ru: "м.р. ед.ч.: определённый артикль -ът (полный) / -а (краткий).",
  uk: "ч.р. одн.: означений артикль -ът (повний) / -а (короткий).",
};
const ART_F_RULE: Localized<string> = {
  ru: "ж.р. ед.ч.: определённый артикль -та.",
  uk: "ж.р. одн.: означений артикль -та.",
};
const ART_N_RULE: Localized<string> = {
  ru: "ср.р. ед.ч.: определённый артикль -то.",
  uk: "с.р. одн.: означений артикль -то.",
};
const ART_PL_I_RULE: Localized<string> = {
  ru: "мн.ч. на -и/-е: артикль -те.",
  uk: "мн. на -и/-е: артикль -те.",
};
const ART_PL_A_RULE: Localized<string> = {
  ru: "мн.ч. на -а (ср.р. и несколько исключений): артикль -та.",
  uk: "мн. на -а (с.р. і кілька винятків): артикль -та.",
};
const LABEL_M: Localized<string> = { ru: "мужской род", uk: "чоловічий рід" };
const LABEL_F: Localized<string> = { ru: "женский род", uk: "жіночий рід" };
const LABEL_N: Localized<string> = { ru: "средний род", uk: "середній рід" };
const LABEL_PL: Localized<string> = { ru: "множественное число", uk: "множина" };

export const DATA_ARTICLE: DataItem[] = [
  { q: "мъж", label: LABEL_M, answer: "-ът", hint: { ru: "мужчина", uk: "чоловік" }, rule: ART_M_RULE },
  { q: "стол", label: LABEL_M, answer: "-ът", hint: { ru: "стул", uk: "стілець" }, rule: ART_M_RULE },
  { q: "град", label: LABEL_M, answer: "-ът", hint: { ru: "город", uk: "місто" }, rule: ART_M_RULE },
  { q: "нос", label: LABEL_M, answer: "-ът", hint: { ru: "нос", uk: "ніс" }, rule: ART_M_RULE },
  { q: "зъб", label: LABEL_M, answer: "-ът", hint: { ru: "зуб", uk: "зуб" }, rule: ART_M_RULE },
  { q: "хляб", label: LABEL_M, answer: "-ът", hint: { ru: "хлеб", uk: "хліб" }, rule: ART_M_RULE },
  { q: "вятър", label: LABEL_M, answer: "-ът", hint: { ru: "ветер", uk: "вітер" }, rule: ART_M_RULE },
  { q: "жена", label: LABEL_F, answer: "-та", hint: { ru: "женщина", uk: "жінка" }, rule: ART_F_RULE },
  { q: "книга", label: LABEL_F, answer: "-та", hint: { ru: "книга", uk: "книга" }, rule: ART_F_RULE },
  { q: "улица", label: LABEL_F, answer: "-та", hint: { ru: "улица", uk: "вулиця" }, rule: ART_F_RULE },
  { q: "майка", label: LABEL_F, answer: "-та", hint: { ru: "мама", uk: "мама" }, rule: ART_F_RULE },
  { q: "вода", label: LABEL_F, answer: "-та", hint: { ru: "вода", uk: "вода" }, rule: ART_F_RULE },
  { q: "нощ", label: LABEL_F, answer: "-та", hint: { ru: "ночь", uk: "ніч" }, rule: ART_F_RULE },
  { q: "дете", label: LABEL_N, answer: "-то", hint: { ru: "ребёнок", uk: "дитина" }, rule: ART_N_RULE },
  { q: "море", label: LABEL_N, answer: "-то", hint: { ru: "море", uk: "море" }, rule: ART_N_RULE },
  { q: "село", label: LABEL_N, answer: "-то", hint: { ru: "село", uk: "село" }, rule: ART_N_RULE },
  { q: "яйце", label: LABEL_N, answer: "-то", hint: { ru: "яйцо", uk: "яйце" }, rule: ART_N_RULE },
  { q: "небе", label: LABEL_N, answer: "-то", hint: { ru: "небо", uk: "небо" }, rule: ART_N_RULE },
  { q: "дърво", label: LABEL_N, answer: "-то", hint: { ru: "дерево", uk: "дерево" }, rule: ART_N_RULE },
  { q: "деца", label: LABEL_PL, answer: "-та", hint: { ru: "дети", uk: "діти" }, rule: ART_PL_A_RULE },
  { q: "книги", label: LABEL_PL, answer: "-те", hint: { ru: "книги", uk: "книги" }, rule: ART_PL_I_RULE },
  { q: "мъже", label: LABEL_PL, answer: "-те", hint: { ru: "мужчины", uk: "чоловіки" }, rule: ART_PL_I_RULE },
  { q: "градове", label: LABEL_PL, answer: "-те", hint: { ru: "города", uk: "міста" }, rule: ART_PL_I_RULE },
  { q: "жени", label: LABEL_PL, answer: "-те", hint: { ru: "женщины", uk: "жінки" }, rule: ART_PL_I_RULE },
];
export const ARTICLE_OPTIONS = ["-ът", "-та", "-то", "-те", "-а"];

export const DATA_GENDER: DataItem[] = [
  { q: "мъж", answer: "мужской", hint: { ru: "мужчина", uk: "чоловік" } },
  { q: "стол", answer: "мужской", hint: { ru: "стул", uk: "стілець" } },
  { q: "град", answer: "мужской", hint: { ru: "город", uk: "місто" } },
  { q: "ден", answer: "мужской", hint: { ru: "день", uk: "день" } },
  { q: "нос", answer: "мужской", hint: { ru: "нос", uk: "ніс" } },
  { q: "зъб", answer: "мужской", hint: { ru: "зуб", uk: "зуб" } },
  { q: "хляб", answer: "мужской", hint: { ru: "хлеб", uk: "хліб" } },
  { q: "вятър", answer: "мужской", hint: { ru: "ветер", uk: "вітер" } },
  { q: "жена", answer: "женский", hint: { ru: "женщина", uk: "жінка" } },
  { q: "книга", answer: "женский", hint: { ru: "книга", uk: "книга" } },
  { q: "нощ", answer: "женский", hint: { ru: "ночь", uk: "ніч" } },
  { q: "улица", answer: "женский", hint: { ru: "улица", uk: "вулиця" } },
  { q: "майка", answer: "женский", hint: { ru: "мама", uk: "мама" } },
  { q: "вода", answer: "женский", hint: { ru: "вода", uk: "вода" } },
  { q: "врата", answer: "женский", hint: { ru: "дверь", uk: "двері" } },
  { q: "дете", answer: "средний", hint: { ru: "ребёнок", uk: "дитина" } },
  { q: "море", answer: "средний", hint: { ru: "море", uk: "море" } },
  { q: "село", answer: "средний", hint: { ru: "село", uk: "село" } },
  { q: "сърце", answer: "средний", hint: { ru: "сердце", uk: "серце" } },
  { q: "яйце", answer: "средний", hint: { ru: "яйцо", uk: "яйце" } },
  { q: "небе", answer: "средний", hint: { ru: "небо", uk: "небо" } },
  { q: "дърво", answer: "средний", hint: { ru: "дерево", uk: "дерево" } },
];
export const GENDER_OPTIONS = ["мужской", "женский", "средний"];

const PL_RULE_FI: Localized<string> = {
  ru: "ж.р. на -а → мн.ч. -и.",
  uk: "ж.р. на -а → мн. -и.",
};
const PL_RULE_MI: Localized<string> = {
  ru: "м.р. односложный/многосложный → мн.ч. -и (часто).",
  uk: "ч.р. однослів./багатослів. → мн. -и (часто).",
};
const PL_RULE_M_OVE: Localized<string> = {
  ru: "м.р. односложный → мн.ч. -ове.",
  uk: "ч.р. однослівний → мн. -ове.",
};
const PL_RULE_M_E: Localized<string> = {
  ru: "м.р. односложный на шипящий/конец слова → мн.ч. -е (мъже).",
  uk: "ч.р. однослівний на шипл./закінчення → мн. -е (мъже).",
};
const PL_RULE_IRREG: Localized<string> = {
  ru: "нерегулярная форма — запомнить.",
  uk: "неправильна форма — запам'ятати.",
};
const PL_RULE_N_ETA: Localized<string> = {
  ru: "ср.р. на -е/-о → мн.ч. -ета.",
  uk: "с.р. на -е/-о → мн. -ета.",
};
export const DATA_PLURAL: DataItem[] = [
  { q: "книга", answer: "книги", hint: { ru: "книга", uk: "книга" }, decoys: ["жени", "думи", "майки"], rule: PL_RULE_FI },
  { q: "жена", answer: "жени", hint: { ru: "женщина", uk: "жінка" }, decoys: ["книги", "маси", "думи"], rule: PL_RULE_FI },
  { q: "маса", answer: "маси", hint: { ru: "стол", uk: "стіл" }, decoys: ["книги", "жени", "гори"], rule: PL_RULE_FI },
  { q: "мъж", answer: "мъже", hint: { ru: "мужчина", uk: "чоловік" }, decoys: ["братя", "носове", "зъби"], rule: PL_RULE_M_E },
  { q: "стол", answer: "столове", hint: { ru: "стул", uk: "стілець" }, decoys: ["маси", "градове", "носове"], rule: PL_RULE_M_OVE },
  { q: "град", answer: "градове", hint: { ru: "город", uk: "місто" }, decoys: ["столове", "носове", "зъби"], rule: PL_RULE_M_OVE },
  { q: "дете", answer: "деца", hint: { ru: "ребёнок", uk: "дитина" }, decoys: ["кучета", "дървета", "очи"], rule: PL_RULE_IRREG },
  { q: "око", answer: "очи", hint: { ru: "глаз", uk: "око" }, decoys: ["уши", "ръце", "дни"], rule: PL_RULE_IRREG },
  { q: "ухо", answer: "уши", hint: { ru: "ухо", uk: "вухо" }, decoys: ["очи", "ръце", "нощи"], rule: PL_RULE_IRREG },
  { q: "ден", answer: "дни", hint: { ru: "день", uk: "день" }, decoys: ["нощи", "думи", "книги"], rule: PL_RULE_MI },
  { q: "нощ", answer: "нощи", hint: { ru: "ночь", uk: "ніч" }, decoys: ["дни", "думи", "жени"], rule: PL_RULE_FI },
  { q: "ръка", answer: "ръце", hint: { ru: "рука", uk: "рука" }, decoys: ["очи", "уши", "нощи"], rule: PL_RULE_IRREG },
  { q: "нос", answer: "носове", hint: { ru: "нос", uk: "ніс" }, decoys: ["зъби", "столове", "градове"], rule: PL_RULE_M_OVE },
  { q: "зъб", answer: "зъби", hint: { ru: "зуб", uk: "зуб" }, decoys: ["носове", "столове", "мъже"], rule: PL_RULE_MI },
  { q: "брат", answer: "братя", hint: { ru: "брат", uk: "брат" }, decoys: ["мъже", "зъби", "носове"], rule: PL_RULE_IRREG },
  { q: "гора", answer: "гори", hint: { ru: "лес", uk: "ліс" }, decoys: ["книги", "думи", "маси"], rule: PL_RULE_FI },
  { q: "дума", answer: "думи", hint: { ru: "слово", uk: "слово" }, decoys: ["книги", "жени", "гори"], rule: PL_RULE_FI },
  { q: "майка", answer: "майки", hint: { ru: "мама", uk: "мама" }, decoys: ["жени", "книги", "думи"], rule: PL_RULE_FI },
  { q: "куче", answer: "кучета", hint: { ru: "собака", uk: "собака" }, decoys: ["деца", "дървета", "очи"], rule: PL_RULE_N_ETA },
  { q: "дърво", answer: "дървета", hint: { ru: "дерево", uk: "дерево" }, decoys: ["кучета", "деца", "очи"], rule: PL_RULE_N_ETA },
];

const LABEL_ACC: Localized<string> = { ru: "винительный падеж", uk: "знахідний відмінок" };
const LABEL_DAT: Localized<string> = { ru: "дательный падеж", uk: "давальний відмінок" };
export const DATA_PRONOUN_SHORT: DataItem[] = [
  { q: "аз", label: LABEL_ACC, answer: "ме", hint: { ru: "меня", uk: "мене" } },
  { q: "аз", label: LABEL_DAT, answer: "ми", hint: { ru: "мне", uk: "мені" } },
  { q: "ти", label: LABEL_ACC, answer: "те", hint: { ru: "тебя", uk: "тебе" } },
  { q: "ти", label: LABEL_DAT, answer: "ти", hint: { ru: "тебе", uk: "тобі" } },
  { q: "той", label: LABEL_ACC, answer: "го", hint: { ru: "его", uk: "його" } },
  { q: "той", label: LABEL_DAT, answer: "му", hint: { ru: "ему", uk: "йому" } },
  { q: "тя", label: LABEL_ACC, answer: "я", hint: { ru: "её", uk: "її" } },
  { q: "тя", label: LABEL_DAT, answer: "ѝ", hint: { ru: "ей", uk: "їй" } },
  { q: "то", label: LABEL_ACC, answer: "го", hint: { ru: "его (ср.р.)", uk: "його (с.р.)" } },
  { q: "то", label: LABEL_DAT, answer: "му", hint: { ru: "ему (ср.р.)", uk: "йому (с.р.)" } },
  { q: "ние", label: LABEL_ACC, answer: "ни", hint: { ru: "нас", uk: "нас" } },
  { q: "ние", label: LABEL_DAT, answer: "ни", hint: { ru: "нам", uk: "нам" } },
  { q: "вие", label: LABEL_ACC, answer: "ви", hint: { ru: "вас", uk: "вас" } },
  { q: "вие", label: LABEL_DAT, answer: "ви", hint: { ru: "вам", uk: "вам" } },
  { q: "те", label: LABEL_ACC, answer: "ги", hint: { ru: "их", uk: "їх" } },
  { q: "те", label: LABEL_DAT, answer: "им", hint: { ru: "им", uk: "їм" } },
];

const LABEL_M_FULL: Localized<string> = { ru: "мужской род, полная форма", uk: "чоловічий рід, повна форма" };
const LABEL_F_FULL: Localized<string> = { ru: "женский род, полная форма", uk: "жіночий рід, повна форма" };
const LABEL_SHORT: Localized<string> = { ru: "краткая форма", uk: "коротка форма" };
export const DATA_POSSESS: DataItem[] = [
  { q: "мой", label: LABEL_M_FULL, answer: "моят / мой", hint: { ru: "мой (полн.)", uk: "мій (повн.)" } },
  { q: "моя", label: LABEL_F_FULL, answer: "моята / моя", hint: { ru: "моя (полн.)", uk: "моя (повн.)" } },
  { q: "мой", label: LABEL_SHORT, answer: "ми", hint: { ru: "мой (кратк.)", uk: "мій (корот.)" } },
  { q: "твой", label: LABEL_M_FULL, answer: "твоят / твой", hint: { ru: "твой (полн.)", uk: "твій (повн.)" } },
  { q: "твоя", label: LABEL_F_FULL, answer: "твоята / твоя", hint: { ru: "твоя (полн.)", uk: "твоя (повн.)" } },
  { q: "твой", label: LABEL_SHORT, answer: "ти", hint: { ru: "твой (кратк.)", uk: "твій (корот.)" } },
  { q: "негов", label: LABEL_M_FULL, answer: "неговият", hint: { ru: "его (полн.)", uk: "його (повн.)" } },
  { q: "негов", label: LABEL_SHORT, answer: "му", hint: { ru: "его (кратк.)", uk: "його (корот.)" } },
  { q: "неин", label: LABEL_F_FULL, answer: "нейният", hint: { ru: "её (полн.)", uk: "її (повн.)" } },
  { q: "неин", label: LABEL_SHORT, answer: "ѝ", hint: { ru: "её (кратк.)", uk: "її (корот.)" } },
  { q: "наш", label: LABEL_M_FULL, answer: "нашият / наш", hint: { ru: "наш (полн.)", uk: "наш (повн.)" } },
  { q: "наш", label: LABEL_SHORT, answer: "ни", hint: { ru: "наш (кратк.)", uk: "наш (корот.)" } },
  { q: "ваш", label: LABEL_M_FULL, answer: "вашият / ваш", hint: { ru: "ваш (полн.)", uk: "ваш (повн.)" } },
  { q: "ваш", label: LABEL_SHORT, answer: "ви", hint: { ru: "ваш (кратк.)", uk: "ваш (корот.)" } },
  { q: "техен", label: LABEL_SHORT, answer: "им", hint: { ru: "их (кратк.)", uk: "їх (корот.)" } },
];

export const DATA_NEGATION: DataItem[] = [
  { q: "аз съм студент", answer: "аз не съм студент", hint: { ru: "я студент", uk: "я студент" } },
  { q: "тя има куче", answer: "тя няма куче", hint: { ru: "у неё есть собака", uk: "у неї є собака" } },
  { q: "те идват", answer: "те не идват", hint: { ru: "они приходят", uk: "вони приходять" } },
  { q: "аз винаги пия кафе", answer: "аз никога не пия кафе", hint: { ru: "я всегда пью кофе", uk: "я завжди п'ю каву" } },
  { q: "искам нещо", answer: "не искам нищо", hint: { ru: "хочу что-нибудь", uk: "хочу щось" } },
  { q: "някой е тук", answer: "никой не е тук", hint: { ru: "кто-то здесь", uk: "хтось тут" } },
  { q: "ти знаеш", answer: "ти не знаеш", hint: { ru: "ты знаешь", uk: "ти знаєш" } },
  { q: "има време", answer: "няма време", hint: { ru: "есть время", uk: "є час" } },
  { q: "аз знам", answer: "аз не знам", hint: { ru: "я знаю", uk: "я знаю" } },
  { q: "тя чете", answer: "тя не чете", hint: { ru: "она читает", uk: "вона читає" } },
  { q: "той обича музика", answer: "той не обича музика", hint: { ru: "он любит музыку", uk: "він любить музику" } },
  { q: "имам пари", answer: "нямам пари", hint: { ru: "у меня есть деньги", uk: "у мене є гроші" } },
  { q: "ние чакаме", answer: "ние не чакаме", hint: { ru: "мы ждём", uk: "ми чекаємо" } },
  { q: "той дойде", answer: "той не дойде", hint: { ru: "он пришёл", uk: "він прийшов" } },
];

export const DATA_BUILD: BuildItem[] = [
  { words: ["какво", "правиш", "?"], translation: { ru: "Что делаешь?", uk: "Що робиш?" } },
  { words: ["къде", "живееш", "?"], translation: { ru: "Где живёшь?", uk: "Де живеш?" } },
  { words: ["кога", "идваш", "?"], translation: { ru: "Когда придёшь?", uk: "Коли прийдеш?" } },
  { words: ["как", "се", "казваш", "?"], translation: { ru: "Как тебя зовут?", uk: "Як тебе звати?" } },
  { words: ["колко", "струва", "?"], translation: { ru: "Сколько стоит?", uk: "Скільки коштує?" } },
  { words: ["защо", "плачеш", "?"], translation: { ru: "Почему плачешь?", uk: "Чому плачеш?" } },
  { words: ["откъде", "си", "?"], translation: { ru: "Откуда ты?", uk: "Звідки ти?" } },
  { words: ["какво", "искаш", "да", "ядеш", "?"], translation: { ru: "Что хочешь есть?", uk: "Що хочеш їсти?" } },
  { words: ["къде", "е", "гарата", "?"], translation: { ru: "Где вокзал?", uk: "Де вокзал?" } },
  { words: ["кога", "тръгва", "влакът", "?"], translation: { ru: "Когда отправляется поезд?", uk: "Коли вирушає потяг?" } },
  { words: ["как", "се", "чувстваш", "?"], translation: { ru: "Как себя чувствуешь?", uk: "Як себе почуваєш?" } },
  { words: ["кой", "е", "той", "?"], translation: { ru: "Кто он?", uk: "Хто він?" } },
  { words: ["какво", "има", "там", "?"], translation: { ru: "Что там есть?", uk: "Що там є?" } },
  { words: ["колко", "струва", "кафето", "?"], translation: { ru: "Сколько стоит кофе?", uk: "Скільки коштує кава?" } },
  { words: ["кога", "спиш", "?"], translation: { ru: "Когда ты спишь?", uk: "Коли ти спиш?" } },
  { words: ["как", "се", "казва", "тя", "?"], translation: { ru: "Как её зовут?", uk: "Як її звати?" } },
  { words: ["защо", "не", "идваш", "?"], translation: { ru: "Почему не приходишь?", uk: "Чому не приходиш?" } },
  { words: ["откъде", "е", "тя", "?"], translation: { ru: "Откуда она?", uk: "Звідки вона?" } },
];

export const DATA_KAZVAM: DataItem[] = [
  { q: "Аз (се)", answer: "казвам", hint: { ru: "я зовусь", uk: "я звуся" } },
  { q: "Ти (се)", answer: "казваш", hint: { ru: "ты зовёшься", uk: "ти звешся" } },
  { q: "Той/Тя/То (се)", answer: "казва", hint: { ru: "он зовётся", uk: "він зветься" } },
  { q: "Ние (се)", answer: "казваме", hint: { ru: "мы зовёмся", uk: "ми звемося" } },
  { q: "Вие (се)", answer: "казвате", hint: { ru: "вы зовётесь", uk: "ви зветеся" } },
  { q: "Те (се)", answer: "казват", hint: { ru: "они зовутся", uk: "вони звуться" } },
];

export const DATA_GOVORYA: DataItem[] = [
  { q: "Аз", answer: "говоря", hint: { ru: "я говорю", uk: "я говорю" } },
  { q: "Ти", answer: "говориш", hint: { ru: "ты говоришь", uk: "ти говориш" } },
  { q: "Той/Тя/То", answer: "говори", hint: { ru: "он говорит", uk: "він говорить" } },
  { q: "Ние", answer: "говорим", hint: { ru: "мы говорим", uk: "ми говоримо" } },
  { q: "Вие", answer: "говорите", hint: { ru: "вы говорите", uk: "ви говорите" } },
  { q: "Те", answer: "говорят", hint: { ru: "они говорят", uk: "вони говорять" } },
];

export const DATA_COUNTRY_LANG: DataItem[] = [
  { q: "България", answer: "български", hint: { ru: "язык Болгарии", uk: "мова Болгарії" }, decoys: ["руски", "сръбски", "гръцки"] },
  { q: "Русия", answer: "руски", hint: { ru: "язык России", uk: "мова Росії" }, decoys: ["български", "полски", "украински"] },
  { q: "Англия", answer: "английски", hint: { ru: "язык Англии", uk: "мова Англії" }, decoys: ["немски", "френски", "испански"] },
  { q: "Германия", answer: "немски", hint: { ru: "язык Германии", uk: "мова Німеччини" }, decoys: ["английски", "нидерландски", "френски"] },
  { q: "Франция", answer: "френски", hint: { ru: "язык Франции", uk: "мова Франції" }, decoys: ["испански", "италиански", "немски"] },
  { q: "Испания", answer: "испански", hint: { ru: "язык Испании", uk: "мова Іспанії" }, decoys: ["португалски", "италиански", "френски"] },
  { q: "Италия", answer: "италиански", hint: { ru: "язык Италии", uk: "мова Італії" }, decoys: ["испански", "френски", "румънски"] },
  { q: "Гърция", answer: "гръцки", hint: { ru: "язык Греции", uk: "мова Греції" }, decoys: ["турски", "български", "италиански"] },
  { q: "Турция", answer: "турски", hint: { ru: "язык Турции", uk: "мова Туреччини" }, decoys: ["гръцки", "арабски", "персийски"] },
  { q: "Китай", answer: "китайски", hint: { ru: "язык Китая", uk: "мова Китаю" }, decoys: ["японски", "корейски", "виетнамски"] },
  { q: "Япония", answer: "японски", hint: { ru: "язык Японии", uk: "мова Японії" }, decoys: ["китайски", "корейски", "английски"] },
  { q: "Полша", answer: "полски", hint: { ru: "язык Польши", uk: "мова Польщі" }, decoys: ["чешки", "словашки", "руски"] },
  { q: "Чехия", answer: "чешки", hint: { ru: "язык Чехии", uk: "мова Чехії" }, decoys: ["словашки", "полски", "немски"] },
  { q: "Сърбия", answer: "сръбски", hint: { ru: "язык Сербии", uk: "мова Сербії" }, decoys: ["хърватски", "словенски", "български"] },
  { q: "Унгария", answer: "унгарски", hint: { ru: "язык Венгрии", uk: "мова Угорщини" }, decoys: ["румънски", "словашки", "сръбски"] },
  { q: "Америка", answer: "английски", hint: { ru: "язык США", uk: "мова США" }, decoys: ["испански", "френски", "немски"] },
];

export const DATA_NATIONALITY: DataItem[] = [
  { q: "България (м.)", answer: "българин", hint: { ru: "мужчина из Болгарии", uk: "чоловік з Болгарії" }, decoys: ["българка", "англичанин", "руснак"] },
  { q: "България (ж.)", answer: "българка", hint: { ru: "женщина из Болгарии", uk: "жінка з Болгарії" }, decoys: ["българин", "англичанка", "рускиня"] },
  { q: "Русия (м.)", answer: "руснак", hint: { ru: "мужчина из России", uk: "чоловік з Росії" }, decoys: ["рускиня", "българин", "японец"] },
  { q: "Русия (ж.)", answer: "рускиня", hint: { ru: "женщина из России", uk: "жінка з Росії" }, decoys: ["руснак", "българка", "японка"] },
  { q: "Англия (м.)", answer: "англичанин", hint: { ru: "мужчина из Англии", uk: "чоловік з Англії" }, decoys: ["англичанка", "българин", "германец"] },
  { q: "Англия (ж.)", answer: "англичанка", hint: { ru: "женщина из Англии", uk: "жінка з Англії" }, decoys: ["англичанин", "българка", "германка"] },
  { q: "Германия (м.)", answer: "германец", hint: { ru: "мужчина из Германии", uk: "чоловік з Німеччини" }, decoys: ["германка", "испанец", "италианец"] },
  { q: "Германия (ж.)", answer: "германка", hint: { ru: "женщина из Германии", uk: "жінка з Німеччини" }, decoys: ["германец", "испанка", "италианка"] },
  { q: "Испания (м.)", answer: "испанец", hint: { ru: "мужчина из Испании", uk: "чоловік з Іспанії" }, decoys: ["испанка", "италианец", "германец"] },
  { q: "Испания (ж.)", answer: "испанка", hint: { ru: "женщина из Испании", uk: "жінка з Іспанії" }, decoys: ["испанец", "италианка", "германка"] },
  { q: "Италия (м.)", answer: "италианец", hint: { ru: "мужчина из Италии", uk: "чоловік з Італії" }, decoys: ["италианка", "испанец", "германец"] },
  { q: "Италия (ж.)", answer: "италианка", hint: { ru: "женщина из Италии", uk: "жінка з Італії" }, decoys: ["италианец", "испанка", "германка"] },
  { q: "Гърция (м.)", answer: "грък", hint: { ru: "мужчина из Греции", uk: "чоловік з Греції" }, decoys: ["гъркиня", "българин", "руснак"] },
  { q: "Гърция (ж.)", answer: "гъркиня", hint: { ru: "женщина из Греции", uk: "жінка з Греції" }, decoys: ["грък", "българка", "рускиня"] },
  { q: "Япония (м.)", answer: "японец", hint: { ru: "мужчина из Японии", uk: "чоловік з Японії" }, decoys: ["японка", "испанец", "италианец"] },
  { q: "Япония (ж.)", answer: "японка", hint: { ru: "женщина из Японии", uk: "жінка з Японії" }, decoys: ["японец", "испанка", "италианка"] },
];

export const DATA_PROFESSION: DataItem[] = [
  { q: "студент", answer: "студентка", hint: { ru: "студент → ж.р.", uk: "студент → ж.р." }, decoys: ["преподавателка", "журналистка", "писателка"] },
  { q: "преподавател", answer: "преподавателка", hint: { ru: "преподаватель → ж.р.", uk: "викладач → ж.р." }, decoys: ["студентка", "журналистка", "писателка"] },
  { q: "журналист", answer: "журналистка", hint: { ru: "журналист → ж.р.", uk: "журналіст → ж.р." }, decoys: ["студентка", "преподавателка", "писателка"] },
  { q: "фотограф", answer: "фотограф", hint: { ru: "фотограф → ж.р. (совпадает)", uk: "фотограф → ж.р. (збігається)" }, decoys: ["журналистка", "студентка", "актриса"] },
  { q: "писател", answer: "писателка", hint: { ru: "писатель → ж.р.", uk: "письменник → ж.р." }, decoys: ["студентка", "журналистка", "преподавателка"] },
  { q: "актьор", answer: "актриса", hint: { ru: "актёр → ж.р.", uk: "актор → ж.р." }, decoys: ["студентка", "преподавателка", "журналистка"] },
];

export const DATA_GREETING: DataItem[] = [
  { q: "07:00 ☀️", answer: "Добро утро", hint: { ru: "доброе утро", uk: "доброго ранку" } },
  { q: "09:00 🏢", answer: "Добро утро", hint: { ru: "доброе утро", uk: "доброго ранку" } },
  { q: "13:00 🌞", answer: "Добър ден", hint: { ru: "добрый день", uk: "добрий день" } },
  { q: "15:00 🌤", answer: "Добър ден", hint: { ru: "добрый день", uk: "добрий день" } },
  { q: "19:00 🌆", answer: "Добър вечер", hint: { ru: "добрый вечер", uk: "добрий вечір" } },
  { q: "21:00 🌃", answer: "Добър вечер", hint: { ru: "добрый вечер", uk: "добрий вечір" } },
  { q: "23:00 🌙", answer: "Лека нощ", hint: { ru: "спокойной ночи", uk: "надобраніч" } },
  { q: "00:30 💤", answer: "Лека нощ", hint: { ru: "спокойной ночи", uk: "надобраніч" } },
];
export const GREETING_OPTIONS = ["Добро утро", "Добър ден", "Добър вечер", "Лека нощ"];

const NALI_HINT_YES: Localized<string> = { ru: "подтвердить", uk: "підтвердити" };
const NALI_HINT_NO: Localized<string> = { ru: "отрицать", uk: "заперечити" };
export const DATA_NALI: DataItem[] = [
  { q: "Ти си от България, нали? (да)", answer: "Да.", hint: NALI_HINT_YES },
  { q: "Ти си студент, нали? (не)", answer: "Не.", hint: NALI_HINT_NO },
  { q: "Говориш български, нали? (да)", answer: "Да.", hint: NALI_HINT_YES },
  { q: "Тя е преподавателка, нали? (не)", answer: "Не.", hint: NALI_HINT_NO },
  { q: "Имаш време, нали? (да)", answer: "Да.", hint: NALI_HINT_YES },
  { q: "Те са от Русия, нали? (не)", answer: "Не.", hint: NALI_HINT_NO },
  { q: "Вие сте журналист, нали? (да)", answer: "Да.", hint: NALI_HINT_YES },
  { q: "Той е фотограф, нали? (не)", answer: "Не.", hint: NALI_HINT_NO },
];
export const NALI_OPTIONS = ["Да.", "Не."];

const NITO_I_RULE: Localized<string> = {
  ru: "Утверждение: «и … и». Отрицание: «нито … нито».",
  uk: "Ствердження: «и … и». Заперечення: «нито … нито».",
};
const NITO_HINT_AFFIRM: Localized<string> = { ru: "утверждение: и … и", uk: "ствердження: и … и" };
const NITO_HINT_NEG: Localized<string> = { ru: "отрицание: нито … нито", uk: "заперечення: нито … нито" };
const NITO_HINT_AFFIRM_SHORT: Localized<string> = { ru: "утверждение", uk: "ствердження" };
const NITO_HINT_NEG_SHORT: Localized<string> = { ru: "отрицание", uk: "заперечення" };
export const DATA_NITO_I: DataItem[] = [
  { q: "Имам ___ учебник, ___ речник.", answer: "и", hint: NITO_HINT_AFFIRM, rule: NITO_I_RULE },
  { q: "Нямам ___ химикалка, ___ молив.", answer: "нито", hint: NITO_HINT_NEG, rule: NITO_I_RULE },
  { q: "Говоря ___ български, ___ английски.", answer: "и", hint: NITO_HINT_AFFIRM_SHORT, rule: NITO_I_RULE },
  { q: "Не говоря ___ испански, ___ френски.", answer: "нито", hint: NITO_HINT_NEG_SHORT, rule: NITO_I_RULE },
  { q: "Обичам ___ кафе, ___ чай.", answer: "и", hint: NITO_HINT_AFFIRM_SHORT, rule: NITO_I_RULE },
  { q: "Нямам ___ време, ___ пари.", answer: "нито", hint: NITO_HINT_NEG_SHORT, rule: NITO_I_RULE },
  { q: "Имам ___ тетрадка, ___ бележник.", answer: "и", hint: NITO_HINT_AFFIRM_SHORT, rule: NITO_I_RULE },
  { q: "Не знам ___ него, ___ нея.", answer: "нито", hint: NITO_HINT_NEG_SHORT, rule: NITO_I_RULE },
];
export const NITO_I_OPTIONS = ["и", "нито"];

export const DATA_KAK_SI: DataItem[] = [
  { q: "😄", answer: "Много добре", hint: { ru: "очень хорошо", uk: "дуже добре" } },
  { q: "🌟", answer: "Много добре", hint: { ru: "очень хорошо", uk: "дуже добре" } },
  { q: "🙂", answer: "Добре", hint: { ru: "хорошо", uk: "добре" } },
  { q: "👍", answer: "Добре", hint: { ru: "хорошо", uk: "добре" } },
  { q: "😐", answer: "Горе-долу", hint: { ru: "средне", uk: "так собі" } },
  { q: "🤷", answer: "Горе-долу", hint: { ru: "средне", uk: "так собі" } },
  { q: "😕", answer: "Не много добре", hint: { ru: "не очень хорошо", uk: "не дуже добре" } },
  { q: "🤒", answer: "Не много добре", hint: { ru: "не очень хорошо", uk: "не дуже добре" } },
];
export const KAK_SI_OPTIONS = ["Много добре", "Добре", "Не много добре", "Горе-долу"];

const TOVA_RULE: Localized<string> = {
  ru: "«Това е» + ед.ч.; «Това са» + мн.ч.",
  uk: "«Това е» + одн.; «Това са» + мн.",
};
export const DATA_TOVA: DataItem[] = [
  { q: "тетрадка", answer: "Това е", hint: { ru: "тетрадь (ед.)", uk: "зошит (одн.)" }, rule: TOVA_RULE },
  { q: "тетрадки", answer: "Това са", hint: { ru: "тетради (мн.)", uk: "зошити (мн.)" }, rule: TOVA_RULE },
  { q: "бележник", answer: "Това е", hint: { ru: "блокнот (ед.)", uk: "блокнот (одн.)" }, rule: TOVA_RULE },
  { q: "бележници", answer: "Това са", hint: { ru: "блокноты (мн.)", uk: "блокноти (мн.)" }, rule: TOVA_RULE },
  { q: "книга", answer: "Това е", hint: { ru: "книга (ед.)", uk: "книга (одн.)" }, rule: TOVA_RULE },
  { q: "книги", answer: "Това са", hint: { ru: "книги (мн.)", uk: "книги (мн.)" }, rule: TOVA_RULE },
  { q: "речник", answer: "Това е", hint: { ru: "словарь (ед.)", uk: "словник (одн.)" }, rule: TOVA_RULE },
  { q: "речници", answer: "Това са", hint: { ru: "словари (мн.)", uk: "словники (мн.)" }, rule: TOVA_RULE },
  { q: "молив", answer: "Това е", hint: { ru: "карандаш (ед.)", uk: "олівець (одн.)" }, rule: TOVA_RULE },
  { q: "моливи", answer: "Това са", hint: { ru: "карандаши (мн.)", uk: "олівці (мн.)" }, rule: TOVA_RULE },
  { q: "химикалка", answer: "Това е", hint: { ru: "ручка (ед.)", uk: "ручка (одн.)" }, rule: TOVA_RULE },
  { q: "химикалки", answer: "Това са", hint: { ru: "ручки (мн.)", uk: "ручки (мн.)" }, rule: TOVA_RULE },
  { q: "чанта", answer: "Това е", hint: { ru: "сумка (ед.)", uk: "сумка (одн.)" }, rule: TOVA_RULE },
  { q: "чанти", answer: "Това са", hint: { ru: "сумки (мн.)", uk: "сумки (мн.)" }, rule: TOVA_RULE },
  { q: "шише с вода", answer: "Това е", hint: { ru: "бутылка с водой (ед.)", uk: "пляшка з водою (одн.)" }, rule: TOVA_RULE },
  { q: "шишета с вода", answer: "Това са", hint: { ru: "бутылки с водой (мн.)", uk: "пляшки з водою (мн.)" }, rule: TOVA_RULE },
];
export const TOVA_OPTIONS = ["Това е", "Това са"];

const HINT_LESSON_OBJECT: Localized<string> = { ru: "предмет на уроке", uk: "предмет на уроці" };
export const DATA_OBJECTS: DataItem[] = [
  { q: "тетрадь / зошит", answer: "тетрадка", hint: HINT_LESSON_OBJECT, decoys: ["бележник", "книга", "химикалка"] },
  { q: "блокнот", answer: "бележник", hint: HINT_LESSON_OBJECT, decoys: ["тетрадка", "речник", "молив"] },
  { q: "книга", answer: "книга", hint: HINT_LESSON_OBJECT, decoys: ["тетрадка", "речник", "чанта"] },
  { q: "словарь / словник", answer: "речник", hint: HINT_LESSON_OBJECT, decoys: ["книга", "бележник", "молив"] },
  { q: "карандаш / олівець", answer: "молив", hint: HINT_LESSON_OBJECT, decoys: ["химикалка", "речник", "чанта"] },
  { q: "ручка", answer: "химикалка", hint: HINT_LESSON_OBJECT, decoys: ["молив", "чанта", "книга"] },
  { q: "сумка", answer: "чанта", hint: HINT_LESSON_OBJECT, decoys: ["химикалка", "книга", "молив"] },
  { q: "бутылка / пляшка с водой", answer: "шише с вода", hint: HINT_LESSON_OBJECT, decoys: ["чанта", "речник", "бележник"] },
];

export const DATA_REPLY: DataItem[] = [
  { q: "— Здравей!", answer: "Здравей!", hint: { ru: "ответ на приветствие (ты)", uk: "відповідь на привітання (ти)" }, decoys: ["Здравейте!", "Лека нощ!", "Чао!"] },
  { q: "— Здравейте!", answer: "Здравейте!", hint: { ru: "ответ на приветствие (Вы)", uk: "відповідь на привітання (Ви)" }, decoys: ["Здравей!", "Чао!", "Довиждане!"] },
  { q: "— Как си?", answer: "Благодаря, добре.", hint: { ru: "как дела? (ты)", uk: "як справи? (ти)" }, decoys: ["Приятно ми е.", "Довиждане!", "Лека нощ!"] },
  { q: "— Как сте?", answer: "Благодаря, добре. А Вие?", hint: { ru: "как дела? (Вы)", uk: "як справи? (Ви)" }, decoys: ["Приятно ми е.", "Чао!", "Лека нощ!"] },
  { q: "— Лека нощ!", answer: "Лека нощ!", hint: { ru: "пожелание на ночь", uk: "побажання на ніч" }, decoys: ["Добро утро!", "Здравей!", "Добър ден!"] },
  { q: "— Чао!", answer: "Чао!", hint: { ru: "неформальное прощание", uk: "неформальне прощання" }, decoys: ["Здравей!", "Приятно ми е.", "Добро утро!"] },
  { q: "— Довиждане!", answer: "Довиждане!", hint: { ru: "формальное прощание", uk: "формальне прощання" }, decoys: ["Здравейте!", "Приятно ми е.", "Добър ден!"] },
  { q: "— Добро утро!", answer: "Добро утро!", hint: { ru: "утреннее приветствие", uk: "ранкове привітання" }, decoys: ["Добър вечер!", "Лека нощ!", "Чао!"] },
  { q: "— Добър ден!", answer: "Добър ден!", hint: { ru: "дневное приветствие", uk: "денне привітання" }, decoys: ["Добро утро!", "Лека нощ!", "Чао!"] },
  { q: "— Добър вечер!", answer: "Добър вечер!", hint: { ru: "вечернее приветствие", uk: "вечірнє привітання" }, decoys: ["Добро утро!", "Добър ден!", "Чао!"] },
  { q: "— Приятно ми е.", answer: "Приятно ми е.", hint: { ru: "приятно познакомиться", uk: "приємно познайомитись" }, decoys: ["Благодаря, добре.", "Чао!", "Довиждане!"] },
];

export const DATA_LI: LiItem[] = [
  { words: ["Говориш", "български"], liPosition: 0, result: "Говориш ли български?", translation: { ru: "Говоришь по-болгарски?", uk: "Розмовляєш болгарською?" } },
  { words: ["Искаш", "кафе"], liPosition: 0, result: "Искаш ли кафе?", translation: { ru: "Хочешь кофе?", uk: "Хочеш кави?" } },
  { words: ["Имаш", "време"], liPosition: 0, result: "Имаш ли време?", translation: { ru: "Есть время?", uk: "Маєш час?" } },
  { words: ["Разбираш", "ме"], liPosition: 0, result: "Разбираш ли ме?", translation: { ru: "Понимаешь меня?", uk: "Розумієш мене?" } },
  { words: ["Можеш", "да", "помогнеш"], liPosition: 0, result: "Можеш ли да помогнеш?", translation: { ru: "Можешь помочь?", uk: "Можеш допомогти?" } },
  { words: ["Знаеш", "къде", "е"], liPosition: 0, result: "Знаеш ли къде е?", translation: { ru: "Знаешь, где это?", uk: "Знаєш, де це?" } },
  { words: ["Обичаш", "музика"], liPosition: 0, result: "Обичаш ли музика?", translation: { ru: "Любишь музыку?", uk: "Любиш музику?" } },
  { words: ["Вярваш", "ми"], liPosition: 0, result: "Вярваш ли ми?", translation: { ru: "Веришь мне?", uk: "Віриш мені?" } },
  { words: ["Четеш", "книги"], liPosition: 0, result: "Четеш ли книги?", translation: { ru: "Читаешь книги?", uk: "Читаєш книги?" } },
  { words: ["Живееш", "тук"], liPosition: 0, result: "Живееш ли тук?", translation: { ru: "Живёшь здесь?", uk: "Живеш тут?" } },
  { words: ["Харесваш", "ме"], liPosition: 0, result: "Харесваш ли ме?", translation: { ru: "Нравлюсь тебе?", uk: "Подобаюсь тобі?" } },
  { words: ["Учиш", "български"], liPosition: 0, result: "Учиш ли български?", translation: { ru: "Учишь болгарский?", uk: "Вчиш болгарську?" } },
  { words: ["Пиеш", "кафе"], liPosition: 0, result: "Пиеш ли кафе?", translation: { ru: "Пьёшь кофе?", uk: "П'єш каву?" } },
  { words: ["Работиш", "тук"], liPosition: 0, result: "Работиш ли тук?", translation: { ru: "Работаешь здесь?", uk: "Працюєш тут?" } },
];

export const CATEGORIES: Category[] = [
  {
    id: "sym",
    name: { ru: "Глагол «съм»", uk: "Дієслово «съм»" },
    modes: [
      { id: "sym_pick", icon: "🎯", label: { ru: "Подбери форму", uk: "Підбери форму" }, desc: { ru: "Выбери форму «съм» для местоимения", uk: "Обери форму «съм» для займенника" }, type: "pick", data: () => DATA_SYM },
      { id: "sym_fill", icon: "⚡", label: { ru: "На скорость", uk: "На швидкість" }, desc: { ru: "Выбери форму «съм» для местоимения за отведённое время", uk: "Обери форму «съм» для займенника за відведений час" }, type: "timed", data: () => DATA_SYM },
      { id: "sym_type", icon: "⌨️", label: { ru: "Впиши форму", uk: "Впиши форму" }, desc: { ru: "Впиши форму «съм» для местоимения", uk: "Впиши форму «съм» для займенника" }, type: "type", data: () => DATA_SYM },
    ],
  },
  {
    id: "imam",
    name: { ru: "Имам / искам", uk: "Имам / искам" },
    modes: [
      { id: "imam_pick", icon: "🤲", label: { ru: "Имам", uk: "Имам" }, desc: { ru: "Выбери форму «имам» для местоимения", uk: "Обери форму «имам» для займенника" }, type: "pick", data: () => DATA_IMAM },
      { id: "nyamam_pick", icon: "🚫", label: { ru: "Нямам", uk: "Нямам" }, desc: { ru: "Выбери форму «нямам» для местоимения", uk: "Обери форму «нямам» для займенника" }, type: "pick", data: () => DATA_NYAMAM },
      { id: "iskam_pick", icon: "🌟", label: { ru: "Искам", uk: "Искам" }, desc: { ru: "Выбери форму «искам» для местоимения", uk: "Обери форму «искам» для займенника" }, type: "pick", data: () => DATA_ISKAM },
    ],
  },
  {
    id: "article",
    name: { ru: "Артикли", uk: "Артиклі" },
    modes: [
      { id: "art_pick", icon: "🏷️", label: { ru: "Добавь артикль", uk: "Додай артикль" }, desc: { ru: "Выбери определённый артикль для слова", uk: "Обери означений артикль для слова" }, type: "pickOpt", data: () => ({ items: DATA_ARTICLE, opts: ARTICLE_OPTIONS }) },
    ],
  },
  {
    id: "gender",
    name: { ru: "Род существительных", uk: "Рід іменників" },
    modes: [
      { id: "gen_pick", icon: "🔍", label: { ru: "Определи род", uk: "Визнач рід" }, desc: { ru: "Определи род существительного: мужской, женский или средний", uk: "Визнач рід іменника: чоловічий, жіночий або середній" }, type: "pickOpt", data: () => ({ items: DATA_GENDER, opts: GENDER_OPTIONS }) },
    ],
  },
  {
    id: "plural",
    name: { ru: "Множественное число", uk: "Множина" },
    modes: [
      { id: "pl_pick", icon: "📚", label: { ru: "Образуй мн.ч.", uk: "Утвори мн." }, desc: { ru: "Выбери форму множественного числа", uk: "Обери форму множини" }, type: "pickFrom", data: () => DATA_PLURAL },
    ],
  },
  {
    id: "possess",
    name: { ru: "Притяжательные", uk: "Присвійні" },
    modes: [
      { id: "poss_pick", icon: "🔑", label: { ru: "Чей? Чья?", uk: "Чий? Чия?" }, desc: { ru: "Выбери болгарскую притяжательную форму по указанному роду/числу", uk: "Обери болгарську присвійну форму за вказаним родом/числом" }, type: "pickFrom", data: () => DATA_POSSESS },
    ],
  },
  {
    id: "neg",
    name: { ru: "Отрицание", uk: "Заперечення" },
    modes: [
      { id: "neg_tf", icon: "❌", label: { ru: "Отрицание", uk: "Заперечення" }, desc: { ru: "Построй отрицательное предложение из плиток", uk: "Побудуй заперечне речення з плиток" }, type: "negation", data: () => DATA_NEGATION },
    ],
  },
  {
    id: "ques",
    name: { ru: "Порядок слов в вопросах", uk: "Порядок слів у питаннях" },
    modes: [
      { id: "q_build", icon: "🧩", label: { ru: "Собери вопрос", uk: "Склади питання" }, desc: { ru: "Расставь слова в правильном порядке, чтобы получился вопрос", uk: "Розстав слова в правильному порядку, щоб вийшло питання" }, type: "build", data: () => DATA_BUILD },
      { id: "q_li", icon: "💬", label: { ru: "Вставь «ли»", uk: "Встав «ли»" }, desc: { ru: "Нажми на место, куда вставить «ли»", uk: "Натисни на місце, куди вставити «ли»" }, type: "li", data: () => DATA_LI },
    ],
  },
  {
    id: "l1_extra",
    name: { ru: "Урок 1 · дополнительно", uk: "Урок 1 · додатково" },
    modes: [
      { id: "kazvam_pick", icon: "🪪", label: { ru: "Казвам се", uk: "Казвам се" }, desc: { ru: "Выбери форму «казвам се» для местоимения", uk: "Обери форму «казвам се» для займенника" }, type: "pick", data: () => DATA_KAZVAM },
      { id: "govorya_pick", icon: "🗣️", label: { ru: "Говоря", uk: "Говоря" }, desc: { ru: "Выбери форму «говоря» для местоимения", uk: "Обери форму «говоря» для займенника" }, type: "pick", data: () => DATA_GOVORYA },
      { id: "country_lang_pick", icon: "🌍", label: { ru: "Страна → язык", uk: "Країна → мова" }, desc: { ru: "Выбери язык, на котором говорят в этой стране", uk: "Обери мову, якою розмовляють у цій країні" }, type: "pickFrom", data: () => DATA_COUNTRY_LANG },
      { id: "nationality_pick", icon: "🧑‍🤝‍🧑", label: { ru: "Национальность", uk: "Національність" }, desc: { ru: "Выбери национальность по стране и полу", uk: "Обери національність за країною та статтю" }, type: "pickFrom", data: () => DATA_NATIONALITY },
      { id: "profession_pick", icon: "💼", label: { ru: "Профессия ж.р.", uk: "Професія ж.р." }, desc: { ru: "Выбери женскую форму профессии", uk: "Обери жіночу форму професії" }, type: "pickFrom", data: () => DATA_PROFESSION },
      { id: "greeting_pick", icon: "👋", label: { ru: "Приветствия", uk: "Привітання" }, desc: { ru: "Выбери приветствие, подходящее ко времени", uk: "Обери привітання, що підходить до часу" }, type: "pickOpt", data: () => ({ items: DATA_GREETING, opts: GREETING_OPTIONS }) },
      { id: "nali_pick", icon: "❓", label: { ru: "Ответ на «нали»", uk: "Відповідь на «нали»" }, desc: { ru: "Ответь «Да» или «Не» на вопрос с «нали»", uk: "Відповідай «Да» чи «Не» на питання з «нали»" }, type: "pickOpt", data: () => ({ items: DATA_NALI, opts: NALI_OPTIONS }) },
      { id: "nito_i_pick", icon: "➕", label: { ru: "«и … и» / «нито … нито»", uk: "«и … и» / «нито … нито»" }, desc: { ru: "Выбери «и» (утверждение) или «нито» (отрицание)", uk: "Обери «и» (ствердження) або «нито» (заперечення)" }, type: "pickOpt", data: () => ({ items: DATA_NITO_I, opts: NITO_I_OPTIONS }) },
      { id: "kak_si_pick", icon: "🙂", label: { ru: "Как си? / Как сте?", uk: "Как си? / Как сте?" }, desc: { ru: "Выбери ответ, подходящий по настроению", uk: "Обери відповідь за настроєм" }, type: "pickOpt", data: () => ({ items: DATA_KAK_SI, opts: KAK_SI_OPTIONS }) },
      { id: "tova_pick", icon: "👉", label: { ru: "Това е / Това са", uk: "Това е / Това са" }, desc: { ru: "Выбери «Това е» (ед.) или «Това са» (мн.)", uk: "Обери «Това е» (одн.) або «Това са» (мн.)" }, type: "pickOpt", data: () => ({ items: DATA_TOVA, opts: TOVA_OPTIONS }) },
      { id: "objects_pick", icon: "🎒", label: { ru: "Предметы", uk: "Предмети" }, desc: { ru: "Выбери болгарский перевод слова", uk: "Обери болгарський переклад слова" }, type: "pickFrom", data: () => DATA_OBJECTS },
      { id: "reply_pick", icon: "💬", label: { ru: "Ответные реплики", uk: "Відповідні репліки" }, desc: { ru: "Выбери подходящий ответ на реплику", uk: "Обери відповідь на репліку" }, type: "pickFrom", data: () => DATA_REPLY },
    ],
  },
];

export const ALL_MODES = CATEGORIES.flatMap(c => c.modes);
