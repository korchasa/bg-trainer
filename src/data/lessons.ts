import type { Lesson } from "../types";

export const LESSONS: Lesson[] = [
  {
    id: "l1",
    num: 1,
    title: {
      ru: "Знакомство. Съм, казвам се, говоря, нали",
      uk: "Знайомство. Съм, казвам се, говоря, нали",
    },
    available: true,
    modeIds: [
      "sym_pick",
      "sym_fill",
      "sym_type",
      "kazvam_pick",
      "govorya_pick",
      "imam_pick",
      "nyamam_pick",
      "country_lang_pick",
      "nationality_pick",
      "profession_pick",
      "greeting_pick",
      "reply_pick",
      "kak_si_pick",
      "tova_pick",
      "objects_pick",
      "nito_i_pick",
      "nali_pick",
      "q_li",
      "neg_tf",
      "paradigm_fill",
      "odd_mixed",
      "match_country_lang",
      "match_country_nat",
      "match_profession",
      "transform_neg",
      "transform_q",
      "register_tivie",
      "profile_build",
    ],
  },
  {
    id: "l2", num: 2, available: true,
    title: {
      ru: "Моята стая. Род, артикль, мн.ч., притежательные, числа, предлоги",
      uk: "Моята стая. Рід, артикль, мн., присвійні, числа, прийменники",
    },
    modeIds: [
      "room_pick",
      "gen_pick",
      "agree_pick",
      "ant_pick",
      "dir_adj_pick",
      "space_pick",
      "art_pick",
      "art_m_pick",
      "pl_pick",
      "room_plural_pick",
      "poss_full_pick",
      "poss_paradigm",
      "match_possess",
      "match_article_room",
      "numbers_type",
      "edin_pick",
      "count_pick",
      "dvama_pick",
      "prep_place_pick",
      "ima_pick",
      "pron_acc_pick",
      "eto_pick",
      "nyama_go_pick",
      "kolko_kude_pick",
      "vf_pick",
      "odd_l2",
      "room_build",
    ],
  },
  {
    id: "l3", num: 3, available: false, modeIds: [],
    title: {
      ru: "Краткие притежательные, показательные, живея",
      uk: "Короткі присвійні, вказівні, живея",
    },
  },
  {
    id: "l4", num: 4, available: false, modeIds: [],
    title: {
      ru: "Времена «съм», спряжения, часы, предлоги",
      uk: "Часи «съм», дієвідміни, години, прийменники",
    },
  },
  {
    id: "l5", num: 5, available: false, modeIds: [],
    title: {
      ru: "Цвета, когато/който, бъдеще, внешность",
      uk: "Кольори, когато/който, майбутнє, зовнішність",
    },
  },
  {
    id: "l6", num: 6, available: false, modeIds: [],
    title: {
      ru: "Да-конструкция, вид глагола, движение",
      uk: "Да-конструкція, вид дієслова, рух",
    },
  },
  {
    id: "l7", num: 7, available: false, modeIds: [],
    title: {
      ru: "Степени сравнения, диминутивы, нещо/нищо",
      uk: "Ступені порівняння, демінутиви, нещо/нищо",
    },
  },
  {
    id: "l8", num: 8, available: false, modeIds: [],
    title: {
      ru: "Ям, минало неопределено, ресторан",
      uk: "Ям, минуле неозначене, ресторан",
    },
  },
];

export const LESSON_BY_ID: Record<string, Lesson> =
  Object.fromEntries(LESSONS.map(l => [l.id, l]));
