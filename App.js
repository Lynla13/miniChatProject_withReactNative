import React from 'react'

import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import LoginScreen from './src/screens/LoginScreen'

const Stack = createStackNavigator();

export default function App () {
  return (
    <NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen name ='Login' component = {LoginScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}