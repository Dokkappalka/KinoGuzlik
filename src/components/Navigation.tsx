import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import MainScreen from '../screens/MainScreen'
import FilmScreen from '../screens/FilmScreen'
const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#333333' },
          headerTintColor: '#d7d7d8',
        }}
      >
        <Stack.Screen
          name='Home'
          component={MainScreen}
          options={{ title: 'Главная' }}
        />
        <Stack.Screen
          name='Film'
          component={FilmScreen}
          options={{ title: 'Ваш фильм' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
