import type { DataItem, BuildItem, MatchItem, OddItem, ParadigmItem } from "../types";
import type { Localized } from "../i18n/types";

// ========================= LESSON 7 =========================

// --- Stores vocabulary ---
const HINT_STORE: Localized<string> = { ru: "тип магазина", uk: "тип магазину" };
export const DATA_L7_STORES: DataItem[] = [
  { q: "магазин / магазин", answer: "магазин", hint: HINT_STORE, decoys: ["щанд", "будка", "пазар"] },
  { q: "продуктовый магазин / продуктовий магазин", answer: "магазин за хранителни стоки", hint: HINT_STORE, decoys: ["плод-зеленчук", "хлебарница", "сладкарница"] },
  { q: "магазин одежды / магазин одягу", answer: "магазин за облекло", hint: HINT_STORE, decoys: ["магазин за обувки", "магазин за бельо", "парфюмерия"] },
  { q: "обувной магазин / взуттєвий магазин", answer: "магазин за обувки", hint: HINT_STORE, decoys: ["магазин за облекло", "бижутерия", "сладкарница"] },
  { q: "овощной / овочевий", answer: "плод-зеленчук", hint: HINT_STORE, decoys: ["хлебарница", "магазин за хранителни стоки", "пазар"] },
  { q: "кондитерская / кондитерська", answer: "сладкарница", hint: HINT_STORE, decoys: ["хлебарница", "сладолед", "сладкиш"] },
  { q: "булочная / булочна", answer: "хлебарница", hint: HINT_STORE, decoys: ["сладкарница", "плод-зеленчук", "магазин за хранителни стоки"] },
  { q: "книжный / книгарня", answer: "книжарница", hint: HINT_STORE, decoys: ["парфюмерия", "хлебарница", "будка"] },
  { q: "парфюмерия / парфумерія", answer: "парфюмерия", hint: HINT_STORE, decoys: ["бижутерия", "магазин за облекло", "сладкарница"] },
  { q: "ювелирный / ювелірний", answer: "бижутерия", hint: HINT_STORE, decoys: ["парфюмерия", "магазин за облекло", "будка"] },
  { q: "супермаркет", answer: "супермаркет", hint: HINT_STORE, decoys: ["пазар", "магазин за хранителни стоки", "будка"] },
  { q: "рынок / ринок", answer: "пазар", hint: HINT_STORE, decoys: ["супермаркет", "магазин", "плод-зеленчук"] },
  { q: "киоск / кіоск", answer: "будка", hint: HINT_STORE, decoys: ["щанд", "каса", "витрина"] },
  { q: "прилавок / прилавок", answer: "щанд", hint: HINT_STORE, decoys: ["каса", "будка", "витрина"] },
  { q: "витрина / вітрина", answer: "витрина", hint: HINT_STORE, decoys: ["каса", "опашка", "етикет"] },
  { q: "цветочный / квітковий", answer: "магазин за цветя", hint: HINT_STORE, decoys: ["магазин за бельо", "сувенири", "парфюмерия"] },
];

// --- People in shopping ---
const HINT_SHOP_PEOPLE: Localized<string> = { ru: "роли при покупке", uk: "ролі під час покупки" };
export const DATA_L7_SHOP_PEOPLE: DataItem[] = [
  { q: "продавец / продавець", answer: "продавач", hint: HINT_SHOP_PEOPLE, decoys: ["купувач", "клиент", "касиер"] },
  { q: "продавщица / продавчиня", answer: "продавачка", hint: HINT_SHOP_PEOPLE, decoys: ["клиентка", "касиерка", "купувачка"] },
  { q: "покупатель / покупець", answer: "купувач", hint: HINT_SHOP_PEOPLE, decoys: ["продавач", "клиент", "касиер"] },
  { q: "покупательница / покупчиня", answer: "купувачка", hint: HINT_SHOP_PEOPLE, decoys: ["продавачка", "клиентка", "касиерка"] },
  { q: "клиент / клієнт", answer: "клиент", hint: HINT_SHOP_PEOPLE, decoys: ["купувач", "продавач", "касиер"] },
  { q: "клиентка / клієнтка", answer: "клиентка", hint: HINT_SHOP_PEOPLE, decoys: ["купувачка", "продавачка", "касиерка"] },
  { q: "кассир / касир", answer: "касиер", hint: HINT_SHOP_PEOPLE, decoys: ["продавач", "купувач", "клиент"] },
  { q: "кассирша / касирка", answer: "касиерка", hint: HINT_SHOP_PEOPLE, decoys: ["продавачка", "купувачка", "клиентка"] },
  { q: "хозяин / господар", answer: "господин", hint: HINT_SHOP_PEOPLE, decoys: ["клиент", "продавач", "купувач"] },
  { q: "хозяйка / господиня", answer: "госпожа", hint: HINT_SHOP_PEOPLE, decoys: ["продавачка", "клиентка", "купувачка"] },
];

// --- Shopping concepts ---
const HINT_SHOP_WORDS: Localized<string> = { ru: "термины покупки", uk: "терміни покупки" };
export const DATA_L7_SHOP_WORDS: DataItem[] = [
  { q: "касса / каса", answer: "каса", hint: HINT_SHOP_WORDS, decoys: ["щанд", "опашка", "будка"] },
  { q: "очередь / черга", answer: "опашка", hint: HINT_SHOP_WORDS, decoys: ["каса", "щанд", "ресто"] },
  { q: "цена / ціна", answer: "цена", hint: HINT_SHOP_WORDS, decoys: ["етикет", "качество", "ресто"] },
  { q: "этикетка / етикетка", answer: "етикет", hint: HINT_SHOP_WORDS, decoys: ["цена", "ресто", "касова бележка"] },
  { q: "качество / якість", answer: "качество", hint: HINT_SHOP_WORDS, decoys: ["цена", "размер", "номер"] },
  { q: "сдача / здача", answer: "ресто", hint: HINT_SHOP_WORDS, decoys: ["цена", "етикет", "комисионна"] },
  { q: "деньги / гроші", answer: "пари", hint: HINT_SHOP_WORDS, decoys: ["лев", "стотинки", "ресто"] },
  { q: "лев (валюта)", answer: "лев", hint: HINT_SHOP_WORDS, decoys: ["стотинка", "евро", "долар"] },
  { q: "стотинка (1/100 лева)", answer: "стотинка", hint: HINT_SHOP_WORDS, decoys: ["лев", "цент", "копейка"] },
  { q: "мелочь / дрібні", answer: "дребни", hint: HINT_SHOP_WORDS, decoys: ["пари", "ресто", "точно"] },
  { q: "точно (без сдачи)", answer: "точно", hint: HINT_SHOP_WORDS, decoys: ["около", "към", "приблизително"] },
  { q: "товар / товар", answer: "стока", hint: HINT_SHOP_WORDS, decoys: ["цена", "качество", "етикет"] },
  { q: "пакет / пакет", answer: "пакет", hint: HINT_SHOP_WORDS, decoys: ["бутилка", "кутия", "торба"] },
  { q: "бутылка / пляшка", answer: "бутилка", hint: HINT_SHOP_WORDS, decoys: ["пакет", "кутия", "чаша"] },
  { q: "коробка / коробка", answer: "кутия", hint: HINT_SHOP_WORDS, decoys: ["пакет", "бутилка", "пликче"] },
  { q: "примерочная / примірочна", answer: "пробна", hint: HINT_SHOP_WORDS, decoys: ["каса", "щанд", "витрина"] },
  { q: "размер (одежды) / розмір", answer: "размер", hint: HINT_SHOP_WORDS, decoys: ["номер", "цена", "качество"] },
];

// --- What is sold where (pickOpt) ---
const WHAT_WHERE_RULE: Localized<string> = {
  ru: "Где продают: продукты → магазин за хранителни стоки / супермаркет; овощи/фрукты → плод-зеленчук / пазар; хлеб → хлебарница; торты → сладкарница; учебники → книжарница; косметика → парфюмерия; обувь → магазин за обувки; одежда → магазин за облекло; украшения → бижутерия.",
  uk: "Де продають: продукти → магазин за хранителни стоки / супермаркет; овочі/фрукти → плод-зеленчук / пазар; хліб → хлебарница; торти → сладкарница; підручники → книжарница; косметика → парфюмерия; взуття → магазин за обувки; одяг → магазин за облекло; прикраси → бижутерия.",
};
const HINT_WHAT_WHERE: Localized<string> = { ru: "выбери магазин для этого товара", uk: "обери магазин для цього товару" };
export const DATA_L7_WHAT_WHERE: DataItem[] = [
  { q: "хляб", answer: "хлебарница", hint: HINT_WHAT_WHERE, rule: WHAT_WHERE_RULE },
  { q: "торта", answer: "сладкарница", hint: HINT_WHAT_WHERE, rule: WHAT_WHERE_RULE },
  { q: "кифли", answer: "хлебарница", hint: HINT_WHAT_WHERE, rule: WHAT_WHERE_RULE },
  { q: "учебници", answer: "книжарница", hint: HINT_WHAT_WHERE, rule: WHAT_WHERE_RULE },
  { q: "цветни моливи", answer: "книжарница", hint: HINT_WHAT_WHERE, rule: WHAT_WHERE_RULE },
  { q: "ябълки", answer: "плод-зеленчук", hint: HINT_WHAT_WHERE, rule: WHAT_WHERE_RULE },
  { q: "моркови", answer: "плод-зеленчук", hint: HINT_WHAT_WHERE, rule: WHAT_WHERE_RULE },
  { q: "зеле", answer: "плод-зеленчук", hint: HINT_WHAT_WHERE, rule: WHAT_WHERE_RULE },
  { q: "червило", answer: "парфюмерия", hint: HINT_WHAT_WHERE, rule: WHAT_WHERE_RULE },
  { q: "крем за ръце", answer: "парфюмерия", hint: HINT_WHAT_WHERE, rule: WHAT_WHERE_RULE },
  { q: "сапун", answer: "парфюмерия", hint: HINT_WHAT_WHERE, rule: WHAT_WHERE_RULE },
  { q: "сандали", answer: "магазин за обувки", hint: HINT_WHAT_WHERE, rule: WHAT_WHERE_RULE },
  { q: "джапанки", answer: "магазин за обувки", hint: HINT_WHAT_WHERE, rule: WHAT_WHERE_RULE },
  { q: "яке", answer: "магазин за облекло", hint: HINT_WHAT_WHERE, rule: WHAT_WHERE_RULE },
  { q: "дънки", answer: "магазин за облекло", hint: HINT_WHAT_WHERE, rule: WHAT_WHERE_RULE },
  { q: "вино", answer: "магазин за хранителни стоки", hint: HINT_WHAT_WHERE, rule: WHAT_WHERE_RULE },
  { q: "консерви", answer: "магазин за хранителни стоки", hint: HINT_WHAT_WHERE, rule: WHAT_WHERE_RULE },
  { q: "мляко", answer: "магазин за хранителни стоки", hint: HINT_WHAT_WHERE, rule: WHAT_WHERE_RULE },
  { q: "вестник", answer: "будка", hint: HINT_WHAT_WHERE, rule: WHAT_WHERE_RULE },
  { q: "списание", answer: "будка", hint: HINT_WHAT_WHERE, rule: WHAT_WHERE_RULE },
];
export const L7_WHAT_WHERE_OPTIONS = [
  "хлебарница", "сладкарница", "книжарница", "плод-зеленчук",
  "парфюмерия", "магазин за обувки", "магазин за облекло",
  "магазин за хранителни стоки", "будка", "бижутерия",
];

// --- Shopping verbs paradigms (all conjugation III, -ам) ---
const KUPUVAM_RULE: Localized<string> = {
  ru: "III спряжение (-ам): купувам/купуваш/купува · купуваме/купувате/купуват. Значение: покупать.",
  uk: "III дієвідміна (-ам): купувам/купуваш/купува · купуваме/купувате/купуват. Значення: купувати.",
};
export const DATA_L7_KUPUVAM: DataItem[] = [
  { q: "Аз", answer: "купувам", hint: { ru: "я покупаю", uk: "я купую" }, rule: KUPUVAM_RULE },
  { q: "Ти", answer: "купуваш", hint: { ru: "ты покупаешь", uk: "ти купуєш" }, rule: KUPUVAM_RULE },
  { q: "Той/Тя/То", answer: "купува", hint: { ru: "он покупает", uk: "він купує" }, rule: KUPUVAM_RULE },
  { q: "Ние", answer: "купуваме", hint: { ru: "мы покупаем", uk: "ми купуємо" }, rule: KUPUVAM_RULE },
  { q: "Вие", answer: "купувате", hint: { ru: "вы покупаете", uk: "ви купуєте" }, rule: KUPUVAM_RULE },
  { q: "Те", answer: "купуват", hint: { ru: "они покупают", uk: "вони купують" }, rule: KUPUVAM_RULE },
];

const PRODAVAM_RULE: Localized<string> = {
  ru: "III спряжение (-ам): продавам/продаваш/продава · продаваме/продавате/продават. Значение: продавать.",
  uk: "III дієвідміна (-ам): продавам/продаваш/продава · продаваме/продавате/продават. Значення: продавати.",
};
export const DATA_L7_PRODAVAM: DataItem[] = [
  { q: "Аз", answer: "продавам", hint: { ru: "я продаю", uk: "я продаю" }, rule: PRODAVAM_RULE },
  { q: "Ти", answer: "продаваш", hint: { ru: "ты продаёшь", uk: "ти продаєш" }, rule: PRODAVAM_RULE },
  { q: "Той/Тя/То", answer: "продава", hint: { ru: "он продаёт", uk: "він продає" }, rule: PRODAVAM_RULE },
  { q: "Ние", answer: "продаваме", hint: { ru: "мы продаём", uk: "ми продаємо" }, rule: PRODAVAM_RULE },
  { q: "Вие", answer: "продавате", hint: { ru: "вы продаёте", uk: "ви продаєте" }, rule: PRODAVAM_RULE },
  { q: "Те", answer: "продават", hint: { ru: "они продают", uk: "вони продають" }, rule: PRODAVAM_RULE },
];

const DAVAM_RULE: Localized<string> = {
  ru: "III спряжение (-ам): давам/даваш/дава · даваме/давате/дават. Значение: давать.",
  uk: "III дієвідміна (-ам): давам/даваш/дава · даваме/давате/дават. Значення: давати.",
};
export const DATA_L7_DAVAM: DataItem[] = [
  { q: "Аз", answer: "давам", hint: { ru: "я даю", uk: "я даю" }, rule: DAVAM_RULE },
  { q: "Ти", answer: "даваш", hint: { ru: "ты даёшь", uk: "ти даєш" }, rule: DAVAM_RULE },
  { q: "Той/Тя/То", answer: "дава", hint: { ru: "он даёт", uk: "він дає" }, rule: DAVAM_RULE },
  { q: "Ние", answer: "даваме", hint: { ru: "мы даём", uk: "ми даємо" }, rule: DAVAM_RULE },
  { q: "Вие", answer: "давате", hint: { ru: "вы даёте", uk: "ви даєте" }, rule: DAVAM_RULE },
  { q: "Те", answer: "дават", hint: { ru: "они дают", uk: "вони дають" }, rule: DAVAM_RULE },
];

const PLASCHTAM_RULE: Localized<string> = {
  ru: "III спряжение (-ам): плащам/плащаш/плаща · плащаме/плащате/плащат. Значение: платить.",
  uk: "III дієвідміна (-ам): плащам/плащаш/плаща · плащаме/плащате/плащат. Значення: платити.",
};
export const DATA_L7_PLASCHTAM: DataItem[] = [
  { q: "Аз", answer: "плащам", hint: { ru: "я плачу", uk: "я плачу" }, rule: PLASCHTAM_RULE },
  { q: "Ти", answer: "плащаш", hint: { ru: "ты платишь", uk: "ти платиш" }, rule: PLASCHTAM_RULE },
  { q: "Той/Тя/То", answer: "плаща", hint: { ru: "он платит", uk: "він платить" }, rule: PLASCHTAM_RULE },
  { q: "Ние", answer: "плащаме", hint: { ru: "мы платим", uk: "ми платимо" }, rule: PLASCHTAM_RULE },
  { q: "Вие", answer: "плащате", hint: { ru: "вы платите", uk: "ви платите" }, rule: PLASCHTAM_RULE },
  { q: "Те", answer: "плащат", hint: { ru: "они платят", uk: "вони платять" }, rule: PLASCHTAM_RULE },
];

const PAZARUVAM_RULE: Localized<string> = {
  ru: "III спряжение (-ам): пазарувам/пазаруваш/пазарува · пазаруваме/пазарувате/пазаруват. Значение: ходить за покупками.",
  uk: "III дієвідміна (-ам): пазарувам/пазаруваш/пазарува · пазаруваме/пазарувате/пазаруват. Значення: ходити за покупками.",
};
export const DATA_L7_PAZARUVAM: DataItem[] = [
  { q: "Аз", answer: "пазарувам", hint: { ru: "я хожу по магазинам", uk: "я ходжу по магазинах" }, rule: PAZARUVAM_RULE },
  { q: "Ти", answer: "пазаруваш", hint: { ru: "ты ходишь по магазинам", uk: "ти ходиш по магазинах" }, rule: PAZARUVAM_RULE },
  { q: "Той/Тя/То", answer: "пазарува", hint: { ru: "он ходит по магазинам", uk: "він ходить по магазинах" }, rule: PAZARUVAM_RULE },
  { q: "Ние", answer: "пазаруваме", hint: { ru: "мы ходим по магазинам", uk: "ми ходимо по магазинах" }, rule: PAZARUVAM_RULE },
  { q: "Вие", answer: "пазарувате", hint: { ru: "вы ходите по магазинам", uk: "ви ходите по магазинах" }, rule: PAZARUVAM_RULE },
  { q: "Те", answer: "пазаруват", hint: { ru: "они ходят по магазинам", uk: "вони ходять по магазинах" }, rule: PAZARUVAM_RULE },
];

// --- Shopping verbs vocabulary (recognition) ---
const HINT_SHOP_VERB: Localized<string> = { ru: "глагол шопинга", uk: "дієслово шопінгу" };
export const DATA_L7_SHOP_VERBS: DataItem[] = [
  { q: "покупать / купувати", answer: "купувам", hint: HINT_SHOP_VERB, decoys: ["продавам", "плащам", "избирам"] },
  { q: "продавать / продавати", answer: "продавам", hint: HINT_SHOP_VERB, decoys: ["купувам", "плащам", "давам"] },
  { q: "платить / платити", answer: "плащам", hint: HINT_SHOP_VERB, decoys: ["давам", "купувам", "вземам"] },
  { q: "давать / давати", answer: "давам", hint: HINT_SHOP_VERB, decoys: ["вземам", "плащам", "връщам"] },
  { q: "брать / брати", answer: "вземам", hint: HINT_SHOP_VERB, decoys: ["давам", "избирам", "купувам"] },
  { q: "выбирать / обирати", answer: "избирам", hint: HINT_SHOP_VERB, decoys: ["купувам", "вземам", "разглеждам"] },
  { q: "ходить за покупками / ходити за покупками", answer: "пазарувам", hint: HINT_SHOP_VERB, decoys: ["купувам", "продавам", "разглеждам"] },
  { q: "возвращать / повертати", answer: "връщам", hint: HINT_SHOP_VERB, decoys: ["давам", "вземам", "плащам"] },
  { q: "стоить / коштувати", answer: "струва", hint: HINT_SHOP_VERB, decoys: ["плаща", "дава", "купува"] },
  { q: "должен (быть должен) / винен", answer: "дължа", hint: HINT_SHOP_VERB, decoys: ["трябва", "имам", "плащам"] },
  { q: "взвешивать / зважувати", answer: "тегля", hint: HINT_SHOP_VERB, decoys: ["броя", "плащам", "избирам"] },
  { q: "взвесить (соверш.) / зважити", answer: "претегля", hint: HINT_SHOP_VERB, decoys: ["тегля", "избера", "купя"] },
  { q: "желать / бажати", answer: "желая", hint: HINT_SHOP_VERB, decoys: ["искам", "трябва", "обичам"] },
  { q: "предлагать / пропонувати", answer: "предлагам", hint: HINT_SHOP_VERB, decoys: ["показвам", "помагам", "давам"] },
  { q: "показывать / показувати", answer: "показвам", hint: HINT_SHOP_VERB, decoys: ["разглеждам", "предлагам", "избирам"] },
  { q: "помогать / допомагати", answer: "помагам", hint: HINT_SHOP_VERB, decoys: ["предлагам", "показвам", "давам"] },
  { q: "рассматривать / розглядати", answer: "разглеждам", hint: HINT_SHOP_VERB, decoys: ["показвам", "избирам", "чета"] },
  { q: "ждать / чекати", answer: "чакам", hint: HINT_SHOP_VERB, decoys: ["стоя", "виждам", "разглеждам"] },
];

// --- Comparative degree (по-) ---
const COMP_RULE: Localized<string> = {
  ru: "Сравнительная степень: «по-» + прилагательное (через дефис, ударение на «по́»). Пример: голям → по-голям.",
  uk: "Вищий ступінь: «по-» + прикметник (через дефіс, наголос на «по́»). Приклад: голям → по-голям.",
};
const HINT_COMP: Localized<string> = { ru: "сравнит. степ.: по- + форма", uk: "вищий ступ.: по- + форма" };
const COMP_LABEL: Localized<string> = { ru: "сравнит. степ.", uk: "вищий ступ." };
export const DATA_L7_COMP: DataItem[] = [
  { q: "голям", label: COMP_LABEL, answer: "по-голям", hint: HINT_COMP, rule: COMP_RULE, decoys: ["голям", "най-голям", "по-малък"] },
  { q: "малък", label: COMP_LABEL, answer: "по-малък", hint: HINT_COMP, rule: COMP_RULE, decoys: ["малък", "най-малък", "по-голям"] },
  { q: "млад", label: COMP_LABEL, answer: "по-млад", hint: HINT_COMP, rule: COMP_RULE, decoys: ["млад", "най-млад", "по-стар"] },
  { q: "стар", label: COMP_LABEL, answer: "по-стар", hint: HINT_COMP, rule: COMP_RULE, decoys: ["стар", "най-стар", "по-млад"] },
  { q: "висок", label: COMP_LABEL, answer: "по-висок", hint: HINT_COMP, rule: COMP_RULE, decoys: ["висок", "най-висок", "по-нисък"] },
  { q: "нисък", label: COMP_LABEL, answer: "по-нисък", hint: HINT_COMP, rule: COMP_RULE, decoys: ["нисък", "най-нисък", "по-висок"] },
  { q: "евтин", label: COMP_LABEL, answer: "по-евтин", hint: HINT_COMP, rule: COMP_RULE, decoys: ["евтин", "най-евтин", "по-скъп"] },
  { q: "скъп", label: COMP_LABEL, answer: "по-скъп", hint: HINT_COMP, rule: COMP_RULE, decoys: ["скъп", "най-скъп", "по-евтин"] },
  { q: "хубав", label: COMP_LABEL, answer: "по-хубав", hint: HINT_COMP, rule: COMP_RULE, decoys: ["хубав", "най-хубав", "по-лош"] },
  { q: "лош", label: COMP_LABEL, answer: "по-лош", hint: HINT_COMP, rule: COMP_RULE, decoys: ["лош", "най-лош", "по-хубав"] },
  { q: "тежък", label: COMP_LABEL, answer: "по-тежък", hint: HINT_COMP, rule: COMP_RULE, decoys: ["тежък", "най-тежък", "по-лек"] },
  { q: "лек", label: COMP_LABEL, answer: "по-лек", hint: HINT_COMP, rule: COMP_RULE, decoys: ["лек", "най-лек", "по-тежък"] },
  { q: "много", label: COMP_LABEL, answer: "повече", hint: HINT_COMP, rule: COMP_RULE, decoys: ["много", "най-много", "по-малко"] },
  { q: "малко", label: COMP_LABEL, answer: "по-малко", hint: HINT_COMP, rule: COMP_RULE, decoys: ["малко", "най-малко", "повече"] },
  { q: "класически", label: COMP_LABEL, answer: "по-класически", hint: HINT_COMP, rule: COMP_RULE, decoys: ["класически", "най-класически", "модерен"] },
];

// --- Superlative degree (най-) ---
const SUPER_RULE: Localized<string> = {
  ru: "Превосходная степень: «най-» + прилагательное (через дефис). Пример: голям → най-голям.",
  uk: "Найвищий ступінь: «най-» + прикметник (через дефіс). Приклад: голям → най-голям.",
};
const HINT_SUPER: Localized<string> = { ru: "превосх. степ.: най- + форма", uk: "найвищий ступ.: най- + форма" };
const SUPER_LABEL: Localized<string> = { ru: "превосх. степ.", uk: "найвищий ступ." };
export const DATA_L7_SUPER: DataItem[] = [
  { q: "голям", label: SUPER_LABEL, answer: "най-голям", hint: HINT_SUPER, rule: SUPER_RULE, decoys: ["голям", "по-голям", "най-малък"] },
  { q: "малък", label: SUPER_LABEL, answer: "най-малък", hint: HINT_SUPER, rule: SUPER_RULE, decoys: ["малък", "по-малък", "най-голям"] },
  { q: "млад", label: SUPER_LABEL, answer: "най-млад", hint: HINT_SUPER, rule: SUPER_RULE, decoys: ["млад", "по-млад", "най-стар"] },
  { q: "стар", label: SUPER_LABEL, answer: "най-стар", hint: HINT_SUPER, rule: SUPER_RULE, decoys: ["стар", "по-стар", "най-млад"] },
  { q: "висок", label: SUPER_LABEL, answer: "най-висок", hint: HINT_SUPER, rule: SUPER_RULE, decoys: ["висок", "по-висок", "най-нисък"] },
  { q: "нисък", label: SUPER_LABEL, answer: "най-нисък", hint: HINT_SUPER, rule: SUPER_RULE, decoys: ["нисък", "по-нисък", "най-висок"] },
  { q: "евтин", label: SUPER_LABEL, answer: "най-евтин", hint: HINT_SUPER, rule: SUPER_RULE, decoys: ["евтин", "по-евтин", "най-скъп"] },
  { q: "скъп", label: SUPER_LABEL, answer: "най-скъп", hint: HINT_SUPER, rule: SUPER_RULE, decoys: ["скъп", "по-скъп", "най-евтин"] },
  { q: "хубав", label: SUPER_LABEL, answer: "най-хубав", hint: HINT_SUPER, rule: SUPER_RULE, decoys: ["хубав", "по-хубав", "най-лош"] },
  { q: "лош", label: SUPER_LABEL, answer: "най-лош", hint: HINT_SUPER, rule: SUPER_RULE, decoys: ["лош", "по-лош", "най-хубав"] },
  { q: "тежък", label: SUPER_LABEL, answer: "най-тежък", hint: HINT_SUPER, rule: SUPER_RULE, decoys: ["тежък", "по-тежък", "най-лек"] },
  { q: "лек", label: SUPER_LABEL, answer: "най-лек", hint: HINT_SUPER, rule: SUPER_RULE, decoys: ["лек", "по-лек", "най-тежък"] },
  { q: "много", label: SUPER_LABEL, answer: "най-много", hint: HINT_SUPER, rule: SUPER_RULE, decoys: ["много", "повече", "най-малко"] },
  { q: "малко", label: SUPER_LABEL, answer: "най-малко", hint: HINT_SUPER, rule: SUPER_RULE, decoys: ["малко", "по-малко", "най-много"] },
  { q: "модерен", label: SUPER_LABEL, answer: "най-модерен", hint: HINT_SUPER, rule: SUPER_RULE, decoys: ["модерен", "по-модерен", "най-класически"] },
];

// --- Compare-fill: pick "по" or "най" ---
const COMP_FILL_RULE: Localized<string> = {
  ru: "«по-» — сравнение двух (по-голям от Х). «най-» — выделение из группы (най-голям).",
  uk: "«по-» — порівняння двох (по-голям от Х). «най-» — виділення з групи (най-голям).",
};
const HINT_COMP_FILL_PO: Localized<string> = { ru: "сравнение двух: по-", uk: "порівняння двох: по-" };
const HINT_COMP_FILL_NAY: Localized<string> = { ru: "выделение из группы: най-", uk: "виділення з групи: най-" };
export const DATA_L7_COMP_FILL: DataItem[] = [
  { q: "Жоро е ___-голям от Петърчо.", answer: "по", hint: HINT_COMP_FILL_PO, rule: COMP_FILL_RULE },
  { q: "Мишо е ___-голям от всички.", answer: "най", hint: HINT_COMP_FILL_NAY, rule: COMP_FILL_RULE },
  { q: "Иво е ___-млад от Иван.", answer: "по", hint: HINT_COMP_FILL_PO, rule: COMP_FILL_RULE },
  { q: "Виктор е ___-висок от Мишо.", answer: "по", hint: HINT_COMP_FILL_PO, rule: COMP_FILL_RULE },
  { q: "Кафето е ___-евтино от кока-колата.", answer: "по", hint: HINT_COMP_FILL_PO, rule: COMP_FILL_RULE },
  { q: "Тази стока е ___-скъпа.", answer: "най", hint: HINT_COMP_FILL_NAY, rule: COMP_FILL_RULE },
  { q: "В супермаркета стоките са ___-евтини.", answer: "по", hint: HINT_COMP_FILL_PO, rule: COMP_FILL_RULE },
  { q: "Това е ___-хубавото магазинче в квартала.", answer: "най", hint: HINT_COMP_FILL_NAY, rule: COMP_FILL_RULE },
  { q: "Аз съм ___-малката в семейството.", answer: "най", hint: HINT_COMP_FILL_NAY, rule: COMP_FILL_RULE },
  { q: "Той пита за ___-точната цена.", answer: "най", hint: HINT_COMP_FILL_NAY, rule: COMP_FILL_RULE },
  { q: "Тази блуза е ___-хубава от онази.", answer: "по", hint: HINT_COMP_FILL_PO, rule: COMP_FILL_RULE },
  { q: "5 лева не са ___-много.", answer: "най", hint: HINT_COMP_FILL_NAY, rule: COMP_FILL_RULE },
  { q: "Имам ___-малко пари от теб.", answer: "по", hint: HINT_COMP_FILL_PO, rule: COMP_FILL_RULE },
  { q: "София е ___-големият град.", answer: "най", hint: HINT_COMP_FILL_NAY, rule: COMP_FILL_RULE },
  { q: "Червилото е ___-евтино от парфюма.", answer: "по", hint: HINT_COMP_FILL_PO, rule: COMP_FILL_RULE },
];
export const L7_COMP_FILL_OPTIONS = ["по", "най"];

// --- Diminutives ---
const DIM_RULE: Localized<string> = {
  ru: "Диминутивы образуются суффиксами -че / -ичка / -ичко / -енце: магазин → магазинче, момиче → момиченце, момче → момченце, бъчва → бъчвичка.",
  uk: "Демінутиви утворюються суфіксами -че / -ичка / -ичко / -енце: магазин → магазинче, момиче → момиченце, момче → момченце, бъчва → бъчвичка.",
};
const HINT_DIM: Localized<string> = { ru: "уменьшительная форма", uk: "зменшена форма" };
export const DATA_L7_DIM: DataItem[] = [
  { q: "магазин (мал.)", answer: "магазинче", hint: HINT_DIM, rule: DIM_RULE, decoys: ["магазини", "магазин-малък", "магазинка"] },
  { q: "момиче (мал.)", answer: "момиченце", hint: HINT_DIM, rule: DIM_RULE, decoys: ["момиченка", "момиче-малко", "момчета"] },
  { q: "момче (мал.)", answer: "момченце", hint: HINT_DIM, rule: DIM_RULE, decoys: ["момчета", "момченка", "момче-малко"] },
  { q: "бъчва (мал.)", answer: "бъчвичка", hint: HINT_DIM, rule: DIM_RULE, decoys: ["бъчви", "бъчвенце", "бъчва-малка"] },
  { q: "стая (мал.)", answer: "стайче", hint: HINT_DIM, rule: DIM_RULE, decoys: ["стаи", "стайка", "стая-малка"] },
  { q: "куфар (мал.)", answer: "куфарче", hint: HINT_DIM, rule: DIM_RULE, decoys: ["куфари", "куфарка", "куфар-малък"] },
  { q: "стол (мал.)", answer: "столче", hint: HINT_DIM, rule: DIM_RULE, decoys: ["столове", "столовец", "стол-малък"] },
  { q: "чадър (мал.)", answer: "чадърче", hint: HINT_DIM, rule: DIM_RULE, decoys: ["чадъри", "чадърка", "чадър-малък"] },
  { q: "хляб (мал.)", answer: "хлебче", hint: HINT_DIM, rule: DIM_RULE, decoys: ["хлябове", "хлебица", "хлябче"] },
  { q: "градина (мал.)", answer: "градинка", hint: HINT_DIM, rule: DIM_RULE, decoys: ["градини", "градинче", "градина-малка"] },
  { q: "къща (мал.)", answer: "къщичка", hint: HINT_DIM, rule: DIM_RULE, decoys: ["къщи", "къщенце", "къща-малка"] },
  { q: "село (мал.)", answer: "селце", hint: HINT_DIM, rule: DIM_RULE, decoys: ["села", "селенце", "село-малко"] },
  { q: "прозорец (мал.)", answer: "прозорче", hint: HINT_DIM, rule: DIM_RULE, decoys: ["прозорци", "прозорка", "прозорец-малък"] },
  { q: "дете (мал.)", answer: "детенце", hint: HINT_DIM, rule: DIM_RULE, decoys: ["деца", "детенка", "дете-малко"] },
  { q: "кола (мал.)", answer: "количка", hint: HINT_DIM, rule: DIM_RULE, decoys: ["коли", "колче", "кола-малка"] },
];

// --- Future negative: ще / няма да ---
const SHTE_NYAMA_RULE: Localized<string> = {
  ru: "Будущее: положит. = «ще» + глагол; отрицат. = «няма да» + глагол. Пример: ще купя ⇔ няма да купя.",
  uk: "Майбутнє: ствердж. = «ще» + дієслово; запереч. = «няма да» + дієслово. Приклад: ще купя ⇔ няма да купя.",
};
const HINT_SHTE_POS: Localized<string> = { ru: "положит. форма буд. вр.: ще + гл.", uk: "стверджувальна форма майб. ч.: ще + дієсл." };
const HINT_NYAMA_DA: Localized<string> = { ru: "отрицат. форма буд. вр.: няма да + гл.", uk: "заперечна форма майб. ч.: няма да + дієсл." };
const POS_LABEL: Localized<string> = { ru: "утверждение", uk: "ствердження" };
const NEG_LABEL: Localized<string> = { ru: "отрицание", uk: "заперечення" };
export const DATA_L7_SHTE_NYAMA: DataItem[] = [
  { q: "Утре ___ работя.", label: POS_LABEL, answer: "ще", hint: HINT_SHTE_POS, rule: SHTE_NYAMA_RULE },
  { q: "Утре ___ работя.", label: NEG_LABEL, answer: "няма да", hint: HINT_NYAMA_DA, rule: SHTE_NYAMA_RULE },
  { q: "Аз ___ купя сладолед.", label: POS_LABEL, answer: "ще", hint: HINT_SHTE_POS, rule: SHTE_NYAMA_RULE },
  { q: "Аз ___ купя сладолед.", label: NEG_LABEL, answer: "няма да", hint: HINT_NYAMA_DA, rule: SHTE_NYAMA_RULE },
  { q: "Ние ___ ходим на пазара.", label: POS_LABEL, answer: "ще", hint: HINT_SHTE_POS, rule: SHTE_NYAMA_RULE },
  { q: "Ние ___ ходим на пазара.", label: NEG_LABEL, answer: "няма да", hint: HINT_NYAMA_DA, rule: SHTE_NYAMA_RULE },
  { q: "Магазинът ___ работи днес.", label: POS_LABEL, answer: "ще", hint: HINT_SHTE_POS, rule: SHTE_NYAMA_RULE },
  { q: "Магазинът ___ работи днес.", label: NEG_LABEL, answer: "няма да", hint: HINT_NYAMA_DA, rule: SHTE_NYAMA_RULE },
  { q: "Вие ___ платите ли?", label: POS_LABEL, answer: "ще", hint: HINT_SHTE_POS, rule: SHTE_NYAMA_RULE },
  { q: "Вие ___ платите.", label: NEG_LABEL, answer: "няма да", hint: HINT_NYAMA_DA, rule: SHTE_NYAMA_RULE },
  { q: "Те ___ продадат апартамента.", label: POS_LABEL, answer: "ще", hint: HINT_SHTE_POS, rule: SHTE_NYAMA_RULE },
  { q: "Те ___ продадат апартамента.", label: NEG_LABEL, answer: "няма да", hint: HINT_NYAMA_DA, rule: SHTE_NYAMA_RULE },
  { q: "Тя ___ върне рестото.", label: POS_LABEL, answer: "ще", hint: HINT_SHTE_POS, rule: SHTE_NYAMA_RULE },
  { q: "Тя ___ върне рестото.", label: NEG_LABEL, answer: "няма да", hint: HINT_NYAMA_DA, rule: SHTE_NYAMA_RULE },
  { q: "Ти ___ дойдеш с нас.", label: POS_LABEL, answer: "ще", hint: HINT_SHTE_POS, rule: SHTE_NYAMA_RULE },
  { q: "Ти ___ дойдеш с нас.", label: NEG_LABEL, answer: "няма да", hint: HINT_NYAMA_DA, rule: SHTE_NYAMA_RULE },
];
export const L7_SHTE_NYAMA_OPTIONS = ["ще", "няма да"];

// --- Future negative transformation (ще → няма да) ---
const FUTURE_NEG_RULE: Localized<string> = {
  ru: "Преобразуй буд. вр.: «ще + гл.» → «няма да + гл.». Сама форма глагола не меняется.",
  uk: "Перетвори майб. час: «ще + дієсл.» → «няма да + дієсл.». Сама форма дієслова не змінюється.",
};
const HINT_FUTURE_NEG: Localized<string> = { ru: "переведи в отрицание", uk: "переведи в заперечення" };
const FUTURE_NEG_LABEL: Localized<string> = { ru: "→ отриц.", uk: "→ запереч." };
export const DATA_L7_FUTURE_NEG: DataItem[] = [
  { q: "Ще купя сладолед.", label: FUTURE_NEG_LABEL, answer: "Няма да купя сладолед.", hint: HINT_FUTURE_NEG, rule: FUTURE_NEG_RULE,
    decoys: ["Не ще купя сладолед.", "Ще не купя сладолед.", "Няма ще купя сладолед."] },
  { q: "Ще те видя тази вечер.", label: FUTURE_NEG_LABEL, answer: "Няма да те видя тази вечер.", hint: HINT_FUTURE_NEG, rule: FUTURE_NEG_RULE,
    decoys: ["Не ще те видя тази вечер.", "Ще не те видя тази вечер.", "Няма ще те видя тази вечер."] },
  { q: "Ще тръгваме вече.", label: FUTURE_NEG_LABEL, answer: "Няма да тръгваме вече.", hint: HINT_FUTURE_NEG, rule: FUTURE_NEG_RULE,
    decoys: ["Не ще тръгваме вече.", "Ще не тръгваме вече.", "Няма ще тръгваме вече."] },
  { q: "Ще ходите на пазара.", label: FUTURE_NEG_LABEL, answer: "Няма да ходите на пазара.", hint: HINT_FUTURE_NEG, rule: FUTURE_NEG_RULE,
    decoys: ["Не ще ходите на пазара.", "Ще не ходите на пазара.", "Няма ще ходите на пазара."] },
  { q: "Ще разглеждаме витрините.", label: FUTURE_NEG_LABEL, answer: "Няма да разглеждаме витрините.", hint: HINT_FUTURE_NEG, rule: FUTURE_NEG_RULE,
    decoys: ["Не ще разглеждаме витрините.", "Ще не разглеждаме витрините.", "Няма ще разглеждаме витрините."] },
  { q: "Магазинът ще работи днес.", label: FUTURE_NEG_LABEL, answer: "Магазинът няма да работи днес.", hint: HINT_FUTURE_NEG, rule: FUTURE_NEG_RULE,
    decoys: ["Магазинът не ще работи днес.", "Магазинът ще не работи днес.", "Магазинът няма ще работи днес."] },
  { q: "Шефът ще пътува днес.", label: FUTURE_NEG_LABEL, answer: "Шефът няма да пътува днес.", hint: HINT_FUTURE_NEG, rule: FUTURE_NEG_RULE,
    decoys: ["Шефът не ще пътува днес.", "Шефът ще не пътува днес.", "Шефът няма ще пътува днес."] },
  { q: "Ще влезем в магазина.", label: FUTURE_NEG_LABEL, answer: "Няма да влезем в магазина.", hint: HINT_FUTURE_NEG, rule: FUTURE_NEG_RULE,
    decoys: ["Не ще влезем в магазина.", "Ще не влезем в магазина.", "Няма ще влезем в магазина."] },
  { q: "Той ще говори с Ани.", label: FUTURE_NEG_LABEL, answer: "Той няма да говори с Ани.", hint: HINT_FUTURE_NEG, rule: FUTURE_NEG_RULE,
    decoys: ["Той не ще говори с Ани.", "Той ще не говори с Ани.", "Той няма ще говори с Ани."] },
  { q: "Те ще продадат апартамента.", label: FUTURE_NEG_LABEL, answer: "Те няма да продадат апартамента.", hint: HINT_FUTURE_NEG, rule: FUTURE_NEG_RULE,
    decoys: ["Те не ще продадат апартамента.", "Те ще не продадат апартамента.", "Те няма ще продадат апартамента."] },
  { q: "Тя ще върне рестото.", label: FUTURE_NEG_LABEL, answer: "Тя няма да върне рестото.", hint: HINT_FUTURE_NEG, rule: FUTURE_NEG_RULE,
    decoys: ["Тя не ще върне рестото.", "Тя ще не върне рестото.", "Тя няма ще върне рестото."] },
  { q: "Аз ще платя сметката.", label: FUTURE_NEG_LABEL, answer: "Аз няма да платя сметката.", hint: HINT_FUTURE_NEG, rule: FUTURE_NEG_RULE,
    decoys: ["Аз не ще платя сметката.", "Аз ще не платя сметката.", "Аз няма ще платя сметката."] },
];

// --- Нещо / Нищо ---
const NESHTO_RULE: Localized<string> = {
  ru: "«нещо» — в утверждении/вопросе («что-то»). «нищо» — всегда с «не» («ничего»). Пример: Ще купиш ли нещо? — Няма да купя нищо.",
  uk: "«нещо» — у ствердженні/питанні («щось»). «нищо» — завжди з «не» («нічого»). Приклад: Ще купиш ли нещо? — Няма да купя нищо.",
};
const HINT_NESHTO: Localized<string> = { ru: "что-то (вопрос/утверждение)", uk: "щось (питання/ствердження)" };
const HINT_NISHTO: Localized<string> = { ru: "ничего (всегда с «не»)", uk: "нічого (завжди з «не»)" };
export const DATA_L7_NESHTO: DataItem[] = [
  { q: "Има ли ___ интересно?", answer: "нещо", hint: HINT_NESHTO, rule: NESHTO_RULE },
  { q: "Няма ___.", answer: "нищо", hint: HINT_NISHTO, rule: NESHTO_RULE },
  { q: "Ще купиш ли ___?", answer: "нещо", hint: HINT_NESHTO, rule: NESHTO_RULE },
  { q: "Няма да купя ___.", answer: "нищо", hint: HINT_NISHTO, rule: NESHTO_RULE },
  { q: "Ще кажеш ли ___?", answer: "нещо", hint: HINT_NESHTO, rule: NESHTO_RULE },
  { q: "Няма да кажа ___.", answer: "нищо", hint: HINT_NISHTO, rule: NESHTO_RULE },
  { q: "Има ли ___ в чантата ти?", answer: "нещо", hint: HINT_NESHTO, rule: NESHTO_RULE },
  { q: "Има едно ___.", answer: "нещо", hint: HINT_NESHTO, rule: NESHTO_RULE },
  { q: "Не, няма ___.", answer: "нищо", hint: HINT_NISHTO, rule: NESHTO_RULE },
  { q: "Знаеш ли ___?", answer: "нещо", hint: HINT_NESHTO, rule: NESHTO_RULE },
  { q: "Той ___ не знае.", answer: "нищо", hint: HINT_NISHTO, rule: NESHTO_RULE },
  { q: "Има ли ___ на масата?", answer: "нещо", hint: HINT_NESHTO, rule: NESHTO_RULE },
  { q: "Няма ___ на масата.", answer: "нищо", hint: HINT_NISHTO, rule: NESHTO_RULE },
  { q: "Какво правиш? — ___ не правя.", answer: "нищо", hint: HINT_NISHTO, rule: NESHTO_RULE },
  { q: "Искаш ли ___?", answer: "нещо", hint: HINT_NESHTO, rule: NESHTO_RULE },
  { q: "Не, не искам ___.", answer: "нищо", hint: HINT_NISHTO, rule: NESHTO_RULE },
];
export const L7_NESHTO_OPTIONS = ["нещо", "нищо"];

// --- Dative short pronouns (ми/ти/му/й/ни/ви/им) ---
const DAT_SHORT_RULE: Localized<string> = {
  ru: "Кр. дательный: аз→ми, ти→ти, той/то→му, тя→й, ние→ни, вие→ви, те→им. Стоит после глагола: «Дава ми книга».",
  uk: "Кор. давальний: аз→ми, ти→ти, той/то→му, тя→й, ние→ни, вие→ви, те→им. Стоїть після дієслова: «Дава ми книга».",
};
const HINT_DAT_SHORT: Localized<string> = { ru: "краткое дательное местоимение", uk: "коротке давальне займенник" };
export const DATA_L7_DAT_SHORT: DataItem[] = [
  { q: "Петър дава на мен учебник. → Петър ___ дава учебник.", answer: "ми", hint: HINT_DAT_SHORT, rule: DAT_SHORT_RULE },
  { q: "Ани дава на теб химикал. → Ани ___ дава химикал.", answer: "ти", hint: HINT_DAT_SHORT, rule: DAT_SHORT_RULE },
  { q: "Ние даваме на него пари. → Ние ___ даваме пари.", answer: "му", hint: HINT_DAT_SHORT, rule: DAT_SHORT_RULE },
  { q: "Аз давам на нея тетрадка. → Аз ___ давам тетрадка.", answer: "й", hint: HINT_DAT_SHORT, rule: DAT_SHORT_RULE },
  { q: "Баба дава на детето играчка. → Баба ___ дава играчка.", answer: "му", hint: HINT_DAT_SHORT, rule: DAT_SHORT_RULE },
  { q: "На касата дават на нас билети. → На касата ___ дават билети.", answer: "ни", hint: HINT_DAT_SHORT, rule: DAT_SHORT_RULE },
  { q: "В библиотеката дават на вас книги. → В библиотеката ___ дават книги.", answer: "ви", hint: HINT_DAT_SHORT, rule: DAT_SHORT_RULE },
  { q: "Таня дава на тях речник. → Таня ___ дава речник.", answer: "им", hint: HINT_DAT_SHORT, rule: DAT_SHORT_RULE },
  { q: "Той ___ купува цветя (на мен).", answer: "ми", hint: HINT_DAT_SHORT, rule: DAT_SHORT_RULE },
  { q: "Ще ___ покажа спирката (на теб).", answer: "ти", hint: HINT_DAT_SHORT, rule: DAT_SHORT_RULE },
  { q: "Цецо ___ казва виц (на Ицо).", answer: "му", hint: HINT_DAT_SHORT, rule: DAT_SHORT_RULE },
  { q: "Купи ___ плодове (на Елена).", answer: "й", hint: HINT_DAT_SHORT, rule: DAT_SHORT_RULE },
  { q: "Майка ми ___ помага (на нас).", answer: "ни", hint: HINT_DAT_SHORT, rule: DAT_SHORT_RULE },
  { q: "Учителят ___ обяснява (на вас).", answer: "ви", hint: HINT_DAT_SHORT, rule: DAT_SHORT_RULE },
  { q: "Ние ___ даваме бонбони (на децата).", answer: "им", hint: HINT_DAT_SHORT, rule: DAT_SHORT_RULE },
  { q: "Аз ще ___ помогна да се облече (на Рени).", answer: "й", hint: HINT_DAT_SHORT, rule: DAT_SHORT_RULE },
  { q: "Той ___ предлага плодове (на Драго).", answer: "му", hint: HINT_DAT_SHORT, rule: DAT_SHORT_RULE },
];
export const L7_DAT_SHORT_OPTIONS = ["ми", "ти", "му", "й", "ни", "ви", "им"];

// --- Dative transformation (на + name → short DAT) ---
const DAT_TRANS_RULE: Localized<string> = {
  ru: "Преобразуй полное дополнение «на + имя» в краткое дательное мест.: на Иван → му; на Мария → й; на децата → им.",
  uk: "Перетвори повний додаток «на + ім'я» у коротке давальне займенник: на Іван → му; на Марія → й; на дітях → им.",
};
const HINT_DAT_TRANS: Localized<string> = { ru: "замени «на + имя» на краткое мест.", uk: "заміни «на + ім'я» на коротке займенник" };
const DAT_TRANS_LABEL: Localized<string> = { ru: "→ кратк. DAT", uk: "→ кор. DAT" };
export const DATA_L7_DAT_TRANS: DataItem[] = [
  { q: "Аз говоря на Явор.", label: DAT_TRANS_LABEL, answer: "Аз му говоря.", hint: HINT_DAT_TRANS, rule: DAT_TRANS_RULE,
    decoys: ["Аз й говоря.", "Аз им говоря.", "Аз ми говоря."] },
  { q: "Вие помагате на Магда.", label: DAT_TRANS_LABEL, answer: "Вие й помагате.", hint: HINT_DAT_TRANS, rule: DAT_TRANS_RULE,
    decoys: ["Вие му помагате.", "Вие им помагате.", "Вие ви помагате."] },
  { q: "Той купува на Цвета цветя.", label: DAT_TRANS_LABEL, answer: "Той й купува цветя.", hint: HINT_DAT_TRANS, rule: DAT_TRANS_RULE,
    decoys: ["Той му купува цветя.", "Той им купува цветя.", "Той ти купува цветя."] },
  { q: "Цецо казва на Ицо виц.", label: DAT_TRANS_LABEL, answer: "Цецо му казва виц.", hint: HINT_DAT_TRANS, rule: DAT_TRANS_RULE,
    decoys: ["Цецо й казва виц.", "Цецо им казва виц.", "Цецо ти казва виц."] },
  { q: "Ние даваме на децата бонбони.", label: DAT_TRANS_LABEL, answer: "Ние им даваме бонбони.", hint: HINT_DAT_TRANS, rule: DAT_TRANS_RULE,
    decoys: ["Ние му даваме бонбони.", "Ние й даваме бонбони.", "Ние ни даваме бонбони."] },
  { q: "Ти четеш писмото на Симо.", label: DAT_TRANS_LABEL, answer: "Ти му четеш писмото.", hint: HINT_DAT_TRANS, rule: DAT_TRANS_RULE,
    decoys: ["Ти й четеш писмото.", "Ти им четеш писмото.", "Ти ти четеш писмото."] },
  { q: "Аз продавам на Проданов кола.", label: DAT_TRANS_LABEL, answer: "Аз му продавам кола.", hint: HINT_DAT_TRANS, rule: DAT_TRANS_RULE,
    decoys: ["Аз й продавам кола.", "Аз им продавам кола.", "Аз ми продавам кола."] },
  { q: "Ти показваш София на Софка.", label: DAT_TRANS_LABEL, answer: "Ти й показваш София.", hint: HINT_DAT_TRANS, rule: DAT_TRANS_RULE,
    decoys: ["Ти му показваш София.", "Ти им показваш София.", "Ти ти показваш София."] },
  { q: "Вие връщате нещата на Катя.", label: DAT_TRANS_LABEL, answer: "Вие й връщате нещата.", hint: HINT_DAT_TRANS, rule: DAT_TRANS_RULE,
    decoys: ["Вие му връщате нещата.", "Вие им връщате нещата.", "Вие ви връщате нещата."] },
  { q: "Той предлага на Драго плодове.", label: DAT_TRANS_LABEL, answer: "Той му предлага плодове.", hint: HINT_DAT_TRANS, rule: DAT_TRANS_RULE,
    decoys: ["Той й предлага плодове.", "Той им предлага плодове.", "Той ти предлага плодове."] },
  { q: "Аз пиша на Пешо писмо.", label: DAT_TRANS_LABEL, answer: "Аз му пиша писмо.", hint: HINT_DAT_TRANS, rule: DAT_TRANS_RULE,
    decoys: ["Аз й пиша писмо.", "Аз им пиша писмо.", "Аз ми пиша писмо."] },
  { q: "Трябва да дам на кучето храна.", label: DAT_TRANS_LABEL, answer: "Трябва да му дам храна.", hint: HINT_DAT_TRANS, rule: DAT_TRANS_RULE,
    decoys: ["Трябва да й дам храна.", "Трябва да им дам храна.", "Трябва да ти дам храна."] },
  { q: "Трябва да кажем на Иво истината.", label: DAT_TRANS_LABEL, answer: "Трябва да му кажем истината.", hint: HINT_DAT_TRANS, rule: DAT_TRANS_RULE,
    decoys: ["Трябва да й кажем истината.", "Трябва да им кажем истината.", "Трябва да ни кажем истината."] },
  { q: "Трябва да помогна на Рени.", label: DAT_TRANS_LABEL, answer: "Трябва да й помогна.", hint: HINT_DAT_TRANS, rule: DAT_TRANS_RULE,
    decoys: ["Трябва да му помогна.", "Трябва да им помогна.", "Трябва да ми помогна."] },
  { q: "Трябва да купим подарък на баба и дядо.", label: DAT_TRANS_LABEL, answer: "Трябва да им купим подарък.", hint: HINT_DAT_TRANS, rule: DAT_TRANS_RULE,
    decoys: ["Трябва да му купим подарък.", "Трябва да й купим подарък.", "Трябва да ни купим подарък."] },
  { q: "Трябва да върна на съседа парите.", label: DAT_TRANS_LABEL, answer: "Трябва да му върна парите.", hint: HINT_DAT_TRANS, rule: DAT_TRANS_RULE,
    decoys: ["Трябва да й върна парите.", "Трябва да им върна парите.", "Трябва да ти върна парите."] },
];

// --- Likes / fits / suits constructions ---
const LIKES_RULE: Localized<string> = {
  ru: "Глаголы «харесва(т) ми / отива(т) ми / става(т) ми» согласуются с подлежащим (товаром): ед. → -а, мн. → -ат. Адресат — кратким DAT.",
  uk: "Дієслова «харесва(т) ми / отива(т) ми / става(т) ми» узгоджуються з підметом (товаром): одн. → -а, мн. → -ат. Адресат — коротким DAT.",
};
const HINT_LIKES_SG: Localized<string> = { ru: "ед. ч.: -а ми", uk: "одн.: -а ми" };
const HINT_LIKES_PL: Localized<string> = { ru: "мн. ч.: -ат ми", uk: "мн.: -ат ми" };
export const DATA_L7_LIKES: DataItem[] = [
  { q: "Блузата ___ ми. (нравится)", answer: "харесва", hint: HINT_LIKES_SG, rule: LIKES_RULE },
  { q: "Обувките ___ ми. (нравятся)", answer: "харесват", hint: HINT_LIKES_PL, rule: LIKES_RULE },
  { q: "Този цвят ___ ми. (идёт)", answer: "отива", hint: HINT_LIKES_SG, rule: LIKES_RULE },
  { q: "Тези обувки ___ ми. (идут)", answer: "отиват", hint: HINT_LIKES_PL, rule: LIKES_RULE },
  { q: "Роклята ___ ми. (по размеру)", answer: "става", hint: HINT_LIKES_SG, rule: LIKES_RULE },
  { q: "Обувките ___ ми. (по размеру)", answer: "стават", hint: HINT_LIKES_PL, rule: LIKES_RULE },
  { q: "Костюмът ___ ми. (нравится)", answer: "харесва", hint: HINT_LIKES_SG, rule: LIKES_RULE },
  { q: "Дънките ___ ми. (нравятся)", answer: "харесват", hint: HINT_LIKES_PL, rule: LIKES_RULE },
  { q: "Кафявото ___ ми повече. (идёт)", answer: "отива", hint: HINT_LIKES_SG, rule: LIKES_RULE },
  { q: "Тези цветове не ___ ми. (не идут)", answer: "отиват", hint: HINT_LIKES_PL, rule: LIKES_RULE },
  { q: "Якето не ___ ми. (не по размеру)", answer: "става", hint: HINT_LIKES_SG, rule: LIKES_RULE },
  { q: "Сандалите не ___ ми. (не по размеру)", answer: "стават", hint: HINT_LIKES_PL, rule: LIKES_RULE },
  { q: "Модата ___ ми. (нравится)", answer: "харесва", hint: HINT_LIKES_SG, rule: LIKES_RULE },
  { q: "Цветовете ___ ми. (нравятся)", answer: "харесват", hint: HINT_LIKES_PL, rule: LIKES_RULE },
  { q: "Този размер ___ ми. (по размеру)", answer: "става", hint: HINT_LIKES_SG, rule: LIKES_RULE },
];
export const L7_LIKES_OPTIONS = ["харесва", "харесват", "отива", "отиват", "става", "стават"];

// --- Approximate quantity ---
const APPROX_RULE: Localized<string> = {
  ru: "Приблизительное количество: «няколко» (несколько), «два-три / пет-шест» (через дефис), «около / към» (около), «-ина» (десетина = около 10).",
  uk: "Приблизна кількість: «няколко» (кілька), «два-три / пет-шест» (через дефіс), «около / към» (близько), «-ина» (десетина = близько 10).",
};
const HINT_APPROX: Localized<string> = { ru: "приблизительное количество", uk: "приблизна кількість" };
export const DATA_L7_APPROX: DataItem[] = [
  { q: "несколько помидоров / кілька помідорів", answer: "няколко домата", hint: HINT_APPROX, rule: APPROX_RULE,
    decoys: ["около домата", "десет домата", "много домата"] },
  { q: "два-три помидора / два-три помідори", answer: "два-три домата", hint: HINT_APPROX, rule: APPROX_RULE,
    decoys: ["два три домата", "два или три домата", "няколко домата"] },
  { q: "пять-шесть помидоров / п'ять-шість помідорів", answer: "пет-шест домата", hint: HINT_APPROX, rule: APPROX_RULE,
    decoys: ["пет шест домата", "около пет домата", "няколко домата"] },
  { q: "около килограмма / близько кілограма", answer: "около килограм", hint: HINT_APPROX, rule: APPROX_RULE,
    decoys: ["един килограм", "точно килограм", "много килограм"] },
  { q: "к килограмму (приблиз.) / до кілограма (приблизно)", answer: "към килограм", hint: HINT_APPROX, rule: APPROX_RULE,
    decoys: ["до килограм", "от килограм", "за килограм"] },
  { q: "штук десять помидоров / штук десять помідорів", answer: "десетина домата", hint: HINT_APPROX, rule: APPROX_RULE,
    decoys: ["десет домата", "около десет", "няколко десетки"] },
  { q: "около 300 граммов / близько 300 грамів", answer: "към 300 грама", hint: HINT_APPROX, rule: APPROX_RULE,
    decoys: ["точно 300 грама", "за 300 грама", "много 300 грама"] },
  { q: "ровно один килограмм / рівно один кілограм", answer: "точно един килограм", hint: HINT_APPROX, rule: APPROX_RULE,
    decoys: ["около един килограм", "към един килограм", "няколко килограма"] },
  { q: "половина килограмма / половина кілограма", answer: "половин килограм", hint: HINT_APPROX, rule: APPROX_RULE,
    decoys: ["един килограм", "около килограм", "точно килограм"] },
  { q: "несколько раз / кілька разів", answer: "няколко пъти", hint: HINT_APPROX, rule: APPROX_RULE,
    decoys: ["много пъти", "един път", "два пъти"] },
  { q: "много раз / багато разів", answer: "много пъти", hint: HINT_APPROX, rule: APPROX_RULE,
    decoys: ["няколко пъти", "един път", "два пъти"] },
  { q: "один раз / один раз", answer: "един път", hint: HINT_APPROX, rule: APPROX_RULE,
    decoys: ["два пъти", "няколко пъти", "много пъти"] },
  { q: "два раза / двічі", answer: "два пъти", hint: HINT_APPROX, rule: APPROX_RULE,
    decoys: ["един път", "няколко пъти", "много пъти"] },
  { q: "около 30 левов / близько 30 левів", answer: "около 30 лева", hint: HINT_APPROX, rule: APPROX_RULE,
    decoys: ["точно 30 лева", "тридесет лева", "много 30 лева"] },
  { q: "ровно 50 стотинок / рівно 50 стотинок", answer: "точно 50 стотинки", hint: HINT_APPROX, rule: APPROX_RULE,
    decoys: ["около 50 стотинки", "към 50 стотинки", "няколко 50 стотинки"] },
];

// --- Money: counted form (един лев, два лева, пет лева) ---
const MONEY_RULE: Localized<string> = {
  ru: "Считаемая форма «лев»: 1 → лев, 2–6 → лева (счётная), ≥5/много → лева. «Стотинка»: 1 → стотинка, 2+ → стотинки.",
  uk: "Лічильна форма «лев»: 1 → лев, 2–6 → лева (лічильна), ≥5/багато → лева. «Стотинка»: 1 → стотинка, 2+ → стотинки.",
};
const HINT_MONEY: Localized<string> = { ru: "счётная форма с числом", uk: "лічильна форма з числом" };
export const DATA_L7_MONEY: DataItem[] = [
  { q: "1 lev", answer: "един лев", hint: HINT_MONEY, rule: MONEY_RULE, decoys: ["едно лев", "една лев", "един лева"] },
  { q: "2 leva", answer: "два лева", hint: HINT_MONEY, rule: MONEY_RULE, decoys: ["две лева", "два лев", "две левове"] },
  { q: "5 leva", answer: "пет лева", hint: HINT_MONEY, rule: MONEY_RULE, decoys: ["пет лев", "пет левове", "пет левчета"] },
  { q: "10 leva", answer: "десет лева", hint: HINT_MONEY, rule: MONEY_RULE, decoys: ["десет лев", "десет левове", "десетина лев"] },
  { q: "100 leva", answer: "сто лева", hint: HINT_MONEY, rule: MONEY_RULE, decoys: ["сто лев", "сто левове", "стотина лев"] },
  { q: "1 stot.", answer: "една стотинка", hint: HINT_MONEY, rule: MONEY_RULE, decoys: ["един стотинка", "едно стотинка", "една стотинки"] },
  { q: "20 stot.", answer: "двайсет стотинки", hint: HINT_MONEY, rule: MONEY_RULE, decoys: ["двайсет стотинка", "двайсет стотинките", "двайсетина стотинки"] },
  { q: "50 stot.", answer: "петдесет стотинки", hint: HINT_MONEY, rule: MONEY_RULE, decoys: ["петдесет стотинка", "петдесет стотинките", "петдесетина стотинки"] },
  { q: "1 kg", answer: "един килограм", hint: HINT_MONEY, rule: MONEY_RULE, decoys: ["едно килограм", "една килограм", "един килограма"] },
  { q: "2 kg", answer: "два килограма", hint: HINT_MONEY, rule: MONEY_RULE, decoys: ["две килограма", "два килограм", "две килограми"] },
  { q: "3 kg", answer: "три килограма", hint: HINT_MONEY, rule: MONEY_RULE, decoys: ["три килограм", "три килограми", "тричи килограма"] },
  { q: "1.20 lv", answer: "един лев и двайсет стотинки", hint: HINT_MONEY, rule: MONEY_RULE,
    decoys: ["един лев и двайсет стотинка", "един и двайсет лева", "една лев и двайсет стотинки"] },
];

// --- Seller or customer? ---
const SELLER_BUYER_RULE: Localized<string> = {
  ru: "Реплики продавца обычно предлагают/спрашивают желания и сообщают цены. Реплики покупателя — спрашивают цены/наличие, просят сдачу, делают заказ.",
  uk: "Репліки продавця зазвичай пропонують/питають побажання і повідомляють ціни. Репліки покупця — питають ціни/наявність, просять здачу, роблять замовлення.",
};
const HINT_SELLER: Localized<string> = { ru: "это говорит продавач (продавец)", uk: "це говорить продавач (продавець)" };
const HINT_BUYER: Localized<string> = { ru: "это говорит клиент (покупатель)", uk: "це говорить клієнт (покупець)" };
export const DATA_L7_SELLER_BUYER: DataItem[] = [
  { q: "Какво желаете?", answer: "продавач", hint: HINT_SELLER, rule: SELLER_BUYER_RULE },
  { q: "Какво мога да ви предложа?", answer: "продавач", hint: HINT_SELLER, rule: SELLER_BUYER_RULE },
  { q: "Върнете ми рестото!", answer: "клиент", hint: HINT_BUYER, rule: SELLER_BUYER_RULE },
  { q: "Колко струва млякото?", answer: "клиент", hint: HINT_BUYER, rule: SELLER_BUYER_RULE },
  { q: "Пресен ли е хлябът?", answer: "клиент", hint: HINT_BUYER, rule: SELLER_BUYER_RULE },
  { q: "Имате ли сирене?", answer: "клиент", hint: HINT_BUYER, rule: SELLER_BUYER_RULE },
  { q: "Какво обичате?", answer: "продавач", hint: HINT_SELLER, rule: SELLER_BUYER_RULE },
  { q: "Нямате ли дребни?", answer: "продавач", hint: HINT_SELLER, rule: SELLER_BUYER_RULE },
  { q: "Заповядайте рестото.", answer: "продавач", hint: HINT_SELLER, rule: SELLER_BUYER_RULE },
  { q: "Колко ви дължа?", answer: "клиент", hint: HINT_BUYER, rule: SELLER_BUYER_RULE },
  { q: "Къде е щандът за месо?", answer: "клиент", hint: HINT_BUYER, rule: SELLER_BUYER_RULE },
  { q: "17 лева и 45 стотинки.", answer: "продавач", hint: HINT_SELLER, rule: SELLER_BUYER_RULE },
  { q: "Желаете ли още нещо?", answer: "продавач", hint: HINT_SELLER, rule: SELLER_BUYER_RULE },
  { q: "Дайте ми един килограм домати.", answer: "клиент", hint: HINT_BUYER, rule: SELLER_BUYER_RULE },
  { q: "Сега ще ви ги претегля.", answer: "продавач", hint: HINT_SELLER, rule: SELLER_BUYER_RULE },
  { q: "Ще взема една кутия.", answer: "клиент", hint: HINT_BUYER, rule: SELLER_BUYER_RULE },
];
export const L7_SELLER_BUYER_OPTIONS = ["продавач", "клиент"];

// --- Paradigms ---
const L7_PRONOUNS = ["Аз", "Ти", "Той", "Ние", "Вие", "Те"];
export const DATA_L7_PARADIGM: ParadigmItem[] = [
  { verb: "купувам", pronouns: L7_PRONOUNS, forms: ["купувам", "купуваш", "купува", "купуваме", "купувате", "купуват"],
    hint: { ru: "покупать (III спряж.)", uk: "купувати (III дієвідм.)" }, rule: KUPUVAM_RULE },
  { verb: "продавам", pronouns: L7_PRONOUNS, forms: ["продавам", "продаваш", "продава", "продаваме", "продавате", "продават"],
    hint: { ru: "продавать (III спряж.)", uk: "продавати (III дієвідм.)" }, rule: PRODAVAM_RULE },
  { verb: "давам", pronouns: L7_PRONOUNS, forms: ["давам", "даваш", "дава", "даваме", "давате", "дават"],
    hint: { ru: "давать (III спряж.)", uk: "давати (III дієвідм.)" }, rule: DAVAM_RULE },
  { verb: "плащам", pronouns: L7_PRONOUNS, forms: ["плащам", "плащаш", "плаща", "плащаме", "плащате", "плащат"],
    hint: { ru: "платить (III спряж.)", uk: "платити (III дієвідм.)" }, rule: PLASCHTAM_RULE },
  { verb: "пазарувам", pronouns: L7_PRONOUNS, forms: ["пазарувам", "пазаруваш", "пазарува", "пазаруваме", "пазарувате", "пазаруват"],
    hint: { ru: "ходить за покупками (III спряж.)", uk: "ходити за покупками (III дієвідм.)" }, rule: PAZARUVAM_RULE },
];

// --- Build sentences ---
export const DATA_L7_BUILD: BuildItem[] = [
  { words: ["Колко", "струват", "ябълките", "?"], translation: { ru: "Сколько стоят яблоки?", uk: "Скільки коштують яблука?" } },
  { words: ["Колко", "струва", "хлябът", "?"], translation: { ru: "Сколько стоит хлеб?", uk: "Скільки коштує хліб?" } },
  { words: ["Жоро", "е", "по-голям", "от", "Петърчо"], translation: { ru: "Жоро больше Петрчо.", uk: "Жоро більший за Петрчо." } },
  { words: ["Мишо", "е", "най-голям"], translation: { ru: "Мишо самый большой.", uk: "Мишо найбільший." } },
  { words: ["Магазинът", "няма", "да", "работи", "днес"], translation: { ru: "Магазин не будет работать сегодня.", uk: "Магазин не працюватиме сьогодні." } },
  { words: ["Тя", "ми", "купува", "цветя"], translation: { ru: "Она покупает мне цветы.", uk: "Вона купує мені квіти." } },
  { words: ["Ще", "ти", "покажа", "спирката"], translation: { ru: "Я покажу тебе остановку.", uk: "Я покажу тобі зупинку." } },
  { words: ["Не", "му", "пиша", "писмо"], translation: { ru: "Я не пишу ему письмо.", uk: "Я не пишу йому листа." } },
  { words: ["Този", "цвят", "не", "ми", "отива"], translation: { ru: "Этот цвет мне не идёт.", uk: "Цей колір мені не пасує." } },
  { words: ["Обувките", "не", "ми", "стават"], translation: { ru: "Обувь мне не подходит по размеру.", uk: "Взуття мені не пасує за розміром." } },
  { words: ["Няма", "да", "купя", "нищо"], translation: { ru: "Я ничего не куплю.", uk: "Я нічого не куплю." } },
  { words: ["Имаш", "ли", "нещо", "интересно", "?"], translation: { ru: "У тебя есть что-то интересное?", uk: "У тебе є щось цікаве?" } },
  { words: ["Костюмът", "ми", "харесва", "."], translation: { ru: "Костюм мне нравится.", uk: "Костюм мені подобається." } },
  { words: ["Тук", "стоките", "са", "по-евтини"], translation: { ru: "Здесь товары дешевле.", uk: "Тут товари дешевші." } },
];

// --- Build market dialogue phrases ---
export const DATA_L7_MARKET_BUILD: BuildItem[] = [
  { words: ["Дайте", "ми", "няколко", "домата"], translation: { ru: "Дайте мне несколько помидоров.", uk: "Дайте мені кілька помідорів." } },
  { words: ["Около", "един", "килограм"], translation: { ru: "Около одного килограмма.", uk: "Близько одного кілограма." } },
  { words: ["Колко", "ви", "дължа", "?"], translation: { ru: "Сколько я вам должен?", uk: "Скільки я вам винен?" } },
  { words: ["Заповядайте", ",", "ето", "ви", "рестото"], translation: { ru: "Пожалуйста, вот ваша сдача.", uk: "Будь ласка, ось ваша здача." } },
  { words: ["Желаете", "ли", "още", "нещо", "?"], translation: { ru: "Желаете ли ещё что-то?", uk: "Бажаєте ще щось?" } },
  { words: ["Какво", "мога", "да", "ви", "предложа", "?"], translation: { ru: "Что я могу вам предложить?", uk: "Що я можу вам запропонувати?" } },
  { words: ["Дайте", "ми", "една", "бутилка", "вино"], translation: { ru: "Дайте мне одну бутылку вина.", uk: "Дайте мені одну пляшку вина." } },
  { words: ["Имате", "ли", "по-евтини", "ябълки", "?"], translation: { ru: "У вас есть яблоки подешевле?", uk: "У вас є дешевші яблука?" } },
  { words: ["Този", "цвят", "повече", "ми", "отива"], translation: { ru: "Этот цвет мне больше идёт.", uk: "Цей колір мені більше пасує." } },
  { words: ["Кой", "размер", "носите", "?"], translation: { ru: "Какой размер вы носите?", uk: "Який розмір ви носите?" } },
  { words: ["Ще", "го", "взема"], translation: { ru: "Я возьму его.", uk: "Я візьму його." } },
  { words: ["Можете", "да", "го", "пробвате"], translation: { ru: "Вы можете его примерить.", uk: "Ви можете його приміряти." } },
];

// --- Match: pronoun ↔ short DAT ---
const HINT_MATCH_DAT: Localized<string> = { ru: "соедини местоимение с кр. дательным", uk: "з'єднай займенник з кор. давальним" };
export const DATA_L7_MATCH_PRON_DAT: MatchItem[] = [
  { left: "аз", right: "ми", hint: HINT_MATCH_DAT },
  { left: "ти", right: "ти", hint: HINT_MATCH_DAT },
  { left: "той", right: "му", hint: HINT_MATCH_DAT },
  { left: "тя", right: "й", hint: HINT_MATCH_DAT },
  { left: "то", right: "му", hint: HINT_MATCH_DAT },
  { left: "ние", right: "ни", hint: HINT_MATCH_DAT },
  { left: "вие", right: "ви", hint: HINT_MATCH_DAT },
  { left: "те", right: "им", hint: HINT_MATCH_DAT },
];

// --- Match: ACC ↔ DAT pairs ---
const HINT_MATCH_ACC_DAT: Localized<string> = { ru: "винительный ↔ дательный", uk: "знахідний ↔ давальний" };
export const DATA_L7_MATCH_ACC_DAT: MatchItem[] = [
  { left: "ме", right: "ми", hint: HINT_MATCH_ACC_DAT },
  { left: "те", right: "ти", hint: HINT_MATCH_ACC_DAT },
  { left: "го", right: "му", hint: HINT_MATCH_ACC_DAT },
  { left: "я", right: "й", hint: HINT_MATCH_ACC_DAT },
  { left: "ни", right: "ни", hint: HINT_MATCH_ACC_DAT },
  { left: "ви", right: "ви", hint: HINT_MATCH_ACC_DAT },
  { left: "ги", right: "им", hint: HINT_MATCH_ACC_DAT },
];

// --- Match: antonyms (L7) ---
const HINT_MATCH_ANT_L7: Localized<string> = { ru: "соедини антонимы", uk: "з'єднай антоніми" };
export const DATA_L7_MATCH_ANT: MatchItem[] = [
  { left: "скъп", right: "евтин", hint: HINT_MATCH_ANT_L7 },
  { left: "продавам", right: "купувам", hint: HINT_MATCH_ANT_L7 },
  { left: "давам", right: "вземам", hint: HINT_MATCH_ANT_L7 },
  { left: "много", right: "малко", hint: HINT_MATCH_ANT_L7 },
  { left: "затворено", right: "отворено", hint: HINT_MATCH_ANT_L7 },
  { left: "голям", right: "малък", hint: HINT_MATCH_ANT_L7 },
  { left: "млад", right: "стар", hint: HINT_MATCH_ANT_L7 },
  { left: "висок", right: "нисък", hint: HINT_MATCH_ANT_L7 },
  { left: "тежък", right: "лек", hint: HINT_MATCH_ANT_L7 },
  { left: "нещо", right: "нищо", hint: HINT_MATCH_ANT_L7 },
];

// --- Match: store ↔ goods ---
const HINT_MATCH_STORE: Localized<string> = { ru: "соедини магазин с типичным товаром", uk: "з'єднай магазин з типовим товаром" };
export const DATA_L7_MATCH_STORE: MatchItem[] = [
  { left: "хлебарница", right: "хляб", hint: HINT_MATCH_STORE },
  { left: "сладкарница", right: "торта", hint: HINT_MATCH_STORE },
  { left: "книжарница", right: "учебници", hint: HINT_MATCH_STORE },
  { left: "плод-зеленчук", right: "ябълки", hint: HINT_MATCH_STORE },
  { left: "парфюмерия", right: "червило", hint: HINT_MATCH_STORE },
  { left: "магазин за обувки", right: "сандали", hint: HINT_MATCH_STORE },
  { left: "магазин за облекло", right: "яке", hint: HINT_MATCH_STORE },
  { left: "бижутерия", right: "пръстен", hint: HINT_MATCH_STORE },
  { left: "будка", right: "вестник", hint: HINT_MATCH_STORE },
  { left: "магазин за цветя", right: "роза", hint: HINT_MATCH_STORE },
];

// --- Odd one out ---
const ODD_L7_NOT_STORE: Localized<string> = { ru: "одно — не магазин", uk: "одне — не магазин" };
const ODD_L7_NOT_PERSON: Localized<string> = { ru: "одно — не роль при покупке", uk: "одне — не роль під час покупки" };
const ODD_L7_NOT_MONEY: Localized<string> = { ru: "одно — не связано с деньгами", uk: "одне — не пов'язане з грошима" };
const ODD_L7_NOT_VERB: Localized<string> = { ru: "одно — не глагол шопинга", uk: "одне — не дієслово шопінгу" };
const ODD_L7_NOT_COMP: Localized<string> = { ru: "одно — не сравнит. степ.", uk: "одне — не вищий ступ." };
const ODD_L7_NOT_SUPER: Localized<string> = { ru: "одно — не превосх. степ.", uk: "одне — не найвищий ступ." };
const ODD_L7_NOT_DAT: Localized<string> = { ru: "одно — не кр. дательное", uk: "одне — не кор. давальне" };
const ODD_L7_NOT_FUT: Localized<string> = { ru: "одно — не буд. вр.", uk: "одне — не майб. ч." };
const ODD_L7_NOT_FOOD: Localized<string> = { ru: "одно — не еда / не товар", uk: "одне — не їжа / не товар" };
const ODD_L7_NOT_DIM: Localized<string> = { ru: "одно — не диминутив", uk: "одне — не демінутив" };
const ODD_L7_NOT_APPROX: Localized<string> = { ru: "одно — не приблизительное количество", uk: "одне — не приблизна кількість" };
const ODD_L7_NOT_ACC: Localized<string> = { ru: "одно — не кр. винительное", uk: "одне — не кор. знахідне" };
export const DATA_L7_ODD: OddItem[] = [
  { words: ["хлебарница", "сладкарница", "книжарница", "купувач"], odd: "купувач", hint: ODD_L7_NOT_STORE },
  { words: ["продавач", "клиент", "касиер", "магазин"], odd: "магазин", hint: ODD_L7_NOT_PERSON },
  { words: ["лев", "стотинка", "ресто", "цвят"], odd: "цвят", hint: ODD_L7_NOT_MONEY },
  { words: ["купувам", "продавам", "плащам", "ставам"], odd: "ставам", hint: ODD_L7_NOT_VERB },
  { words: ["по-голям", "по-малък", "по-евтин", "най-скъп"], odd: "най-скъп", hint: ODD_L7_NOT_COMP },
  { words: ["най-голям", "най-малък", "най-скъп", "по-евтин"], odd: "по-евтин", hint: ODD_L7_NOT_SUPER },
  { words: ["ми", "ти", "му", "го"], odd: "го", hint: ODD_L7_NOT_DAT },
  { words: ["ще купя", "ще платя", "ще дойда", "купих"], odd: "купих", hint: ODD_L7_NOT_FUT },
  { words: ["хляб", "торта", "ябълки", "опашка"], odd: "опашка", hint: ODD_L7_NOT_FOOD },
  { words: ["магазинче", "момиченце", "момченце", "магазин"], odd: "магазин", hint: ODD_L7_NOT_DIM },
  { words: ["няколко", "около", "към", "точно"], odd: "точно", hint: ODD_L7_NOT_APPROX },
  { words: ["ме", "те", "го", "ми"], odd: "ми", hint: ODD_L7_NOT_ACC },
];
