import type { FrameData } from "../types";
import type { Localized } from "../i18n/types";

// FR-FRAME: one sentence-production drill per lesson.
//
// Every Bulgarian word here must already be known to the learner: it has to occur
// in the data of some mode registered in this lesson or an earlier one. That is not
// a convention to remember but an assertion — `node scripts/check-lesson-lexicon.mjs`
// rebuilds the cumulative lexicon from the code and fails on any stranger.
//
// Role labels name the job a word does, never the word itself. "возвратная частица"
// is a role; "частица «се»" would be the answer.

const WHO: Localized<string> = { ru: "кто", uk: "хто" };
const WHO_PL: Localized<string> = { ru: "кто они", uk: "хто вони" };
const LINK: Localized<string> = { ru: "связка", uk: "зв'язка" };
const DOES: Localized<string> = { ru: "что делает", uk: "що робить" };
const DO_I: Localized<string> = { ru: "что делаю", uk: "що роблю" };
const DO_WE: Localized<string> = { ru: "что делаем", uk: "що робимо" };
const JOB: Localized<string> = { ru: "профессия", uk: "професія" };
const PREP: Localized<string> = { ru: "предлог", uk: "прийменник" };
const COUNTRY: Localized<string> = { ru: "страна", uk: "країна" };
const LANG: Localized<string> = { ru: "язык", uk: "мова" };
const NEG: Localized<string> = { ru: "отрицание", uk: "заперечення" };
const REFL: Localized<string> = { ru: "возвратная частица", uk: "зворотна частка" };
const NAME: Localized<string> = { ru: "имя", uk: "ім'я" };
const WHAT: Localized<string> = { ru: "что", uk: "що" };
const WHERE: Localized<string> = { ru: "где", uk: "де" };
const WHITHER: Localized<string> = { ru: "куда", uk: "куди" };
const WHICH: Localized<string> = { ru: "какой", uk: "який" };
const WHOSE: Localized<string> = { ru: "чей", uk: "чий" };
const WHEN: Localized<string> = { ru: "когда", uk: "коли" };
const HOW_MANY: Localized<string> = { ru: "сколько", uk: "скільки" };
const HOW_OFTEN: Localized<string> = { ru: "как часто", uk: "як часто" };
const EXIST: Localized<string> = { ru: "есть или нет", uk: "є чи немає" };
const THIS: Localized<string> = { ru: "это", uk: "це" };
const PARTICLE: Localized<string> = { ru: "частица", uk: "частка" };
const Q_PARTICLE: Localized<string> = { ru: "частица вопроса", uk: "частка питання" };
const VERB: Localized<string> = { ru: "глагол", uk: "дієслово" };
const MODAL: Localized<string> = { ru: "модальный глагол", uk: "модальне дієслово" };
const CMD: Localized<string> = { ru: "команда", uk: "команда" };
const DIR: Localized<string> = { ru: "направление", uk: "напрямок" };
const TO_WHOM: Localized<string> = { ru: "кому", uk: "кому" };
const PARTICIPLE: Localized<string> = { ru: "причастие", uk: "дієприкметник" };
const DEGREE: Localized<string> = { ru: "степень сравнения", uk: "ступінь порівняння" };
const COLOR: Localized<string> = { ru: "цвет", uk: "колір" };
const ORD: Localized<string> = { ru: "порядковое", uk: "порядкове" };
const STATE: Localized<string> = { ru: "состояние", uk: "стан" };

export const FRAME_L1: FrameData = {
  step: 1,
  bank: [
    "аз", "ти", "той", "тя", "ние", "вие", "те",
    "съм", "си", "е", "сме", "сте", "са",
    "не", "се", "от",
    "имам", "има", "знам", "знае", "разбирам", "разбират",
    "говорим", "говориш", "казва", "казвам",
    "студент", "студентка", "учител", "лекар", "приятел", "приятели",
    "книга", "България", "Германия", "немски", "руски", "Иван", "Мария",
  ],
  items: [
    { translation: { ru: "Я студент.", uk: "Я студент." },
      slots: [{ role: WHO, word: "аз" }, { role: LINK, word: "съм" }, { role: JOB, word: "студент" }] },
    { translation: { ru: "Она из Болгарии.", uk: "Вона з Болгарії." },
      slots: [{ role: WHO, word: "тя" }, { role: LINK, word: "е" }, { role: PREP, word: "от" }, { role: COUNTRY, word: "България" }] },
    { translation: { ru: "Мы говорим по-немецки.", uk: "Ми розмовляємо німецькою." },
      slots: [{ role: WHO, word: "ние" }, { role: DO_WE, word: "говорим" }, { role: LANG, word: "немски" }] },
    { translation: { ru: "Ты не учитель.", uk: "Ти не вчитель." },
      slots: [{ role: WHO, word: "ти" }, { role: NEG, word: "не" }, { role: LINK, word: "си" }, { role: JOB, word: "учител" }] },
    { translation: { ru: "У меня есть книга.", uk: "У мене є книжка." },
      slots: [{ role: WHO, word: "аз" }, { role: DO_I, word: "имам" }, { role: WHAT, word: "книга" }] },
    { translation: { ru: "Его зовут Иван.", uk: "Його звати Іван." },
      slots: [{ role: WHO, word: "той" }, { role: REFL, word: "се" }, { role: DOES, word: "казва" }, { role: NAME, word: "Иван" }] },
    { translation: { ru: "Они не понимают.", uk: "Вони не розуміють." },
      slots: [{ role: WHO, word: "те" }, { role: NEG, word: "не" }, { role: DOES, word: "разбират" }] },
    { translation: { ru: "Я не знаю.", uk: "Я не знаю." },
      slots: [{ role: WHO, word: "аз" }, { role: NEG, word: "не" }, { role: DO_I, word: "знам" }] },
    { translation: { ru: "Мы друзья.", uk: "Ми друзі." },
      slots: [{ role: WHO, word: "ние" }, { role: LINK, word: "сме" }, { role: WHO_PL, word: "приятели" }] },
    { translation: { ru: "Вы врач.", uk: "Ви лікар." },
      slots: [{ role: WHO, word: "вие" }, { role: LINK, word: "сте" }, { role: JOB, word: "лекар" }] },
  ],
};

export const FRAME_L2: FrameData = {
  step: 1,
  bank: [
    "аз", "ти", "той", "тя", "това",
    "съм", "е", "са", "има", "няма",
    "в", "на", "до", "тук",
    "маса", "масата", "стол", "столът", "книга", "книгата", "книги",
    "стая", "стаята", "прозорецът", "вратата",
    "моят", "моята", "моите",
    "голям", "голяма", "голямо", "две", "три",
  ],
  items: [
    { translation: { ru: "Здесь есть стол.", uk: "Тут є стіл." },
      slots: [{ role: WHERE, word: "тук" }, { role: EXIST, word: "има" }, { role: WHAT, word: "маса" }] },
    { translation: { ru: "Книга на столе.", uk: "Книжка на столі." },
      slots: [{ role: WHAT, word: "книгата" }, { role: LINK, word: "е" }, { role: PREP, word: "на" }, { role: WHERE, word: "масата" }] },
    { translation: { ru: "Моя комната большая.", uk: "Моя кімната велика." },
      slots: [{ role: WHOSE, word: "моята" }, { role: WHAT, word: "стая" }, { role: LINK, word: "е" }, { role: WHICH, word: "голяма" }] },
    { translation: { ru: "Здесь нет стула.", uk: "Тут немає стільця." },
      slots: [{ role: WHERE, word: "тук" }, { role: EXIST, word: "няма" }, { role: WHAT, word: "стол" }] },
    { translation: { ru: "Стул возле двери.", uk: "Стілець біля дверей." },
      slots: [{ role: WHAT, word: "столът" }, { role: LINK, word: "е" }, { role: PREP, word: "до" }, { role: WHERE, word: "вратата" }] },
    { translation: { ru: "Это мои книги.", uk: "Це мої книжки." },
      slots: [{ role: THIS, word: "това" }, { role: LINK, word: "са" }, { role: WHOSE, word: "моите" }, { role: WHAT, word: "книги" }] },
    { translation: { ru: "Окно большое.", uk: "Вікно велике." },
      slots: [{ role: WHAT, word: "прозорецът" }, { role: LINK, word: "е" }, { role: WHICH, word: "голям" }] },
    { translation: { ru: "В комнате две книги.", uk: "У кімнаті дві книжки." },
      slots: [{ role: PREP, word: "в" }, { role: WHERE, word: "стаята" }, { role: EXIST, word: "има" }, { role: HOW_MANY, word: "две" }, { role: WHAT, word: "книги" }] },
  ],
};

export const FRAME_L3: FrameData = {
  step: 2,
  bank: [
    "аз", "ние", "той", "тя", "този", "тази",
    "живея", "живеем", "живее", "знам",
    "е", "са", "в", "на", "тук",
    "къща", "къщата", "етаж", "семейство", "семейството",
    "баща", "майка", "брат", "сестра",
    "ми", "му", "моят", "моята",
    "лекар", "учител", "голям", "голяма", "голямо",
    "днес", "утре", "понеделник", "събота", "втори",
  ],
  items: [
    { translation: { ru: "Я живу в доме.", uk: "Я живу в будинку." },
      slots: [{ role: WHO, word: "аз" }, { role: DO_I, word: "живея" }, { role: PREP, word: "в" }, { role: WHERE, word: "къща" }] },
    { translation: { ru: "Мой отец врач.", uk: "Мій батько лікар." },
      slots: [{ role: WHOSE, word: "моят" }, { role: WHO, word: "баща" }, { role: LINK, word: "е" }, { role: JOB, word: "лекар" }] },
    { translation: { ru: "Мы живём здесь.", uk: "Ми живемо тут." },
      slots: [{ role: WHO, word: "ние" }, { role: DO_WE, word: "живеем" }, { role: WHERE, word: "тук" }] },
    { translation: { ru: "Моя семья большая.", uk: "Моя родина велика." },
      slots: [{ role: WHAT, word: "семейството" }, { role: WHOSE, word: "ми" }, { role: LINK, word: "е" }, { role: WHICH, word: "голямо" }] },
    { translation: { ru: "Сегодня понедельник.", uk: "Сьогодні понеділок." },
      slots: [{ role: WHEN, word: "днес" }, { role: LINK, word: "е" }, { role: WHAT, word: "понеделник" }] },
    { translation: { ru: "Этот дом большой.", uk: "Цей будинок великий." },
      slots: [{ role: WHICH, word: "тази" }, { role: WHAT, word: "къща" }, { role: LINK, word: "е" }, { role: WHICH, word: "голяма" }] },
    { translation: { ru: "Этот этаж второй.", uk: "Цей поверх другий." },
      slots: [{ role: WHICH, word: "този" }, { role: WHAT, word: "етаж" }, { role: LINK, word: "е" }, { role: ORD, word: "втори" }] },
    { translation: { ru: "Мой брат живёт здесь.", uk: "Мій брат живе тут." },
      slots: [{ role: WHO, word: "брат" }, { role: WHOSE, word: "ми" }, { role: DOES, word: "живее" }, { role: WHERE, word: "тук" }] },
  ],
};

export const FRAME_L4: FrameData = {
  step: 2,
  bank: [
    "аз", "ти", "той", "тя", "ние",
    "чета", "четеш", "уча", "учи", "ям", "ставам",
    "бях", "бъда", "ще", "не", "е",
    "никога", "винаги", "често", "рано", "късно",
    "сутрин", "вечер", "вчера", "утре", "днес",
    "часът", "пет", "три", "тук", "книга", "хляб",
  ],
  items: [
    { translation: { ru: "Я читаю книгу.", uk: "Я читаю книжку." },
      slots: [{ role: WHO, word: "аз" }, { role: DO_I, word: "чета" }, { role: WHAT, word: "книга" }] },
    { translation: { ru: "Он всегда учится.", uk: "Він завжди вчиться." },
      slots: [{ role: WHO, word: "той" }, { role: HOW_OFTEN, word: "винаги" }, { role: DOES, word: "учи" }] },
    { translation: { ru: "Я встаю рано.", uk: "Я встаю рано." },
      slots: [{ role: WHO, word: "аз" }, { role: DO_I, word: "ставам" }, { role: WHEN, word: "рано" }] },
    { translation: { ru: "Вчера я был здесь.", uk: "Учора я був тут." },
      slots: [{ role: WHEN, word: "вчера" }, { role: VERB, word: "бях" }, { role: WHERE, word: "тук" }] },
    { translation: { ru: "Завтра я буду здесь.", uk: "Завтра я буду тут." },
      slots: [{ role: WHEN, word: "утре" }, { role: PARTICLE, word: "ще" }, { role: VERB, word: "бъда" }, { role: WHERE, word: "тук" }] },
    { translation: { ru: "Пять часов.", uk: "П'ята година." },
      slots: [{ role: WHAT, word: "часът" }, { role: LINK, word: "е" }, { role: HOW_MANY, word: "пет" }] },
    { translation: { ru: "Я никогда не читаю вечером.", uk: "Я ніколи не читаю ввечері." },
      slots: [{ role: WHO, word: "аз" }, { role: HOW_OFTEN, word: "никога" }, { role: NEG, word: "не" }, { role: DO_I, word: "чета" }, { role: WHEN, word: "вечер" }] },
    { translation: { ru: "Утром я ем хлеб.", uk: "Уранці я їм хліб." },
      slots: [{ role: WHEN, word: "сутрин" }, { role: WHO, word: "аз" }, { role: DO_I, word: "ям" }, { role: WHAT, word: "хляб" }] },
  ],
};

export const FRAME_L5: FrameData = {
  step: 3,
  bank: [
    "аз", "ти", "той", "тя", "този", "тази",
    "има", "няма", "да", "ще", "не", "е",
    "пиша", "пише", "обичам", "харесвам",
    "руса", "коса", "сини", "очи", "син", "бял",
    "висок", "висока", "нисък", "добър", "лош",
    "човек", "цвят", "пуловер", "риза", "утре", "много",
  ],
  items: [
    { translation: { ru: "У неё светлые волосы.", uk: "У неї світле волосся." },
      slots: [{ role: WHO, word: "тя" }, { role: DOES, word: "има" }, { role: WHICH, word: "руса" }, { role: WHAT, word: "коса" }] },
    { translation: { ru: "У него синие глаза.", uk: "У нього сині очі." },
      slots: [{ role: WHO, word: "той" }, { role: DOES, word: "има" }, { role: WHICH, word: "сини" }, { role: WHAT, word: "очи" }] },
    { translation: { ru: "Я буду писать завтра.", uk: "Я писатиму завтра." },
      alt: ["утре ще пиша", "ще пиша утре"],
      slots: [{ role: WHO, word: "аз" }, { role: PARTICLE, word: "ще" }, { role: DO_I, word: "пиша" }, { role: WHEN, word: "утре" }] },
    { translation: { ru: "Он не будет писать.", uk: "Він не писатиме." },
      slots: [{ role: WHO, word: "той" }, { role: NEG, word: "няма" }, { role: PARTICLE, word: "да" }, { role: DOES, word: "пише" }] },
    { translation: { ru: "Этот свитер синий.", uk: "Цей светр синій." },
      slots: [{ role: WHICH, word: "този" }, { role: WHAT, word: "пуловер" }, { role: LINK, word: "е" }, { role: COLOR, word: "син" }] },
    { translation: { ru: "Она высокая.", uk: "Вона висока." },
      slots: [{ role: WHO, word: "тя" }, { role: LINK, word: "е" }, { role: WHICH, word: "висока" }] },
    { translation: { ru: "Он хороший человек.", uk: "Він хороша людина." },
      slots: [{ role: WHO, word: "той" }, { role: LINK, word: "е" }, { role: WHICH, word: "добър" }, { role: WHAT, word: "човек" }] },
    { translation: { ru: "Я люблю этот цвет.", uk: "Я люблю цей колір." },
      alt: ["обичам този цвят"],
      slots: [{ role: WHO, word: "аз" }, { role: DO_I, word: "обичам" }, { role: WHICH, word: "този" }, { role: WHAT, word: "цвят" }] },
  ],
};

export const FRAME_L6: FrameData = {
  step: 3,
  bank: [
    "аз", "ти", "той", "тя",
    "искам", "мога", "може", "трябва", "да",
    "отида", "дойде", "вървя", "отивам", "идва", "идвам",
    "завийте", "карайте", "вземете", "спрете",
    "наляво", "надясно", "направо", "север", "юг",
    "на", "тук", "работа", "такси", "кола",
  ],
  items: [
    { translation: { ru: "Я хочу пойти.", uk: "Я хочу піти." },
      alt: ["искам да отида"],
      slots: [{ role: WHO, word: "аз" }, { role: MODAL, word: "искам" }, { role: PARTICLE, word: "да" }, { role: VERB, word: "отида" }] },
    { translation: { ru: "Он может прийти.", uk: "Він може прийти." },
      slots: [{ role: WHO, word: "той" }, { role: MODAL, word: "може" }, { role: PARTICLE, word: "да" }, { role: VERB, word: "дойде" }] },
    { translation: { ru: "Поверните налево.", uk: "Поверніть ліворуч." },
      slots: [{ role: CMD, word: "завийте" }, { role: DIR, word: "наляво" }] },
    { translation: { ru: "Езжайте прямо.", uk: "Їдьте прямо." },
      slots: [{ role: CMD, word: "карайте" }, { role: DIR, word: "направо" }] },
    { translation: { ru: "Нужно идти.", uk: "Треба йти." },
      slots: [{ role: MODAL, word: "трябва" }, { role: PARTICLE, word: "да" }, { role: DO_I, word: "вървя" }] },
    { translation: { ru: "Я иду на работу.", uk: "Я йду на роботу." },
      alt: ["отивам на работа"],
      slots: [{ role: WHO, word: "аз" }, { role: DO_I, word: "отивам" }, { role: PREP, word: "на" }, { role: WHITHER, word: "работа" }] },
    { translation: { ru: "Она идёт сюда.", uk: "Вона йде сюди." },
      slots: [{ role: WHO, word: "тя" }, { role: DOES, word: "идва" }, { role: WHITHER, word: "тук" }] },
    { translation: { ru: "Возьмите такси.", uk: "Візьміть таксі." },
      slots: [{ role: CMD, word: "вземете" }, { role: WHAT, word: "такси" }] },
  ],
};

export const FRAME_L7: FrameData = {
  step: 4,
  bank: [
    "аз", "ти", "той", "тя", "този", "тази",
    "купувам", "продавам", "плащам", "давам", "дава",
    "искам", "харесва", "струва",
    "ми", "му", "не", "нищо", "нещо", "в", "на", "е",
    "магазин", "магазина", "риза", "пуловер", "хляб", "пари", "лев",
    "по-евтин", "по-хубав", "най-хубав",
  ],
  items: [
    { translation: { ru: "Я покупаю хлеб.", uk: "Я купую хліб." },
      alt: ["купувам хляб"],
      slots: [{ role: WHO, word: "аз" }, { role: DO_I, word: "купувам" }, { role: WHAT, word: "хляб" }] },
    { translation: { ru: "Этот магазин дешевле.", uk: "Цей магазин дешевший." },
      slots: [{ role: WHICH, word: "този" }, { role: WHAT, word: "магазин" }, { role: LINK, word: "е" }, { role: DEGREE, word: "по-евтин" }] },
    { translation: { ru: "Он даёт мне деньги.", uk: "Він дає мені гроші." },
      slots: [{ role: WHO, word: "той" }, { role: TO_WHOM, word: "ми" }, { role: DOES, word: "дава" }, { role: WHAT, word: "пари" }] },
    { translation: { ru: "Я плачу в магазине.", uk: "Я плачу в магазині." },
      alt: ["плащам в магазина"],
      slots: [{ role: WHO, word: "аз" }, { role: DO_I, word: "плащам" }, { role: PREP, word: "в" }, { role: WHERE, word: "магазина" }] },
    { translation: { ru: "Я ничего не хочу.", uk: "Я нічого не хочу." },
      alt: ["нищо не искам", "аз не искам нищо"],
      slots: [{ role: NEG, word: "не" }, { role: DO_I, word: "искам" }, { role: WHAT, word: "нищо" }] },
    { translation: { ru: "Эта рубашка мне нравится.", uk: "Ця сорочка мені подобається." },
      slots: [{ role: WHICH, word: "тази" }, { role: WHAT, word: "риза" }, { role: TO_WHOM, word: "ми" }, { role: DOES, word: "харесва" }] },
    { translation: { ru: "Я хочу что-нибудь.", uk: "Я хочу щось." },
      alt: ["искам нещо"],
      slots: [{ role: WHO, word: "аз" }, { role: DO_I, word: "искам" }, { role: WHAT, word: "нещо" }] },
    { translation: { ru: "Этот магазин самый хороший.", uk: "Цей магазин найкращий." },
      slots: [{ role: WHICH, word: "този" }, { role: WHAT, word: "магазин" }, { role: LINK, word: "е" }, { role: DEGREE, word: "най-хубав" }] },
  ],
};

export const FRAME_L8: FrameData = {
  step: 4,
  bank: [
    "аз", "ти", "той", "тя", "ние",
    "съм", "си", "е", "сме", "не", "ли",
    "ял", "яла", "яли", "пил", "пия", "ям", "искам",
    "вода", "вино", "хляб", "сирене", "мляко", "салата", "супа",
    "гладен", "жаден", "сладък", "солен",
    "меню", "сметката", "ресторант",
  ],
  items: [
    { translation: { ru: "Я ел.", uk: "Я їв." },
      alt: ["ял съм"],
      slots: [{ role: WHO, word: "аз" }, { role: LINK, word: "съм" }, { role: PARTICIPLE, word: "ял" }] },
    { translation: { ru: "Я не ел.", uk: "Я не їв." },
      alt: ["аз не съм ял"],
      slots: [{ role: NEG, word: "не" }, { role: LINK, word: "съм" }, { role: PARTICIPLE, word: "ял" }] },
    { translation: { ru: "Ты ел?", uk: "Ти їв?" },
      slots: [{ role: PARTICIPLE, word: "ял" }, { role: Q_PARTICLE, word: "ли" }, { role: LINK, word: "си" }] },
    { translation: { ru: "Я пью воду.", uk: "Я п'ю воду." },
      alt: ["пия вода"],
      slots: [{ role: WHO, word: "аз" }, { role: DO_I, word: "пия" }, { role: WHAT, word: "вода" }] },
    { translation: { ru: "Я голоден.", uk: "Я голодний." },
      alt: ["аз съм гладен"],
      slots: [{ role: STATE, word: "гладен" }, { role: LINK, word: "съм" }] },
    { translation: { ru: "Он пил вино.", uk: "Він пив вино." },
      alt: ["пил е вино"],
      slots: [{ role: WHO, word: "той" }, { role: LINK, word: "е" }, { role: PARTICIPLE, word: "пил" }, { role: WHAT, word: "вино" }] },
    { translation: { ru: "Хочу салат.", uk: "Хочу салат." },
      alt: ["аз искам салата"],
      slots: [{ role: DO_I, word: "искам" }, { role: WHAT, word: "салата" }] },
    { translation: { ru: "Мы ели.", uk: "Ми їли." },
      alt: ["яли сме"],
      slots: [{ role: WHO, word: "ние" }, { role: LINK, word: "сме" }, { role: PARTICIPLE, word: "яли" }] },
  ],
};
