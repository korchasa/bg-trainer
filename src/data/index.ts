import type { Category } from "../types";
import {
  DATA_SYM, DATA_IMAM, DATA_NYAMAM, DATA_ISKAM,
  DATA_ARTICLE, ARTICLE_OPTIONS, DATA_GENDER, GENDER_OPTIONS,
  DATA_PLURAL, DATA_POSSESS, DATA_NEGATION, DATA_BUILD,
  DATA_KAZVAM, DATA_GOVORYA, DATA_COUNTRY_LANG, DATA_NATIONALITY,
  DATA_PROFESSION, DATA_GREETING, GREETING_OPTIONS,
  DATA_NALI, NALI_OPTIONS, DATA_NITO_I, NITO_I_OPTIONS,
  DATA_KAK_SI, KAK_SI_OPTIONS, DATA_TOVA, TOVA_OPTIONS,
  DATA_OBJECTS, DATA_REPLY, DATA_LI,
  DATA_MATCH_COUNTRY_LANG, DATA_MATCH_COUNTRY_NAT_M, DATA_MATCH_PROFESSION,
  DATA_ODD_MIXED, DATA_PARADIGM,
  DATA_TRANSFORM_NEG, DATA_TRANSFORM_Q, DATA_REGISTER_TIVIE,
  DATA_PROFILE_BUILD,
} from "./lesson1";
import {
  DATA_AGREE, DATA_POSSESS_FULL, DATA_PREP_PLACE, PREP_PLACE_OPTIONS,
  DATA_DIR_ADJ, DATA_ANTONYMS,
  DATA_IMA_NYAMA, IMA_NYAMA_OPTIONS, DATA_EDIN, EDIN_OPTIONS,
  DATA_COUNT, DATA_ETO, ETO_OPTIONS, DATA_VF, VF_OPTIONS, DATA_ROOM,
  DATA_ART_M_FULL_SHORT, DATA_NUMBERS, DATA_DVAMA,
  DATA_NYAMA_GO, NYAMA_GO_OPTIONS, DATA_SPACE,
  DATA_PARADIGM_POSSESS, DATA_PRONOUN_ACC,
  DATA_KOLKO_KUDE, KOLKO_KUDE_OPTIONS, DATA_ROOM_PLURAL,
  DATA_MATCH_POSSESS, DATA_MATCH_ARTICLE_ROOM,
  DATA_ODD_L2, DATA_ROOM_BUILD,
} from "./lesson2";
import {
  DATA_L3_HOUSE, DATA_L3_FAMILY,
  DATA_L3_POSS_SHORT, L3_POSS_SHORT_OPTIONS,
  DATA_L3_POSS_ART, DATA_L3_DEMO, L3_DEMO_OPTIONS,
  DATA_L3_ZHIVEYA, DATA_L3_ZNAYA, DATA_L3_SLEDVAM,
  DATA_L3_FLOOR, DATA_L3_DAYS, DATA_L3_MONTHS, DATA_L3_LOC_ADV,
  DATA_L3_NUM, DATA_L3_ORD,
  DATA_L3_VF, L3_VF_OPTIONS,
  DATA_L3_MATCH_FAMILY, DATA_L3_MATCH_SHORT_POSS,
  DATA_L3_BUILD, DATA_L3_PARADIGM, DATA_L3_ODD,
  DATA_L3_NA_KOGO, L3_NA_KOGO_OPTIONS,
  DATA_L3_TIME, DATA_L3_QWORDS, L3_QWORDS_OPTIONS,
  DATA_L3_ZANIMAVAM, DATA_L3_DATE_BUILD,
} from "./lesson3";

export * from "./lesson1";
export * from "./lesson2";
export * from "./lesson3";

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
  {
    id: "l2_extra",
    name: { ru: "Урок 2 · комната", uk: "Урок 2 · кімната" },
    modes: [
      { id: "agree_pick", icon: "🧩", label: { ru: "Согласование прил.", uk: "Узгодження прикм." }, desc: { ru: "Подбери форму прилагательного по роду/числу", uk: "Підбери форму прикметника за родом/числом" }, type: "pickFrom", data: () => DATA_AGREE },
      { id: "poss_full_pick", icon: "🗝️", label: { ru: "Полные притяжательные", uk: "Повні присвійні" }, desc: { ru: "Выбери полную определённую форму (моят/моята/моето/моите)", uk: "Обери повну означену форму (моят/моята/моето/моите)" }, type: "pickFrom", data: () => DATA_POSSESS_FULL },
      { id: "prep_place_pick", icon: "📍", label: { ru: "Предлоги места", uk: "Прийменники місця" }, desc: { ru: "Выбери предлог места: на/под/над/до/между/в/пред/зад/срещу", uk: "Обери прийменник місця: на/під/над/до/між/в/пред/зад/срещу" }, type: "pickOpt", data: () => ({ items: DATA_PREP_PLACE, opts: PREP_PLACE_OPTIONS }) },
      { id: "dir_adj_pick", icon: "🧭", label: { ru: "север → северен/…", uk: "север → северен/…" }, desc: { ru: "Образуй прилагательное по роду/числу (север/юг/изток/запад/дърво)", uk: "Утвори прикметник за родом/числом (север/юг/изток/запад/дърво)" }, type: "pickFrom", data: () => DATA_DIR_ADJ },
      { id: "ant_pick", icon: "↔️", label: { ru: "Антонимы", uk: "Антоніми" }, desc: { ru: "Подбери антоним прилагательного", uk: "Підбери антонім прикметника" }, type: "pickFrom", data: () => DATA_ANTONYMS },
      { id: "ima_pick", icon: "📦", label: { ru: "има / няма", uk: "има / няма" }, desc: { ru: "Выбери «има» (есть) или «няма» (нет)", uk: "Обери «има» (є) або «няма» (немає)" }, type: "pickOpt", data: () => ({ items: DATA_IMA_NYAMA, opts: IMA_NYAMA_OPTIONS }) },
      { id: "edin_pick", icon: "1️⃣", label: { ru: "един/една/едно", uk: "един/една/едно" }, desc: { ru: "Выбери форму «один» по роду существительного", uk: "Обери форму «один» за родом іменника" }, type: "pickOpt", data: () => ({ items: DATA_EDIN, opts: EDIN_OPTIONS }) },
      { id: "count_pick", icon: "🔢", label: { ru: "Счётная форма", uk: "Лічильна форма" }, desc: { ru: "Собери «число + существительное»: два стола, пет стола…", uk: "Склади «число + іменник»: два стола, пет стола…" }, type: "pickFrom", data: () => DATA_COUNT },
      { id: "eto_pick", icon: "👇", label: { ru: "Ето го / я / ги", uk: "Ето го / я / ги" }, desc: { ru: "Ответь краткой формой по роду/числу предмета", uk: "Відповідай короткою формою за родом/числом предмета" }, type: "pickOpt", data: () => ({ items: DATA_ETO, opts: ETO_OPTIONS }) },
      { id: "vf_pick", icon: "✅", label: { ru: "Вярно / Не е вярно", uk: "Вярно / Не е вярно" }, desc: { ru: "Верно ли утверждение по тексту урока?", uk: "Чи правильне твердження за текстом уроку?" }, type: "pickOpt", data: () => ({ items: DATA_VF, opts: VF_OPTIONS }) },
      { id: "room_pick", icon: "🛏️", label: { ru: "Словарь комнаты", uk: "Словник кімнати" }, desc: { ru: "Выбери болгарский перевод предмета комнаты", uk: "Обери болгарський переклад предмета кімнати" }, type: "pickFrom", data: () => DATA_ROOM },
      { id: "art_m_pick", icon: "🏷️", label: { ru: "м.р. -ът/-а, -ят/-я", uk: "ч.р. -ът/-а, -ят/-я" }, desc: { ru: "Полный (подлежащее) или краткий (после предлога) артикль м.р.", uk: "Повний (підмет) або короткий (після прийменника) артикль ч.р." }, type: "pickFrom", data: () => DATA_ART_M_FULL_SHORT },
      { id: "numbers_type", icon: "🔟", label: { ru: "Числа 1–10", uk: "Числа 1–10" }, desc: { ru: "Впиши болгарское слово для цифры", uk: "Впиши болгарське слово для цифри" }, type: "type", data: () => DATA_NUMBERS },
      { id: "poss_paradigm", icon: "🧱", label: { ru: "Парадигма притяжательных", uk: "Парадигма присвійних" }, desc: { ru: "Собери парадигму притяжательных по лицам для рода/числа", uk: "Склади парадигму присвійних за особами для роду/числа" }, type: "paradigm", data: () => DATA_PARADIGM_POSSESS },
      { id: "dvama_pick", icon: "👬", label: { ru: "двама / души / хора", uk: "двама / души / хора" }, desc: { ru: "Лично-мужские формы + исключения (человек → души → хора)", uk: "Особово-чоловічі форми + винятки (човек → души → хора)" }, type: "pickFrom", data: () => DATA_DVAMA },
      { id: "nyama_go_pick", icon: "🚫", label: { ru: "Няма го / я / ги", uk: "Няма го / я / ги" }, desc: { ru: "Ответь «Няма го/я/ги» по роду/числу предмета", uk: "Відповідай «Няма го/я/ги» за родом/числом предмета" }, type: "pickOpt", data: () => ({ items: DATA_NYAMA_GO, opts: NYAMA_GO_OPTIONS }) },
      { id: "space_pick", icon: "🧭", label: { ru: "Пространство", uk: "Простір" }, desc: { ru: "Горе/долу/дясно/ляво + стороны света", uk: "Горе/долу/дясно/ляво + сторони світу" }, type: "pickFrom", data: () => DATA_SPACE },
      { id: "pron_acc_pick", icon: "👤", label: { ru: "Местоим. ACC", uk: "Займенн. ACC" }, desc: { ru: "Краткая винительная форма: ме/те/го/я/ни/ви/ги", uk: "Коротка знахідна форма: ме/те/го/я/ни/ви/ги" }, type: "pickFrom", data: () => DATA_PRONOUN_ACC },
      { id: "kolko_kude_pick", icon: "❔", label: { ru: "колко / къде", uk: "колко / къде" }, desc: { ru: "Выбери вопросительное: «колко» (сколько) или «къде» (где)", uk: "Обери питальне: «колко» (скільки) або «къде» (де)" }, type: "pickOpt", data: () => ({ items: DATA_KOLKO_KUDE, opts: KOLKO_KUDE_OPTIONS }) },
      { id: "room_plural_pick", icon: "📚", label: { ru: "Мн.ч. комнаты", uk: "Мн. кімнати" }, desc: { ru: "Образуй мн.ч. предметов комнаты", uk: "Утвори мн. предметів кімнати" }, type: "pickFrom", data: () => DATA_ROOM_PLURAL },
      { id: "match_possess", icon: "🔗", label: { ru: "Мест. ↔ притяж.", uk: "Займ. ↔ присв." }, desc: { ru: "Соедини местоимение с притяжательным (аз↔мой, ти↔твой…)", uk: "З'єднай займенник з присвійним (аз↔мой, ти↔твой…)" }, type: "match", data: () => DATA_MATCH_POSSESS },
      { id: "match_article_room", icon: "🏷️", label: { ru: "Слово ↔ с артиклем", uk: "Слово ↔ з артиклем" }, desc: { ru: "Соедини слово с его определённой формой", uk: "З'єднай слово з означеною формою" }, type: "match", data: () => DATA_MATCH_ARTICLE_ROOM },
      { id: "odd_l2", icon: "🙅", label: { ru: "Найди лишнее · L2", uk: "Знайди зайве · L2" }, desc: { ru: "Одно слово не подходит по роду/категории/согласованию", uk: "Одне слово не підходить за родом/категорією/узгодженням" }, type: "odd", data: () => DATA_ODD_L2 },
      { id: "room_build", icon: "🏠", label: { ru: "Собери предложение", uk: "Склади речення" }, desc: { ru: "Расставь слова в предложении о комнате", uk: "Розстав слова в реченні про кімнату" }, type: "build", data: () => DATA_ROOM_BUILD },
    ],
  },
  {
    id: "l3_extra",
    name: { ru: "Урок 3 · семья", uk: "Урок 3 · родина" },
    modes: [
      { id: "l3_house_pick", icon: "🏠", label: { ru: "Жильё", uk: "Житло" }, desc: { ru: "Выбери болгарский перевод части дома", uk: "Обери болгарський переклад частини дому" }, type: "pickFrom", data: () => DATA_L3_HOUSE },
      { id: "l3_family_pick", icon: "👪", label: { ru: "Семья", uk: "Родина" }, desc: { ru: "Выбери болгарский перевод слова о семье", uk: "Обери болгарський переклад слова про родину" }, type: "pickFrom", data: () => DATA_L3_FAMILY },
      { id: "l3_poss_short_pick", icon: "🔑", label: { ru: "Краткие притяж.", uk: "Короткі присв." }, desc: { ru: "Выбери краткое притяжательное: ми/ти/му/й/ни/ви/им/си", uk: "Обери коротке присвійне: ми/ти/му/й/ни/ви/им/си" }, type: "pickOpt", data: () => ({ items: DATA_L3_POSS_SHORT, opts: L3_POSS_SHORT_OPTIONS }) },
      { id: "l3_poss_art_pick", icon: "🏷️", label: { ru: "Артикль + кр. притяж.", uk: "Артикль + кор. присв." }, desc: { ru: "С артиклем или без: майка ми, но мъжът ми", uk: "З артиклем чи без: майка ми, але мъжът ми" }, type: "pickFrom", data: () => DATA_L3_POSS_ART },
      { id: "l3_dem_pick", icon: "👉", label: { ru: "Този / онзи", uk: "Този / онзи" }, desc: { ru: "Выбери указательное близко (този/тази/това/тези) или далеко (онзи/…)", uk: "Обери вказівне близько (този/тази/това/тези) або далеко (онзи/…)" }, type: "pickOpt", data: () => ({ items: DATA_L3_DEMO, opts: L3_DEMO_OPTIONS }) },
      { id: "l3_zhiveya_pick", icon: "🏘️", label: { ru: "Живея", uk: "Живея" }, desc: { ru: "Выбери форму «живея» для местоимения", uk: "Обери форму «живея» для займенника" }, type: "pick", data: () => DATA_L3_ZHIVEYA },
      { id: "l3_znaya_pick", icon: "🧠", label: { ru: "Зная", uk: "Зная" }, desc: { ru: "Выбери форму «зная» для местоимения", uk: "Обери форму «зная» для займенника" }, type: "pick", data: () => DATA_L3_ZNAYA },
      { id: "l3_sledvam_pick", icon: "🎓", label: { ru: "Следвам", uk: "Следвам" }, desc: { ru: "Выбери форму «следвам» (учиться по спец.) для местоимения", uk: "Обери форму «следвам» (навчатися за спец.) для займенника" }, type: "pick", data: () => DATA_L3_SLEDVAM },
      { id: "l3_floor_pick", icon: "🏢", label: { ru: "Этажность", uk: "Поверховість" }, desc: { ru: "Образуй прилагательное: два+етаж → двуетажен", uk: "Утвори прикметник: два+етаж → двуетажен" }, type: "pickFrom", data: () => DATA_L3_FLOOR },
      { id: "l3_days_pick", icon: "📅", label: { ru: "Дни недели", uk: "Дні тижня" }, desc: { ru: "Выбери болгарский день недели", uk: "Обери болгарський день тижня" }, type: "pickFrom", data: () => DATA_L3_DAYS },
      { id: "l3_months_pick", icon: "🗓️", label: { ru: "Месяцы", uk: "Місяці" }, desc: { ru: "Выбери болгарский месяц", uk: "Обери болгарський місяць" }, type: "pickFrom", data: () => DATA_L3_MONTHS },
      { id: "l3_loc_adv_pick", icon: "🧭", label: { ru: "Горе / долу / …", uk: "Горе / долу / …" }, desc: { ru: "Выбери наречие места: горе/долу/отпред/отзад/отляво/отдясно", uk: "Обери прислівник місця: горе/долу/отпред/отзад/отляво/отдясно" }, type: "pickFrom", data: () => DATA_L3_LOC_ADV },
      { id: "l3_num_pick", icon: "🔢", label: { ru: "Числа 11–1000", uk: "Числа 11–1000" }, desc: { ru: "Выбери слово для числа: подростковые, десятки, сотни", uk: "Обери слово для числа: підліткові, десятки, сотні" }, type: "pickFrom", data: () => DATA_L3_NUM },
      { id: "l3_ord_pick", icon: "🥇", label: { ru: "Порядковые", uk: "Порядкові" }, desc: { ru: "Образуй порядковое (м.р.): пет → пети", uk: "Утвори порядкове (ч.р.): пет → пети" }, type: "pickFrom", data: () => DATA_L3_ORD },
      { id: "l3_vf_pick", icon: "✅", label: { ru: "Вярно / Не е вярно", uk: "Вярно / Не е вярно" }, desc: { ru: "Верно ли утверждение по тексту о семье Сия и Киро?", uk: "Чи правильне твердження за текстом про родину Сія і Кіро?" }, type: "pickOpt", data: () => ({ items: DATA_L3_VF, opts: L3_VF_OPTIONS }) },
      { id: "l3_match_family", icon: "💑", label: { ru: "м. ↔ ж. роли", uk: "ч. ↔ ж. ролі" }, desc: { ru: "Соедини мужскую и женскую форму члена семьи", uk: "З'єднай чоловічу та жіночу форму члена родини" }, type: "match", data: () => DATA_L3_MATCH_FAMILY },
      { id: "l3_match_short_poss", icon: "🔗", label: { ru: "Мест. ↔ кр. притяж.", uk: "Займ. ↔ кор. присв." }, desc: { ru: "Соедини местоимение с кратким притяжательным (аз↔ми)", uk: "З'єднай займенник з коротким присвійним (аз↔ми)" }, type: "match", data: () => DATA_L3_MATCH_SHORT_POSS },
      { id: "l3_build", icon: "🧩", label: { ru: "Собери предложение", uk: "Склади речення" }, desc: { ru: "Расставь слова в предложении о семье", uk: "Розстав слова в реченні про родину" }, type: "build", data: () => DATA_L3_BUILD },
      { id: "l3_paradigm", icon: "🧱", label: { ru: "Парадигмы L3", uk: "Парадигми L3" }, desc: { ru: "Собери парадигму: живея, зная, следвам", uk: "Склади парадигму: живея, зная, следвам" }, type: "paradigm", data: () => DATA_L3_PARADIGM },
      { id: "l3_odd", icon: "🙅", label: { ru: "Найди лишнее · L3", uk: "Знайди зайве · L3" }, desc: { ru: "Одно слово не подходит по категории/группе", uk: "Одне слово не підходить за категорією/групою" }, type: "odd", data: () => DATA_L3_ODD },
      { id: "l3_na_kogo_pick", icon: "🪪", label: { ru: "На кого? (чей)", uk: "На кого? (чий)" }, desc: { ru: "Выбери предлог «на» для выражения принадлежности", uk: "Обери прийменник «на» для належності" }, type: "pickOpt", data: () => ({ items: DATA_L3_NA_KOGO, opts: L3_NA_KOGO_OPTIONS }) },
      { id: "l3_time_pick", icon: "⏰", label: { ru: "Время: ден/седмица/…", uk: "Час: ден/седмица/…" }, desc: { ru: "Выбери болгарский перевод: ден/седмица/месец/година, днес/утре/вчера", uk: "Обери болгарський переклад: ден/седмица/месец/година, днес/утре/вчера" }, type: "pickFrom", data: () => DATA_L3_TIME },
      { id: "l3_qwords_pick", icon: "❓", label: { ru: "Вопросительные", uk: "Питальні" }, desc: { ru: "Откъде/Какъв/Какви/Колко/Как/Кога/Къде", uk: "Откъде/Какъв/Какви/Колко/Как/Кога/Къде" }, type: "pickOpt", data: () => ({ items: DATA_L3_QWORDS, opts: L3_QWORDS_OPTIONS }) },
      { id: "l3_zanimavam_pick", icon: "🎯", label: { ru: "Занимавам се", uk: "Занимавам се" }, desc: { ru: "Выбери форму «занимавам се» для местоимения", uk: "Обери форму «занимавам се» для займенника" }, type: "pick", data: () => DATA_L3_ZANIMAVAM },
      { id: "l3_date_build", icon: "📆", label: { ru: "Собери дату / возраст", uk: "Склади дату / вік" }, desc: { ru: "Расставь слова: «На колко години…», «Роден на пети май…»", uk: "Розстав слова: «На колко години…», «Роден на пети май…»" }, type: "build", data: () => DATA_L3_DATE_BUILD },
      { id: "l3_num_type", icon: "⌨️", label: { ru: "Впиши число", uk: "Впиши число" }, desc: { ru: "Напечатай болгарское слово для числа (11–1000)", uk: "Надрукуй болгарське слово для числа (11–1000)" }, type: "type", data: () => DATA_L3_NUM },
      { id: "l3_ord_type", icon: "⌨️", label: { ru: "Впиши порядковое", uk: "Впиши порядкове" }, desc: { ru: "Напечатай порядковое число (м.р.): 5 → пети", uk: "Надрукуй порядкове число (ч.р.): 5 → пети" }, type: "type", data: () => DATA_L3_ORD },
      { id: "l3_family_type", icon: "⌨️", label: { ru: "Впиши семью", uk: "Впиши родину" }, desc: { ru: "Напечатай болгарский перевод слова о семье", uk: "Надрукуй болгарський переклад слова про родину" }, type: "type", data: () => DATA_L3_FAMILY },
      { id: "l3_days_type", icon: "⌨️", label: { ru: "Впиши день", uk: "Впиши день" }, desc: { ru: "Напечатай болгарский день недели", uk: "Надрукуй болгарський день тижня" }, type: "type", data: () => DATA_L3_DAYS },
      { id: "l3_months_type", icon: "⌨️", label: { ru: "Впиши месяц", uk: "Впиши місяць" }, desc: { ru: "Напечатай болгарский месяц", uk: "Надрукуй болгарський місяць" }, type: "type", data: () => DATA_L3_MONTHS },
      { id: "l3_zhiveya_fill", icon: "⚡", label: { ru: "Живея на скорость", uk: "Живея на швидкість" }, desc: { ru: "Выбери форму «живея» за отведённое время — автоматизация", uk: "Обери форму «живея» за відведений час — автоматизація" }, type: "timed", data: () => DATA_L3_ZHIVEYA },
    ],
  },
  {
    id: "schema",
    name: { ru: "Парадигмы", uk: "Парадигми" },
    modes: [
      { id: "paradigm_fill", icon: "🧱", label: { ru: "Собери парадигму", uk: "Склади парадигму" }, desc: { ru: "Расставь формы по лицам: аз/ти/той/ние/вие/те", uk: "Розстав форми за особами: аз/ти/той/ние/вие/те" }, type: "paradigm", data: () => DATA_PARADIGM },
      { id: "odd_mixed", icon: "🙅", label: { ru: "Найди лишнее", uk: "Знайди зайве" }, desc: { ru: "Выбери слово, которое не подходит к остальным", uk: "Обери слово, що не підходить до решти" }, type: "odd", data: () => DATA_ODD_MIXED },
    ],
  },
  {
    id: "match",
    name: { ru: "Сопоставление", uk: "Зіставлення" },
    modes: [
      { id: "match_country_lang", icon: "🔗", label: { ru: "Страна ↔ язык", uk: "Країна ↔ мова" }, desc: { ru: "Соедини страну с её языком", uk: "З'єднай країну з її мовою" }, type: "match", data: () => DATA_MATCH_COUNTRY_LANG },
      { id: "match_country_nat", icon: "🤝", label: { ru: "Страна ↔ житель (м.)", uk: "Країна ↔ мешканець (ч.)" }, desc: { ru: "Соедини страну с мужской формой национальности", uk: "З'єднай країну з чоловічою формою національності" }, type: "match", data: () => DATA_MATCH_COUNTRY_NAT_M },
      { id: "match_profession", icon: "💁", label: { ru: "Профессия м. ↔ ж.", uk: "Професія ч. ↔ ж." }, desc: { ru: "Соедини мужскую и женскую формы профессии", uk: "З'єднай чоловічу і жіночу форми професії" }, type: "match", data: () => DATA_MATCH_PROFESSION },
    ],
  },
  {
    id: "transform",
    name: { ru: "Трансформации", uk: "Трансформації" },
    modes: [
      { id: "transform_neg", icon: "➖", label: { ru: "Сделай отрицательным", uk: "Зроби заперечним" }, desc: { ru: "Преобразуй утвердительное в отрицательное", uk: "Перетвори ствердне на заперечне" }, type: "pickFrom", data: () => DATA_TRANSFORM_NEG },
      { id: "transform_q", icon: "❔", label: { ru: "Сделай вопросом", uk: "Зроби питанням" }, desc: { ru: "Преобразуй утверждение в вопрос «ли» (фокус на подлежащем)", uk: "Перетвори ствердне на питання «ли» (фокус на підметі)" }, type: "pickFrom", data: () => DATA_TRANSFORM_Q },
      { id: "register_tivie", icon: "🎩", label: { ru: "ти → Вие", uk: "ти → Вие" }, desc: { ru: "Перестрой фразу на вежливое «Вие»", uk: "Перебудуй фразу на ввічливе «Вие»" }, type: "pickFrom", data: () => DATA_REGISTER_TIVIE },
    ],
  },
  {
    id: "profile",
    name: { ru: "Карточки людей", uk: "Картки людей" },
    modes: [
      { id: "profile_build", icon: "🪪", label: { ru: "Расскажи о человеке", uk: "Розкажи про людину" }, desc: { ru: "Собери 3 предложения: имя, страна, язык", uk: "Склади 3 речення: ім'я, країна, мова" }, type: "build", data: () => DATA_PROFILE_BUILD },
    ],
  },
];

export const ALL_MODES = CATEGORIES.flatMap(c => c.modes);
