import type { DataItem, BuildItem, MatchItem, OddItem, ParadigmItem } from "../types";
import type { Localized } from "../i18n/types";

// ========================= LESSON 6 =========================

// --- Street / address vocabulary ---
const HINT_STREET: Localized<string> = { ru: "слово на тему улицы / адреса", uk: "слово на тему вулиці / адреси" };
export const DATA_L6_STREET: DataItem[] = [
  { q: "улица / вулиця", answer: "улица", hint: HINT_STREET, decoys: ["булевард", "квартал", "адрес"] },
  { q: "проспект / бульвар", answer: "булевард", hint: HINT_STREET, decoys: ["улица", "пресечка", "пряка"] },
  { q: "квартал / район (квартал)", answer: "квартал", hint: HINT_STREET, decoys: ["улица", "блок", "адрес"] },
  { q: "адрес / адреса", answer: "адрес", hint: HINT_STREET, decoys: ["квартал", "номер", "етаж"] },
  { q: "номер дома / номер будинку", answer: "номер", hint: HINT_STREET, decoys: ["етаж", "блок", "вход"] },
  { q: "блок (многоэтажный) / блок (багатоповерховий)", answer: "блок", hint: HINT_STREET, decoys: ["вход", "квартал", "етаж"] },
  { q: "подъезд / під'їзд", answer: "вход", hint: HINT_STREET, decoys: ["етаж", "блок", "апартамент"] },
  { q: "этаж / поверх", answer: "етаж", hint: HINT_STREET, decoys: ["вход", "апартамент", "блок"] },
  { q: "квартира / квартира", answer: "апартамент", hint: HINT_STREET, decoys: ["етаж", "блок", "вход"] },
  { q: "город / місто", answer: "град", hint: HINT_STREET, decoys: ["село", "квартал", "улица"] },
  { q: "перекрёсток / перехрестя", answer: "кръстовище", hint: HINT_STREET, decoys: ["пресечка", "пряка", "тротоар"] },
  { q: "переулок / провулок", answer: "пресечка", hint: HINT_STREET, decoys: ["пряка", "улица", "квартал"] },
  { q: "соседняя улица / сусідня вулиця", answer: "съседна улица", hint: HINT_STREET, decoys: ["главна улица", "пресечка", "тротоар"] },
  { q: "главная улица / головна вулиця", answer: "главна улица", hint: HINT_STREET, decoys: ["пресечка", "съседна улица", "пряка"] },
  { q: "тротуар / тротуар", answer: "тротоар", hint: HINT_STREET, decoys: ["пешеходна пътека", "спирка", "паркинг"] },
  { q: "пешеходный переход / пішохідний перехід", answer: "пешеходна пътека", hint: HINT_STREET, decoys: ["тротоар", "спирка", "кръстовище"] },
  { q: "светофор / світлофор", answer: "светофар", hint: HINT_STREET, decoys: ["знак", "паметник", "кръстовище"] },
  { q: "остановка / зупинка", answer: "спирка", hint: HINT_STREET, decoys: ["паркинг", "тротоар", "гараж"] },
  { q: "автобус / автобус", answer: "автобус", hint: HINT_STREET, decoys: ["тролей", "трамвай", "такси"] },
  { q: "троллейбус / тролейбус", answer: "тролей", hint: HINT_STREET, decoys: ["автобус", "трамвай", "мотор"] },
  { q: "трамвай / трамвай", answer: "трамвай", hint: HINT_STREET, decoys: ["тролей", "автобус", "влак"] },
  { q: "машина / автомобіль", answer: "кола", hint: HINT_STREET, decoys: ["камион", "мотор", "колело"] },
  { q: "велосипед / велосипед", answer: "колело", hint: HINT_STREET, decoys: ["мотор", "кола", "камион"] },
  { q: "мотоцикл / мотоцикл", answer: "мотор", hint: HINT_STREET, decoys: ["колело", "кола", "камион"] },
  { q: "грузовик / вантажівка", answer: "камион", hint: HINT_STREET, decoys: ["автобус", "кола", "мотор"] },
  { q: "парковка / паркування", answer: "паркинг", hint: HINT_STREET, decoys: ["спирка", "гараж", "тротоар"] },
  { q: "гараж / гараж", answer: "гараж", hint: HINT_STREET, decoys: ["паркинг", "спирка", "вход"] },
  { q: "билет / квиток", answer: "билет", hint: HINT_STREET, decoys: ["карта", "документ", "знак"] },
  { q: "удостоверение личности / посвідчення особи", answer: "лична карта", hint: HINT_STREET, decoys: ["шофьорска книжка", "документ", "билет"] },
  { q: "водительские права / водійські права", answer: "шофьорска книжка", hint: HINT_STREET, decoys: ["лична карта", "документ", "билет"] },
  { q: "полицейский / поліцейський", answer: "полицай", hint: HINT_STREET, decoys: ["шофьор", "капитан", "водач"] },
  { q: "водитель / водій", answer: "шофьор", hint: HINT_STREET, decoys: ["полицай", "пътник", "капитан"] },
  { q: "проверка / перевірка", answer: "проверка", hint: HINT_STREET, decoys: ["документ", "билет", "адрес"] },
  { q: "банк / банк", answer: "банка", hint: HINT_STREET, decoys: ["поща", "аптека", "болница"] },
  { q: "почта / пошта", answer: "поща", hint: HINT_STREET, decoys: ["банка", "аптека", "болница"] },
  { q: "аптека / аптека", answer: "аптека", hint: HINT_STREET, decoys: ["болница", "поликлиника", "поща"] },
  { q: "больница / лікарня", answer: "болница", hint: HINT_STREET, decoys: ["поликлиника", "аптека", "сервиз"] },
  { q: "поликлиника / поліклініка", answer: "поликлиника", hint: HINT_STREET, decoys: ["болница", "аптека", "сервиз"] },
  { q: "памятник / пам'ятник", answer: "паметник", hint: HINT_STREET, decoys: ["музей", "галерия", "театър"] },
  { q: "касса (шлем) / каска", answer: "каска", hint: HINT_STREET, decoys: ["билет", "карта", "документ"] },
];

// --- Street / address vocabulary (type) ---
export const DATA_L6_STREET_TYPE: DataItem[] = DATA_L6_STREET.slice(0, 18);

// --- Polite phrases ---
const POLITE_RULE: Localized<string> = {
  ru: "Учтивые формулы: «Заповядайте» (вот, пожалуйста / прошу — когда что-то даёшь), «Благодаря» (спасибо), «Извинете» (извините), «Моля» (пожалуйста / прошу — просьба или ответ на «спасибо»).",
  uk: "Ввічливі формули: «Заповядайте» (ось, будь ласка / прошу — коли щось даєш), «Благодаря» (дякую), «Извинете» (вибачте), «Моля» (будь ласка / прошу — прохання або відповідь на «дякую»).",
};
const HINT_POLITE_GIVE: Localized<string> = { ru: "когда что-то даёшь / предлагаешь", uk: "коли щось даєш / пропонуєш" };
const HINT_POLITE_THANK: Localized<string> = { ru: "когда благодаришь", uk: "коли дякуєш" };
const HINT_POLITE_SORRY: Localized<string> = { ru: "когда извиняешься / привлекаешь внимание", uk: "коли вибачаєшся / привертаєш увагу" };
const HINT_POLITE_REQUEST: Localized<string> = { ru: "вежливая просьба / «не за что»", uk: "ввічливе прохання / «нема за що»" };
export const DATA_L6_POLITE: DataItem[] = [
  { q: "🤲📄 Ето документите. ___!", answer: "Заповядайте", hint: HINT_POLITE_GIVE, rule: POLITE_RULE },
  { q: "🙏 много за помощта.", answer: "Благодаря", hint: HINT_POLITE_THANK, rule: POLITE_RULE },
  { q: "🙇 ___, не Ви чух.", answer: "Извинете", hint: HINT_POLITE_SORRY, rule: POLITE_RULE },
  { q: "🙏 Ви, дайте ми менюто.", answer: "Моля", hint: HINT_POLITE_REQUEST, rule: POLITE_RULE },
  { q: "☕ ___, кафето Ви.", answer: "Заповядайте", hint: HINT_POLITE_GIVE, rule: POLITE_RULE },
  { q: "💐 ___ за цветята!", answer: "Благодаря", hint: HINT_POLITE_THANK, rule: POLITE_RULE },
  { q: "🚶💥 Ох, ___!", answer: "Извинете", hint: HINT_POLITE_SORRY, rule: POLITE_RULE },
  { q: "— Благодаря! — ___.", answer: "Моля", hint: HINT_POLITE_REQUEST, rule: POLITE_RULE },
  { q: "🪑 ___, седнете.", answer: "Заповядайте", hint: HINT_POLITE_GIVE, rule: POLITE_RULE },
  { q: "🎁 ___ за подаръка.", answer: "Благодаря", hint: HINT_POLITE_THANK, rule: POLITE_RULE },
  { q: "⏰ ___, колко е часът?", answer: "Извинете", hint: HINT_POLITE_SORRY, rule: POLITE_RULE },
  { q: "🙏 ___ те, помогни ми.", answer: "Моля", hint: HINT_POLITE_REQUEST, rule: POLITE_RULE },
  { q: "🍽️ ___, обядът е готов.", answer: "Заповядайте", hint: HINT_POLITE_GIVE, rule: POLITE_RULE },
  { q: "🤝 ___ за помощта.", answer: "Благодаря", hint: HINT_POLITE_THANK, rule: POLITE_RULE },
  { q: "❓ ___, как се казвате?", answer: "Извинете", hint: HINT_POLITE_SORRY, rule: POLITE_RULE },
];
export const L6_POLITE_OPTIONS = ["Заповядайте", "Благодаря", "Извинете", "Моля"];

// --- Titles (господин / госпожа / госпожица) ---
const TITLES_RULE: Localized<string> = {
  ru: "Господин (Mr., взрослый мужчина), госпожа (Mrs., замужняя женщина), госпожица (Miss, незамужняя девушка). Сокращения: г-н, г-жа, г-ца. Звательные формы: господине, госпожо, госпожице.",
  uk: "Господин (Mr., дорослий чоловік), госпожа (Mrs., заміжня жінка), госпожица (Miss, незаміжня дівчина). Скорочення: г-н, г-жа, г-ца. Кличні форми: господине, госпожо, госпожице.",
};
const HINT_TITLES_M: Localized<string> = { ru: "взрослый мужчина", uk: "дорослий чоловік" };
const HINT_TITLES_MARRIED: Localized<string> = { ru: "замужняя женщина", uk: "заміжня жінка" };
const HINT_TITLES_MISS: Localized<string> = { ru: "незамужняя девушка", uk: "незаміжня дівчина" };
export const DATA_L6_TITLES: DataItem[] = [
  { q: "🙋‍♂️ зрелый мужчина / зрілий чоловік", answer: "господин", hint: HINT_TITLES_M, rule: TITLES_RULE },
  { q: "🙋‍♀️💍 замужняя женщина / заміжня жінка", answer: "госпожа", hint: HINT_TITLES_MARRIED, rule: TITLES_RULE },
  { q: "🙋‍♀️ молодая незамужняя / молода незаміжня", answer: "госпожица", hint: HINT_TITLES_MISS, rule: TITLES_RULE },
  { q: "👨‍💼 директор Иванов", answer: "господин", hint: HINT_TITLES_M, rule: TITLES_RULE },
  { q: "👩‍🏫 учительница Петрова (замужем) / вчителька Петрова (заміжня)", answer: "госпожа", hint: HINT_TITLES_MARRIED, rule: TITLES_RULE },
  { q: "👩‍🎓 студентка Маркова / студентка Маркова", answer: "госпожица", hint: HINT_TITLES_MISS, rule: TITLES_RULE },
  { q: "г-н Иванов = ?", answer: "господин", hint: HINT_TITLES_M, rule: TITLES_RULE },
  { q: "г-жа Иванова = ?", answer: "госпожа", hint: HINT_TITLES_MARRIED, rule: TITLES_RULE },
  { q: "г-ца Шапкарова = ?", answer: "госпожица", hint: HINT_TITLES_MISS, rule: TITLES_RULE },
  { q: "👨 капитан Вълчанов", answer: "господин", hint: HINT_TITLES_M, rule: TITLES_RULE },
  { q: "👰 «новобрачная» Иванова / «новоодружена» Іванова", answer: "госпожа", hint: HINT_TITLES_MARRIED, rule: TITLES_RULE },
  { q: "🎀 школьница Маркова / школярка Маркова", answer: "госпожица", hint: HINT_TITLES_MISS, rule: TITLES_RULE },
];
export const L6_TITLES_OPTIONS = ["господин", "госпожа", "госпожица"];

// --- Match: abbreviations + titles vocative ---
const HINT_MATCH_ABBR: Localized<string> = { ru: "сокращение / звательная форма ↔ полная форма", uk: "скорочення / клична форма ↔ повна форма" };
export const DATA_L6_MATCH_ABBR: MatchItem[] = [
  { left: "г-н", right: "господин", hint: HINT_MATCH_ABBR },
  { left: "г-жа", right: "госпожа", hint: HINT_MATCH_ABBR },
  { left: "г-ца", right: "госпожица", hint: HINT_MATCH_ABBR },
  { left: "ул.", right: "улица", hint: HINT_MATCH_ABBR },
  { left: "бул.", right: "булевард", hint: HINT_MATCH_ABBR },
  { left: "ет.", right: "етаж", hint: HINT_MATCH_ABBR },
  { left: "ап.", right: "апартамент", hint: HINT_MATCH_ABBR },
  { left: "гр.", right: "град", hint: HINT_MATCH_ABBR },
  { left: "№", right: "номер", hint: HINT_MATCH_ABBR },
  { left: "пл.", right: "площад", hint: HINT_MATCH_ABBR },
];

// --- Verb «мога» ---
const MOGA_RULE: Localized<string> = {
  ru: "«мога» — мочь. Парадигма: мога/можеш/може · можем/можете/могат. Используется в да-конструкции: мога да + глагол.",
  uk: "«мога» — могти. Парадигма: мога/можеш/може · можем/можете/могат. Використовується у да-конструкції: мога да + дієслово.",
};
export const DATA_L6_MOGA: DataItem[] = [
  { q: "Аз", answer: "мога", hint: { ru: "я могу", uk: "я можу" }, rule: MOGA_RULE },
  { q: "Ти", answer: "можеш", hint: { ru: "ты можешь", uk: "ти можеш" }, rule: MOGA_RULE },
  { q: "Той/Тя/То", answer: "може", hint: { ru: "он/она может", uk: "він/вона може" }, rule: MOGA_RULE },
  { q: "Ние", answer: "можем", hint: { ru: "мы можем", uk: "ми можемо" }, rule: MOGA_RULE },
  { q: "Вие", answer: "можете", hint: { ru: "вы можете", uk: "ви можете" }, rule: MOGA_RULE },
  { q: "Те", answer: "могат", hint: { ru: "они могут", uk: "вони можуть" }, rule: MOGA_RULE },
];

// --- Verb «обичам» ---
const OBICHAM_RULE: Localized<string> = {
  ru: "«обичам» — любить (III спряж.): обичам/обичаш/обича · обичаме/обичате/обичат. С да-конструкцией: «обичам да чета».",
  uk: "«обичам» — любити (III дієвідм.): обичам/обичаш/обича · обичаме/обичате/обичат. З да-конструкцією: «обичам да чета».",
};
export const DATA_L6_OBICHAM: DataItem[] = [
  { q: "Аз", answer: "обичам", hint: { ru: "я люблю", uk: "я люблю" }, rule: OBICHAM_RULE },
  { q: "Ти", answer: "обичаш", hint: { ru: "ты любишь", uk: "ти любиш" }, rule: OBICHAM_RULE },
  { q: "Той/Тя/То", answer: "обича", hint: { ru: "он/она любит", uk: "він/вона любить" }, rule: OBICHAM_RULE },
  { q: "Ние", answer: "обичаме", hint: { ru: "мы любим", uk: "ми любимо" }, rule: OBICHAM_RULE },
  { q: "Вие", answer: "обичате", hint: { ru: "вы любите", uk: "ви любите" }, rule: OBICHAM_RULE },
  { q: "Те", answer: "обичат", hint: { ru: "они любят", uk: "вони люблять" }, rule: OBICHAM_RULE },
];

// --- Modal verb selection (да-construction) ---
const MODAL_RULE: Localized<string> = {
  ru: "Да-конструкция: модальный глагол (искам / мога / трябва / обичам / започвам / спирам) + «да» + глагол в наст. вр. «трябва» — безличный (всегда «трябва»).",
  uk: "Да-конструкція: модальне дієслово (искам / мога / трябва / обичам / започвам / спирам) + «да» + дієслово в теп. ч. «трябва» — безособове (завжди «трябва»).",
};
const HINT_MODAL_WANT: Localized<string> = { ru: "хотеть → искам", uk: "хотіти → искам" };
const HINT_MODAL_CAN: Localized<string> = { ru: "мочь → мога", uk: "могти → мога" };
const HINT_MODAL_MUST: Localized<string> = { ru: "должен → трябва (безл.)", uk: "повинен → трябва (безособ.)" };
const HINT_MODAL_LOVE: Localized<string> = { ru: "любить → обичам", uk: "любити → обичам" };
const HINT_MODAL_START: Localized<string> = { ru: "начинать → започвам", uk: "починати → започвам" };
const HINT_MODAL_STOP: Localized<string> = { ru: "переставать → спирам", uk: "переставати → спирам" };
const LBL_WANT: Localized<string> = { ru: "(хотеть)", uk: "(хотіти)" };
const LBL_CAN: Localized<string> = { ru: "(мочь)", uk: "(могти)" };
const LBL_MUST: Localized<string> = { ru: "(должен)", uk: "(повинен)" };
const LBL_LOVE: Localized<string> = { ru: "(любить)", uk: "(любити)" };
const LBL_START: Localized<string> = { ru: "(начинать)", uk: "(починати)" };
const LBL_STOP: Localized<string> = { ru: "(переставать)", uk: "(переставати)" };
export const DATA_L6_MODAL: DataItem[] = [
  { q: "Той ___ да спи.", label: LBL_WANT, answer: "иска", hint: HINT_MODAL_WANT, rule: MODAL_RULE,
    decoys: ["може", "трябва", "обича"] },
  { q: "Те ___ да работят с компютър.", label: LBL_CAN, answer: "могат", hint: HINT_MODAL_CAN, rule: MODAL_RULE,
    decoys: ["искат", "трябва", "обичат"] },
  { q: "Аз ___ да говоря френски.", label: LBL_CAN, answer: "мога", hint: HINT_MODAL_CAN, rule: MODAL_RULE,
    decoys: ["трябва", "искам", "обичам"] },
  { q: "Тя ___ да чете книги.", label: LBL_LOVE, answer: "обича", hint: HINT_MODAL_LOVE, rule: MODAL_RULE,
    decoys: ["иска", "може", "трябва"] },
  { q: "Не ___ да пушим.", label: LBL_MUST, answer: "трябва", hint: HINT_MODAL_MUST, rule: MODAL_RULE,
    decoys: ["искаме", "можем", "обичаме"] },
  { q: "Ние ___ да тръгнем рано.", label: LBL_MUST, answer: "трябва", hint: HINT_MODAL_MUST, rule: MODAL_RULE,
    decoys: ["искаме", "можем", "обичаме"] },
  { q: "Вие ___ да отидете на работа.", label: LBL_MUST, answer: "трябва", hint: HINT_MODAL_MUST, rule: MODAL_RULE,
    decoys: ["искате", "можете", "обичате"] },
  { q: "Той ___ да свири на китара.", label: LBL_CAN, answer: "може", hint: HINT_MODAL_CAN, rule: MODAL_RULE,
    decoys: ["иска", "трябва", "обича"] },
  { q: "Ти ___ ли да дойдеш утре?", label: LBL_CAN, answer: "можеш", hint: HINT_MODAL_CAN, rule: MODAL_RULE,
    decoys: ["искаш", "обичаш", "започваш"] },
  { q: "Ние ___ да учим български.", label: LBL_WANT, answer: "искаме", hint: HINT_MODAL_WANT, rule: MODAL_RULE,
    decoys: ["можем", "трябва", "обичаме"] },
  { q: "Аз ___ да се разхождам в парка.", label: LBL_LOVE, answer: "обичам", hint: HINT_MODAL_LOVE, rule: MODAL_RULE,
    decoys: ["искам", "мога", "трябва"] },
  { q: "Те ___ да работят утре.", label: LBL_START, answer: "започват", hint: HINT_MODAL_START, rule: MODAL_RULE,
    decoys: ["спират", "обичат", "искат"] },
  { q: "Той ___ да пуши.", label: LBL_STOP, answer: "спира", hint: HINT_MODAL_STOP, rule: MODAL_RULE,
    decoys: ["започва", "иска", "трябва"] },
  { q: "Вие ___ ли да говорите английски?", label: LBL_CAN, answer: "можете", hint: HINT_MODAL_CAN, rule: MODAL_RULE,
    decoys: ["искате", "обичате", "трябва"] },
  { q: "Аз ___ да отида на море.", label: LBL_WANT, answer: "искам", hint: HINT_MODAL_WANT, rule: MODAL_RULE,
    decoys: ["мога", "трябва", "обичам"] },
];

// --- Build sentences with да-construction ---
export const DATA_L6_DA_BUILD: BuildItem[] = [
  { words: ["Той", "иска", "да", "спи"], translation: { ru: "Он хочет спать.", uk: "Він хоче спати." } },
  { words: ["Те", "могат", "да", "работят", "с", "компютър"], translation: { ru: "Они умеют работать с компьютером.", uk: "Вони вміють працювати з комп'ютером." } },
  { words: ["Аз", "искам", "да", "уча", "български"], translation: { ru: "Я хочу учить болгарский.", uk: "Я хочу вчити болгарську." } },
  { words: ["Тя", "обича", "да", "чете", "книги"], translation: { ru: "Она любит читать книги.", uk: "Вона любить читати книги." } },
  { words: ["Не", "трябва", "да", "пушим"], translation: { ru: "Мы не должны курить.", uk: "Ми не повинні курити." } },
  { words: ["Можеш", "ли", "да", "дойдеш", "утре", "?"], translation: { ru: "Можешь прийти завтра?", uk: "Можеш прийти завтра?" } },
  { words: ["Трябва", "да", "тръгваме"], translation: { ru: "Мы должны идти.", uk: "Ми повинні йти." } },
  { words: ["Той", "не", "може", "да", "лети"], translation: { ru: "Он не может летать.", uk: "Він не може літати." } },
  { words: ["Започвам", "да", "уча", "от", "утре"], translation: { ru: "Я начинаю учиться с завтрашнего дня.", uk: "Я починаю вчитися із завтрашнього дня." } },
  { words: ["Той", "спира", "да", "пуши"], translation: { ru: "Он бросает курить.", uk: "Він кидає палити." } },
  { words: ["Какво", "искаш", "да", "правиш", "сега", "?"], translation: { ru: "Что ты хочешь делать сейчас?", uk: "Що ти хочеш робити зараз?" } },
  { words: ["Обичам", "да", "се", "разхождам", "в", "парка"], translation: { ru: "Я люблю гулять в парке.", uk: "Я люблю гуляти в парку." } },
  { words: ["Не", "трябва", "да", "ядем", "много"], translation: { ru: "Мы не должны много есть.", uk: "Ми не повинні багато їсти." } },
  { words: ["Той", "трябва", "да", "учи", "в", "университета"], translation: { ru: "Он должен учиться в университете.", uk: "Він повинен учитися в університеті." } },
];

// --- Motion vocabulary ---
const HINT_MOTION: Localized<string> = { ru: "глагол движения", uk: "дієслово руху" };
export const DATA_L6_MOTION: DataItem[] = [
  { q: "идти пешком / йти пішки", answer: "вървя", hint: HINT_MOTION, decoys: ["карам", "ходя", "тичам"] },
  { q: "ходить (регулярно) / ходити (регулярно)", answer: "ходя", hint: HINT_MOTION, decoys: ["вървя", "идвам", "отивам"] },
  { q: "идти сюда / йти сюди", answer: "идвам", hint: HINT_MOTION, decoys: ["отивам", "връщам се", "тръгвам"] },
  { q: "идти туда / йти туди", answer: "отивам", hint: HINT_MOTION, decoys: ["идвам", "връщам се", "тръгвам"] },
  { q: "возвращаться / повертатися", answer: "връщам се", hint: HINT_MOTION, decoys: ["идвам", "отивам", "тръгвам"] },
  { q: "отправляться / вирушати", answer: "тръгвам", hint: HINT_MOTION, decoys: ["спирам", "стигам", "минавам"] },
  { q: "останавливаться / зупинятися", answer: "спирам", hint: HINT_MOTION, decoys: ["тръгвам", "паркирам", "слизам"] },
  { q: "проходить (мимо) / проходити (повз)", answer: "минавам", hint: HINT_MOTION, decoys: ["пресичам", "стигам", "завивам"] },
  { q: "сворачивать / повертати (за ріг)", answer: "завивам", hint: HINT_MOTION, decoys: ["минавам", "пресичам", "тръгвам"] },
  { q: "доходить / дістатися", answer: "стигам", hint: HINT_MOTION, decoys: ["идвам", "тръгвам", "минавам"] },
  { q: "переходить (улицу) / переходити (вулицю)", answer: "пресичам", hint: HINT_MOTION, decoys: ["минавам", "завивам", "влизам"] },
  { q: "гулять / гуляти", answer: "разхождам се", hint: HINT_MOTION, decoys: ["вървя", "минавам", "отивам"] },
  { q: "входить / заходити", answer: "влизам", hint: HINT_MOTION, decoys: ["излизам", "качвам се", "слизам"] },
  { q: "выходить / виходити", answer: "излизам", hint: HINT_MOTION, decoys: ["влизам", "слизам", "тръгвам"] },
  { q: "садиться (в транспорт) / сідати (в транспорт)", answer: "качвам се", hint: HINT_MOTION, decoys: ["слизам", "влизам", "паркирам"] },
  { q: "выходить (из транспорта) / виходити (з транспорту)", answer: "слизам", hint: HINT_MOTION, decoys: ["качвам се", "излизам", "спирам"] },
  { q: "вести (машину) / вести (машину)", answer: "карам", hint: HINT_MOTION, decoys: ["вървя", "ходя", "паркирам"] },
  { q: "парковать(ся) / паркувати(ся)", answer: "паркирам", hint: HINT_MOTION, decoys: ["спирам", "карам", "тръгвам"] },
];

// --- Motion vocabulary (type) ---
export const DATA_L6_MOTION_TYPE: DataItem[] = DATA_L6_MOTION.slice(0, 16);

// --- Match: motion antonyms / pairs ---
const HINT_MOTION_PAIR: Localized<string> = { ru: "соедини противоположные / парные глаголы движения", uk: "з'єднай протилежні / парні дієслова руху" };
export const DATA_L6_MATCH_MOTION: MatchItem[] = [
  { left: "идвам", right: "отивам", hint: HINT_MOTION_PAIR },
  { left: "тръгвам", right: "спирам", hint: HINT_MOTION_PAIR },
  { left: "влизам", right: "излизам", hint: HINT_MOTION_PAIR },
  { left: "качвам се", right: "слизам", hint: HINT_MOTION_PAIR },
  { left: "идвам", right: "връщам се", hint: HINT_MOTION_PAIR },
  { left: "ходя", right: "вървя", hint: HINT_MOTION_PAIR },
  { left: "карам", right: "паркирам", hint: HINT_MOTION_PAIR },
  { left: "минавам", right: "пресичам", hint: HINT_MOTION_PAIR },
  { left: "близо", right: "далече", hint: HINT_MOTION_PAIR },
  { left: "напред", right: "назад", hint: HINT_MOTION_PAIR },
];

// --- Aspect: imperfective → terminative ---
const ASPECT_RULE: Localized<string> = {
  ru: "Вид глагола: несвършен (повторяющееся, обычно: «винаги, често, всеки ден») ↔ свършен (однократное: «веднъж»). Свършен — формы с «(да)»: идвам→дойда, отивам→отида.",
  uk: "Вид дієслова: несвършен (повторюване, зазвичай: «винаги, често, всеки ден») ↔ свършен (одноразова дія: «веднъж»). Свършен — форми з «(да)»: идвам→дойда, отивам→отида.",
};
const HINT_ASPECT: Localized<string> = { ru: "свършен (однократный) вид", uk: "свършен (одноразовий) вид" };
export const DATA_L6_ASPECT: DataItem[] = [
  { q: "идвам → ?", answer: "дойда", hint: HINT_ASPECT, rule: ASPECT_RULE, decoys: ["отида", "стигна", "идвам"] },
  { q: "отивам → ?", answer: "отида", hint: HINT_ASPECT, rule: ASPECT_RULE, decoys: ["дойда", "стигна", "ходя"] },
  { q: "ходя → ?", answer: "отида", hint: HINT_ASPECT, rule: ASPECT_RULE, decoys: ["дойда", "вървя", "тръгна"] },
  { q: "връщам се → ?", answer: "върна се", hint: HINT_ASPECT, rule: ASPECT_RULE, decoys: ["отида", "тръгна", "дойда"] },
  { q: "тръгвам → ?", answer: "тръгна", hint: HINT_ASPECT, rule: ASPECT_RULE, decoys: ["спра", "мина", "стигна"] },
  { q: "спирам → ?", answer: "спра", hint: HINT_ASPECT, rule: ASPECT_RULE, decoys: ["тръгна", "мина", "стигна"] },
  { q: "минавам → ?", answer: "мина", hint: HINT_ASPECT, rule: ASPECT_RULE, decoys: ["завия", "стигна", "вляза"] },
  { q: "завивам → ?", answer: "завия", hint: HINT_ASPECT, rule: ASPECT_RULE, decoys: ["мина", "стигна", "вляза"] },
  { q: "влизам → ?", answer: "вляза", hint: HINT_ASPECT, rule: ASPECT_RULE, decoys: ["изляза", "сляза", "мина"] },
  { q: "излизам → ?", answer: "изляза", hint: HINT_ASPECT, rule: ASPECT_RULE, decoys: ["вляза", "сляза", "мина"] },
  { q: "слизам → ?", answer: "сляза", hint: HINT_ASPECT, rule: ASPECT_RULE, decoys: ["качвам се", "вляза", "изляза"] },
  { q: "качвам се → ?", answer: "кача се", hint: HINT_ASPECT, rule: ASPECT_RULE, decoys: ["сляза", "вляза", "тръгна"] },
];

// --- Match: aspect pairs ---
const HINT_ASPECT_MATCH: Localized<string> = { ru: "соедини несвършен ↔ свършен вид", uk: "з'єднай несвършен ↔ свършен вид" };
export const DATA_L6_MATCH_ASPECT: MatchItem[] = [
  { left: "идвам", right: "дойда", hint: HINT_ASPECT_MATCH },
  { left: "отивам", right: "отида", hint: HINT_ASPECT_MATCH },
  { left: "връщам се", right: "върна се", hint: HINT_ASPECT_MATCH },
  { left: "тръгвам", right: "тръгна", hint: HINT_ASPECT_MATCH },
  { left: "спирам", right: "спра", hint: HINT_ASPECT_MATCH },
  { left: "минавам", right: "мина", hint: HINT_ASPECT_MATCH },
  { left: "завивам", right: "завия", hint: HINT_ASPECT_MATCH },
  { left: "влизам", right: "вляза", hint: HINT_ASPECT_MATCH },
  { left: "излизам", right: "изляза", hint: HINT_ASPECT_MATCH },
  { left: "слизам", right: "сляза", hint: HINT_ASPECT_MATCH },
  { left: "качвам се", right: "кача се", hint: HINT_ASPECT_MATCH },
];

// --- Imperative singular (positive) ---
const IMP_SG_RULE: Localized<string> = {
  ru: "Положит. императив ед.ч.: после согласной — корень + и (чет-а→чет-и); после гласной — корень + й (изми-я→изми-й; пит-а-м→пит-ай).",
  uk: "Стверд. імператив одн.: після приголосної — корінь + и (чет-а→чет-и); після голосної — корінь + й (изми-я→изми-й; пит-а-м→пит-ай).",
};
const HINT_IMP_SG: Localized<string> = { ru: "повелит. ед.ч. (ты)", uk: "наказовий одн. (ти)" };
export const DATA_L6_IMP_SG: DataItem[] = [
  { q: "чета → ?", answer: "чети", hint: HINT_IMP_SG, rule: IMP_SG_RULE, decoys: ["чет", "четай", "четете"] },
  { q: "пиша → ?", answer: "пиши", hint: HINT_IMP_SG, rule: IMP_SG_RULE, decoys: ["пишай", "пишете", "пишеш"] },
  { q: "говоря → ?", answer: "говори", hint: HINT_IMP_SG, rule: IMP_SG_RULE, decoys: ["говорай", "говорете", "говориш"] },
  { q: "спра → ?", answer: "спри", hint: HINT_IMP_SG, rule: IMP_SG_RULE, decoys: ["спирай", "спрете", "спираш"] },
  { q: "мина → ?", answer: "мини", hint: HINT_IMP_SG, rule: IMP_SG_RULE, decoys: ["минавай", "минете", "минаваш"] },
  { q: "питам → ?", answer: "питай", hint: HINT_IMP_SG, rule: IMP_SG_RULE, decoys: ["пити", "питайте", "питаш"] },
  { q: "чакам → ?", answer: "чакай", hint: HINT_IMP_SG, rule: IMP_SG_RULE, decoys: ["чаки", "чакайте", "чакаш"] },
  { q: "измия → ?", answer: "измий", hint: HINT_IMP_SG, rule: IMP_SG_RULE, decoys: ["измивай", "измийте", "измиваш"] },
  { q: "ставам → ?", answer: "ставай", hint: HINT_IMP_SG, rule: IMP_SG_RULE, decoys: ["стани", "ставайте", "ставаш"] },
  { q: "минавам → ?", answer: "минавай", hint: HINT_IMP_SG, rule: IMP_SG_RULE, decoys: ["мини", "минавайте", "минаваш"] },
  { q: "карам → ?", answer: "карай", hint: HINT_IMP_SG, rule: IMP_SG_RULE, decoys: ["кари", "карайте", "караш"] },
  { q: "тръгна → ?", answer: "тръгни", hint: HINT_IMP_SG, rule: IMP_SG_RULE, decoys: ["тръгвай", "тръгнете", "тръгваш"] },
  { q: "завия → ?", answer: "завий", hint: HINT_IMP_SG, rule: IMP_SG_RULE, decoys: ["завивай", "завийте", "завиваш"] },
  { q: "отворя → ?", answer: "отвори", hint: HINT_IMP_SG, rule: IMP_SG_RULE, decoys: ["отварям", "отворете", "отваряй"] },
  { q: "пиша (sg) → ?", answer: "пиши", hint: HINT_IMP_SG, rule: IMP_SG_RULE, decoys: ["пишете", "пишай", "пишеш"] },
];

// --- Imperative plural (positive) ---
const IMP_PL_RULE: Localized<string> = {
  ru: "Положит. императив мн.ч.: после согласной — корень + ете (чет-а→чет-ете); после гласной — корень + йте (пит-а-м→пит-айте).",
  uk: "Стверд. імператив мн.: після приголосної — корінь + ете (чет-а→чет-ете); після голосної — корінь + йте (пит-а-м→пит-айте).",
};
const HINT_IMP_PL: Localized<string> = { ru: "повелит. мн.ч. (вы)", uk: "наказовий мн. (ви)" };
export const DATA_L6_IMP_PL: DataItem[] = [
  { q: "чета → (вы)", answer: "четете", hint: HINT_IMP_PL, rule: IMP_PL_RULE, decoys: ["чети", "четайте", "четат"] },
  { q: "пиша → (вы)", answer: "пишете", hint: HINT_IMP_PL, rule: IMP_PL_RULE, decoys: ["пиши", "пишайте", "пишат"] },
  { q: "говоря → (вы)", answer: "говорете", hint: HINT_IMP_PL, rule: IMP_PL_RULE, decoys: ["говори", "говорайте", "говорят"] },
  { q: "спра → (вы)", answer: "спрете", hint: HINT_IMP_PL, rule: IMP_PL_RULE, decoys: ["спри", "спирайте", "спрат"] },
  { q: "мина → (вы)", answer: "минете", hint: HINT_IMP_PL, rule: IMP_PL_RULE, decoys: ["мини", "минавайте", "минат"] },
  { q: "питам → (вы)", answer: "питайте", hint: HINT_IMP_PL, rule: IMP_PL_RULE, decoys: ["питете", "питай", "питат"] },
  { q: "чакам → (вы)", answer: "чакайте", hint: HINT_IMP_PL, rule: IMP_PL_RULE, decoys: ["чакете", "чакай", "чакат"] },
  { q: "измия → (вы)", answer: "измийте", hint: HINT_IMP_PL, rule: IMP_PL_RULE, decoys: ["измиете", "измий", "измивайте"] },
  { q: "ставам → (вы)", answer: "ставайте", hint: HINT_IMP_PL, rule: IMP_PL_RULE, decoys: ["ставете", "стани", "стават"] },
  { q: "карам → (вы)", answer: "карайте", hint: HINT_IMP_PL, rule: IMP_PL_RULE, decoys: ["карете", "карай", "карат"] },
  { q: "тръгна → (вы)", answer: "тръгнете", hint: HINT_IMP_PL, rule: IMP_PL_RULE, decoys: ["тръгвайте", "тръгни", "тръгнат"] },
  { q: "завия → (вы)", answer: "завийте", hint: HINT_IMP_PL, rule: IMP_PL_RULE, decoys: ["завиете", "завий", "завивайте"] },
  { q: "отворя → (вы)", answer: "отворете", hint: HINT_IMP_PL, rule: IMP_PL_RULE, decoys: ["отворите", "отвори", "отварят"] },
  { q: "тръгна → (sg → pl)", answer: "тръгнете", hint: HINT_IMP_PL, rule: IMP_PL_RULE, decoys: ["тръгвайте", "тръгни", "тръгваш"] },
  { q: "питам → (sg → pl)", answer: "питайте", hint: HINT_IMP_PL, rule: IMP_PL_RULE, decoys: ["питете", "питай", "питаш"] },
];

// --- Negative imperative (always imperfective) ---
const IMP_NEG_RULE: Localized<string> = {
  ru: "Отрицательный императив образуется ТОЛЬКО от глаголов несвършен вид: «Спри!» (свърш.) ↔ «Не спирай!» (несвърш.). «Влез!» ↔ «Не влизай!».",
  uk: "Заперечний імператив утворюється ЛИШЕ від дієслів несвършен виду: «Спри!» (сврш.) ↔ «Не спирай!» (несвршн.). «Влез!» ↔ «Не влизай!».",
};
const HINT_IMP_NEG: Localized<string> = { ru: "не + несвършен вид", uk: "не + несвершений вид" };
export const DATA_L6_IMP_NEG: DataItem[] = [
  { q: "Спри! → ?", answer: "Не спирай!", hint: HINT_IMP_NEG, rule: IMP_NEG_RULE, decoys: ["Не спри!", "Не спирате!", "Не спрете!"] },
  { q: "Влез! → ?", answer: "Не влизай!", hint: HINT_IMP_NEG, rule: IMP_NEG_RULE, decoys: ["Не влез!", "Не влезе!", "Не вляз!"] },
  { q: "Излез! → ?", answer: "Не излизай!", hint: HINT_IMP_NEG, rule: IMP_NEG_RULE, decoys: ["Не излез!", "Не изляз!", "Не излезе!"] },
  { q: "Иди! → ?", answer: "Не отивай!", hint: HINT_IMP_NEG, rule: IMP_NEG_RULE, decoys: ["Не иди!", "Не отиди!", "Не идвай!"] },
  { q: "Ела! → ?", answer: "Не идвай!", hint: HINT_IMP_NEG, rule: IMP_NEG_RULE, decoys: ["Не ела!", "Не дойди!", "Не дойда!"] },
  { q: "Тръгни! → ?", answer: "Не тръгвай!", hint: HINT_IMP_NEG, rule: IMP_NEG_RULE, decoys: ["Не тръгни!", "Не тръгна!", "Не тръгне!"] },
  { q: "Мини! → ?", answer: "Не минавай!", hint: HINT_IMP_NEG, rule: IMP_NEG_RULE, decoys: ["Не мини!", "Не мина!", "Не мине!"] },
  { q: "Завий! → ?", answer: "Не завивай!", hint: HINT_IMP_NEG, rule: IMP_NEG_RULE, decoys: ["Не завий!", "Не завиеш!", "Не завие!"] },
  { q: "Слез! → ?", answer: "Не слизай!", hint: HINT_IMP_NEG, rule: IMP_NEG_RULE, decoys: ["Не слез!", "Не сляз!", "Не сляза!"] },
  { q: "Кача се! → ?", answer: "Не се качвай!", hint: HINT_IMP_NEG, rule: IMP_NEG_RULE, decoys: ["Не кача се!", "Не качи се!", "Не качете се!"] },
  { q: "Върни се! → ?", answer: "Не се връщай!", hint: HINT_IMP_NEG, rule: IMP_NEG_RULE, decoys: ["Не върни се!", "Не върна се!", "Не връща се!"] },
  { q: "Виж! → ?", answer: "Не гледай!", hint: HINT_IMP_NEG, rule: IMP_NEG_RULE, decoys: ["Не виж!", "Не видя!", "Не виде!"] },
];

// --- Irregular imperatives ---
const IMP_IRREG_RULE: Localized<string> = {
  ru: "Запомнить: съм→бъди/бъдете, дойда(идвам)→ела/елате, видя→виж/вижте, ям→яж/яжте, дам→дай/дайте, отида(отивам)→иди/идете, вляза(влизам)→влез/влезте, изляза(излизам)→излез/излезте.",
  uk: "Запам'ятати: съм→бъди/бъдете, дойда(идвам)→ела/елате, видя→виж/вижте, ям→яж/яжте, дам→дай/дайте, отида(отивам)→иди/идете, вляза(влизам)→влез/влезте, изляза(излизам)→излез/излезте.",
};
const HINT_IMP_IRREG: Localized<string> = { ru: "неправильный императив", uk: "неправильний імператив" };
export const DATA_L6_IMP_IRREG: DataItem[] = [
  { q: "съм (ты)", answer: "бъди", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE, decoys: ["съм", "си", "бъдете"] },
  { q: "съм (вы)", answer: "бъдете", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE, decoys: ["сте", "бъди", "бъдат"] },
  { q: "дойда (ты)", answer: "ела", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE, decoys: ["дойди", "елате", "идвай"] },
  { q: "дойда (вы)", answer: "елате", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE, decoys: ["ела", "дойдете", "идвайте"] },
  { q: "видя (ты)", answer: "виж", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE, decoys: ["види", "вижте", "видиш"] },
  { q: "видя (вы)", answer: "вижте", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE, decoys: ["видете", "виж", "видяте"] },
  { q: "ям (ты)", answer: "яж", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE, decoys: ["ями", "яжте", "ядеш"] },
  { q: "ям (вы)", answer: "яжте", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE, decoys: ["ядете", "яж", "ямте"] },
  { q: "дам (ты)", answer: "дай", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE, decoys: ["дади", "дайте", "даваш"] },
  { q: "дам (вы)", answer: "дайте", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE, decoys: ["дадете", "дай", "давайте"] },
  { q: "отида (ты)", answer: "иди", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE, decoys: ["отиди", "идете", "отивай"] },
  { q: "отида (вы)", answer: "идете", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE, decoys: ["отидете", "иди", "отивайте"] },
  { q: "вляза (ты)", answer: "влез", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE, decoys: ["вляз", "влезте", "влизай"] },
  { q: "вляза (вы)", answer: "влезте", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE, decoys: ["влизайте", "влез", "влязете"] },
  { q: "изляза (ты)", answer: "излез", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE, decoys: ["изляз", "излезте", "излизай"] },
  { q: "изляза (вы)", answer: "излезте", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE, decoys: ["излизайте", "излез", "излязете"] },
];

// --- Imperative (type) ---
export const DATA_L6_IMP_TYPE: DataItem[] = [
  { q: "чета (ты)", answer: "чети", hint: HINT_IMP_SG, rule: IMP_SG_RULE },
  { q: "пиша (ты)", answer: "пиши", hint: HINT_IMP_SG, rule: IMP_SG_RULE },
  { q: "говоря (ты)", answer: "говори", hint: HINT_IMP_SG, rule: IMP_SG_RULE },
  { q: "питам (ты)", answer: "питай", hint: HINT_IMP_SG, rule: IMP_SG_RULE },
  { q: "чакам (ты)", answer: "чакай", hint: HINT_IMP_SG, rule: IMP_SG_RULE },
  { q: "измия (ты)", answer: "измий", hint: HINT_IMP_SG, rule: IMP_SG_RULE },
  { q: "чета (вы)", answer: "четете", hint: HINT_IMP_PL, rule: IMP_PL_RULE },
  { q: "питам (вы)", answer: "питайте", hint: HINT_IMP_PL, rule: IMP_PL_RULE },
  { q: "съм (ты)", answer: "бъди", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE },
  { q: "дойда (ты)", answer: "ела", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE },
  { q: "видя (ты)", answer: "виж", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE },
  { q: "ям (ты)", answer: "яж", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE },
  { q: "дам (ты)", answer: "дай", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE },
  { q: "вляза (ты)", answer: "влез", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE },
  { q: "изляза (ты)", answer: "излез", hint: HINT_IMP_IRREG, rule: IMP_IRREG_RULE },
];

// --- Imperative fill-in-context (Ex.11–12 style) ---
const HINT_IMP_FILL: Localized<string> = { ru: "выбери императив, подходящий по контексту", uk: "обери імператив за контекстом" };
export const DATA_L6_IMP_FILL: DataItem[] = [
  { q: "Ние отиваме на кино. ___ и ти!", answer: "ела", hint: HINT_IMP_FILL, rule: IMP_IRREG_RULE,
    decoys: ["иди", "дойди", "елате"] },
  { q: "Те тръгват утре. И вие ___ утре!", answer: "тръгнете", hint: HINT_IMP_FILL, rule: IMP_PL_RULE,
    decoys: ["тръгни", "тръгвайте", "тръгват"] },
  { q: "И аз ще дойда. ___ малко!", answer: "Чакайте", hint: HINT_IMP_FILL, rule: IMP_PL_RULE,
    decoys: ["Чакай", "Чакаш", "Чакате"] },
  { q: "Катя става рано. И ти ___ рано!", answer: "ставай", hint: HINT_IMP_FILL, rule: IMP_SG_RULE,
    decoys: ["стани", "ставайте", "ставаш"] },
  { q: "Мишо минава на червено. Ти ___ на зелено!", answer: "мини", hint: HINT_IMP_FILL, rule: IMP_SG_RULE,
    decoys: ["минавай", "минете", "минаваш"] },
  { q: "В стаята е много топло. Моля ви, ___ прозореца!", answer: "отворете", hint: HINT_IMP_FILL, rule: IMP_PL_RULE,
    decoys: ["отвори", "отваряйте", "отваряте"] },
  { q: "___ тук!", answer: "Ела", hint: HINT_IMP_FILL, rule: IMP_IRREG_RULE,
    decoys: ["Иди", "Идвай", "Дойди"] },
  { q: "Не ___ тук!", answer: "идвай", hint: HINT_IMP_FILL, rule: IMP_NEG_RULE,
    decoys: ["ела", "дойди", "идете"] },
  { q: "___ там!", answer: "Иди", hint: HINT_IMP_FILL, rule: IMP_IRREG_RULE,
    decoys: ["Ела", "Идвай", "Отивай"] },
  { q: "___ този човек.", answer: "Виж", hint: HINT_IMP_FILL, rule: IMP_IRREG_RULE,
    decoys: ["Гледай", "Видя", "Видиш"] },
  { q: "___ в стаята!", answer: "Влез", hint: HINT_IMP_FILL, rule: IMP_IRREG_RULE,
    decoys: ["Влизай", "Вляза", "Излез"] },
  { q: "Не ___ в стаята!", answer: "влизай", hint: HINT_IMP_FILL, rule: IMP_NEG_RULE,
    decoys: ["влез", "вляза", "излизай"] },
  { q: "___ от стаята!", answer: "Излез", hint: HINT_IMP_FILL, rule: IMP_IRREG_RULE,
    decoys: ["Излизай", "Изляза", "Влез"] },
  { q: "Не ___ от стаята!", answer: "излизай", hint: HINT_IMP_FILL, rule: IMP_NEG_RULE,
    decoys: ["излез", "изляза", "влизай"] },
  { q: "Не ___ наляво!", answer: "завивай", hint: HINT_IMP_FILL, rule: IMP_NEG_RULE,
    decoys: ["завий", "завивайте", "завие"] },
];

// --- Match: 1sg present → imperative sg ---
const HINT_MATCH_IMP: Localized<string> = { ru: "соедини 1л.ед.ч. (наст.) ↔ императив ед.ч.", uk: "з'єднай 1ос.одн. (теп.) ↔ імператив одн." };
export const DATA_L6_MATCH_IMP: MatchItem[] = [
  { left: "чета", right: "чети", hint: HINT_MATCH_IMP },
  { left: "пиша", right: "пиши", hint: HINT_MATCH_IMP },
  { left: "говоря", right: "говори", hint: HINT_MATCH_IMP },
  { left: "питам", right: "питай", hint: HINT_MATCH_IMP },
  { left: "чакам", right: "чакай", hint: HINT_MATCH_IMP },
  { left: "съм", right: "бъди", hint: HINT_MATCH_IMP },
  { left: "дойда", right: "ела", hint: HINT_MATCH_IMP },
  { left: "видя", right: "виж", hint: HINT_MATCH_IMP },
  { left: "ям", right: "яж", hint: HINT_MATCH_IMP },
  { left: "дам", right: "дай", hint: HINT_MATCH_IMP },
  { left: "вляза", right: "влез", hint: HINT_MATCH_IMP },
  { left: "изляза", right: "излез", hint: HINT_MATCH_IMP },
];

// --- Directions: наляво / надясно / направо / назад ---
const DIR_RULE: Localized<string> = {
  ru: "Направления: наляво (влево), надясно (вправо), напред / направо (вперёд / прямо), назад / обратно (назад).",
  uk: "Напрями: наляво (ліворуч), надясно (праворуч), напред / направо (вперед / прямо), назад / обратно (назад).",
};
const HINT_DIR_LEFT: Localized<string> = { ru: "влево", uk: "ліворуч" };
const HINT_DIR_RIGHT: Localized<string> = { ru: "вправо", uk: "праворуч" };
const HINT_DIR_STRAIGHT: Localized<string> = { ru: "вперёд / прямо", uk: "вперед / прямо" };
const HINT_DIR_BACK: Localized<string> = { ru: "назад", uk: "назад" };
export const DATA_L6_DIR: DataItem[] = [
  { q: "← (поворот) / ← (поворот)", answer: "наляво", hint: HINT_DIR_LEFT, rule: DIR_RULE },
  { q: "→ (поворот) / → (поворот)", answer: "надясно", hint: HINT_DIR_RIGHT, rule: DIR_RULE },
  { q: "↑ (прямо) / ↑ (прямо)", answer: "направо", hint: HINT_DIR_STRAIGHT, rule: DIR_RULE },
  { q: "↓ (обратно) / ↓ (зворотно)", answer: "назад", hint: HINT_DIR_BACK, rule: DIR_RULE },
  { q: "Завийте ___ ! (← на първата пряка)", answer: "наляво", hint: HINT_DIR_LEFT, rule: DIR_RULE },
  { q: "Завийте ___ ! (→ на светофара)", answer: "надясно", hint: HINT_DIR_RIGHT, rule: DIR_RULE },
  { q: "Карайте ___ до моста.", answer: "направо", hint: HINT_DIR_STRAIGHT, rule: DIR_RULE },
  { q: "Тръгнете ___ по улицата.", answer: "направо", hint: HINT_DIR_STRAIGHT, rule: DIR_RULE },
  { q: "Не завивай ___ на този знак (←).", answer: "наляво", hint: HINT_DIR_LEFT, rule: DIR_RULE },
  { q: "Не завивай ___ на този знак (→).", answer: "надясно", hint: HINT_DIR_RIGHT, rule: DIR_RULE },
  { q: "Върнете се ___ , моля.", answer: "назад", hint: HINT_DIR_BACK, rule: DIR_RULE },
  { q: "Вървете ___ до пощата.", answer: "направо", hint: HINT_DIR_STRAIGHT, rule: DIR_RULE },
];
export const L6_DIR_OPTIONS = ["наляво", "надясно", "направо", "назад"];

// --- Compass: север / юг / изток / запад ---
const COMPASS_RULE: Localized<string> = {
  ru: "Стороны света: север (N), юг (S), изток (E), запад (W).",
  uk: "Сторони світу: север (N), юг (S), изток (E), запад (W).",
};
const HINT_N: Localized<string> = { ru: "север (N)", uk: "північ (N)" };
const HINT_S: Localized<string> = { ru: "юг (S)", uk: "південь (S)" };
const HINT_E: Localized<string> = { ru: "восток (E)", uk: "схід (E)" };
const HINT_W: Localized<string> = { ru: "запад (W)", uk: "захід (W)" };
export const DATA_L6_COMPASS: DataItem[] = [
  { q: "N", answer: "север", hint: HINT_N, rule: COMPASS_RULE },
  { q: "S", answer: "юг", hint: HINT_S, rule: COMPASS_RULE },
  { q: "E", answer: "изток", hint: HINT_E, rule: COMPASS_RULE },
  { q: "W", answer: "запад", hint: HINT_W, rule: COMPASS_RULE },
  { q: "🌇 где садится солнце? / де сідає сонце?", answer: "запад", hint: HINT_W, rule: COMPASS_RULE },
  { q: "☀️🌅 где встаёт солнце? / де сходить сонце?", answer: "изток", hint: HINT_E, rule: COMPASS_RULE },
  { q: "🌅 страны Скандинавии / країни Скандинавії", answer: "север", hint: HINT_N, rule: COMPASS_RULE },
  { q: "🏝️ Африка, Гърция / Африка, Греція", answer: "юг", hint: HINT_S, rule: COMPASS_RULE },
  { q: "Русия е на ___ от България.", answer: "север", hint: HINT_N, rule: COMPASS_RULE },
  { q: "Гърция е на ___ от България.", answer: "юг", hint: HINT_S, rule: COMPASS_RULE },
  { q: "Турция е на ___ от България.", answer: "изток", hint: HINT_E, rule: COMPASS_RULE },
  { q: "Сърбия е на ___ от България.", answer: "запад", hint: HINT_W, rule: COMPASS_RULE },
];
export const L6_COMPASS_OPTIONS = ["север", "юг", "изток", "запад"];

// --- Direction phrases ---
const HINT_DIR_PHRASE: Localized<string> = { ru: "полезное выражение для дороги", uk: "корисний вираз для дороги" };
export const DATA_L6_DIR_PHRASES: DataItem[] = [
  { q: "Идите прямо. / Йдіть прямо.", answer: "Вървете направо.", hint: HINT_DIR_PHRASE,
    decoys: ["Карайте направо.", "Тръгнете направо.", "Минете направо."] },
  { q: "Поезжайте прямо. / Їдьте прямо.", answer: "Карайте направо.", hint: HINT_DIR_PHRASE,
    decoys: ["Вървете направо.", "Тръгнете направо.", "Минете направо."] },
  { q: "Сверните налево. / Поверніть ліворуч.", answer: "Завийте наляво.", hint: HINT_DIR_PHRASE,
    decoys: ["Завийте надясно.", "Карайте наляво.", "Тръгнете наляво."] },
  { q: "Сверните направо. / Поверніть праворуч.", answer: "Завийте надясно.", hint: HINT_DIR_PHRASE,
    decoys: ["Завийте наляво.", "Карайте надясно.", "Тръгнете надясно."] },
  { q: "Сядьте на автобус №5. / Сідайте на автобус №5.", answer: "Качете се на автобус номер пет.", hint: HINT_DIR_PHRASE,
    decoys: ["Слезте от автобус номер пет.", "Минете автобус номер пет.", "Тръгнете с автобус пет."] },
  { q: "Возьмите автобус №5. / Візьміть автобус №5.", answer: "Вземете автобус номер пет.", hint: HINT_DIR_PHRASE,
    decoys: ["Качете се автобус пет.", "Минете автобус пет.", "Карайте автобус пет."] },
  { q: "Сойдите на второй остановке. / Зійдіть на другій зупинці.", answer: "Слезте на втората спирка.", hint: HINT_DIR_PHRASE,
    decoys: ["Качете се на втората спирка.", "Минете втората спирка.", "Слизайте на втора спирка."] },
  { q: "Возьмите такси. / Візьміть таксі.", answer: "Вземете такси.", hint: HINT_DIR_PHRASE,
    decoys: ["Карайте такси.", "Качете се такси.", "Тръгнете с такси."] },
  { q: "Идите по улице «Васил Левски». / Йдіть по вул. «Васил Левски».", answer: "Минете по улица „Васил Левски\".", hint: HINT_DIR_PHRASE,
    decoys: ["Карайте улица Васил Левски.", "Завийте по улица Васил Левски.", "Тръгнете през улица Васил Левски."] },
  { q: "Пройдите через парк. / Пройдіть через парк.", answer: "Минете през парка.", hint: HINT_DIR_PHRASE,
    decoys: ["Карайте парка.", "Завийте през парка.", "Тръгнете в парка."] },
  { q: "Спросите ещё раз. / Запитайте ще раз.", answer: "Попитайте пак.", hint: HINT_DIR_PHRASE,
    decoys: ["Запитайте отново.", "Питайте още.", "Кажете пак."] },
  { q: "Где находится почта? / Де знаходиться пошта?", answer: "Къде се намира пощата?", hint: HINT_DIR_PHRASE,
    decoys: ["Къде е пощата?", "Откъде е пощата?", "Кога е пощата?"] },
  { q: "Как дойти до театра? / Як дійти до театру?", answer: "Как мога да стигна до театъра?", hint: HINT_DIR_PHRASE,
    decoys: ["Къде е театъра?", "Откъде е театъра?", "Кога е театъра?"] },
  { q: "Есть ли поблизости аптека? / Чи є поблизу аптека?", answer: "Има ли наблизо аптека?", hint: HINT_DIR_PHRASE,
    decoys: ["Къде има аптека?", "Близо ли е аптеката?", "Колко аптеки има?"] },
  { q: "Близко ли это? / Чи це близько?", answer: "Близо ли е?", hint: HINT_DIR_PHRASE,
    decoys: ["Далече ли е?", "Колко близо е?", "Къде е близо?"] },
];

// --- Build direction sentences ---
export const DATA_L6_DIR_BUILD: BuildItem[] = [
  { words: ["Извинете", ",", "как", "мога", "да", "стигна", "до", "пощата", "?"],
    translation: { ru: "Извините, как мне дойти до почты?", uk: "Вибачте, як мені дійти до пошти?" } },
  { words: ["Тръгнете", "наляво", "по", "улица", "„Иглика\""],
    translation: { ru: "Идите налево по улице «Иглика».", uk: "Йдіть ліворуч по вулиці «Іглика»." } },
  { words: ["На", "светофара", "завийте", "надясно"],
    translation: { ru: "На светофоре сверните направо.", uk: "На світлофорі поверніть праворуч." } },
  { words: ["Карайте", "направо", "до", "кръстовището"],
    translation: { ru: "Поезжайте прямо до перекрёстка.", uk: "Їдьте прямо до перехрестя." } },
  { words: ["Вземете", "автобус", "номер", "пет"],
    translation: { ru: "Возьмите автобус номер пять.", uk: "Візьміть автобус номер п'ять." } },
  { words: ["Слезте", "на", "втората", "спирка"],
    translation: { ru: "Сойдите на второй остановке.", uk: "Зійдіть на другій зупинці." } },
  { words: ["Има", "ли", "наблизо", "аптека", "?"],
    translation: { ru: "Есть ли поблизости аптека?", uk: "Чи є поблизу аптека?" } },
  { words: ["Къде", "се", "намира", "паметникът", "?"],
    translation: { ru: "Где находится памятник?", uk: "Де знаходиться пам'ятник?" } },
  { words: ["Минете", "през", "парка", "и", "ще", "видите", "пощата"],
    translation: { ru: "Пройдите через парк, и увидите почту.", uk: "Пройдіть через парк, і побачите пошту." } },
  { words: ["Близо", "ли", "е", "болницата", "?"],
    translation: { ru: "Больница близко?", uk: "Лікарня близько?" } },
  { words: ["Завийте", "наляво", "след", "паметника"],
    translation: { ru: "Сверните налево после памятника.", uk: "Поверніть ліворуч після пам'ятника." } },
  { words: ["Спрете", "на", "знак", "„Стоп\""],
    translation: { ru: "Остановитесь на знаке «Стоп».", uk: "Зупиніться на знаку «Стоп»." } },
];

// --- Paradigms ---
const L6_PRONOUNS = ["Аз", "Ти", "Той", "Ние", "Вие", "Те"];
export const DATA_L6_PARADIGM: ParadigmItem[] = [
  { verb: "мога", pronouns: L6_PRONOUNS, forms: ["мога", "можеш", "може", "можем", "можете", "могат"],
    hint: { ru: "мочь", uk: "могти" }, rule: MOGA_RULE },
  { verb: "обичам", pronouns: L6_PRONOUNS, forms: ["обичам", "обичаш", "обича", "обичаме", "обичате", "обичат"],
    hint: { ru: "любить (III спряж.)", uk: "любити (III дієвідм.)" }, rule: OBICHAM_RULE },
  { verb: "карам", pronouns: L6_PRONOUNS, forms: ["карам", "караш", "кара", "караме", "карате", "карат"],
    hint: { ru: "вести / ехать (III спряж.)", uk: "вести / їхати (III дієвідм.)" } },
  { verb: "ходя", pronouns: L6_PRONOUNS, forms: ["ходя", "ходиш", "ходи", "ходим", "ходите", "ходят"],
    hint: { ru: "ходить (II спряж.)", uk: "ходити (II дієвідм.)" } },
  { verb: "отивам", pronouns: L6_PRONOUNS, forms: ["отивам", "отиваш", "отива", "отиваме", "отивате", "отиват"],
    hint: { ru: "идти / ехать туда (III спряж.)", uk: "йти / їхати туди (III дієвідм.)" } },
  { verb: "тръгвам", pronouns: L6_PRONOUNS, forms: ["тръгвам", "тръгваш", "тръгва", "тръгваме", "тръгвате", "тръгват"],
    hint: { ru: "отправляться (III спряж.)", uk: "вирушати (III дієвідм.)" } },
];

// --- Odd one out ---
const ODD_NOT_MOTION: Localized<string> = { ru: "одно — не глагол движения", uk: "одне — не дієслово руху" };
const ODD_NOT_TRANSPORT: Localized<string> = { ru: "одно — не транспорт", uk: "одне — не транспорт" };
const ODD_NOT_DIR: Localized<string> = { ru: "одно — не направление", uk: "одне — не напрям" };
const ODD_NOT_COMPASS: Localized<string> = { ru: "одно — не сторона света", uk: "одне — не сторона світу" };
const ODD_NOT_MODAL: Localized<string> = { ru: "одно — не модальный глагол да-конструкции", uk: "одне — не модальне дієслово да-конструкції" };
const ODD_NOT_IMP_SG: Localized<string> = { ru: "одно — не императив ед.ч.", uk: "одне — не імператив одн." };
const ODD_NOT_IMP_PL: Localized<string> = { ru: "одно — не императив мн.ч.", uk: "одне — не імператив мн." };
const ODD_NOT_TERM: Localized<string> = { ru: "одно — не свършен (термин.) вид", uk: "одне — не свршн. (термінатив.) вид" };
const ODD_NOT_IMPF: Localized<string> = { ru: "одно — не несвършен вид", uk: "одне — не несвршн. вид" };
const ODD_NOT_POLITE: Localized<string> = { ru: "одно — не учтивая формула", uk: "одне — не ввічлива формула" };
const ODD_NOT_ADDR: Localized<string> = { ru: "одно — не часть адреса", uk: "одне — не частина адреси" };
const ODD_NOT_TITLE: Localized<string> = { ru: "одно — не обращение к человеку", uk: "одне — не звертання до людини" };
export const DATA_L6_ODD: OddItem[] = [
  { words: ["вървя", "карам", "минавам", "стая"], odd: "стая", hint: ODD_NOT_MOTION },
  { words: ["автобус", "тролей", "трамвай", "светофар"], odd: "светофар", hint: ODD_NOT_TRANSPORT },
  { words: ["наляво", "надясно", "направо", "север"], odd: "север", hint: ODD_NOT_DIR },
  { words: ["север", "юг", "изток", "наляво"], odd: "наляво", hint: ODD_NOT_COMPASS },
  { words: ["искам", "мога", "трябва", "чета"], odd: "чета", hint: ODD_NOT_MODAL },
  { words: ["чети", "пиши", "говори", "четете"], odd: "четете", hint: ODD_NOT_IMP_SG },
  { words: ["четете", "пишете", "говорете", "пиши"], odd: "пиши", hint: ODD_NOT_IMP_PL },
  { words: ["дойда", "отида", "вляза", "идвам"], odd: "идвам", hint: ODD_NOT_TERM },
  { words: ["идвам", "отивам", "влизам", "дойда"], odd: "дойда", hint: ODD_NOT_IMPF },
  { words: ["заповядайте", "благодаря", "извинете", "хей"], odd: "хей", hint: ODD_NOT_POLITE },
  { words: ["улица", "блок", "етаж", "автобус"], odd: "автобус", hint: ODD_NOT_ADDR },
  { words: ["господин", "госпожа", "госпожица", "капитан"], odd: "капитан", hint: ODD_NOT_TITLE },
];
