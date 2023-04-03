import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { Input ,Button} from 'react-native-elements';
import AppStyle from '../themes';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import MashButton from '../components/MashButton';

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [imageURL, setImageURL] = useState('')
  return (
    <View style={AppStyle.LoginStyles.loginView}>
        <Input
            placeholder='Nhập Tên đăng nhập của bạn'
            label ='username'
            value= {username}
            onChangeText = {text => setUsername (text)}
        />
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

        <Input
            placeholder='Nhập đường dẫn ảnh'
            label ='Profile Picture'
            value= {imageURL}
            onChangeText = {text => setImageURL (text)}
        />
        
        {/*Button*/}
        <MashButton 
            title = 'Đăng Kí'
            style = {AppStyle.LoginStyles.loginBtn}
        />

        <MashButton 
            title = 'Nhấn đây để đăng nhập'
            style = {AppStyle.LoginStyles.signupBtn}
        />
    </View>
  )
}

export default RegisterScreen

