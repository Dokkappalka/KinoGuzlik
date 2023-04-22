import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'
import React, { useState } from 'react'
import styled from 'styled-components/native'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { Provider } from 'react-redux'
import { setupStore } from './src/store/store'
import { useAppSelector } from './src/hooks/redux'
import Navigation from './src/components/Navigation'

const store = setupStore()

const loadApplication = async () => {
  await Font.loadAsync({
    'anton-regular': require('./assets/fonts/Anton-Regular.ttf'),
  })
}

const WrappedApp = () => {
  const { isLoading, error } = useAppSelector((state) => state.ParamsReducer)
  const [appLoading, setAppLoading] = useState(true)
  if (appLoading) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={(err) => console.log(err)}
        onFinish={() => {
          setAppLoading(false)
        }}
      />
    )
  }
  if (error) {
    return (
      <Container>
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 30 }}>
          {error}
        </Text>
      </Container>
    )
  }
  return (
    <Container>
      <StatusBar style='light' />
      <Navigation />
    </Container>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <WrappedApp />
    </Provider>
  )
}

export const Container = styled.View`
  background-color: #333333;
  height: 100%;
`
export const OptionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #d7d7d8;
  border-bottom-style: solid;
`
export const OptionText = styled.Text`
  color: #d7d7d8;
  margin-right: 10px;
`
export const SearchButtonText = styled.Text`
  text-align: center;
  color: white;
  padding-top: 5px;
  font-size: 18;
`
export const DropDown = styled.View`
  height: 50px;
  width: 208px;
`
export const SearchButton = styled.TouchableOpacity`
  background-color: #f58807;
  margin-top: 10%;
  width: 300px;
  height: 40px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
`
