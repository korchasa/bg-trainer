import type { DataItem, BuildItem, MatchItem, OddItem, ParadigmItem } from "../types";
import type { Localized } from "../i18n/types";

// ========================= LESSON 3 =========================

// --- Жилище ---
const HINT_HOUSE: Localized<string> = { ru: "жильё / часть дома", uk: "житло / частина дому" };
export const DATA_L3_HOUSE: DataItem[] = [
  { q: "дом / домівка", answer: "дом", hint: HINT_HOUSE, decoys: ["къща", "апартамент", "етаж"] },
  { q: "дом (здание) / будинок", answer: "къща", hint: HINT_HOUSE, decoys: ["дом", "апартамент", "гараж"] },
  { q: "квартира", answer: "апартамент", hint: HINT_HOUSE, decoys: ["къща", "етаж", "гараж"] },
  { q: "кухня", answer: "кухня", hint: HINT_HOUSE, decoys: ["баня", "гостна", "спалня"] },
  { q: "гостиная / вітальня", answer: "гостна", hint: HINT_HOUSE, decoys: ["спалня", "кухня", "коридор"] },
  { q: "холл", answer: "хол", hint: HINT_HOUSE, decoys: ["кухня", "баня", "гараж"] },
  { q: "спальня", answer: "спалня", hint: HINT_HOUSE, decoys: ["гостна", "кухня", "коридор"] },
  { q: "детская / дитяча", answer: "детска", hint: HINT_HOUSE, decoys: ["спалня", "гостна", "тераса"] },
  { q: "туалет", answer: "тоалетна", hint: HINT_HOUSE, decoys: ["баня", "коридор", "кухня"] },
  { q: "ванная / ванна", answer: "баня", hint: HINT_HOUSE, decoys: ["тоалетна", "кухня", "коридор"] },
  { q: "коридор", answer: "коридор", hint: HINT_HOUSE, decoys: ["тераса", "етаж", "гараж"] },
  { q: "терраса / тераса", answer: "тераса", hint: HINT_HOUSE, decoys: ["коридор", "гараж", "етаж"] },
  { q: "этаж / поверх", answer: "етаж", hint: HINT_HOUSE, decoys: ["гараж", "коридор", "тераса"] },
  { q: "гараж", answer: "гараж", hint: HINT_HOUSE, decoys: ["етаж", "тераса", "коридор"] },
  { q: "дневная (комната) / вітальня", answer: "дневна", hint: HINT_HOUSE, decoys: ["гостна", "спалня", "кухня"] },
];

// --- Семейство ---
const HINT_FAM: Localized<string> = { ru: "семья", uk: "родина" };
export const DATA_L3_FAMILY: DataItem[] = [
  { q: "мать / мати", answer: "майка", hint: HINT_FAM, decoys: ["баба", "сестра", "дъщеря"] },
  { q: "отец / батько", answer: "баща", hint: HINT_FAM, decoys: ["дядо", "брат", "син"] },
  { q: "бабушка / бабуся", answer: "баба", hint: HINT_FAM, decoys: ["майка", "сестра", "леля"] },
  { q: "дедушка / дідусь", answer: "дядо", hint: HINT_FAM, decoys: ["баща", "брат", "син"] },
  { q: "брат", answer: "брат", hint: HINT_FAM, decoys: ["син", "баща", "мъж"] },
  { q: "сестра", answer: "сестра", hint: HINT_FAM, decoys: ["дъщеря", "майка", "жена"] },
  { q: "сын / син", answer: "син", hint: HINT_FAM, decoys: ["брат", "баща", "мъж"] },
  { q: "дочь / дочка", answer: "дъщеря", hint: HINT_FAM, decoys: ["сестра", "майка", "жена"] },
  { q: "супруг / чоловік", answer: "съпруг", hint: HINT_FAM, decoys: ["съпруга", "брат", "син"] },
  { q: "супруга / дружина", answer: "съпруга", hint: HINT_FAM, decoys: ["съпруг", "сестра", "майка"] },
  { q: "мужчина / чоловік", answer: "мъж", hint: HINT_FAM, decoys: ["момче", "брат", "син"] },
  { q: "женщина / жінка", answer: "жена", hint: HINT_FAM, decoys: ["момиче", "сестра", "майка"] },
  { q: "мальчик / хлопчик", answer: "момче", hint: HINT_FAM, decoys: ["момиче", "син", "мъж"] },
  { q: "девочка / дівчинка", answer: "момиче", hint: HINT_FAM, decoys: ["момче", "дъщеря", "жена"] },
  { q: "ребёнок / дитина", answer: "дете", hint: HINT_FAM, decoys: ["момче", "момиче", "син"] },
  { q: "родитель / батько (загальне)", answer: "родител", hint: HINT_FAM, decoys: ["дете", "съпруг", "дядо"] },
];

// --- Краткие притяжательные ---
const POSS_SHORT_RULE: Localized<string> = {
  ru: "Краткие притяж.: аз→ми, ти→ти, той/то→му, тя→й, ние→ни, вие→ви, те→им; возвратное → си. Стоят после слова: баба ми.",
  uk: "Короткі присв.: аз→ми, ти→ти, той/то→му, тя→й, ние→ни, вие→ви, те→им; зворотне → си. Стоять після слова: баба ми.",
};
export const DATA_L3_POSS_SHORT: DataItem[] = [
  { q: "Деца, къде е майка ___?", answer: "ви", hint: { ru: "обращение к детям (вие)", uk: "звертання до дітей (вие)" }, rule: POSS_SHORT_RULE },
  { q: "Мишо и Ирена са студенти. Родителите ___ живеят в София.", answer: "им", hint: { ru: "их (те)", uk: "їхні (те)" }, rule: POSS_SHORT_RULE },
  { q: "Мишо, къде е книгата ___?", answer: "ти", hint: { ru: "твоя (ти)", uk: "твоя (ти)" }, rule: POSS_SHORT_RULE },
  { q: "Къщата ___ е двуетажна.", answer: "ни", hint: { ru: "наша (ние)", uk: "наша (ние)" }, rule: POSS_SHORT_RULE },
  { q: "Детето е в стаята. И майка ___ е в стаята.", answer: "му", hint: { ru: "его (то)", uk: "його (то)" }, rule: POSS_SHORT_RULE },
  { q: "Мария е тук. И майка ___ е тук.", answer: "й", hint: { ru: "её (тя)", uk: "її (тя)" }, rule: POSS_SHORT_RULE },
  { q: "Мишо е преподавател. Баща ___ също е преподавател.", answer: "му", hint: { ru: "его (той)", uk: "його (той)" }, rule: POSS_SHORT_RULE },
  { q: "Иване, къде е чантата ___?", answer: "ти", hint: { ru: "твоя (ти)", uk: "твоя (ти)" }, rule: POSS_SHORT_RULE },
  { q: "Децата обичат майка ___ (своята майка).", answer: "си", hint: { ru: "возвратное «свой»", uk: "зворотне «свій»" }, rule: POSS_SHORT_RULE },
  { q: "Аз живея с баба ___ и дядо ___.", answer: "ми", hint: { ru: "мой (аз)", uk: "мій (аз)" }, rule: POSS_SHORT_RULE },
  { q: "Ние обичаме родителите ___ (своите).", answer: "си", hint: { ru: "возвратное (своих)", uk: "зворотне (своїх)" }, rule: POSS_SHORT_RULE },
  { q: "Ти обичаш брат ___ (своя).", answer: "си", hint: { ru: "возвратное (своего)", uk: "зворотне (свого)" }, rule: POSS_SHORT_RULE },
  { q: "Вие познавате ли сестра ___ (моята)?", answer: "ми", hint: { ru: "мою (аз)", uk: "мою (аз)" }, rule: POSS_SHORT_RULE },
  { q: "Това е куче___. (на нас)", answer: "ни", hint: { ru: "наше (ние)", uk: "наше (ние)" }, rule: POSS_SHORT_RULE },
  { q: "Тя търси чантата ___. (на нея)", answer: "й", hint: { ru: "её (тя)", uk: "її (тя)" }, rule: POSS_SHORT_RULE },
];
export const L3_POSS_SHORT_OPTIONS = ["ми", "ти", "му", "й", "ни", "ви", "им", "си"];

// --- Краткие притяж. + артикль ---
const POSS_ART_RULE: Localized<string> = {
  ru: "С кратким притяж.: близкие родственники ж.р./м.р. (майка, баща, брат, сестра, баба, дядо, жена, дъщеря) — без артикля; остальные — с артиклем (мъжът ми, синът ми, детето ми, родителите ми).",
  uk: "З коротким присв.: близькі родичі ж.р./ч.р. (майка, баща, брат, сестра, баба, дядо, жена, дъщеря) — без артикля; інші — з артиклем (мъжът ми, синът ми, детето ми, родителите ми).",
};
const HINT_ART_FAM: Localized<string> = { ru: "артикль по правилу родства", uk: "артикль за правилом спорідненості" };
export const DATA_L3_POSS_ART: DataItem[] = [
  { q: "брат + ми", answer: "брат ми", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["братът ми", "братя ми", "брати ми"] },
  { q: "сестра + ми", answer: "сестра ми", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["сестрата ми", "сестрите ми", "сестри ми"] },
  { q: "мъж + ми", answer: "мъжът ми", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["мъж ми", "мъжа ми", "мъжете ми"] },
  { q: "съпруг + ми", answer: "съпругът ми", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["съпруг ми", "съпруга ми", "съпрузите ми"] },
  { q: "родители + ми", answer: "родителите ми", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["родители ми", "родителят ми", "родителя ми"] },
  { q: "деца + им", answer: "децата им", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["деца им", "децат им", "детето им"] },
  { q: "приятели + ми", answer: "приятелите ми", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["приятели ми", "приятеля ми", "приятелят ми"] },
  { q: "книга + ми", answer: "книгата ми", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["книга ми", "книгите ми", "книги ми"] },
  { q: "баба + ми", answer: "баба ми", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["бабата ми", "бабите ми", "баби ми"] },
  { q: "дядо + ми", answer: "дядо ми", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["дядото ми", "дядовци ми", "дядовците ми"] },
  { q: "дъщеря + им", answer: "дъщеря им", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["дъщерята им", "дъщерите им", "дъщери им"] },
  { q: "син + ми", answer: "синът ми", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["син ми", "сина ми", "синовете ми"] },
  { q: "дете + ми", answer: "детето ми", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["дете ми", "децата ми", "деца ми"] },
  { q: "майка + ми", answer: "майка ми", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["майката ми", "майките ми", "майки ми"] },
  { q: "баща + ми", answer: "баща ми", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["бащата ми", "бащите ми", "бащи ми"] },
];

// --- Указательные ---
const DEMO_RULE: Localized<string> = {
  ru: "Указательные: близко — този (м), тази (ж), това (ср), тези (мн); далеко — онзи (м), онази (ж), онова (ср), онези (мн).",
  uk: "Вказівні: близько — този (ч), тази (ж), това (с), тези (мн); далеко — онзи (ч), онази (ж), онова (с), онези (мн).",
};
const HINT_NEAR_M: Localized<string> = { ru: "м.р., близко", uk: "ч.р., близько" };
const HINT_NEAR_F: Localized<string> = { ru: "ж.р., близко", uk: "ж.р., близько" };
const HINT_NEAR_N: Localized<string> = { ru: "ср.р., близко", uk: "с.р., близько" };
const HINT_NEAR_PL: Localized<string> = { ru: "мн.ч., близко", uk: "мн., близько" };
const HINT_FAR_M: Localized<string> = { ru: "м.р., далеко", uk: "ч.р., далеко" };
const HINT_FAR_F: Localized<string> = { ru: "ж.р., далеко", uk: "ж.р., далеко" };
const HINT_FAR_N: Localized<string> = { ru: "ср.р., далеко", uk: "с.р., далеко" };
const HINT_FAR_PL: Localized<string> = { ru: "мн.ч., далеко", uk: "мн., далеко" };
export const DATA_L3_DEMO: DataItem[] = [
  { q: "___ чанта е моя. (близо)", answer: "тази", hint: HINT_NEAR_F, rule: DEMO_RULE },
  { q: "На кого е ___ бюро? (далече)", answer: "онова", hint: HINT_FAR_N, rule: DEMO_RULE },
  { q: "___ легло е мое. (далече)", answer: "онова", hint: HINT_FAR_N, rule: DEMO_RULE },
  { q: "___ жена е баба ми. (далече)", answer: "онази", hint: HINT_FAR_F, rule: DEMO_RULE },
  { q: "___ дете е синът ми. (далече)", answer: "онова", hint: HINT_FAR_N, rule: DEMO_RULE },
  { q: "___ хора са мои роднини. (далече)", answer: "онези", hint: HINT_FAR_PL, rule: DEMO_RULE },
  { q: "___ студент е от Унгария. (далече)", answer: "онзи", hint: HINT_FAR_M, rule: DEMO_RULE },
  { q: "Кой е ___ човек? (близо)", answer: "този", hint: HINT_NEAR_M, rule: DEMO_RULE },
  { q: "Кои са ___ хора? (близо)", answer: "тези", hint: HINT_NEAR_PL, rule: DEMO_RULE },
  { q: "___ къща е моя. (далече)", answer: "онази", hint: HINT_FAR_F, rule: DEMO_RULE },
  { q: "___ тетрадка е на Иван. (близо)", answer: "тази", hint: HINT_NEAR_F, rule: DEMO_RULE },
  { q: "___ химикал е на Петър. (близо)", answer: "този", hint: HINT_NEAR_M, rule: DEMO_RULE },
  { q: "___ речник е наш. (близо)", answer: "този", hint: HINT_NEAR_M, rule: DEMO_RULE },
  { q: "___ цветя са красиви. (близо)", answer: "тези", hint: HINT_NEAR_PL, rule: DEMO_RULE },
  { q: "___ огледало е старо. (близо)", answer: "това", hint: HINT_NEAR_N, rule: DEMO_RULE },
];
export const L3_DEMO_OPTIONS = ["този", "тази", "това", "тези", "онзи", "онази", "онова", "онези"];

// --- Глагол «живея» ---
const ZHIVEYA_RULE: Localized<string> = {
  ru: "Глагол «живея» (жить, I-спряж.): живея/живееш/живее · живеем/живеете/живеят.",
  uk: "Дієслово «живея» (жити, I-дієвідм.): живея/живееш/живее · живеем/живеете/живеят.",
};
export const DATA_L3_ZHIVEYA: DataItem[] = [
  { q: "Аз", answer: "живея", hint: { ru: "я живу", uk: "я живу" }, rule: ZHIVEYA_RULE },
  { q: "Ти", answer: "живееш", hint: { ru: "ты живёшь", uk: "ти живеш" }, rule: ZHIVEYA_RULE },
  { q: "Той/Тя/То", answer: "живее", hint: { ru: "он/она живёт", uk: "він/вона живе" }, rule: ZHIVEYA_RULE },
  { q: "Ние", answer: "живеем", hint: { ru: "мы живём", uk: "ми живемо" }, rule: ZHIVEYA_RULE },
  { q: "Вие", answer: "живеете", hint: { ru: "вы живёте", uk: "ви живете" }, rule: ZHIVEYA_RULE },
  { q: "Те", answer: "живеят", hint: { ru: "они живут", uk: "вони живуть" }, rule: ZHIVEYA_RULE },
];

// --- Глагол «зная» ---
const ZNAYA_RULE: Localized<string> = {
  ru: "Глагол «зная» (знать): зная/знаеш/знае · знаем/знаете/знаят.",
  uk: "Дієслово «зная» (знати): зная/знаеш/знае · знаем/знаете/знаят.",
};
export const DATA_L3_ZNAYA: DataItem[] = [
  { q: "Аз", answer: "зная", hint: { ru: "я знаю", uk: "я знаю" }, rule: ZNAYA_RULE },
  { q: "Ти", answer: "знаеш", hint: { ru: "ты знаешь", uk: "ти знаєш" }, rule: ZNAYA_RULE },
  { q: "Той/Тя/То", answer: "знае", hint: { ru: "он/она знает", uk: "він/вона знає" }, rule: ZNAYA_RULE },
  { q: "Ние", answer: "знаем", hint: { ru: "мы знаем", uk: "ми знаємо" }, rule: ZNAYA_RULE },
  { q: "Вие", answer: "знаете", hint: { ru: "вы знаете", uk: "ви знаєте" }, rule: ZNAYA_RULE },
  { q: "Те", answer: "знаят", hint: { ru: "они знают", uk: "вони знають" }, rule: ZNAYA_RULE },
];

// --- Глагол «следвам» ---
const SLEDVAM_RULE: Localized<string> = {
  ru: "Глагол «следвам» (учиться по специальности, A-спряж.): следвам/следваш/следва · следваме/следвате/следват.",
  uk: "Дієслово «следвам» (навчатися за спеціальністю, A-дієвідм.): следвам/следваш/следва · следваме/следвате/следват.",
};
export const DATA_L3_SLEDVAM: DataItem[] = [
  { q: "Аз", answer: "следвам", hint: { ru: "я учусь (по специальности)", uk: "я навчаюся" }, rule: SLEDVAM_RULE },
  { q: "Ти", answer: "следваш", hint: { ru: "ты учишься", uk: "ти навчаєшся" }, rule: SLEDVAM_RULE },
  { q: "Той/Тя/То", answer: "следва", hint: { ru: "он учится", uk: "він навчається" }, rule: SLEDVAM_RULE },
  { q: "Ние", answer: "следваме", hint: { ru: "мы учимся", uk: "ми навчаємося" }, rule: SLEDVAM_RULE },
  { q: "Вие", answer: "следвате", hint: { ru: "вы учитесь", uk: "ви навчаєтеся" }, rule: SLEDVAM_RULE },
  { q: "Те", answer: "следват", hint: { ru: "они учатся", uk: "вони навчаються" }, rule: SLEDVAM_RULE },
];

// --- Этажность (словообразование) ---
const FLOOR_RULE: Localized<string> = {
  ru: "Число + -етажен: едно-/дву-/три-/четири-/пет-... етажен (м.р. ед.); ж.р. -на, ср.р. -но, мн.ч. -ни.",
  uk: "Число + -етажен: едно-/дву-/три-/четири-/пет-... етажен (ч.р. одн.); ж.р. -на, с.р. -но, мн. -ни.",
};
const HINT_FLOOR: Localized<string> = { ru: "образуй по числу этажей", uk: "утвори за числом поверхів" };
export const DATA_L3_FLOOR: DataItem[] = [
  { q: "1 + етаж (м.р.)", answer: "едноетажен", hint: HINT_FLOOR, rule: FLOOR_RULE, decoys: ["единетажен", "етажен", "едноетажни"] },
  { q: "2 + етаж (м.р.)", answer: "двуетажен", hint: HINT_FLOOR, rule: FLOOR_RULE, decoys: ["дваетажен", "двеетажен", "двуетажни"] },
  { q: "3 + етаж (м.р.)", answer: "триетажен", hint: HINT_FLOOR, rule: FLOOR_RULE, decoys: ["триетажни", "триетажна", "триетажно"] },
  { q: "4 + етаж (м.р.)", answer: "четириетажен", hint: HINT_FLOOR, rule: FLOOR_RULE, decoys: ["четириетажни", "четириетажна", "четиретажен"] },
  { q: "5 + етаж (м.р.)", answer: "пететажен", hint: HINT_FLOOR, rule: FLOOR_RULE, decoys: ["петиетажен", "петнаетажен", "пететажни"] },
  { q: "2 + етаж (ж.р.)", answer: "двуетажна", hint: { ru: "ж.р.", uk: "ж.р." }, rule: FLOOR_RULE, decoys: ["двуетажен", "двуетажно", "двуетажни"] },
  { q: "3 + етаж (мн.ч.)", answer: "триетажни", hint: { ru: "мн.ч.", uk: "мн." }, rule: FLOOR_RULE, decoys: ["триетажен", "триетажна", "триетажно"] },
  { q: "1 + етаж (ж.р.)", answer: "едноетажна", hint: { ru: "ж.р.", uk: "ж.р." }, rule: FLOOR_RULE, decoys: ["едноетажен", "едноетажно", "едноетажни"] },
];

// --- Дни недели ---
const DAYS_RULE: Localized<string> = {
  ru: "Дни недели: понеделник, вторник, сряда, четвъртък, петък, събота, неделя.",
  uk: "Дні тижня: понеделник, вторник, сряда, четвъртък, петък, събота, неделя.",
};
const HINT_DAY: Localized<string> = { ru: "день недели", uk: "день тижня" };
export const DATA_L3_DAYS: DataItem[] = [
  { q: "понедельник / понеділок", answer: "понеделник", hint: HINT_DAY, rule: DAYS_RULE, decoys: ["вторник", "петък", "неделя"] },
  { q: "вторник / вівторок", answer: "вторник", hint: HINT_DAY, rule: DAYS_RULE, decoys: ["понеделник", "сряда", "събота"] },
  { q: "среда / середа", answer: "сряда", hint: HINT_DAY, rule: DAYS_RULE, decoys: ["вторник", "четвъртък", "петък"] },
  { q: "четверг / четвер", answer: "четвъртък", hint: HINT_DAY, rule: DAYS_RULE, decoys: ["сряда", "петък", "събота"] },
  { q: "пятница / п'ятниця", answer: "петък", hint: HINT_DAY, rule: DAYS_RULE, decoys: ["четвъртък", "събота", "неделя"] },
  { q: "суббота / субота", answer: "събота", hint: HINT_DAY, rule: DAYS_RULE, decoys: ["петък", "неделя", "понеделник"] },
  { q: "воскресенье / неділя", answer: "неделя", hint: HINT_DAY, rule: DAYS_RULE, decoys: ["събота", "понеделник", "сряда"] },
];

// --- Месяцы ---
const MONTH_RULE: Localized<string> = {
  ru: "Месяцы: януари, февруари, март, април, май, юни, юли, август, септември, октомври, ноември, декември.",
  uk: "Місяці: януари, февруари, март, април, май, юни, юли, август, септември, октомври, ноември, декември.",
};
const HINT_MONTH: Localized<string> = { ru: "месяц", uk: "місяць" };
export const DATA_L3_MONTHS: DataItem[] = [
  { q: "январь / січень", answer: "януари", hint: HINT_MONTH, rule: MONTH_RULE, decoys: ["февруари", "юни", "декември"] },
  { q: "февраль / лютий", answer: "февруари", hint: HINT_MONTH, rule: MONTH_RULE, decoys: ["януари", "март", "май"] },
  { q: "март / березень", answer: "март", hint: HINT_MONTH, rule: MONTH_RULE, decoys: ["април", "февруари", "май"] },
  { q: "апрель / квітень", answer: "април", hint: HINT_MONTH, rule: MONTH_RULE, decoys: ["март", "май", "юни"] },
  { q: "май / травень", answer: "май", hint: HINT_MONTH, rule: MONTH_RULE, decoys: ["април", "юни", "юли"] },
  { q: "июнь / червень", answer: "юни", hint: HINT_MONTH, rule: MONTH_RULE, decoys: ["юли", "май", "август"] },
  { q: "июль / липень", answer: "юли", hint: HINT_MONTH, rule: MONTH_RULE, decoys: ["юни", "август", "септември"] },
  { q: "август / серпень", answer: "август", hint: HINT_MONTH, rule: MONTH_RULE, decoys: ["юли", "септември", "октомври"] },
  { q: "сентябрь / вересень", answer: "септември", hint: HINT_MONTH, rule: MONTH_RULE, decoys: ["август", "октомври", "ноември"] },
  { q: "октябрь / жовтень", answer: "октомври", hint: HINT_MONTH, rule: MONTH_RULE, decoys: ["септември", "ноември", "декември"] },
  { q: "ноябрь / листопад", answer: "ноември", hint: HINT_MONTH, rule: MONTH_RULE, decoys: ["октомври", "декември", "септември"] },
  { q: "декабрь / грудень", answer: "декември", hint: HINT_MONTH, rule: MONTH_RULE, decoys: ["ноември", "януари", "октомври"] },
];

// --- Наречия места ---
const LOC_ADV_RULE: Localized<string> = {
  ru: "Наречия места: долу ⇔ горе; отпред ⇔ отзад; отляво ⇔ отдясно. Но: от ляво на дясно.",
  uk: "Прислівники місця: долу ⇔ горе; отпред ⇔ отзад; отляво ⇔ отдясно. Але: от ляво на дясно.",
};
const HINT_LOC: Localized<string> = { ru: "наречие места", uk: "прислівник місця" };
export const DATA_L3_LOC_ADV: DataItem[] = [
  { q: "внизу", answer: "долу", hint: HINT_LOC, rule: LOC_ADV_RULE, decoys: ["горе", "отпред", "отзад"] },
  { q: "вверху / вгорі", answer: "горе", hint: HINT_LOC, rule: LOC_ADV_RULE, decoys: ["долу", "отляво", "отдясно"] },
  { q: "спереди / спереду", answer: "отпред", hint: HINT_LOC, rule: LOC_ADV_RULE, decoys: ["отзад", "отляво", "отдясно"] },
  { q: "сзади / ззаду", answer: "отзад", hint: HINT_LOC, rule: LOC_ADV_RULE, decoys: ["отпред", "долу", "горе"] },
  { q: "слева / зліва", answer: "отляво", hint: HINT_LOC, rule: LOC_ADV_RULE, decoys: ["отдясно", "отпред", "отзад"] },
  { q: "справа", answer: "отдясно", hint: HINT_LOC, rule: LOC_ADV_RULE, decoys: ["отляво", "горе", "долу"] },
];

// --- Числа (подростковые/десятки/сотни) ---
const NUM_L3_RULE: Localized<string> = {
  ru: "11–19 на -надесет; 20–90 десятки -десет; 100=сто, 200=двеста, 300=триста, 400–900 на -стотин, 1000=хиляда.",
  uk: "11–19 на -надесет; 20–90 десятки -десет; 100=сто, 200=двеста, 300=триста, 400–900 на -стотин, 1000=хиляда.",
};
const HINT_NUM_L3: Localized<string> = { ru: "число → слово", uk: "число → слово" };
export const DATA_L3_NUM: DataItem[] = [
  { q: "11", answer: "единадесет", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["единайдесет", "единдесет", "дванадесет"] },
  { q: "12", answer: "дванадесет", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["двадесет", "двеста", "двенадесет"] },
  { q: "13", answer: "тринадесет", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["тридесет", "триста", "тринайдесет"] },
  { q: "14", answer: "четиринадесет", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["четиридесет", "четиринайсет", "четирдесет"] },
  { q: "15", answer: "петнадесет", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["петдесет", "петстотин", "петнайдесет"] },
  { q: "20", answer: "двадесет", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["дванадесет", "двеста", "двадесетна"] },
  { q: "30", answer: "тридесет", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["тринадесет", "триста", "триждесет"] },
  { q: "50", answer: "петдесет", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["петнадесет", "петстотин", "пет и десет"] },
  { q: "70", answer: "седемдесет", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["седемнадесет", "седемстотин", "седем десет"] },
  { q: "100", answer: "сто", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["хиляда", "двеста", "десет"] },
  { q: "200", answer: "двеста", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["двестотин", "дведесет", "двайсет"] },
  { q: "300", answer: "триста", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["тристотин", "тридесет", "тринадесет"] },
  { q: "500", answer: "петстотин", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["петдесет", "петнадесет", "пестотин"] },
  { q: "1000", answer: "хиляда", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["сто", "милион", "десет хиляди"] },
];

// --- Порядковые числительные ---
const ORD_RULE: Localized<string> = {
  ru: "Порядковые (м.р.): 1-първи, 2-втори, 3-трети, 4-четвърти, 5-пети, 6-шести, 7-седми, 8-осми, 9-девети, 10-десети.",
  uk: "Порядкові (ч.р.): 1-първи, 2-втори, 3-трети, 4-четвърти, 5-пети, 6-шести, 7-седми, 8-осми, 9-девети, 10-десети.",
};
const HINT_ORD: Localized<string> = { ru: "порядковое (м.р.)", uk: "порядкове (ч.р.)" };
export const DATA_L3_ORD: DataItem[] = [
  { q: "1", answer: "първи", hint: HINT_ORD, rule: ORD_RULE, decoys: ["първо", "едно", "един"] },
  { q: "2", answer: "втори", hint: HINT_ORD, rule: ORD_RULE, decoys: ["две", "двама", "второ"] },
  { q: "3", answer: "трети", hint: HINT_ORD, rule: ORD_RULE, decoys: ["три", "трима", "трето"] },
  { q: "4", answer: "четвърти", hint: HINT_ORD, rule: ORD_RULE, decoys: ["четири", "четвърто", "четиринадесет"] },
  { q: "5", answer: "пети", hint: HINT_ORD, rule: ORD_RULE, decoys: ["пет", "пето", "петнадесет"] },
  { q: "6", answer: "шести", hint: HINT_ORD, rule: ORD_RULE, decoys: ["шест", "шесто", "шестнадесет"] },
  { q: "7", answer: "седми", hint: HINT_ORD, rule: ORD_RULE, decoys: ["седем", "седмо", "седемнадесет"] },
  { q: "8", answer: "осми", hint: HINT_ORD, rule: ORD_RULE, decoys: ["осем", "осмо", "осемнадесет"] },
  { q: "9", answer: "девети", hint: HINT_ORD, rule: ORD_RULE, decoys: ["девет", "девето", "деветнадесет"] },
  { q: "10", answer: "десети", hint: HINT_ORD, rule: ORD_RULE, decoys: ["десет", "десето", "двадесети"] },
  { q: "11", answer: "единайсети", hint: HINT_ORD, rule: ORD_RULE, decoys: ["единадесет", "единайсет", "първи"] },
  { q: "20", answer: "двайсети", hint: HINT_ORD, rule: ORD_RULE, decoys: ["двадесет", "двама", "двеста"] },
];

// --- Сопоставление: м. ↔ ж. ---
const HINT_FAM_PAIR: Localized<string> = { ru: "муж. ↔ жен. роль", uk: "чол. ↔ жін. роль" };
export const DATA_L3_MATCH_FAMILY: MatchItem[] = [
  { left: "мъж", right: "жена", hint: HINT_FAM_PAIR },
  { left: "баща", right: "майка", hint: HINT_FAM_PAIR },
  { left: "брат", right: "сестра", hint: HINT_FAM_PAIR },
  { left: "син", right: "дъщеря", hint: HINT_FAM_PAIR },
  { left: "дядо", right: "баба", hint: HINT_FAM_PAIR },
  { left: "съпруг", right: "съпруга", hint: HINT_FAM_PAIR },
  { left: "момче", right: "момиче", hint: HINT_FAM_PAIR },
];

// --- Сопоставление: местоимение ↔ кр. притяжательное ---
const HINT_SHORT_PAIR: Localized<string> = { ru: "местоимение ↔ краткое притяжательное", uk: "займенник ↔ коротке присвійне" };
export const DATA_L3_MATCH_SHORT_POSS: MatchItem[] = [
  { left: "аз", right: "ми", hint: HINT_SHORT_PAIR },
  { left: "ти", right: "ти", hint: HINT_SHORT_PAIR },
  { left: "той", right: "му", hint: HINT_SHORT_PAIR },
  { left: "тя", right: "й", hint: HINT_SHORT_PAIR },
  { left: "ние", right: "ни", hint: HINT_SHORT_PAIR },
  { left: "вие", right: "ви", hint: HINT_SHORT_PAIR },
  { left: "те", right: "им", hint: HINT_SHORT_PAIR },
];

// --- Собери предложение ---
export const DATA_L3_BUILD: BuildItem[] = [
  { words: ["Моят", "баща", "се", "казва", "Иван"], translation: { ru: "Моего отца зовут Иван.", uk: "Мого батька звати Іван." } },
  { words: ["Майка", "ми", "живее", "в", "София"], translation: { ru: "Моя мама живёт в Софии.", uk: "Моя мама живе в Софії." } },
  { words: ["Имам", "една", "сестра", "и", "един", "брат"], translation: { ru: "У меня есть одна сестра и один брат.", uk: "У мене є одна сестра і один брат." } },
  { words: ["Баба", "ми", "е", "на", "седемдесет", "години"], translation: { ru: "Моей бабушке семьдесят лет.", uk: "Моїй бабусі сімдесят років." } },
  { words: ["Те", "живеят", "в", "малка", "къща"], translation: { ru: "Они живут в маленьком доме.", uk: "Вони живуть у маленькому будинку." } },
  { words: ["Нашата", "къща", "е", "двуетажна"], translation: { ru: "Наш дом двухэтажный.", uk: "Наш будинок двоповерховий." } },
  { words: ["Аз", "съм", "роден", "на", "пети", "май"], translation: { ru: "Я родился пятого мая.", uk: "Я народився п'ятого травня." } },
  { words: ["Дядо", "ми", "и", "баба", "ми", "живеят", "на", "село"], translation: { ru: "Мои дедушка и бабушка живут в деревне.", uk: "Мій дідусь і бабуся живуть у селі." } },
  { words: ["На", "колко", "години", "е", "сестра", "ти"], translation: { ru: "Сколько лет твоей сестре?", uk: "Скільки років твоїй сестрі?" } },
  { words: ["Този", "мъж", "е", "баща", "ми"], translation: { ru: "Этот мужчина — мой отец.", uk: "Цей чоловік — мій батько." } },
];

// --- Парадигмы ---
const L3_PRONOUNS = ["Аз", "Ти", "Той", "Ние", "Вие", "Те"];
export const DATA_L3_PARADIGM: ParadigmItem[] = [
  { verb: "живея", pronouns: L3_PRONOUNS, forms: ["живея", "живееш", "живее", "живеем", "живеете", "живеят"], hint: { ru: "жить (I-спряж.)", uk: "жити (I-дієвідм.)" }, rule: ZHIVEYA_RULE },
  { verb: "зная", pronouns: L3_PRONOUNS, forms: ["зная", "знаеш", "знае", "знаем", "знаете", "знаят"], hint: { ru: "знать", uk: "знати" }, rule: ZNAYA_RULE },
  { verb: "следвам", pronouns: L3_PRONOUNS, forms: ["следвам", "следваш", "следва", "следваме", "следвате", "следват"], hint: { ru: "учиться (A-спряж.)", uk: "навчатися (A-дієвідм.)" }, rule: SLEDVAM_RULE },
];

// --- Лишнее слово ---
export const DATA_L3_ODD: OddItem[] = [
  { words: ["майка", "баща", "брат", "стая"], odd: "стая", hint: { ru: "не член семьи", uk: "не член родини" } },
  { words: ["спалня", "кухня", "баня", "сестра"], odd: "сестра", hint: { ru: "не помещение", uk: "не приміщення" } },
  { words: ["дядо", "баща", "брат", "майка"], odd: "майка", hint: { ru: "не мужского рода", uk: "не чоловічого роду" } },
  { words: ["ми", "ти", "му", "този"], odd: "този", hint: { ru: "не краткое притяжательное", uk: "не коротке присвійне" } },
  { words: ["този", "тази", "онова", "следва"], odd: "следва", hint: { ru: "не указательное местоимение", uk: "не вказівний займенник" } },
  { words: ["понеделник", "вторник", "петък", "януари"], odd: "януари", hint: { ru: "не день недели", uk: "не день тижня" } },
  { words: ["януари", "март", "май", "сряда"], odd: "сряда", hint: { ru: "не месяц", uk: "не місяць" } },
  { words: ["първи", "втори", "трети", "пет"], odd: "пет", hint: { ru: "не порядковое", uk: "не порядкове" } },
  { words: ["горе", "долу", "отпред", "кухня"], odd: "кухня", hint: { ru: "не наречие места", uk: "не прислівник місця" } },
  { words: ["живея", "живееш", "живее", "знам"], odd: "знам", hint: { ru: "не форма «живея»", uk: "не форма «живея»" } },
  { words: ["едноетажен", "двуетажен", "триетажен", "петима"], odd: "петима", hint: { ru: "не прилагательное-этажность", uk: "не прикметник-поверховість" } },
];

// --- Притежание «на кого?» ---
const NA_KOGO_RULE: Localized<string> = {
  ru: "Принадлежность через предлог «на»: Мария е майка на Елена. Книгата е на Елена. «На кого?» = чей?",
  uk: "Належність через прийменник «на»: Мария е майка на Елена. Книгата е на Елена. «На кого?» = чий?",
};
const HINT_NA_KOGO: Localized<string> = { ru: "конструкция «на + имя»", uk: "конструкція «на + ім'я»" };
export const DATA_L3_NA_KOGO: DataItem[] = [
  { q: "Книгата е ___ Елена. (чья?)", answer: "на", hint: HINT_NA_KOGO, rule: NA_KOGO_RULE, decoys: ["от", "в", "до"] },
  { q: "Мария е майка ___ Иван. (кому?)", answer: "на", hint: HINT_NA_KOGO, rule: NA_KOGO_RULE, decoys: ["от", "за", "с"] },
  { q: "Това е дъщерята ___ Киро.", answer: "на", hint: HINT_NA_KOGO, rule: NA_KOGO_RULE, decoys: ["от", "до", "в"] },
  { q: "Рада е баба ___ Лили и Борис.", answer: "на", hint: HINT_NA_KOGO, rule: NA_KOGO_RULE, decoys: ["от", "за", "с"] },
  { q: "Чантата е ___ Петър.", answer: "на", hint: HINT_NA_KOGO, rule: NA_KOGO_RULE, decoys: ["от", "в", "до"] },
  { q: "Огнян е баща ___ Киро.", answer: "на", hint: HINT_NA_KOGO, rule: NA_KOGO_RULE, decoys: ["от", "за", "с"] },
  { q: "Телефонният номер е ___ Гергана.", answer: "на", hint: HINT_NA_KOGO, rule: NA_KOGO_RULE, decoys: ["от", "в", "до"] },
  { q: "Синът ___ Таня е на 20 години.", answer: "на", hint: HINT_NA_KOGO, rule: NA_KOGO_RULE, decoys: ["от", "за", "с"] },
];
export const L3_NA_KOGO_OPTIONS = ["на", "от", "в", "до", "с", "за"];

// --- Словарь времени ---
const HINT_TIME: Localized<string> = { ru: "время/период", uk: "час/період" };
export const DATA_L3_TIME: DataItem[] = [
  { q: "день / день", answer: "ден", hint: HINT_TIME, decoys: ["седмица", "месец", "година"] },
  { q: "неделя / тиждень", answer: "седмица", hint: HINT_TIME, decoys: ["ден", "година", "месец"] },
  { q: "месяц / місяць", answer: "месец", hint: HINT_TIME, decoys: ["седмица", "ден", "година"] },
  { q: "год / рік", answer: "година", hint: HINT_TIME, decoys: ["месец", "ден", "седмица"] },
  { q: "сегодня / сьогодні", answer: "днес", hint: HINT_TIME, decoys: ["утре", "вчера", "сега"] },
  { q: "завтра", answer: "утре", hint: HINT_TIME, decoys: ["днес", "вчера", "сега"] },
  { q: "вчера", answer: "вчера", hint: HINT_TIME, decoys: ["утре", "днес", "сега"] },
];

// --- Вопросительные слова (упр. 18) ---
const QWORDS_RULE: Localized<string> = {
  ru: "Вопросительные: откъде (откуда), какъв (м.р.), какви (мн.ч.), колко (сколько), как (как), кога (когда).",
  uk: "Питальні: откъде (звідки), какъв (ч.р.), какви (мн.), колко (скільки), как (як), кога (коли).",
};
export const DATA_L3_QWORDS: DataItem[] = [
  { q: "___ си? — От България.", answer: "откъде", hint: { ru: "откуда", uk: "звідки" }, rule: QWORDS_RULE },
  { q: "___ си по професия? — Инженер.", answer: "какъв", hint: { ru: "какой (м.р.)", uk: "який (ч.р.)" }, rule: QWORDS_RULE },
  { q: "___ езици говориш? — Български и английски.", answer: "какви", hint: { ru: "какие (мн.ч.)", uk: "які (мн.)" }, rule: QWORDS_RULE },
  { q: "На ___ години си? — На 24.", answer: "колко", hint: { ru: "сколько", uk: "скільки" }, rule: QWORDS_RULE },
  { q: "___ стаи има апартаментът? — Три.", answer: "колко", hint: { ru: "сколько", uk: "скільки" }, rule: QWORDS_RULE },
  { q: "___ се казва сестра ти? — Ваня.", answer: "как", hint: { ru: "как зовут", uk: "як звати" }, rule: QWORDS_RULE },
  { q: "___ си роден? — На 29.08.1979 г.", answer: "кога", hint: { ru: "когда", uk: "коли" }, rule: QWORDS_RULE },
  { q: "___ живееш? — В София.", answer: "къде", hint: { ru: "где", uk: "де" }, rule: QWORDS_RULE },
  { q: "___ е майка ти по националност? — Българка.", answer: "каква", hint: { ru: "какая (ж.р.)", uk: "яка (ж.р.)" }, rule: QWORDS_RULE },
];
export const L3_QWORDS_OPTIONS = ["откъде", "какъв", "каква", "какви", "колко", "как", "кога", "къде"];

// --- Глагол «занимавам се» ---
const ZANIMAVAM_RULE: Localized<string> = {
  ru: "«занимавам се с» (заниматься чем-л., A-спряж.): занимавам се/занимаваш се/занимава се · занимаваме се/занимавате се/занимават се.",
  uk: "«занимавам се с» (займатися чим-небудь, A-дієвідм.): занимавам се/занимаваш се/занимава се · занимаваме се/занимавате се/занимават се.",
};
export const DATA_L3_ZANIMAVAM: DataItem[] = [
  { q: "Аз", answer: "занимавам се", hint: { ru: "я занимаюсь", uk: "я займаюся" }, rule: ZANIMAVAM_RULE },
  { q: "Ти", answer: "занимаваш се", hint: { ru: "ты занимаешься", uk: "ти займаєшся" }, rule: ZANIMAVAM_RULE },
  { q: "Той/Тя/То", answer: "занимава се", hint: { ru: "он занимается", uk: "він займається" }, rule: ZANIMAVAM_RULE },
  { q: "Ние", answer: "занимаваме се", hint: { ru: "мы занимаемся", uk: "ми займаємося" }, rule: ZANIMAVAM_RULE },
  { q: "Вие", answer: "занимавате се", hint: { ru: "вы занимаетесь", uk: "ви займаєтеся" }, rule: ZANIMAVAM_RULE },
  { q: "Те", answer: "занимават се", hint: { ru: "они занимаются", uk: "вони займаються" }, rule: ZANIMAVAM_RULE },
];

// --- Даты: «05.05 → пети май» (build) ---
export const DATA_L3_DATE_BUILD: BuildItem[] = [
  { words: ["Днес", "е", "осми", "август"], translation: { ru: "Сегодня восьмое августа.", uk: "Сьогодні восьме серпня." } },
  { words: ["Аз", "съм", "роден", "на", "пети", "май"], translation: { ru: "Я родился пятого мая.", uk: "Я народився п'ятого травня." } },
  { words: ["Майка", "ми", "е", "родена", "на", "първи", "януари"], translation: { ru: "Моя мама родилась первого января.", uk: "Моя мама народилася першого січня." } },
  { words: ["На", "колко", "години", "си"], translation: { ru: "Сколько тебе лет?", uk: "Скільки тобі років?" } },
  { words: ["Аз", "съм", "на", "двайсет", "години"], translation: { ru: "Мне двадцать лет.", uk: "Мені двадцять років." } },
  { words: ["Кога", "е", "рожденият", "ти", "ден"], translation: { ru: "Когда у тебя день рождения?", uk: "Коли у тебе день народження?" } },
  { words: ["Днес", "е", "петък"], translation: { ru: "Сегодня пятница.", uk: "Сьогодні п'ятниця." } },
  { words: ["Утре", "е", "събота"], translation: { ru: "Завтра суббота.", uk: "Завтра субота." } },
];
