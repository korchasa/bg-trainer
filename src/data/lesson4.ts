import type { DataItem, BuildItem, MatchItem, OddItem, ParadigmItem } from "../types";
import type { Localized } from "../i18n/types";

// ========================= LESSON 4 =========================

// --- Conjugation I (-е-): чета ---
const CHETA_RULE: Localized<string> = {
  ru: "I спряжение (тематич. -е-): чета/четеш/чете · четем/четете/четат.",
  uk: "I дієвідміна (тематичн. -е-): чета/четеш/чете · четем/четете/четат.",
};
export const DATA_L4_CHETA: DataItem[] = [
  { q: "Аз", answer: "чета", hint: { ru: "я читаю", uk: "я читаю" }, rule: CHETA_RULE },
  { q: "Ти", answer: "четеш", hint: { ru: "ты читаешь", uk: "ти читаєш" }, rule: CHETA_RULE },
  { q: "Той/Тя/То", answer: "чете", hint: { ru: "он/она читает", uk: "він/вона читає" }, rule: CHETA_RULE },
  { q: "Ние", answer: "четем", hint: { ru: "мы читаем", uk: "ми читаємо" }, rule: CHETA_RULE },
  { q: "Вие", answer: "четете", hint: { ru: "вы читаете", uk: "ви читаєте" }, rule: CHETA_RULE },
  { q: "Те", answer: "четат", hint: { ru: "они читают", uk: "вони читають" }, rule: CHETA_RULE },
];

// --- Conjugation II (-и-): уча ---
const UCHA_RULE: Localized<string> = {
  ru: "II спряжение (тематич. -и-): уча/учиш/учи · учим/учите/учат.",
  uk: "II дієвідміна (тематичн. -и-): уча/учиш/учи · учим/учите/учат.",
};
export const DATA_L4_UCHA: DataItem[] = [
  { q: "Аз", answer: "уча", hint: { ru: "я учу / учусь", uk: "я вчу / вчуся" }, rule: UCHA_RULE },
  { q: "Ти", answer: "учиш", hint: { ru: "ты учишь", uk: "ти вчиш" }, rule: UCHA_RULE },
  { q: "Той/Тя/То", answer: "учи", hint: { ru: "он/она учит", uk: "він/вона вчить" }, rule: UCHA_RULE },
  { q: "Ние", answer: "учим", hint: { ru: "мы учим", uk: "ми вчимо" }, rule: UCHA_RULE },
  { q: "Вие", answer: "учите", hint: { ru: "вы учите", uk: "ви вчите" }, rule: UCHA_RULE },
  { q: "Те", answer: "учат", hint: { ru: "они учат", uk: "вони вчать" }, rule: UCHA_RULE },
];

// --- Conjugation III (-а/я-): казвам ---
const KAZVAM_L4_RULE: Localized<string> = {
  ru: "III спряжение (тематич. -а/я-): казвам/казваш/казва · казваме/казвате/казват.",
  uk: "III дієвідміна (тематичн. -а/я-): казвам/казваш/казва · казваме/казвате/казват.",
};
export const DATA_L4_KAZVAM: DataItem[] = [
  { q: "Аз", answer: "казвам", hint: { ru: "я говорю / называю", uk: "я кажу / називаю" }, rule: KAZVAM_L4_RULE },
  { q: "Ти", answer: "казваш", hint: { ru: "ты говоришь", uk: "ти кажеш" }, rule: KAZVAM_L4_RULE },
  { q: "Той/Тя/То", answer: "казва", hint: { ru: "он говорит", uk: "він каже" }, rule: KAZVAM_L4_RULE },
  { q: "Ние", answer: "казваме", hint: { ru: "мы говорим", uk: "ми кажемо" }, rule: KAZVAM_L4_RULE },
  { q: "Вие", answer: "казвате", hint: { ru: "вы говорите", uk: "ви кажете" }, rule: KAZVAM_L4_RULE },
  { q: "Те", answer: "казват", hint: { ru: "они говорят", uk: "вони кажуть" }, rule: KAZVAM_L4_RULE },
];

// --- Conjugation III: оправям ---
const OPRAVYAM_RULE: Localized<string> = {
  ru: "III спряжение (-я-): оправям/оправяш/оправя · оправяме/оправяте/оправят. Значение: приводить в порядок (комнату, постель).",
  uk: "III дієвідміна (-я-): оправям/оправяш/оправя · оправяме/оправяте/оправят. Значення: прибирати (кімнату, ліжко).",
};
export const DATA_L4_OPRAVYAM: DataItem[] = [
  { q: "Аз", answer: "оправям", hint: { ru: "я прибираю", uk: "я прибираю" }, rule: OPRAVYAM_RULE },
  { q: "Ти", answer: "оправяш", hint: { ru: "ты прибираешь", uk: "ти прибираєш" }, rule: OPRAVYAM_RULE },
  { q: "Той/Тя/То", answer: "оправя", hint: { ru: "он прибирает", uk: "він прибирає" }, rule: OPRAVYAM_RULE },
  { q: "Ние", answer: "оправяме", hint: { ru: "мы прибираем", uk: "ми прибираємо" }, rule: OPRAVYAM_RULE },
  { q: "Вие", answer: "оправяте", hint: { ru: "вы прибираете", uk: "ви прибираєте" }, rule: OPRAVYAM_RULE },
  { q: "Те", answer: "оправят", hint: { ru: "они прибирают", uk: "вони прибирають" }, rule: OPRAVYAM_RULE },
];

// --- Conjugation II: правя ---
const PRAVYA_RULE: Localized<string> = {
  ru: "II спряжение (-и-): правя/правиш/прави · правим/правите/правят. Значение: делать.",
  uk: "II дієвідміна (-и-): правя/правиш/прави · правим/правите/правят. Значення: робити.",
};
export const DATA_L4_PRAVYA: DataItem[] = [
  { q: "Аз", answer: "правя", hint: { ru: "я делаю", uk: "я роблю" }, rule: PRAVYA_RULE },
  { q: "Ти", answer: "правиш", hint: { ru: "ты делаешь", uk: "ти робиш" }, rule: PRAVYA_RULE },
  { q: "Той/Тя/То", answer: "прави", hint: { ru: "он делает", uk: "він робить" }, rule: PRAVYA_RULE },
  { q: "Ние", answer: "правим", hint: { ru: "мы делаем", uk: "ми робимо" }, rule: PRAVYA_RULE },
  { q: "Вие", answer: "правите", hint: { ru: "вы делаете", uk: "ви робите" }, rule: PRAVYA_RULE },
  { q: "Те", answer: "правят", hint: { ru: "они делают", uk: "вони роблять" }, rule: PRAVYA_RULE },
];

// --- Verb «ям» (irregular) ---
const YAM_RULE: Localized<string> = {
  ru: "«ям» — неправильный глагол: ям/ядеш/яде · ядем/ядете/ядат.",
  uk: "«ям» — неправильне дієслово: ям/ядеш/яде · ядем/ядете/ядат.",
};
export const DATA_L4_YAM: DataItem[] = [
  { q: "Аз", answer: "ям", hint: { ru: "я ем", uk: "я їм" }, rule: YAM_RULE },
  { q: "Ти", answer: "ядеш", hint: { ru: "ты ешь", uk: "ти їси" }, rule: YAM_RULE },
  { q: "Той/Тя/То", answer: "яде", hint: { ru: "он ест", uk: "він їсть" }, rule: YAM_RULE },
  { q: "Ние", answer: "ядем", hint: { ru: "мы едим", uk: "ми їмо" }, rule: YAM_RULE },
  { q: "Вие", answer: "ядете", hint: { ru: "вы едите", uk: "ви їсте" }, rule: YAM_RULE },
  { q: "Те", answer: "ядат", hint: { ru: "они едят", uk: "вони їдять" }, rule: YAM_RULE },
];

// --- Conjugation type recognition ---
const CONJ_TYPE_RULE: Localized<string> = {
  ru: "Тип спряжения определяется по тематич. гласной 3л.ед.ч.: -е- → I, -и- → II, -а/я- → III.",
  uk: "Тип дієвідміни визначається тематичним голосним 3ос.одн.: -е- → I, -и- → II, -а/я- → III.",
};
const HINT_CONJ_I: Localized<string> = { ru: "тематич. -е-", uk: "тематичн. -е-" };
const HINT_CONJ_II: Localized<string> = { ru: "тематич. -и-", uk: "тематичн. -и-" };
const HINT_CONJ_III: Localized<string> = { ru: "тематич. -а/я-", uk: "тематичн. -а/я-" };
export const DATA_L4_CONJ_TYPE: DataItem[] = [
  { q: "чета → чете", answer: "I", hint: HINT_CONJ_I, rule: CONJ_TYPE_RULE },
  { q: "живея → живее", answer: "I", hint: HINT_CONJ_I, rule: CONJ_TYPE_RULE },
  { q: "пиша → пише", answer: "I", hint: HINT_CONJ_I, rule: CONJ_TYPE_RULE },
  { q: "бръсна → бръсне", answer: "I", hint: HINT_CONJ_I, rule: CONJ_TYPE_RULE },
  { q: "пия → пие", answer: "I", hint: HINT_CONJ_I, rule: CONJ_TYPE_RULE },
  { q: "пея → пее", answer: "I", hint: HINT_CONJ_I, rule: CONJ_TYPE_RULE },
  { q: "къпя → къпе", answer: "I", hint: HINT_CONJ_I, rule: CONJ_TYPE_RULE },
  { q: "мия → мие", answer: "I", hint: HINT_CONJ_I, rule: CONJ_TYPE_RULE },
  { q: "уча → учи", answer: "II", hint: HINT_CONJ_II, rule: CONJ_TYPE_RULE },
  { q: "говоря → говори", answer: "II", hint: HINT_CONJ_II, rule: CONJ_TYPE_RULE },
  { q: "правя → прави", answer: "II", hint: HINT_CONJ_II, rule: CONJ_TYPE_RULE },
  { q: "ходя → ходи", answer: "II", hint: HINT_CONJ_II, rule: CONJ_TYPE_RULE },
  { q: "спя → спи", answer: "II", hint: HINT_CONJ_II, rule: CONJ_TYPE_RULE },
  { q: "мълча → мълчи", answer: "II", hint: HINT_CONJ_II, rule: CONJ_TYPE_RULE },
  { q: "държа → държи", answer: "II", hint: HINT_CONJ_II, rule: CONJ_TYPE_RULE },
  { q: "бързам → бърза", answer: "III", hint: HINT_CONJ_III, rule: CONJ_TYPE_RULE },
  { q: "казвам → казва", answer: "III", hint: HINT_CONJ_III, rule: CONJ_TYPE_RULE },
  { q: "оправям → оправя", answer: "III", hint: HINT_CONJ_III, rule: CONJ_TYPE_RULE },
  { q: "искам → иска", answer: "III", hint: HINT_CONJ_III, rule: CONJ_TYPE_RULE },
  { q: "имам → има", answer: "III", hint: HINT_CONJ_III, rule: CONJ_TYPE_RULE },
  { q: "отивам → отива", answer: "III", hint: HINT_CONJ_III, rule: CONJ_TYPE_RULE },
  { q: "обличам → облича", answer: "III", hint: HINT_CONJ_III, rule: CONJ_TYPE_RULE },
  { q: "връщам → връща", answer: "III", hint: HINT_CONJ_III, rule: CONJ_TYPE_RULE },
  { q: "закусвам → закусва", answer: "III", hint: HINT_CONJ_III, rule: CONJ_TYPE_RULE },
  { q: "обядвам → обядва", answer: "III", hint: HINT_CONJ_III, rule: CONJ_TYPE_RULE },
  { q: "вечерям → вечеря", answer: "III", hint: HINT_CONJ_III, rule: CONJ_TYPE_RULE },
  { q: "разхождам → разхожда", answer: "III", hint: HINT_CONJ_III, rule: CONJ_TYPE_RULE },
  { q: "ставам → става", answer: "III", hint: HINT_CONJ_III, rule: CONJ_TYPE_RULE },
  { q: "обувам → обува", answer: "III", hint: HINT_CONJ_III, rule: CONJ_TYPE_RULE },
  { q: "забавлявам → забавлява", answer: "III", hint: HINT_CONJ_III, rule: CONJ_TYPE_RULE },
  { q: "закъснявам → закъснява", answer: "III", hint: HINT_CONJ_III, rule: CONJ_TYPE_RULE },
];
export const L4_CONJ_TYPE_OPTIONS = ["I", "II", "III"];

// --- Reflexive verb «мия се» ---
const MIYA_SE_RULE: Localized<string> = {
  ru: "Возвратный глагол «мия се» (умываться): клитика «се» стоит после формы. Парадигма: мия се/миеш се/мие се · мием се/миете се/мият се.",
  uk: "Зворотне дієслово «мия се» (умиватися): клітика «се» стоїть після форми. Парадигма: мия се/миеш се/мие се · мием се/миете се/мият се.",
};
export const DATA_L4_MIYA_SE: DataItem[] = [
  { q: "Аз", answer: "мия се", hint: { ru: "я умываюсь", uk: "я умиваюся" }, rule: MIYA_SE_RULE },
  { q: "Ти", answer: "миеш се", hint: { ru: "ты умываешься", uk: "ти умиваєшся" }, rule: MIYA_SE_RULE },
  { q: "Той/Тя/То", answer: "мие се", hint: { ru: "он умывается", uk: "він умивається" }, rule: MIYA_SE_RULE },
  { q: "Ние", answer: "мием се", hint: { ru: "мы умываемся", uk: "ми умиваємося" }, rule: MIYA_SE_RULE },
  { q: "Вие", answer: "миете се", hint: { ru: "вы умываетесь", uk: "ви умиваєтеся" }, rule: MIYA_SE_RULE },
  { q: "Те", answer: "мият се", hint: { ru: "они умываются", uk: "вони умиваються" }, rule: MIYA_SE_RULE },
];

// --- Daily routine vocabulary ---
const HINT_ROUTINE: Localized<string> = { ru: "действие в распорядке дня", uk: "дія у розпорядку дня" };
export const DATA_L4_REFL_VOCAB: DataItem[] = [
  { q: "просыпаться / прокидатися", answer: "събуждам се", hint: HINT_ROUTINE, decoys: ["ставам", "лягам си", "обличам се"] },
  { q: "вставать / вставати", answer: "ставам", hint: HINT_ROUTINE, decoys: ["събуждам се", "лягам си", "ходя"] },
  { q: "умываться / умиватися", answer: "мия се", hint: HINT_ROUTINE, decoys: ["къпя се", "бръсна се", "сресвам се"] },
  { q: "купаться / купатися", answer: "къпя се", hint: HINT_ROUTINE, decoys: ["мия се", "бръсна се", "обличам се"] },
  { q: "бриться / голитися", answer: "бръсна се", hint: HINT_ROUTINE, decoys: ["мия се", "къпя се", "обувам се"] },
  { q: "одеваться / одягатися", answer: "обличам се", hint: HINT_ROUTINE, decoys: ["обувам се", "събуждам се", "връщам се"] },
  { q: "обуваться / взуватися", answer: "обувам се", hint: HINT_ROUTINE, decoys: ["обличам се", "бръсна се", "събуждам се"] },
  { q: "причёсываться / зачісуватися", answer: "сресвам се", hint: HINT_ROUTINE, decoys: ["бръсна се", "мия се", "оправям"] },
  { q: "выходить / виходити", answer: "излизам", hint: HINT_ROUTINE, decoys: ["влизам", "връщам се", "отивам"] },
  { q: "входить / заходити", answer: "влизам", hint: HINT_ROUTINE, decoys: ["излизам", "връщам се", "отивам"] },
  { q: "возвращаться / повертатися", answer: "връщам се", hint: HINT_ROUTINE, decoys: ["излизам", "отивам", "лягам си"] },
  { q: "ложиться спать / лягати спати", answer: "лягам си", hint: HINT_ROUTINE, decoys: ["ставам", "събуждам се", "спя"] },
  { q: "завтракать / снідати", answer: "закусвам", hint: HINT_ROUTINE, decoys: ["обядвам", "вечерям", "ям"] },
  { q: "обедать / обідати", answer: "обядвам", hint: HINT_ROUTINE, decoys: ["закусвам", "вечерям", "ям"] },
  { q: "ужинать / вечеряти", answer: "вечерям", hint: HINT_ROUTINE, decoys: ["закусвам", "обядвам", "ям"] },
  { q: "гулять / гуляти", answer: "разхождам се", hint: HINT_ROUTINE, decoys: ["забавлявам се", "излизам", "връщам се"] },
  { q: "развлекаться / розважатися", answer: "забавлявам се", hint: HINT_ROUTINE, decoys: ["разхождам се", "почивам си", "спя"] },
  { q: "отдыхать / відпочивати", answer: "почивам си", hint: HINT_ROUTINE, decoys: ["спя", "забавлявам се", "разхождам се"] },
  { q: "опаздывать / запізнюватися", answer: "закъснявам", hint: HINT_ROUTINE, decoys: ["отивам навреме", "връщам се", "излизам"] },
  { q: "приходить вовремя / приходити вчасно", answer: "отивам навреме", hint: HINT_ROUTINE, decoys: ["закъснявам", "връщам се", "излизам"] },
  { q: "делать гимнастику / робити гімнастику", answer: "правя гимнастика", hint: HINT_ROUTINE, decoys: ["вземам душ", "оправям", "къпя се"] },
  { q: "принимать душ / приймати душ", answer: "вземам душ", hint: HINT_ROUTINE, decoys: ["къпя се", "мия се", "правя гимнастика"] },
  { q: "идти на лекции / йти на лекції", answer: "ходя на лекции", hint: HINT_ROUTINE, decoys: ["връщам се", "излизам", "учa"] },
  { q: "читать / читати", answer: "чета", hint: HINT_ROUTINE, decoys: ["пиша", "уча", "спя"] },
  { q: "спать / спати", answer: "спя", hint: HINT_ROUTINE, decoys: ["лягам си", "почивам си", "ставам"] },
  { q: "учиться / вчитися", answer: "уча", hint: HINT_ROUTINE, decoys: ["чета", "пиша", "ходя"] },
  { q: "есть / їсти", answer: "ям", hint: HINT_ROUTINE, decoys: ["закусвам", "обядвам", "вечерям"] },
  { q: "прибирать комнату / прибирати кімнату", answer: "оправям стаята", hint: HINT_ROUTINE, decoys: ["мия се", "обличам се", "къпя се"] },
  { q: "иметь встречу / мати зустріч", answer: "имам среща", hint: HINT_ROUTINE, decoys: ["закъснявам", "ходя на работа", "имам време"] },
  { q: "иметь время / мати час", answer: "имам време", hint: HINT_ROUTINE, decoys: ["имам среща", "имам работа", "нямам време"] },
  { q: "идти на работу / йти на роботу", answer: "отивам на работа", hint: HINT_ROUTINE, decoys: ["връщам се", "излизам", "ходя на лекции"] },
  { q: "чистить зубы / чистити зуби", answer: "мия си зъбите", hint: HINT_ROUTINE, decoys: ["мия се", "бръсна се", "къпя се"] },
  { q: "писать / писати", answer: "пиша", hint: HINT_ROUTINE, decoys: ["чета", "уча", "говоря"] },
  { q: "говорить / говорити", answer: "говоря", hint: HINT_ROUTINE, decoys: ["казвам", "пиша", "чета"] },
  { q: "ходить в кино / ходити в кіно", answer: "ходя на кино", hint: HINT_ROUTINE, decoys: ["ходя на дискотека", "ходя на работа", "разхождам се"] },
  { q: "ходить на дискотеку / ходити на дискотеку", answer: "ходя на дискотека", hint: HINT_ROUTINE, decoys: ["ходя на кино", "забавлявам се", "разхождам се"] },
  { q: "питаться вне дома / харчуватися поза домом", answer: "храня се навън", hint: HINT_ROUTINE, decoys: ["ям вкъщи", "обядвам", "закусвам"] },
];

// --- Times of day / adverbs ---
const HINT_TIME_PERIOD: Localized<string> = { ru: "время суток / период", uk: "час доби / період" };
export const DATA_L4_TIME_PERIOD: DataItem[] = [
  { q: "утро / ранок", answer: "сутрин", hint: HINT_TIME_PERIOD, decoys: ["вечер", "нощ", "обед"] },
  { q: "вечер / вечір", answer: "вечер", hint: HINT_TIME_PERIOD, decoys: ["сутрин", "нощ", "следобед"] },
  { q: "ночь / ніч", answer: "нощ", hint: HINT_TIME_PERIOD, decoys: ["сутрин", "вечер", "обед"] },
  { q: "день / день", answer: "ден", hint: HINT_TIME_PERIOD, decoys: ["нощ", "седмица", "месец"] },
  { q: "полдень / обід (час)", answer: "обед", hint: HINT_TIME_PERIOD, decoys: ["следобед", "преди обед", "закуска"] },
  { q: "до обеда / до обіду", answer: "преди обед", hint: HINT_TIME_PERIOD, decoys: ["следобед", "обед", "вечер"] },
  { q: "после обеда / після обіду", answer: "следобед", hint: HINT_TIME_PERIOD, decoys: ["преди обед", "обед", "вечер"] },
  { q: "рано", answer: "рано", hint: HINT_TIME_PERIOD, decoys: ["късно", "бързо", "бавно"] },
  { q: "поздно / пізно", answer: "късно", hint: HINT_TIME_PERIOD, decoys: ["рано", "бавно", "бързо"] },
  { q: "быстро / швидко", answer: "бързо", hint: HINT_TIME_PERIOD, decoys: ["бавно", "рано", "късно"] },
  { q: "медленно / повільно", answer: "бавно", hint: HINT_TIME_PERIOD, decoys: ["бързо", "рано", "късно"] },
  { q: "снаружи / на вулиці", answer: "навън", hint: HINT_TIME_PERIOD, decoys: ["вкъщи", "рано", "късно"] },
  { q: "выходные / вихідні", answer: "почивни дни", hint: HINT_TIME_PERIOD, decoys: ["уикенд", "всеки ден", "седмица"] },
  { q: "завтрак (существ.) / сніданок", answer: "закуска", hint: HINT_TIME_PERIOD, decoys: ["обяд", "вечеря", "обед"] },
  { q: "обед (еда) / обід (їжа)", answer: "обяд", hint: HINT_TIME_PERIOD, decoys: ["закуска", "вечеря", "обед"] },
  { q: "ужин (сущ.) / вечеря", answer: "вечеря", hint: HINT_TIME_PERIOD, decoys: ["обяд", "закуска", "вечер"] },
  { q: "утром (наречие) / зранку", answer: "сутрин", hint: HINT_TIME_PERIOD, decoys: ["сутринта", "вечер", "нощем"] },
  { q: "ночью (наречие) / вночі", answer: "нощем", hint: HINT_TIME_PERIOD, decoys: ["нощ", "вечер", "сутрин"] },
  { q: "дома / вдома", answer: "вкъщи", hint: HINT_TIME_PERIOD, decoys: ["навън", "у нас", "у дома"] },
  { q: "уикенд / уїкенд", answer: "уикенд", hint: HINT_TIME_PERIOD, decoys: ["почивни дни", "седмица", "ден"] },
  { q: "неделя (период) / тиждень", answer: "седмица", hint: HINT_TIME_PERIOD, decoys: ["месец", "година", "ден"] },
  { q: "месяц / місяць", answer: "месец", hint: HINT_TIME_PERIOD, decoys: ["година", "седмица", "ден"] },
  { q: "год / рік", answer: "година", hint: HINT_TIME_PERIOD, decoys: ["месец", "седмица", "час"] },
  { q: "час (60 мин.) / година", answer: "час", hint: HINT_TIME_PERIOD, decoys: ["минута", "ден", "седмица"] },
  { q: "минута / хвилина", answer: "минута", hint: HINT_TIME_PERIOD, decoys: ["час", "секунда", "ден"] },
  { q: "сейчас / зараз", answer: "сега", hint: HINT_TIME_PERIOD, decoys: ["вече", "после", "утре"] },
  { q: "потом / потім", answer: "после", hint: HINT_TIME_PERIOD, decoys: ["сега", "преди", "сутрин"] },
  { q: "сегодня / сьогодні", answer: "днес", hint: HINT_TIME_PERIOD, decoys: ["вчера", "утре", "сега"] },
  { q: "завтра / завтра", answer: "утре", hint: HINT_TIME_PERIOD, decoys: ["вчера", "днес", "сега"] },
  { q: "вчера вечером / учора ввечері", answer: "снощи", hint: HINT_TIME_PERIOD, decoys: ["вчера", "вечер", "довечера"] },
  { q: "сегодня вечером / сьогодні ввечері", answer: "довечера", hint: HINT_TIME_PERIOD, decoys: ["вечер", "снощи", "утре"] },
  { q: "в полдень (на обед) / в обід", answer: "на обед", hint: HINT_TIME_PERIOD, decoys: ["обед", "следобед", "вечер"] },
];

// --- Past-time markers ---
const HINT_PAST_TIME: Localized<string> = { ru: "указатель прошлого", uk: "вказівник минулого" };
export const DATA_L4_PAST_TIME: DataItem[] = [
  { q: "вчера", answer: "вчера", hint: HINT_PAST_TIME, decoys: ["днес", "утре", "сега"] },
  { q: "в прошлый понедельник / минулого понеділка", answer: "миналия понеделник", hint: HINT_PAST_TIME, decoys: ["миналата седмица", "миналия вторник", "този понеделник"] },
  { q: "в прошлый вторник / минулого вівторка", answer: "миналия вторник", hint: HINT_PAST_TIME, decoys: ["миналия понеделник", "миналата сряда", "този вторник"] },
  { q: "в прошлую среду / минулої середи", answer: "миналата сряда", hint: HINT_PAST_TIME, decoys: ["миналия четвъртък", "миналата събота", "тази сряда"] },
  { q: "в прошлый четверг / минулого четверга", answer: "миналия четвъртък", hint: HINT_PAST_TIME, decoys: ["миналата сряда", "миналия петък", "този четвъртък"] },
  { q: "в прошлую пятницу / минулої п'ятниці", answer: "миналия петък", hint: HINT_PAST_TIME, decoys: ["миналата събота", "миналия четвъртък", "този петък"] },
  { q: "в прошлую субботу / минулої суботи", answer: "миналата събота", hint: HINT_PAST_TIME, decoys: ["миналата неделя", "миналия петък", "тази събота"] },
  { q: "на прошлой неделе / минулого тижня", answer: "миналата седмица", hint: HINT_PAST_TIME, decoys: ["миналия месец", "тази седмица", "миналия понеделник"] },
  { q: "в прошлом месяце / минулого місяця", answer: "миналия месец", hint: HINT_PAST_TIME, decoys: ["миналата година", "този месец", "миналата седмица"] },
  { q: "в прошлом году / минулого року", answer: "миналата година", hint: HINT_PAST_TIME, decoys: ["миналия месец", "тази година", "миналата седмица"] },
  { q: "вчера утром / вчора вранці", answer: "вчера сутринта", hint: HINT_PAST_TIME, decoys: ["днес сутринта", "вчера вечерта", "утре сутринта"] },
  { q: "вчера вечером / вчора ввечері", answer: "вчера вечерта", hint: HINT_PAST_TIME, decoys: ["днес вечерта", "вчера сутринта", "утре вечерта"] },
  { q: "в прошлое воскресенье / минулої неділі", answer: "миналата неделя", hint: HINT_PAST_TIME, decoys: ["миналата събота", "тази неделя", "миналата седмица"] },
  { q: "позавчера / позавчора", answer: "онзи ден", hint: HINT_PAST_TIME, decoys: ["вчера", "снощи", "днес"] },
  { q: "прошлой ночью / минулої ночі", answer: "снощи", hint: HINT_PAST_TIME, decoys: ["вчера", "вчера вечерта", "довечера"] },
  { q: "вчера в полдень / вчора в обід", answer: "вчера на обед", hint: HINT_PAST_TIME, decoys: ["днес на обед", "вчера сутринта", "вчера вечерта"] },
  { q: "вчера после обеда / вчора після обіду", answer: "вчера следобед", hint: HINT_PAST_TIME, decoys: ["днес следобед", "вчера сутринта", "утре следобед"] },
  { q: "прошлым летом / минулого літа", answer: "миналото лято", hint: HINT_PAST_TIME, decoys: ["тази година", "това лято", "миналата година"] },
  { q: "прошлой зимой / минулої зими", answer: "миналата зима", hint: HINT_PAST_TIME, decoys: ["тази зима", "миналата година", "миналото лято"] },
  { q: "недавно / нещодавно", answer: "наскоро", hint: HINT_PAST_TIME, decoys: ["скоро", "вчера", "сега"] },
  { q: "когда-то / колись", answer: "някога", hint: HINT_PAST_TIME, decoys: ["никога", "винаги", "понякога"] },
  { q: "тогда / тоді", answer: "тогава", hint: HINT_PAST_TIME, decoys: ["сега", "после", "вече"] },
  { q: "уже / вже", answer: "вече", hint: HINT_PAST_TIME, decoys: ["още", "сега", "тогава"] },
  { q: "в прошлый четверг утром / минулого четверга вранці", answer: "миналия четвъртък сутринта", hint: HINT_PAST_TIME, decoys: ["този четвъртък", "миналата сряда", "миналия петък"] },
];

// --- Frequency adverbs ---
const FREQ_RULE: Localized<string> = {
  ru: "Частотные наречия: винаги (всегда), често (часто), обикновено (обычно), понякога (иногда), рядко (редко), никога (никогда), всеки ден (каждый день).",
  uk: "Прислівники частоти: винаги (завжди), често (часто), обикновено (зазвичай), понякога (іноді), рядко (рідко), никога (ніколи), всеки ден (кожен день).",
};
const HINT_FREQ: Localized<string> = { ru: "частотное наречие", uk: "прислівник частоти" };
const FREQ_LABEL_EVERY: Localized<string> = { ru: "каждый день", uk: "кожен день" };
const FREQ_LABEL_USUALLY: Localized<string> = { ru: "обычно", uk: "зазвичай" };
const FREQ_LABEL_ALWAYS: Localized<string> = { ru: "всегда", uk: "завжди" };
const FREQ_LABEL_OFTEN: Localized<string> = { ru: "часто", uk: "часто" };
const FREQ_LABEL_SOMETIMES: Localized<string> = { ru: "иногда", uk: "іноді" };
const FREQ_LABEL_RARELY: Localized<string> = { ru: "редко", uk: "рідко" };
const FREQ_LABEL_NEVER: Localized<string> = { ru: "никогда", uk: "ніколи" };
export const DATA_L4_FREQ: DataItem[] = [
  { q: "всегда / завжди", answer: "винаги", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "часто / часто", answer: "често", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "иногда / іноді", answer: "понякога", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "редко / рідко", answer: "рядко", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "никогда / ніколи", answer: "никога", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "каждый день / кожен день", answer: "всеки ден", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "обычно / зазвичай", answer: "обикновено", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "Той ходи ___ на работа.", label: FREQ_LABEL_EVERY, answer: "всеки ден", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "Аз ___ пия кафе сутрин.", label: FREQ_LABEL_USUALLY, answer: "обикновено", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "Тя е ___ весела.", label: FREQ_LABEL_ALWAYS, answer: "винаги", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "Те ходят ___ на кино.", label: FREQ_LABEL_OFTEN, answer: "често", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "Закъсняват ___.", label: FREQ_LABEL_SOMETIMES, answer: "понякога", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "Спи ___ до късно.", label: FREQ_LABEL_RARELY, answer: "рядко", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "Той ___ не закусва.", label: FREQ_LABEL_NEVER, answer: "никога", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "Имам среща ___.", label: FREQ_LABEL_EVERY, answer: "всеки ден", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "Ние ___ ходим на разходка вечер.", label: FREQ_LABEL_OFTEN, answer: "често", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "Аз ___ закусвам у дома.", label: FREQ_LABEL_USUALLY, answer: "обикновено", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "Той ___ не закъснява.", label: FREQ_LABEL_NEVER, answer: "никога", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "Те се срещат ___.", label: FREQ_LABEL_RARELY, answer: "рядко", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "Тя ___ работи в събота.", label: FREQ_LABEL_SOMETIMES, answer: "понякога", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "Ние ___ обядваме в дванайсет.", label: FREQ_LABEL_ALWAYS, answer: "винаги", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "Чета книга ___.", label: FREQ_LABEL_EVERY, answer: "всеки ден", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "Той ___ ходи на дискотека.", label: FREQ_LABEL_OFTEN, answer: "често", hint: HINT_FREQ, rule: FREQ_RULE },
  { q: "Аз ___ ставам в седем.", label: FREQ_LABEL_USUALLY, answer: "обикновено", hint: HINT_FREQ, rule: FREQ_RULE },
];
export const L4_FREQ_OPTIONS = ["винаги", "често", "обикновено", "понякога", "рядко", "никога", "всеки ден"];

// --- Double negation with «никога» ---
const NEVER_RULE: Localized<string> = {
  ru: "«никога» всегда сочетается с «не»: «Никога не закъснявам». Без «не» — ошибка (в отличие от русского).",
  uk: "«никога» завжди поєднується з «не»: «Никога не закъснявам». Без «не» — помилка (на відміну від української).",
};
const HINT_NEVER: Localized<string> = { ru: "добавь «никога не» к утверждению", uk: "додай «никога не» до ствердження" };
const LABEL_NEVER_TRANSFORM: Localized<string> = { ru: "+ «никога не»", uk: "+ «никога не»" };
export const DATA_L4_NEVER: DataItem[] = [
  { q: "Аз закъснявам за работа.", label: LABEL_NEVER_TRANSFORM, answer: "Аз никога не закъснявам за работа.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Аз никога закъснявам за работа.", "Аз не никога закъснявам за работа.", "Аз закъснявам никога за работа."] },
  { q: "Той закусва.", label: LABEL_NEVER_TRANSFORM, answer: "Той никога не закусва.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Той никога закусва.", "Той не никога закусва.", "Никога той закусва."] },
  { q: "Тя спи до обед.", label: LABEL_NEVER_TRANSFORM, answer: "Тя никога не спи до обед.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Тя никога спи до обед.", "Тя не никога спи до обед.", "Тя спи никога до обед."] },
  { q: "Ние работим в неделя.", label: LABEL_NEVER_TRANSFORM, answer: "Ние никога не работим в неделя.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Ние никога работим в неделя.", "Ние не никога работим в неделя.", "Ние работим никога в неделя."] },
  { q: "Те ходят на дискотека.", label: LABEL_NEVER_TRANSFORM, answer: "Те никога не ходят на дискотека.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Те никога ходят на дискотека.", "Те не никога ходят на дискотека.", "Те ходят никога на дискотека."] },
  { q: "Ти учиш вкъщи.", label: LABEL_NEVER_TRANSFORM, answer: "Ти никога не учиш вкъщи.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Ти никога учиш вкъщи.", "Ти не никога учиш вкъщи.", "Ти учиш никога вкъщи."] },
  { q: "Аз ям месо.", label: LABEL_NEVER_TRANSFORM, answer: "Аз никога не ям месо.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Аз никога ям месо.", "Аз не никога ям месо.", "Никога аз ям месо."] },
  { q: "Вие се връщате късно.", label: LABEL_NEVER_TRANSFORM, answer: "Вие никога не се връщате късно.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Вие никога се връщате късно.", "Вие не никога се връщате късно.", "Никога вие се връщате късно."] },
  { q: "Той се бръсне сутрин.", label: LABEL_NEVER_TRANSFORM, answer: "Той никога не се бръсне сутрин.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Той никога се бръсне сутрин.", "Той не никога се бръсне сутрин.", "Той се бръсне никога сутрин."] },
  { q: "Ние излизаме вечер.", label: LABEL_NEVER_TRANSFORM, answer: "Ние никога не излизаме вечер.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Ние никога излизаме вечер.", "Ние не никога излизаме вечер.", "Никога ние излизаме вечер."] },
  { q: "Тя оправя стаята.", label: LABEL_NEVER_TRANSFORM, answer: "Тя никога не оправя стаята.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Тя никога оправя стаята.", "Тя не никога оправя стаята.", "Никога тя оправя стаята."] },
  { q: "Аз закусвам сутрин.", label: LABEL_NEVER_TRANSFORM, answer: "Аз никога не закусвам сутрин.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Аз никога закусвам сутрин.", "Аз не никога закусвам сутрин.", "Никога аз закусвам сутрин."] },
  { q: "Той пие кафе вечер.", label: LABEL_NEVER_TRANSFORM, answer: "Той никога не пие кафе вечер.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Той никога пие кафе вечер.", "Той не никога пие кафе вечер.", "Никога той пие кафе вечер."] },
  { q: "Тя се разхожда сама.", label: LABEL_NEVER_TRANSFORM, answer: "Тя никога не се разхожда сама.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Тя никога се разхожда сама.", "Тя не никога се разхожда сама.", "Никога тя се разхожда сама."] },
  { q: "Те обядват вкъщи.", label: LABEL_NEVER_TRANSFORM, answer: "Те никога не обядват вкъщи.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Те никога обядват вкъщи.", "Те не никога обядват вкъщи.", "Те обядват никога вкъщи."] },
  { q: "Аз пия алкохол.", label: LABEL_NEVER_TRANSFORM, answer: "Аз никога не пия алкохол.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Аз никога пия алкохол.", "Аз не никога пия алкохол.", "Никога аз пия алкохол."] },
  { q: "Ти пишеш писма.", label: LABEL_NEVER_TRANSFORM, answer: "Ти никога не пишеш писма.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Ти никога пишеш писма.", "Ти не никога пишеш писма.", "Никога ти пишеш писма."] },
  { q: "Той ходи на лекции.", label: LABEL_NEVER_TRANSFORM, answer: "Той никога не ходи на лекции.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Той никога ходи на лекции.", "Той не никога ходи на лекции.", "Никога той ходи на лекции."] },
  { q: "Тя става рано.", label: LABEL_NEVER_TRANSFORM, answer: "Тя никога не става рано.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Тя никога става рано.", "Тя не никога става рано.", "Никога тя става рано."] },
  { q: "Ние почиваме през лятото.", label: LABEL_NEVER_TRANSFORM, answer: "Ние никога не почиваме през лятото.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Ние никога почиваме през лятото.", "Ние не никога почиваме през лятото.", "Никога ние почиваме през лятото."] },
  { q: "Те играят футбол.", label: LABEL_NEVER_TRANSFORM, answer: "Те никога не играят футбол.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Те никога играят футбол.", "Те не никога играят футбол.", "Никога те играят футбол."] },
  { q: "Той се връща навреме.", label: LABEL_NEVER_TRANSFORM, answer: "Той никога не се връща навреме.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Той никога се връща навреме.", "Той не никога се връща навреме.", "Никога той се връща навреме."] },
  { q: "Аз чета вечер.", label: LABEL_NEVER_TRANSFORM, answer: "Аз никога не чета вечер.", hint: HINT_NEVER, rule: NEVER_RULE,
    decoys: ["Аз никога чета вечер.", "Аз не никога чета вечер.", "Никога аз чета вечер."] },
];

// --- Antonyms ---
const ANT_RULE: Localized<string> = {
  ru: "Антонимические пары из урока: рано⇔късно, бързо⇔бавно, често⇔рядко, влизам⇔излизам, винаги⇔никога, ставам⇔лягам си, закъснявам⇔отивам навреме.",
  uk: "Антонімічні пари з уроку: рано⇔късно, бързо⇔бавно, често⇔рядко, влизам⇔излизам, винаги⇔никога, ставам⇔лягам си, закъснявам⇔отивам навреме.",
};
const HINT_ANT: Localized<string> = { ru: "антоним", uk: "антонім" };
export const DATA_L4_ANT: DataItem[] = [
  { q: "рано ↔ ?", answer: "късно", hint: HINT_ANT, rule: ANT_RULE, decoys: ["бавно", "рядко", "вечер"] },
  { q: "късно ↔ ?", answer: "рано", hint: HINT_ANT, rule: ANT_RULE, decoys: ["бързо", "често", "сутрин"] },
  { q: "бързо ↔ ?", answer: "бавно", hint: HINT_ANT, rule: ANT_RULE, decoys: ["късно", "рядко", "тихо"] },
  { q: "бавно ↔ ?", answer: "бързо", hint: HINT_ANT, rule: ANT_RULE, decoys: ["рано", "често", "силно"] },
  { q: "често ↔ ?", answer: "рядко", hint: HINT_ANT, rule: ANT_RULE, decoys: ["никога", "бавно", "късно"] },
  { q: "рядко ↔ ?", answer: "често", hint: HINT_ANT, rule: ANT_RULE, decoys: ["винаги", "бързо", "рано"] },
  { q: "влизам ↔ ?", answer: "излизам", hint: HINT_ANT, rule: ANT_RULE, decoys: ["връщам се", "отивам", "ходя"] },
  { q: "излизам ↔ ?", answer: "влизам", hint: HINT_ANT, rule: ANT_RULE, decoys: ["връщам се", "отивам", "ставам"] },
  { q: "винаги ↔ ?", answer: "никога", hint: HINT_ANT, rule: ANT_RULE, decoys: ["рядко", "понякога", "често"] },
  { q: "ставам ↔ ?", answer: "лягам си", hint: HINT_ANT, rule: ANT_RULE, decoys: ["спя", "събуждам се", "връщам се"] },
  { q: "закъснявам ↔ ?", answer: "отивам навреме", hint: HINT_ANT, rule: ANT_RULE, decoys: ["връщам се", "излизам", "идвам рано"] },
  { q: "преди ↔ ?", answer: "след", hint: HINT_ANT, rule: ANT_RULE, decoys: ["към", "около", "между"] },
  { q: "сутрин ↔ ?", answer: "вечер", hint: HINT_ANT, rule: ANT_RULE, decoys: ["нощ", "ден", "обед"] },
  { q: "ден ↔ ?", answer: "нощ", hint: HINT_ANT, rule: ANT_RULE, decoys: ["вечер", "сутрин", "обед"] },
  { q: "вчера ↔ ?", answer: "утре", hint: HINT_ANT, rule: ANT_RULE, decoys: ["днес", "сега", "довечера"] },
  { q: "лягам си ↔ ?", answer: "ставам", hint: HINT_ANT, rule: ANT_RULE, decoys: ["спя", "събуждам се", "почивам си"] },
  { q: "никога ↔ ?", answer: "винаги", hint: HINT_ANT, rule: ANT_RULE, decoys: ["често", "понякога", "рядко"] },
  { q: "отивам навреме ↔ ?", answer: "закъснявам", hint: HINT_ANT, rule: ANT_RULE, decoys: ["излизам", "връщам се", "идвам"] },
  { q: "след ↔ ?", answer: "преди", hint: HINT_ANT, rule: ANT_RULE, decoys: ["до", "от", "между"] },
  { q: "вкъщи ↔ ?", answer: "навън", hint: HINT_ANT, rule: ANT_RULE, decoys: ["навътре", "на работа", "в стаята"] },
  { q: "много ↔ ?", answer: "малко", hint: HINT_ANT, rule: ANT_RULE, decoys: ["рядко", "често", "винаги"] },
  { q: "започвам ↔ ?", answer: "свършвам", hint: HINT_ANT, rule: ANT_RULE, decoys: ["излизам", "ставам", "лягам си"] },
  { q: "почивни дни ↔ ?", answer: "работни дни", hint: HINT_ANT, rule: ANT_RULE, decoys: ["уикенд", "всеки ден", "седмица"] },
  { q: "снощи ↔ ?", answer: "довечера", hint: HINT_ANT, rule: ANT_RULE, decoys: ["вчера", "днес", "утре вечерта"] },
];

// --- Time prepositions ---
const PREP_TIME_RULE: Localized<string> = {
  ru: "Предлоги времени: в (точно), преди (до), след (после), до (до момента), от…до (с…до), към (около-прибл.), около (около-прибл.), между (в промежутке).",
  uk: "Прийменники часу: в (точно), преди (до), след (після), до (до моменту), от…до (з…до), към (близько-приблизно), около (близько-приблизно), между (в проміжку).",
};
const HINT_PREP_TIME_V: Localized<string> = { ru: "точно, в указанный час", uk: "точно, у зазначену годину" };
const HINT_PREP_TIME_PREDI: Localized<string> = { ru: "перед, раньше", uk: "перед, раніше" };
const HINT_PREP_TIME_SLED: Localized<string> = { ru: "после", uk: "після" };
const HINT_PREP_TIME_DO: Localized<string> = { ru: "до какого-л. момента", uk: "до якогось моменту" };
const HINT_PREP_TIME_OT: Localized<string> = { ru: "с (начальная точка, пара с «до»)", uk: "з (початкова точка, пара з «до»)" };
const HINT_PREP_TIME_KAM: Localized<string> = { ru: "к, около (прибл., в направлении часа)", uk: "до, близько (приблизно, у напрямку години)" };
const HINT_PREP_TIME_OKOL: Localized<string> = { ru: "около (прибл., ±)", uk: "близько (приблизно, ±)" };
const HINT_PREP_TIME_MEZD: Localized<string> = { ru: "между X и Y", uk: "між X і Y" };
const PREP_LABEL_BEFORE: Localized<string> = { ru: "раньше / перед", uk: "раніше / перед" };
const PREP_LABEL_AFTER: Localized<string> = { ru: "после", uk: "після" };
const PREP_LABEL_UNTIL: Localized<string> = { ru: "до момента", uk: "до моменту" };
const PREP_LABEL_EXACT: Localized<string> = { ru: "точно", uk: "точно" };
const PREP_LABEL_APPROX: Localized<string> = { ru: "приблизительно", uk: "приблизно" };
const PREP_LABEL_RANGE: Localized<string> = { ru: "в промежутке", uk: "у проміжку" };
export const DATA_L4_PREP_TIME: DataItem[] = [
  { q: "Сутрин ставам ___ седем.", label: PREP_LABEL_BEFORE, answer: "преди", hint: HINT_PREP_TIME_PREDI, rule: PREP_TIME_RULE },
  { q: "Вечер си лягам ___ десет.", label: PREP_LABEL_AFTER, answer: "след", hint: HINT_PREP_TIME_SLED, rule: PREP_TIME_RULE },
  { q: "Разхождам се ___ осем часа.", label: PREP_LABEL_UNTIL, answer: "до", hint: HINT_PREP_TIME_DO, rule: PREP_TIME_RULE },
  { q: "___ девет до един и половина учим.", answer: "от", hint: HINT_PREP_TIME_OT, rule: PREP_TIME_RULE },
  { q: "От девет ___ един и половина учим.", answer: "до", hint: HINT_PREP_TIME_DO, rule: PREP_TIME_RULE },
  { q: "Връщам се вкъщи ___ шест.", label: PREP_LABEL_APPROX, answer: "към", hint: HINT_PREP_TIME_KAM, rule: PREP_TIME_RULE },
  { q: "Връщам се вкъщи ___ шест часа.", label: PREP_LABEL_APPROX, answer: "около", hint: HINT_PREP_TIME_OKOL, rule: PREP_TIME_RULE },
  { q: "___ осем и девет закусвам.", answer: "между", hint: HINT_PREP_TIME_MEZD, rule: PREP_TIME_RULE },
  { q: "Лекцията е ___ осем часа.", label: PREP_LABEL_EXACT, answer: "в", hint: HINT_PREP_TIME_V, rule: PREP_TIME_RULE },
  { q: "Обядвам ___ един и два.", label: PREP_LABEL_RANGE, answer: "между", hint: HINT_PREP_TIME_MEZD, rule: PREP_TIME_RULE },
  { q: "Почиваме ___ пет до шест.", answer: "от", hint: HINT_PREP_TIME_OT, rule: PREP_TIME_RULE },
  { q: "Почиваме от пет ___ шест.", answer: "до", hint: HINT_PREP_TIME_DO, rule: PREP_TIME_RULE },
  { q: "Отивам на работа ___ осем.", label: PREP_LABEL_EXACT, answer: "в", hint: HINT_PREP_TIME_V, rule: PREP_TIME_RULE },
  { q: "Той пристига ___ пет.", label: PREP_LABEL_APPROX, answer: "към", hint: HINT_PREP_TIME_KAM, rule: PREP_TIME_RULE },
  { q: "Тя работи ___ обед.", label: PREP_LABEL_UNTIL, answer: "до", hint: HINT_PREP_TIME_DO, rule: PREP_TIME_RULE },
  { q: "Закусвам ___ работа.", label: PREP_LABEL_BEFORE, answer: "преди", hint: HINT_PREP_TIME_PREDI, rule: PREP_TIME_RULE },
  { q: "Разхождам се ___ вечеря.", label: PREP_LABEL_AFTER, answer: "след", hint: HINT_PREP_TIME_SLED, rule: PREP_TIME_RULE },
  { q: "Срещата е ___ десет часа.", label: PREP_LABEL_EXACT, answer: "в", hint: HINT_PREP_TIME_V, rule: PREP_TIME_RULE },
  { q: "Спя ___ обяд в неделя.", label: PREP_LABEL_UNTIL, answer: "до", hint: HINT_PREP_TIME_DO, rule: PREP_TIME_RULE },
  { q: "Уча ___ седем до девет.", answer: "от", hint: HINT_PREP_TIME_OT, rule: PREP_TIME_RULE },
  { q: "Уча от седем ___ девет.", answer: "до", hint: HINT_PREP_TIME_DO, rule: PREP_TIME_RULE },
  { q: "Лягам си ___ полунощ.", label: PREP_LABEL_APPROX, answer: "около", hint: HINT_PREP_TIME_OKOL, rule: PREP_TIME_RULE },
  { q: "Идвам ___ четири.", label: PREP_LABEL_APPROX, answer: "към", hint: HINT_PREP_TIME_KAM, rule: PREP_TIME_RULE },
  { q: "Чета вечер ___ десет и единайсет.", label: PREP_LABEL_RANGE, answer: "между", hint: HINT_PREP_TIME_MEZD, rule: PREP_TIME_RULE },
  { q: "Тренирам ___ закуска.", label: PREP_LABEL_BEFORE, answer: "преди", hint: HINT_PREP_TIME_PREDI, rule: PREP_TIME_RULE },
  { q: "Гледам филм ___ вечеря.", label: PREP_LABEL_AFTER, answer: "след", hint: HINT_PREP_TIME_SLED, rule: PREP_TIME_RULE },
  { q: "Ставам ___ седем сутринта.", label: PREP_LABEL_EXACT, answer: "в", hint: HINT_PREP_TIME_V, rule: PREP_TIME_RULE },
  { q: "Те работят ___ девет до пет.", answer: "от", hint: HINT_PREP_TIME_OT, rule: PREP_TIME_RULE },
  { q: "Свободен съм ___ два и четири.", label: PREP_LABEL_RANGE, answer: "между", hint: HINT_PREP_TIME_MEZD, rule: PREP_TIME_RULE },
  { q: "Учим ___ обед.", label: PREP_LABEL_UNTIL, answer: "до", hint: HINT_PREP_TIME_DO, rule: PREP_TIME_RULE },
  { q: "Връщаме се ___ пет следобед.", label: PREP_LABEL_APPROX, answer: "към", hint: HINT_PREP_TIME_KAM, rule: PREP_TIME_RULE },
];
export const L4_PREP_TIME_OPTIONS = ["в", "преди", "след", "до", "от", "към", "около", "между"];

// --- Clock ---
const HOURS_RULE: Localized<string> = {
  ru: "Часы: «Часът е X» или просто «X». «И петнайсет» (+15 мин), «и половина» / «и трийсет» (+30), «без петнайсет» (к след. часу). Короткая форма без «Часът е».",
  uk: "Години: «Часът е X» або просто «X». «И петнайсет» (+15 хв), «и половина» / «и трийсет» (+30), «без петнайсет» (до наступної години). Коротка форма без «Часът е».",
};
const HINT_HOURS: Localized<string> = { ru: "часы в болгарском формате", uk: "години в болгарському форматі" };
export const DATA_L4_HOURS: DataItem[] = [
  { q: "7:00", answer: "Часът е седем", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е осем", "Часът е седем и петнайсет", "Точно осем"] },
  { q: "7:15", answer: "Часът е седем и петнайсет", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е осем и петнайсет", "Часът е седем без петнайсет", "Часът е седем и половина"] },
  { q: "7:30", answer: "Часът е седем и половина", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е осем и половина", "Часът е седем и петнайсет", "Часът е осем без трийсет"] },
  { q: "7:45", answer: "Часът е осем без петнайсет", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е седем и петнайсет", "Часът е седем без петнайсет", "Часът е осем и петнайсет"] },
  { q: "8:00", answer: "Часът е осем", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е девет", "Точно седем", "Часът е осем и петнайсет"] },
  { q: "9:15", answer: "Часът е девет и петнайсет", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е десет и петнайсет", "Часът е девет без петнайсет", "Часът е девет и половина"] },
  { q: "10:30", answer: "Часът е десет и половина", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е единайсет и половина", "Часът е десет и петнайсет", "Часът е единайсет без трийсет"] },
  { q: "12:00", answer: "Часът е дванайсет", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е десет", "Часът е единайсет", "Точно единайсет"] },
  { q: "1:15", answer: "Часът е един и петнайсет", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е два и петнайсет", "Часът е един без петнайсет", "Часът е един и половина"] },
  { q: "2:45", answer: "Часът е три без петнайсет", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е два без петнайсет", "Часът е три и петнайсет", "Часът е два и петнайсет"] },
  { q: "3:30", answer: "Часът е три и половина", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е четири и половина", "Часът е три и петнайсет", "Часът е четири без трийсет"] },
  { q: "4:00", answer: "Точно четири", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Точно пет", "Часът е пет", "Часът е четири и петнайсет"] },
  { q: "6:15", answer: "Часът е шест и петнайсет", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е седем и петнайсет", "Часът е шест без петнайсет", "Часът е шест и половина"] },
  { q: "11:30", answer: "Часът е единайсет и половина", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е дванайсет и половина", "Часът е единайсет и петнайсет", "Часът е дванайсет без трийсет"] },
  { q: "5:45", answer: "Часът е шест без петнайсет", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е пет без петнайсет", "Часът е шест и петнайсет", "Часът е пет и петнайсет"] },
  { q: "5:00", answer: "Часът е пет", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е шест", "Часът е пет и петнайсет", "Точно шест"] },
  { q: "5:30", answer: "Часът е пет и половина", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е шест и половина", "Часът е пет и петнайсет", "Часът е шест без трийсет"] },
  { q: "8:15", answer: "Часът е осем и петнайсет", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е девет и петнайсет", "Часът е осем без петнайсет", "Часът е осем и половина"] },
  { q: "8:45", answer: "Часът е девет без петнайсет", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е осем без петнайсет", "Часът е девет и петнайсет", "Часът е осем и петнайсет"] },
  { q: "9:00", answer: "Часът е девет", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е десет", "Часът е девет и петнайсет", "Точно десет"] },
  { q: "9:30", answer: "Часът е девет и половина", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е десет и половина", "Часът е девет и петнайсет", "Часът е десет без трийсет"] },
  { q: "10:15", answer: "Часът е десет и петнайсет", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е единайсет и петнайсет", "Часът е десет без петнайсет", "Часът е десет и половина"] },
  { q: "10:45", answer: "Часът е единайсет без петнайсет", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е десет без петнайсет", "Часът е единайсет и петнайсет", "Часът е десет и петнайсет"] },
  { q: "11:00", answer: "Часът е единайсет", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е дванайсет", "Точно дванайсет", "Часът е единайсет и петнайсет"] },
  { q: "12:30", answer: "Часът е дванайсет и половина", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е един и половина", "Часът е дванайсет и петнайсет", "Часът е един без трийсет"] },
  { q: "1:00", answer: "Часът е един", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е два", "Точно два", "Часът е един и петнайсет"] },
  { q: "2:00", answer: "Точно два", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Точно три", "Часът е три", "Часът е два и петнайсет"] },
  { q: "2:30", answer: "Часът е два и половина", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е три и половина", "Часът е два и петнайсет", "Часът е три без трийсет"] },
  { q: "4:15", answer: "Часът е четири и петнайсет", hint: HINT_HOURS, rule: HOURS_RULE, decoys: ["Часът е пет и петнайсет", "Часът е четири без петнайсет", "Часът е четири и половина"] },
];

// --- Clock (short form, type) ---
const HINT_HOURS_SHORT: Localized<string> = { ru: "короткая форма без «Часът е»", uk: "коротка форма без «Часът е»" };
export const DATA_L4_HOURS_TYPE: DataItem[] = [
  { q: "7:00", answer: "седем", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "7:15", answer: "седем и петнайсет", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "7:30", answer: "седем и половина", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "7:45", answer: "осем без петнайсет", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "8:00", answer: "осем", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "9:15", answer: "девет и петнайсет", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "10:30", answer: "десет и половина", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "12:00", answer: "дванайсет", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "1:15", answer: "един и петнайсет", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "2:45", answer: "три без петнайсет", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "3:30", answer: "три и половина", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "6:15", answer: "шест и петнайсет", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "11:30", answer: "единайсет и половина", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "5:00", answer: "пет", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "5:30", answer: "пет и половина", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "5:45", answer: "шест без петнайсет", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "8:15", answer: "осем и петнайсет", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "8:45", answer: "девет без петнайсет", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "9:00", answer: "девет", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "9:30", answer: "девет и половина", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "10:15", answer: "десет и петнайсет", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "11:00", answer: "единайсет", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "12:30", answer: "дванайсет и половина", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "1:00", answer: "един", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "2:30", answer: "два и половина", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "4:00", answer: "четири", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
  { q: "4:15", answer: "четири и петнайсет", hint: HINT_HOURS_SHORT, rule: HOURS_RULE },
];

// --- Past of «съм»: бях ---
const BYAH_RULE: Localized<string> = {
  ru: "Прошедшее «съм»: бях/беше/беше · бяхме/бяхте/бяха. Формы «ти» и «той/тя/то» совпадают.",
  uk: "Минуле «съм»: бях/беше/беше · бяхме/бяхте/бяха. Форми «ти» і «той/тя/то» збігаються.",
};
const HINT_BYAH: Localized<string> = { ru: "форма «бях» по лицу/числу", uk: "форма «бях» за особою/числом" };
export const DATA_L4_BYAH: DataItem[] = [
  { q: "Аз", answer: "бях", hint: { ru: "я был/была", uk: "я був/була" }, rule: BYAH_RULE },
  { q: "Ти", answer: "беше", hint: { ru: "ты был", uk: "ти був" }, rule: BYAH_RULE },
  { q: "Той/Тя/То", answer: "беше", hint: { ru: "он/она был(а)", uk: "він/вона був/була" }, rule: BYAH_RULE },
  { q: "Ние", answer: "бяхме", hint: { ru: "мы были", uk: "ми були" }, rule: BYAH_RULE },
  { q: "Вие", answer: "бяхте", hint: { ru: "вы были", uk: "ви були" }, rule: BYAH_RULE },
  { q: "Те", answer: "бяха", hint: { ru: "они были", uk: "вони були" }, rule: BYAH_RULE },
  { q: "Вчера аз ___ в София.", answer: "бях", hint: HINT_BYAH, rule: BYAH_RULE },
  { q: "Миналата седмица ние ___ в Пловдив.", answer: "бяхме", hint: HINT_BYAH, rule: BYAH_RULE },
  { q: "Къде ___ ти вчера?", answer: "беше", hint: HINT_BYAH, rule: BYAH_RULE },
  { q: "Миналата година те ___ в Гърция.", answer: "бяха", hint: HINT_BYAH, rule: BYAH_RULE },
  { q: "Петър ___ на работа вчера.", answer: "беше", hint: HINT_BYAH, rule: BYAH_RULE },
  { q: "Вие ___ ли тук снощи?", answer: "бяхте", hint: HINT_BYAH, rule: BYAH_RULE },
  { q: "Аз ___ уморен снощи.", answer: "бях", hint: HINT_BYAH, rule: BYAH_RULE },
  { q: "Тя ___ болна миналата седмица.", answer: "беше", hint: HINT_BYAH, rule: BYAH_RULE },
  { q: "Ние ___ заедно на концерта.", answer: "бяхме", hint: HINT_BYAH, rule: BYAH_RULE },
  { q: "Те ___ приятели отдавна.", answer: "бяха", hint: HINT_BYAH, rule: BYAH_RULE },
  { q: "Миналата година аз ___ в България.", answer: "бях", hint: HINT_BYAH, rule: BYAH_RULE },
  { q: "Ти ___ ли в София миналия месец?", answer: "беше", hint: HINT_BYAH, rule: BYAH_RULE },
  { q: "Вие ___ на екскурзия в неделя.", answer: "бяхте", hint: HINT_BYAH, rule: BYAH_RULE },
  { q: "Децата ___ в училище вчера.", answer: "бяха", hint: HINT_BYAH, rule: BYAH_RULE },
  { q: "Иван ___ в библиотеката следобед.", answer: "беше", hint: HINT_BYAH, rule: BYAH_RULE },
  { q: "Аз ___ много зает миналата седмица.", answer: "бях", hint: HINT_BYAH, rule: BYAH_RULE },
  { q: "Ние ___ на море миналото лято.", answer: "бяхме", hint: HINT_BYAH, rule: BYAH_RULE },
  { q: "Къде ___ вие снощи?", answer: "бяхте", hint: HINT_BYAH, rule: BYAH_RULE },
  { q: "Те ___ студенти в Пловдив.", answer: "бяха", hint: HINT_BYAH, rule: BYAH_RULE },
  { q: "Той ___ учител преди.", answer: "беше", hint: HINT_BYAH, rule: BYAH_RULE },
];
export const L4_BYAH_OPTIONS = ["бях", "беше", "бяхме", "бяхте", "бяха"];

// --- Past «бях» (type) ---
export const DATA_L4_BYAH_TYPE: DataItem[] = [
  { q: "Аз (вчера)", answer: "бях", hint: { ru: "я был/была", uk: "я був/була" }, rule: BYAH_RULE },
  { q: "Ти (вчера)", answer: "беше", hint: { ru: "ты был", uk: "ти був" }, rule: BYAH_RULE },
  { q: "Той (вчера)", answer: "беше", hint: { ru: "он был", uk: "він був" }, rule: BYAH_RULE },
  { q: "Ние (вчера)", answer: "бяхме", hint: { ru: "мы были", uk: "ми були" }, rule: BYAH_RULE },
  { q: "Вие (вчера)", answer: "бяхте", hint: { ru: "вы были", uk: "ви були" }, rule: BYAH_RULE },
  { q: "Те (вчера)", answer: "бяха", hint: { ru: "они были", uk: "вони були" }, rule: BYAH_RULE },
];

// --- Future of «съм»: ще бъда ---
const SHTE_BADA_RULE: Localized<string> = {
  ru: "Будущее «съм»: ще + бъда/бъдеш/бъде · бъдем/бъдете/бъдат. Частица «ще» перед глаголом.",
  uk: "Майбутнє «съм»: ще + бъда/бъдеш/бъде · бъдем/бъдете/бъдат. Частка «ще» перед дієсловом.",
};
export const DATA_L4_SHTE_BADA: DataItem[] = [
  { q: "Аз", answer: "ще бъда", hint: { ru: "я буду", uk: "я буду" }, rule: SHTE_BADA_RULE },
  { q: "Ти", answer: "ще бъдеш", hint: { ru: "ты будешь", uk: "ти будеш" }, rule: SHTE_BADA_RULE },
  { q: "Той/Тя/То", answer: "ще бъде", hint: { ru: "он/она будет", uk: "він/вона буде" }, rule: SHTE_BADA_RULE },
  { q: "Ние", answer: "ще бъдем", hint: { ru: "мы будем", uk: "ми будемо" }, rule: SHTE_BADA_RULE },
  { q: "Вие", answer: "ще бъдете", hint: { ru: "вы будете", uk: "ви будете" }, rule: SHTE_BADA_RULE },
  { q: "Те", answer: "ще бъдат", hint: { ru: "они будут", uk: "вони будуть" }, rule: SHTE_BADA_RULE },
];

// --- Future positive vs negative: ще / няма да ---
const SHTE_NEG_RULE: Localized<string> = {
  ru: "Буд. вр. «съм»: положит. — «ще» + форма, отрицат. — «няма да» + форма. Пример: ще бъда ⇔ няма да бъда.",
  uk: "Майб. час «съм»: ствердн. — «ще» + форма, заперечн. — «няма да» + форма. Приклад: ще бъда ⇔ няма да бъда.",
};
const LABEL_POS: Localized<string> = { ru: "утверждение", uk: "ствердження" };
const LABEL_NEG: Localized<string> = { ru: "отрицание", uk: "заперечення" };
const HINT_SHTE: Localized<string> = { ru: "положительная форма: ще + гл.", uk: "стверджувальна форма: ще + дієсл." };
const HINT_NYAMA_DA: Localized<string> = { ru: "отрицательная форма: няма да + гл.", uk: "заперечна форма: няма да + дієсл." };
export const DATA_L4_SHTE_NEG: DataItem[] = [
  { q: "Утре аз ___ бъда у дома.", label: LABEL_POS, answer: "ще", hint: HINT_SHTE, rule: SHTE_NEG_RULE },
  { q: "Утре аз ___ бъда у дома.", label: LABEL_NEG, answer: "няма да", hint: HINT_NYAMA_DA, rule: SHTE_NEG_RULE },
  { q: "Ти ___ бъдеш ли тук утре?", label: LABEL_POS, answer: "ще", hint: HINT_SHTE, rule: SHTE_NEG_RULE },
  { q: "Ти ___ бъдеш тук утре.", label: LABEL_NEG, answer: "няма да", hint: HINT_NYAMA_DA, rule: SHTE_NEG_RULE },
  { q: "Той ___ бъде на работа.", label: LABEL_POS, answer: "ще", hint: HINT_SHTE, rule: SHTE_NEG_RULE },
  { q: "Той ___ бъде на работа.", label: LABEL_NEG, answer: "няма да", hint: HINT_NYAMA_DA, rule: SHTE_NEG_RULE },
  { q: "Ние ___ бъдем на екскурзия.", label: LABEL_POS, answer: "ще", hint: HINT_SHTE, rule: SHTE_NEG_RULE },
  { q: "Ние ___ бъдем на екскурзия.", label: LABEL_NEG, answer: "няма да", hint: HINT_NYAMA_DA, rule: SHTE_NEG_RULE },
  { q: "Вие ___ бъдете в София.", label: LABEL_POS, answer: "ще", hint: HINT_SHTE, rule: SHTE_NEG_RULE },
  { q: "Вие ___ бъдете в София.", label: LABEL_NEG, answer: "няма да", hint: HINT_NYAMA_DA, rule: SHTE_NEG_RULE },
  { q: "Те ___ бъдат на училище.", label: LABEL_POS, answer: "ще", hint: HINT_SHTE, rule: SHTE_NEG_RULE },
  { q: "Те ___ бъдат на училище.", label: LABEL_NEG, answer: "няма да", hint: HINT_NYAMA_DA, rule: SHTE_NEG_RULE },
  { q: "Петър ___ бъде на рождения ден.", label: LABEL_POS, answer: "ще", hint: HINT_SHTE, rule: SHTE_NEG_RULE },
  { q: "Децата ___ бъдат в ресторанта.", label: LABEL_NEG, answer: "няма да", hint: HINT_NYAMA_DA, rule: SHTE_NEG_RULE },
  { q: "Аз ___ бъда зает утре.", label: LABEL_POS, answer: "ще", hint: HINT_SHTE, rule: SHTE_NEG_RULE },
  { q: "Тя ___ бъде в Пловдив идната седмица.", label: LABEL_POS, answer: "ще", hint: HINT_SHTE, rule: SHTE_NEG_RULE },
  { q: "Тя ___ бъде в Пловдив идната седмица.", label: LABEL_NEG, answer: "няма да", hint: HINT_NYAMA_DA, rule: SHTE_NEG_RULE },
  { q: "Ние ___ бъдем заедно на Нова година.", label: LABEL_POS, answer: "ще", hint: HINT_SHTE, rule: SHTE_NEG_RULE },
  { q: "Ние ___ бъдем заедно на Нова година.", label: LABEL_NEG, answer: "няма да", hint: HINT_NYAMA_DA, rule: SHTE_NEG_RULE },
  { q: "Те ___ бъдат на дискотека довечера.", label: LABEL_POS, answer: "ще", hint: HINT_SHTE, rule: SHTE_NEG_RULE },
  { q: "Те ___ бъдат на дискотека довечера.", label: LABEL_NEG, answer: "няма да", hint: HINT_NYAMA_DA, rule: SHTE_NEG_RULE },
  { q: "Ти ___ бъдеш свободен в неделя.", label: LABEL_POS, answer: "ще", hint: HINT_SHTE, rule: SHTE_NEG_RULE },
  { q: "Ти ___ бъдеш свободен в неделя.", label: LABEL_NEG, answer: "няма да", hint: HINT_NYAMA_DA, rule: SHTE_NEG_RULE },
  { q: "Утре те ___ бъдат на лекции.", label: LABEL_POS, answer: "ще", hint: HINT_SHTE, rule: SHTE_NEG_RULE },
  { q: "Аз ___ бъда тук утре сутрин.", label: LABEL_NEG, answer: "няма да", hint: HINT_NYAMA_DA, rule: SHTE_NEG_RULE },
  { q: "Вие ___ бъдете готови до пет.", label: LABEL_POS, answer: "ще", hint: HINT_SHTE, rule: SHTE_NEG_RULE },
  { q: "Той ___ бъде вкъщи довечера.", label: LABEL_NEG, answer: "няма да", hint: HINT_NYAMA_DA, rule: SHTE_NEG_RULE },
  { q: "Догодина ние ___ бъдем в София.", label: LABEL_POS, answer: "ще", hint: HINT_SHTE, rule: SHTE_NEG_RULE },
  { q: "Ние ___ бъдем на работа в неделя.", label: LABEL_NEG, answer: "няма да", hint: HINT_NYAMA_DA, rule: SHTE_NEG_RULE },
];
export const L4_SHTE_NEG_OPTIONS = ["ще", "няма да"];

// --- Paradigms ---
const L4_PRONOUNS = ["Аз", "Ти", "Той", "Ние", "Вие", "Те"];
export const DATA_L4_PARADIGM: ParadigmItem[] = [
  { verb: "чета", pronouns: L4_PRONOUNS, forms: ["чета", "четеш", "чете", "четем", "четете", "четат"],
    hint: { ru: "читать (I спряж.)", uk: "читати (I дієвідм.)" }, rule: CHETA_RULE },
  { verb: "уча", pronouns: L4_PRONOUNS, forms: ["уча", "учиш", "учи", "учим", "учите", "учат"],
    hint: { ru: "учить (II спряж.)", uk: "вчити (II дієвідм.)" }, rule: UCHA_RULE },
  { verb: "казвам", pronouns: L4_PRONOUNS, forms: ["казвам", "казваш", "казва", "казваме", "казвате", "казват"],
    hint: { ru: "говорить/называть (III спряж.)", uk: "казати/називати (III дієвідм.)" }, rule: KAZVAM_L4_RULE },
  { verb: "оправям", pronouns: L4_PRONOUNS, forms: ["оправям", "оправяш", "оправя", "оправяме", "оправяте", "оправят"],
    hint: { ru: "прибирать (III спряж., -я-)", uk: "прибирати (III дієвідм., -я-)" }, rule: OPRAVYAM_RULE },
  { verb: "правя", pronouns: L4_PRONOUNS, forms: ["правя", "правиш", "прави", "правим", "правите", "правят"],
    hint: { ru: "делать (II спряж.)", uk: "робити (II дієвідм.)" }, rule: PRAVYA_RULE },
  { verb: "ям", pronouns: L4_PRONOUNS, forms: ["ям", "ядеш", "яде", "ядем", "ядете", "ядат"],
    hint: { ru: "есть (неправ.)", uk: "їсти (неправ.)" }, rule: YAM_RULE },
  { verb: "мия се", pronouns: L4_PRONOUNS, forms: ["мия се", "миеш се", "мие се", "мием се", "миете се", "мият се"],
    hint: { ru: "умываться (возвр.)", uk: "умиватися (зворот.)" }, rule: MIYA_SE_RULE },
  { verb: "бях", pronouns: L4_PRONOUNS, forms: ["бях", "беше", "беше", "бяхме", "бяхте", "бяха"],
    hint: { ru: "прошедшее «съм»", uk: "минуле «съм»" }, rule: BYAH_RULE },
  { verb: "ще бъда", pronouns: L4_PRONOUNS, forms: ["ще бъда", "ще бъдеш", "ще бъде", "ще бъдем", "ще бъдете", "ще бъдат"],
    hint: { ru: "будущее «съм»", uk: "майбутнє «съм»" }, rule: SHTE_BADA_RULE },
];

// --- Build sentences ---
export const DATA_L4_BUILD: BuildItem[] = [
  { words: ["Аз", "ставам", "в", "седем", "часа"], translation: { ru: "Я встаю в семь часов.", uk: "Я встаю о сьомій годині." } },
  { words: ["Всяка", "сутрин", "правя", "гимнастика"], translation: { ru: "Каждое утро я делаю зарядку.", uk: "Щоранку я роблю зарядку." } },
  { words: ["Вечер", "се", "разхождам", "с", "приятели"], translation: { ru: "Вечером я гуляю с друзьями.", uk: "Увечері я гуляю з друзями." } },
  { words: ["Никога", "не", "закъснявам", "за", "работа"], translation: { ru: "Я никогда не опаздываю на работу.", uk: "Я ніколи не запізнююся на роботу." } },
  { words: ["Той", "се", "връща", "вкъщи", "към", "шест"], translation: { ru: "Он возвращается домой около шести.", uk: "Він повертається додому близько шостої." } },
  { words: ["Обикновено", "не", "закусвам"], translation: { ru: "Обычно я не завтракаю.", uk: "Зазвичай я не снідаю." } },
  { words: ["Между", "осем", "и", "девет", "закусвам"], translation: { ru: "Между восемью и девятью я завтракаю.", uk: "Між восьмою і дев'ятою я снідаю." } },
  { words: ["Вчера", "бях", "на", "работа"], translation: { ru: "Вчера я был на работе.", uk: "Вчора я був на роботі." } },
  { words: ["Утре", "ще", "бъда", "в", "София"], translation: { ru: "Завтра я буду в Софии.", uk: "Завтра я буду в Софії." } },
  { words: ["През", "почивните", "дни", "ходя", "на", "кино"], translation: { ru: "В выходные я хожу в кино.", uk: "На вихідні я ходжу в кіно." } },
  { words: ["Следобед", "се", "връщам", "вкъщи", "и", "чета"], translation: { ru: "После обеда я возвращаюсь домой и читаю.", uk: "Після обіду я повертаюся додому і читаю." } },
  { words: ["От", "девет", "до", "един", "учим"], translation: { ru: "С девяти до одного мы учимся.", uk: "З дев'ятої до першої ми вчимося." } },
  { words: ["Сутрин", "се", "събуждам", "в", "седем"], translation: { ru: "Утром я просыпаюсь в семь.", uk: "Вранці я прокидаюся о сьомій." } },
  { words: ["Тя", "си", "мие", "зъбите", "сутрин"], translation: { ru: "Она чистит зубы утром.", uk: "Вона чистить зуби вранці." } },
  { words: ["Ние", "обядваме", "около", "един"], translation: { ru: "Мы обедаем около часа.", uk: "Ми обідаємо близько першої." } },
  { words: ["Той", "никога", "не", "закусва"], translation: { ru: "Он никогда не завтракает.", uk: "Він ніколи не снідає." } },
  { words: ["Лягам", "си", "след", "десет"], translation: { ru: "Я ложусь после десяти.", uk: "Я лягаю після десятої." } },
  { words: ["В", "неделя", "спя", "до", "късно"], translation: { ru: "В воскресенье я сплю до позднего часа.", uk: "У неділю я сплю до пізнього часу." } },
  { words: ["Те", "се", "забавляват", "с", "приятели"], translation: { ru: "Они развлекаются с друзьями.", uk: "Вони розважаються з друзями." } },
  { words: ["Утре", "няма", "да", "съм", "тук"], translation: { ru: "Завтра меня здесь не будет.", uk: "Завтра мене тут не буде." } },
  { words: ["Миналата", "година", "бяхме", "в", "Гърция"], translation: { ru: "В прошлом году мы были в Греции.", uk: "Минулого року ми були в Греції." } },
  { words: ["Аз", "уча", "български", "всеки", "ден"], translation: { ru: "Я учу болгарский каждый день.", uk: "Я вчу болгарську кожен день." } },
  { words: ["Той", "ходи", "на", "лекции", "в", "осем"], translation: { ru: "Он ходит на лекции в восемь.", uk: "Він ходить на лекції о восьмій." } },
  { words: ["Понякога", "обядвам", "навън"], translation: { ru: "Иногда я обедаю не дома.", uk: "Іноді я обідаю не вдома." } },
];

// --- Build clock phrases ---
export const DATA_L4_HOURS_BUILD: BuildItem[] = [
  { words: ["Часът", "е", "седем"], translation: { ru: "Сейчас семь часов.", uk: "Зараз сьома година." } },
  { words: ["Часът", "е", "седем", "и", "петнайсет"], translation: { ru: "Сейчас семь пятнадцать.", uk: "Зараз сьома п'ятнадцять." } },
  { words: ["Часът", "е", "седем", "и", "половина"], translation: { ru: "Сейчас половина восьмого.", uk: "Зараз пів на восьму." } },
  { words: ["Часът", "е", "осем", "без", "петнайсет"], translation: { ru: "Без пятнадцати восемь.", uk: "За п'ятнадцять восьма." } },
  { words: ["Точно", "седем"], translation: { ru: "Ровно семь.", uk: "Рівно сьома." } },
  { words: ["Колко", "е", "часът", "?"], translation: { ru: "Который час?", uk: "Котра година?" } },
  { words: ["Часът", "е", "десет", "и", "половина"], translation: { ru: "Сейчас половина одиннадцатого.", uk: "Зараз пів на одинадцяту." } },
  { words: ["В", "колко", "часа", "ставате", "?"], translation: { ru: "Во сколько вы встаёте?", uk: "О котрій ви встаєте?" } },
  { words: ["Часът", "е", "осем", "и", "петнайсет"], translation: { ru: "Сейчас восемь пятнадцать.", uk: "Зараз восьма п'ятнадцять." } },
  { words: ["Часът", "е", "девет", "без", "петнайсет"], translation: { ru: "Без пятнадцати девять.", uk: "За п'ятнадцять дев'ята." } },
  { words: ["Часът", "е", "дванайсет"], translation: { ru: "Сейчас двенадцать часов.", uk: "Зараз дванадцята година." } },
  { words: ["Часът", "е", "един", "и", "половина"], translation: { ru: "Сейчас половина второго.", uk: "Зараз пів на другу." } },
  { words: ["Точно", "пет"], translation: { ru: "Ровно пять.", uk: "Рівно п'ята." } },
  { words: ["От", "колко", "до", "колко", "учиш", "?"], translation: { ru: "С которого до которого ты учишься?", uk: "Від котрої до котрої ти вчишся?" } },
  { words: ["Часът", "е", "три", "и", "трийсет"], translation: { ru: "Сейчас три тридцать.", uk: "Зараз пів на четверту." } },
];

// --- Match: antonyms ---
const HINT_MATCH_ANT: Localized<string> = { ru: "соедини антонимы", uk: "з'єднай антоніми" };
export const DATA_L4_MATCH_ANT: MatchItem[] = [
  { left: "рано", right: "късно", hint: HINT_MATCH_ANT },
  { left: "бързо", right: "бавно", hint: HINT_MATCH_ANT },
  { left: "често", right: "рядко", hint: HINT_MATCH_ANT },
  { left: "винаги", right: "никога", hint: HINT_MATCH_ANT },
  { left: "влизам", right: "излизам", hint: HINT_MATCH_ANT },
  { left: "ставам", right: "лягам си", hint: HINT_MATCH_ANT },
  { left: "преди", right: "след", hint: HINT_MATCH_ANT },
  { left: "сутрин", right: "вечер", hint: HINT_MATCH_ANT },
  { left: "вчера", right: "утре", hint: HINT_MATCH_ANT },
  { left: "закъснявам", right: "отивам навреме", hint: HINT_MATCH_ANT },
  { left: "ден", right: "нощ", hint: HINT_MATCH_ANT },
  { left: "вкъщи", right: "навън", hint: HINT_MATCH_ANT },
  { left: "много", right: "малко", hint: HINT_MATCH_ANT },
  { left: "снощи", right: "довечера", hint: HINT_MATCH_ANT },
  { left: "почивни дни", right: "работни дни", hint: HINT_MATCH_ANT },
  { left: "започвам", right: "свършвам", hint: HINT_MATCH_ANT },
  { left: "обличам се", right: "събличам се", hint: HINT_MATCH_ANT },
  { left: "обувам се", right: "събувам се", hint: HINT_MATCH_ANT },
  { left: "преди обед", right: "следобед", hint: HINT_MATCH_ANT },
  { left: "събуждам се", right: "лягам си", hint: HINT_MATCH_ANT },
];

// --- Match: 1sg → 3sg across conjugation types ---
const HINT_MATCH_CONJ: Localized<string> = { ru: "1л.ед.ч. ↔ 3л.ед.ч.", uk: "1ос.одн. ↔ 3ос.одн." };
export const DATA_L4_MATCH_CONJ: MatchItem[] = [
  { left: "чета", right: "чете", hint: HINT_MATCH_CONJ },
  { left: "уча", right: "учи", hint: HINT_MATCH_CONJ },
  { left: "казвам", right: "казва", hint: HINT_MATCH_CONJ },
  { left: "оправям", right: "оправя", hint: HINT_MATCH_CONJ },
  { left: "правя", right: "прави", hint: HINT_MATCH_CONJ },
  { left: "ям", right: "яде", hint: HINT_MATCH_CONJ },
  { left: "живея", right: "живее", hint: HINT_MATCH_CONJ },
  { left: "говоря", right: "говори", hint: HINT_MATCH_CONJ },
  { left: "пиша", right: "пише", hint: HINT_MATCH_CONJ },
  { left: "спя", right: "спи", hint: HINT_MATCH_CONJ },
  { left: "ходя", right: "ходи", hint: HINT_MATCH_CONJ },
  { left: "имам", right: "има", hint: HINT_MATCH_CONJ },
  { left: "искам", right: "иска", hint: HINT_MATCH_CONJ },
  { left: "отивам", right: "отива", hint: HINT_MATCH_CONJ },
  { left: "обличам", right: "облича", hint: HINT_MATCH_CONJ },
  { left: "връщам", right: "връща", hint: HINT_MATCH_CONJ },
  { left: "закусвам", right: "закусва", hint: HINT_MATCH_CONJ },
  { left: "обядвам", right: "обядва", hint: HINT_MATCH_CONJ },
  { left: "вечерям", right: "вечеря", hint: HINT_MATCH_CONJ },
  { left: "ставам", right: "става", hint: HINT_MATCH_CONJ },
];

// --- Odd one out ---
const ODD_L4_NOT_CONJ_I: Localized<string> = { ru: "одно — не I спряжения", uk: "одне — не I дієвідміни" };
const ODD_L4_NOT_CONJ_II: Localized<string> = { ru: "одно — не II спряжения", uk: "одне — не II дієвідміни" };
const ODD_L4_NOT_REFL: Localized<string> = { ru: "одно — не возвратный глагол", uk: "одне — не зворотне дієслово" };
const ODD_L4_NOT_TIME: Localized<string> = { ru: "одно — не время суток", uk: "одне — не час доби" };
const ODD_L4_NOT_FREQ: Localized<string> = { ru: "одно — не частотное наречие", uk: "одне — не прислівник частоти" };
const ODD_L4_NOT_PAST: Localized<string> = { ru: "одно — не прошлое (бях)", uk: "одне — не минуле (бях)" };
const ODD_L4_NOT_FUT: Localized<string> = { ru: "одно — не будущее (ще бъда)", uk: "одне — не майбутнє (ще бъда)" };
const ODD_L4_NOT_PREP_TIME: Localized<string> = { ru: "одно — не предлог времени", uk: "одне — не прийменник часу" };
const ODD_L4_NOT_ROUTINE: Localized<string> = { ru: "одно — не дневное действие", uk: "одне — не денна дія" };
const ODD_L4_NOT_MEAL: Localized<string> = { ru: "одно — не приём пищи", uk: "одне — не прийом їжі" };
const ODD_L4_NOT_PAST_MARK: Localized<string> = { ru: "одно — не указатель прошлого", uk: "одне — не вказівник минулого" };
export const DATA_L4_ODD: OddItem[] = [
  { words: ["чета", "живея", "пиша", "уча"], odd: "уча", hint: ODD_L4_NOT_CONJ_I },
  { words: ["уча", "говоря", "правя", "казвам"], odd: "казвам", hint: ODD_L4_NOT_CONJ_II },
  { words: ["мия се", "бръсна се", "обличам се", "чета"], odd: "чета", hint: ODD_L4_NOT_REFL },
  { words: ["сутрин", "вечер", "нощ", "година"], odd: "година", hint: ODD_L4_NOT_TIME },
  { words: ["винаги", "често", "никога", "бързо"], odd: "бързо", hint: ODD_L4_NOT_FREQ },
  { words: ["бях", "беше", "бяхме", "ще бъда"], odd: "ще бъда", hint: ODD_L4_NOT_PAST },
  { words: ["ще бъда", "ще бъдеш", "ще бъдат", "бяхме"], odd: "бяхме", hint: ODD_L4_NOT_FUT },
  { words: ["в", "преди", "след", "стая"], odd: "стая", hint: ODD_L4_NOT_PREP_TIME },
  { words: ["ставам", "закусвам", "ходя", "стол"], odd: "стол", hint: ODD_L4_NOT_ROUTINE },
  { words: ["закуска", "обяд", "вечеря", "стая"], odd: "стая", hint: ODD_L4_NOT_MEAL },
  { words: ["закусвам", "обядвам", "вечерям", "чета"], odd: "чета", hint: ODD_L4_NOT_MEAL },
  { words: ["вчера", "миналата седмица", "миналия месец", "днес"], odd: "днес", hint: ODD_L4_NOT_PAST_MARK },
  { words: ["пиша", "чета", "пея", "правя"], odd: "правя", hint: ODD_L4_NOT_CONJ_I },
  { words: ["спя", "ходя", "учa", "казвам"], odd: "казвам", hint: ODD_L4_NOT_CONJ_II },
  { words: ["къпя се", "разхождам се", "забавлявам се", "пиша"], odd: "пиша", hint: ODD_L4_NOT_REFL },
  { words: ["сутрин", "обед", "вечер", "почивни дни"], odd: "почивни дни", hint: ODD_L4_NOT_TIME },
  { words: ["обикновено", "винаги", "често", "късно"], odd: "късно", hint: ODD_L4_NOT_FREQ },
  { words: ["бях", "беше", "бяха", "ще бъдем"], odd: "ще бъдем", hint: ODD_L4_NOT_PAST },
  { words: ["ще бъде", "ще бъдете", "ще бъдат", "беше"], odd: "беше", hint: ODD_L4_NOT_FUT },
  { words: ["в", "до", "около", "всеки"], odd: "всеки", hint: ODD_L4_NOT_PREP_TIME },
  { words: ["събуждам се", "ставам", "обличам се", "стая"], odd: "стая", hint: ODD_L4_NOT_ROUTINE },
  { words: ["закусвам", "обядвам", "вечерям", "ходя"], odd: "ходя", hint: ODD_L4_NOT_MEAL },
  { words: ["вчера", "снощи", "миналата година", "утре"], odd: "утре", hint: ODD_L4_NOT_PAST_MARK },
  { words: ["онзи ден", "вчера", "миналата седмица", "довечера"], odd: "довечера", hint: ODD_L4_NOT_PAST_MARK },
];
