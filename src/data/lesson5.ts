import type { DataItem, BuildItem, MatchItem, OddItem, ParadigmItem } from "../types";
import type { Localized } from "../i18n/types";

// ========================= LESSON 5 =========================

// --- Body parts ---
const HINT_BODY: Localized<string> = { ru: "часть тела", uk: "частина тіла" };
export const DATA_L5_BODY: DataItem[] = [
  { q: "голова", answer: "глава", hint: HINT_BODY, decoys: ["коса", "чело", "уста"] },
  { q: "волосы / волосся", answer: "коса", hint: HINT_BODY, decoys: ["глава", "вежда", "буза"] },
  { q: "лоб / лоб", answer: "чело", hint: HINT_BODY, decoys: ["буза", "брада", "врат"] },
  { q: "глаз / око", answer: "око", hint: HINT_BODY, decoys: ["ухо", "нос", "уста"] },
  { q: "глаза / очі", answer: "очи", hint: HINT_BODY, decoys: ["уши", "вежди", "устни"] },
  { q: "бровь / брова", answer: "вежда", hint: HINT_BODY, decoys: ["устна", "буза", "брада"] },
  { q: "щека / щока", answer: "буза", hint: HINT_BODY, decoys: ["вежда", "устна", "врат"] },
  { q: "ухо / вухо", answer: "ухо", hint: HINT_BODY, decoys: ["око", "нос", "уста"] },
  { q: "уши / вуха", answer: "уши", hint: HINT_BODY, decoys: ["очи", "устни", "вежди"] },
  { q: "нос / ніс", answer: "нос", hint: HINT_BODY, decoys: ["ухо", "уста", "брада"] },
  { q: "губа", answer: "устна", hint: HINT_BODY, decoys: ["уста", "брада", "буза"] },
  { q: "рот", answer: "уста", hint: HINT_BODY, decoys: ["устна", "ухо", "нос"] },
  { q: "подбородок / підборіддя", answer: "брада", hint: HINT_BODY, decoys: ["буза", "врат", "чело"] },
  { q: "шея / шия", answer: "врат", hint: HINT_BODY, decoys: ["брада", "ръка", "крак"] },
  { q: "рука", answer: "ръка", hint: HINT_BODY, decoys: ["крак", "врат", "ръце"] },
  { q: "руки", answer: "ръце", hint: HINT_BODY, decoys: ["ръка", "крака", "уши"] },
  { q: "нога", answer: "крак", hint: HINT_BODY, decoys: ["ръка", "крака", "врат"] },
  { q: "ноги", answer: "крака", hint: HINT_BODY, decoys: ["крак", "ръце", "очи"] },
];

// --- Appearance (общ вид) ---
const HINT_APP: Localized<string> = { ru: "общий вид", uk: "загальний вигляд" };
export const DATA_L5_APPEARANCE: DataItem[] = [
  { q: "красивый / красивий", answer: "красив", hint: HINT_APP, decoys: ["грозен", "хубав", "симпатичен"] },
  { q: "хороший вид / гарний вигляд", answer: "хубав", hint: HINT_APP, decoys: ["грозен", "симпатичен", "стар"] },
  { q: "уродливый / потворний", answer: "грозен", hint: HINT_APP, decoys: ["красив", "хубав", "млад"] },
  { q: "симпатичный / симпатичний", answer: "симпатичен", hint: HINT_APP, decoys: ["грозен", "стар", "дебел"] },
  { q: "высокий / високий", answer: "висок", hint: HINT_APP, decoys: ["нисък", "слаб", "млад"] },
  { q: "низкий / низький", answer: "нисък", hint: HINT_APP, decoys: ["висок", "слаб", "стар"] },
  { q: "толстый / товстий", answer: "дебел", hint: HINT_APP, decoys: ["слаб", "пълен", "висок"] },
  { q: "полный / повний", answer: "пълен", hint: HINT_APP, decoys: ["слаб", "млад", "стар"] },
  { q: "худой / худий", answer: "слаб", hint: HINT_APP, decoys: ["дебел", "пълен", "висок"] },
  { q: "старый / старий", answer: "стар", hint: HINT_APP, decoys: ["млад", "висок", "грозен"] },
  { q: "молодой / молодий", answer: "млад", hint: HINT_APP, decoys: ["стар", "красив", "слаб"] },
  { q: "среднего возраста / середнього віку", answer: "на средна възраст", hint: HINT_APP, decoys: ["млад", "стар", "симпатичен"] },
];

// --- Hair (коса) ---
const HINT_HAIR: Localized<string> = { ru: "о волосах (ж.р., ед.ч.)", uk: "про волосся (ж.р., одн.)" };
export const DATA_L5_HAIR: DataItem[] = [
  { q: "длинная / довге", answer: "дълга", hint: HINT_HAIR, decoys: ["къса", "права", "тъмна"] },
  { q: "короткая / коротке", answer: "къса", hint: HINT_HAIR, decoys: ["дълга", "светла", "руса"] },
  { q: "прямая / пряме", answer: "права", hint: HINT_HAIR, decoys: ["къдрава", "чуплива", "тъмна"] },
  { q: "волнистая / хвиляста", answer: "чуплива", hint: HINT_HAIR, decoys: ["права", "къдрава", "руса"] },
  { q: "кудрявая / кучерява", answer: "къдрава", hint: HINT_HAIR, decoys: ["права", "чуплива", "светла"] },
  { q: "светлая / світле", answer: "светла", hint: HINT_HAIR, decoys: ["тъмна", "черна", "къса"] },
  { q: "тёмная / темне", answer: "тъмна", hint: HINT_HAIR, decoys: ["светла", "руса", "чуплива"] },
  { q: "русая (блондинка) / русяве (білявка)", answer: "руса", hint: HINT_HAIR, decoys: ["кестенява", "черна", "тъмна"] },
  { q: "каштановая / каштанове", answer: "кестенява", hint: HINT_HAIR, decoys: ["руса", "черна", "светла"] },
  { q: "чёрная / чорне", answer: "черна", hint: HINT_HAIR, decoys: ["тъмна", "кестенява", "светла"] },
  { q: "растрёпанная / розпатлане", answer: "рошава", hint: HINT_HAIR, decoys: ["права", "чуплива", "светла"] },
];

// --- Eyes (очи) ---
const HINT_EYES: Localized<string> = { ru: "цвет глаз (мн.ч.)", uk: "колір очей (мн.)" };
export const DATA_L5_EYES: DataItem[] = [
  { q: "синие / сині", answer: "сини", hint: HINT_EYES, decoys: ["зелени", "кафяви", "пъстри"] },
  { q: "зелёные / зелені", answer: "зелени", hint: HINT_EYES, decoys: ["сини", "кафяви", "пъстри"] },
  { q: "карие / карі (коричневі)", answer: "кафяви", hint: HINT_EYES, decoys: ["сини", "зелени", "пъстри"] },
  { q: "пёстрые / строкаті", answer: "пъстри", hint: HINT_EYES, decoys: ["сини", "зелени", "кафяви"] },
  { q: "большие / великі", answer: "големи", hint: HINT_EYES, decoys: ["малки", "сини", "кафяви"] },
  { q: "маленькие / маленькі", answer: "малки", hint: HINT_EYES, decoys: ["големи", "пъстри", "зелени"] },
];

// --- Face features (нос, устни, вежди, израз) ---
const HINT_FACE: Localized<string> = { ru: "о лице / чертах", uk: "про обличчя / риси" };
export const DATA_L5_FACE: DataItem[] = [
  { q: "тонкие (брови, губы) / тонкі", answer: "тънки", hint: HINT_FACE, decoys: ["дебели", "правилни", "сериозни"] },
  { q: "толстые (брови, губы) / товсті", answer: "дебели", hint: HINT_FACE, decoys: ["тънки", "къси", "усмихнати"] },
  { q: "правильный (нос) / правильний (ніс)", answer: "правилен", hint: HINT_FACE, decoys: ["гърбав", "чип", "дълъг"] },
  { q: "горбатый (нос) / горбатий (ніс)", answer: "гърбав", hint: HINT_FACE, decoys: ["правилен", "чип", "дълъг"] },
  { q: "длинный (нос) / довгий (ніс)", answer: "дълъг", hint: HINT_FACE, decoys: ["чип", "правилен", "къс"] },
  { q: "курносый (нос) / кирпатий (ніс)", answer: "чип", hint: HINT_FACE, decoys: ["дълъг", "правилен", "гърбав"] },
  { q: "серьёзный / серйозний", answer: "сериозен", hint: HINT_FACE, decoys: ["усмихнат", "смешен", "сърдит"] },
  { q: "улыбающийся / усміхнений", answer: "усмихнат", hint: HINT_FACE, decoys: ["сериозен", "сърдит", "тъжен"] },
  { q: "смешной / смішний", answer: "смешен", hint: HINT_FACE, decoys: ["сериозен", "сърдит", "тъжен"] },
  { q: "сердитый / сердитий", answer: "сърдит", hint: HINT_FACE, decoys: ["усмихнат", "сериозен", "весел"] },
];

// --- Character traits ---
const HINT_CHAR: Localized<string> = { ru: "характер / черта", uk: "характер / риса" };
export const DATA_L5_CHARACTER: DataItem[] = [
  { q: "добрый / добрий", answer: "добър", hint: HINT_CHAR, decoys: ["лош", "ужасен", "груб"] },
  { q: "плохой / поганий", answer: "лош", hint: HINT_CHAR, decoys: ["добър", "приятен", "честен"] },
  { q: "ужасный / жахливий", answer: "ужасен", hint: HINT_CHAR, decoys: ["приятен", "добър", "честен"] },
  { q: "ответственный / відповідальний", answer: "отговорен", hint: HINT_CHAR, decoys: ["безотговорен", "мързелив", "глупав"] },
  { q: "безответственный / безвідповідальний", answer: "безотговорен", hint: HINT_CHAR, decoys: ["отговорен", "честен", "работлив"] },
  { q: "забавный / забавний", answer: "забавен", hint: HINT_CHAR, decoys: ["скучен", "тъжен", "сериозен"] },
  { q: "скучный / нудний", answer: "скучен", hint: HINT_CHAR, decoys: ["забавен", "весел", "приятен"] },
  { q: "весёлый / веселий", answer: "весел", hint: HINT_CHAR, decoys: ["тъжен", "сърдит", "сериозен"] },
  { q: "грустный / сумний", answer: "тъжен", hint: HINT_CHAR, decoys: ["весел", "забавен", "усмихнат"] },
  { q: "умный / розумний", answer: "умен", hint: HINT_CHAR, decoys: ["глупав", "хитър", "лъжец"] },
  { q: "глупый / дурний", answer: "глупав", hint: HINT_CHAR, decoys: ["умен", "хитър", "честен"] },
  { q: "молчаливый / мовчазний", answer: "мълчалив", hint: HINT_CHAR, decoys: ["приказлив", "забавен", "весел"] },
  { q: "разговорчивый / балакучий", answer: "приказлив", hint: HINT_CHAR, decoys: ["мълчалив", "тъжен", "скучен"] },
  { q: "честный / чесний", answer: "честен", hint: HINT_CHAR, decoys: ["лъжец", "хитър", "лицемерен"] },
  { q: "лжец / брехун", answer: "лъжец", hint: HINT_CHAR, decoys: ["честен", "умен", "добър"] },
  { q: "щедрый / щедрий", answer: "щедър", hint: HINT_CHAR, decoys: ["стиснат", "добър", "честен"] },
  { q: "скупой / скупий", answer: "стиснат", hint: HINT_CHAR, decoys: ["щедър", "добър", "честен"] },
  { q: "смелый / сміливий", answer: "смел", hint: HINT_CHAR, decoys: ["страхлив", "добър", "силен"] },
  { q: "трусливый / боягузливий", answer: "страхлив", hint: HINT_CHAR, decoys: ["смел", "лош", "тъжен"] },
  { q: "приятный / приємний", answer: "приятен", hint: HINT_CHAR, decoys: ["неприятен", "груб", "досаден"] },
  { q: "неприятный / неприємний", answer: "неприятен", hint: HINT_CHAR, decoys: ["приятен", "нежен", "забавен"] },
  { q: "нежный / ніжний", answer: "нежен", hint: HINT_CHAR, decoys: ["груб", "сърдит", "лош"] },
  { q: "грубый / грубий", answer: "груб", hint: HINT_CHAR, decoys: ["нежен", "приятен", "добър"] },
  { q: "трудолюбивый / працьовитий", answer: "работлив", hint: HINT_CHAR, decoys: ["мързелив", "забавен", "умен"] },
  { q: "ленивый / лінивий", answer: "мързелив", hint: HINT_CHAR, decoys: ["работлив", "скучен", "тъжен"] },
  { q: "хитрый / хитрий", answer: "хитър", hint: HINT_CHAR, decoys: ["умен", "честен", "лош"] },
  { q: "лицемерный / лицемірний", answer: "лицемерен", hint: HINT_CHAR, decoys: ["честен", "приказлив", "хитър"] },
  { q: "надоедливый / набридливий", answer: "досаден", hint: HINT_CHAR, decoys: ["приятен", "забавен", "нахален"] },
  { q: "наглый / нахабний", answer: "нахален", hint: HINT_CHAR, decoys: ["нежен", "честен", "досаден"] },
];

// --- Antonyms ---
const ANT_RULE_L5: Localized<string> = {
  ru: "Антонимы L5 (внешн./характер): красив↔грозен, висок↔нисък, дебел↔слаб, стар↔млад, дълга↔къса, светла↔тъмна, тънки↔дебели, добър↔лош, отговорен↔безотговорен, забавен↔скучен, весел↔тъжен, умен↔глупав, мълчалив↔приказлив, честен↔лъжец, щедър↔стиснат, смел↔страхлив, нежен↔груб, работлив↔мързелив.",
  uk: "Антоніми L5 (зовн./характер): красив↔грозен, висок↔нисък, дебел↔слаб, стар↔млад, дълга↔къса, светла↔тъмна, тънки↔дебели, добър↔лош, отговорен↔безотговорен, забавен↔скучен, весел↔тъжен, умен↔глупав, мълчалив↔приказлив, честен↔лъжец, щедър↔стиснат, смел↔страхлив, нежен↔груб, работлив↔мързелив.",
};
const HINT_ANT_L5: Localized<string> = { ru: "антоним", uk: "антонім" };
export const DATA_L5_ANT: DataItem[] = [
  { q: "красив ↔ ?", answer: "грозен", hint: HINT_ANT_L5, rule: ANT_RULE_L5, decoys: ["хубав", "симпатичен", "млад"] },
  { q: "висок ↔ ?", answer: "нисък", hint: HINT_ANT_L5, rule: ANT_RULE_L5, decoys: ["слаб", "дебел", "стар"] },
  { q: "дебел ↔ ?", answer: "слаб", hint: HINT_ANT_L5, rule: ANT_RULE_L5, decoys: ["нисък", "пълен", "млад"] },
  { q: "стар ↔ ?", answer: "млад", hint: HINT_ANT_L5, rule: ANT_RULE_L5, decoys: ["висок", "красив", "слаб"] },
  { q: "дълга ↔ ?", answer: "къса", hint: HINT_ANT_L5, rule: ANT_RULE_L5, decoys: ["права", "светла", "тъмна"] },
  { q: "светла ↔ ?", answer: "тъмна", hint: HINT_ANT_L5, rule: ANT_RULE_L5, decoys: ["къса", "руса", "права"] },
  { q: "тънки ↔ ?", answer: "дебели", hint: HINT_ANT_L5, rule: ANT_RULE_L5, decoys: ["къси", "правилни", "сериозни"] },
  { q: "добър ↔ ?", answer: "лош", hint: HINT_ANT_L5, rule: ANT_RULE_L5, decoys: ["груб", "нахален", "тъжен"] },
  { q: "отговорен ↔ ?", answer: "безотговорен", hint: HINT_ANT_L5, rule: ANT_RULE_L5, decoys: ["мързелив", "глупав", "лош"] },
  { q: "забавен ↔ ?", answer: "скучен", hint: HINT_ANT_L5, rule: ANT_RULE_L5, decoys: ["тъжен", "сериозен", "сърдит"] },
  { q: "весел ↔ ?", answer: "тъжен", hint: HINT_ANT_L5, rule: ANT_RULE_L5, decoys: ["скучен", "сериозен", "сърдит"] },
  { q: "умен ↔ ?", answer: "глупав", hint: HINT_ANT_L5, rule: ANT_RULE_L5, decoys: ["хитър", "честен", "груб"] },
  { q: "мълчалив ↔ ?", answer: "приказлив", hint: HINT_ANT_L5, rule: ANT_RULE_L5, decoys: ["скучен", "тъжен", "забавен"] },
  { q: "честен ↔ ?", answer: "лъжец", hint: HINT_ANT_L5, rule: ANT_RULE_L5, decoys: ["хитър", "лицемерен", "глупав"] },
  { q: "щедър ↔ ?", answer: "стиснат", hint: HINT_ANT_L5, rule: ANT_RULE_L5, decoys: ["добър", "приятен", "честен"] },
  { q: "смел ↔ ?", answer: "страхлив", hint: HINT_ANT_L5, rule: ANT_RULE_L5, decoys: ["лош", "тъжен", "слаб"] },
  { q: "нежен ↔ ?", answer: "груб", hint: HINT_ANT_L5, rule: ANT_RULE_L5, decoys: ["лош", "сърдит", "досаден"] },
  { q: "работлив ↔ ?", answer: "мързелив", hint: HINT_ANT_L5, rule: ANT_RULE_L5, decoys: ["скучен", "тъжен", "глупав"] },
  { q: "приятен ↔ ?", answer: "неприятен", hint: HINT_ANT_L5, rule: ANT_RULE_L5, decoys: ["груб", "нахален", "досаден"] },
];

// --- Colors ---
const HINT_COLOR: Localized<string> = { ru: "цвет (м.р.)", uk: "колір (ч.р.)" };
export const DATA_L5_COLORS: DataItem[] = [
  { q: "белый / білий", answer: "бял", hint: HINT_COLOR, decoys: ["черен", "сив", "жълт"] },
  { q: "чёрный / чорний", answer: "черен", hint: HINT_COLOR, decoys: ["бял", "сив", "син"] },
  { q: "красный / червоний", answer: "червен", hint: HINT_COLOR, decoys: ["розов", "оранжев", "лилав"] },
  { q: "зелёный / зелений", answer: "зелен", hint: HINT_COLOR, decoys: ["син", "жълт", "сив"] },
  { q: "жёлтый / жовтий", answer: "жълт", hint: HINT_COLOR, decoys: ["оранжев", "червен", "бял"] },
  { q: "синий / синій", answer: "син", hint: HINT_COLOR, decoys: ["зелен", "лилав", "сив"] },
  { q: "коричневый / коричневий", answer: "кафяв", hint: HINT_COLOR, decoys: ["сив", "черен", "оранжев"] },
  { q: "розовый / рожевий", answer: "розов", hint: HINT_COLOR, decoys: ["червен", "лилав", "оранжев"] },
  { q: "серый / сірий", answer: "сив", hint: HINT_COLOR, decoys: ["черен", "бял", "кафяв"] },
  { q: "фиолетовый / фіолетовий", answer: "лилав", hint: HINT_COLOR, decoys: ["син", "розов", "червен"] },
  { q: "оранжевый / помаранчевий", answer: "оранжев", hint: HINT_COLOR, decoys: ["жълт", "червен", "розов"] },
  { q: "голубой (светло-синий) / блакитний", answer: "светлосин", hint: HINT_COLOR, decoys: ["тъмносин", "син", "лилав"] },
  { q: "тёмно-синий / темно-синій", answer: "тъмносин", hint: HINT_COLOR, decoys: ["светлосин", "син", "черен"] },
  { q: "светло-зелёный / світло-зелений", answer: "светлозелен", hint: HINT_COLOR, decoys: ["тъмнозелен", "зелен", "жълт"] },
  { q: "тёмно-зелёный / темно-зелений", answer: "тъмнозелен", hint: HINT_COLOR, decoys: ["светлозелен", "зелен", "син"] },
];

// --- Clothes ---
const HINT_CLOTHES: Localized<string> = { ru: "одежда / обувь", uk: "одяг / взуття" };
export const DATA_L5_CLOTHES: DataItem[] = [
  { q: "блузка / блузка", answer: "блуза", hint: HINT_CLOTHES, decoys: ["риза", "тениска", "пуловер"] },
  { q: "рубашка / сорочка", answer: "риза", hint: HINT_CLOTHES, decoys: ["блуза", "тениска", "пуловер"] },
  { q: "футболка / футболка", answer: "тениска", hint: HINT_CLOTHES, decoys: ["риза", "блуза", "пуловер"] },
  { q: "свитер / светр", answer: "пуловер", hint: HINT_CLOTHES, decoys: ["риза", "сако", "яке"] },
  { q: "юбка / спідниця", answer: "пола", hint: HINT_CLOTHES, decoys: ["рокля", "панталон", "дънки"] },
  { q: "платье / сукня", answer: "рокля", hint: HINT_CLOTHES, decoys: ["пола", "блуза", "костюм"] },
  { q: "брюки / штани", answer: "панталон", hint: HINT_CLOTHES, decoys: ["дънки", "пола", "рокля"] },
  { q: "джинсы / джинси", answer: "дънки", hint: HINT_CLOTHES, decoys: ["панталон", "пола", "чорапи"] },
  { q: "куртка / куртка", answer: "яке", hint: HINT_CLOTHES, decoys: ["палто", "шлифер", "сако"] },
  { q: "пальто / пальто", answer: "палто", hint: HINT_CLOTHES, decoys: ["яке", "шлифер", "сако"] },
  { q: "плащ / плащ", answer: "шлифер", hint: HINT_CLOTHES, decoys: ["палто", "яке", "костюм"] },
  { q: "костюм / костюм", answer: "костюм", hint: HINT_CLOTHES, decoys: ["сако", "риза", "вратовръзка"] },
  { q: "пиджак / піджак", answer: "сако", hint: HINT_CLOTHES, decoys: ["костюм", "яке", "пуловер"] },
  { q: "галстук / краватка", answer: "вратовръзка", hint: HINT_CLOTHES, decoys: ["риза", "сако", "костюм"] },
  { q: "туфли / туфлі", answer: "обувки", hint: HINT_CLOTHES, decoys: ["сандали", "чехли", "ботуши"] },
  { q: "сандалии / сандалі", answer: "сандали", hint: HINT_CLOTHES, decoys: ["обувки", "чехли", "маратонки"] },
  { q: "тапочки / капці", answer: "чехли", hint: HINT_CLOTHES, decoys: ["обувки", "сандали", "маратонки"] },
  { q: "кроссовки / кросівки", answer: "маратонки", hint: HINT_CLOTHES, decoys: ["обувки", "сандали", "ботуши"] },
  { q: "сапоги / чоботи", answer: "ботуши", hint: HINT_CLOTHES, decoys: ["обувки", "сандали", "маратонки"] },
  { q: "носки / шкарпетки", answer: "чорапи", hint: HINT_CLOTHES, decoys: ["обувки", "дънки", "сандали"] },
];

// --- Style adverbs ---
const STYLE_RULE: Localized<string> = {
  ru: "Стилевые наречия: делово (по-деловому), спортно (спортивно), официално, елегантно, небрежно. Употребляются с глаголом «обличам се» (одеваться).",
  uk: "Стильові прислівники: делово (по-діловому), спортно, официално, елегантно, небрежно. Вживаються з дієсловом «обличам се» (одягатися).",
};
const HINT_STYLE: Localized<string> = { ru: "стиль одежды", uk: "стиль одягу" };
const STYLE_LABEL_BIZ: Localized<string> = { ru: "по-деловому", uk: "по-діловому" };
const STYLE_LABEL_SPORT: Localized<string> = { ru: "спортивно", uk: "спортивно" };
const STYLE_LABEL_OFF: Localized<string> = { ru: "официально", uk: "офіційно" };
const STYLE_LABEL_ELEG: Localized<string> = { ru: "элегантно", uk: "елегантно" };
const STYLE_LABEL_CASUAL: Localized<string> = { ru: "небрежно", uk: "недбало" };
export const DATA_L5_STYLE: DataItem[] = [
  { q: "по-деловому / по-діловому", answer: "делово", hint: HINT_STYLE, rule: STYLE_RULE },
  { q: "спортивно / спортивно", answer: "спортно", hint: HINT_STYLE, rule: STYLE_RULE },
  { q: "официально / офіційно", answer: "официално", hint: HINT_STYLE, rule: STYLE_RULE },
  { q: "элегантно / елегантно", answer: "елегантно", hint: HINT_STYLE, rule: STYLE_RULE },
  { q: "небрежно / недбало", answer: "небрежно", hint: HINT_STYLE, rule: STYLE_RULE },
  { q: "Когато съм на работа, се обличам ___.", label: STYLE_LABEL_BIZ, answer: "делово", hint: HINT_STYLE, rule: STYLE_RULE },
  { q: "Когато съм на дискотека, се обличам ___.", label: STYLE_LABEL_SPORT, answer: "спортно", hint: HINT_STYLE, rule: STYLE_RULE },
  { q: "Когато съм на коктейл, се обличам ___.", label: STYLE_LABEL_OFF, answer: "официално", hint: HINT_STYLE, rule: STYLE_RULE },
  { q: "Тя се облича много ___ за театър.", label: STYLE_LABEL_ELEG, answer: "елегантно", hint: HINT_STYLE, rule: STYLE_RULE },
  { q: "Вкъщи се обличам ___.", label: STYLE_LABEL_CASUAL, answer: "небрежно", hint: HINT_STYLE, rule: STYLE_RULE },
  { q: "За интервю за работа той се облича ___.", label: STYLE_LABEL_OFF, answer: "официално", hint: HINT_STYLE, rule: STYLE_RULE },
  { q: "За разходка тя се облича ___.", label: STYLE_LABEL_SPORT, answer: "спортно", hint: HINT_STYLE, rule: STYLE_RULE },
];
export const L5_STYLE_OPTIONS = ["делово", "спортно", "официално", "елегантно", "небрежно"];

// --- Future time markers ---
const HINT_FUTURE_TIME: Localized<string> = { ru: "указатель будущего", uk: "вказівник майбутнього" };
export const DATA_L5_FUTURE_TIME: DataItem[] = [
  { q: "сейчас / зараз", answer: "сега", hint: HINT_FUTURE_TIME, decoys: ["довечера", "утре", "вдругиден"] },
  { q: "скоро / незабаром", answer: "след малко", hint: HINT_FUTURE_TIME, decoys: ["сега", "довечера", "догодина"] },
  { q: "сегодня вечером / сьогодні ввечері", answer: "довечера", hint: HINT_FUTURE_TIME, decoys: ["утре", "вдругиден", "сега"] },
  { q: "завтра / завтра", answer: "утре", hint: HINT_FUTURE_TIME, decoys: ["вдругиден", "довечера", "догодина"] },
  { q: "послезавтра / післязавтра", answer: "вдругиден", hint: HINT_FUTURE_TIME, decoys: ["утре", "догодина", "другата седмица"] },
  { q: "на следующей неделе / наступного тижня", answer: "другата седмица", hint: HINT_FUTURE_TIME, decoys: ["другия месец", "догодина", "вдругиден"] },
  { q: "в следующем году / наступного року", answer: "догодина", hint: HINT_FUTURE_TIME, decoys: ["другата седмица", "другия месец", "утре"] },
  { q: "завтра утром / завтра вранці", answer: "утре сутринта", hint: HINT_FUTURE_TIME, decoys: ["вчера сутринта", "утре вечерта", "довечера"] },
  { q: "завтра после обеда / завтра після обіду", answer: "утре следобед", hint: HINT_FUTURE_TIME, decoys: ["утре сутринта", "вчера следобед", "довечера"] },
  { q: "завтра вечером / завтра ввечері", answer: "утре вечерта", hint: HINT_FUTURE_TIME, decoys: ["довечера", "утре сутринта", "вчера вечерта"] },
  { q: "в воскресенье / у неділю", answer: "в неделя", hint: HINT_FUTURE_TIME, decoys: ["в събота", "довечера", "утре"] },
  { q: "в следующем месяце / наступного місяця", answer: "другия месец", hint: HINT_FUTURE_TIME, decoys: ["другата седмица", "догодина", "вдругиден"] },
];

// --- Future tense particle: ще / няма да ---
const SHTE_NEG_RULE_L5: Localized<string> = {
  ru: "Будущее: положит. — «ще» + форма наст. времени, отрицат. — «няма да» + форма наст. времени. Глагол спрягается как в наст. вр., меняется только частица.",
  uk: "Майбутнє: ствердж. — «ще» + форма теп. часу, заперечн. — «няма да» + форма теп. часу. Дієслово відмінюється як у теп. ч., змінюється лише частка.",
};
const HINT_SHTE_L5: Localized<string> = { ru: "положит. форма: «ще» + гл.", uk: "стверджувальна форма: «ще» + дієсл." };
const HINT_NYAMA_DA_L5: Localized<string> = { ru: "отрицат. форма: «няма да» + гл.", uk: "заперечна форма: «няма да» + дієсл." };
const LABEL_POS_L5: Localized<string> = { ru: "утверждение", uk: "ствердження" };
const LABEL_NEG_L5: Localized<string> = { ru: "отрицание", uk: "заперечення" };
export const DATA_L5_SHTE_NEG: DataItem[] = [
  { q: "Утре аз ___ чета.", label: LABEL_POS_L5, answer: "ще", hint: HINT_SHTE_L5, rule: SHTE_NEG_RULE_L5 },
  { q: "Утре аз ___ чета.", label: LABEL_NEG_L5, answer: "няма да", hint: HINT_NYAMA_DA_L5, rule: SHTE_NEG_RULE_L5 },
  { q: "Ти ___ ядеш ли довечера?", label: LABEL_POS_L5, answer: "ще", hint: HINT_SHTE_L5, rule: SHTE_NEG_RULE_L5 },
  { q: "Ти ___ ядеш довечера.", label: LABEL_NEG_L5, answer: "няма да", hint: HINT_NYAMA_DA_L5, rule: SHTE_NEG_RULE_L5 },
  { q: "Той ___ пише писмо.", label: LABEL_POS_L5, answer: "ще", hint: HINT_SHTE_L5, rule: SHTE_NEG_RULE_L5 },
  { q: "Той ___ пише писмо.", label: LABEL_NEG_L5, answer: "няма да", hint: HINT_NYAMA_DA_L5, rule: SHTE_NEG_RULE_L5 },
  { q: "Ние ___ спим до късно.", label: LABEL_POS_L5, answer: "ще", hint: HINT_SHTE_L5, rule: SHTE_NEG_RULE_L5 },
  { q: "Ние ___ спим утре сутринта.", label: LABEL_NEG_L5, answer: "няма да", hint: HINT_NYAMA_DA_L5, rule: SHTE_NEG_RULE_L5 },
  { q: "Вие ___ ходите ли на кино?", label: LABEL_POS_L5, answer: "ще", hint: HINT_SHTE_L5, rule: SHTE_NEG_RULE_L5 },
  { q: "Вие ___ ходите на кино.", label: LABEL_NEG_L5, answer: "няма да", hint: HINT_NYAMA_DA_L5, rule: SHTE_NEG_RULE_L5 },
  { q: "Те ___ учат утре.", label: LABEL_POS_L5, answer: "ще", hint: HINT_SHTE_L5, rule: SHTE_NEG_RULE_L5 },
  { q: "Те ___ учат утре.", label: LABEL_NEG_L5, answer: "няма да", hint: HINT_NYAMA_DA_L5, rule: SHTE_NEG_RULE_L5 },
  { q: "Иван ___ се срещне с Ирина довечера.", label: LABEL_POS_L5, answer: "ще", hint: HINT_SHTE_L5, rule: SHTE_NEG_RULE_L5 },
  { q: "Аз ___ пуша.", label: LABEL_NEG_L5, answer: "няма да", hint: HINT_NYAMA_DA_L5, rule: SHTE_NEG_RULE_L5 },
  { q: "Утре ние ___ закусваме заедно.", label: LABEL_POS_L5, answer: "ще", hint: HINT_SHTE_L5, rule: SHTE_NEG_RULE_L5 },
];
export const L5_SHTE_NEG_OPTIONS = ["ще", "няма да"];

// --- Affirmative future answer: "Ще четеш ли сега?" → "Да, ще чета." ---
const SHTE_AFF_RULE: Localized<string> = {
  ru: "Утвердительный ответ на «Ще ___ ли?»: «Да, ще ___» с формой 1-го лица. Меняется лицо: ти→аз, вие→ние/аз.",
  uk: "Стверджувальна відповідь на «Ще ___ ли?»: «Да, ще ___» з формою 1-ї особи. Змінюється особа: ти→аз, вие→ние/аз.",
};
const HINT_SHTE_AFF: Localized<string> = { ru: "ответ «Да, ще + 1л.»", uk: "відповідь «Да, ще + 1ос.»" };
export const DATA_L5_SHTE_AFF: DataItem[] = [
  { q: "Ще четеш ли сега?", answer: "Да, ще чета.", hint: HINT_SHTE_AFF, rule: SHTE_AFF_RULE,
    decoys: ["Да, ще четеш.", "Не, няма да чета.", "Да, чета."] },
  { q: "Ще ядеш ли?", answer: "Да, ще ям.", hint: HINT_SHTE_AFF, rule: SHTE_AFF_RULE,
    decoys: ["Да, ще ядеш.", "Не, няма да ям.", "Да, ям."] },
  { q: "Ще пишете ли?", answer: "Да, ще пишем.", hint: HINT_SHTE_AFF, rule: SHTE_AFF_RULE,
    decoys: ["Да, ще пишете.", "Да, ще пиша.", "Не, няма да пишем."] },
  { q: "Ще закусваш ли?", answer: "Да, ще закусвам.", hint: HINT_SHTE_AFF, rule: SHTE_AFF_RULE,
    decoys: ["Да, ще закусваш.", "Не, няма да закусвам.", "Да, закусвам."] },
  { q: "Ще вечеряте ли?", answer: "Да, ще вечеряме.", hint: HINT_SHTE_AFF, rule: SHTE_AFF_RULE,
    decoys: ["Да, ще вечеряте.", "Да, ще вечерям.", "Не, няма да вечеряме."] },
  { q: "Ще се разхождате ли?", answer: "Да, ще се разхождаме.", hint: HINT_SHTE_AFF, rule: SHTE_AFF_RULE,
    decoys: ["Да, ще се разхождате.", "Да, ще се разхождам.", "Не, няма да се разхождаме."] },
  { q: "Ще излизаш ли довечера?", answer: "Да, ще излизам.", hint: HINT_SHTE_AFF, rule: SHTE_AFF_RULE,
    decoys: ["Да, ще излизаш.", "Не, няма да излизам.", "Да, излизам."] },
  { q: "Ще си почиваш ли?", answer: "Да, ще си почивам.", hint: HINT_SHTE_AFF, rule: SHTE_AFF_RULE,
    decoys: ["Да, ще си почиваш.", "Не, няма да си почивам.", "Да, си почивам."] },
  { q: "Ще спите ли?", answer: "Да, ще спим.", hint: HINT_SHTE_AFF, rule: SHTE_AFF_RULE,
    decoys: ["Да, ще спите.", "Да, ще спя.", "Не, няма да спим."] },
];

// --- Negative future answer: "Ще пушиш ли?" → "Не, няма да пуша." ---
const SHTE_NEG_ANS_RULE: Localized<string> = {
  ru: "Отрицательный ответ на «Ще ___ ли?»: «Не, няма да ___» с формой 1-го лица.",
  uk: "Заперечна відповідь на «Ще ___ ли?»: «Не, няма да ___» з формою 1-ї особи.",
};
const HINT_SHTE_NEG_ANS: Localized<string> = { ru: "ответ «Не, няма да + 1л.»", uk: "відповідь «Не, няма да + 1ос.»" };
export const DATA_L5_SHTE_NEG_ANS: DataItem[] = [
  { q: "Ще пушиш ли?", answer: "Не, няма да пуша.", hint: HINT_SHTE_NEG_ANS, rule: SHTE_NEG_ANS_RULE,
    decoys: ["Не, няма да пушиш.", "Не, не пуша.", "Да, ще пуша."] },
  { q: "Ще спиш ли сега?", answer: "Не, няма да спя.", hint: HINT_SHTE_NEG_ANS, rule: SHTE_NEG_ANS_RULE,
    decoys: ["Не, няма да спиш.", "Не, не спя.", "Да, ще спя."] },
  { q: "Ще се разхождате ли днес?", answer: "Не, няма да се разхождаме.", hint: HINT_SHTE_NEG_ANS, rule: SHTE_NEG_ANS_RULE,
    decoys: ["Не, няма да се разхождате.", "Не, няма да се разхождам.", "Да, ще се разхождаме."] },
  { q: "Ще излизате ли?", answer: "Не, няма да излизаме.", hint: HINT_SHTE_NEG_ANS, rule: SHTE_NEG_ANS_RULE,
    decoys: ["Не, няма да излизате.", "Не, няма да излизам.", "Да, ще излизаме."] },
  { q: "Ще учите ли утре?", answer: "Не, няма да учим.", hint: HINT_SHTE_NEG_ANS, rule: SHTE_NEG_ANS_RULE,
    decoys: ["Не, няма да учите.", "Не, няма да уча.", "Да, ще учим."] },
  { q: "Ще излизаш ли довечера?", answer: "Не, няма да излизам.", hint: HINT_SHTE_NEG_ANS, rule: SHTE_NEG_ANS_RULE,
    decoys: ["Не, няма да излизаш.", "Не, не излизам.", "Да, ще излизам."] },
  { q: "Ще вечеряш ли?", answer: "Не, няма да вечерям.", hint: HINT_SHTE_NEG_ANS, rule: SHTE_NEG_ANS_RULE,
    decoys: ["Не, няма да вечеряш.", "Не, не вечерям.", "Да, ще вечерям."] },
  { q: "Ще ходите ли на кино?", answer: "Не, няма да ходим.", hint: HINT_SHTE_NEG_ANS, rule: SHTE_NEG_ANS_RULE,
    decoys: ["Не, няма да ходите.", "Не, няма да ходя.", "Да, ще ходим."] },
  { q: "Ще се бръснеш ли?", answer: "Не, няма да се бръсна.", hint: HINT_SHTE_NEG_ANS, rule: SHTE_NEG_ANS_RULE,
    decoys: ["Не, няма да се бръснеш.", "Не, не се бръсна.", "Да, ще се бръсна."] },
];

// --- Future of "пиша" (pick) ---
const SHTE_PISHA_RULE: Localized<string> = {
  ru: "Будущее «пиша» (I спр.): ще пиша/ще пишеш/ще пише · ще пишем/ще пишете/ще пишат. Частица «ще» + форма наст. времени.",
  uk: "Майбутнє «пиша» (I дієвідм.): ще пиша/ще пишеш/ще пише · ще пишем/ще пишете/ще пишат. Частка «ще» + форма теп. часу.",
};
export const DATA_L5_SHTE_PISHA: DataItem[] = [
  { q: "Аз", answer: "ще пиша", hint: { ru: "я буду писать", uk: "я писатиму" }, rule: SHTE_PISHA_RULE },
  { q: "Ти", answer: "ще пишеш", hint: { ru: "ты будешь писать", uk: "ти писатимеш" }, rule: SHTE_PISHA_RULE },
  { q: "Той/Тя/То", answer: "ще пише", hint: { ru: "он будет писать", uk: "він писатиме" }, rule: SHTE_PISHA_RULE },
  { q: "Ние", answer: "ще пишем", hint: { ru: "мы будем писать", uk: "ми писатимемо" }, rule: SHTE_PISHA_RULE },
  { q: "Вие", answer: "ще пишете", hint: { ru: "вы будете писать", uk: "ви писатимете" }, rule: SHTE_PISHA_RULE },
  { q: "Те", answer: "ще пишат", hint: { ru: "они будут писать", uk: "вони писатимуть" }, rule: SHTE_PISHA_RULE },
];

// --- който / която / което / които relative ---
const KOYTO_RULE: Localized<string> = {
  ru: "Относительные местоимения: който (м.р.), която (ж.р.), което (ср.р.), които (мн.ч.). Согласуются с антецедентом по роду/числу.",
  uk: "Відносні займенники: който (ч.р.), която (ж.р.), което (с.р.), които (мн.). Узгоджуються з антецедентом за родом/числом.",
};
const HINT_KOYTO: Localized<string> = { ru: "относит. мест. по роду/числу антецедента", uk: "віднос. займ. за родом/числом антецедента" };
export const DATA_L5_KOYTO: DataItem[] = [
  { q: "Това е мъжът, ___ работи тук.", answer: "който", hint: HINT_KOYTO, rule: KOYTO_RULE },
  { q: "Това е жената, ___ работи тук.", answer: "която", hint: HINT_KOYTO, rule: KOYTO_RULE },
  { q: "Това е детето, ___ говори китайски.", answer: "което", hint: HINT_KOYTO, rule: KOYTO_RULE },
  { q: "Това са студентите, ___ учат български.", answer: "които", hint: HINT_KOYTO, rule: KOYTO_RULE },
  { q: "Не харесвам мъже, ___ не се бръснат.", answer: "които", hint: HINT_KOYTO, rule: KOYTO_RULE },
  { q: "Не харесвам жени, ___ се гримират.", answer: "които", hint: HINT_KOYTO, rule: KOYTO_RULE },
  { q: "Това е жената, ___ живее в тази къща.", answer: "която", hint: HINT_KOYTO, rule: KOYTO_RULE },
  { q: "Това е преподавателят, ___ преподава български.", answer: "който", hint: HINT_KOYTO, rule: KOYTO_RULE },
  { q: "Ето го момчето, ___ говори испански.", answer: "което", hint: HINT_KOYTO, rule: KOYTO_RULE },
  { q: "Ето ги преподавателите, ___ работят в университета.", answer: "които", hint: HINT_KOYTO, rule: KOYTO_RULE },
  { q: "Не харесвам хора, ___ лъжат.", answer: "които", hint: HINT_KOYTO, rule: KOYTO_RULE },
  { q: "Това е книгата, ___ чета сега.", answer: "която", hint: HINT_KOYTO, rule: KOYTO_RULE },
  { q: "Харесвам жени, ___ се обличат спортно.", answer: "които", hint: HINT_KOYTO, rule: KOYTO_RULE },
  { q: "Това е писмото, ___ пиша на майка си.", answer: "което", hint: HINT_KOYTO, rule: KOYTO_RULE },
  { q: "Иван е приятелят, ___ обича Ирина.", answer: "който", hint: HINT_KOYTO, rule: KOYTO_RULE },
];
export const L5_KOYTO_OPTIONS = ["който", "която", "което", "които"];

// --- такъв / такава / такова / такива demonstrative ---
const TAKAV_RULE: Localized<string> = {
  ru: "Указательные качества: такъв (м.р.), такава (ж.р.), такова (ср.р.), такива (мн.ч.). Соответствие: какъв→такъв, каква→такава, какво→такова, какви→такива.",
  uk: "Вказівні якості: такъв (ч.р.), такава (ж.р.), такова (с.р.), такива (мн.). Відповідність: какъв→такъв, каква→такава, какво→такова, какви→такива.",
};
const HINT_TAKAV: Localized<string> = { ru: "такой / такая / такое / такие", uk: "такий / така / таке / такі" };
export const DATA_L5_TAKAV: DataItem[] = [
  { q: "Какъв мъж? — ___ мъж.", answer: "такъв", hint: HINT_TAKAV, rule: TAKAV_RULE },
  { q: "Каква жена? — ___ жена.", answer: "такава", hint: HINT_TAKAV, rule: TAKAV_RULE },
  { q: "Какво дете? — ___ дете.", answer: "такова", hint: HINT_TAKAV, rule: TAKAV_RULE },
  { q: "Какви хора? — ___ хора.", answer: "такива", hint: HINT_TAKAV, rule: TAKAV_RULE },
  { q: "Харесвате ли ___ началници? (мн.ч.)", answer: "такива", hint: HINT_TAKAV, rule: TAKAV_RULE },
  { q: "Не харесвам ___ човек. (м.р.)", answer: "такъв", hint: HINT_TAKAV, rule: TAKAV_RULE },
  { q: "Не харесвам ___ жена. (ж.р.)", answer: "такава", hint: HINT_TAKAV, rule: TAKAV_RULE },
  { q: "Това е ___ момиче. (ср.р.)", answer: "такова", hint: HINT_TAKAV, rule: TAKAV_RULE },
  { q: "___ приятели обичам. (мн.ч.)", answer: "такива", hint: HINT_TAKAV, rule: TAKAV_RULE },
  { q: "Имам ___ костюм. (м.р.)", answer: "такъв", hint: HINT_TAKAV, rule: TAKAV_RULE },
  { q: "Имам ___ рокля. (ж.р.)", answer: "такава", hint: HINT_TAKAV, rule: TAKAV_RULE },
  { q: "Имам ___ яке. (ср.р.)", answer: "такова", hint: HINT_TAKAV, rule: TAKAV_RULE },
];
export const L5_TAKAV_OPTIONS = ["такъв", "такава", "такова", "такива"];

// --- Like / love verbs ---
const OBICHAM_RULE: Localized<string> = {
  ru: "Глаголы предпочтения: харесвам (нравится — лёгкая симпатия), обичам (люблю — глубокое чувство), мразя (ненавижу). Отрицание: не харесвам, не обичам.",
  uk: "Дієслова вподобань: харесвам (подобається — легка симпатія), обичам (люблю — глибоке почуття), мразя (ненавиджу). Заперечення: не харесвам, не обичам.",
};
const HINT_OBICHAM: Localized<string> = { ru: "глагол отношения", uk: "дієслово ставлення" };
const LABEL_LIKE: Localized<string> = { ru: "нравится 🙂", uk: "подобається 🙂" };
const LABEL_LOVE: Localized<string> = { ru: "люблю ❤️", uk: "люблю ❤️" };
const LABEL_HATE: Localized<string> = { ru: "ненавижу 💢", uk: "ненавиджу 💢" };
const LABEL_DISLIKE: Localized<string> = { ru: "не нравится 🙁", uk: "не подобається 🙁" };
export const DATA_L5_OBICHAM: DataItem[] = [
  { q: "Аз ___ кафе сутрин.", label: LABEL_LIKE, answer: "харесвам", hint: HINT_OBICHAM, rule: OBICHAM_RULE },
  { q: "Иван ___ Ирина много.", label: LABEL_LOVE, answer: "обича", hint: HINT_OBICHAM, rule: OBICHAM_RULE },
  { q: "Тя ___ лъжците.", label: LABEL_HATE, answer: "мрази", hint: HINT_OBICHAM, rule: OBICHAM_RULE },
  { q: "Аз ___ скучните хора.", label: LABEL_DISLIKE, answer: "не харесвам", hint: HINT_OBICHAM, rule: OBICHAM_RULE },
  { q: "Момичетата я ___.", label: LABEL_HATE, answer: "мразят", hint: HINT_OBICHAM, rule: OBICHAM_RULE },
  { q: "Момчетата я ___.", label: LABEL_LIKE, answer: "харесват", hint: HINT_OBICHAM, rule: OBICHAM_RULE },
  { q: "Ние ___ купоните.", label: LABEL_LOVE, answer: "обичаме", hint: HINT_OBICHAM, rule: OBICHAM_RULE },
  { q: "Те ___ лицемерните хора.", label: LABEL_HATE, answer: "мразят", hint: HINT_OBICHAM, rule: OBICHAM_RULE },
  { q: "Аз ___ живота.", label: LABEL_LOVE, answer: "обичам", hint: HINT_OBICHAM, rule: OBICHAM_RULE },
  { q: "Тя ___ сериозните хора.", label: LABEL_DISLIKE, answer: "не харесва", hint: HINT_OBICHAM, rule: OBICHAM_RULE },
];
export const L5_OBICHAM_OPTIONS = ["харесвам", "харесва", "харесват", "обичам", "обича", "обичаме", "мрази", "мразят", "не харесвам", "не харесва"];

// --- Build sentences ---
export const DATA_L5_BUILD: BuildItem[] = [
  { words: ["Тя", "е", "висока", "и", "слаба"], translation: { ru: "Она высокая и худая.", uk: "Вона висока і струнка." } },
  { words: ["Той", "има", "сини", "очи", "и", "руса", "коса"], translation: { ru: "У него синие глаза и русые волосы.", uk: "У нього сині очі і русяве волосся." } },
  { words: ["Каква", "е", "Катя", "по", "характер", "?"], translation: { ru: "Какая Катя по характеру?", uk: "Яка Катя за характером?" } },
  { words: ["Тя", "е", "отговорна", "и", "честна"], translation: { ru: "Она ответственная и честная.", uk: "Вона відповідальна і чесна." } },
  { words: ["Иван", "обича", "Ирина", "много"], translation: { ru: "Иван очень любит Ирину.", uk: "Іван дуже любить Ірину." } },
  { words: ["Момчетата", "я", "харесват", ",", "а", "момичетата", "я", "мразят"], translation: { ru: "Мальчики её любят, а девочки ненавидят.", uk: "Хлопці її люблять, а дівчата ненавидять." } },
  { words: ["Утре", "ще", "ям", "в", "ресторанта"], translation: { ru: "Завтра я буду есть в ресторане.", uk: "Завтра я їстиму в ресторані." } },
  { words: ["Довечера", "няма", "да", "излизам"], translation: { ru: "Сегодня вечером я не пойду гулять.", uk: "Сьогодні ввечері я не виходитиму." } },
  { words: ["Догодина", "ще", "уча", "български"], translation: { ru: "В следующем году я буду учить болгарский.", uk: "Наступного року я вчитиму болгарську." } },
  { words: ["Какъв", "цвят", "е", "моливът", "?"], translation: { ru: "Какого цвета карандаш?", uk: "Якого кольору олівець?" } },
  { words: ["Първият", "молив", "е", "светлосин"], translation: { ru: "Первый карандаш — голубой.", uk: "Перший олівець — блакитний." } },
  { words: ["За", "интервю", "ще", "си", "облека", "костюм"], translation: { ru: "На интервью я надену костюм.", uk: "На співбесіду я вдягну костюм." } },
];

// --- Build когато / който clauses ---
export const DATA_L5_KOGATO_BUILD: BuildItem[] = [
  { words: ["Когато", "съм", "на", "работа", ",", "се", "обличам", "делово"], translation: { ru: "Когда я на работе, я одеваюсь по-деловому.", uk: "Коли я на роботі, я одягаюся по-діловому." } },
  { words: ["Когато", "съм", "на", "дискотека", ",", "се", "обличам", "спортно"], translation: { ru: "Когда я на дискотеке, я одеваюсь спортивно.", uk: "Коли я на дискотеці, я одягаюся спортивно." } },
  { words: ["Когато", "съм", "на", "коктейл", ",", "се", "обличам", "официално"], translation: { ru: "Когда я на коктейле, я одеваюсь официально.", uk: "Коли я на коктейлі, я одягаюся офіційно." } },
  { words: ["Харесвам", "жени", ",", "които", "се", "обличат", "спортно"], translation: { ru: "Мне нравятся женщины, которые одеваются спортивно.", uk: "Мені подобаються жінки, які одягаються спортивно." } },
  { words: ["Не", "харесвам", "мъже", ",", "които", "не", "се", "бръснат"], translation: { ru: "Я не люблю мужчин, которые не бреются.", uk: "Я не люблю чоловіків, які не голяться." } },
  { words: ["Това", "е", "жената", ",", "която", "работи", "тук"], translation: { ru: "Это женщина, которая работает здесь.", uk: "Це жінка, яка працює тут." } },
  { words: ["Това", "е", "мъжът", ",", "който", "работи", "тук"], translation: { ru: "Это мужчина, который работает здесь.", uk: "Це чоловік, який працює тут." } },
  { words: ["Това", "е", "детето", ",", "което", "говори", "китайски"], translation: { ru: "Это ребёнок, который говорит по-китайски.", uk: "Це дитина, яка говорить китайською." } },
  { words: ["Не", "харесвам", "хора", ",", "които", "лъжат"], translation: { ru: "Я не люблю людей, которые лгут.", uk: "Я не люблю людей, які брешуть." } },
  { words: ["Когато", "съм", "вкъщи", ",", "се", "обличам", "небрежно"], translation: { ru: "Когда я дома, я одеваюсь небрежно.", uk: "Коли я вдома, я одягаюся недбало." } },
];

// --- Future paradigms ---
const L5_PRONOUNS = ["Аз", "Ти", "Той", "Ние", "Вие", "Те"];
export const DATA_L5_PARADIGM: ParadigmItem[] = [
  { verb: "ще пиша", pronouns: L5_PRONOUNS, forms: ["ще пиша", "ще пишеш", "ще пише", "ще пишем", "ще пишете", "ще пишат"],
    hint: { ru: "будущее «писать» (I)", uk: "майбутнє «писати» (I)" }, rule: SHTE_PISHA_RULE },
  { verb: "ще чета", pronouns: L5_PRONOUNS, forms: ["ще чета", "ще четеш", "ще чете", "ще четем", "ще четете", "ще четат"],
    hint: { ru: "будущее «читать» (I)", uk: "майбутнє «читати» (I)" } },
  { verb: "ще ям", pronouns: L5_PRONOUNS, forms: ["ще ям", "ще ядеш", "ще яде", "ще ядем", "ще ядете", "ще ядат"],
    hint: { ru: "будущее «есть» (неправ.)", uk: "майбутнє «їсти» (неправ.)" } },
  { verb: "ще говоря", pronouns: L5_PRONOUNS, forms: ["ще говоря", "ще говориш", "ще говори", "ще говорим", "ще говорите", "ще говорят"],
    hint: { ru: "будущее «говорить» (II)", uk: "майбутнє «говорити» (II)" } },
  { verb: "ще ходя", pronouns: L5_PRONOUNS, forms: ["ще ходя", "ще ходиш", "ще ходи", "ще ходим", "ще ходите", "ще ходят"],
    hint: { ru: "будущее «ходить» (II)", uk: "майбутнє «ходити» (II)" } },
  { verb: "ще обичам", pronouns: L5_PRONOUNS, forms: ["ще обичам", "ще обичаш", "ще обича", "ще обичаме", "ще обичате", "ще обичат"],
    hint: { ru: "будущее «любить» (III)", uk: "майбутнє «любити» (III)" } },
];

// --- Match: RU/UK color → BG color ---
const HINT_MATCH_COLOR: Localized<string> = { ru: "соедини с болгарским цветом", uk: "з'єднай з болгарським кольором" };
export const DATA_L5_MATCH_COLOR: MatchItem[] = [
  { left: "белый / білий", right: "бял", hint: HINT_MATCH_COLOR },
  { left: "чёрный / чорний", right: "черен", hint: HINT_MATCH_COLOR },
  { left: "красный / червоний", right: "червен", hint: HINT_MATCH_COLOR },
  { left: "зелёный / зелений", right: "зелен", hint: HINT_MATCH_COLOR },
  { left: "жёлтый / жовтий", right: "жълт", hint: HINT_MATCH_COLOR },
  { left: "синий / синій", right: "син", hint: HINT_MATCH_COLOR },
  { left: "коричневый / коричневий", right: "кафяв", hint: HINT_MATCH_COLOR },
  { left: "розовый / рожевий", right: "розов", hint: HINT_MATCH_COLOR },
  { left: "серый / сірий", right: "сив", hint: HINT_MATCH_COLOR },
  { left: "фиолетовый / фіолетовий", right: "лилав", hint: HINT_MATCH_COLOR },
];

// --- Match: antonyms (appearance + character) ---
const HINT_MATCH_ANT_L5: Localized<string> = { ru: "соедини антонимы", uk: "з'єднай антоніми" };
export const DATA_L5_MATCH_ANT: MatchItem[] = [
  { left: "висок", right: "нисък", hint: HINT_MATCH_ANT_L5 },
  { left: "дебел", right: "слаб", hint: HINT_MATCH_ANT_L5 },
  { left: "стар", right: "млад", hint: HINT_MATCH_ANT_L5 },
  { left: "красив", right: "грозен", hint: HINT_MATCH_ANT_L5 },
  { left: "добър", right: "лош", hint: HINT_MATCH_ANT_L5 },
  { left: "весел", right: "тъжен", hint: HINT_MATCH_ANT_L5 },
  { left: "умен", right: "глупав", hint: HINT_MATCH_ANT_L5 },
  { left: "мълчалив", right: "приказлив", hint: HINT_MATCH_ANT_L5 },
  { left: "щедър", right: "стиснат", hint: HINT_MATCH_ANT_L5 },
  { left: "смел", right: "страхлив", hint: HINT_MATCH_ANT_L5 },
  { left: "работлив", right: "мързелив", hint: HINT_MATCH_ANT_L5 },
  { left: "нежен", right: "груб", hint: HINT_MATCH_ANT_L5 },
];

// --- Odd one out ---
const ODD_L5_NOT_BODY: Localized<string> = { ru: "одно — не часть тела", uk: "одне — не частина тіла" };
const ODD_L5_NOT_CHAR_POS: Localized<string> = { ru: "одно — отрицательная черта характера", uk: "одне — негативна риса характеру" };
const ODD_L5_NOT_CHAR_NEG: Localized<string> = { ru: "одно — положительная черта характера", uk: "одне — позитивна риса характеру" };
const ODD_L5_NOT_COLOR: Localized<string> = { ru: "одно — не цвет", uk: "одне — не колір" };
const ODD_L5_NOT_CLOTHES: Localized<string> = { ru: "одно — не одежда", uk: "одне — не одяг" };
const ODD_L5_NOT_HAIR: Localized<string> = { ru: "одно — не описание волос", uk: "одне — не опис волосся" };
const ODD_L5_NOT_FUTURE: Localized<string> = { ru: "одно — не указатель будущего", uk: "одне — не вказівник майбутнього" };
const ODD_L5_NOT_STYLE: Localized<string> = { ru: "одно — не стиль одежды", uk: "одне — не стиль одягу" };
const ODD_L5_NOT_REL: Localized<string> = { ru: "одно — не относит. местоимение", uk: "одне — не віднос. займенник" };
const ODD_L5_NOT_FOOTWEAR: Localized<string> = { ru: "одно — не обувь", uk: "одне — не взуття" };
const ODD_L5_NOT_SHTE: Localized<string> = { ru: "одно — не форма «ще»/«няма да»", uk: "одне — не форма «ще»/«няма да»" };
const ODD_L5_NOT_FACE: Localized<string> = { ru: "одно — не описание лица/носа", uk: "одне — не опис обличчя/носа" };
export const DATA_L5_ODD: OddItem[] = [
  { words: ["глава", "коса", "ръка", "стол"], odd: "стол", hint: ODD_L5_NOT_BODY },
  { words: ["око", "ухо", "нос", "врат"], odd: "врат", hint: { ru: "одно — не на лице", uk: "одне — не на обличчі" } },
  { words: ["добър", "честен", "щедър", "лош"], odd: "лош", hint: ODD_L5_NOT_CHAR_POS },
  { words: ["лош", "глупав", "мързелив", "умен"], odd: "умен", hint: ODD_L5_NOT_CHAR_NEG },
  { words: ["бял", "червен", "зелен", "висок"], odd: "висок", hint: ODD_L5_NOT_COLOR },
  { words: ["риза", "панталон", "сако", "буза"], odd: "буза", hint: ODD_L5_NOT_CLOTHES },
  { words: ["дълга", "къса", "руса", "стара"], odd: "стара", hint: ODD_L5_NOT_HAIR },
  { words: ["утре", "вдругиден", "довечера", "вчера"], odd: "вчера", hint: ODD_L5_NOT_FUTURE },
  { words: ["делово", "спортно", "официално", "сериозно"], odd: "сериозно", hint: ODD_L5_NOT_STYLE },
  { words: ["който", "която", "което", "такъв"], odd: "такъв", hint: ODD_L5_NOT_REL },
  { words: ["обувки", "сандали", "ботуши", "вратовръзка"], odd: "вратовръзка", hint: ODD_L5_NOT_FOOTWEAR },
  { words: ["ще пиша", "ще ям", "пиша", "ще чета"], odd: "пиша", hint: ODD_L5_NOT_SHTE },
  { words: ["правилен", "гърбав", "чип", "сив"], odd: "сив", hint: ODD_L5_NOT_FACE },
];
