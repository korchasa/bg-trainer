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
  { q: "комната / кімната", answer: "стая", hint: HINT_HOUSE, decoys: ["спалня", "кухня", "коридор"] },
  { q: "семья (дом) / родина (дім)", answer: "семейство", hint: HINT_HOUSE, decoys: ["къща", "родител", "дете"] },
  { q: "село / село", answer: "село", hint: HINT_HOUSE, decoys: ["къща", "град", "етаж"] },
  { q: "город / місто", answer: "град", hint: HINT_HOUSE, decoys: ["село", "къща", "етаж"] },
  { q: "одноэтажный (дом) / одноповерховий", answer: "едноетажен", hint: HINT_HOUSE, decoys: ["двуетажен", "триетажен", "етаж"] },
  { q: "двухэтажный / двоповерховий", answer: "двуетажен", hint: HINT_HOUSE, decoys: ["едноетажен", "триетажен", "етаж"] },
  { q: "большой / великий", answer: "голям", hint: HINT_HOUSE, decoys: ["малък", "стар", "нов"] },
  { q: "маленький / маленький", answer: "малък", hint: HINT_HOUSE, decoys: ["голям", "стар", "нов"] },
  { q: "новый / новий", answer: "нов", hint: HINT_HOUSE, decoys: ["стар", "голям", "малък"] },
  { q: "старый / старий", answer: "стар", hint: HINT_HOUSE, decoys: ["нов", "голям", "малък"] },
  { q: "квартира (синоним) / помешкання", answer: "жилище", hint: HINT_HOUSE, decoys: ["къща", "апартамент", "етаж"] },
  { q: "адрес / адреса", answer: "адрес", hint: HINT_HOUSE, decoys: ["улица", "град", "село"] },
  { q: "улица / вулиця", answer: "улица", hint: HINT_HOUSE, decoys: ["адрес", "град", "село"] },
  { q: "номер (телефонный) / номер", answer: "номер", hint: HINT_HOUSE, decoys: ["адрес", "улица", "етаж"] },
  { q: "фотография / фотографія", answer: "снимка", hint: HINT_HOUSE, decoys: ["писмо", "книга", "номер"] },
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
  { q: "мама (разг.) / мама", answer: "мама", hint: HINT_FAM, decoys: ["майка", "баба", "сестра"] },
  { q: "папа (разг.) / тато", answer: "татко", hint: HINT_FAM, decoys: ["баща", "дядо", "брат"] },
  { q: "папа (разг., вар.) / тато (вар.)", answer: "тате", hint: HINT_FAM, decoys: ["татко", "баща", "дядо"] },
  { q: "родители / батьки", answer: "родители", hint: HINT_FAM, decoys: ["родител", "деца", "семейство"] },
  { q: "дети / діти", answer: "деца", hint: HINT_FAM, decoys: ["дете", "момчета", "родители"] },
  { q: "семья / родина", answer: "семейство", hint: HINT_FAM, decoys: ["роднини", "родител", "къща"] },
  { q: "родственники / родичі", answer: "роднини", hint: HINT_FAM, decoys: ["семейство", "родители", "приятели"] },
  { q: "друг / друг", answer: "приятел", hint: HINT_FAM, decoys: ["роднина", "брат", "съпруг"] },
  { q: "подруга / подруга", answer: "приятелка", hint: HINT_FAM, decoys: ["сестра", "майка", "роднина"] },
  { q: "женатый / одружений", answer: "женен", hint: HINT_FAM, decoys: ["омъжена", "съпруг", "мъж"] },
  { q: "замужняя / одружена", answer: "омъжена", hint: HINT_FAM, decoys: ["женен", "съпруга", "жена"] },
  { q: "ученик (школьник) / учень", answer: "ученик", hint: HINT_FAM, decoys: ["студент", "момче", "син"] },
  { q: "ученица / учениця", answer: "ученичка", hint: HINT_FAM, decoys: ["студентка", "момиче", "дъщеря"] },
  { q: "собака / собака", answer: "куче", hint: HINT_FAM, decoys: ["дете", "момче", "момиче"] },
  { q: "имя / ім'я", answer: "име", hint: HINT_FAM, decoys: ["фамилия", "професия", "възраст"] },
  { q: "фамилия / прізвище", answer: "фамилия", hint: HINT_FAM, decoys: ["име", "професия", "националност"] },
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
  { q: "Аз и брат ___ живеем в София. (мой)", answer: "ми", hint: { ru: "мой (аз)", uk: "мій (аз)" }, rule: POSS_SHORT_RULE },
  { q: "Той е тук. Сестра ___ също е тук.", answer: "му", hint: { ru: "его (той)", uk: "його (той)" }, rule: POSS_SHORT_RULE },
  { q: "Ние имаме куче. Кучето ___ се казва Бънди.", answer: "ни", hint: { ru: "наше (ние)", uk: "наше (ние)" }, rule: POSS_SHORT_RULE },
  { q: "Деца, родителите ___ са в къщи.", answer: "ви", hint: { ru: "ваши (вие)", uk: "ваші (вие)" }, rule: POSS_SHORT_RULE },
  { q: "Те имат син. Синът ___ е студент.", answer: "им", hint: { ru: "их (те)", uk: "їхній (те)" }, rule: POSS_SHORT_RULE },
  { q: "Тя обича майка ___. (свою)", answer: "си", hint: { ru: "возвратное (свою)", uk: "зворотне (свою)" }, rule: POSS_SHORT_RULE },
  { q: "Иване, как се казва баща ___?", answer: "ти", hint: { ru: "твой (ти)", uk: "твій (ти)" }, rule: POSS_SHORT_RULE },
  { q: "Аз обичам баба ___ и дядо ___. (моих)", answer: "ми", hint: { ru: "мои (аз)", uk: "мої (аз)" }, rule: POSS_SHORT_RULE },
  { q: "Той живее със съпругата ___. (своей)", answer: "си", hint: { ru: "возвратное (со своей)", uk: "зворотне (зі своєю)" }, rule: POSS_SHORT_RULE },
  { q: "Лили и Борис са деца. Майка ___ се казва Сия.", answer: "им", hint: { ru: "их (те)", uk: "їхня (те)" }, rule: POSS_SHORT_RULE },
  { q: "Ние сме студенти. Преподавателите ___ са млади.", answer: "ни", hint: { ru: "наши (ние)", uk: "наші (ние)" }, rule: POSS_SHORT_RULE },
  { q: "Тя има дъщеря. Дъщеря ___ е малка.", answer: "й", hint: { ru: "её (тя)", uk: "її (тя)" }, rule: POSS_SHORT_RULE },
  { q: "Той има брат. Брат ___ е инженер.", answer: "му", hint: { ru: "его (той)", uk: "його (той)" }, rule: POSS_SHORT_RULE },
  { q: "Госпожо, как се казва съпругът ___?", answer: "ви", hint: { ru: "ваш (вие, вежл.)", uk: "ваш (вие, ввічл.)" }, rule: POSS_SHORT_RULE },
  { q: "Те живеят в къщата ___. (своей)", answer: "си", hint: { ru: "возвратное (в своём)", uk: "зворотне (у своїй)" }, rule: POSS_SHORT_RULE },
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
  { q: "жена + ми", answer: "жена ми", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["жената ми", "жените ми", "жени ми"] },
  { q: "съпруга + ми", answer: "съпруга ми", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["съпругата ми", "съпругите ми", "съпруги ми"] },
  { q: "братя + ми", answer: "братята ми", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["братя ми", "братите ми", "братове ми"] },
  { q: "сестри + ми", answer: "сестрите ми", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["сестри ми", "сестрата ми", "сестрита ми"] },
  { q: "куче + ми", answer: "кучето ми", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["куче ми", "кучетата ми", "кучета ми"] },
  { q: "къща + ни", answer: "къщата ни", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["къща ни", "къщите ни", "къщи ни"] },
  { q: "апартамент + ми", answer: "апартаментът ми", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["апартамент ми", "апартамента ми", "апартаментите ми"] },
  { q: "семейство + ми", answer: "семейството ми", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["семейство ми", "семействата ми", "семейства ми"] },
  { q: "роднини + ми", answer: "роднините ми", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["роднини ми", "роднината ми", "роднина ми"] },
  { q: "син + им", answer: "синът им", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["син им", "сина им", "синовете им"] },
  { q: "майка + й", answer: "майка й", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["майката й", "майките й", "майки й"] },
  { q: "баща + му", answer: "баща му", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["бащата му", "бащите му", "бащи му"] },
  { q: "чанта + ти", answer: "чантата ти", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["чанта ти", "чантите ти", "чанти ти"] },
  { q: "име + му", answer: "името му", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["име му", "имена му", "имената му"] },
  { q: "телефон + ми", answer: "телефонът ми", hint: HINT_ART_FAM, rule: POSS_ART_RULE, decoys: ["телефон ми", "телефона ми", "телефоните ми"] },
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
  { q: "___ мъж е баща ми. (близо)", answer: "този", hint: HINT_NEAR_M, rule: DEMO_RULE },
  { q: "___ момиче е сестра ми. (близо)", answer: "това", hint: HINT_NEAR_N, rule: DEMO_RULE },
  { q: "___ книга е интересна. (далече)", answer: "онази", hint: HINT_FAR_F, rule: DEMO_RULE },
  { q: "___ стол е стар. (далече)", answer: "онзи", hint: HINT_FAR_M, rule: DEMO_RULE },
  { q: "___ деца са много добри. (близо)", answer: "тези", hint: HINT_NEAR_PL, rule: DEMO_RULE },
  { q: "___ апартамент е голям. (близо)", answer: "този", hint: HINT_NEAR_M, rule: DEMO_RULE },
  { q: "___ кухня е малка. (близо)", answer: "тази", hint: HINT_NEAR_F, rule: DEMO_RULE },
  { q: "___ село е красиво. (далече)", answer: "онова", hint: HINT_FAR_N, rule: DEMO_RULE },
  { q: "___ град е столица. (далече)", answer: "онзи", hint: HINT_FAR_M, rule: DEMO_RULE },
  { q: "___ улица е тиха. (близо)", answer: "тази", hint: HINT_NEAR_F, rule: DEMO_RULE },
  { q: "___ снимки са нови. (далече)", answer: "онези", hint: HINT_FAR_PL, rule: DEMO_RULE },
  { q: "___ номер е на Иван. (близо)", answer: "този", hint: HINT_NEAR_M, rule: DEMO_RULE },
  { q: "___ куче е на сестра ми. (близо)", answer: "това", hint: HINT_NEAR_N, rule: DEMO_RULE },
  { q: "___ родители са млади. (далече)", answer: "онези", hint: HINT_FAR_PL, rule: DEMO_RULE },
  { q: "___ адрес е на баща ми. (близо)", answer: "този", hint: HINT_NEAR_M, rule: DEMO_RULE },
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
  { q: "2 + етаж (ср.р.)", answer: "двуетажно", hint: { ru: "ср.р.", uk: "с.р." }, rule: FLOOR_RULE, decoys: ["двуетажен", "двуетажна", "двуетажни"] },
  { q: "3 + етаж (ж.р.)", answer: "триетажна", hint: { ru: "ж.р.", uk: "ж.р." }, rule: FLOOR_RULE, decoys: ["триетажен", "триетажно", "триетажни"] },
  { q: "1 + етаж (ср.р.)", answer: "едноетажно", hint: { ru: "ср.р.", uk: "с.р." }, rule: FLOOR_RULE, decoys: ["едноетажен", "едноетажна", "едноетажни"] },
  { q: "1 + етаж (мн.ч.)", answer: "едноетажни", hint: { ru: "мн.ч.", uk: "мн." }, rule: FLOOR_RULE, decoys: ["едноетажен", "едноетажна", "едноетажно"] },
  { q: "4 + етаж (ж.р.)", answer: "четириетажна", hint: { ru: "ж.р.", uk: "ж.р." }, rule: FLOOR_RULE, decoys: ["четириетажен", "четириетажно", "четириетажни"] },
  { q: "5 + етаж (мн.ч.)", answer: "пететажни", hint: { ru: "мн.ч.", uk: "мн." }, rule: FLOOR_RULE, decoys: ["пететажен", "пететажна", "пететажно"] },
  { q: "6 + етаж (м.р.)", answer: "шестетажен", hint: HINT_FLOOR, rule: FLOOR_RULE, decoys: ["шестиетажен", "шестетажни", "шестетажна"] },
  { q: "10 + етаж (м.р.)", answer: "десететажен", hint: HINT_FLOOR, rule: FLOOR_RULE, decoys: ["десетиетажен", "десететажни", "десететажен"] },
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
  { q: "16", answer: "шестнадесет", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["шейсет", "шестстотин", "шестнайдесет"] },
  { q: "17", answer: "седемнадесет", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["седемдесет", "седемстотин", "седемнайдесет"] },
  { q: "18", answer: "осемнадесет", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["осемдесет", "осемстотин", "осемнайдесет"] },
  { q: "19", answer: "деветнадесет", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["деветдесет", "деветстотин", "деветнайдесет"] },
  { q: "40", answer: "четиридесет", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["четиринадесет", "четиристотин", "четирдесет"] },
  { q: "60", answer: "шестдесет", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["шестнадесет", "шестстотин", "шейдесет"] },
  { q: "80", answer: "осемдесет", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["осемнадесет", "осемстотин", "осем десет"] },
  { q: "90", answer: "деветдесет", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["деветнадесет", "деветстотин", "девет десет"] },
  { q: "400", answer: "четиристотин", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["четиридесет", "четиристо", "четиристотина"] },
  { q: "600", answer: "шестстотин", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["шестдесет", "шестсто", "шестотин"] },
  { q: "700", answer: "седемстотин", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["седемдесет", "седемсто", "седемстотина"] },
  { q: "800", answer: "осемстотин", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["осемдесет", "осемсто", "осемстотина"] },
  { q: "900", answer: "деветстотин", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["деветдесет", "деветсто", "деветстотина"] },
  { q: "22", answer: "двадесет и две", hint: HINT_NUM_L3, rule: NUM_L3_RULE, decoys: ["двадесетдве", "двадесет две", "двадесет и два"] },
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
  { q: "12", answer: "дванайсети", hint: HINT_ORD, rule: ORD_RULE, decoys: ["дванадесет", "дванайсет", "втори"] },
  { q: "13", answer: "тринайсети", hint: HINT_ORD, rule: ORD_RULE, decoys: ["тринадесет", "тринайсет", "трети"] },
  { q: "14", answer: "четиринайсети", hint: HINT_ORD, rule: ORD_RULE, decoys: ["четиринадесет", "четиринайсет", "четвърти"] },
  { q: "15", answer: "петнайсети", hint: HINT_ORD, rule: ORD_RULE, decoys: ["петнадесет", "петнайсет", "пети"] },
  { q: "16", answer: "шестнайсети", hint: HINT_ORD, rule: ORD_RULE, decoys: ["шестнадесет", "шестнайсет", "шести"] },
  { q: "17", answer: "седемнайсети", hint: HINT_ORD, rule: ORD_RULE, decoys: ["седемнадесет", "седемнайсет", "седми"] },
  { q: "18", answer: "осемнайсети", hint: HINT_ORD, rule: ORD_RULE, decoys: ["осемнадесет", "осемнайсет", "осми"] },
  { q: "19", answer: "деветнайсети", hint: HINT_ORD, rule: ORD_RULE, decoys: ["деветнадесет", "деветнайсет", "девети"] },
  { q: "21", answer: "двайсет и първи", hint: HINT_ORD, rule: ORD_RULE, decoys: ["двайсет първи", "двадесет и първи", "двайсетпърви"] },
  { q: "22", answer: "двайсет и втори", hint: HINT_ORD, rule: ORD_RULE, decoys: ["двайсет втори", "двадесет и втори", "двайсетвтори"] },
  { q: "23", answer: "двайсет и трети", hint: HINT_ORD, rule: ORD_RULE, decoys: ["двайсет трети", "двадесет и трети", "двайсеттрети"] },
  { q: "25", answer: "двайсет и пети", hint: HINT_ORD, rule: ORD_RULE, decoys: ["двайсет пети", "двадесет и пети", "двайсетпети"] },
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
  { words: ["Имаме", "две", "деца", "—", "момче", "и", "момиче"], translation: { ru: "У нас есть двое детей — мальчик и девочка.", uk: "У нас є двоє дітей — хлопчик і дівчинка." } },
  { words: ["Аз", "следвам", "информатика", "в", "София"], translation: { ru: "Я учусь на информатике в Софии.", uk: "Я навчаюся на інформатиці в Софії." } },
  { words: ["Брат", "ми", "е", "на", "двайсет", "години"], translation: { ru: "Моему брату двадцать лет.", uk: "Моєму брату двадцять років." } },
  { words: ["Сестра", "ми", "говори", "английски", "и", "немски"], translation: { ru: "Моя сестра говорит по-английски и по-немецки.", uk: "Моя сестра розмовляє англійською і німецькою." } },
  { words: ["Това", "е", "нашето", "семейство"], translation: { ru: "Это наша семья.", uk: "Це наша родина." } },
  { words: ["Родителите", "ми", "живеят", "в", "голяма", "къща"], translation: { ru: "Мои родители живут в большом доме.", uk: "Мої батьки живуть у великому будинку." } },
  { words: ["Кучето", "ни", "се", "казва", "Бънди"], translation: { ru: "Нашу собаку зовут Бънди.", uk: "Наш собака зветься Бънди." } },
  { words: ["Аз", "се", "занимавам", "с", "фотография"], translation: { ru: "Я занимаюсь фотографией.", uk: "Я займаюся фотографією." } },
  { words: ["Баща", "ми", "е", "инженер", "по", "професия"], translation: { ru: "Мой отец инженер по профессии.", uk: "Мій батько інженер за професією." } },
  { words: ["Откъде", "си", "по", "националност"], translation: { ru: "Откуда ты по национальности?", uk: "Звідки ти за національністю?" } },
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
  { words: ["баба", "сестра", "дъщеря", "мъж"], odd: "мъж", hint: { ru: "не женского рода", uk: "не жіночого роду" } },
  { words: ["син", "дъщеря", "брат", "стая"], odd: "стая", hint: { ru: "не член семьи", uk: "не член родини" } },
  { words: ["къща", "апартамент", "етаж", "майка"], odd: "майка", hint: { ru: "не жильё", uk: "не житло" } },
  { words: ["днес", "утре", "вчера", "стол"], odd: "стол", hint: { ru: "не время", uk: "не час" } },
  { words: ["ден", "седмица", "месец", "куче"], odd: "куче", hint: { ru: "не период времени", uk: "не період часу" } },
  { words: ["събота", "неделя", "сряда", "май"], odd: "май", hint: { ru: "не день недели", uk: "не день тижня" } },
  { words: ["април", "юни", "октомври", "вторник"], odd: "вторник", hint: { ru: "не месяц", uk: "не місяць" } },
  { words: ["този", "онзи", "тази", "ми"], odd: "ми", hint: { ru: "не указательное", uk: "не вказівний" } },
  { words: ["зная", "знаеш", "знаят", "живея"], odd: "живея", hint: { ru: "не форма «зная»", uk: "не форма «зная»" } },
  { words: ["следвам", "следваш", "следват", "зная"], odd: "зная", hint: { ru: "не форма «следвам»", uk: "не форма «следвам»" } },
  { words: ["първи", "пети", "десети", "три"], odd: "три", hint: { ru: "не порядковое", uk: "не порядкове" } },
  { words: ["сто", "двеста", "триста", "трети"], odd: "трети", hint: { ru: "не сотня", uk: "не сотня" } },
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
  { q: "Кучето е ___ Камен.", answer: "на", hint: HINT_NA_KOGO, rule: NA_KOGO_RULE, decoys: ["от", "в", "до"] },
  { q: "Това е къщата ___ баба ми.", answer: "на", hint: HINT_NA_KOGO, rule: NA_KOGO_RULE, decoys: ["от", "за", "с"] },
  { q: "Снимката е ___ нашето семейство.", answer: "на", hint: HINT_NA_KOGO, rule: NA_KOGO_RULE, decoys: ["от", "в", "до"] },
  { q: "Адресът е ___ Иван.", answer: "на", hint: HINT_NA_KOGO, rule: NA_KOGO_RULE, decoys: ["от", "в", "до"] },
  { q: "Жоро е съпруг ___ Таня.", answer: "на", hint: HINT_NA_KOGO, rule: NA_KOGO_RULE, decoys: ["от", "за", "с"] },
  { q: "Ваня е сестра ___ Камен.", answer: "на", hint: HINT_NA_KOGO, rule: NA_KOGO_RULE, decoys: ["от", "за", "с"] },
  { q: "Това е книгата ___ моята майка.", answer: "на", hint: HINT_NA_KOGO, rule: NA_KOGO_RULE, decoys: ["от", "в", "до"] },
  { q: "Имената ___ децата са Лили и Борис.", answer: "на", hint: HINT_NA_KOGO, rule: NA_KOGO_RULE, decoys: ["от", "за", "с"] },
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
  { q: "сейчас / зараз", answer: "сега", hint: HINT_TIME, decoys: ["днес", "утре", "вчера"] },
  { q: "дата / дата", answer: "дата", hint: HINT_TIME, decoys: ["година", "месец", "ден"] },
  { q: "день рождения / день народження", answer: "рожден ден", hint: HINT_TIME, decoys: ["роден", "годишнина", "ден"] },
  { q: "лет (мне ___ лет) / років", answer: "години", hint: HINT_TIME, decoys: ["година", "месеци", "дни"] },
  { q: "родился (м.р.) / народився", answer: "роден", hint: HINT_TIME, decoys: ["родена", "ражда", "роди"] },
  { q: "родилась (ж.р.) / народилася", answer: "родена", hint: HINT_TIME, decoys: ["роден", "ражда", "роди"] },
  { q: "когда / коли", answer: "кога", hint: HINT_TIME, decoys: ["къде", "как", "колко"] },
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
  { q: "___ си по националност? — Българин.", answer: "какъв", hint: { ru: "какой (м.р.)", uk: "який (ч.р.)" }, rule: QWORDS_RULE },
  { q: "___ е рожденият ти ден? — На 5 май.", answer: "кога", hint: { ru: "когда", uk: "коли" }, rule: QWORDS_RULE },
  { q: "___ е твоят телефон? — 0888...", answer: "какъв", hint: { ru: "какой (м.р.)", uk: "який (ч.р.)" }, rule: QWORDS_RULE },
  { q: "___ е дъщеря ти? — Ученичка.", answer: "каква", hint: { ru: "какая (ж.р.)", uk: "яка (ж.р.)" }, rule: QWORDS_RULE },
  { q: "___ е дете ти? — Малко.", answer: "какво", hint: { ru: "какое (ср.р.)", uk: "яке (с.р.)" }, rule: QWORDS_RULE },
  { q: "___ деца имаш? — Две.", answer: "колко", hint: { ru: "сколько", uk: "скільки" }, rule: QWORDS_RULE },
  { q: "___ работи баща ти? — В офис.", answer: "къде", hint: { ru: "где", uk: "де" }, rule: QWORDS_RULE },
  { q: "___ се занимаваш? — С фотография.", answer: "с какво", hint: { ru: "чем", uk: "чим" }, rule: QWORDS_RULE },
  { q: "___ са родителите ти? — От Пловдив.", answer: "откъде", hint: { ru: "откуда", uk: "звідки" }, rule: QWORDS_RULE },
];
export const L3_QWORDS_OPTIONS = ["откъде", "какъв", "каква", "какво", "какви", "колко", "как", "кога", "къде", "с какво"];

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
  { words: ["Вчера", "беше", "сряда"], translation: { ru: "Вчера была среда.", uk: "Вчора була середа." } },
  { words: ["Баща", "ми", "е", "роден", "на", "трети", "март"], translation: { ru: "Мой отец родился третьего марта.", uk: "Мій батько народився третього березня." } },
  { words: ["Сестра", "ми", "е", "на", "петнайсет", "години"], translation: { ru: "Моей сестре пятнадцать лет.", uk: "Моїй сестрі п'ятнадцять років." } },
  { words: ["Дядо", "ми", "е", "на", "седемдесет", "и", "пет", "години"], translation: { ru: "Моему дедушке семьдесят пять лет.", uk: "Моєму дідусеві сімдесят п'ять років." } },
  { words: ["Кой", "ден", "е", "днес"], translation: { ru: "Какой сегодня день?", uk: "Який сьогодні день?" } },
  { words: ["Днес", "е", "първи", "септември"], translation: { ru: "Сегодня первое сентября.", uk: "Сьогодні перше вересня." } },
  { words: ["Аз", "съм", "роден", "през", "хиляда", "деветстотин", "деветдесет", "и", "пета", "година"], translation: { ru: "Я родился в тысяча девятьсот девяносто пятом году.", uk: "Я народився в тисяча дев'ятсот дев'яносто п'ятому році." } },
  { words: ["В", "седмицата", "има", "седем", "дни"], translation: { ru: "В неделе семь дней.", uk: "У тижні сім днів." } },
];
