import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import styled from 'styled-components/native'
import {
  Container,
  DropDown,
  OptionContainer,
  OptionText,
  SearchButton,
  SearchButtonText,
} from '../../App'
import AllChoiceButtons from '../components/AllChoiceButtons'
import RangeSliderComponent from '../components/RangeSliderComponent'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { ParamsSlice } from '../store/reducers/ParamsSlice'
import { fetchFilms } from '../store/reducers/ActionCreators'
import { Text, ActivityIndicator } from 'react-native'

const MainScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch()
  const { setCurrentCountry, setCurrentGenre } = ParamsSlice.actions
  //----- useState, отвечающие за выпадающие списки...
  const {
    genres,
    countries,
    currentCountry,
    currentGenre,
    film,
    chosenAges,
    chosenPopular,
    lowDate,
    hightDate,
    lowRate,
    hightRate,
    isLoading,
  } = useAppSelector((state) => state.ParamsReducer)
  const [open, setOpen] = useState(false)
  const [openGenres, setOpenGenres] = useState(false)
  const [items, setItems] = useState(countries)
  const [genreItems, setGenreItems] = useState(genres)
  //-----
  if (isLoading) {
    return (
      <Container
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size='large' />
        <Text style={{ color: '#d7d7d8', marginTop: 15 }}>Ищем фильм...</Text>
      </Container>
    )
  }
  return (
    <Container>
      <Title>KinoGuzlik</Title>
      <OptionContainer>
        <OptionText>Жанр</OptionText>
        <DropDown>
          <DropDownPicker
            listMode='MODAL'
            modalTitle='Выберите жанр...'
            placeholder='Жанр'
            open={openGenres}
            value={currentGenre}
            items={genreItems}
            setOpen={setOpenGenres}
            setValue={(e) => {
              dispatch(setCurrentGenre(e(currentGenre)))
            }}
            setItems={setGenreItems}
          />
        </DropDown>
      </OptionContainer>

      <RangeSliderComponent
        currentLow={lowRate}
        currentHigh={hightRate}
        lowValue={0}
        highValue={10}
        name='Рейтинг'
        step={1}
      />
      <RangeSliderComponent
        currentLow={lowDate}
        currentHigh={hightDate}
        lowValue={1874}
        highValue={2023}
        step={1}
        name='Дата'
      />

      <OptionContainer>
        <OptionText>Страна</OptionText>
        <DropDown>
          <DropDownPicker
            listMode='MODAL'
            searchable={true}
            searchPlaceholder='Поиск страны...'
            placeholder='Страна'
            open={open}
            value={currentCountry}
            items={items}
            setOpen={setOpen}
            setValue={(e) => dispatch(setCurrentCountry(e(currentCountry)))}
            setItems={setItems}
          />
        </DropDown>
      </OptionContainer>
      <AllChoiceButtons />
      <SearchButton
        onPress={() => {
          dispatch(
            fetchFilms({
              genre: currentGenre,
              country: currentCountry,
              popular: chosenPopular,
              age: chosenAges,
              rate: `${lowRate}-${hightRate}`,
              date: `${lowDate}-${hightDate}`,
              pages: film.pages,
              page: 1,
            })
          ).finally(() => navigation.navigate('Film')) //Можно было бы передавать сразу всю требуемую информацию, но я не до конца понимаю, что из этого тратит меьнше русурсов и как правильнее. Возможно, я ошибся...
        }}
      >
        <SearchButtonText>Найди мне фильм!</SearchButtonText>
      </SearchButton>
    </Container>
  )
}

const Title = styled.Text`
  text-align: center;
  font-size: 30px;
  font-family: anton-regular;
  color: #f58807;
  letter-spacing: 4px;
  margin-bottom: 25px;
`

export default MainScreen
