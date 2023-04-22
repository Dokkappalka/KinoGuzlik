import { IFilm } from './../../components/models/IFilm'
import { fetchFilms } from './ActionCreators'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface genre {
  label: string
  value: string
}
interface country {
  label: string
  value: string
}

interface chosenProps {
  rule: boolean
  value: string
}

interface setRangeProps {
  lowValue: number
  hightValue: number
  rangeName: string
}

interface initialStateProps {
  film: IFilm
  isLoading: boolean
  error: string
  chosenPopular: string
  chosenAges: string[]
  genres: genre[]
  countries: country[]
  currentGenre: string
  currentCountry: string
  lowDate: number
  hightDate: number
  lowRate: number
  hightRate: number
}

const initialState: initialStateProps = {
  film: { docs: [], pages: 1, page: 1 },
  isLoading: false,
  error: '',
  lowDate: 1874,
  hightDate: 2023,
  lowRate: 0,
  hightRate: 10,
  chosenAges: [],
  chosenPopular: '',
  currentGenre: '0',
  currentCountry: '0',
  genres: [
    { label: 'Без разницы', value: '0' },
    { label: 'Комедии 😂', value: 'комедия' },
    { label: 'МультФильмы 🦄', value: 'мультфильм' },
    { label: 'Ужасы 👹', value: 'ужасы' },
    { label: 'Фантастика 🤖', value: 'фантастика' },
    { label: 'Триллеры 🔪', value: 'триллер' },
    { label: 'Боевики 🔫', value: 'боевик' },
    { label: 'Мелодрамы 🥺', value: 'мелодрама' },
    { label: 'Детективы 🔎', value: 'детектив' },
    { label: 'Приключения 🗺', value: 'приключения' },
    { label: 'Фэнтези 🧙‍♀️', value: 'фэнтези' },
    { label: 'Военные 🫡', value: 'военный' },
    { label: 'Семейные 👨‍👨‍👦', value: 'семейный' },
    { label: 'Аниме 🍽💩', value: 'аниме' },
    { label: 'Исторические 🌏', value: 'история' },
    { label: 'Драмы 😭', value: 'драма' },
    { label: 'Документальные 🥱', value: 'документальный' },
    { label: 'Детские 🧸', value: 'детский' },
    { label: 'Криминал 😵', value: 'криминал' },
    { label: 'Биографии 🧑‍🎨', value: 'биография' },
    { label: 'Вестерны 👀', value: 'вестерн' },
    { label: 'Фильмы-нуар 💎', value: 'фильм-нуар' },
    { label: 'Спортивные 🧑‍🦽', value: 'спорт' },
    { label: 'Реальное ТВ 🤢', value: 'реальное ТВ' },
    { label: 'Короткометражки 🍆', value: 'короткометражка' },
    { label: 'Музыкальные 🎼', value: 'музыка' },
    { label: 'Мюзиклы 🕺', value: 'мюзикл' },
    { label: 'Ток-шоу 🎤', value: 'ток-шоу' },
    { label: 'Игры 🎮', value: 'игра' },
    { label: 'Для взрослых 🔞', value: 'для взрослых' },
  ],
  countries: [
    { label: 'Без разницы', value: '0' },
    { label: 'Австралия', value: 'Австралия' },
    { label: 'Австрия', value: 'Австрия' },
    { label: 'Азербайджан', value: 'Азербайджан' },
    { label: 'Албания', value: 'Албания' },
    { label: 'Алжир', value: 'Алжир' },
    {
      label: 'Американские Виргинские острова',
      value: 'Американские Виргинские острова',
    },
    { label: 'Американское Самоа', value: 'Американское Самоа' },
    { label: 'Ангола', value: 'Ангола' },
    { label: 'Андорра', value: 'andorra' },
    { label: 'Антарктида', value: 'antarktida' },
    { label: 'Антигуа и Барбуда', value: 'Антигуа и Барбуда' },
    { label: 'Антильские Острова', value: 'Антильские Острова' },
    { label: 'Аргентина', value: 'Аргентина' },
    { label: 'Армения', value: 'Армения' },
    { label: 'Аруба', value: 'Аруба' },
    { label: 'Афганистан', value: 'Афганистан' },
    { label: 'Багамы', value: 'Багамы' },
    { label: 'Бангладеш', value: 'Бангладеш' },
    { label: 'Барбадос', value: 'Барбадос' },
    { label: 'Бахрейн', value: 'Бахрейн' },
    { label: 'Беларусь', value: 'Беларусь' },
    { label: 'Белиз', value: 'Белиз' },
    { label: 'Бельгия', value: 'Бельгия' },
    { label: 'Бенин', value: 'Бенин' },
    { label: 'Берег Слоновой кости', value: 'Берег Слоновой кости' },
    { label: 'Бермуды', value: 'Бермуды' },
    { label: 'Бирма', value: 'Бирма' },
    { label: 'Болгария', value: 'Болгария' },
    { label: 'Боливия', value: 'Боливия' },
    { label: 'Босния', value: 'Босния' },
    { label: 'Босния и Герцеговина', value: 'Босния и Герцеговина' },
    { label: 'Ботсвана', value: 'Ботсвана' },
    { label: 'Бразилия', value: 'Бразилия' },
    { label: 'Бруней-Даруссалам', value: 'Бруней-Даруссалам' },
    { label: 'Буркина-Фасо', value: 'Буркина-Фасо' },
    { label: 'Бурунди', value: 'Бурунди' },
    { label: 'Бутан', value: 'Бутан' },
    { label: 'Вануату', value: 'Вануату' },
    { label: 'Ватикан', value: 'Ватикан' },
    { label: 'Великобритания', value: 'Великобритания' },
    { label: 'Венгрия', value: 'Венгрия' },
    { label: 'Венесуэла', value: 'Венесуэла' },
    {
      label: 'Виргинские Острова (Великобритания)',
      value: 'Виргинские Острова (Великобритания)',
    },
    { label: 'Виргинские Острова (США)', value: 'Виргинские Острова (США)' },
    {
      label: 'Внешние малые острова США',
      value: 'Внешние малые острова США',
    },
    { label: 'Вьетнам', value: 'Вьетнам' },
    { label: 'Вьетнам Северный', value: 'Вьетнам Северный' },
    { label: 'Габон', value: 'Габон' },
    { label: 'Гаити', value: 'Гаити' },
    { label: 'Гайана', value: 'Гайана' },
    { label: 'Гамбия', value: 'Гамбия' },
    { label: 'Гана', value: 'Гана' },
    { label: 'Гваделупа', value: 'Гваделупа' },
    { label: 'Гватемала', value: 'Гватемала' },
    { label: 'Гвинея', value: 'Гвинея' },
    { label: 'Гвинея-Бисау', value: 'Гвинея-Бисау' },
    { label: 'Германия', value: 'Германия' },
    { label: 'Германия (ГДР)', value: 'Германия (ГДР)' },
    { label: 'Германия (ФРГ)', value: 'Германия (ФРГ)' },
    { label: 'Гибралтар', value: 'Гибралтар' },
    { label: 'Гондурас', value: 'Гондурас' },
    { label: 'Гонконг', value: 'Гонконг' },
    { label: 'Гренада', value: 'Гренада' },
    { label: 'Гренландия', value: 'Гренландия' },
    { label: 'Греция', value: 'Греция' },
    { label: 'Грузия', value: 'Грузия' },
    { label: 'Гуам', value: 'Гуам' },
    { label: 'Дания', value: 'Дания' },
    { label: 'Доминика', value: 'Доминика' },
    { label: 'Доминикана', value: 'Доминикана' },
    { label: 'Египет', value: 'Египет' },
    { label: 'Заир', value: 'Заир' },
    { label: 'Замбия', value: 'Замбия' },
    { label: 'Западная Сахара', value: 'Западная Сахара' },
    { label: 'Зимбабве', value: 'Зимбабве' },
    { label: 'Израиль', value: 'Израиль' },
    { label: 'Индия', value: 'Индия' },
    { label: 'Индонезия', value: 'Индонезия' },
    { label: 'Иордания', value: 'Иордания' },
    { label: 'Ирак', value: 'Ирак' },
    { label: 'Иран', value: 'Иран' },
    { label: 'Ирландия', value: 'Ирландия' },
    { label: 'Исландия', value: 'Исландия' },
    { label: 'Испания', value: 'Испания' },
    { label: 'Италия', value: 'Италия' },
    { label: 'Йемен', value: 'Йемен' },
    { label: 'Кабо-Верде', value: 'Кабо-Верде' },
    { label: 'Казахстан', value: 'Казахстан' },
    { label: 'Каймановы острова', value: 'Каймановы острова' },
    { label: 'Камбоджа', value: 'Камбоджа' },
    { label: 'Камерун', value: 'Камерун' },
    { label: 'Канада', value: 'Канада' },
    { label: 'Катар', value: 'Катар' },
    { label: 'Кения', value: 'Кения' },
    { label: 'Кипр', value: 'Кипр' },
    { label: 'Киргизия', value: 'Киргизия' },
    { label: 'Кирибати', value: 'Кирибати' },
    { label: 'Китай', value: 'Китай' },
    { label: 'Колумбия', value: 'Колумбия' },
    { label: 'Коморы', value: 'Коморы' },
    { label: 'Конго', value: 'Конго' },
    { label: 'Конго (ДРК)', value: 'Конго (ДРК)' },
    { label: 'Корея', value: 'Корея' },
    { label: 'Корея Северная', value: 'Корея Северная' },
    { label: 'Корея Южная', value: 'Корея Южная' },
    { label: 'Косово', value: 'Косово' },
    { label: 'Коста-Рика', value: 'Коста-Рика' },
    { label: 'Кот-д’Ивуар', value: 'Кот-д’Ивуар' },
    { label: 'Куба', value: 'Куба' },
    { label: 'Кувейт', value: 'Кувейт' },
    { label: 'Лаос', value: 'Лаос' },
    { label: 'Латвия', value: 'Латвия' },
    { label: 'Лесото', value: 'Лесото' },
    { label: 'Либерия', value: 'Либерия' },
    { label: 'Ливан', value: 'Ливан' },
    { label: 'Ливия', value: 'Ливия' },
    { label: 'Литва', value: 'Литва' },
    { label: 'Лихтенштейн', value: 'Лихтенштейн' },
    { label: 'Люксембург', value: 'Люксембург' },
    { label: 'Маврикий', value: 'Маврикий' },
    { label: 'Мавритания', value: 'Мавритания' },
    { label: 'Мадагаскар', value: 'Мадагаскар' },
    { label: 'Макао', value: 'Макао' },
    { label: 'Македония', value: 'Македония' },
    { label: 'Малави', value: 'Малави' },
    { label: 'Малайзия', value: 'Малайзия' },
    { label: 'Мали', value: 'Мали' },
    { label: 'Мальдивы', value: 'Мальдивы' },
    { label: 'Мальта', value: 'Мальта' },
    { label: 'Марокко', value: 'Марокко' },
    { label: 'Мартиника', value: 'Мартиника' },
    { label: 'Маршалловы острова', value: 'Маршалловы острова' },
    { label: 'Мексика', value: 'Мексика' },
    { label: 'Мозамбик', value: 'Мозамбик' },
    { label: 'Молдова', value: 'Молдова' },
    { label: 'Монако', value: 'Монако' },
    { label: 'Монголия', value: 'Монголия' },
    { label: 'Монтсеррат', value: 'Монтсеррат' },
    { label: 'Мьянма', value: 'Мьянма' },
    { label: 'Намибия', value: 'Намибия' },
    { label: 'Непал', value: 'Непал' },
    { label: 'Нигер', value: 'Нигер' },
    { label: 'Нигерия', value: 'Нигерия' },
    { label: 'Нидерланды', value: 'Нидерланды' },
    { label: 'Никарагуа', value: 'Никарагуа' },
    { label: 'Новая Зеландия', value: 'Новая Зеландия' },
    { label: 'Новая Каледония', value: 'Новая Каледония' },
    { label: 'Норвегия', value: 'Норвегия' },
    { label: 'ОАЭ', value: 'ОАЭ' },
    {
      label: 'Оккупированная Палестинская территория',
      value: 'Оккупированная Палестинская территория',
    },
    { label: 'Оман', value: 'Оман' },
    { label: 'Остров Мэн', value: 'Остров Мэн' },
    { label: 'Острова Кука', value: 'Острова Кука' },
    { label: 'Пакистан', value: 'Пакистан' },
    { label: 'Палау', value: 'Палау' },
    { label: 'Палестина', value: 'Палестина' },
    { label: 'Панама', value: 'Панама' },
    { label: 'Папуа - Новая Гвинея', value: 'Папуа - Новая Гвинея' },
    { label: 'Парагвай', value: 'Парагвай' },
    { label: 'Перу', value: 'Перу' },
    { label: 'Польша', value: 'Польша' },
    { label: 'Португалия', value: 'Португалия' },
    { label: 'Пуэрто Рико', value: 'Пуэрто Рико' },
    { label: 'Реюньон', value: 'Реюньон' },
    { label: 'Российская империя', value: 'Российская империя' },
    { label: 'Россия', value: 'Россия' },
    { label: 'Руанда', value: 'Руанда' },
    { label: 'Румыния', value: 'Румыния' },
    { label: 'СССР', value: 'СССР' },
    { label: 'США', value: 'США' },
    { label: 'Сальвадор', value: 'Сальвадор' },
    { label: 'Самоа', value: 'Самоа' },
    { label: 'Сан-Марино', value: 'Сан-Марино' },
    { label: 'Саудовская Аравия', value: 'Саудовская Аравия' },
    { label: 'Свазиленд', value: 'Свазиленд' },
    { label: 'Северная Македония', value: 'Северная Македония' },
    { label: 'Сейшельские острова', value: 'Сейшельские острова' },
    { label: 'Сенегал', value: 'Сенегал' },
    { label: 'Сент-Винсент и Гренадины', value: 'Сент-Винсент и Гренадины' },
    { label: 'Сент-Люсия', value: 'Сент-Люсия' },
    { label: 'Сербия', value: 'Сербия' },
    { label: 'Сербия и Черногория', value: 'Сербия и Черногория' },
    { label: 'Сиам', value: 'Сиам' },
    { label: 'Сингапур', value: 'Сингапур' },
    { label: 'Сирия', value: 'Сирия' },
    { label: 'Словакия', value: 'Словакия' },
    { label: 'Словения', value: 'Словения' },
    { label: 'Сомали', value: 'Сомали' },
    { label: 'Судан', value: 'Судан' },
    { label: 'Суринам', value: 'Суринам' },
    { label: 'Сьерра-Леоне', value: 'Сьерра-Леоне' },
    { label: 'Таджикистан', value: 'Таджикистан' },
    { label: 'Таиланд', value: 'Таиланд' },
    { label: 'Тайвань', value: 'Тайвань' },
    { label: 'Танзания', value: 'Танзания' },
    { label: 'Тимор-Лесте', value: 'Тимор-Лесте' },
    { label: 'Того', value: 'Того' },
    { label: 'Тонга', value: 'Тонга' },
    { label: 'Тринидад и Тобаго', value: 'Тринидад и Тобаго' },
    { label: 'Тувалу', value: 'Тувалу' },
    { label: 'Тунис', value: 'Тунис' },
    { label: 'Туркменистан', value: 'Туркменистан' },
    { label: 'Турция', value: 'Турция' },
    { label: 'Уганда', value: 'Уганда' },
    { label: 'Узбекистан', value: 'Узбекистан' },
    { label: 'Украина', value: 'Украина' },
    { label: 'Уругвай', value: 'Уругвай' },
    { label: 'Фарерские острова', value: 'Фарерские острова' },
    {
      label: 'Федеративные Штаты Микронезии',
      value: 'Федеративные Штаты Микронезии',
    },
    { label: 'Фиджи', value: 'Фиджи' },
    { label: 'Филиппины', value: 'Филиппины' },
    { label: 'Финляндия', value: 'Финляндия' },
    { label: 'Франция', value: 'Франция' },
    { label: 'Французская Гвиана', value: 'Французская Гвиана' },
    { label: 'Французская Полинезия', value: 'Французская Полинезия' },
    { label: 'Хорватия', value: 'Хорватия' },
    { label: 'ЦАР', value: 'ЦАР' },
    { label: 'Чад', value: 'Чад' },
    { label: 'Черногория', value: 'Черногория' },
    { label: 'Чехия', value: 'Чехия' },
    { label: 'Чехословакия', value: 'Чехословакия' },
    { label: 'Чили', value: 'Чили' },
    { label: 'Швейцария', value: 'Швейцария' },
    { label: 'Швеция', value: 'Швеция' },
    { label: 'Шри-Ланка', value: 'Шри-Ланка' },
    { label: 'Эквадор', value: 'Эквадор' },
    { label: 'Экваториальная Гвинея', value: 'Экваториальная Гвинея' },
    { label: 'Эритрея', value: 'Эритрея' },
    { label: 'Эстония', value: 'Эстония' },
    { label: 'Эфиопия', value: 'Эфиопия' },
    { label: 'ЮАР', value: 'ЮАР' },
    { label: 'Югославия', value: 'Югославия' },
    { label: 'Югославия (ФР)', value: 'Югославия (ФР)' },
    { label: 'Ямайка', value: 'Ямайка' },
    { label: 'Япония', value: 'Япония' },
  ],
}

export const ParamsSlice = createSlice({
  name: 'params',
  initialState,
  reducers: {
    setCurrentGenre(state, action: PayloadAction<string>) {
      state.currentGenre = action.payload
    },
    setCurrentCountry(state, action: PayloadAction<string>) {
      state.currentCountry = action.payload
    },
    updateChosenAges(state, action: PayloadAction<chosenProps>) {
      if (!action.payload.rule) {
        state.chosenAges.push(action.payload.value)
      } else {
        state.chosenAges = state.chosenAges.filter((age) => {
          return age !== action.payload.value
        })
      }
    },
    updateChosenPopular(state, action: PayloadAction<chosenProps>) {
      if (!action.payload.rule) {
        state.chosenPopular = action.payload.value
      } else {
        state.chosenPopular = ''
      }
    },
    setRange(state, action: PayloadAction<setRangeProps>) {
      if (action.payload.rangeName === 'Рейтинг') {
        state.lowRate = action.payload.lowValue
        state.hightRate = action.payload.hightValue
      } else if (action.payload.rangeName === 'Дата') {
        state.lowDate = action.payload.lowValue
        state.hightDate = action.payload.hightValue
      }
    },
  },
  extraReducers: {
    [fetchFilms.fulfilled.type]: (state, action: PayloadAction<IFilm>) => {
      state.isLoading = false
      state.error = ''
      state.film = action.payload
    },
    [fetchFilms.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchFilms.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default ParamsSlice.reducer
