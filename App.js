import React from 'react'

import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import LoginScreen from './src/screens/LoginScreen'
import ChatScreen from './src/screens/ChatScreen'
import DesScreen from './src/screens/DesScreen'
import CreateRoomScreen from './src/screens/CreateRoomScreen'
import { useState } from 'react'

const Stack = createStackNavigator();

export default function App () {
  return (
    <NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen 
          name ='Login' 
          component = {LoginScreen}
          options={{title: 'Đăng nhập'}}
          />
        <Stack.Screen 
          name ='MakeNewRoom' 
          component = {CreateRoomScreen}
          options={{title: 'Tạo phòng mới'}}
        />
        <Stack.Screen name = 'Chat' component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>

    
  )
}