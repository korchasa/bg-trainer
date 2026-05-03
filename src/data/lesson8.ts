import type { DataItem, BuildItem, LiItem, MatchItem, OddItem, ParadigmItem } from "../types";
import type { Localized } from "../i18n/types";

// ========================= LESSON 8 =========================
// Theme: Хранене (eating, food, restaurant, present perfect tense)

// --- General food vocabulary ---
const HINT_FOOD: Localized<string> = { ru: "общая еда", uk: "загальна їжа" };
export const DATA_L8_FOOD: DataItem[] = [
  { q: "еда / їжа", answer: "храна", hint: HINT_FOOD, decoys: ["ядене", "закуска", "обяд"] },
  { q: "блюдо (готовое) / страва", answer: "ядене", hint: HINT_FOOD, decoys: ["храна", "ястие", "закуска"] },
  { q: "блюдо (в меню) / страва (у меню)", answer: "ястие", hint: HINT_FOOD, decoys: ["ядене", "храна", "рецепта"] },
  { q: "завтрак / сніданок", answer: "закуска", hint: HINT_FOOD, decoys: ["обяд", "вечеря", "ядене"] },
  { q: "обед / обід", answer: "обяд", hint: HINT_FOOD, decoys: ["закуска", "вечеря", "обед"] },
  { q: "ужин / вечеря", answer: "вечеря", hint: HINT_FOOD, decoys: ["обяд", "закуска", "вечер"] },
  { q: "суп / суп", answer: "супа", hint: HINT_FOOD, decoys: ["салата", "сос", "ястие"] },
  { q: "салат / салат", answer: "салата", hint: HINT_FOOD, decoys: ["супа", "ястие", "сос"] },
  { q: "сэндвич / сендвіч", answer: "сандвич", hint: HINT_FOOD, decoys: ["хляб", "филия", "бисквита"] },
  { q: "хлеб / хліб", answer: "хляб", hint: HINT_FOOD, decoys: ["сандвич", "филия", "масло"] },
  { q: "ломтик / скибка", answer: "филия", hint: HINT_FOOD, decoys: ["хляб", "сандвич", "парче"] },
  { q: "печенье / печиво", answer: "бисквити", hint: HINT_FOOD, decoys: ["торта", "хляб", "сладолед"] },
  { q: "торт / торт", answer: "торта", hint: HINT_FOOD, decoys: ["баклава", "сладолед", "палачинка"] },
  { q: "мороженое / морозиво", answer: "сладолед", hint: HINT_FOOD, decoys: ["торта", "баклава", "конфитюр"] },
  { q: "варенье / варення", answer: "конфитюр", hint: HINT_FOOD, decoys: ["мед", "масло", "сос"] },
  { q: "рецепт / рецепт", answer: "рецепта", hint: HINT_FOOD, decoys: ["ястие", "меню", "храна"] },
];

export const DATA_L8_FOOD_TYPE: DataItem[] = [
  { q: "хлеб / хліб", answer: "хляб", hint: HINT_FOOD },
  { q: "сэндвич / сендвіч", answer: "сандвич", hint: HINT_FOOD },
  { q: "суп / суп", answer: "супа", hint: HINT_FOOD },
  { q: "салат / салат", answer: "салата", hint: HINT_FOOD },
  { q: "торт / торт", answer: "торта", hint: HINT_FOOD },
  { q: "мороженое / морозиво", answer: "сладолед", hint: HINT_FOOD },
  { q: "печенье / печиво", answer: "бисквити", hint: HINT_FOOD },
  { q: "блюдо (в меню) / страва (у меню)", answer: "ястие", hint: HINT_FOOD },
  { q: "рецепт / рецепт", answer: "рецепта", hint: HINT_FOOD },
  { q: "завтрак / сніданок", answer: "закуска", hint: HINT_FOOD },
  { q: "варенье / варення", answer: "конфитюр", hint: HINT_FOOD },
  { q: "ломтик / скибка", answer: "филия", hint: HINT_FOOD },
];

// --- Fruits ---
const HINT_FRUIT: Localized<string> = { ru: "плод / фрукт", uk: "плід / фрукт" };
export const DATA_L8_FRUITS: DataItem[] = [
  { q: "яблоко / яблуко", answer: "ябълка", hint: HINT_FRUIT, decoys: ["круша", "праскова", "слива"] },
  { q: "груша / груша", answer: "круша", hint: HINT_FRUIT, decoys: ["ябълка", "праскова", "кайсия"] },
  { q: "персик / персик", answer: "праскова", hint: HINT_FRUIT, decoys: ["кайсия", "слива", "круша"] },
  { q: "абрикос / абрикос", answer: "кайсия", hint: HINT_FRUIT, decoys: ["праскова", "слива", "череша"] },
  { q: "слива / слива", answer: "слива", hint: HINT_FRUIT, decoys: ["кайсия", "праскова", "вишна"] },
  { q: "черешня / черешня", answer: "череша", hint: HINT_FRUIT, decoys: ["вишна", "ягода", "грозде"] },
  { q: "вишня / вишня", answer: "вишна", hint: HINT_FRUIT, decoys: ["череша", "ягода", "слива"] },
  { q: "клубника / полуниця", answer: "ягода", hint: HINT_FRUIT, decoys: ["череша", "вишна", "грозде"] },
  { q: "виноград / виноград", answer: "грозде", hint: HINT_FRUIT, decoys: ["ягода", "слива", "праскова"] },
  { q: "апельсин / апельсин", answer: "портокал", hint: HINT_FRUIT, decoys: ["лимон", "банан", "ябълка"] },
  { q: "лимон / лимон", answer: "лимон", hint: HINT_FRUIT, decoys: ["портокал", "пъпеш", "круша"] },
  { q: "банан / банан", answer: "банан", hint: HINT_FRUIT, decoys: ["портокал", "лимон", "круша"] },
  { q: "арбуз / кавун", answer: "диня", hint: HINT_FRUIT, decoys: ["пъпеш", "тиква", "грозде"] },
  { q: "дыня / диня", answer: "пъпеш", hint: HINT_FRUIT, decoys: ["диня", "тиква", "праскова"] },
  { q: "сок / сік", answer: "сок", hint: HINT_FRUIT, decoys: ["вода", "вино", "чай"] },
];

export const DATA_L8_FRUITS_TYPE: DataItem[] = [
  { q: "яблоко / яблуко", answer: "ябълка", hint: HINT_FRUIT },
  { q: "груша / груша", answer: "круша", hint: HINT_FRUIT },
  { q: "персик / персик", answer: "праскова", hint: HINT_FRUIT },
  { q: "абрикос / абрикос", answer: "кайсия", hint: HINT_FRUIT },
  { q: "слива / слива", answer: "слива", hint: HINT_FRUIT },
  { q: "черешня / черешня", answer: "череша", hint: HINT_FRUIT },
  { q: "клубника / полуниця", answer: "ягода", hint: HINT_FRUIT },
  { q: "виноград / виноград", answer: "грозде", hint: HINT_FRUIT },
  { q: "апельсин / апельсин", answer: "портокал", hint: HINT_FRUIT },
  { q: "арбуз / кавун", answer: "диня", hint: HINT_FRUIT },
  { q: "дыня / диня", answer: "пъпеш", hint: HINT_FRUIT },
  { q: "банан / банан", answer: "банан", hint: HINT_FRUIT },
];

// --- Vegetables ---
const HINT_VEG: Localized<string> = { ru: "овощ", uk: "овоч" };
export const DATA_L8_VEGETABLES: DataItem[] = [
  { q: "помидор / помідор", answer: "домат", hint: HINT_VEG, decoys: ["краставица", "чушка", "лук"] },
  { q: "огурец / огірок", answer: "краставица", hint: HINT_VEG, decoys: ["домат", "тиквичка", "чушка"] },
  { q: "перец / перець", answer: "чушка", hint: HINT_VEG, decoys: ["домат", "патладжан", "лук"] },
  { q: "чеснок / часник", answer: "чесън", hint: HINT_VEG, decoys: ["лук", "магданоз", "копър"] },
  { q: "лук / цибуля", answer: "лук", hint: HINT_VEG, decoys: ["чесън", "морков", "чушка"] },
  { q: "баклажан / баклажан", answer: "патладжан", hint: HINT_VEG, decoys: ["тиквичка", "чушка", "домат"] },
  { q: "капуста / капуста", answer: "зеле", hint: HINT_VEG, decoys: ["марули", "спанак", "зелен"] },
  { q: "морковь / морква", answer: "морков", hint: HINT_VEG, decoys: ["лук", "картоф", "чушка"] },
  { q: "картофель / картопля", answer: "картоф", hint: HINT_VEG, decoys: ["морков", "цвекло", "лук"] },
  { q: "фасоль / квасоля", answer: "боб", hint: HINT_VEG, decoys: ["грах", "леща", "царевица"] },
  { q: "горох / горох", answer: "грах", hint: HINT_VEG, decoys: ["боб", "царевица", "ориз"] },
  { q: "кукуруза / кукурудза", answer: "царевица", hint: HINT_VEG, decoys: ["грах", "боб", "ориз"] },
  { q: "рис / рис", answer: "ориз", hint: HINT_VEG, decoys: ["царевица", "грах", "боб"] },
  { q: "грибы / гриби", answer: "гъби", hint: HINT_VEG, decoys: ["боб", "грах", "лук"] },
  { q: "кабачок / кабачок", answer: "тиквичка", hint: HINT_VEG, decoys: ["патладжан", "краставица", "чушка"] },
];

export const DATA_L8_VEGETABLES_TYPE: DataItem[] = [
  { q: "помидор / помідор", answer: "домат", hint: HINT_VEG },
  { q: "огурец / огірок", answer: "краставица", hint: HINT_VEG },
  { q: "перец / перець", answer: "чушка", hint: HINT_VEG },
  { q: "чеснок / часник", answer: "чесън", hint: HINT_VEG },
  { q: "лук / цибуля", answer: "лук", hint: HINT_VEG },
  { q: "баклажан / баклажан", answer: "патладжан", hint: HINT_VEG },
  { q: "капуста / капуста", answer: "зеле", hint: HINT_VEG },
  { q: "морковь / морква", answer: "морков", hint: HINT_VEG },
  { q: "картофель / картопля", answer: "картоф", hint: HINT_VEG },
  { q: "рис / рис", answer: "ориз", hint: HINT_VEG },
  { q: "грибы / гриби", answer: "гъби", hint: HINT_VEG },
  { q: "кукуруза / кукурудза", answer: "царевица", hint: HINT_VEG },
];

// --- Meat & dairy ---
const HINT_MEAT: Localized<string> = { ru: "мясо / молочное", uk: "м'ясо / молочне" };
export const DATA_L8_MEAT_DAIRY: DataItem[] = [
  { q: "молоко / молоко", answer: "мляко", hint: HINT_MEAT, decoys: ["масло", "сирене", "кашкавал"] },
  { q: "сливочное масло / вершкове масло", answer: "масло", hint: HINT_MEAT, decoys: ["мляко", "олио", "сирене"] },
  { q: "брынза / бринза", answer: "сирене", hint: HINT_MEAT, decoys: ["кашкавал", "мляко", "масло"] },
  { q: "жёлтый сыр / жовтий сир", answer: "кашкавал", hint: HINT_MEAT, decoys: ["сирене", "масло", "мляко"] },
  { q: "мясо / м'ясо", answer: "месо", hint: HINT_MEAT, decoys: ["пиле", "риба", "салам"] },
  { q: "колбаса / ковбаса", answer: "салам", hint: HINT_MEAT, decoys: ["шунка", "месо", "луканка"] },
  { q: "ветчина / шинка", answer: "шунка", hint: HINT_MEAT, decoys: ["салам", "луканка", "месо"] },
  { q: "курица / курка", answer: "пиле", hint: HINT_MEAT, decoys: ["риба", "месо", "шунка"] },
  { q: "куриное (мясо) / куряче (м'ясо)", answer: "пилешко", hint: HINT_MEAT, decoys: ["свинско", "телешко", "агнешко"] },
  { q: "свинина / свинина", answer: "свинско", hint: HINT_MEAT, decoys: ["телешко", "агнешко", "пилешко"] },
  { q: "говядина / яловичина", answer: "телешко", hint: HINT_MEAT, decoys: ["свинско", "агнешко", "пилешко"] },
  { q: "баранина / баранина", answer: "агнешко", hint: HINT_MEAT, decoys: ["телешко", "свинско", "пилешко"] },
  { q: "рыба / риба", answer: "риба", hint: HINT_MEAT, decoys: ["пиле", "месо", "шунка"] },
  { q: "сухая колбаса / суха ковбаса", answer: "луканка", hint: HINT_MEAT, decoys: ["салам", "шунка", "суджук"] },
  { q: "суджук / суджук", answer: "суджук", hint: HINT_MEAT, decoys: ["луканка", "салам", "шунка"] },
];

// --- Spices ---
const HINT_SPICE: Localized<string> = { ru: "приправа", uk: "приправа" };
export const DATA_L8_SPICES: DataItem[] = [
  { q: "соль / сіль", answer: "сол", hint: HINT_SPICE, decoys: ["захар", "оцет", "олио"] },
  { q: "сахар / цукор", answer: "захар", hint: HINT_SPICE, decoys: ["сол", "мед", "олио"] },
  { q: "масло (раст.) / олія", answer: "олио", hint: HINT_SPICE, decoys: ["оцет", "масло", "сол"] },
  { q: "уксус / оцет", answer: "оцет", hint: HINT_SPICE, decoys: ["олио", "сол", "лют сос"] },
  { q: "чёрный перец / чорний перець", answer: "черен пипер", hint: HINT_SPICE, decoys: ["червен пипер", "сол", "лют пипер"] },
  { q: "красный перец / червоний перець", answer: "червен пипер", hint: HINT_SPICE, decoys: ["черен пипер", "сол", "магданоз"] },
  { q: "петрушка / петрушка", answer: "магданоз", hint: HINT_SPICE, decoys: ["чубрица", "копър", "червен пипер"] },
  { q: "укроп / кріп", answer: "копър", hint: HINT_SPICE, decoys: ["магданоз", "чубрица", "сол"] },
  { q: "чабёр / чабер", answer: "чубрица", hint: HINT_SPICE, decoys: ["магданоз", "копър", "лют пипер"] },
  { q: "лютеница (соус) / лютениця (соус)", answer: "лютеница", hint: HINT_SPICE, decoys: ["оцет", "олио", "сос"] },
  { q: "острый перец (стручок) / гострий перець (стручок)", answer: "люта чушка", hint: HINT_SPICE, decoys: ["черен пипер", "червен пипер", "чушка"] },
];

// --- Drinks ---
const HINT_DRINK: Localized<string> = { ru: "напиток", uk: "напій" };
export const DATA_L8_DRINKS: DataItem[] = [
  { q: "вода / вода", answer: "вода", hint: HINT_DRINK, decoys: ["сок", "чай", "вино"] },
  { q: "чай / чай", answer: "чай", hint: HINT_DRINK, decoys: ["кафе", "сок", "вода"] },
  { q: "кофе / кава", answer: "кафе", hint: HINT_DRINK, decoys: ["чай", "сок", "вино"] },
  { q: "сок / сік", answer: "сок", hint: HINT_DRINK, decoys: ["вода", "вино", "чай"] },
  { q: "вино / вино", answer: "вино", hint: HINT_DRINK, decoys: ["бира", "ракия", "сок"] },
  { q: "пиво / пиво", answer: "бира", hint: HINT_DRINK, decoys: ["вино", "ракия", "водка"] },
  { q: "ракия / ракія", answer: "ракия", hint: HINT_DRINK, decoys: ["водка", "вино", "уиски"] },
  { q: "водка / горілка", answer: "водка", hint: HINT_DRINK, decoys: ["ракия", "уиски", "коняк"] },
  { q: "виски / віскі", answer: "уиски", hint: HINT_DRINK, decoys: ["коняк", "водка", "ракия"] },
  { q: "коньяк / коньяк", answer: "коняк", hint: HINT_DRINK, decoys: ["уиски", "водка", "ракия"] },
  { q: "минеральная вода / мінеральна вода", answer: "минерална вода", hint: HINT_DRINK, decoys: ["газирана вода", "натурален сок", "кола"] },
  { q: "газированная вода / газована вода", answer: "газирана вода", hint: HINT_DRINK, decoys: ["минерална вода", "натурален сок", "сок"] },
  { q: "натуральный сок / натуральний сік", answer: "натурален сок", hint: HINT_DRINK, decoys: ["минерална вода", "сок", "кола"] },
  { q: "белое вино / біле вино", answer: "бяло вино", hint: HINT_DRINK, decoys: ["червено вино", "вино", "ракия"] },
  { q: "красное вино / червоне вино", answer: "червено вино", hint: HINT_DRINK, decoys: ["бяло вино", "вино", "коняк"] },
];

// --- Tableware ---
const HINT_TABLE: Localized<string> = { ru: "посуда / приборы", uk: "посуд / прибори" };
export const DATA_L8_TABLEWARE: DataItem[] = [
  { q: "тарелка / тарілка", answer: "чиния", hint: HINT_TABLE, decoys: ["чаша", "купа", "поднос"] },
  { q: "стакан (чашка) / склянка (чашка)", answer: "чаша", hint: HINT_TABLE, decoys: ["чиния", "купа", "бутилка"] },
  { q: "приборы (общ.) / прибори (заг.)", answer: "прибори", hint: HINT_TABLE, decoys: ["вилици", "лъжици", "ножове"] },
  { q: "вилка / виделка", answer: "вилица", hint: HINT_TABLE, decoys: ["лъжица", "нож", "лъжичка"] },
  { q: "ложка / ложка", answer: "лъжица", hint: HINT_TABLE, decoys: ["вилица", "нож", "лъжичка"] },
  { q: "нож / ніж", answer: "нож", hint: HINT_TABLE, decoys: ["вилица", "лъжица", "ножица"] },
  { q: "салфетка / серветка", answer: "салфетка", hint: HINT_TABLE, decoys: ["покривка", "кърпа", "плат"] },
  { q: "скатерть / скатертина", answer: "покривка", hint: HINT_TABLE, decoys: ["салфетка", "плат", "одеяло"] },
  { q: "бутылка / пляшка", answer: "бутилка", hint: HINT_TABLE, decoys: ["чаша", "буркан", "канче"] },
  { q: "столовая ложка / столова ложка", answer: "супена лъжица", hint: HINT_TABLE, decoys: ["лъжица", "лъжичка", "вилица"] },
  { q: "чайная ложечка / чайна ложечка", answer: "лъжичка", hint: HINT_TABLE, decoys: ["лъжица", "вилица", "супена лъжица"] },
];

// --- Bulgarian dishes ---
const HINT_DISH: Localized<string> = { ru: "болгарское блюдо", uk: "болгарська страва" };
export const DATA_L8_DISHES: DataItem[] = [
  { q: "холодный суп из йогурта и огурцов / холодний суп з йогурту й огірків", answer: "таратор", hint: HINT_DISH, decoys: ["шкембе чорба", "пилешка супа", "гъбена супа"] },
  { q: "болгарский салат с брынзой / болгарський салат з бринзою", answer: "шопска салата", hint: HINT_DISH, decoys: ["мешана салата", "руска салата", "Снежанка"] },
  { q: "слоёное тесто с брынзой / шарувате тісто з бринзою", answer: "баница", hint: HINT_DISH, decoys: ["палачинки", "баклава", "торта"] },
  { q: "запеканка с фаршем и баклажанами / запіканка з фаршем і баклажанами", answer: "мусака", hint: HINT_DISH, decoys: ["сарми", "гювеч", "кебапчета"] },
  { q: "голубцы (виноградные) / голубці (виноградні)", answer: "лозови сарми", hint: HINT_DISH, decoys: ["мусака", "пълнени чушки", "кебапчета"] },
  { q: "котлеты на гриле / котлети на грилі", answer: "кебапчета", hint: HINT_DISH, decoys: ["кюфтета", "шишчета", "пържола"] },
  { q: "круглые котлеты / круглі котлети", answer: "кюфтета", hint: HINT_DISH, decoys: ["кебапчета", "шишчета", "сарми"] },
  { q: "шашлычки / шашлички", answer: "шишчета", hint: HINT_DISH, decoys: ["кебапчета", "кюфтета", "мусака"] },
  { q: "горшочек / горщик (страва)", answer: "гювеч", hint: HINT_DISH, decoys: ["мусака", "сарми", "пържола"] },
  { q: "пахлава / пахлава", answer: "баклава", hint: HINT_DISH, decoys: ["торта", "палачинка", "сладолед"] },
  { q: "блинчики / млинці", answer: "палачинки", hint: HINT_DISH, decoys: ["баклава", "баница", "торта"] },
  { q: "русский салат (оливье) / олів'є", answer: "руска салата", hint: HINT_DISH, decoys: ["шопска салата", "Снежанка", "мешана салата"] },
  { q: "салат «Снежанка» (огур+йогурт) / салат «Сніжанка»", answer: "салата Снежанка", hint: HINT_DISH, decoys: ["шопска салата", "руска салата", "таратор"] },
  { q: "стейк (свин/тел) / стейк (свин/тел)", answer: "пържола", hint: HINT_DISH, decoys: ["мусака", "кебапчета", "гювеч"] },
];

// --- Restaurant vocabulary ---
const HINT_REST: Localized<string> = { ru: "ресторан / обслуживание", uk: "ресторан / обслуговування" };
export const DATA_L8_RESTAURANT: DataItem[] = [
  { q: "ресторан / ресторан", answer: "ресторант", hint: HINT_REST, decoys: ["бар", "механа", "пицария"] },
  { q: "корчма / корчма", answer: "механа", hint: HINT_REST, decoys: ["ресторант", "бар", "пицария"] },
  { q: "пиццерия / піцерія", answer: "пицария", hint: HINT_REST, decoys: ["ресторант", "механа", "бар"] },
  { q: "бар / бар", answer: "бар", hint: HINT_REST, decoys: ["механа", "ресторант", "пицария"] },
  { q: "официант / офіціант", answer: "сервитьор", hint: HINT_REST, decoys: ["барман", "готвач", "клиент"] },
  { q: "официантка / офіціантка", answer: "сервитьорка", hint: HINT_REST, decoys: ["барманка", "готвачка", "клиентка"] },
  { q: "бармен / бармен", answer: "барман", hint: HINT_REST, decoys: ["сервитьор", "готвач", "клиент"] },
  { q: "повар / кухар", answer: "готвач", hint: HINT_REST, decoys: ["сервитьор", "барман", "клиент"] },
  { q: "заказывать / замовляти", answer: "поръчвам", hint: HINT_REST, decoys: ["препоръчвам", "опитвам", "черпя"] },
  { q: "рекомендовать / рекомендувати", answer: "препоръчвам", hint: HINT_REST, decoys: ["поръчвам", "опитвам", "черпя"] },
  { q: "пробовать / куштувати", answer: "опитвам", hint: HINT_REST, decoys: ["поръчвам", "препоръчвам", "ям"] },
  { q: "угощать / частувати", answer: "черпя", hint: HINT_REST, decoys: ["опитвам", "поръчвам", "сервирам"] },
  { q: "счёт / рахунок", answer: "сметка", hint: HINT_REST, decoys: ["бакшиш", "ресто", "цена"] },
  { q: "сдача / решта", answer: "ресто", hint: HINT_REST, decoys: ["сметка", "бакшиш", "цена"] },
  { q: "чаевые / чайові", answer: "бакшиш", hint: HINT_REST, decoys: ["сметка", "ресто", "цена"] },
  { q: "аперитив / аперитив", answer: "аперитив", hint: HINT_REST, decoys: ["предястие", "основно ястие", "десерт"] },
  { q: "закуска (предястие) / закуска (предястіє)", answer: "предястие", hint: HINT_REST, decoys: ["аперитив", "основно ястие", "десерт"] },
  { q: "основное блюдо / основна страва", answer: "основно ястие", hint: HINT_REST, decoys: ["предястие", "аперитив", "десерт"] },
  { q: "десерт / десерт", answer: "десерт", hint: HINT_REST, decoys: ["аперитив", "предястие", "мезе"] },
  { q: "порция / порція", answer: "порция", hint: HINT_REST, decoys: ["сметка", "меню", "ястие"] },
  { q: "закуска к выпивке / закуска до випивки", answer: "мезе", hint: HINT_REST, decoys: ["десерт", "аперитив", "предястие"] },
];

// --- Tastes ---
const TASTE_RULE: Localized<string> = {
  ru: "Пять основных вкусов: сладък (сладкий), солен (солёный), лют (острый), горчив (горький), кисел (кислый).",
  uk: "П'ять основних смаків: сладък (солодкий), солен (солоний), лют (гострий), горчив (гіркий), кисел (кислий).",
};
const HINT_TASTE: Localized<string> = { ru: "вкус продукта", uk: "смак продукту" };
export const DATA_L8_TASTE: DataItem[] = [
  { q: "торта", answer: "сладък", hint: HINT_TASTE, rule: TASTE_RULE },
  { q: "захар", answer: "сладък", hint: HINT_TASTE, rule: TASTE_RULE },
  { q: "грозде", answer: "сладък", hint: HINT_TASTE, rule: TASTE_RULE },
  { q: "ягоди", answer: "сладък", hint: HINT_TASTE, rule: TASTE_RULE },
  { q: "сирене", answer: "солен", hint: HINT_TASTE, rule: TASTE_RULE },
  { q: "кашкавал", answer: "солен", hint: HINT_TASTE, rule: TASTE_RULE },
  { q: "салам", answer: "солен", hint: HINT_TASTE, rule: TASTE_RULE },
  { q: "сол", answer: "солен", hint: HINT_TASTE, rule: TASTE_RULE },
  { q: "люта чушка", answer: "лют", hint: HINT_TASTE, rule: TASTE_RULE },
  { q: "червен пипер", answer: "лют", hint: HINT_TASTE, rule: TASTE_RULE },
  { q: "чесън", answer: "лют", hint: HINT_TASTE, rule: TASTE_RULE },
  { q: "лук", answer: "лют", hint: HINT_TASTE, rule: TASTE_RULE },
  { q: "кафе", answer: "горчив", hint: HINT_TASTE, rule: TASTE_RULE },
  { q: "черен пипер", answer: "горчив", hint: HINT_TASTE, rule: TASTE_RULE },
  { q: "лимон", answer: "кисел", hint: HINT_TASTE, rule: TASTE_RULE },
  { q: "оцет", answer: "кисел", hint: HINT_TASTE, rule: TASTE_RULE },
];
export const L8_TASTE_OPTIONS = ["сладък", "солен", "лют", "горчив", "кисел"];

// --- Cooking verbs ---
const HINT_COOK: Localized<string> = { ru: "глагол готовки", uk: "дієслово готування" };
export const DATA_L8_COOKING: DataItem[] = [
  { q: "готовить / готувати", answer: "готвя", hint: HINT_COOK, decoys: ["варя", "пека", "пържа"] },
  { q: "питаться / харчуватися", answer: "храня се", hint: HINT_COOK, decoys: ["ям", "готвя", "пия"] },
  { q: "варить / варити", answer: "варя", hint: HINT_COOK, decoys: ["пържа", "пека", "задушавам"] },
  { q: "сварить / зварити (сов.)", answer: "сваря", hint: HINT_COOK, decoys: ["варя", "опека", "опържа"] },
  { q: "печь / пекти", answer: "пека", hint: HINT_COOK, decoys: ["варя", "пържа", "задушавам"] },
  { q: "испечь / спекти (сов.)", answer: "опека", hint: HINT_COOK, decoys: ["пека", "сваря", "опържа"] },
  { q: "жарить / смажити", answer: "пържа", hint: HINT_COOK, decoys: ["варя", "пека", "задушавам"] },
  { q: "пожарить / посмажити (сов.)", answer: "опържа", hint: HINT_COOK, decoys: ["пържа", "сваря", "опека"] },
  { q: "тушить / тушкувати", answer: "задушавам", hint: HINT_COOK, decoys: ["варя", "пържа", "пека"] },
  { q: "потушить / потушкувати (сов.)", answer: "задуша", hint: HINT_COOK, decoys: ["задушавам", "сваря", "опека"] },
  { q: "резать / різати", answer: "режа", hint: HINT_COOK, decoys: ["нарязвам", "добавям", "разбърквам"] },
  { q: "нарезать / нарізати (сов.)", answer: "нарежа", hint: HINT_COOK, decoys: ["режа", "нарязвам", "добавя"] },
  { q: "нарезать (несов.) / нарізати (несов.)", answer: "нарязвам", hint: HINT_COOK, decoys: ["режа", "нарежа", "разбърквам"] },
  { q: "добавлять / додавати", answer: "добавям", hint: HINT_COOK, decoys: ["разбърквам", "сервирам", "режа"] },
  { q: "добавить / додати (сов.)", answer: "добавя", hint: HINT_COOK, decoys: ["добавям", "разбъркам", "сервирам"] },
  { q: "перемешивать / перемішувати", answer: "разбърквам", hint: HINT_COOK, decoys: ["добавям", "сервирам", "режа"] },
  { q: "сервировать / сервувати", answer: "сервирам", hint: HINT_COOK, decoys: ["разбърквам", "добавям", "режа"] },
  { q: "мыть / мити", answer: "мия", hint: HINT_COOK, decoys: ["сервирам", "режа", "пия"] },
];

// --- Cooking method ---
const METHOD_RULE: Localized<string> = {
  ru: "Способы готовки: варя (варить — в воде), пека (печь — в духовке), пържа (жарить — на масле), задушавам (тушить — медленно с малым количеством жидкости), ям сурово (есть сырым).",
  uk: "Способи готування: варя (варити — у воді), пека (пекти — в духовці), пържа (смажити — на олії), задушавам (тушкувати — повільно), ям сурово (їсти сирим).",
};
const HINT_METHOD: Localized<string> = { ru: "способ приготовления", uk: "спосіб приготування" };
export const DATA_L8_METHOD: DataItem[] = [
  { q: "хляб (в фурна) / хліб (у духовці)", answer: "пека", hint: HINT_METHOD, rule: METHOD_RULE },
  { q: "торта (в фурна) / торт (у духовці)", answer: "пека", hint: HINT_METHOD, rule: METHOD_RULE },
  { q: "пилешко (в фурна)", answer: "пека", hint: HINT_METHOD, rule: METHOD_RULE },
  { q: "яйца (във вода) / яйця (у воді)", answer: "варя", hint: HINT_METHOD, rule: METHOD_RULE },
  { q: "картофи (за супа)", answer: "варя", hint: HINT_METHOD, rule: METHOD_RULE },
  { q: "ориз / рис", answer: "варя", hint: HINT_METHOD, rule: METHOD_RULE },
  { q: "мляко (за кафе)", answer: "варя", hint: HINT_METHOD, rule: METHOD_RULE },
  { q: "картофи (на олио) / картопля (на олії)", answer: "пържа", hint: HINT_METHOD, rule: METHOD_RULE },
  { q: "яйца (на тиган) / яйця (на сковороді)", answer: "пържа", hint: HINT_METHOD, rule: METHOD_RULE },
  { q: "риба (на тиган)", answer: "пържа", hint: HINT_METHOD, rule: METHOD_RULE },
  { q: "зеленчуци (бавно с малко вода)", answer: "задушавам", hint: HINT_METHOD, rule: METHOD_RULE },
  { q: "месо (бавно)", answer: "задушавам", hint: HINT_METHOD, rule: METHOD_RULE },
  { q: "тиквички (бавно)", answer: "задушавам", hint: HINT_METHOD, rule: METHOD_RULE },
  { q: "ябълка (без обработка) / яблуко (без обробки)", answer: "ям сурово", hint: HINT_METHOD, rule: METHOD_RULE },
  { q: "краставица (за салата)", answer: "ям сурово", hint: HINT_METHOD, rule: METHOD_RULE },
  { q: "домат (за салата)", answer: "ям сурово", hint: HINT_METHOD, rule: METHOD_RULE },
];
export const L8_METHOD_OPTIONS = ["пека", "варя", "пържа", "задушавам", "ям сурово"];

// --- Гладен / жаден agreement ---
const GLAD_RULE: Localized<string> = {
  ru: "«гладен/жаден» — прилагательные, согласуются с подлежащим: гладен (м.р.), гладна (ж.р.), гладно (ср.р.), гладни (мн.). То же для «жаден» (хочу пить).",
  uk: "«гладен/жаден» — прикметники, узгоджуються з підметом: гладен (ч.р.), гладна (ж.р.), гладно (с.р.), гладни (мн.). Так само для «жаден» (хочу пити).",
};
const HINT_GLAD: Localized<string> = { ru: "согласуй прилагательное по роду/числу", uk: "узгодь прикметник за родом/числом" };
const LABEL_M: Localized<string> = { ru: "м.р.", uk: "ч.р." };
const LABEL_F: Localized<string> = { ru: "ж.р.", uk: "ж.р." };
const LABEL_N: Localized<string> = { ru: "ср.р.", uk: "с.р." };
const LABEL_PL: Localized<string> = { ru: "мн.", uk: "мн." };
export const DATA_L8_GLAD_ZHAD: DataItem[] = [
  { q: "Аз съм ___.", label: { ru: "м., голоден", uk: "ч., голодний" }, answer: "гладен", hint: HINT_GLAD, rule: GLAD_RULE },
  { q: "Аз съм ___.", label: { ru: "ж., голодна", uk: "ж., голодна" }, answer: "гладна", hint: HINT_GLAD, rule: GLAD_RULE },
  { q: "Той е ___.", label: { ru: "голоден (м.)", uk: "голодний (ч.)" }, answer: "гладен", hint: HINT_GLAD, rule: GLAD_RULE },
  { q: "Тя е ___.", label: { ru: "голодна (ж.)", uk: "голодна (ж.)" }, answer: "гладна", hint: HINT_GLAD, rule: GLAD_RULE },
  { q: "Детето е ___.", label: { ru: "голодное (ср.)", uk: "голодне (с.)" }, answer: "гладно", hint: HINT_GLAD, rule: GLAD_RULE },
  { q: "Ние сме ___.", label: LABEL_PL, answer: "гладни", hint: HINT_GLAD, rule: GLAD_RULE },
  { q: "Те са ___.", label: LABEL_PL, answer: "гладни", hint: HINT_GLAD, rule: GLAD_RULE },
  { q: "Аз съм ___.", label: { ru: "м., хочу пить", uk: "ч., хочу пити" }, answer: "жаден", hint: HINT_GLAD, rule: GLAD_RULE },
  { q: "Аз съм ___.", label: { ru: "ж., хочу пить", uk: "ж., хочу пити" }, answer: "жадна", hint: HINT_GLAD, rule: GLAD_RULE },
  { q: "Той е ___.", label: { ru: "хочет пить (м.)", uk: "хоче пити (ч.)" }, answer: "жаден", hint: HINT_GLAD, rule: GLAD_RULE },
  { q: "Тя е ___.", label: { ru: "хочет пить (ж.)", uk: "хоче пити (ж.)" }, answer: "жадна", hint: HINT_GLAD, rule: GLAD_RULE },
  { q: "Ние сме ___.", label: { ru: "мн., хотим пить", uk: "мн., хочемо пити" }, answer: "жадни", hint: HINT_GLAD, rule: GLAD_RULE },
  { q: "Децата са ___.", label: { ru: "мн., голодны", uk: "мн., голодні" }, answer: "гладни", hint: HINT_GLAD, rule: GLAD_RULE },
  { q: "Кучето е ___.", label: { ru: "ср., голодно", uk: "с., голодне" }, answer: "гладно", hint: HINT_GLAD, rule: GLAD_RULE },
  { q: "Те са ___.", label: { ru: "мн., хотят пить", uk: "мн., хочуть пити" }, answer: "жадни", hint: HINT_GLAD, rule: GLAD_RULE },
];
export const L8_GLAD_ZHAD_OPTIONS = ["гладен", "гладна", "гладно", "гладни", "жаден", "жадна", "жадни"];

// --- «Яде ми се» — number agreement (sg vs pl subject) ---
const YADE_MI_SE_RULE: Localized<string> = {
  ru: "Безличная конструкция «(не) ми се яде/ядат + N» = «мне (не) хочется есть N». Глагол согласуется с предметом по числу: ед. → яде, мн. → ядат. Дативная клитика (ми/ти/му/й/ни/ви/им) указывает, кому хочется.",
  uk: "Безособова конструкція «(не) ми се яде/ядат + N» = «мені (не) хочеться їсти N». Дієслово узгоджується з предметом за числом: одн. → яде, мн. → ядат. Давальна клітика (ми/ти/му/й/ни/ви/им) — кому хочеться.",
};
const HINT_YADE_MI_SE: Localized<string> = { ru: "ед. → «яде ми се», мн. → «ядат ми се»", uk: "одн. → «яде ми се», мн. → «ядат ми се»" };
export const DATA_L8_YADE_MI_SE: DataItem[] = [
  { q: "___ торта.", label: { ru: "хочу торт", uk: "хочу торт" }, answer: "яде ми се", hint: HINT_YADE_MI_SE, rule: YADE_MI_SE_RULE },
  { q: "___ круша.", label: { ru: "хочу грушу", uk: "хочу грушу" }, answer: "яде ми се", hint: HINT_YADE_MI_SE, rule: YADE_MI_SE_RULE },
  { q: "___ нещо сладко.", label: { ru: "хочу сладкого", uk: "хочу солодкого" }, answer: "яде ми се", hint: HINT_YADE_MI_SE, rule: YADE_MI_SE_RULE },
  { q: "___ супа.", label: { ru: "хочу суп", uk: "хочу суп" }, answer: "яде ми се", hint: HINT_YADE_MI_SE, rule: YADE_MI_SE_RULE },
  { q: "___ салата.", label: { ru: "хочу салат", uk: "хочу салат" }, answer: "яде ми се", hint: HINT_YADE_MI_SE, rule: YADE_MI_SE_RULE },
  { q: "___ сандвичи.", label: { ru: "хочу сэндвичи", uk: "хочу сендвічі" }, answer: "ядат ми се", hint: HINT_YADE_MI_SE, rule: YADE_MI_SE_RULE },
  { q: "___ банани.", label: { ru: "хочу бананы", uk: "хочу банани" }, answer: "ядат ми се", hint: HINT_YADE_MI_SE, rule: YADE_MI_SE_RULE },
  { q: "___ праскови.", label: { ru: "хочу персики", uk: "хочу персики" }, answer: "ядат ми се", hint: HINT_YADE_MI_SE, rule: YADE_MI_SE_RULE },
  { q: "___ кебапчета.", label: { ru: "хочу кебапчета", uk: "хочу кебапчета" }, answer: "ядат ми се", hint: HINT_YADE_MI_SE, rule: YADE_MI_SE_RULE },
  { q: "___ ягоди.", label: { ru: "хочу клубнику", uk: "хочу полуницю" }, answer: "ядат ми се", hint: HINT_YADE_MI_SE, rule: YADE_MI_SE_RULE },
  { q: "___ хляб.", label: { ru: "хочу хлеб", uk: "хочу хліб" }, answer: "яде ми се", hint: HINT_YADE_MI_SE, rule: YADE_MI_SE_RULE },
  { q: "___ риба.", label: { ru: "хочу рыбу", uk: "хочу рибу" }, answer: "яде ми се", hint: HINT_YADE_MI_SE, rule: YADE_MI_SE_RULE },
  { q: "___ кюфтета.", label: { ru: "хочу котлеты", uk: "хочу котлети" }, answer: "ядат ми се", hint: HINT_YADE_MI_SE, rule: YADE_MI_SE_RULE },
  { q: "___ ябълки.", label: { ru: "хочу яблоки", uk: "хочу яблука" }, answer: "ядат ми се", hint: HINT_YADE_MI_SE, rule: YADE_MI_SE_RULE },
];
export const L8_YADE_MI_SE_OPTIONS = ["яде ми се", "ядат ми се"];

// --- «Пие ми се» — same with пия ---
const PIE_MI_SE_RULE: Localized<string> = {
  ru: "«(не) ми се пие/пият + N» = «мне (не) хочется пить N». Согласование по числу: ед. → пие, мн. → пият.",
  uk: "«(не) ми се пие/пият + N» = «мені (не) хочеться пити N». Узгодження за числом: одн. → пие, мн. → пият.",
};
const HINT_PIE_MI_SE: Localized<string> = { ru: "ед. → «пие ми се», мн. → «пият ми се»", uk: "одн. → «пие ми се», мн. → «пият ми се»" };
export const DATA_L8_PIE_MI_SE: DataItem[] = [
  { q: "___ кафе.", label: { ru: "хочу кофе", uk: "хочу кави" }, answer: "пие ми се", hint: HINT_PIE_MI_SE, rule: PIE_MI_SE_RULE },
  { q: "___ чай.", label: { ru: "хочу чай", uk: "хочу чай" }, answer: "пие ми се", hint: HINT_PIE_MI_SE, rule: PIE_MI_SE_RULE },
  { q: "___ вода.", label: { ru: "хочу воду", uk: "хочу воду" }, answer: "пие ми се", hint: HINT_PIE_MI_SE, rule: PIE_MI_SE_RULE },
  { q: "___ вино.", label: { ru: "хочу вино", uk: "хочу вино" }, answer: "пие ми се", hint: HINT_PIE_MI_SE, rule: PIE_MI_SE_RULE },
  { q: "___ бира.", label: { ru: "хочу пиво", uk: "хочу пиво" }, answer: "пие ми се", hint: HINT_PIE_MI_SE, rule: PIE_MI_SE_RULE },
  { q: "___ сок.", label: { ru: "хочу сок", uk: "хочу сік" }, answer: "пие ми се", hint: HINT_PIE_MI_SE, rule: PIE_MI_SE_RULE },
  { q: "___ две бири.", label: { ru: "хочу два пива", uk: "хочу два пива" }, answer: "пият ми се", hint: HINT_PIE_MI_SE, rule: PIE_MI_SE_RULE },
  { q: "___ коктейли.", label: { ru: "хочу коктейли", uk: "хочу коктейлі" }, answer: "пият ми се", hint: HINT_PIE_MI_SE, rule: PIE_MI_SE_RULE },
  { q: "___ две чаши вино.", label: { ru: "хочу два бокала вина", uk: "хочу два келихи вина" }, answer: "пият ми се", hint: HINT_PIE_MI_SE, rule: PIE_MI_SE_RULE },
  { q: "___ ракия.", label: { ru: "хочу ракию", uk: "хочу ракію" }, answer: "пие ми се", hint: HINT_PIE_MI_SE, rule: PIE_MI_SE_RULE },
  { q: "___ мляко.", label: { ru: "хочу молоко", uk: "хочу молоко" }, answer: "пие ми се", hint: HINT_PIE_MI_SE, rule: PIE_MI_SE_RULE },
  { q: "___ сокове.", label: { ru: "хочу соки", uk: "хочу соки" }, answer: "пият ми се", hint: HINT_PIE_MI_SE, rule: PIE_MI_SE_RULE },
];
export const L8_PIE_MI_SE_OPTIONS = ["пие ми се", "пият ми се"];

// --- Past participles (active past participle) ---
const PART_RULE: Localized<string> = {
  ru: "Минало деятельное причастие: глагол + л + окончание по роду/числу. М. -л, ж. -ла, ср. -ло, мн. -ли. Примеры: ям→ял/яла/яло/яли, пия→пил/пила/пило/пили, ходя→ходил/…, съм→бил/била/било/били.",
  uk: "Минулий діє́прикметник: дієслово + л + закінчення за родом/числом. Ч. -л, ж. -ла, с. -ло, мн. -ли. Приклади: ям→ял/яла/яло/яли, пия→пил/пила/пило/пили, ходя→ходил/…, съм→бил/била/било/били.",
};
const HINT_PART: Localized<string> = { ru: "форма причастия по роду/числу", uk: "форма дієприкметника за родом/числом" };
export const DATA_L8_PART: DataItem[] = [
  { q: "ям → (м.р., ед.)", answer: "ял", hint: HINT_PART, rule: PART_RULE, decoys: ["яла", "яло", "яли"] },
  { q: "ям → (ж.р., ед.)", answer: "яла", hint: HINT_PART, rule: PART_RULE, decoys: ["ял", "яло", "яли"] },
  { q: "ям → (ср.р., ед.)", answer: "яло", hint: HINT_PART, rule: PART_RULE, decoys: ["ял", "яла", "яли"] },
  { q: "ям → (мн.)", answer: "яли", hint: HINT_PART, rule: PART_RULE, decoys: ["ял", "яла", "яло"] },
  { q: "пия → (м.р., ед.)", answer: "пил", hint: HINT_PART, rule: PART_RULE, decoys: ["пила", "пило", "пили"] },
  { q: "пия → (ж.р., ед.)", answer: "пила", hint: HINT_PART, rule: PART_RULE, decoys: ["пил", "пило", "пили"] },
  { q: "пия → (мн.)", answer: "пили", hint: HINT_PART, rule: PART_RULE, decoys: ["пил", "пила", "пило"] },
  { q: "ходя → (м.р., ед.)", answer: "ходил", hint: HINT_PART, rule: PART_RULE, decoys: ["ходила", "ходило", "ходили"] },
  { q: "ходя → (ж.р., ед.)", answer: "ходила", hint: HINT_PART, rule: PART_RULE, decoys: ["ходил", "ходило", "ходили"] },
  { q: "ходя → (мн.)", answer: "ходили", hint: HINT_PART, rule: PART_RULE, decoys: ["ходил", "ходила", "ходило"] },
  { q: "съм → (м.р., ед.)", answer: "бил", hint: HINT_PART, rule: PART_RULE, decoys: ["била", "било", "били"] },
  { q: "съм → (ж.р., ед.)", answer: "била", hint: HINT_PART, rule: PART_RULE, decoys: ["бил", "било", "били"] },
  { q: "съм → (мн.)", answer: "били", hint: HINT_PART, rule: PART_RULE, decoys: ["бил", "била", "било"] },
  { q: "чета → (м.р., ед.)", answer: "чел", hint: HINT_PART, rule: PART_RULE, decoys: ["чела", "чело", "чели"] },
  { q: "чета → (мн.)", answer: "чели", hint: HINT_PART, rule: PART_RULE, decoys: ["чел", "чела", "чело"] },
  { q: "гледам → (ж.р., ед.)", answer: "гледала", hint: HINT_PART, rule: PART_RULE, decoys: ["гледал", "гледало", "гледали"] },
  { q: "слушам → (мн.)", answer: "слушали", hint: HINT_PART, rule: PART_RULE, decoys: ["слушал", "слушала", "слушало"] },
  { q: "опитвам → (м.р., ед.)", answer: "опитвал", hint: HINT_PART, rule: PART_RULE, decoys: ["опитвала", "опитвало", "опитвали"] },
];

export const DATA_L8_PART_TYPE: DataItem[] = [
  { q: "ям → м.р., ед.", answer: "ял", hint: HINT_PART, rule: PART_RULE },
  { q: "ям → ж.р., ед.", answer: "яла", hint: HINT_PART, rule: PART_RULE },
  { q: "ям → мн.", answer: "яли", hint: HINT_PART, rule: PART_RULE },
  { q: "пия → м.р., ед.", answer: "пил", hint: HINT_PART, rule: PART_RULE },
  { q: "пия → ж.р., ед.", answer: "пила", hint: HINT_PART, rule: PART_RULE },
  { q: "пия → мн.", answer: "пили", hint: HINT_PART, rule: PART_RULE },
  { q: "ходя → м.р., ед.", answer: "ходил", hint: HINT_PART, rule: PART_RULE },
  { q: "ходя → ж.р., ед.", answer: "ходила", hint: HINT_PART, rule: PART_RULE },
  { q: "ходя → мн.", answer: "ходили", hint: HINT_PART, rule: PART_RULE },
  { q: "съм → м.р., ед.", answer: "бил", hint: HINT_PART, rule: PART_RULE },
  { q: "съм → ж.р., ед.", answer: "била", hint: HINT_PART, rule: PART_RULE },
  { q: "съм → мн.", answer: "били", hint: HINT_PART, rule: PART_RULE },
];

// --- Auxiliary «съм» in present perfect ---
const PERF_AUX_RULE: Localized<string> = {
  ru: "Минало неопределено = вспомогательный «съм» (по лицу/числу подлежащего) + причастие (по роду/числу). Аз съм ял/яла, ти си ял/яла, той е ял, тя е яла, ние сме яли, вие сте яли, те са яли.",
  uk: "Минуле неозначене = допоміжний «съм» (за особою/числом підмета) + дієприкметник (за родом/числом). Аз съм ял/яла, ти си ял/яла, той е ял, тя е яла, ние сме яли, вие сте яли, те са яли.",
};
const HINT_PERF_AUX: Localized<string> = { ru: "форма «съм» по подлежащему", uk: "форма «съм» за підметом" };
export const DATA_L8_PERF_AUX: DataItem[] = [
  { q: "Аз ___ ял.", answer: "съм", hint: HINT_PERF_AUX, rule: PERF_AUX_RULE },
  { q: "Ти ___ ял.", answer: "си", hint: HINT_PERF_AUX, rule: PERF_AUX_RULE },
  { q: "Той ___ ял.", answer: "е", hint: HINT_PERF_AUX, rule: PERF_AUX_RULE },
  { q: "Тя ___ яла.", answer: "е", hint: HINT_PERF_AUX, rule: PERF_AUX_RULE },
  { q: "Ние ___ яли.", answer: "сме", hint: HINT_PERF_AUX, rule: PERF_AUX_RULE },
  { q: "Вие ___ яли.", answer: "сте", hint: HINT_PERF_AUX, rule: PERF_AUX_RULE },
  { q: "Те ___ яли.", answer: "са", hint: HINT_PERF_AUX, rule: PERF_AUX_RULE },
  { q: "Аз ___ пила вино.", answer: "съм", hint: HINT_PERF_AUX, rule: PERF_AUX_RULE },
  { q: "Тя ___ пила вино.", answer: "е", hint: HINT_PERF_AUX, rule: PERF_AUX_RULE },
  { q: "Момчета, вие ___ ходили в Габрово?", answer: "сте", hint: HINT_PERF_AUX, rule: PERF_AUX_RULE },
  { q: "Те ___ ходили в София.", answer: "са", hint: HINT_PERF_AUX, rule: PERF_AUX_RULE },
  { q: "Ние ___ били в Несебър.", answer: "сме", hint: HINT_PERF_AUX, rule: PERF_AUX_RULE },
  { q: "Той ___ опитвал таратор.", answer: "е", hint: HINT_PERF_AUX, rule: PERF_AUX_RULE },
  { q: "Ти ___ чела книги от български автори?", answer: "си", hint: HINT_PERF_AUX, rule: PERF_AUX_RULE },
  { q: "Аз ___ гледал този филм.", answer: "съм", hint: HINT_PERF_AUX, rule: PERF_AUX_RULE },
];
export const L8_PERF_AUX_OPTIONS = ["съм", "си", "е", "сме", "сте", "са"];

// --- Word order in present perfect (with vs without subject) ---
const PERF_WO_RULE: Localized<string> = {
  ru: "Порядок слов: с подлежащим — «Аз съм ял»; без подлежащего — «съм» НЕ в начале → «Ял съм». Отрицание: «Не съм ял» (вспомогательный после «не»).",
  uk: "Порядок слів: з підметом — «Аз съм ял»; без підмета — «съм» НЕ на початку → «Ял съм». Заперечення: «Не съм ял» (допоміжний після «не»).",
};
const HINT_PERF_WO: Localized<string> = { ru: "правильный порядок слов", uk: "правильний порядок слів" };
const LABEL_WO_SUBJ: Localized<string> = { ru: "с подлежащим", uk: "з підметом" };
const LABEL_WO_NO_SUBJ: Localized<string> = { ru: "без подлежащего", uk: "без підмета" };
const LABEL_WO_NEG: Localized<string> = { ru: "отрицание", uk: "заперечення" };
export const DATA_L8_PERF_WO: DataItem[] = [
  { q: "(аз, ям, таратор)", label: LABEL_WO_SUBJ, answer: "Аз съм ял таратор.", hint: HINT_PERF_WO, rule: PERF_WO_RULE,
    decoys: ["Аз ял съм таратор.", "Ял аз съм таратор.", "Съм аз ял таратор."] },
  { q: "(ям, таратор)", label: LABEL_WO_NO_SUBJ, answer: "Ял съм таратор.", hint: HINT_PERF_WO, rule: PERF_WO_RULE,
    decoys: ["Съм ял таратор.", "Таратор ял съм.", "Ял таратор съм."] },
  { q: "(аз, ям, таратор, отриц.)", label: LABEL_WO_NEG, answer: "Не съм ял таратор.", hint: HINT_PERF_WO, rule: PERF_WO_RULE,
    decoys: ["Съм не ял таратор.", "Не ял съм таратор.", "Аз не ял съм таратор."] },
  { q: "(тя, пия, вино)", label: LABEL_WO_SUBJ, answer: "Тя е пила вино.", hint: HINT_PERF_WO, rule: PERF_WO_RULE,
    decoys: ["Тя пила е вино.", "Пила тя е вино.", "Е тя пила вино."] },
  { q: "(пия, вино)", label: LABEL_WO_NO_SUBJ, answer: "Пила съм вино.", hint: HINT_PERF_WO, rule: PERF_WO_RULE,
    decoys: ["Съм пила вино.", "Вино пила съм.", "Пила вино съм."] },
  { q: "(ние, ходя, в София)", label: LABEL_WO_SUBJ, answer: "Ние сме ходили в София.", hint: HINT_PERF_WO, rule: PERF_WO_RULE,
    decoys: ["Ние ходили сме в София.", "Сме ние ходили в София.", "Ходили ние сме в София."] },
  { q: "(ходя, в София)", label: LABEL_WO_NO_SUBJ, answer: "Ходили сме в София.", hint: HINT_PERF_WO, rule: PERF_WO_RULE,
    decoys: ["Сме ходили в София.", "В София ходили сме.", "Ходили в София сме."] },
  { q: "(те, ям, мусака, отриц.)", label: LABEL_WO_NEG, answer: "Те не са яли мусака.", hint: HINT_PERF_WO, rule: PERF_WO_RULE,
    decoys: ["Те са не яли мусака.", "Не те са яли мусака.", "Те не яли са мусака."] },
  { q: "(той, опитвам, таратор)", label: LABEL_WO_SUBJ, answer: "Той е опитвал таратор.", hint: HINT_PERF_WO, rule: PERF_WO_RULE,
    decoys: ["Той опитвал е таратор.", "Е той опитвал таратор.", "Опитвал той е таратор."] },
  { q: "(аз, чета, книгата, отриц.)", label: LABEL_WO_NEG, answer: "Аз не съм чел книгата.", hint: HINT_PERF_WO, rule: PERF_WO_RULE,
    decoys: ["Аз съм не чел книгата.", "Не аз съм чел книгата.", "Аз не чел съм книгата."] },
  { q: "(пия, ракия)", label: LABEL_WO_NO_SUBJ, answer: "Пил съм ракия.", hint: HINT_PERF_WO, rule: PERF_WO_RULE,
    decoys: ["Съм пил ракия.", "Ракия пил съм.", "Пил ракия съм."] },
  { q: "(той, бил, в България, отриц.)", label: LABEL_WO_NEG, answer: "Той не е бил в България.", hint: HINT_PERF_WO, rule: PERF_WO_RULE,
    decoys: ["Той е не бил в България.", "Не той е бил в България.", "Той не бил е в България."] },
];

// --- "ли" in present perfect questions ---
const PERF_LI_RULE: Localized<string> = {
  ru: "Вопрос в минало неопр.: причастие + ли + (съм/си/е…). Пример: «Ял ли си таратор?», «Той ял ли е мусака?». «ли» стоит сразу после причастия.",
  uk: "Питання в минулому неозначеному: дієприкметник + ли + (съм/си/е…). Приклад: «Ял ли си таратор?», «Той ял ли е мусака?». «ли» стоїть одразу після дієприкметника.",
};
export const DATA_L8_PERF_LI: LiItem[] = [
  { words: ["Ял", "си", "таратор"], liPosition: 1, result: "Ял ли си таратор?",
    translation: { ru: "*Ел* ли ты таратор?", uk: "*Їв* ти таратор?" } },
  { words: ["Пила", "си", "ракия"], liPosition: 1, result: "Пила ли си ракия?",
    translation: { ru: "*Пила* ли ты ракию?", uk: "*Пила* ти ракію?" } },
  { words: ["Ходили", "сте", "в", "Габрово"], liPosition: 1, result: "Ходили ли сте в Габрово?",
    translation: { ru: "*Ездили* ли вы в Габрово?", uk: "*Їздили* ви в Габрово?" } },
  { words: ["Ял", "е", "мусака"], liPosition: 1, result: "Ял ли е мусака?",
    translation: { ru: "*Ел* ли он мусаку?", uk: "*Їв* він мусаку?" } },
  { words: ["Гледал", "си", "български", "филм"], liPosition: 1, result: "Гледал ли си български филм?",
    translation: { ru: "*Смотрел* ли ты болгарский фильм?", uk: "*Дивився* ти болгарський фільм?" } },
  { words: ["Чели", "сте", "книги", "от", "Йовков"], liPosition: 1, result: "Чели ли сте книги от Йовков?",
    translation: { ru: "*Читали* ли вы книги Йовкова?", uk: "*Читали* ви книги Йовкова?" } },
  { words: ["Бил", "си", "в", "Несебър"], liPosition: 1, result: "Бил ли си в Несебър?",
    translation: { ru: "*Был* ли ты в Несебре?", uk: "*Був* ти в Несебрі?" } },
  { words: ["Опитвал", "си", "таратор"], liPosition: 1, result: "Опитвал ли си таратор?",
    translation: { ru: "*Пробовал* ли ты таратор?", uk: "*Куштував* ти таратор?" } },
  { words: ["Слушали", "сте", "българска", "музика"], liPosition: 1, result: "Слушали ли сте българска музика?",
    translation: { ru: "*Слушали* ли вы болгарскую музыку?", uk: "*Слухали* ви болгарську музику?" } },
  { words: ["Идвал", "си", "в", "София"], liPosition: 1, result: "Идвал ли си в София?",
    translation: { ru: "*Приезжал* ли ты в Софию?", uk: "*Приїздив* ти до Софії?" } },
  { words: ["Играли", "сте", "български", "хора"], liPosition: 1, result: "Играли ли сте български хора?",
    translation: { ru: "*Танцевали* ли вы болгарское хоро?", uk: "*Танцювали* ви болгарське хоро?" } },
  { words: ["Пили", "сте", "боза"], liPosition: 1, result: "Пили ли сте боза?",
    translation: { ru: "*Пили* ли вы бозу?", uk: "*Пили* ви бозу?" } },
];

// --- Short answers in present perfect ---
const PERF_SHORT_RULE: Localized<string> = {
  ru: "Краткие ответы: «Ял ли си?» → «Да, ял съм» / «Не, не съм ял» / «Не, не съм». Согласование причастия по роду подлежащего.",
  uk: "Короткі відповіді: «Ял ли си?» → «Да, ял съм» / «Не, не съм ял» / «Не, не съм». Узгодження дієприкметника за родом підмета.",
};
const HINT_PERF_SHORT: Localized<string> = { ru: "положительный краткий ответ", uk: "стверджувальна коротка відповідь" };
const HINT_PERF_SHORT_NEG: Localized<string> = { ru: "отрицательный краткий ответ", uk: "заперечна коротка відповідь" };
const LABEL_POS_ANS: Localized<string> = { ru: "Да, …", uk: "Да, …" };
const LABEL_NEG_ANS: Localized<string> = { ru: "Не, не …", uk: "Не, не …" };
export const DATA_L8_PERF_SHORT: DataItem[] = [
  { q: "Ял ли си? (м., да)", label: LABEL_POS_ANS, answer: "ял съм", hint: HINT_PERF_SHORT, rule: PERF_SHORT_RULE },
  { q: "Ял ли си? (м., нет)", label: LABEL_NEG_ANS, answer: "не съм ял", hint: HINT_PERF_SHORT_NEG, rule: PERF_SHORT_RULE },
  { q: "Яла ли си? (ж., да)", label: LABEL_POS_ANS, answer: "яла съм", hint: HINT_PERF_SHORT, rule: PERF_SHORT_RULE },
  { q: "Яла ли си? (ж., нет)", label: LABEL_NEG_ANS, answer: "не съм яла", hint: HINT_PERF_SHORT_NEG, rule: PERF_SHORT_RULE },
  { q: "Пила ли си ракия? (ж., да)", label: LABEL_POS_ANS, answer: "пила съм", hint: HINT_PERF_SHORT, rule: PERF_SHORT_RULE },
  { q: "Пила ли си ракия? (ж., нет)", label: LABEL_NEG_ANS, answer: "не съм пила", hint: HINT_PERF_SHORT_NEG, rule: PERF_SHORT_RULE },
  { q: "Ходили ли сте? (мн., да)", label: LABEL_POS_ANS, answer: "ходили сме", hint: HINT_PERF_SHORT, rule: PERF_SHORT_RULE },
  { q: "Ходили ли сте? (мн., нет)", label: LABEL_NEG_ANS, answer: "не сме ходили", hint: HINT_PERF_SHORT_NEG, rule: PERF_SHORT_RULE },
  { q: "Бил ли си в Несебър? (м., да)", label: LABEL_POS_ANS, answer: "бил съм", hint: HINT_PERF_SHORT, rule: PERF_SHORT_RULE },
  { q: "Бил ли си в Несебър? (м., нет)", label: LABEL_NEG_ANS, answer: "не съм бил", hint: HINT_PERF_SHORT_NEG, rule: PERF_SHORT_RULE },
  { q: "Чели ли сте книгата? (мн., да)", label: LABEL_POS_ANS, answer: "чели сме", hint: HINT_PERF_SHORT, rule: PERF_SHORT_RULE },
  { q: "Чели ли сте книгата? (мн., нет)", label: LABEL_NEG_ANS, answer: "не сме чели", hint: HINT_PERF_SHORT_NEG, rule: PERF_SHORT_RULE },
  { q: "Опитвал ли е таратор? (м., да)", label: LABEL_POS_ANS, answer: "опитвал е", hint: HINT_PERF_SHORT, rule: PERF_SHORT_RULE },
  { q: "Опитвал ли е таратор? (м., нет)", label: LABEL_NEG_ANS, answer: "не е опитвал", hint: HINT_PERF_SHORT_NEG, rule: PERF_SHORT_RULE },
];
export const L8_PERF_SHORT_OPTIONS = [
  "ял съм", "не съм ял",
  "яла съм", "не съм яла",
  "пила съм", "не съм пила",
  "ходили сме", "не сме ходили",
  "бил съм", "не съм бил",
  "чели сме", "не сме чели",
  "опитвал е", "не е опитвал",
];

// --- Paradigms ---
const L8_PRONOUNS = ["Аз", "Ти", "Той", "Ние", "Вие", "Те"];
export const DATA_L8_PERF_PARADIGM: ParadigmItem[] = [
  { verb: "ял съм (м.р.)", pronouns: L8_PRONOUNS,
    forms: ["съм ял", "си ял", "е ял", "сме яли", "сте яли", "са яли"],
    hint: { ru: "минало неопр., м.р.: ям", uk: "минуле неозн., ч.р.: ям" }, rule: PERF_AUX_RULE },
  { verb: "пил съм (м.р.)", pronouns: L8_PRONOUNS,
    forms: ["съм пил", "си пил", "е пил", "сме пили", "сте пили", "са пили"],
    hint: { ru: "минало неопр., м.р.: пия", uk: "минуле неозн., ч.р.: пия" }, rule: PERF_AUX_RULE },
  { verb: "ходил съм (м.р.)", pronouns: L8_PRONOUNS,
    forms: ["съм ходил", "си ходил", "е ходил", "сме ходили", "сте ходили", "са ходили"],
    hint: { ru: "минало неопр., м.р.: ходя", uk: "минуле неозн., ч.р.: ходя" }, rule: PERF_AUX_RULE },
  { verb: "бил съм (м.р.)", pronouns: L8_PRONOUNS,
    forms: ["съм бил", "си бил", "е бил", "сме били", "сте били", "са били"],
    hint: { ru: "минало неопр., м.р.: съм", uk: "минуле неозн., ч.р.: съм" }, rule: PERF_AUX_RULE },
  { verb: "ям (наст.)", pronouns: L8_PRONOUNS,
    forms: ["ям", "ядеш", "яде", "ядем", "ядете", "ядат"],
    hint: { ru: "настоящее: ям (неправ.)", uk: "теперішнє: ям (неправ.)" }, rule: { ru: "ям/ядеш/яде · ядем/ядете/ядат", uk: "ям/ядеш/яде · ядем/ядете/ядат" } },
];

// --- Build sentences (food + restaurant + present perfect) ---
export const DATA_L8_BUILD: BuildItem[] = [
  { words: ["Аз", "съм", "гладен"], translation: { ru: "Я голоден.", uk: "Я голодний." } },
  { words: ["Яде", "ми", "се", "нещо", "сладко"], translation: { ru: "Мне хочется чего-то сладкого.", uk: "Мені хочеться чогось солодкого." } },
  { words: ["Не", "съм", "много", "гладна"], translation: { ru: "Я не очень голодна.", uk: "Я не дуже голодна." } },
  { words: ["Ще", "сложа", "още", "сол", "и", "черен", "пипер"], translation: { ru: "Я добавлю ещё соль и чёрный перец.", uk: "Я додам ще сіль і чорний перець." } },
  { words: ["Ял", "ли", "си", "таратор", "?"], translation: { ru: "Ты *ел* таратор?", uk: "Ти *їв* таратор?" } },
  { words: ["Не", "съм", "ходил", "в", "Габрово"], translation: { ru: "Я не был в Габрово.", uk: "Я не був у Габрово." } },
  { words: ["Ние", "сме", "пили", "българско", "вино"], translation: { ru: "Мы пили болгарское вино.", uk: "Ми пили болгарське вино." } },
  { words: ["Какво", "ще", "ми", "препоръчате", "?"], translation: { ru: "Что вы мне порекомендуете?", uk: "Що ви мені порекомендуєте?" } },
  { words: ["Ще", "поръчаме", "две", "шопски", "салати"], translation: { ru: "Мы закажем два шопских салата.", uk: "Ми замовимо два шопські салати." } },
  { words: ["Може", "ли", "сметката", "?"], translation: { ru: "Можно счёт?", uk: "Можна рахунок?" } },
  { words: ["Задръжте", "рестото"], translation: { ru: "Сдачи не надо.", uk: "Решту залиште собі." } },
  { words: ["Опитал", "съм", "български", "ястия"], translation: { ru: "Я *пробовал* болгарские блюда.", uk: "Я *куштував* болгарські страви." } },
];

// --- Match: cognate verb ↔ noun ---
const HINT_MATCH_COG: Localized<string> = { ru: "соедини глагол и однокоренное существительное", uk: "з'єднай дієслово та однокореневий іменник" };
export const DATA_L8_MATCH_COGNATE: MatchItem[] = [
  { left: "ям", right: "ядене", hint: HINT_MATCH_COG },
  { left: "храня се", right: "храна", hint: HINT_MATCH_COG },
  { left: "закусвам", right: "закуска", hint: HINT_MATCH_COG },
  { left: "обядвам", right: "обяд", hint: HINT_MATCH_COG },
  { left: "вечерям", right: "вечеря", hint: HINT_MATCH_COG },
  { left: "готвя", right: "готвач", hint: HINT_MATCH_COG },
  { left: "купувам", right: "купувач", hint: HINT_MATCH_COG },
  { left: "продавам", right: "продавач", hint: HINT_MATCH_COG },
  { left: "мириша", right: "миризма", hint: HINT_MATCH_COG },
];

// --- Match: drink ↔ food (Bulgarian convention) ---
const HINT_MATCH_PAIRS: Localized<string> = { ru: "соедини напиток с типичным сопровождением", uk: "з'єднай напій з типовим супроводом" };
export const DATA_L8_MATCH_PAIRS: MatchItem[] = [
  { left: "уиски", right: "пържени картофи", hint: HINT_MATCH_PAIRS },
  { left: "бира", right: "ядки", hint: HINT_MATCH_PAIRS },
  { left: "бяло вино", right: "свинско месо", hint: HINT_MATCH_PAIRS },
  { left: "червено вино", right: "телешко месо", hint: HINT_MATCH_PAIRS },
  { left: "ракия", right: "шопска салата", hint: HINT_MATCH_PAIRS },
  { left: "водка", right: "пържена риба", hint: HINT_MATCH_PAIRS },
  { left: "коняк", right: "пилешко месо", hint: HINT_MATCH_PAIRS },
  { left: "шампанско", right: "торта", hint: HINT_MATCH_PAIRS },
  { left: "кафе", right: "сладолед", hint: HINT_MATCH_PAIRS },
  { left: "чай", right: "руска салата", hint: HINT_MATCH_PAIRS },
];

// --- Match: product ↔ taste ---
// Bijective (one product per taste); match engine matches by pair index, so
// duplicate left or right values would be visually indistinguishable.
const HINT_MATCH_TASTE: Localized<string> = { ru: "соедини продукт с его вкусом", uk: "з'єднай продукт з його смаком" };
export const DATA_L8_MATCH_TASTE: MatchItem[] = [
  { left: "захар", right: "сладък", hint: HINT_MATCH_TASTE },
  { left: "сирене", right: "солен", hint: HINT_MATCH_TASTE },
  { left: "люта чушка", right: "лют", hint: HINT_MATCH_TASTE },
  { left: "кафе", right: "горчив", hint: HINT_MATCH_TASTE },
  { left: "лимон", right: "кисел", hint: HINT_MATCH_TASTE },
];

// --- Odd one out ---
const ODD_L8_NOT_FRUIT: Localized<string> = { ru: "одно — не плод", uk: "одне — не плід" };
const ODD_L8_NOT_VEG: Localized<string> = { ru: "одно — не овощ", uk: "одне — не овоч" };
const ODD_L8_NOT_DRINK: Localized<string> = { ru: "одно — не напиток", uk: "одне — не напій" };
const ODD_L8_NOT_DAIRY: Localized<string> = { ru: "одно — не молочный продукт", uk: "одне — не молочний продукт" };
const ODD_L8_NOT_MEAT: Localized<string> = { ru: "одно — не мясо", uk: "одне — не м'ясо" };
const ODD_L8_NOT_TABLE: Localized<string> = { ru: "одно — не посуда / прибор", uk: "одне — не посуд / прибор" };
const ODD_L8_NOT_TASTE: Localized<string> = { ru: "одно — не вкус", uk: "одне — не смак" };
const ODD_L8_NOT_COOK: Localized<string> = { ru: "одно — не способ готовки", uk: "одне — не спосіб готування" };
const ODD_L8_NOT_DISH: Localized<string> = { ru: "одно — не болгарское блюдо", uk: "одне — не болгарська страва" };
const ODD_L8_NOT_REST: Localized<string> = { ru: "одно — не работник ресторана", uk: "одне — не працівник ресторану" };
const ODD_L8_NOT_PART_FEM: Localized<string> = { ru: "одно — не ж.р. ед.ч. причастия", uk: "одне — не ж.р. одн. дієприкметника" };
const ODD_L8_NOT_PART_PL: Localized<string> = { ru: "одно — не мн.ч. причастия", uk: "одне — не мн. дієприкметника" };
export const DATA_L8_ODD: OddItem[] = [
  { words: ["ябълка", "круша", "праскова", "домат"], odd: "домат", hint: ODD_L8_NOT_FRUIT },
  { words: ["краставица", "чушка", "лук", "ябълка"], odd: "ябълка", hint: ODD_L8_NOT_VEG },
  { words: ["вода", "вино", "сок", "сирене"], odd: "сирене", hint: ODD_L8_NOT_DRINK },
  { words: ["мляко", "масло", "сирене", "хляб"], odd: "хляб", hint: ODD_L8_NOT_DAIRY },
  { words: ["пилешко", "свинско", "телешко", "грозде"], odd: "грозде", hint: ODD_L8_NOT_MEAT },
  { words: ["вилица", "лъжица", "нож", "сол"], odd: "сол", hint: ODD_L8_NOT_TABLE },
  { words: ["сладък", "солен", "лют", "топъл"], odd: "топъл", hint: ODD_L8_NOT_TASTE },
  { words: ["варя", "пека", "пържа", "ходя"], odd: "ходя", hint: ODD_L8_NOT_COOK },
  { words: ["таратор", "мусака", "сарми", "пица"], odd: "пица", hint: ODD_L8_NOT_DISH },
  { words: ["сервитьор", "барман", "готвач", "учител"], odd: "учител", hint: ODD_L8_NOT_REST },
  { words: ["яла", "пила", "ходила", "ял"], odd: "ял", hint: ODD_L8_NOT_PART_FEM },
  { words: ["яли", "пили", "ходили", "била"], odd: "била", hint: ODD_L8_NOT_PART_PL },
];
