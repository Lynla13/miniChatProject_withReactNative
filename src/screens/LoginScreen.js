import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { Input ,Button} from 'react-native-elements';
import AppStyle from '../themes';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import MashButton from '../components/MashButton';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
  return (
    <View style={AppStyle.LoginStyles.loginView}>
        <Input
            placeholder='Nhập Email của bạn'
            label ='Email'
            value= {email}
            onChangeText = {text => setEmail (text)}
        />
        <Input
            placeholder='Nhập Password của bạn'
            label ='Password'
            value= {password}
            onChangeText = {text => setPassword (text)}
            secureTextEntry
        />
        
        {/*Button*/}
        <MashButton 
            title = 'Đăng nhập'
            style = {AppStyle.LoginStyles.loginBtn}
        />

        <MashButton 
            title = 'Nhấn đây để đăng kí'
            style = {AppStyle.LoginStyles.signupBtn}
        />
    </View>
  )
}

export default LoginScreen

