# SRS

## 1. Intro
- **Desc:** bg-trainer — gamified grammar trainer for Bulgarian A0 learners. UI in Russian or Ukrainian (user-selectable). Single React/TS codebase shipped as 2 surfaces: web (GitHub Pages, free) and iOS (Capacitor WKWebView shell, paid one-time download at App Store tier $1.99 USD ≈ €2.49 EUR). All 8 lessons unlocked for everyone on every surface; no IAP, no paywall.
- **Def/Abbr:** SPA = Single Page App. Engine = interaction component for one quiz type. Mode = one drill config (data + engine). Category = group of related modes. Session = one playthrough of N questions (N = `SESSION_SIZE_BY_PACE[pace]`). Lesson = textbook unit grouping a curated list of modes. Pace = user-selected session length (`quick`/`standard`/`deep`). Round = 3 consecutive N-question games from one lesson (N = pace size).

## 2. General
- **Context:** Self-study tool for East-Slavic speakers (RU/UK) at A0. No accounts, no backend. All state is client-side. Shipped as web (GitHub Pages, free) and native iOS (Capacitor WKWebView shell, paid one-time download). All content included on every surface — no gating, no IAP.
- **Assumptions/Constraints:**
  - Modern evergreen browser with `localStorage` and ES2020+.
  - Mobile-first, max-width `md`, portrait-friendly.
  - Static hosting on GitHub Pages: web app at the root of `app.bgtrainer.korchasa.dev` (base `/`); marketing site + policies are a separate repo on Cloudflare Pages at `bgtrainer.korchasa.dev`. iOS/Android builds use relative base `./`.
  - iOS deployment target 15.0+, Bundle ID `dev.korchasa.bgtrainer`, Capacitor 8.
  - Paid app: single App Store price tier $1.99 USD. No IAP, no subscriptions, no in-app unlock.
  - No server, no analytics backend, no auth.
  - i18n: 2 locales (`ru`, `uk`), client-side only, no external i18n library.

## 3. Functional Reqs

### 3.1 FR-MENU
- **Desc:** Entry screen = list of lessons. Lessons carry a curated `modeIds` list. Available lessons open a per-lesson screen; upcoming lessons (`available=false`) shown disabled with "Скоро" label. All `available` lessons are tappable and open directly — web and iOS behave identically (no gating).
- **Scenario:** User opens app → sees lessons list → taps an available lesson → lesson screen with round button + grid of lesson's games → taps a game → game starts.
- **Acceptance:**
  - [x] Lessons list rendered with two sections (available / upcoming). Evidence: `src/components/screens/LessonsScreen.tsx:16-62`, `src/data/lessons.ts`
  - [x] Only `available=true` lessons are tappable. Evidence: `src/App.tsx:89-94`, `src/components/screens/LessonsScreen.tsx:35-52`
  - [x] Lesson screen lists its modes + primary "Раунд" button. Evidence: `src/components/screens/LessonScreen.tsx`
- **Status:** [x]

### 3.2 FR-GAME-SESSION
- **Desc:** Session = N questions from the selected mode's data, where N = `SESSION_SIZE_BY_PACE[pace]` (see FR-PACE). `qsTotal` is fixed at session start. On a wrong answer the question is **not** advanced — user must retry the same item until correct (see FR-RETRY). A slot is consumed only when the user answers correctly, so the session always ends after `qsTotal` correctly-answered slots. Progress UI uses `answered / qsTotal`. `errors` counts unique wrong indices (only the first wrong attempt per question counts; retries do not).
- **Scenario:** User plays → answers `qsTotal` questions (each may require retries on first-wrong) → `ResultsScreen` shows score/errors/time (single game) or round aggregates.
- **Acceptance:**
  - [x] Session size = `SESSION_SIZE_BY_PACE[pace]` for both single and round games. Evidence: `src/utils/sliceData.ts:6-33`, `src/App.tsx:199-201`, `src/constants.ts:10-14`
  - [x] `useGame` tracks `cur`, `sel`, `corr`, `reaction`, `score`, `answered`, `qsTotal`, `errorPending`. Evidence: `src/hooks/useGame.ts`
  - [x] Wrong answers stay on the same `cur` until correct (immediate retry, no re-queue). Evidence: `src/hooks/useGame.ts`
  - [x] Progress component reads `answered/qsTotal`. Evidence: `src/components/engines/PickEngine.tsx`, `src/components/engines/PickOptEngine.tsx`, `src/components/engines/PickFromEngine.tsx`, `src/components/engines/TimedEngine.tsx`, `src/components/engines/NegEngine.tsx`
  - [x] Unique-index error counting via `errSet: Set<number>`; only the first wrong attempt is counted. Evidence: `src/hooks/useGame.ts`
  - [x] On completion → `onComplete(score, time, errors)` fires once. Evidence: `src/hooks/useGame.ts`
- **Status:** [x]

### 3.2.1 FR-RETRY
- **Desc:** On a wrong answer, the engine surfaces an error explanation modal (correct answer, hint, optional rule) with a "Continue" button. Question repeats on the same `cur` slot until the user answers correctly. Only the first attempt per question is scored / recorded as an error / forwarded to mastery (`onItemAnswer`); subsequent attempts are silent — no score change, no mastery event, no error increment, no extra reaction.
- **Scenario:** User answers wrong → modal pops up with the correct answer → user taps "Продолжить" → buttons re-enable on the same question → user keeps trying → on correct answer, session advances to next slot.
- **Acceptance:**
  - [x] `useGame` exposes `errorPending` + `dismissError`; first wrong sets `firstWrongRef`, locks advance until retry-correct. Evidence: `src/hooks/useGame.ts`
  - [x] Retry attempts skip score, mastery, and error increments. Evidence: `src/hooks/useGame.ts`
  - [x] `ErrorDialog` renders correct answer + hint + rule + Continue button per engine using `useGame`. Evidence: `src/components/ui/ErrorDialog.tsx`, engines under `src/components/engines/` (Pick, PickOpt, PickFrom, Timed, Neg, Type, OddOneOut)
  - [x] i18n strings `errorTitle`, `correctAnswer` defined for `ru` and `uk`. Evidence: `src/i18n/strings.ts`
- **Status:** [x]

### 3.10 FR-LESSONS
- **Desc:** 8 lessons aligned with textbook `documents/lessons/lesson-1..8.md`. Each lesson has `id`, `num`, `title`, `modeIds[]`, `available`. All 8 lessons are fully playable (`available=true`) and unlocked for everyone on every surface.
- **Scenario:** User picks lesson 1 → sees games for L1 grammar (съм, казвам се, говоря, имам/нямам, страна→язык, национальность, профессия, приветствия, ответные реплики, Как си, Това е/са, предметы, нито/и, нали, ли-вопрос, отрицание). User picks lesson 2 → sees games for L2 grammar (род, артикль, мн.ч., согласование прил., полные притежательные, антонимы, предлоги места, има/няма, един/една/едно, счётная форма, Ето го/я/ги, словарь комнаты, север→северен). User picks lesson 3 → sees games for L3 (жильё, семья, краткие притежательные ми/ти/му/й/ни/ви/им/си, артикль+родство, показательные този/онзи, живея/зная/следвам/занимавам се, этажность, дни/месяцы, наречия места, числа 11–1000, порядковые, «на кого», время, вопросительные, даты). User picks lesson 4 → sees games for L4 (спряжения I/II/III: чета, уча, казвам, оправям, правя + ям; возвратный глагол мия се; словарь распорядка дня; время суток и указатели прошлого; частотные наречия; никога + не; антонимы рано/късно, бързо/бавно, често/рядко, влизам/излизам; предлоги времени в / преди / след / към / около / до / от / между; часы «Часът е…»; прошедшее бях; будущее ще бъда / няма да бъда). User picks lesson 5 → sees games for L5 (части тела; внешность висок/нисък/дебел/слаб/стар/млад; волосы дълга/къса/права/чуплива/къдрава/руса/кестенява; глаза сини/зелени/кафяви/пъстри; описания носа/губ/выражения; характер добър/лош/честен/щедър/смел/работлив/…; цвета бял/черен/червен/зелен/жълт/син/кафяв/розов/сив/лилав/оранжев + светлосин/тъмносин; одежда блуза/риза/тениска/пуловер/рокля/панталон/дънки/яке/палто/костюм/обувки/чорапи; стилевые наречия делово/спортно/официално/елегантно/небрежно; будущее время «ще» / «няма да»; отвечать «Да, ще + 1л.» / «Не, няма да + 1л.»; парадигма «ще пиша/чета/ям/говоря/ходя/обичам»; относит. местоимения който/която/което/които; указат. качества такъв/такава/такова/такива; глаголы харесвам/обичам/мразя; придаточные с «когато»). User picks lesson 6 → sees games for L6 (улица/адрес/транспорт; учтивые формулы Заповядайте/Благодаря/Извинете/Моля; обращения господин/госпожа/госпожица + сокращения г-н/г-жа/г-ца/ул./бул./ет./ап./гр./пл./№; парадигмы мога/обичам; модальные глаголы да-конструкции (искам/мога/трябва/обичам/започвам/спирам); глаголы движения вървя/ходя/идвам/отивам/връщам се/тръгвам/спирам/минавам/завивам/стигам/пресичам/разхождам се/влизам/излизам/качвам се/слизам/карам/паркирам; вид глагола несвършен↔свършен (идвам↔дойда, отивам↔отида, …); императив положит. ед./мн., отрицат. (только несвършен), неправильные бъди/ела/виж/яж/дай/иди/влез/излез; направления наляво/надясно/направо/назад; стороны света север/юг/изток/запад; фразы дороги Завийте/Карайте/Вземете/Слезте/Минете). User picks lesson 7 → sees games for L7 (магазины: типы/роли/термины, что-где-продают, глаголы шопинга купувам/продавам/давам/плащам/пазарувам, сравнит./превосх. степень по-/най-, диминутивы магазинче/момиченце, ще / няма да + трансформация, нещо/нищо, краткое дательное ми/ти/му/й/ни/ви/им + трансформация на→DAT, харесва/отива/става + согласование, приблизит. количество няколко/около/към/десетина, счёт денег лев/стотинка, продавач или клиент, парадигмы, build предложений и реплик рынка, match местоимение↔DAT / ACC↔DAT / антонимы / магазин↔товар, odd). User picks lesson 8 → sees games for L8 (питание: храна, плодове, зеленчуци, месо/млечни, подправки, напитки, съдове; вкус сладък/солен/лют/горчив/кисел; глаголи готовки варя/пека/пържа/задушавам + способ; гладен/жаден съгласуване; «яде/ядат ми се», «пие/пият ми се»; български ястия и ресторант; минало неопределено: причастия ял/яла/яло/яли, спомагателен съм/си/е/сме/сте/са, ред на думите Аз съм ял / Ял съм / Не съм ял, въпрос «Ял ли си?», кратки отговори).
- **Acceptance:**
  - [x] `LESSONS` defined with 8 entries; L1–L8 all `available=true`. Evidence: `src/data/lessons.ts`
  - [x] L1 `modeIds` cover L1 grammar topics. Evidence: `src/data/lessons.ts:12-41`
  - [x] L2 `modeIds` cover L2 grammar topics (26 modes). Evidence: `src/data/lessons.ts:49-76`
  - [x] L3 `modeIds` cover L3 grammar topics (31 modes; pickFrom/pickOpt for recognition + type for productive recall + timed for automaticity + build/paradigm/match/odd). Evidence: `src/data/lessons.ts` (l3 block)
  - [x] L4 `modeIds` cover L4 grammar topics (28 modes: 6 conjugation paradigms + conj-type recognition + reflexive paradigm + routine vocab pickFrom/type + time-period + past-time markers + frequency + никога-transform + antonyms + time prepositions + clock pickFrom/type + бях pickOpt/type + ще бъда pick + ще/няма да + combined paradigm + build + hours build + match antonyms + match 1sg↔3sg + odd). Evidence: `src/data/lessons.ts` (l4 block), `src/data/index.ts` (l4_extra category)
  - [x] L5 `modeIds` cover L5 grammar topics (29 modes: body pickFrom/type + appearance pickFrom/type + hair + eyes + face + character pickFrom/type + antonyms + colors pickFrom/type + clothes pickFrom/type + style pickOpt + future-time markers + ще пиша pick + ще/няма да pickOpt + affirmative/negative answer pickFrom + който pickOpt + такъв pickOpt + харесвам/обичам/мразя pickOpt + future paradigm + build + когато/който build + match colors + match antonyms + odd). Evidence: `src/data/lessons.ts` (l5 block), `src/data/index.ts` (l5_extra category)
  - [x] Each new L1 mode backed by ≥6 data items. Evidence: `src/data/lesson1.ts` (DATA_KAZVAM, DATA_GOVORYA, DATA_IMAM, DATA_NYAMAM, DATA_COUNTRY_LANG, DATA_NATIONALITY, DATA_PROFESSION, DATA_GREETING, DATA_NALI, DATA_NITO_I, DATA_KAK_SI, DATA_TOVA, DATA_OBJECTS, DATA_REPLY)
  - [x] Each new L2 mode backed by ≥10 data items. Evidence: `src/data/lesson2.ts` (DATA_AGREE, DATA_POSSESS_FULL, DATA_PREP_PLACE, DATA_DIR_ADJ, DATA_ANTONYMS, DATA_IMA_NYAMA, DATA_EDIN, DATA_COUNT, DATA_ETO, DATA_ROOM, DATA_ART_M_FULL_SHORT, DATA_NUMBERS, DATA_DVAMA, DATA_NYAMA_GO, DATA_SPACE, DATA_PRONOUN_ACC, DATA_KOLKO_KUDE, DATA_ROOM_PLURAL, DATA_MATCH_POSSESS, DATA_MATCH_ARTICLE_ROOM, DATA_ODD_L2, DATA_ROOM_BUILD, DATA_PARADIGM_POSSESS)
  - [x] Each new L3 mode backed by ≥6 data items. Evidence: `src/data/lesson3.ts` (DATA_L3_HOUSE, DATA_L3_FAMILY, DATA_L3_POSS_SHORT, DATA_L3_POSS_ART, DATA_L3_DEMO, DATA_L3_ZHIVEYA, DATA_L3_ZNAYA, DATA_L3_SLEDVAM, DATA_L3_FLOOR, DATA_L3_DAYS, DATA_L3_MONTHS, DATA_L3_LOC_ADV, DATA_L3_NUM, DATA_L3_ORD, DATA_L3_MATCH_FAMILY, DATA_L3_MATCH_SHORT_POSS, DATA_L3_BUILD, DATA_L3_PARADIGM, DATA_L3_ODD, DATA_L3_NA_KOGO, DATA_L3_TIME, DATA_L3_QWORDS, DATA_L3_ZANIMAVAM, DATA_L3_DATE_BUILD)
  - [x] Each new L4 mode backed by ≥6 data items. Evidence: `src/data/lesson4.ts` (DATA_L4_CHETA, DATA_L4_UCHA, DATA_L4_KAZVAM, DATA_L4_OPRAVYAM, DATA_L4_PRAVYA, DATA_L4_YAM, DATA_L4_CONJ_TYPE, DATA_L4_MIYA_SE, DATA_L4_REFL_VOCAB, DATA_L4_TIME_PERIOD, DATA_L4_PAST_TIME, DATA_L4_FREQ, DATA_L4_NEVER, DATA_L4_ANT, DATA_L4_PREP_TIME, DATA_L4_HOURS, DATA_L4_HOURS_TYPE, DATA_L4_BYAH, DATA_L4_BYAH_TYPE, DATA_L4_SHTE_BADA, DATA_L4_SHTE_NEG, DATA_L4_PARADIGM, DATA_L4_BUILD, DATA_L4_HOURS_BUILD, DATA_L4_MATCH_ANT, DATA_L4_MATCH_CONJ, DATA_L4_ODD)
  - [x] Each new L5 mode backed by ≥6 data items. Evidence: `src/data/lesson5.ts` (DATA_L5_BODY, DATA_L5_APPEARANCE, DATA_L5_HAIR, DATA_L5_EYES, DATA_L5_FACE, DATA_L5_CHARACTER, DATA_L5_ANT, DATA_L5_COLORS, DATA_L5_CLOTHES, DATA_L5_STYLE, DATA_L5_FUTURE_TIME, DATA_L5_SHTE_NEG, DATA_L5_SHTE_AFF, DATA_L5_SHTE_NEG_ANS, DATA_L5_SHTE_PISHA, DATA_L5_KOYTO, DATA_L5_TAKAV, DATA_L5_OBICHAM, DATA_L5_PARADIGM, DATA_L5_BUILD, DATA_L5_KOGATO_BUILD, DATA_L5_MATCH_COLOR, DATA_L5_MATCH_ANT, DATA_L5_ODD)
  - [x] L6 `modeIds` cover L6 grammar topics (27 modes: street/address vocab pickFrom/type + polite formulas + titles + abbreviations match + мога/обичам paradigms + modal-verb pickFrom + да-construction build + motion-verbs pickFrom/type + motion-pair match + aspect impf↔term pickFrom + aspect match + imperative sg/pl/neg/irreg pickFrom + imperative type + context fill-in + 1sg↔imperative match + directions pickOpt + compass pickOpt + direction phrases pickFrom + direction build + combined paradigm + odd). Evidence: `src/data/lessons.ts` (l6 block), `src/data/index.ts` (l6_extra category)
  - [x] Each new L6 mode backed by ≥6 data items. Evidence: `src/data/lesson6.ts` (DATA_L6_STREET, DATA_L6_STREET_TYPE, DATA_L6_POLITE, DATA_L6_TITLES, DATA_L6_MATCH_ABBR, DATA_L6_MOGA, DATA_L6_OBICHAM, DATA_L6_MODAL, DATA_L6_DA_BUILD, DATA_L6_MOTION, DATA_L6_MOTION_TYPE, DATA_L6_MATCH_MOTION, DATA_L6_ASPECT, DATA_L6_MATCH_ASPECT, DATA_L6_IMP_SG, DATA_L6_IMP_PL, DATA_L6_IMP_NEG, DATA_L6_IMP_IRREG, DATA_L6_IMP_TYPE, DATA_L6_IMP_FILL, DATA_L6_MATCH_IMP, DATA_L6_DIR, DATA_L6_COMPASS, DATA_L6_DIR_PHRASES, DATA_L6_DIR_BUILD, DATA_L6_PARADIGM, DATA_L6_ODD)
  - [x] L7 `modeIds` cover L7 grammar topics (31 modes: 5 verb pick paradigms (купувам/продавам/давам/плащам/пазарувам) + shopping verbs vocab pickFrom + 3 vocab pickFrom (магазины/роли/термины) + what-where pickOpt + comp/super pickFrom + по/най pickOpt + diminutives pickFrom + ще/няма да pickOpt + future-neg transform pickFrom + нещо/нищо pickOpt + dative-short pickOpt + dative-transform pickFrom + харесва/отива/става pickOpt + approx-quantity pickFrom + money-count pickFrom + seller/buyer pickOpt + 5-verb paradigm + 2 build modes + 4 match modes + odd). Evidence: `src/data/lessons.ts` (l7 block), `src/data/index.ts` (l7_extra category)
  - [x] Each new L7 mode backed by ≥6 data items. Evidence: `src/data/lesson7.ts` (DATA_L7_STORES, DATA_L7_SHOP_PEOPLE, DATA_L7_SHOP_WORDS, DATA_L7_WHAT_WHERE, DATA_L7_KUPUVAM, DATA_L7_PRODAVAM, DATA_L7_DAVAM, DATA_L7_PLASCHTAM, DATA_L7_PAZARUVAM, DATA_L7_SHOP_VERBS, DATA_L7_COMP, DATA_L7_SUPER, DATA_L7_COMP_FILL, DATA_L7_DIM, DATA_L7_SHTE_NYAMA, DATA_L7_FUTURE_NEG, DATA_L7_NESHTO, DATA_L7_DAT_SHORT, DATA_L7_DAT_TRANS, DATA_L7_LIKES, DATA_L7_APPROX, DATA_L7_MONEY, DATA_L7_SELLER_BUYER, DATA_L7_PARADIGM, DATA_L7_BUILD, DATA_L7_MARKET_BUILD, DATA_L7_MATCH_PRON_DAT, DATA_L7_MATCH_ACC_DAT, DATA_L7_MATCH_ANT, DATA_L7_MATCH_STORE, DATA_L7_ODD)
  - [x] L8 `modeIds` cover L8 grammar topics (30 modes: 12 vocab pickFrom/type for еда/плодове/зеленчуци/месо/подправки/напитки/съдове/ястия/ресторант + taste pickOpt + cooking-verbs pickFrom + method pickOpt + гладен/жаден pickOpt + яде/ядат ми се pickOpt + пие/пият ми се pickOpt + part pickFrom/type + perf-aux pickOpt + perf-word-order pickFrom + perf-li (li engine) + perf-short pickOpt + perf-paradigm + build + 3 match (cognate / drink-food / taste-product) + odd). Evidence: `src/data/lessons.ts` (l8 block), `src/data/index.ts` (l8_extra category)
  - [x] Each new L8 mode backed by ≥5 data items (≥10 for vocab pickFrom/type, ≥12 for grammar drills; paradigm = 5 verb paradigms × 6 form slots; match-taste = 5 bijective pairs). Evidence: `src/data/lesson8.ts` (DATA_L8_FOOD, DATA_L8_FOOD_TYPE, DATA_L8_FRUITS, DATA_L8_FRUITS_TYPE, DATA_L8_VEGETABLES, DATA_L8_VEGETABLES_TYPE, DATA_L8_MEAT_DAIRY, DATA_L8_SPICES, DATA_L8_DRINKS, DATA_L8_TABLEWARE, DATA_L8_DISHES, DATA_L8_RESTAURANT, DATA_L8_TASTE, DATA_L8_COOKING, DATA_L8_METHOD, DATA_L8_GLAD_ZHAD, DATA_L8_YADE_MI_SE, DATA_L8_PIE_MI_SE, DATA_L8_PART, DATA_L8_PART_TYPE, DATA_L8_PERF_AUX, DATA_L8_PERF_WO, DATA_L8_PERF_LI, DATA_L8_PERF_SHORT, DATA_L8_PERF_PARADIGM, DATA_L8_BUILD, DATA_L8_MATCH_COGNATE, DATA_L8_MATCH_PAIRS, DATA_L8_MATCH_TASTE, DATA_L8_ODD)
  - [x] Data split into per-lesson modules with composition root. Evidence: `src/data/index.ts`, `src/data/lesson1.ts`, `src/data/lesson2.ts`, `src/data/lesson3.ts`, `src/data/lesson4.ts`, `src/data/lesson5.ts`, `src/data/lesson6.ts`, `src/data/lesson7.ts`, `src/data/lesson8.ts`
  - [x] `Lesson` shape = `{ id, num, title, modeIds, available }`; no tier/access field (all lessons unlocked). Evidence: `src/types.ts:14-20`, `src/data/lessons.ts`
- **Status:** [x]

### 3.11 FR-ROUND
- **Desc:** Round = `ROUND_GAMES` (=3) random games from a lesson, each of `SESSION_SIZE_BY_PACE[pace]` questions, played consecutively without returning to menu. Round size is fixed at start (snapshot `size` into `RoundState`), so changing pace mid-round has no effect. On completion, one aggregated `HistoryEntry` written with `mode="round:<lessonId>"`, `round=true`, `qsTotal = ROUND_GAMES × size`. Single results screen shows summed score/time/errors.
- **Scenario:** User picks pace → taps "Раунд" → plays 3 games in sequence → results screen with sums → history shows one `round:l1` entry.
- **Acceptance:**
  - [x] Round state machine advances through queue without screen change. Evidence: `src/App.tsx`
  - [x] `RoundState.size` snapshots pace at start; per-game qsTotal uses `round.size`. Evidence: `src/App.tsx` (`startRound`, `handleComplete`)
  - [x] On completion writes single history entry with `round=true`, `qsTotal`, `lessonId`. Evidence: `src/App.tsx` (`handleComplete`)
  - [x] Abort via inline `ConfirmBar` (not `window.confirm`). Evidence: `src/components/ui/ConfirmBar.tsx`, `src/App.tsx`
- **Status:** [x]

### 3.16 FR-PACE
- **Desc:** User selects session pace on `LessonScreen`: `quick`=3, `standard`=5 (default), `deep`=8 questions per game. Pace applies uniformly to single games and rounds (round total = `ROUND_GAMES × size`). Persisted in `localStorage` under `bg-trainer-pace-v1`. Scientific anchors: Cowan WM (4±1), Cepeda distributed practice, Duolingo 5-min microlearning norm, Bjork desirable difficulty (~80% success).
- **Scenario:** User opens lesson → sees 3-button pace segment with per-pace question count → taps pace → choice persists across reloads → subsequent round/game uses selected size.
- **Acceptance:**
  - [x] `SessionPace` type = `"quick" | "standard" | "deep"`. Evidence: `src/types.ts`
  - [x] `SESSION_SIZE_BY_PACE = {quick:3, standard:5, deep:8}`. Evidence: `src/constants.ts`
  - [x] Pace persisted under `bg-trainer-pace-v1`, default `standard`. Evidence: `src/utils/pace.ts`, `src/constants.ts`
  - [x] 3-button pace selector on `LessonScreen` shows question count. Evidence: `src/components/screens/LessonScreen.tsx`
  - [x] Round button label reflects pace (`3 × N = 3N вопросов`). Evidence: `src/components/screens/LessonScreen.tsx`
- **Status:** [x]

### 3.3 FR-SCORING
- **Desc:** Correct on first attempt = +10 pts. Timed mode adds speed bonus on first-attempt correct. Wrong answer increments error count once, 0 pts; retries on the same question are not scored (see FR-RETRY).
- **Acceptance:**
  - [x] Base +10 pts on first-attempt correct only. Evidence: `src/hooks/useGame.ts`
  - [x] Speed bonus applied in `TimedEngine` via `extraPts`, only on first-attempt correct. Evidence: `src/components/engines/TimedEngine.tsx`, `src/hooks/useGame.ts`
  - [x] Duplicate / post-correct selections rejected via `lockedRef`. Evidence: `src/hooks/useGame.ts`
  - [x] Retry-success after first-wrong adds 0 pts. Evidence: `src/hooks/useGame.ts`
- **Status:** [x]

### 3.4 FR-ENGINES
- **Desc:** 11 engine types implement distinct interaction patterns. Multiple-choice engines hide L1 hints by default and expose a "Подсказка" reveal button; reveal sets `hinted=true` which is forwarded to `onItemAnswer` and softens mastery effects (see FR-MASTERY).
- **Acceptance:**
  - [x] `pick` — 3 shuffled options, hint-on-demand. Evidence: `src/components/engines/PickEngine.tsx:11,18,39-45`
  - [x] `timed` — timed quiz + speed bonus, hint-on-demand. Evidence: `src/components/engines/TimedEngine.tsx`, `src/hooks/useTimer.ts`
  - [x] `pickOpt` — fixed option set (articles, gender), hint-on-demand. Evidence: `src/components/engines/PickOptEngine.tsx`
  - [x] `pickFrom` — pick correct form from decoys, hint-on-demand. Evidence: `src/components/engines/PickFromEngine.tsx`
  - [x] `negation` — build negation from word tiles. Evidence: `src/components/engines/NegEngine.tsx`
  - [x] `build` — drag-to-order sentence. Evidence: `src/components/engines/BuildEngine.tsx`
  - [x] `li` — tap position to insert particle "ли". Evidence: `src/components/engines/LiEngine.tsx`
  - [x] `type` — keyboard input with whitelist normalization (trim, lowercase, whitespace collapse — no char substitutions). Evidence: `src/components/engines/TypeEngine.tsx:13-16`
  - [x] `match` — tap-pair 2-column matching, relational encoding. Evidence: `src/components/engines/MatchEngine.tsx`
  - [x] `odd` — tap the intruder word, category-boundary drill. Evidence: `src/components/engines/OddOneOutEngine.tsx`
  - [x] `paradigm` — 6-slot paradigm completion via tile bank. Evidence: `src/components/engines/ParadigmEngine.tsx`
- **Status:** [x]

### 3.4.1 FR-MATCH
- **Desc:** Relational encoding: user taps a left-column tile then a right-column tile to pair them. Correct pairs lock green; wrong attempts flash red on the two tapped cells and reset. Session ends when all pairs matched. Data: `MatchItem[]` = `{ left, right, hint }`. Score = +10 per first-try correct pair.
- **Acceptance:**
  - [x] Separate left/right state so flash-fail only lights the two tapped cells. Evidence: `src/components/engines/MatchEngine.tsx`
  - [x] Item answer event fired per attempt via `itemKey(pairs[selLeft])`. Evidence: `src/components/engines/MatchEngine.tsx`
  - [x] At least one mode: `match_country_lang`, `match_country_nat`, `match_profession`. Evidence: `src/data/index.ts`
- **Status:** [x]

### 3.4.2 FR-ODD
- **Desc:** Category-boundary drill. User sees 4 tiles and taps the one that does not belong. Correct → green, wrong → red + highlights correct. Session = `SESSION_SIZE_BY_PACE[pace]` items. Data: `OddItem[]` = `{ words, odd, hint, rule? }`.
- **Acceptance:**
  - [x] Engine reuses `useGame` via `DataItem[]` cast for scoring/retry parity. Evidence: `src/components/engines/OddOneOutEngine.tsx`
  - [x] At least one mode: `odd_mixed`. Evidence: `src/data/index.ts`
- **Status:** [x]

### 3.4.3 FR-PARADIGM
- **Desc:** Schema formation via whole-paradigm completion. User sees a verb + 6 pronoun rows + a shuffled form bank, taps a form to fill the next empty slot (taps a filled slot to return the form). When all 6 filled, engine marks each row green/red, reveals correct form under wrong rows, and advances. Score = +5 per correct slot. Data: `ParadigmItem[]` = `{ verb, pronouns, forms, hint, rule? }`.
- **Acceptance:**
  - [x] 6 pronoun slots, tile bank below, tap-fill + tap-unfill. Evidence: `src/components/engines/ParadigmEngine.tsx`
  - [x] Per-slot check + correct-form reveal on wrong rows. Evidence: `src/components/engines/ParadigmEngine.tsx`
  - [x] `paradigm_fill` mode over 6 verbs (съм, имам, нямам, искам, казвам се, говоря). Evidence: `src/data/index.ts`
- **Status:** [x]

### 3.4.4 FR-BUILD
- **Desc:** Sentence construction drills word order, not typography. The answer area is a template: punctuation (`. , ? ! …`) is rendered by the engine in fixed positions and never enters the tile pool; word positions show empty slots the learner fills left-to-right. A mark and the word before it render as one unwrappable group, so a line break cannot orphan a mark. Punctuation is derived from `BuildItem.words` at render time, never stored separately — the mastery key is `words.join("|")`, so rewriting the data would drop learner progress. Tapping a placed word returns it to the pool and shifts later words one slot left.
- **Acceptance:**
  - [x] `PUNCT` set + `joinTokens` / `buildTemplate` as the single source of truth. Evidence: `src/utils/punct.ts:9,14,36`
  - [x] Pool is built from `target` (punctuation-free); template derived per item. Evidence: `src/components/engines/BuildEngine.tsx:36,51`
  - [x] Word + following mark render as one non-wrapping group. Evidence: `src/components/engines/BuildEngine.tsx:40-48,101-119`
  - [x] Marks at `text-gray-600` (7.56:1), inert; empty slots `aria-hidden`. Evidence: `src/components/engines/BuildEngine.tsx:106,115`
  - [x] Correction line composed with `joinTokens` — no space before a mark. Evidence: `src/components/engines/BuildEngine.tsx:121`
  - [x] Invariant asserted over all 427 `words[]` arrays in `src/data`: no punctuation reaches the pool, every template round-trips. Evidence: `node scripts/check-build-punct.mjs`
  - [x] `src/data/*.ts` unchanged, so mastery keys survive. Evidence: `git diff --stat -- 'src/data/*.ts'` is empty
- **Status:** [x]

### 3.13 FR-SCHED
- **Desc:** Session item selection uses an SRS-like scheduler (`pickDueItems`) over the mastery store. Items are scored by `(overdue + weakBonus_if_level<7)` where `dueAt = lastTs + DAY_MS · 2^level`; unseen items get top priority. The top-K (K = 2n) are shuffled and sliced to n to avoid monotone order. When mastery is empty or all scores are zero → fallback to `shuffle(items).slice(0, n)`. The scheduler is applied by `sliceData` when mastery is provided; Round sessions also use it.
- **Acceptance:**
  - [x] `pickDueItems(store, modeId, items, n, now)` selects by due/weak score with shuffled top-K. Evidence: `src/utils/mastery.ts:74-99`
  - [x] Shuffle fallback when all scores are zero. Evidence: `src/utils/mastery.ts:93`
  - [x] `sliceData(mode, size, mastery, now?)` uses scheduler when `mastery` is defined. Evidence: `src/utils/sliceData.ts:10-33`
  - [x] `App.tsx` passes current `mastery` to `sliceData` for both single-mode and round sessions. Evidence: `src/App.tsx:193-196`
- **Status:** [x]

### 3.14 FR-TYPE
- **Desc:** `TypeEngine` accepts keyboard input. Normalization is **whitelist-only**: `trim`, `toLowerCase`, collapse internal whitespace. No character substitutions — `ѝ` vs `и`, stress marks, punctuation kept intact to preserve orthographic distinctions. Submit blocked when normalized input is empty.
- **Acceptance:**
  - [x] Whitelist normalization only. Evidence: `src/components/engines/TypeEngine.tsx:13-16`
  - [x] Empty-after-normalize submit blocked. Evidence: `src/components/engines/TypeEngine.tsx:41-45`
  - [x] Registered in engine dispatch. Evidence: `src/components/engines/index.ts:10,22`
  - [x] At least one mode uses `type`: `sym_type`. Evidence: `src/data/index.ts:298`
- **Status:** [x]

### 3.15 FR-FEEDBACK-RULE
- **Desc:** Elaborative feedback: `DataItem.rule?` may carry a short rule explanation. On wrong answer, engines show the rule under the correct form in `Correction` (or inline for `PickEngine`). Required: rule strings defined for `DATA_SYM`, `DATA_IMAM`, `DATA_ISKAM`, `DATA_ARTICLE` (minimum).
- **Acceptance:**
  - [x] `DataItem.rule?: string` field exists. Evidence: `src/types.ts:26`
  - [x] `Correction` renders `rule` when provided. Evidence: `src/components/ui/Correction.tsx:1-10`
  - [x] Rules defined for core paradigms/articles. Evidence: `src/data/index.ts:3-10,12-19,21-28,30-54`
- **Status:** [x]

### 3.5 FR-REACTION
- **Desc:** After each answer, show a Russian-language reaction (OK or FAIL) and, on wrong, reveal the correct answer.
- **Acceptance:**
  - [x] Reaction picked from `OK` / `FAIL` arrays. Evidence: `src/constants.ts:1-2`, `src/utils/shuffle.ts`
  - [x] Auto-advance after `delay` ms (default 1000). Evidence: `src/hooks/useGame.ts:45`
- **Status:** [x]

### 3.6 FR-HISTORY
- **Desc:** Game history persists in `localStorage` (key `bg-trainer-v3`), capped at 200 entries. Newest entries retained; oldest dropped. Optional fields `lessonId`, `round`, `qsTotal` extend schema without breaking legacy entries.
- **Acceptance:**
  - [x] Save trims to last 200. Evidence: `src/utils/history.ts:15`
  - [x] Load returns `[]` on parse failure. Evidence: `src/utils/history.ts:8`
  - [x] Storage key = `bg-trainer-v3`. Evidence: `src/constants.ts:7`
  - [x] `HistoryEntry` extended with optional `lessonId`, `round`, `qsTotal`. Evidence: `src/types.ts:1-10`
- **Status:** [x]

### 3.7 FR-ANALYTICS
- **Desc:** Analytics screen shows history dashboard with charts (score history, accuracy stats, mode distribution).
- **Acceptance:**
  - [x] Renders charts via Recharts. Evidence: `src/components/screens/AnalyticsScreen.tsx`
  - [x] Clear-history action available. Evidence: `src/utils/history.ts:18`, `src/App.tsx:315`
  - [ ] Mode distribution chart color-cycles through `CHART_COLORS`. Not wired: `CHART_COLORS` is declared in `src/constants.ts:12` and referenced nowhere.
  - [x] Mode distribution excludes `round:*` entries; rounds aggregated in dedicated "Раунды" section. Evidence: `src/components/screens/AnalyticsScreen.tsx:34-41,92-120`
  - [x] Accuracy uses per-entry `qsTotal` (fallback = 8). Evidence: `src/components/screens/AnalyticsScreen.tsx:33,54`
- **Status:** [ ]

### 3.8 FR-RESULTS
- **Desc:** End-of-game screen shows score, time, error count; offers "Play again" and "Back to menu".
- **Acceptance:**
  - [x] Screen component exists. Evidence: `src/components/screens/ResultsScreen.tsx`
  - [x] Appends `HistoryEntry` on completion. Evidence: `src/App.tsx`, `src/utils/history.ts`
- **Status:** [x]

### 3.12 FR-MASTERY
- **Desc:** Per-item mastery level (0–10) persisted in `localStorage` (key `bg-trainer-mastery-v1`). Independent from history. Update rule: correct `+1`, fast-correct (timed, within timer bonus) `+2`, wrong `−3`. Hinted answers soften the update: `ok+hinted = +0`, `fail+hinted = −1`. Lazy decay: correct answers on items untouched ≥7 days first drop 1 level, then apply reward. Speed-gate: `TimedEngine` disables the timer and speed bonus when the current item's level `< 5` to prevent System-1 guessing on undermastered items. Session item selection uses FR-SCHED (`pickDueItems`). Lesson-level aggregation: `ratio = sum(level) / (10 × totalItems)`. Lesson "полностью изучено" = ≥90% items at level ≥7 AND ≥60% at level 10.
- **Scenario:** User plays a mode → every answered item updates its level → `LessonsScreen` shows per-lesson progress bar + "K/M освоено · X%" → `LessonScreen` shows per-mode mini bar → `AnalyticsScreen` has separate reset for mastery.
- **Acceptance:**
  - [x] Mastery persisted under `bg-trainer-mastery-v1`, independent of `bg-trainer-v3`. Evidence: `src/utils/mastery.ts:4`, `src/constants.ts:7`
  - [x] Level bounded `[0, 10]`; correct `+1`, timed-fast `+2`, wrong `−3`. Evidence: `src/utils/mastery.ts:43-63`
  - [x] Hinted softening: `ok+hinted = +0`, `fail+hinted = −1`. Evidence: `src/utils/mastery.ts:51-62`
  - [x] Speed-gate: `TimedEngine` disables timer+bonus when item level < 5. Evidence: `src/components/engines/TimedEngine.tsx:25,32-43`
  - [x] Decay: stale-correct path reduces 1 level before reward. Evidence: `src/utils/mastery.ts:44,47`
  - [x] All 11 engines forward item identity via `onItemAnswer(itemId, ok, fast)`. Evidence: `src/hooks/useGame.ts:47-55`, `src/components/engines/PickEngine.tsx`, `src/components/engines/TimedEngine.tsx`, `src/components/engines/PickOptEngine.tsx`, `src/components/engines/PickFromEngine.tsx`, `src/components/engines/NegEngine.tsx`, `src/components/engines/BuildEngine.tsx`, `src/components/engines/LiEngine.tsx`, `src/components/engines/TypeEngine.tsx`, `src/components/engines/MatchEngine.tsx`, `src/components/engines/OddOneOutEngine.tsx`, `src/components/engines/ParadigmEngine.tsx`
  - [x] Mastery persisted once per session (on complete + on abort), not per answer. Evidence: `src/App.tsx:56-66,78-82,165,170`
  - [x] `LessonsScreen` shows progress bar + `K/M · X%`; mastered badge when criteria met. Evidence: `src/components/screens/LessonsScreen.tsx`
  - [x] `LessonScreen` shows per-mode mastery bars. Evidence: `src/components/screens/LessonScreen.tsx`
  - [x] `AnalyticsScreen` offers "Сбросить освоение" separate from history reset. Evidence: `src/components/screens/AnalyticsScreen.tsx`, `src/App.tsx:288`
  - [x] Existing `bg-trainer-v3` history preserved. Evidence: `src/constants.ts:7`, `src/utils/history.ts`
- **Status:** [x]

### 3.17 FR-LANG
- **Desc:** UI and L1 content available in 2 locales: `ru` (Russian) and `uk` (Ukrainian). User selects locale via segmented switcher on `LessonsScreen` header. Choice persists in `localStorage` under `bg-trainer-lang-v1`. First-run detection: `navigator.language.toLowerCase().startsWith("uk")` → `uk`, else `ru`. Bulgarian content (`q`, `answer`, `decoys`, `result`, `words`) is shared and never localized — Ukrainian/Russian only varies on `hint`, `rule`, `label`, `translation`, `Mode.label`/`desc`, `Category.name`, `Lesson.title`, `OK`/`FAIL` arrays, and UI strings. Resolved at render-time via `useI18n()` (`t`, `f`, `L`). Type-safe: `Localized<T> = Record<Locale, T>`; missing keys = compile error. Mid-session locale switch only re-resolves visible text — game state (`cur`, `corr`, `score`, `answered`) survives.
- **Scenario:** User opens app first time on UK browser → Ukrainian UI auto-selected. User taps `РУ` in switcher → all UI re-renders in Russian; choice saved. Reload → choice restored.
- **Acceptance:**
  - [x] `Locale = "ru" | "uk"`. Evidence: `src/i18n/types.ts:1`
  - [x] Locale persisted under `bg-trainer-lang-v1`; `navigator.language` fallback `uk` only when prefix `uk`. Evidence: `src/i18n/storage.ts`
  - [x] `LocaleProvider` mounted at root. Evidence: `src/main.tsx:8-10`
  - [x] `useI18n()` exposes `t`, `f`, `L`, `locale`, `setLocale`. Evidence: `src/i18n/context.tsx`
  - [x] UI strings dictionary has matching keys in both locales (compiler-enforced via `Record<StringKey, string>`). Evidence: `src/i18n/strings.ts`
  - [x] `Localized<T>` fields on `DataItem.hint/rule/label`, `BuildItem.translation`, `LiItem.translation`, `Mode.label/desc`, `Category.name`, `Lesson.title`. Evidence: `src/types.ts`
  - [x] `OK`/`FAIL` reactions are `Localized<string[]>`; passed into `useGame` via `reactions` prop. Evidence: `src/constants.ts:3-10`, `src/hooks/useGame.ts:23,95,99`
  - [x] Language switcher rendered on `LessonsScreen`. Evidence: `src/components/screens/LessonsScreen.tsx:28-43`
  - [x] `AnalyticsScreen` resolves mode label via `ALL_MODES.find(...).label` + `L()`, not raw modeId. Evidence: `src/components/screens/AnalyticsScreen.tsx:33-46`
  - [x] Glossary maintained. Evidence: `documents/i18n-glossary.md`
  - [x] `npm run build` passes. Evidence: build output zero TS errors.
- **Status:** [x]

### 3.18 FR-IOS-SHELL
- **Desc:** Native iOS shell via Capacitor 8 wrapping the same React SPA. Target iOS 15.0+. Bundle ID `dev.korchasa.bgtrainer`. Shared codebase with web; iOS build uses relative asset base (`./`). WKWebView hosts the app at `capacitor://localhost`.
- **Scenario:** `npm run ios:sync` rebuilds web assets with relative base and copies them into `ios/App/App/public/`. Xcode opens the project, runs it on simulator or device.
- **Acceptance:**
  - [x] Capacitor core/cli/ios v8 installed. Evidence: `package.json:17-19`
  - [x] `capacitor.config.ts` with `appId`, `appName`, `webDir=dist`. Evidence: `capacitor.config.ts`
  - [x] `build:ios`, `ios:sync`, `ios:open` npm scripts. Evidence: `package.json:10-12`
  - [x] iOS Xcode project generated at `ios/App/`. Evidence: `ios/App/App.xcodeproj/project.pbxproj`
  - [x] UIScene lifecycle adopted (eliminates ~20s cold-start stall on iOS 17+). Evidence: `ios/App/App/SceneDelegate.swift`, `ios/App/App/AppDelegate.swift:48-52`, `ios/App/App/Info.plist:29-46`
  - [x] Safe-area insets respected via `env(safe-area-inset-*)` + `contentInset: 'never'`. Evidence: `src/index.css:10-21`, `capacitor.config.ts:7-10`
  - [x] Container sized via `height: 100%` chain (no `100vh`). Evidence: `src/index.css:5-8`, `src/App.tsx:194,218,226`
  - [x] Inline splash in HTML shown until React mounts. Evidence: `index.html:11-22`, `src/main.tsx:15-17`
  - [x] Analytics screen code-split via `React.lazy` (main bundle 360 KB / gzip 94 KB). Evidence: `src/App.tsx:1,14,309-315`
- **Status:** [x]

### 3.19 FR-IOS-APPSTORE
- **Desc:** Assets and metadata required for App Store submission. Blockers for `xcodebuild archive` + review.
- **Acceptance:**
  - [x] AppIcon set: single 1024×1024 universal sRGB 8-bit no-alpha (Xcode 14+ accepts a single source; iOS scales). Brand red `#E60023` background with white «БГ» monogram. Evidence: `ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png`, `Contents.json`
  - [x] `LaunchScreen.storyboard` uses literal white `backgroundColor` (not `systemBackgroundColor` reference) so launch never flashes black even if Splash image fails to load. Splash image flattened to plain white 2732×2732. Evidence: `ios/App/App/Base.lproj/LaunchScreen.storyboard:18`, `ios/App/App/Assets.xcassets/Splash.imageset/`
  - [x] `PrivacyInfo.xcprivacy` declares `NSPrivacyTracking=false`, empty tracking domains and collected data types, and one `NSPrivacyAccessedAPIType` for `NSPrivacyAccessedAPICategoryUserDefaults` with reason `CA92.1` (own defaults). Wired into Xcode project as a build resource. No IAP/RevenueCat SDK; only Capacitor plugin manifests merge in at archive time. Evidence: `ios/App/App/PrivacyInfo.xcprivacy`, `ios/App/App.xcodeproj/project.pbxproj` (PBXBuildFile + PBXFileReference + PBXGroup + PBXResourcesBuildPhase entries with IDs `B6010101000000000000PRIV`/`B6010102000000000000PRIV`)
  - [x] `ITSAppUsesNonExemptEncryption: false` in Info.plist. Evidence: `ios/App/App/Info.plist:60-61`
  - [x] Orientation locked to `UIInterfaceOrientationPortrait` only; landscape variants and `~ipad` block removed. Evidence: `ios/App/App/Info.plist:53-55`
  - [x] Publicly hosted Privacy Policy (localStorage-only, no data transmission) — bilingual (EN+RU), live at `https://bgtrainer.korchasa.dev/privacy` (`/privacy.html` 308-redirects there). Hosted outside this repo, on Cloudflare Pages. Evidence: HTTP 200 verified 2026-08-02; `/terms` likewise.
  - [x] Apple Developer account active; Bundle ID `dev.korchasa.bgtrainer` registered. Evidence: ASC app `6766068069` (manual — outside repo).
  - [x] App Store Connect listing — partial: app registered, primary category=Education, content rights=no third-party content, age rating=4+. Localized Name/Subtitle filled for English (U.S.), Russian, Ukrainian. App Store version 1.0 metadata filled in all three locales: promotional text, description, keywords, support URL (`github.com/korchasa/bg-trainer/issues`), marketing URL (`bgtrainer.korchasa.dev`), copyright. Evidence: ASC distribution dashboard for app `6766068069` (manual). Privacy Policy URL, App Privacy questionnaire ("Data Not Collected", published) and the $1.99 price are all set; version 1.0 is `READY_FOR_SALE` and available in 175 territories.
  - [x] Code signing configured — this repo archives unsigned (`CODE_SIGNING_ALLOWED=NO`); the certificate, App Store profile and signed export are produced outside it. Evidence: repo side `scripts/build-ios-archive.sh:35-37`; signed builds 2–4 on ASC app `6766068069` (manual — outside repo).
  - [x] Screenshots for iPhone 6.7" (1290×2796) uploaded for all three locales (ru/uk plus the uk artwork in the en-US slot — the app has no English UI). Captured from the web build via headless Chrome at viewport 430×932, `deviceScaleFactor: 3`. Evidence: ASC app `6766068069`; artwork stored outside this repo.
  - [x] TestFlight build uploaded via `xcodebuild archive` + `xcodebuild -exportArchive` — run outside this repo, not by its CI. Evidence: builds 2–4 on ASC app `6766068069`.
- **Status:** [x]

### 3.20 FR-IOS-UX
- **Desc:** Native-feel tweaks on top of the web UX.
- **Acceptance:**
  - [x] `@capacitor/splash-screen` plugin for native splash during WebView load; HTML splash covers the in-WebView phase, native splash covers the cold-start phase, both dismissed in the post-mount `requestAnimationFrame`. Evidence: `package.json:16`, `capacitor.config.ts:11-19`, `src/utils/nativeUx.ts:10-18`, `src/main.tsx:24-28`
  - [x] `@capacitor/status-bar` for programmatic status-bar style control. Global dark-glyph style applied at boot to match the white app shell; per-screen overrides not yet needed. Evidence: `package.json:18`, `src/utils/nativeUx.ts:20-32`, `src/main.tsx:22`
  - [x] `@capacitor/haptics` — Light impact on first-attempt correct, Medium impact on first-attempt wrong, Success notification on round completion. Evidence: `package.json:17`, `src/utils/nativeUx.ts:34-46`, `src/hooks/useGame.ts:5-6,118-122`, `src/App.tsx:4,108`
  - [x] No runtime web-font fetch — UI uses system fonts (`-apple-system`, `system-ui`), guaranteed available offline on iOS/Android/web. Self-hosting Inter would only inflate the bundle without removing any external dependency, so it is not done. Evidence: `src/index.css:11`
  - [x] Back-swipe gesture: Capacitor 8 sets `allowsBackForwardNavigationGestures=false` by default for WKWebView, which is the correct behavior for this single-page app. No override needed; will revisit if device testing surfaces an edge case.
  - [x] `prefers-reduced-motion` honored — `useGame` shortcuts the celebratory advance delay to 0ms when the OS-level Reduce Motion accessibility setting is on. Evidence: `src/utils/motion.ts`, `src/hooks/useGame.ts:7,118`
- **Status:** [x]

### 3.21 FR-IOS-STORAGE
- **Desc:** Migrate persistent state off `localStorage` to survive iOS "Offload Unused Apps" and WebKit cache eviction. Keys unchanged; adapter provides fallback for web build.
- **Scenario:** On first launch after upgrade, app reads legacy `localStorage` keys, writes them into `@capacitor/preferences`, deletes legacy keys. Subsequent reads/writes hit Preferences (native) or `localStorage` (web).
- **Acceptance:**
  - [x] `@capacitor/preferences` plugin installed. Evidence: `package.json:15`
  - [x] Storage adapter with unified API for web (localStorage) and native (Preferences); reads sync from in-memory cache, writes mirror async to Preferences. Evidence: `src/utils/storage.ts`, callers refactored in `src/utils/history.ts`, `src/utils/mastery.ts`, `src/utils/pace.ts`, `src/i18n/storage.ts`
  - [x] One-time idempotent migration for keys `bg-trainer-v3`, `bg-trainer-mastery-v1`, `bg-trainer-pace-v1`, `bg-trainer-lang-v1`; tracked by per-key `__migrated__:` flag so reruns are no-ops. Evidence: `src/utils/storage.ts:30-79`
  - [x] App boot awaits `initStorage()` before mounting React; HTML splash covers hydration so the first render sees real persisted state without flicker. Evidence: `src/main.tsx:11-17`
  - [ ] History/mastery survive app backgrounding + device storage pressure (verification pending — requires on-device test).
  - [ ] Documents folder or `NSUserDefaults` included in iTunes/iCloud backup (non-`WebKit/` location) — Capacitor Preferences uses `NSUserDefaults` which is backed up by default; on-device verification pending.
- **Status:** [ ]

### 3.22 FR-IOS-POLISH
- **Desc:** Optional native-integration niceties.
- **Acceptance:**
  - [x] Dark mode opt-out via `UIUserInterfaceStyle: Light` in Info.plist. Evidence: `ios/App/App/Info.plist:58-59`
  - [x] iPad dropped via `TARGETED_DEVICE_FAMILY = "1"` (iPhone-only). Evidence: `ios/App/App.xcodeproj/project.pbxproj:320,341`
  - [x] VoiceOver labels on answer tiles, progress, navigation buttons via localized `useI18n` keys (`a11yBack`, `a11yAnswerCorrect/Wrong`, `a11yProgress`). Evidence: `src/components/ui/BackButton.tsx:9`, `src/components/ui/AnswerBtn.tsx:24-31`, `src/components/ui/Progress.tsx:14-21`, `src/i18n/strings.ts:71-73,123-125,152,162` (manual rotor walkthrough on device pending — `manual — korchasa`)
  - [x] Dynamic Type: see FR-A11Y-TEXT. rem units alone do not follow the iOS text-size setting — a WKWebView only reflects it through the `-apple-system-body` shorthand, which is now measured explicitly. Evidence: `src/utils/textScale.ts:22-24,38-47`
  - [ ] Crash reporting (Sentry or Firebase Crashlytics) for production builds — pending `VITE_SENTRY_DSN`.
- **Status:** [ ]

### 3.23 FR-IOS-CICD
- **Desc:** No store-release pipeline in this repo. CI publishes the web app only; signing, `.ipa` packaging and App Store Connect upload happen outside the repository, so no signing or ASC credential is stored here.
- **Acceptance:**
  - [x] No workflow builds, signs, packages or uploads an iOS binary. Evidence: `.github/workflows/` holds only `deploy.yml`, `preview.yml`, `cleanup-preview.yml`
  - [x] No workflow reads an Apple signing or ASC secret; the only secret in use is the auto-provided `GITHUB_TOKEN`. Evidence: `.github/workflows/deploy.yml:42`, `.github/workflows/preview.yml:42`
  - [x] `web-v*` is the only tag pattern any workflow reacts to. Evidence: `.github/workflows/deploy.yml:3-9`
  - [x] The repo-side iOS build stops at an unsigned archive. Evidence: `scripts/build-ios-archive.sh:35-37` (`CODE_SIGNING_ALLOWED=NO`), `package.json:13`
- **Status:** [x]

### 3.9 FR-NAV
- **Desc:** Screens: `lessons` (root), `lesson`, `game`, `results`, `analytics`. Flow: `lessons → lesson → game → results → lesson`. Back from `game` during a round opens an inline confirm bar.
- **Acceptance:**
  - [x] Screen state owned by `App.tsx`. Evidence: `src/App.tsx:29-38`
  - [x] Initial screen on load = `lessons`. Evidence: `src/App.tsx:29`
  - [x] Back during round shows `ConfirmBar` instead of browser confirm. Evidence: `src/App.tsx:114-129,190-198`
  - [x] `NavHeader` + `BackButton` provide navigation. Evidence: `src/components/ui/NavHeader.tsx`, `src/components/ui/BackButton.tsx`
  - [x] `Screen` type = `"lessons" | "lesson" | "game" | "results" | "analytics"` (no `paywall`). Evidence: `src/types.ts:95`
- **Status:** [x]

### 3.24 FR-PAID
- **Desc:** iOS app is a paid one-time download at App Store price tier $1.99 USD (≈ €2.49 EUR). No IAP, no subscription, no in-app unlock, no Pro entitlement, no lesson tier. Every buyer gets all 8 lessons. Web build stays free on GitHub Pages. Single codebase; no platform-conditional content gating. Supersedes the removed FR-FREEMIUM / FR-IAP / FR-PAYWALL.
- **Scenario:** User buys the app once on the App Store → installs → all 8 lessons open immediately. Web user opens `bgtrainer.korchasa.dev` → all 8 lessons open, free.
- **Acceptance:**
  - [x] No tier/entitlement field on `Lesson`; all `available` lessons open directly. Evidence: `src/types.ts:14-20`, `src/components/screens/LessonsScreen.tsx`
  - [x] No IAP code: `src/services/iap.ts` and `src/components/screens/PaywallScreen.tsx` absent; no RevenueCat dependency. Evidence: `! ls src/services/iap.ts src/components/screens/PaywallScreen.tsx`; `! grep -rn "revenuecat\|proUnlocked\|purchasePackage" src/`
  - [x] ASC Pricing form set to paid tier $1.99 USD (manual — outside repo). Evidence: price schedule on ASC app `6766068069`.
- **Status:** [x]

### 3.27 FR-ANDROID-SHELL
- **Desc:** Native Android shell via Capacitor 8 wrapping the React SPA. minSdk 24, targetSdk 34, package `dev.korchasa.bgtrainer`. Single Activity (`MainActivity`) hosting the WebView at `https://localhost`. Shared codebase with web/iOS; same `VITE_BASE_PATH=./` build.
- **Scenario:** `npm run android:sync` rebuilds web assets with relative base and copies to `android/app/src/main/assets/public/`. Android Studio opens project, runs on emulator or device.
- **Acceptance:**
  - [ ] `@capacitor/android` v8 added.
  - [ ] `build:android`, `android:sync`, `android:open` npm scripts.
  - [ ] Android Studio project at `android/`.
  - [ ] Edge-to-edge layout respects `WindowInsets` (parity with iOS safe-area handling).
  - [ ] Status-bar style controlled (light content on dark background).
  - [ ] Hardware back-button maps to in-app navigation (or default WebView back).
  - [ ] App icon set in `android/app/src/main/res/mipmap-*/` (adaptive foreground + background).
- **Status:** [ ]

### 3.28 FR-ANDROID-PLAYSTORE
- **Desc:** Assets and metadata required for Google Play Console submission.
- **Acceptance:**
  - [ ] Google Play Console developer account ($25 one-time).
  - [ ] Adaptive launcher icons (foreground + background layers, 108×108 dp).
  - [ ] Feature graphic 1024×500.
  - [ ] Phone screenshots (320–3840 px, 16:9 to 9:16).
  - [ ] Short description ≤80 chars; full description ≤4000 chars (RU/UK/EN).
  - [ ] Publicly hosted Privacy Policy URL.
  - [ ] Data Safety form completed (no data collection; local storage only).
  - [ ] Content rating questionnaire (target: Everyone).
  - [ ] Internal Testing → Closed Testing → Production rollout.
- **Status:** [ ]

### 3.29 FR-ANDROID-CICD
- **Desc:** Android release delivery. The app is meant to ship on Google Play, but this repo carries no store-release pipeline and holds no signing material for one — the same arrangement as iOS (FR-IOS-CICD): the repo builds an unsigned artifact, signing and upload happen outside it.
- **Acceptance:**
  - [ ] `./gradlew bundleRelease` runs from a checkout of this repo and produces an unsigned `.aab`.
  - [ ] No keystore, keystore password or Play publishing credential is stored in this repo or in its CI secrets.
  - [ ] No workflow here builds, signs or uploads an Android release; `web-v*` stays the only tag pattern any workflow reacts to.
  - [ ] `versionCode` stays a monotonic int assigned by the release build outside this repo, never derived from a git tag here (tags can be re-cut); `versionName` likewise.
  - [ ] Signing and upload to Google Play (default track: Internal Testing) are performed outside this repo.
- **Status:** [ ]

### 3.30 FR-SYNC-PAID — REMOVED
- **Status:** [x] Removed. Was Pro-only iCloud KVS cross-device sync; there is no Pro tier in the paid-app model. Progress (history + mastery + pace + lang) stays local-only on device via Capacitor Preferences (see FR-IOS-STORAGE). No cloud sync.

### 3.31 FR-A11Y-TEXT
- **Desc:** Legible type for low-vision users. Type ramp floored at 13px; instruction and error-rule text ≥15px; user-selectable text size with 4 steps, the default following iOS Dynamic Type; pinch-zoom available. Meaningless sentence-final periods absent from the exercise data (`?`, `!`, `…`, abbreviations and punctuation word-tiles preserved).
- **Scenario:** User with reduced vision raises the iOS system text size → app follows on next foreground. Or picks "Крупный"/"Очень крупный" in-app → whole UI scales, choice persists across launches.
- **Acceptance:**
  - [x] Type ramp rescaled: `xs` 13px (was 12), `sm` 15px (14), `base` 17px (16), top `7xl` 60px (72) — one screen now spans 4.6x, not 8x. Evidence: `tailwind.config.js:13-25`
  - [x] No text below 13px anywhere. Evidence: `! grep -rn 'text-\[0\.[0-7][0-9]*rem\]\|text-\[1[0-2]px\]' src --include='*.tsx'` returns nothing
  - [x] Root font-size = `calc(16px * var(--fs-scale))`; all Tailwind sizes rem-based, so one variable scales the UI. Evidence: `src/index.css:6-13`, `tailwind.config.js:13-25`
  - [x] Text size setting with 4 steps (`system` default, `normal`, `large` 1.15x, `xlarge` 1.3x); persisted. Evidence: `src/utils/textScale.ts:15-31,57-67`, `src/components/ui/TextSizeControl.tsx`, `src/utils/storage.ts:16-22`
  - [x] `system` reads iOS Dynamic Type by measuring a probe styled `font: -apple-system-body` against the 17px "Large" baseline, clamped to [1, 1.4] so fixed-height controls survive accessibility sizes. Evidence: `src/utils/textScale.ts:22-24,38-47`
  - [x] Scale re-measured on app foreground while in `system` mode. Evidence: `src/App.tsx:60-69`
  - [x] Scale applied before first paint (no flash at wrong size). Evidence: `src/main.tsx:13-15`
  - [x] Task prompt 17px at 10.31:1 (was 12px at 4.83:1); error rule 15–17px at 10.31:1 (was 12–14px). Evidence: `src/components/ui/TaskPrompt.tsx:10`, `src/components/ui/Correction.tsx:13`, `src/components/ui/ErrorDialog.tsx:33`
  - [x] Pinch-zoom re-enabled — WKWebView honours `user-scalable=no` (Safari ignores it), so the old value left no zoom path. Evidence: `index.html:7`
  - [x] Answer buttons carry `px-4 py-3 min-h-[3.5rem]` + `break-words` in the shared component, not at call sites. Evidence: `src/components/ui/AnswerBtn.tsx:39`
  - [x] Meaningless periods removed from the data itself, decided per exercise; 1107 removed across 8 lesson files. No render-time trimming remains. Evidence: `! grep -rn 'stripFinalPeriod' src` returns nothing
  - [x] Abbreviations, `?`, `!`, `…` and punctuation word-tiles survive; 22 dotted strings remain, all legitimate (`ул.`, `1 stot.`, `ям → м.р., ед.`, `На 29.08.1979 г.`), plus 14 `"."` drag tiles. Evidence: `src/data/lesson6.ts:108-119`, `src/data/lesson7.ts:589`, `src/data/lesson1.ts` (DATA_PROFILE_BUILD)
  - [x] Answers stay character-identical to their fixed option sets across all 45 `pickOpt` modes; no answer duplicates its own decoys. Evidence: verified over all 232 modes / 3783 items — 0 mismatches
  - [x] Mastery records stranded by the text change are re-pointed at load; legitimately dotted keys are not. Evidence: `src/utils/mastery.ts:65-97`, `src/App.tsx:53-57`
- **Status:** [x]

### 3.32 FR-A11Y-CONTRAST
- **Desc:** Meaningful text meets WCAG AA (4.5:1 on white). `gray-400` (2.54:1) and `gray-300` (1.47:1) are no longer used for text.
- **Acceptance:**
  - [x] Hints, translations, counters and section headers moved to `gray-500` (4.83:1), `gray-600` (7.56:1) or `gray-700` (10.31:1). Evidence: `! grep -rn 'text-gray-300\|text-gray-400' src --include='*.tsx'` returns nothing
  - [x] Dimmed answer options after answering use `gray-500` on `gray-50`, not `gray-300` on white. Evidence: `src/components/ui/AnswerBtn.tsx:23`, `src/components/engines/NegEngine.tsx:69`
  - [x] Recharts axis ticks 13px at `#6b7280` (was 10px at `#9ca3af`). Evidence: `src/components/screens/AnalyticsScreen.tsx:152-153`
- **Status:** [x]

### 3.33 FR-RESPONSIVE-LAYOUT
- **Desc:** Layout keys off window width and content length, never device class. App stays iPhone-only (FR-IOS-POLISH), but must survive 320pt windows and long Bulgarian words.
- **Acceptance:**
  - [x] Answer columns derived from the longest option: ≤5 chars → 3 columns, ≤11 → 2, else 1. Single shared component used by every choice engine. Evidence: `src/components/ui/AnswerGrid.tsx:10-24`, `src/components/engines/PickEngine.tsx:69`, `PickOptEngine.tsx:58`, `PickFromEngine.tsx:64`, `TimedEngine.tsx:92`, `OddOneOutEngine.tsx:51`
  - [x] Game tiles converted from 3-column squares (87pt of label width) to full-width rows. Evidence: `src/components/screens/LessonScreen.tsx:65-94`
  - [x] Pace selector is one line per segment; question count moved to its own row. Evidence: `src/components/screens/LessonScreen.tsx:35-54`
  - [x] Lesson titles wrap instead of truncating. Evidence: `src/components/screens/LessonsScreen.tsx:83`
  - [x] `xs: 380px` breakpoint drops a padding step on narrow windows. Evidence: `tailwind.config.js:29-31`
  - [x] Verified at 320 / 390pt widths, at normal and 1.3x text scale, with no horizontal overflow (`manual — korchasa`, browser check 2026-08-02).
- **Status:** [x]

## 4. Non-Functional
- **Perf:** Initial bundle small enough for mobile networks (Vite tree-shake + code-split). Interaction latency < 50ms on mid-range mobile.
- **Reliability:** `localStorage` failures (quota, disabled) must not crash the app — silent no-op. Evidence: `src/utils/history.ts:17, 23`.
- **Sec:** No PII, no external API, no user auth. Static assets only.
- **Scale:** Single user per browser. Max 200 session records.
- **UX:** Mobile-first, accent `#E60023`, dark `#111111`, centered `md` container. Text ≥13px, meaningful text ≥4.5:1 contrast, user-scalable to 1.3x in-app and 5x by pinch (FR-A11Y-TEXT, FR-A11Y-CONTRAST).

## 5. Interfaces
- **UI:** Custom React components. No external UI library. Tailwind utility classes.
- **Storage:** Browser `localStorage` JSON-serialized `HistoryEntry[]`. Key `bg-trainer-v3`. iOS: `@capacitor/preferences` (FR-IOS-STORAGE), local-only (no cloud sync).
- **Deploy:**
  - **Web:** GitHub Pages, custom domain `app.bgtrainer.korchasa.dev` (CNAME in `public/`). App at the root (Vite base `/`); branch previews at `/preview/{branch}/`; `keep_files: true` keeps them across deploys. Published on a `web-v*` tag push or manual `workflow_dispatch` (any branch or tag); merging to `main` publishes nothing, and no other tag pattern publishes either. Marketing site and policies are maintained outside this repo, on Cloudflare Pages at `bgtrainer.korchasa.dev`. Free; all lessons included.
  - **iOS:** Capacitor-wrapped WKWebView. Xcode project at `ios/App/`. This repo builds only an unsigned archive (`npm run dist`); signing, `.ipa` export and upload to TestFlight / App Store happen outside it and are not automated here. Paid app ($1.99), all lessons included (FR-PAID).

## 6. Acceptance
- **Criteria:**
  - [x] `npm run build` completes without TS errors. Evidence: `package.json:7`
  - [x] App deploys to GH Pages on a `web-v*` tag push or manual `workflow_dispatch`, not on push to `main`. Evidence: `.github/workflows/deploy.yml:3-9`
  - [x] Preview deploys on PR branches. Evidence: `.github/workflows/preview.yml`
  - [x] Preview cleaned up on branch delete. Evidence: `.github/workflows/cleanup-preview.yml`
  - [ ] No test suite — gap to close if correctness regressions appear.
