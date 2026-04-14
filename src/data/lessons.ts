import type { Lesson } from "../types";

export const LESSONS: Lesson[] = [
  {
    id: "l1",
    num: 1,
    title: "Знакомство. Съм, казвам се, говоря, нали",
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
    ],
  },
  { id: "l2", num: 2, title: "Род, артикль, мн.ч., притежательные, числа", available: false, modeIds: [] },
  { id: "l3", num: 3, title: "Краткие притежательные, показательные, живея", available: false, modeIds: [] },
  { id: "l4", num: 4, title: "Времена «съм», спряжения, часы, предлоги", available: false, modeIds: [] },
  { id: "l5", num: 5, title: "Цвета, когато/който, бъдеще, внешность", available: false, modeIds: [] },
  { id: "l6", num: 6, title: "Да-конструкция, вид глагола, движение", available: false, modeIds: [] },
  { id: "l7", num: 7, title: "Степени сравнения, диминутивы, нещо/нищо", available: false, modeIds: [] },
  { id: "l8", num: 8, title: "Ям, минало неопределено, ресторан", available: false, modeIds: [] },
];

export const LESSON_BY_ID: Record<string, Lesson> =
  Object.fromEntries(LESSONS.map(l => [l.id, l]));
