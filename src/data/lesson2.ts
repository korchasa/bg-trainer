import type { DataItem, BuildItem, MatchItem, OddItem, ParadigmItem } from "../types";
import type { Localized } from "../i18n/types";
import { LABEL_M, LABEL_F, LABEL_N, LABEL_PL } from "./lesson1";

// ========================= LESSON 2 =========================

const AGREE_RULE: Localized<string> = {
  ru: "Прилагательное согласуется с существительным по роду и числу: м.р. ∅, ж.р. -а, ср.р. -о, мн.ч. -и.",
  uk: "Прикметник узгоджується з іменником за родом і числом: ч.р. ∅, ж.р. -а, с.р. -о, мн. -и.",
};
const AGREE_HINT: Localized<string> = { ru: "согласуй прилагательное", uk: "узгодь прикметник" };
export const DATA_AGREE: DataItem[] = [
  { q: "хубав + стол", label: LABEL_M, answer: "хубав", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["хубава", "хубаво", "хубави"] },
  { q: "хубав + стая", label: LABEL_F, answer: "хубава", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["хубав", "хубаво", "хубави"] },
  { q: "хубав + цвете", label: LABEL_N, answer: "хубаво", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["хубав", "хубава", "хубави"] },
  { q: "хубав + столове", label: LABEL_PL, answer: "хубави", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["хубав", "хубава", "хубаво"] },
  { q: "грозен + шкаф", label: LABEL_M, answer: "грозен", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["грозна", "грозно", "грозни"] },
  { q: "грозен + картина", label: LABEL_F, answer: "грозна", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["грозен", "грозно", "грозни"] },
  { q: "грозен + огледало", label: LABEL_N, answer: "грозно", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["грозен", "грозна", "грозни"] },
  { q: "голям + прозорец", label: LABEL_M, answer: "голям", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["голяма", "голямо", "големи"] },
  { q: "голям + маса", label: LABEL_F, answer: "голяма", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["голям", "голямо", "големи"] },
  { q: "голям + легло", label: LABEL_N, answer: "голямо", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["голям", "голяма", "големи"] },
  { q: "голям + прозорци", label: LABEL_PL, answer: "големи", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["голям", "голяма", "голямо"] },
  { q: "малък + килим", label: LABEL_M, answer: "малък", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["малка", "малко", "малки"] },
  { q: "малък + стая", label: LABEL_F, answer: "малка", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["малък", "малко", "малки"] },
  { q: "малък + бюро", label: LABEL_N, answer: "малко", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["малък", "малка", "малки"] },
  { q: "светъл + прозорец", label: LABEL_M, answer: "светъл", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["светла", "светло", "светли"] },
  { q: "светъл + стая", label: LABEL_F, answer: "светла", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["светъл", "светло", "светли"] },
  { q: "чист + под", label: LABEL_M, answer: "чист", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["чиста", "чисто", "чисти"] },
  { q: "чист + стая", label: LABEL_F, answer: "чиста", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["чист", "чисто", "чисти"] },
  { q: "чист + легло", label: LABEL_N, answer: "чисто", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["чист", "чиста", "чисти"] },
  { q: "подреден + стая", label: LABEL_F, answer: "подредена", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["подреден", "подредено", "подредени"] },
  { q: "светъл + бюро", label: LABEL_N, answer: "светло", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["светъл", "светла", "светли"] },
  { q: "светъл + стаи", label: LABEL_PL, answer: "светли", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["светъл", "светла", "светло"] },
  { q: "тъмен + килим", label: LABEL_M, answer: "тъмен", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["тъмна", "тъмно", "тъмни"] },
  { q: "тъмен + стая", label: LABEL_F, answer: "тъмна", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["тъмен", "тъмно", "тъмни"] },
  { q: "тъмен + бюро", label: LABEL_N, answer: "тъмно", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["тъмен", "тъмна", "тъмни"] },
  { q: "мръсен + под", label: LABEL_M, answer: "мръсен", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["мръсна", "мръсно", "мръсни"] },
  { q: "мръсен + чанта", label: LABEL_F, answer: "мръсна", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["мръсен", "мръсно", "мръсни"] },
  { q: "мръсен + огледало", label: LABEL_N, answer: "мръсно", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["мръсен", "мръсна", "мръсни"] },
  { q: "разхвърлян + стая", label: LABEL_F, answer: "разхвърляна", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["разхвърлян", "разхвърляно", "разхвърляни"] },
  { q: "разхвърлян + бюро", label: LABEL_N, answer: "разхвърляно", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["разхвърлян", "разхвърляна", "разхвърляни"] },
  { q: "тесен + стая", label: LABEL_F, answer: "тясна", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["тесен", "тясно", "тесни"] },
  { q: "просторен + стая", label: LABEL_F, answer: "просторна", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["просторен", "просторно", "просторни"] },
  { q: "просторен + бюро", label: LABEL_N, answer: "просторно", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["просторен", "просторна", "просторни"] },
  { q: "красив + картина", label: LABEL_F, answer: "красива", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["красив", "красиво", "красиви"] },
  { q: "красив + цвете", label: LABEL_N, answer: "красиво", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["красив", "красива", "красиви"] },
  { q: "красив + цветя", label: LABEL_PL, answer: "красиви", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["красив", "красива", "красиво"] },
  { q: "малък + столове", label: LABEL_PL, answer: "малки", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["малък", "малка", "малко"] },
  { q: "чист + чанти", label: LABEL_PL, answer: "чисти", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["чист", "чиста", "чисто"] },
  { q: "хубав + бюро", label: LABEL_N, answer: "хубаво", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["хубав", "хубава", "хубави"] },
  { q: "грозен + килими", label: LABEL_PL, answer: "грозни", hint: AGREE_HINT, rule: AGREE_RULE, decoys: ["грозен", "грозна", "грозно"] },
];

const POSS_FULL_RULE: Localized<string> = {
  ru: "Полная определённая форма притяжательного: м.р. -ят, ж.р. -ата, ср.р. -ето, мн.ч. -ите.",
  uk: "Повна означена форма присвійного: ч.р. -ят, ж.р. -ата, с.р. -ето, мн. -ите.",
};
const POSS_FULL_HINT: Localized<string> = { ru: "полная форма по роду/числу", uk: "повна форма за родом/числом" };
export const DATA_POSSESS_FULL: DataItem[] = [
  { q: "аз + килим", label: LABEL_M, answer: "моят", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["моята", "моето", "моите"] },
  { q: "аз + стая", label: LABEL_F, answer: "моята", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["моят", "моето", "моите"] },
  { q: "аз + бюро", label: LABEL_N, answer: "моето", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["моят", "моята", "моите"] },
  { q: "аз + книги", label: LABEL_PL, answer: "моите", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["моят", "моята", "моето"] },
  { q: "ти + стол", label: LABEL_M, answer: "твоят", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["твоята", "твоето", "твоите"] },
  { q: "ти + стая", label: LABEL_F, answer: "твоята", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["твоят", "твоето", "твоите"] },
  { q: "ти + легло", label: LABEL_N, answer: "твоето", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["твоят", "твоята", "твоите"] },
  { q: "той + компютър", label: LABEL_M, answer: "неговият", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["неговата", "неговото", "неговите"] },
  { q: "той + стая", label: LABEL_F, answer: "неговата", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["неговият", "неговото", "неговите"] },
  { q: "той + легло", label: LABEL_N, answer: "неговото", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["неговият", "неговата", "неговите"] },
  { q: "тя + шкаф", label: LABEL_M, answer: "нейният", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["нейната", "нейното", "нейните"] },
  { q: "тя + стая", label: LABEL_F, answer: "нейната", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["нейният", "нейното", "нейните"] },
  { q: "тя + бюро", label: LABEL_N, answer: "нейното", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["нейният", "нейната", "нейните"] },
  { q: "ние + килим", label: LABEL_M, answer: "нашият", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["нашата", "нашето", "нашите"] },
  { q: "ние + картина", label: LABEL_F, answer: "нашата", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["нашият", "нашето", "нашите"] },
  { q: "ние + бюро", label: LABEL_N, answer: "нашето", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["нашият", "нашата", "нашите"] },
  { q: "вие + стая", label: LABEL_F, answer: "вашата", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["вашият", "вашето", "вашите"] },
  { q: "вие + легло", label: LABEL_N, answer: "вашето", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["вашият", "вашата", "вашите"] },
  { q: "те + стая", label: LABEL_F, answer: "тяхната", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["техният", "тяхното", "техните"] },
  { q: "те + бюро", label: LABEL_N, answer: "тяхното", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["техният", "тяхната", "техните"] },
  { q: "аз + стол", label: LABEL_M, answer: "моят", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["моята", "моето", "моите"] },
  { q: "аз + цвете", label: LABEL_N, answer: "моето", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["моят", "моята", "моите"] },
  { q: "ти + килим", label: LABEL_M, answer: "твоят", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["твоята", "твоето", "твоите"] },
  { q: "ти + чанта", label: LABEL_F, answer: "твоята", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["твоят", "твоето", "твоите"] },
  { q: "ти + книги", label: LABEL_PL, answer: "твоите", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["твоят", "твоята", "твоето"] },
  { q: "той + бюро", label: LABEL_N, answer: "неговото", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["неговият", "неговата", "неговите"] },
  { q: "той + книги", label: LABEL_PL, answer: "неговите", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["неговият", "неговата", "неговото"] },
  { q: "тя + килим", label: LABEL_M, answer: "нейният", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["нейната", "нейното", "нейните"] },
  { q: "тя + цвете", label: LABEL_N, answer: "нейното", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["нейният", "нейната", "нейните"] },
  { q: "тя + цветя", label: LABEL_PL, answer: "нейните", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["нейният", "нейната", "нейното"] },
  { q: "ние + стая", label: LABEL_F, answer: "нашата", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["нашият", "нашето", "нашите"] },
  { q: "ние + книги", label: LABEL_PL, answer: "нашите", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["нашият", "нашата", "нашето"] },
  { q: "вие + стол", label: LABEL_M, answer: "вашият", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["вашата", "вашето", "вашите"] },
  { q: "вие + чанти", label: LABEL_PL, answer: "вашите", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["вашият", "вашата", "вашето"] },
  { q: "те + килим", label: LABEL_M, answer: "техният", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["тяхната", "тяхното", "техните"] },
  { q: "те + книги", label: LABEL_PL, answer: "техните", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["техният", "тяхната", "тяхното"] },
  { q: "аз + чанта", label: LABEL_F, answer: "моята", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["моят", "моето", "моите"] },
  { q: "той + картина", label: LABEL_F, answer: "неговата", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["неговият", "неговото", "неговите"] },
  { q: "ние + цвете", label: LABEL_N, answer: "нашето", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["нашият", "нашата", "нашите"] },
  { q: "вие + бюро", label: LABEL_N, answer: "вашето", hint: POSS_FULL_HINT, rule: POSS_FULL_RULE, decoys: ["вашият", "вашата", "вашите"] },
];

const PREP_RULE: Localized<string> = {
  ru: "Пространственные предлоги: на (на), под (под), над (над), до (рядом), между (между), в (в), пред (перед), зад (за), срещу (напротив).",
  uk: "Просторові прийменники: на (на), під (під), над (над), до (поряд), між (між), в (в), пред (перед), зад (за), срещу (навпроти).",
};
export const DATA_PREP_PLACE: DataItem[] = [
  { q: "Книгата е ___ масата.", answer: "на", hint: { ru: "сверху (поверхность)", uk: "зверху (поверхня)" }, rule: PREP_RULE },
  { q: "Лаптопът е ___ бюрото.", answer: "на", hint: { ru: "сверху (поверхность)", uk: "зверху (поверхня)" }, rule: PREP_RULE },
  { q: "Килимът е ___ пода.", answer: "на", hint: { ru: "покрывает (сверху)", uk: "покриває (зверху)" }, rule: PREP_RULE },
  { q: "Котката е ___ масата.", answer: "под", hint: { ru: "снизу", uk: "знизу" }, rule: PREP_RULE },
  { q: "Чантата е ___ леглото.", answer: "под", hint: { ru: "снизу", uk: "знизу" }, rule: PREP_RULE },
  { q: "Картината е ___ леглото.", answer: "над", hint: { ru: "сверху (на стене)", uk: "зверху (на стіні)" }, rule: PREP_RULE },
  { q: "Лампата е ___ масата.", answer: "над", hint: { ru: "сверху (висит)", uk: "зверху (висить)" }, rule: PREP_RULE },
  { q: "Столът е ___ прозореца.", answer: "до", hint: { ru: "рядом", uk: "поряд" }, rule: PREP_RULE },
  { q: "Цветето е ___ компютъра.", answer: "до", hint: { ru: "рядом", uk: "поряд" }, rule: PREP_RULE },
  { q: "Масата е ___ леглото и гардероба.", answer: "между", hint: { ru: "посередине двух", uk: "посередині двох" }, rule: PREP_RULE },
  { q: "Дрехите са ___ гардероба.", answer: "в", hint: { ru: "внутри", uk: "всередині" }, rule: PREP_RULE },
  { q: "Книгите са ___ секцията.", answer: "в", hint: { ru: "внутри", uk: "всередині" }, rule: PREP_RULE },
  { q: "Столът е ___ бюрото.", answer: "пред", hint: { ru: "спереди", uk: "спереду" }, rule: PREP_RULE },
  { q: "Огледалото е ___ вратата.", answer: "зад", hint: { ru: "сзади", uk: "ззаду" }, rule: PREP_RULE },
  { q: "Банката е ___ магазина.", answer: "срещу", hint: { ru: "напротив", uk: "навпроти" }, rule: PREP_RULE },
  { q: "Молив е ___ тетрадката.", answer: "на", hint: { ru: "сверху (поверхность)", uk: "зверху (поверхня)" }, rule: PREP_RULE },
  { q: "Чашата е ___ масата.", answer: "на", hint: { ru: "сверху", uk: "зверху" }, rule: PREP_RULE },
  { q: "Обувките са ___ леглото.", answer: "под", hint: { ru: "снизу", uk: "знизу" }, rule: PREP_RULE },
  { q: "Килимът е ___ масата.", answer: "под", hint: { ru: "снизу", uk: "знизу" }, rule: PREP_RULE },
  { q: "Лампата е ___ бюрото.", answer: "над", hint: { ru: "сверху (висит)", uk: "зверху (висить)" }, rule: PREP_RULE },
  { q: "Картината е ___ бюрото.", answer: "над", hint: { ru: "сверху (на стене)", uk: "зверху (на стіні)" }, rule: PREP_RULE },
  { q: "Лампата е ___ леглото.", answer: "до", hint: { ru: "рядом", uk: "поряд" }, rule: PREP_RULE },
  { q: "Шкафът е ___ вратата.", answer: "до", hint: { ru: "рядом", uk: "поряд" }, rule: PREP_RULE },
  { q: "Бюрото е ___ шкафа и леглото.", answer: "между", hint: { ru: "посередине двух", uk: "посередині двох" }, rule: PREP_RULE },
  { q: "Молив е ___ чантата.", answer: "в", hint: { ru: "внутри", uk: "всередині" }, rule: PREP_RULE },
  { q: "Тетрадките са ___ чантата.", answer: "в", hint: { ru: "внутри", uk: "всередині" }, rule: PREP_RULE },
  { q: "Котката е ___ телевизора.", answer: "пред", hint: { ru: "спереди", uk: "спереду" }, rule: PREP_RULE },
  { q: "Чантата е ___ стола.", answer: "зад", hint: { ru: "сзади", uk: "ззаду" }, rule: PREP_RULE },
  { q: "Леглото е ___ прозореца.", answer: "срещу", hint: { ru: "напротив", uk: "навпроти" }, rule: PREP_RULE },
];
export const PREP_PLACE_OPTIONS = ["на", "под", "над", "до", "между", "в", "пред", "зад", "срещу"];

const DIR_ADJ_RULE: Localized<string> = {
  ru: "Словообразование с -ен/-на/-но/-ни: север → северен/северна/северно/северни.",
  uk: "Словотвір з -ен/-на/-но/-ни: север → северен/северна/северно/северни.",
};
const DIR_ADJ_HINT: Localized<string> = { ru: "образуй прилагательное по роду/числу", uk: "утвори прикметник за родом/числом" };
export const DATA_DIR_ADJ: DataItem[] = [
  { q: "север + вятър", label: LABEL_M, answer: "северен", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["северна", "северно", "северни"] },
  { q: "север + стая", label: LABEL_F, answer: "северна", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["северен", "северно", "северни"] },
  { q: "север + море", label: LABEL_N, answer: "северно", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["северен", "северна", "северни"] },
  { q: "север + страни", label: LABEL_PL, answer: "северни", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["северен", "северна", "северно"] },
  { q: "юг + бряг", label: LABEL_M, answer: "южен", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["южна", "южно", "южни"] },
  { q: "юг + стая", label: LABEL_F, answer: "южна", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["южен", "южно", "южни"] },
  { q: "юг + село", label: LABEL_N, answer: "южно", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["южен", "южна", "южни"] },
  { q: "юг + плодове", label: LABEL_PL, answer: "южни", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["южен", "южна", "южно"] },
  { q: "изток + бряг", label: LABEL_M, answer: "източен", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["източна", "източно", "източни"] },
  { q: "изток + стая", label: LABEL_F, answer: "източна", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["източен", "източно", "източни"] },
  { q: "запад + град", label: LABEL_M, answer: "западен", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["западна", "западно", "западни"] },
  { q: "запад + улица", label: LABEL_F, answer: "западна", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["западен", "западно", "западни"] },
  { q: "дърво + стол", label: LABEL_M, answer: "дървен", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["дървена", "дървено", "дървени"] },
  { q: "дърво + маса", label: LABEL_F, answer: "дървена", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["дървен", "дървено", "дървени"] },
  { q: "дърво + бюро", label: LABEL_N, answer: "дървено", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["дървен", "дървена", "дървени"] },
  { q: "дърво + столове", label: LABEL_PL, answer: "дървени", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["дървен", "дървена", "дървено"] },
  { q: "изток + село", label: LABEL_N, answer: "източно", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["източен", "източна", "източни"] },
  { q: "изток + страни", label: LABEL_PL, answer: "източни", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["източен", "източна", "източно"] },
  { q: "запад + море", label: LABEL_N, answer: "западно", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["западен", "западна", "западни"] },
  { q: "запад + страни", label: LABEL_PL, answer: "западни", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["западен", "западна", "западно"] },
  { q: "север + град", label: LABEL_M, answer: "северен", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["северна", "северно", "северни"] },
  { q: "юг + улица", label: LABEL_F, answer: "южна", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["южен", "южно", "южни"] },
  { q: "север + морета", label: LABEL_PL, answer: "северни", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["северен", "северна", "северно"] },
  { q: "юг + страни", label: LABEL_PL, answer: "южни", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["южен", "южна", "южно"] },
  { q: "изток + улица", label: LABEL_F, answer: "източна", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["източен", "източно", "източни"] },
  { q: "запад + бряг", label: LABEL_M, answer: "западен", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["западна", "западно", "западни"] },
  { q: "дърво + врата", label: LABEL_F, answer: "дървена", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["дървен", "дървено", "дървени"] },
  { q: "север + ветрове", label: LABEL_PL, answer: "северни", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["северен", "северна", "северно"] },
  { q: "юг + бряг", label: LABEL_M, answer: "южен", hint: DIR_ADJ_HINT, rule: DIR_ADJ_RULE, decoys: ["южна", "южно", "южни"] },
];

const ANT_HINT: Localized<string> = { ru: "подбери антоним", uk: "підбери антонім" };
export const DATA_ANTONYMS: DataItem[] = [
  { q: "хубав", answer: "грозен", hint: ANT_HINT, decoys: ["светъл", "голям", "чист"] },
  { q: "грозен", answer: "хубав", hint: ANT_HINT, decoys: ["малък", "мръсен", "тъмен"] },
  { q: "светъл", answer: "тъмен", hint: ANT_HINT, decoys: ["грозен", "малък", "мръсен"] },
  { q: "тъмен", answer: "светъл", hint: ANT_HINT, decoys: ["хубав", "голям", "чист"] },
  { q: "голям", answer: "малък", hint: ANT_HINT, decoys: ["тъмен", "грозен", "мръсен"] },
  { q: "малък", answer: "голям", hint: ANT_HINT, decoys: ["светъл", "хубав", "чист"] },
  { q: "тесен", answer: "просторен", hint: ANT_HINT, decoys: ["малък", "тъмен", "мръсен"] },
  { q: "просторен", answer: "тесен", hint: ANT_HINT, decoys: ["голям", "светъл", "хубав"] },
  { q: "чист", answer: "мръсен", hint: ANT_HINT, decoys: ["тъмен", "малък", "грозен"] },
  { q: "мръсен", answer: "чист", hint: ANT_HINT, decoys: ["светъл", "хубав", "голям"] },
  { q: "подреден", answer: "разхвърлян", hint: ANT_HINT, decoys: ["мръсен", "тъмен", "грозен"] },
  { q: "разхвърлян", answer: "подреден", hint: ANT_HINT, decoys: ["чист", "светъл", "хубав"] },
  { q: "хубава", answer: "грозна", hint: ANT_HINT, decoys: ["светла", "голяма", "чиста"] },
  { q: "грозна", answer: "хубава", hint: ANT_HINT, decoys: ["малка", "мръсна", "тъмна"] },
  { q: "светла", answer: "тъмна", hint: ANT_HINT, decoys: ["грозна", "малка", "мръсна"] },
  { q: "тъмна", answer: "светла", hint: ANT_HINT, decoys: ["хубава", "голяма", "чиста"] },
  { q: "голяма", answer: "малка", hint: ANT_HINT, decoys: ["тъмна", "грозна", "мръсна"] },
  { q: "малка", answer: "голяма", hint: ANT_HINT, decoys: ["светла", "хубава", "чиста"] },
  { q: "чиста", answer: "мръсна", hint: ANT_HINT, decoys: ["тъмна", "малка", "грозна"] },
  { q: "мръсна", answer: "чиста", hint: ANT_HINT, decoys: ["светла", "хубава", "голяма"] },
  { q: "подредена", answer: "разхвърляна", hint: ANT_HINT, decoys: ["мръсна", "тъмна", "грозна"] },
  { q: "разхвърляна", answer: "подредена", hint: ANT_HINT, decoys: ["чиста", "светла", "хубава"] },
  { q: "хубаво", answer: "грозно", hint: ANT_HINT, decoys: ["светло", "голямо", "чисто"] },
  { q: "голямо", answer: "малко", hint: ANT_HINT, decoys: ["тъмно", "грозно", "мръсно"] },
];

const IMA_RULE: Localized<string> = {
  ru: "«има» — есть/имеется; «няма» — нет/отсутствует. Безличные конструкции места.",
  uk: "«има» — є/наявне; «няма» — немає/відсутнє. Безособові конструкції місця.",
};
const IMA_HINT_YES: Localized<string> = { ru: "есть", uk: "є" };
const IMA_HINT_NO: Localized<string> = { ru: "нет / отсутствует", uk: "немає / відсутнє" };
export const DATA_IMA_NYAMA: DataItem[] = [
  { q: "В стаята ___ легло.", answer: "има", hint: IMA_HINT_YES, rule: IMA_RULE },
  { q: "На масата ___ книга.", answer: "няма", hint: IMA_HINT_NO, rule: IMA_RULE },
  { q: "В чантата ___ молив.", answer: "има", hint: IMA_HINT_YES, rule: IMA_RULE },
  { q: "В стаята на Мария ___ гардероб.", answer: "има", hint: IMA_HINT_YES, rule: IMA_RULE },
  { q: "В стаята на Мария ___ две легла.", answer: "няма", hint: IMA_HINT_NO, rule: IMA_RULE },
  { q: "На пода ___ килим.", answer: "има", hint: IMA_HINT_YES, rule: IMA_RULE },
  { q: "Над леглото ___ картина.", answer: "има", hint: IMA_HINT_YES, rule: IMA_RULE },
  { q: "Къде е лаптопът? ___ го.", answer: "няма", hint: IMA_HINT_NO, rule: IMA_RULE },
  { q: "На бюрото ___ компютър.", answer: "има", hint: IMA_HINT_YES, rule: IMA_RULE },
  { q: "В секцията ___ много книги.", answer: "има", hint: IMA_HINT_YES, rule: IMA_RULE },
  { q: "В стаята ___ телевизор.", answer: "няма", hint: IMA_HINT_NO, rule: IMA_RULE },
  { q: "На стената ___ огледало.", answer: "има", hint: IMA_HINT_YES, rule: IMA_RULE },
  { q: "В чантата ___ книга.", answer: "няма", hint: IMA_HINT_NO, rule: IMA_RULE },
  { q: "До прозореца ___ маса.", answer: "има", hint: IMA_HINT_YES, rule: IMA_RULE },
  { q: "Под леглото ___ обувки.", answer: "има", hint: IMA_HINT_YES, rule: IMA_RULE },
  { q: "На бюрото ___ лампа.", answer: "има", hint: IMA_HINT_YES, rule: IMA_RULE },
  { q: "В стаята ___ диван.", answer: "няма", hint: IMA_HINT_NO, rule: IMA_RULE },
  { q: "Между леглата ___ шкаф.", answer: "има", hint: IMA_HINT_YES, rule: IMA_RULE },
  { q: "На пода ___ цветя.", answer: "няма", hint: IMA_HINT_NO, rule: IMA_RULE },
  { q: "В стаята ___ телефон.", answer: "няма", hint: IMA_HINT_NO, rule: IMA_RULE },
  { q: "На прозореца ___ цвете.", answer: "има", hint: IMA_HINT_YES, rule: IMA_RULE },
  { q: "До бюрото ___ стол.", answer: "има", hint: IMA_HINT_YES, rule: IMA_RULE },
  { q: "В стаята ___ картина.", answer: "няма", hint: IMA_HINT_NO, rule: IMA_RULE },
];
export const IMA_NYAMA_OPTIONS = ["има", "няма"];

const EDIN_RULE: Localized<string> = {
  ru: "Числительное «один» согласуется по роду: един (м.), една (ж.), едно (ср.).",
  uk: "Числівник «один» узгоджується за родом: един (ч.), една (ж.), едно (с.).",
};
const EDIN_HINT_M: Localized<string> = { ru: "м.р.", uk: "ч.р." };
const EDIN_HINT_F: Localized<string> = { ru: "ж.р.", uk: "ж.р." };
const EDIN_HINT_N: Localized<string> = { ru: "ср.р.", uk: "с.р." };
export const DATA_EDIN: DataItem[] = [
  { q: "___ стол", answer: "един", hint: EDIN_HINT_M, rule: EDIN_RULE },
  { q: "___ маса", answer: "една", hint: EDIN_HINT_F, rule: EDIN_RULE },
  { q: "___ легло", answer: "едно", hint: EDIN_HINT_N, rule: EDIN_RULE },
  { q: "___ прозорец", answer: "един", hint: EDIN_HINT_M, rule: EDIN_RULE },
  { q: "___ стая", answer: "една", hint: EDIN_HINT_F, rule: EDIN_RULE },
  { q: "___ огледало", answer: "едно", hint: EDIN_HINT_N, rule: EDIN_RULE },
  { q: "___ шкаф", answer: "един", hint: EDIN_HINT_M, rule: EDIN_RULE },
  { q: "___ врата", answer: "една", hint: EDIN_HINT_F, rule: EDIN_RULE },
  { q: "___ бюро", answer: "едно", hint: EDIN_HINT_N, rule: EDIN_RULE },
  { q: "___ телевизор", answer: "един", hint: EDIN_HINT_M, rule: EDIN_RULE },
  { q: "___ картина", answer: "една", hint: EDIN_HINT_F, rule: EDIN_RULE },
  { q: "___ цвете", answer: "едно", hint: EDIN_HINT_N, rule: EDIN_RULE },
  { q: "___ диван", answer: "един", hint: EDIN_HINT_M, rule: EDIN_RULE },
  { q: "___ чанта", answer: "една", hint: EDIN_HINT_F, rule: EDIN_RULE },
  { q: "___ шише", answer: "едно", hint: EDIN_HINT_N, rule: EDIN_RULE },
  { q: "___ компютър", answer: "един", hint: EDIN_HINT_M, rule: EDIN_RULE },
  { q: "___ молив", answer: "един", hint: EDIN_HINT_M, rule: EDIN_RULE },
  { q: "___ телефон", answer: "един", hint: EDIN_HINT_M, rule: EDIN_RULE },
  { q: "___ килим", answer: "един", hint: EDIN_HINT_M, rule: EDIN_RULE },
  { q: "___ речник", answer: "един", hint: EDIN_HINT_M, rule: EDIN_RULE },
  { q: "___ тетрадка", answer: "една", hint: EDIN_HINT_F, rule: EDIN_RULE },
  { q: "___ книга", answer: "една", hint: EDIN_HINT_F, rule: EDIN_RULE },
  { q: "___ китара", answer: "една", hint: EDIN_HINT_F, rule: EDIN_RULE },
  { q: "___ химикалка", answer: "една", hint: EDIN_HINT_F, rule: EDIN_RULE },
  { q: "___ стена", answer: "една", hint: EDIN_HINT_F, rule: EDIN_RULE },
  { q: "___ лампа", answer: "една", hint: EDIN_HINT_F, rule: EDIN_RULE },
  { q: "___ дърво", answer: "едно", hint: EDIN_HINT_N, rule: EDIN_RULE },
  { q: "___ момче", answer: "едно", hint: EDIN_HINT_N, rule: EDIN_RULE },
  { q: "___ момиче", answer: "едно", hint: EDIN_HINT_N, rule: EDIN_RULE },
  { q: "___ село", answer: "едно", hint: EDIN_HINT_N, rule: EDIN_RULE },
];
export const EDIN_OPTIONS = ["един", "една", "едно"];

const COUNT_RULE: Localized<string> = {
  ru: "После 2–10 с неодуш. м.р. — счётная форма -а (два стола, пет стола). Ж.р. и ср.р. — обычное мн.ч.",
  uk: "Після 2–10 з неістот. ч.р. — лічильна форма -а (два стола, пет стола). Ж.р. і с.р. — звичайна мн.",
};
const COUNT_HINT: Localized<string> = { ru: "число + форма сущ.", uk: "число + форма ім." };
export const DATA_COUNT: DataItem[] = [
  { q: "2 + стол", label: LABEL_M, answer: "два стола", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["две стола", "два стол", "два столове"] },
  { q: "5 + стол", label: LABEL_M, answer: "пет стола", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["пет столове", "пет стол", "петте стола"] },
  { q: "3 + прозорец", label: LABEL_M, answer: "три прозореца", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["три прозорци", "три прозорец", "три прозорцата"] },
  { q: "7 + шкаф", label: LABEL_M, answer: "седем шкафа", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["седем шкафове", "седем шкаф", "седем шкафи"] },
  { q: "4 + телефон", label: LABEL_M, answer: "четири телефона", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["четири телефони", "четири телефон", "четири телефоните"] },
  { q: "8 + молив", label: LABEL_M, answer: "осем молива", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["осем моливи", "осем молив", "осем моливете"] },
  { q: "2 + маса", label: LABEL_F, answer: "две маси", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["два маси", "две маса", "двете маса"] },
  { q: "3 + стая", label: LABEL_F, answer: "три стаи", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["три стая", "трите стая", "три стаята"] },
  { q: "4 + чанта", label: LABEL_F, answer: "четири чанти", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["четири чанта", "четири чантите", "четирте чанта"] },
  { q: "6 + врата", label: LABEL_F, answer: "шест врати", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["шест врата", "шест вратите", "шестте врата"] },
  { q: "2 + легло", label: LABEL_N, answer: "две легла", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["два легла", "две легло", "двете легло"] },
  { q: "4 + огледало", label: LABEL_N, answer: "четири огледала", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["четири огледало", "четири огледали", "четири огледалата"] },
  { q: "7 + шише", label: LABEL_N, answer: "седем шишета", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["седем шише", "седем шишеи", "седем шишетата"] },
  { q: "3 + стол", label: LABEL_M, answer: "три стола", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["три столове", "три стол", "трите столове"] },
  { q: "2 + диван", label: LABEL_M, answer: "два дивана", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["две дивана", "два диван", "два дивани"] },
  { q: "5 + телевизор", label: LABEL_M, answer: "пет телевизора", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["пет телевизори", "пет телевизор", "пет телевизорите"] },
  { q: "3 + килим", label: LABEL_M, answer: "три килима", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["три килими", "три килим", "три килимове"] },
  { q: "6 + речник", label: LABEL_M, answer: "шест речника", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["шест речници", "шест речник", "шест речницата"] },
  { q: "2 + молив", label: LABEL_M, answer: "два молива", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["две молива", "два молив", "два моливи"] },
  { q: "5 + химикалка", label: LABEL_F, answer: "пет химикалки", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["пет химикалка", "пет химикалките", "петте химикалка"] },
  { q: "6 + тетрадка", label: LABEL_F, answer: "шест тетрадки", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["шест тетрадка", "шест тетрадките", "шестте тетрадка"] },
  { q: "4 + китара", label: LABEL_F, answer: "четири китари", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["четири китара", "четири китарите", "четирте китара"] },
  { q: "5 + книга", label: LABEL_F, answer: "пет книги", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["пет книга", "пет книгите", "пет книжки"] },
  { q: "3 + бюро", label: LABEL_N, answer: "три бюра", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["три бюро", "три бюрета", "три бюрата"] },
  { q: "5 + цвете", label: LABEL_N, answer: "пет цветя", hint: COUNT_HINT, rule: COUNT_RULE, decoys: ["пет цвете", "пет цветета", "пет цветята"] },
];

const ETO_RULE: Localized<string> = {
  ru: "Краткая форма местоимения: м.р./ср.р. → го, ж.р. → я, мн.ч. → ги.",
  uk: "Коротка форма займенника: ч.р./с.р. → го, ж.р. → я, мн. → ги.",
};
const ETO_HINT_M: Localized<string> = { ru: "м.р./ср.р.", uk: "ч.р./с.р." };
const ETO_HINT_F: Localized<string> = { ru: "ж.р.", uk: "ж.р." };
const ETO_HINT_PL: Localized<string> = { ru: "мн.ч.", uk: "мн." };
export const DATA_ETO: DataItem[] = [
  { q: "Къде е моливът?", answer: "Ето го", hint: ETO_HINT_M, rule: ETO_RULE },
  { q: "Къде е цветето?", answer: "Ето го", hint: ETO_HINT_M, rule: ETO_RULE },
  { q: "Къде е тетрадката?", answer: "Ето я", hint: ETO_HINT_F, rule: ETO_RULE },
  { q: "Къде е книгата?", answer: "Ето я", hint: ETO_HINT_F, rule: ETO_RULE },
  { q: "Къде е чантата?", answer: "Ето я", hint: ETO_HINT_F, rule: ETO_RULE },
  { q: "Къде е речникът?", answer: "Ето го", hint: ETO_HINT_M, rule: ETO_RULE },
  { q: "Къде са студентите?", answer: "Ето ги", hint: ETO_HINT_PL, rule: ETO_RULE },
  { q: "Къде са цветята?", answer: "Ето ги", hint: ETO_HINT_PL, rule: ETO_RULE },
  { q: "Къде са столовете?", answer: "Ето ги", hint: ETO_HINT_PL, rule: ETO_RULE },
  { q: "Къде е компютърът?", answer: "Ето го", hint: ETO_HINT_M, rule: ETO_RULE },
  { q: "Къде е бюрото?", answer: "Ето го", hint: ETO_HINT_M, rule: ETO_RULE },
  { q: "Къде са леглата?", answer: "Ето ги", hint: ETO_HINT_PL, rule: ETO_RULE },
  { q: "Къде е картината?", answer: "Ето я", hint: ETO_HINT_F, rule: ETO_RULE },
  { q: "Къде е огледалото?", answer: "Ето го", hint: ETO_HINT_M, rule: ETO_RULE },
  { q: "Къде е лаптопът?", answer: "Ето го", hint: ETO_HINT_M, rule: ETO_RULE },
  { q: "Къде е килимът?", answer: "Ето го", hint: ETO_HINT_M, rule: ETO_RULE },
  { q: "Къде е телефонът?", answer: "Ето го", hint: ETO_HINT_M, rule: ETO_RULE },
  { q: "Къде е телевизорът?", answer: "Ето го", hint: ETO_HINT_M, rule: ETO_RULE },
  { q: "Къде е стаята?", answer: "Ето я", hint: ETO_HINT_F, rule: ETO_RULE },
  { q: "Къде е масата?", answer: "Ето я", hint: ETO_HINT_F, rule: ETO_RULE },
  { q: "Къде е лампата?", answer: "Ето я", hint: ETO_HINT_F, rule: ETO_RULE },
  { q: "Къде е химикалката?", answer: "Ето я", hint: ETO_HINT_F, rule: ETO_RULE },
  { q: "Къде са книгите?", answer: "Ето ги", hint: ETO_HINT_PL, rule: ETO_RULE },
  { q: "Къде са тетрадките?", answer: "Ето ги", hint: ETO_HINT_PL, rule: ETO_RULE },
  { q: "Къде са моливите?", answer: "Ето ги", hint: ETO_HINT_PL, rule: ETO_RULE },
  { q: "Къде са картините?", answer: "Ето ги", hint: ETO_HINT_PL, rule: ETO_RULE },
  { q: "Къде са дрехите?", answer: "Ето ги", hint: ETO_HINT_PL, rule: ETO_RULE },
];
export const ETO_OPTIONS = ["Ето го", "Ето я", "Ето ги"];

const ART_MYAT_RULE: Localized<string> = {
  ru: "м.р. на -тел/-ар и мягкая основа: полный -ят, краткий -я (субъект/объект): преподавателят/преподавателя.",
  uk: "ч.р. на -тел/-ар і м'яка основа: повний -ят, короткий -я (суб'єкт/об'єкт): преподавателят/преподавателя.",
};
const ART_MAT_RULE: Localized<string> = {
  ru: "м.р. твёрдая основа: полный -ът (субъект), краткий -а (после предлогов): студентът/студента.",
  uk: "ч.р. тверда основа: повний -ът (суб'єкт), короткий -а (після прийменників): студентът/студента.",
};
const LABEL_FULL: Localized<string> = { ru: "подлежащее (полный)", uk: "підмет (повний)" };
const LABEL_SHORT_ART: Localized<string> = { ru: "после предлога (краткий)", uk: "після прийменника (короткий)" };
export const DATA_ART_M_FULL_SHORT: DataItem[] = [
  { q: "___ е млад. (преподавател)", label: LABEL_FULL, answer: "Преподавателят", hint: { ru: "полный м.р. -ят", uk: "повний ч.р. -ят" }, rule: ART_MYAT_RULE, decoys: ["Преподавателя", "Преподавателът", "Преподавателите"] },
  { q: "Студентът е до ___. (преподавател)", label: LABEL_SHORT_ART, answer: "преподавателя", hint: { ru: "краткий м.р. -я", uk: "короткий ч.р. -я" }, rule: ART_MYAT_RULE, decoys: ["преподавателят", "преподавател", "преподаватели"] },
  { q: "___ е в стаята. (студент)", label: LABEL_FULL, answer: "Студентът", hint: { ru: "полный м.р. -ът", uk: "повний ч.р. -ът" }, rule: ART_MAT_RULE, decoys: ["Студента", "Студентат", "Студентите"] },
  { q: "Масата е до ___. (студент)", label: LABEL_SHORT_ART, answer: "студента", hint: { ru: "краткий м.р. -а", uk: "короткий ч.р. -а" }, rule: ART_MAT_RULE, decoys: ["студентът", "студент", "студенти"] },
  { q: "___ е чист. (прозорец)", label: LABEL_FULL, answer: "Прозорецът", hint: { ru: "полный м.р. -ът", uk: "повний ч.р. -ът" }, rule: ART_MAT_RULE, decoys: ["Прозореца", "Прозорец", "Прозорците"] },
  { q: "Масата е до ___. (прозорец)", label: LABEL_SHORT_ART, answer: "прозореца", hint: { ru: "краткий м.р. -а", uk: "короткий ч.р. -а" }, rule: ART_MAT_RULE, decoys: ["прозорецът", "прозорец", "прозорци"] },
  { q: "___ е голям. (компютър)", label: LABEL_FULL, answer: "Компютърът", hint: { ru: "полный м.р. -ът", uk: "повний ч.р. -ът" }, rule: ART_MAT_RULE, decoys: ["Компютъра", "Компютър", "Компютрите"] },
  { q: "Книгата е до ___. (компютър)", label: LABEL_SHORT_ART, answer: "компютъра", hint: { ru: "краткий м.р. -а", uk: "короткий ч.р. -а" }, rule: ART_MAT_RULE, decoys: ["компютърът", "компютър", "компютри"] },
  { q: "___ е нов. (телефон)", label: LABEL_FULL, answer: "Телефонът", hint: { ru: "полный м.р. -ът", uk: "повний ч.р. -ът" }, rule: ART_MAT_RULE, decoys: ["Телефона", "Телефон", "Телефоните"] },
  { q: "Чантата е до ___. (телефон)", label: LABEL_SHORT_ART, answer: "телефона", hint: { ru: "краткий м.р. -а", uk: "короткий ч.р. -а" }, rule: ART_MAT_RULE, decoys: ["телефонът", "телефон", "телефони"] },
  { q: "___ е стар. (учител)", label: LABEL_FULL, answer: "Учителят", hint: { ru: "полный м.р. -ят", uk: "повний ч.р. -ят" }, rule: ART_MYAT_RULE, decoys: ["Учителя", "Учителът", "Учителите"] },
  { q: "Книгата е на ___. (учител)", label: LABEL_SHORT_ART, answer: "учителя", hint: { ru: "краткий м.р. -я", uk: "короткий ч.р. -я" }, rule: ART_MYAT_RULE, decoys: ["учителят", "учител", "учители"] },
  { q: "___ е на пода. (килим)", label: LABEL_FULL, answer: "Килимът", hint: { ru: "полный м.р. -ът", uk: "повний ч.р. -ът" }, rule: ART_MAT_RULE, decoys: ["Килима", "Килим", "Килимите"] },
  { q: "Котката е на ___. (килим)", label: LABEL_SHORT_ART, answer: "килима", hint: { ru: "краткий м.р. -а", uk: "короткий ч.р. -а" }, rule: ART_MAT_RULE, decoys: ["килимът", "килим", "килими"] },
  { q: "___ е голям. (стол)", label: LABEL_FULL, answer: "Столът", hint: { ru: "полный м.р. -ът", uk: "повний ч.р. -ът" }, rule: ART_MAT_RULE, decoys: ["Стола", "Стол", "Столовете"] },
  { q: "Книгата е на ___. (стол)", label: LABEL_SHORT_ART, answer: "стола", hint: { ru: "краткий м.р. -а", uk: "короткий ч.р. -а" }, rule: ART_MAT_RULE, decoys: ["столът", "стол", "столове"] },
  { q: "___ е чист. (под)", label: LABEL_FULL, answer: "Подът", hint: { ru: "полный м.р. -ът", uk: "повний ч.р. -ът" }, rule: ART_MAT_RULE, decoys: ["Пода", "Под", "Подовете"] },
  { q: "Килимът е на ___. (под)", label: LABEL_SHORT_ART, answer: "пода", hint: { ru: "краткий м.р. -а", uk: "короткий ч.р. -а" }, rule: ART_MAT_RULE, decoys: ["подът", "под", "подове"] },
  { q: "___ е стар. (шкаф)", label: LABEL_FULL, answer: "Шкафът", hint: { ru: "полный м.р. -ът", uk: "повний ч.р. -ът" }, rule: ART_MAT_RULE, decoys: ["Шкафа", "Шкаф", "Шкафовете"] },
  { q: "Чантата е до ___. (шкаф)", label: LABEL_SHORT_ART, answer: "шкафа", hint: { ru: "краткий м.р. -а", uk: "короткий ч.р. -а" }, rule: ART_MAT_RULE, decoys: ["шкафът", "шкаф", "шкафове"] },
  { q: "___ е малък. (молив)", label: LABEL_FULL, answer: "Моливът", hint: { ru: "полный м.р. -ът", uk: "повний ч.р. -ът" }, rule: ART_MAT_RULE, decoys: ["Молива", "Молив", "Моливите"] },
  { q: "Книгата е до ___. (молив)", label: LABEL_SHORT_ART, answer: "молива", hint: { ru: "краткий м.р. -а", uk: "короткий ч.р. -а" }, rule: ART_MAT_RULE, decoys: ["моливът", "молив", "моливи"] },
  { q: "___ е дебел. (речник)", label: LABEL_FULL, answer: "Речникът", hint: { ru: "полный м.р. -ът", uk: "повний ч.р. -ът" }, rule: ART_MAT_RULE, decoys: ["Речника", "Речник", "Речниците"] },
];

const NUM_RULE: Localized<string> = {
  ru: "Числительные 1–10: едно/две/три/четири/пет/шест/седем/осем/девет/десет.",
  uk: "Числівники 1–10: едно/две/три/четири/пет/шест/седем/осем/девет/десет.",
};
const NUM_HINT: Localized<string> = { ru: "цифра → слово", uk: "цифра → слово" };
export const DATA_NUMBERS: DataItem[] = [
  { q: "1", answer: "едно", hint: NUM_HINT, rule: NUM_RULE, decoys: ["две", "три", "пет"] },
  { q: "2", answer: "две", hint: NUM_HINT, rule: NUM_RULE, decoys: ["едно", "три", "четири"] },
  { q: "3", answer: "три", hint: NUM_HINT, rule: NUM_RULE, decoys: ["две", "четири", "пет"] },
  { q: "4", answer: "четири", hint: NUM_HINT, rule: NUM_RULE, decoys: ["три", "пет", "шест"] },
  { q: "5", answer: "пет", hint: NUM_HINT, rule: NUM_RULE, decoys: ["четири", "шест", "седем"] },
  { q: "6", answer: "шест", hint: NUM_HINT, rule: NUM_RULE, decoys: ["пет", "седем", "осем"] },
  { q: "7", answer: "седем", hint: NUM_HINT, rule: NUM_RULE, decoys: ["шест", "осем", "девет"] },
  { q: "8", answer: "осем", hint: NUM_HINT, rule: NUM_RULE, decoys: ["седем", "девет", "десет"] },
  { q: "9", answer: "девет", hint: NUM_HINT, rule: NUM_RULE, decoys: ["осем", "десет", "седем"] },
  { q: "10", answer: "десет", hint: NUM_HINT, rule: NUM_RULE, decoys: ["девет", "осем", "пет"] },
];

const DVAMA_RULE: Localized<string> = {
  ru: "Лично-мужская форма: един студент — двама студенти — много студенти. Исключение: един човек — двама души — много хора.",
  uk: "Особово-чоловіча форма: един студент — двама студенти — много студенти. Виняток: един човек — двама души — много хора.",
};
const DVAMA_HINT: Localized<string> = { ru: "форма по числу (лица м.р.)", uk: "форма за числом (особи ч.р.)" };
export const DATA_DVAMA: DataItem[] = [
  { q: "1 + студент", answer: "един студент", hint: DVAMA_HINT, rule: DVAMA_RULE, decoys: ["един студенти", "двама студент", "една студентка"] },
  { q: "2 + студент", answer: "двама студенти", hint: DVAMA_HINT, rule: DVAMA_RULE, decoys: ["два студенти", "двама студента", "две студенти"] },
  { q: "много + студент", answer: "много студенти", hint: DVAMA_HINT, rule: DVAMA_RULE, decoys: ["много студента", "много студент", "много студенте"] },
  { q: "1 + преподавател", answer: "един преподавател", hint: DVAMA_HINT, rule: DVAMA_RULE, decoys: ["една преподавател", "двама преподавател", "един преподаватели"] },
  { q: "2 + преподавател", answer: "двама преподаватели", hint: DVAMA_HINT, rule: DVAMA_RULE, decoys: ["два преподавателя", "двама преподавател", "две преподаватели"] },
  { q: "1 + българин", answer: "един българин", hint: DVAMA_HINT, rule: DVAMA_RULE, decoys: ["един българи", "двама българин", "една българка"] },
  { q: "2 + българин", answer: "двама българи", hint: DVAMA_HINT, rule: DVAMA_RULE, decoys: ["два българина", "двама българин", "две българи"] },
  { q: "много + българин", answer: "много българи", hint: DVAMA_HINT, rule: DVAMA_RULE, decoys: ["много българин", "много българина", "много българи."] },
  { q: "1 + човек", answer: "един човек", hint: { ru: "исключение (ед.)", uk: "виняток (одн.)" }, rule: DVAMA_RULE, decoys: ["едно човек", "един души", "един хора"] },
  { q: "2 + човек", answer: "двама души", hint: { ru: "исключение: 2 → души", uk: "виняток: 2 → души" }, rule: DVAMA_RULE, decoys: ["двама човек", "два човека", "двама хора"] },
  { q: "много + човек", answer: "много хора", hint: { ru: "исключение: много → хора", uk: "виняток: багато → хора" }, rule: DVAMA_RULE, decoys: ["много човек", "много души", "много човеци"] },
  { q: "1 + учител", answer: "един учител", hint: DVAMA_HINT, rule: DVAMA_RULE, decoys: ["една учител", "двама учител", "един учители"] },
  { q: "2 + учител", answer: "двама учители", hint: DVAMA_HINT, rule: DVAMA_RULE, decoys: ["два учителя", "двама учител", "две учители"] },
  { q: "много + учител", answer: "много учители", hint: DVAMA_HINT, rule: DVAMA_RULE, decoys: ["много учител", "много учителя", "много учителе"] },
  { q: "1 + лекар", answer: "един лекар", hint: DVAMA_HINT, rule: DVAMA_RULE, decoys: ["една лекар", "двама лекар", "един лекари"] },
  { q: "2 + лекар", answer: "двама лекари", hint: DVAMA_HINT, rule: DVAMA_RULE, decoys: ["два лекара", "двама лекар", "две лекари"] },
  { q: "много + лекар", answer: "много лекари", hint: DVAMA_HINT, rule: DVAMA_RULE, decoys: ["много лекар", "много лекара", "много лекаре"] },
  { q: "1 + журналист", answer: "един журналист", hint: DVAMA_HINT, rule: DVAMA_RULE, decoys: ["една журналист", "двама журналист", "един журналисти"] },
  { q: "2 + журналист", answer: "двама журналисти", hint: DVAMA_HINT, rule: DVAMA_RULE, decoys: ["два журналиста", "двама журналист", "две журналисти"] },
  { q: "много + журналист", answer: "много журналисти", hint: DVAMA_HINT, rule: DVAMA_RULE, decoys: ["много журналист", "много журналиста", "много журналисте"] },
  { q: "1 + мъж", answer: "един мъж", hint: DVAMA_HINT, rule: DVAMA_RULE, decoys: ["една мъж", "двама мъж", "един мъже"] },
  { q: "2 + мъж", answer: "двама мъже", hint: DVAMA_HINT, rule: DVAMA_RULE, decoys: ["два мъжа", "двама мъж", "две мъже"] },
];

const NYAMAGO_RULE: Localized<string> = {
  ru: "«Няма го/я/ги» — отсутствует: м.р./ср.р. → го, ж.р. → я, мн.ч. → ги.",
  uk: "«Няма го/я/ги» — відсутній: ч.р./с.р. → го, ж.р. → я, мн. → ги.",
};
export const DATA_NYAMA_GO: DataItem[] = [
  { q: "Къде е моливът? ___ (нет)", answer: "Няма го", hint: ETO_HINT_M, rule: NYAMAGO_RULE },
  { q: "Къде е лаптопът? ___ (нет)", answer: "Няма го", hint: ETO_HINT_M, rule: NYAMAGO_RULE },
  { q: "Къде е тетрадката? ___ (нет)", answer: "Няма я", hint: ETO_HINT_F, rule: NYAMAGO_RULE },
  { q: "Къде е чантата? ___ (нет)", answer: "Няма я", hint: ETO_HINT_F, rule: NYAMAGO_RULE },
  { q: "Къде са студентите? ___ (нет)", answer: "Няма ги", hint: ETO_HINT_PL, rule: NYAMAGO_RULE },
  { q: "Къде е бюрото? ___ (нет)", answer: "Няма го", hint: ETO_HINT_M, rule: NYAMAGO_RULE },
  { q: "Къде са цветята? ___ (нет)", answer: "Няма ги", hint: ETO_HINT_PL, rule: NYAMAGO_RULE },
  { q: "Къде е книгата? ___ (нет)", answer: "Няма я", hint: ETO_HINT_F, rule: NYAMAGO_RULE },
  { q: "Къде е речникът? ___ (нет)", answer: "Няма го", hint: ETO_HINT_M, rule: NYAMAGO_RULE },
  { q: "Къде са столовете? ___ (нет)", answer: "Няма ги", hint: ETO_HINT_PL, rule: NYAMAGO_RULE },
  { q: "Къде е картината? ___ (нет)", answer: "Няма я", hint: ETO_HINT_F, rule: NYAMAGO_RULE },
  { q: "Къде е огледалото? ___ (нет)", answer: "Няма го", hint: ETO_HINT_M, rule: NYAMAGO_RULE },
  { q: "Къде е телефонът? ___ (нет)", answer: "Няма го", hint: ETO_HINT_M, rule: NYAMAGO_RULE },
  { q: "Къде е компютърът? ___ (нет)", answer: "Няма го", hint: ETO_HINT_M, rule: NYAMAGO_RULE },
  { q: "Къде е телевизорът? ___ (нет)", answer: "Няма го", hint: ETO_HINT_M, rule: NYAMAGO_RULE },
  { q: "Къде е цветето? ___ (нет)", answer: "Няма го", hint: ETO_HINT_M, rule: NYAMAGO_RULE },
  { q: "Къде е масата? ___ (нет)", answer: "Няма я", hint: ETO_HINT_F, rule: NYAMAGO_RULE },
  { q: "Къде е стаята? ___ (нет)", answer: "Няма я", hint: ETO_HINT_F, rule: NYAMAGO_RULE },
  { q: "Къде е лампата? ___ (нет)", answer: "Няма я", hint: ETO_HINT_F, rule: NYAMAGO_RULE },
  { q: "Къде е химикалката? ___ (нет)", answer: "Няма я", hint: ETO_HINT_F, rule: NYAMAGO_RULE },
  { q: "Къде са книгите? ___ (нет)", answer: "Няма ги", hint: ETO_HINT_PL, rule: NYAMAGO_RULE },
  { q: "Къде са моливите? ___ (нет)", answer: "Няма ги", hint: ETO_HINT_PL, rule: NYAMAGO_RULE },
  { q: "Къде са картините? ___ (нет)", answer: "Няма ги", hint: ETO_HINT_PL, rule: NYAMAGO_RULE },
];
export const NYAMA_GO_OPTIONS = ["Няма го", "Няма я", "Няма ги"];

const SPACE_RULE: Localized<string> = {
  ru: "Наречия места: горе (вверху), долу (внизу), дясно (справа), ляво (слева); стороны света: север/юг/изток/запад.",
  uk: "Прислівники місця: горе (вгорі), долу (внизу), дясно (справа), ляво (зліва); сторони світу: север/юг/изток/запад.",
};
const SPACE_HINT: Localized<string> = { ru: "направление / сторона", uk: "напрямок / сторона" };
export const DATA_SPACE: DataItem[] = [
  { q: "вверху / вгорі", answer: "горе", hint: SPACE_HINT, rule: SPACE_RULE, decoys: ["долу", "дясно", "ляво"] },
  { q: "внизу", answer: "долу", hint: SPACE_HINT, rule: SPACE_RULE, decoys: ["горе", "дясно", "ляво"] },
  { q: "справа / справа", answer: "дясно", hint: SPACE_HINT, rule: SPACE_RULE, decoys: ["ляво", "горе", "долу"] },
  { q: "слева / зліва", answer: "ляво", hint: SPACE_HINT, rule: SPACE_RULE, decoys: ["дясно", "горе", "долу"] },
  { q: "сверху (откуда)", answer: "отгоре", hint: SPACE_HINT, rule: SPACE_RULE, decoys: ["отдолу", "отдясно", "отляво"] },
  { q: "снизу (откуда)", answer: "отдолу", hint: SPACE_HINT, rule: SPACE_RULE, decoys: ["отгоре", "отдясно", "отляво"] },
  { q: "справа (откуда)", answer: "отдясно", hint: SPACE_HINT, rule: SPACE_RULE, decoys: ["отляво", "отгоре", "отдолу"] },
  { q: "слева (откуда)", answer: "отляво", hint: SPACE_HINT, rule: SPACE_RULE, decoys: ["отдясно", "отгоре", "отдолу"] },
  { q: "север", answer: "север", hint: { ru: "сторона света", uk: "сторона світу" }, rule: SPACE_RULE, decoys: ["юг", "изток", "запад"] },
  { q: "юг", answer: "юг", hint: { ru: "сторона света", uk: "сторона світу" }, rule: SPACE_RULE, decoys: ["север", "изток", "запад"] },
  { q: "восток / схід", answer: "изток", hint: { ru: "сторона света", uk: "сторона світу" }, rule: SPACE_RULE, decoys: ["запад", "север", "юг"] },
  { q: "запад / захід", answer: "запад", hint: { ru: "сторона света", uk: "сторона світу" }, rule: SPACE_RULE, decoys: ["изток", "север", "юг"] },
];

const PRONOUNS_L2: string[] = ["Аз", "Ти", "Той", "Ние", "Вие", "Те"];
export const DATA_PARADIGM_POSSESS: ParadigmItem[] = [
  { verb: "мой (м.р. полн.)", pronouns: PRONOUNS_L2, forms: ["моят", "твоят", "неговият", "нашият", "вашият", "техният"], hint: { ru: "полная м.р.", uk: "повна ч.р." }, rule: POSS_FULL_RULE },
  { verb: "мой (ж.р. полн.)", pronouns: PRONOUNS_L2, forms: ["моята", "твоята", "неговата", "нашата", "вашата", "тяхната"], hint: { ru: "полная ж.р.", uk: "повна ж.р." }, rule: POSS_FULL_RULE },
  { verb: "мой (ср.р. полн.)", pronouns: PRONOUNS_L2, forms: ["моето", "твоето", "неговото", "нашето", "вашето", "тяхното"], hint: { ru: "полная ср.р.", uk: "повна с.р." }, rule: POSS_FULL_RULE },
  { verb: "мой (мн.ч. полн.)", pronouns: PRONOUNS_L2, forms: ["моите", "твоите", "неговите", "нашите", "вашите", "техните"], hint: { ru: "полная мн.ч.", uk: "повна мн." }, rule: POSS_FULL_RULE },
];

const PRON_ACC_RULE: Localized<string> = {
  ru: "Краткая форма винительного: аз→ме, ти→те, той/то→го, тя→я, ние→ни, вие→ви, те→ги.",
  uk: "Коротка форма знахідного: аз→ме, ти→те, той/то→го, тя→я, ние→ни, вие→ви, те→ги.",
};
const PRON_ACC_HINT: Localized<string> = { ru: "винительный краткий", uk: "знахідний короткий" };
export const DATA_PRONOUN_ACC: DataItem[] = [
  { q: "аз → …", answer: "ме", hint: PRON_ACC_HINT, rule: PRON_ACC_RULE, decoys: ["те", "го", "я"] },
  { q: "ти → …", answer: "те", hint: PRON_ACC_HINT, rule: PRON_ACC_RULE, decoys: ["ме", "го", "ги"] },
  { q: "той → …", answer: "го", hint: PRON_ACC_HINT, rule: PRON_ACC_RULE, decoys: ["я", "ме", "ги"] },
  { q: "тя → …", answer: "я", hint: PRON_ACC_HINT, rule: PRON_ACC_RULE, decoys: ["го", "ги", "те"] },
  { q: "то → …", answer: "го", hint: PRON_ACC_HINT, rule: PRON_ACC_RULE, decoys: ["я", "ги", "ни"] },
  { q: "ние → …", answer: "ни", hint: PRON_ACC_HINT, rule: PRON_ACC_RULE, decoys: ["ви", "ги", "ме"] },
  { q: "вие → …", answer: "ви", hint: PRON_ACC_HINT, rule: PRON_ACC_RULE, decoys: ["ни", "ги", "те"] },
  { q: "те → …", answer: "ги", hint: PRON_ACC_HINT, rule: PRON_ACC_RULE, decoys: ["ни", "ви", "я"] },
  { q: "Разбираш ___ (мен).", answer: "ме", hint: { ru: "меня", uk: "мене" }, rule: PRON_ACC_RULE, decoys: ["те", "го", "ни"] },
  { q: "Обичам ___ (теб).", answer: "те", hint: { ru: "тебя", uk: "тебе" }, rule: PRON_ACC_RULE, decoys: ["ме", "ви", "ги"] },
  { q: "Виждам ___ (него).", answer: "го", hint: { ru: "его", uk: "його" }, rule: PRON_ACC_RULE, decoys: ["я", "ги", "ме"] },
  { q: "Чуваш ли ___ (нея)?", answer: "я", hint: { ru: "её", uk: "її" }, rule: PRON_ACC_RULE, decoys: ["го", "те", "ги"] },
  { q: "Познаваш ли ___ (тях)?", answer: "ги", hint: { ru: "их", uk: "їх" }, rule: PRON_ACC_RULE, decoys: ["го", "я", "ни"] },
  { q: "Чакам ___ (теб).", answer: "те", hint: { ru: "тебя", uk: "тебе" }, rule: PRON_ACC_RULE, decoys: ["ме", "ви", "ги"] },
  { q: "Виждаш ли ___ (мен)?", answer: "ме", hint: { ru: "меня", uk: "мене" }, rule: PRON_ACC_RULE, decoys: ["те", "го", "ни"] },
  { q: "Той чете ___ (книгата).", answer: "я", hint: { ru: "её (ж.р.)", uk: "її (ж.р.)" }, rule: PRON_ACC_RULE, decoys: ["го", "ги", "те"] },
  { q: "Тя обича ___ (нас).", answer: "ни", hint: { ru: "нас", uk: "нас" }, rule: PRON_ACC_RULE, decoys: ["ви", "ги", "ме"] },
  { q: "Чувам ___ (вас).", answer: "ви", hint: { ru: "вас", uk: "вас" }, rule: PRON_ACC_RULE, decoys: ["ни", "ги", "те"] },
  { q: "Виждам ___ (книгата).", answer: "я", hint: { ru: "её (ж.р.)", uk: "її (ж.р.)" }, rule: PRON_ACC_RULE, decoys: ["го", "ги", "те"] },
  { q: "Знам ___ (тях).", answer: "ги", hint: { ru: "их", uk: "їх" }, rule: PRON_ACC_RULE, decoys: ["го", "я", "ви"] },
];

const KOLKO_RULE: Localized<string> = {
  ru: "«колко» — сколько (количество); «къде» — где (место).",
  uk: "«колко» — скільки (кількість); «къде» — де (місце).",
};
export const DATA_KOLKO_KUDE: DataItem[] = [
  { q: "___ легла има в стаята?", answer: "колко", hint: { ru: "сколько", uk: "скільки" }, rule: KOLKO_RULE },
  { q: "___ е масата?", answer: "къде", hint: { ru: "где", uk: "де" }, rule: KOLKO_RULE },
  { q: "___ стола има тук?", answer: "колко", hint: { ru: "сколько", uk: "скільки" }, rule: KOLKO_RULE },
  { q: "___ са моите книги?", answer: "къде", hint: { ru: "где", uk: "де" }, rule: KOLKO_RULE },
  { q: "___ прозореца има стаята?", answer: "колко", hint: { ru: "сколько", uk: "скільки" }, rule: KOLKO_RULE },
  { q: "___ е лаптопът?", answer: "къде", hint: { ru: "где", uk: "де" }, rule: KOLKO_RULE },
  { q: "___ картини има на стената?", answer: "колко", hint: { ru: "сколько", uk: "скільки" }, rule: KOLKO_RULE },
  { q: "___ е котката?", answer: "къде", hint: { ru: "где", uk: "де" }, rule: KOLKO_RULE },
  { q: "___ цветя има на прозореца?", answer: "колко", hint: { ru: "сколько", uk: "скільки" }, rule: KOLKO_RULE },
  { q: "___ са дрехите?", answer: "къде", hint: { ru: "где", uk: "де" }, rule: KOLKO_RULE },
  { q: "___ маси има в стаята?", answer: "колко", hint: { ru: "сколько", uk: "скільки" }, rule: KOLKO_RULE },
  { q: "___ е телефонът?", answer: "къде", hint: { ru: "где", uk: "де" }, rule: KOLKO_RULE },
  { q: "___ врати има стаята?", answer: "колко", hint: { ru: "сколько", uk: "скільки" }, rule: KOLKO_RULE },
  { q: "___ е огледалото?", answer: "къде", hint: { ru: "где", uk: "де" }, rule: KOLKO_RULE },
  { q: "___ лампи има тук?", answer: "колко", hint: { ru: "сколько", uk: "скільки" }, rule: KOLKO_RULE },
  { q: "___ е твоята чанта?", answer: "къде", hint: { ru: "где", uk: "де" }, rule: KOLKO_RULE },
  { q: "___ книги има в секцията?", answer: "колко", hint: { ru: "сколько", uk: "скільки" }, rule: KOLKO_RULE },
  { q: "___ са нашите тетрадки?", answer: "къде", hint: { ru: "где", uk: "де" }, rule: KOLKO_RULE },
  { q: "___ моливи има на бюрото?", answer: "колко", hint: { ru: "сколько", uk: "скільки" }, rule: KOLKO_RULE },
  { q: "___ е телевизорът?", answer: "къде", hint: { ru: "где", uk: "де" }, rule: KOLKO_RULE },
];
export const KOLKO_KUDE_OPTIONS = ["колко", "къде"];

const ROOM_PL_RULE: Localized<string> = {
  ru: "Мн.ч. предметов комнаты: м.р. -ове/-и, ж.р. -и, ср.р. -а/-та; цвете → цветя (исключение).",
  uk: "Мн. предметів кімнати: ч.р. -ове/-и, ж.р. -и, с.р. -а/-та; цвете → цветя (виняток).",
};
const HINT_ROOM_PL: Localized<string> = { ru: "образуй мн.ч. предмета", uk: "утвори мн. предмета" };
export const DATA_ROOM_PLURAL: DataItem[] = [
  { q: "стая", answer: "стаи", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["стаите", "стая", "стаята"] },
  { q: "стол", answer: "столове", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["столи", "стола", "стол"] },
  { q: "прозорец", answer: "прозорци", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["прозорецове", "прозорец", "прозорецат"] },
  { q: "маса", answer: "маси", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["масове", "масе", "маса"] },
  { q: "легло", answer: "легла", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["леглета", "леглоси", "леглото"] },
  { q: "огледало", answer: "огледала", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["огледалета", "огледалото", "огледали"] },
  { q: "бюро", answer: "бюра", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["бюроета", "бюрото", "бюри"] },
  { q: "врата", answer: "врати", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["врати́те", "врата", "вратове"] },
  { q: "шкаф", answer: "шкафове", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["шкафи", "шкафе", "шкаф"] },
  { q: "картина", answer: "картини", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["картинета", "картини́те", "картина"] },
  { q: "телефон", answer: "телефони", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["телефонове", "телефоне", "телефон"] },
  { q: "килим", answer: "килими", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["килимове", "килимете", "килим"] },
  { q: "цвете", answer: "цветя", hint: { ru: "исключение: цвете → цветя", uk: "виняток: цвете → цветя" }, rule: ROOM_PL_RULE, decoys: ["цветета", "цвети", "цветата"] },
  { q: "стена", answer: "стени", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["стенове", "стенете", "стена"] },
  { q: "диван", answer: "дивани", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["диванове", "диване", "диван"] },
  { q: "телевизор", answer: "телевизори", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["телевизорове", "телевизор", "телевизоре"] },
  { q: "молив", answer: "моливи", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["моливове", "молива", "молив"] },
  { q: "тетрадка", answer: "тетрадки", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["тетрадка", "тетрадките", "тетрадкове"] },
  { q: "химикалка", answer: "химикалки", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["химикалка", "химикалките", "химикалкове"] },
  { q: "книга", answer: "книги", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["книгета", "книги́те", "книга"] },
  { q: "чанта", answer: "чанти", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["чанта", "чантите", "чантове"] },
  { q: "лампа", answer: "лампи", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["лампа", "лампите", "лампове"] },
  { q: "компютър", answer: "компютри", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["компютърове", "компютъра", "компютър"] },
  { q: "лаптоп", answer: "лаптопи", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["лаптопове", "лаптопа", "лаптоп"] },
  { q: "шише", answer: "шишета", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["шишеи", "шише", "шишетата"] },
  { q: "речник", answer: "речници", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["речникове", "речника", "речник"] },
  { q: "китара", answer: "китари", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["китара", "китарите", "китарове"] },
  { q: "под", answer: "подове", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["поди", "пода", "под"] },
  { q: "таван", answer: "тавани", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["таванове", "тавана", "таван"] },
  { q: "секция", answer: "секции", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["секция", "секциите", "секциове"] },
  { q: "гардероб", answer: "гардероби", hint: HINT_ROOM_PL, rule: ROOM_PL_RULE, decoys: ["гардеробове", "гардероба", "гардероб"] },
];

const HINT_POSSESS_PAIR: Localized<string> = { ru: "местоимение ↔ притяжательное (м.р.)", uk: "займенник ↔ присвійне (ч.р.)" };
export const DATA_MATCH_POSSESS: MatchItem[] = [
  { left: "аз", right: "мой", hint: HINT_POSSESS_PAIR },
  { left: "ти", right: "твой", hint: HINT_POSSESS_PAIR },
  { left: "той", right: "негов", hint: HINT_POSSESS_PAIR },
  { left: "тя", right: "неин", hint: HINT_POSSESS_PAIR },
  { left: "ние", right: "наш", hint: HINT_POSSESS_PAIR },
  { left: "вие", right: "ваш", hint: HINT_POSSESS_PAIR },
  { left: "те", right: "техен", hint: HINT_POSSESS_PAIR },
];

const HINT_ART_PAIR: Localized<string> = { ru: "слово ↔ с определ. артиклем", uk: "слово ↔ з означ. артиклем" };
export const DATA_MATCH_ARTICLE_ROOM: MatchItem[] = [
  { left: "стол", right: "столът", hint: HINT_ART_PAIR },
  { left: "стая", right: "стаята", hint: HINT_ART_PAIR },
  { left: "легло", right: "леглото", hint: HINT_ART_PAIR },
  { left: "книга", right: "книгата", hint: HINT_ART_PAIR },
  { left: "прозорец", right: "прозорецът", hint: HINT_ART_PAIR },
  { left: "бюро", right: "бюрото", hint: HINT_ART_PAIR },
  { left: "огледало", right: "огледалото", hint: HINT_ART_PAIR },
  { left: "компютър", right: "компютърът", hint: HINT_ART_PAIR },
  { left: "маса", right: "масата", hint: HINT_ART_PAIR },
  { left: "телефон", right: "телефонът", hint: HINT_ART_PAIR },
  { left: "килим", right: "килимът", hint: HINT_ART_PAIR },
  { left: "врата", right: "вратата", hint: HINT_ART_PAIR },
  { left: "под", right: "подът", hint: HINT_ART_PAIR },
  { left: "стена", right: "стената", hint: HINT_ART_PAIR },
  { left: "цвете", right: "цветето", hint: HINT_ART_PAIR },
  { left: "шкаф", right: "шкафът", hint: HINT_ART_PAIR },
  { left: "картина", right: "картината", hint: HINT_ART_PAIR },
  { left: "лампа", right: "лампата", hint: HINT_ART_PAIR },
  { left: "молив", right: "моливът", hint: HINT_ART_PAIR },
  { left: "тетрадка", right: "тетрадката", hint: HINT_ART_PAIR },
];

const ODD_L2_GENDER_M: Localized<string> = { ru: "одно слово — не м.р.", uk: "одне слово — не ч.р." };
const ODD_L2_GENDER_F: Localized<string> = { ru: "одно слово — не ж.р.", uk: "одне слово — не ж.р." };
const ODD_L2_GENDER_N: Localized<string> = { ru: "одно слово — не ср.р.", uk: "одне слово — не с.р." };
const ODD_L2_NOT_ADJ: Localized<string> = { ru: "одно — не прилагательное", uk: "одне — не прикметник" };
const ODD_L2_NOT_PREP: Localized<string> = { ru: "одно — не предлог места", uk: "одне — не прийменник місця" };
const ODD_L2_NOT_DIR: Localized<string> = { ru: "одно — не направление", uk: "одне — не напрямок" };
const ODD_L2_NOT_NUM: Localized<string> = { ru: "одно — не числительное 2–10", uk: "одне — не числівник 2–10" };
const ODD_L2_GENDER_AGREE_M: Localized<string> = { ru: "одно — не согласовано с м.р.", uk: "одне — не узгоджене з ч.р." };
export const DATA_ODD_L2: OddItem[] = [
  { words: ["стол", "прозорец", "телефон", "стая"], odd: "стая", hint: ODD_L2_GENDER_M },
  { words: ["стая", "маса", "врата", "легло"], odd: "легло", hint: ODD_L2_GENDER_F },
  { words: ["легло", "бюро", "огледало", "стол"], odd: "стол", hint: ODD_L2_GENDER_N },
  { words: ["хубав", "грозен", "чист", "стая"], odd: "стая", hint: ODD_L2_NOT_ADJ },
  { words: ["светъл", "тъмен", "голям", "прозорец"], odd: "прозорец", hint: ODD_L2_NOT_ADJ },
  { words: ["на", "под", "над", "стол"], odd: "стол", hint: ODD_L2_NOT_PREP },
  { words: ["до", "между", "зад", "хубав"], odd: "хубав", hint: ODD_L2_NOT_PREP },
  { words: ["север", "юг", "изток", "горе"], odd: "горе", hint: ODD_L2_NOT_DIR },
  { words: ["горе", "долу", "дясно", "юг"], odd: "юг", hint: ODD_L2_NOT_DIR },
  { words: ["две", "три", "пет", "един"], odd: "един", hint: ODD_L2_NOT_NUM },
  { words: ["четири", "шест", "осем", "едно"], odd: "едно", hint: ODD_L2_NOT_NUM },
  { words: ["хубав", "голям", "малък", "хубава"], odd: "хубава", hint: ODD_L2_GENDER_AGREE_M },
  { words: ["моят", "твоят", "нашият", "нейната"], odd: "нейната", hint: ODD_L2_GENDER_AGREE_M },
  { words: ["моето", "твоето", "нашето", "вашата"], odd: "вашата", hint: { ru: "одно — не ср.р.", uk: "одне — не с.р." } },
  { words: ["един", "една", "едно", "двама"], odd: "двама", hint: { ru: "одно — не форма «один»", uk: "одне — не форма «один»" } },
  { words: ["шкаф", "килим", "компютър", "маса"], odd: "маса", hint: ODD_L2_GENDER_M },
  { words: ["картина", "лампа", "тетрадка", "молив"], odd: "молив", hint: ODD_L2_GENDER_F },
  { words: ["огледало", "цвете", "шише", "стена"], odd: "стена", hint: ODD_L2_GENDER_N },
  { words: ["мръсен", "разхвърлян", "тъмен", "стол"], odd: "стол", hint: ODD_L2_NOT_ADJ },
  { words: ["чист", "подреден", "просторен", "легло"], odd: "легло", hint: ODD_L2_NOT_ADJ },
  { words: ["в", "пред", "срещу", "стая"], odd: "стая", hint: ODD_L2_NOT_PREP },
  { words: ["на", "до", "над", "цвете"], odd: "цвете", hint: ODD_L2_NOT_PREP },
  { words: ["север", "запад", "изток", "ляво"], odd: "ляво", hint: ODD_L2_NOT_DIR },
  { words: ["горе", "долу", "ляво", "север"], odd: "север", hint: ODD_L2_NOT_DIR },
  { words: ["две", "седем", "девет", "една"], odd: "една", hint: ODD_L2_NOT_NUM },
  { words: ["три", "пет", "десет", "едно"], odd: "едно", hint: ODD_L2_NOT_NUM },
  { words: ["голям", "светъл", "малък", "голяма"], odd: "голяма", hint: ODD_L2_GENDER_AGREE_M },
  { words: ["твоят", "неговият", "вашият", "моята"], odd: "моята", hint: ODD_L2_GENDER_AGREE_M },
  { words: ["моята", "твоята", "нашата", "неговото"], odd: "неговото", hint: { ru: "одно — не ж.р.", uk: "одне — не ж.р." } },
  { words: ["стая", "врата", "стена", "цвете"], odd: "цвете", hint: ODD_L2_GENDER_F },
];

export const DATA_ROOM_BUILD: BuildItem[] = [
  { words: ["На", "бюрото", "е", "моят", "компютър"], translation: { ru: "На столе мой компьютер.", uk: "На столі мій комп'ютер." } },
  { words: ["Над", "леглото", "има", "красива", "картина"], translation: { ru: "Над кроватью — красивая картина.", uk: "Над ліжком — гарна картина." } },
  { words: ["В", "секцията", "има", "много", "книги"], translation: { ru: "В секции много книг.", uk: "У секції багато книг." } },
  { words: ["На", "пода", "има", "малък", "килим"], translation: { ru: "На полу маленький ковёр.", uk: "На підлозі маленький килим." } },
  { words: ["Стаята", "е", "южна", "и", "светла"], translation: { ru: "Комната южная и светлая.", uk: "Кімната південна та світла." } },
  { words: ["Прозорецът", "е", "много", "голям"], translation: { ru: "Окно очень большое.", uk: "Вікно дуже велике." } },
  { words: ["Моята", "стая", "е", "чиста", "и", "подредена"], translation: { ru: "Моя комната чистая и прибранная.", uk: "Моя кімната чиста та прибрана." } },
  { words: ["В", "стаята", "има", "две", "легла"], translation: { ru: "В комнате две кровати.", uk: "У кімнаті два ліжка." } },
  { words: ["До", "прозореца", "има", "голямо", "бюро"], translation: { ru: "У окна большой стол.", uk: "Біля вікна великий стіл." } },
  { words: ["Тя", "е", "северна", "но", "светла"], translation: { ru: "Она северная, но светлая.", uk: "Вона північна, але світла." } },
  { words: ["Под", "масата", "има", "котка"], translation: { ru: "Под столом кошка.", uk: "Під столом кішка." } },
  { words: ["В", "чантата", "има", "молив"], translation: { ru: "В сумке карандаш.", uk: "У сумці олівець." } },
  { words: ["На", "стената", "има", "огледало"], translation: { ru: "На стене зеркало.", uk: "На стіні дзеркало." } },
  { words: ["Между", "леглата", "има", "шкаф"], translation: { ru: "Между кроватями шкаф.", uk: "Між ліжками шафа." } },
  { words: ["Моят", "лаптоп", "е", "на", "бюрото"], translation: { ru: "Мой ноутбук на столе.", uk: "Мій ноутбук на столі." } },
  { words: ["В", "стаята", "няма", "телевизор"], translation: { ru: "В комнате нет телевизора.", uk: "У кімнаті немає телевізора." } },
  { words: ["Прозорецът", "е", "до", "леглото"], translation: { ru: "Окно рядом с кроватью.", uk: "Вікно поряд з ліжком." } },
  { words: ["Това", "е", "моята", "стая"], translation: { ru: "Это моя комната.", uk: "Це моя кімната." } },
  { words: ["Къде", "е", "моят", "лаптоп"], translation: { ru: "Где мой ноутбук?", uk: "Де мій ноутбук?" } },
  { words: ["В", "секцията", "има", "три", "книги"], translation: { ru: "В секции три книги.", uk: "У секції три книги." } },
];

const HINT_ROOM: Localized<string> = { ru: "предмет комнаты", uk: "предмет кімнати" };
export const DATA_ROOM: DataItem[] = [
  { q: "комната / кімната", answer: "стая", hint: HINT_ROOM, decoys: ["врата", "стена", "под"] },
  { q: "дверь / двері", answer: "врата", hint: HINT_ROOM, decoys: ["стена", "стая", "прозорец"] },
  { q: "стена / стіна", answer: "стена", hint: HINT_ROOM, decoys: ["врата", "под", "таван"] },
  { q: "пол / підлога", answer: "под", hint: HINT_ROOM, decoys: ["стена", "таван", "килим"] },
  { q: "зеркало / дзеркало", answer: "огледало", hint: HINT_ROOM, decoys: ["картина", "прозорец", "стена"] },
  { q: "ковёр / килим", answer: "килим", hint: HINT_ROOM, decoys: ["под", "легло", "маса"] },
  { q: "окно / вікно", answer: "прозорец", hint: HINT_ROOM, decoys: ["врата", "огледало", "картина"] },
  { q: "цветок / квітка", answer: "цвете", hint: HINT_ROOM, decoys: ["картина", "огледало", "маса"] },
  { q: "стул / стілець", answer: "стол", hint: HINT_ROOM, decoys: ["маса", "легло", "шкаф"] },
  { q: "стол (мебель) / стіл", answer: "маса", hint: HINT_ROOM, decoys: ["стол", "бюро", "шкаф"] },
  { q: "кровать / ліжко", answer: "легло", hint: HINT_ROOM, decoys: ["стол", "маса", "диван"] },
  { q: "шкаф / шафа", answer: "гардероб", hint: HINT_ROOM, decoys: ["бюро", "секция", "легло"] },
  { q: "компьютер / комп'ютер", answer: "компютър", hint: HINT_ROOM, decoys: ["телевизор", "лаптоп", "телефон"] },
  { q: "картина", answer: "картина", hint: HINT_ROOM, decoys: ["огледало", "стена", "прозорец"] },
  { q: "телевизор", answer: "телевизор", hint: HINT_ROOM, decoys: ["компютър", "телефон", "лаптоп"] },
  { q: "письменный стол / письмовий стіл", answer: "бюро", hint: HINT_ROOM, decoys: ["маса", "стол", "шкаф"] },
  { q: "лампа", answer: "лампа", hint: HINT_ROOM, decoys: ["картина", "огледало", "стена"] },
  { q: "телефон", answer: "телефон", hint: HINT_ROOM, decoys: ["телевизор", "лаптоп", "компютър"] },
  { q: "ноутбук", answer: "лаптоп", hint: HINT_ROOM, decoys: ["компютър", "телефон", "телевизор"] },
  { q: "диван", answer: "диван", hint: HINT_ROOM, decoys: ["легло", "стол", "маса"] },
  { q: "потолок / стеля", answer: "таван", hint: HINT_ROOM, decoys: ["под", "стена", "врата"] },
  { q: "секция / секція", answer: "секция", hint: HINT_ROOM, decoys: ["гардероб", "шкаф", "бюро"] },
  { q: "сумка / сумка", answer: "чанта", hint: HINT_ROOM, decoys: ["шкаф", "секция", "тетрадка"] },
  { q: "тетрадь / зошит", answer: "тетрадка", hint: HINT_ROOM, decoys: ["книга", "речник", "химикалка"] },
  { q: "книга", answer: "книга", hint: HINT_ROOM, decoys: ["тетрадка", "речник", "молив"] },
  { q: "карандаш / олівець", answer: "молив", hint: HINT_ROOM, decoys: ["химикалка", "речник", "тетрадка"] },
  { q: "ручка / ручка", answer: "химикалка", hint: HINT_ROOM, decoys: ["молив", "тетрадка", "книга"] },
  { q: "словарь / словник", answer: "речник", hint: HINT_ROOM, decoys: ["книга", "тетрадка", "молив"] },
  { q: "одежда / одяг", answer: "дрехи", hint: HINT_ROOM, decoys: ["обувки", "чанта", "книги"] },
  { q: "бутылка / пляшка", answer: "шише", hint: HINT_ROOM, decoys: ["чаша", "лампа", "огледало"] },
  { q: "чашка / чашка", answer: "чаша", hint: HINT_ROOM, decoys: ["шише", "лампа", "картина"] },
];

