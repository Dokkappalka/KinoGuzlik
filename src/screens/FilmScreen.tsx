import React, { useEffect } from 'react'
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native'
import styled from 'styled-components/native'
import { Container } from '../../App'
import { useAppSelector } from '../hooks/redux'
import { useAppDispatch } from '../hooks/redux'
import { fetchFilms } from '../store/reducers/ActionCreators'

const FilmScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch()
  const {
    film,
    currentCountry,
    currentGenre,
    chosenAges,
    chosenPopular,
    lowDate,
    hightDate,
    lowRate,
    hightRate,
    isLoading,
  } = useAppSelector((state) => state.ParamsReducer)
  useEffect(() => {
    navigation.setOptions({
      title: film.docs.length ? film.docs[0].name : 'Фильм не найден...',
    })
  }, [film.docs[0]])
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
  if (!film.docs.length) {
    return (
      <Container>
        <FilmDescription
          style={{
            color: '#d8d8d7',
            textAlign: 'center',
            marginTop: '50%',
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          К сожалению, по вашему запросу не нашлось фильмов...
        </FilmDescription>
        <FilmButton
          onPress={() => {
            navigation.navigate('Home')
          }}
        >
          <FilmButtonText>На главную!</FilmButtonText>
        </FilmButton>
      </Container>
    )
  }

  return (
    <ScrollView style={{ backgroundColor: '#333333', height: '100%' }}>
      {film.docs[0].poster ? (
        <FilmImageContainer>
          <FilmImage source={{ uri: film.docs[0].poster?.url }} />
        </FilmImageContainer>
      ) : (
        <View
          style={{
            paddingTop: 125,
            paddingBottom: 125,
            marginLeft: 100,
            marginRight: 100,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#575656',
          }}
        >
          <Text
            style={{
              color: '#d7d7d8',
              textAlign: 'center',
            }}
          >
            Изображения нету...
          </Text>
        </View>
      )}
      {film.docs[0].name || film.docs[0].alternativeName ? (
        <FilmDescription
          style={{ color: '#ff8585', fontSize: 25, marginBottom: 10 }}
        >
          {film.docs[0].name || film.docs[0].alternativeName}
        </FilmDescription>
      ) : (
        <FilmDescription style={{ color: '#d8d8d7' }}>
          Название не найдено...
        </FilmDescription>
      )}
      {film.docs[0].year && film.docs[0].rating && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <FilmDescription style={{ marginRight: 10, color: '#d7d7d8' }}>
            Год: {film.docs[0].year}
          </FilmDescription>
          <FilmDescription style={{ color: '#d7d7d8' }}>
            Рейтинг: {film.docs[0].rating.kp}
          </FilmDescription>
        </View>
      )}
      {film.docs[0].description || film.docs[0].shortDescription ? (
        <FilmDescription
          style={{ color: '#d7d7d8', paddingLeft: 10, paddingRight: 10 }}
        >
          {film.docs[0].description || film.docs[0].shortDescription}
        </FilmDescription>
      ) : (
        <FilmDescription style={{ color: '#d7d7d8' }}>
          Описание не найдено...
        </FilmDescription>
      )}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 50,
        }}
      >
        <FilmButton
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
              })
            ).then((res) => {
              if (!res.payload.docs.length) {
                dispatch(
                  fetchFilms({
                    genre: currentGenre,
                    country: currentCountry,
                    popular: chosenPopular,
                    age: chosenAges,
                    rate: `${lowRate}-${hightRate}`,
                    date: `${lowDate}-${hightDate}`,
                    pages: res.payload.pages,
                  })
                )
              }
            })
          }}
        >
          <FilmButtonText>Другой фильм</FilmButtonText>
        </FilmButton>
        <FilmButton
          onPress={async () => {
            await Linking.openURL(
              `https://www.kinopoisk.ru/film/${film.docs[0].id}`
            )
          }}
        >
          <FilmButtonText>На Кинопоиск!</FilmButtonText>
        </FilmButton>
      </View>
    </ScrollView>
  )
}

const FilmImageContainer = styled.View`
  display: flex;
  align-items: center;
`

const FilmImage = styled.Image`
  width: 200px;
  height: 300px;
  margin-bottom: 30px;
`

const FilmDescription = styled.Text`
  text-align: center;
`
const FilmButton = styled.TouchableOpacity`
  background-color: #f58807;
  margin-top: 10%;
  width: 150px;
  height: 40px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
`

const FilmButtonText = styled.Text`
  text-align: center;
  color: white;
  padding-top: 5px;
  font-size: 18;
`

export default FilmScreen
