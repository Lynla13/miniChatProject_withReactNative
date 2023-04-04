import { View, Text } from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react';
import { Input ,Button} from 'react-native-elements';
import AppStyle from '../themes';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import MashButton from '../components/MashButton';
import { auth } from '../../firebase';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

// Viết chức năng kiểm tra đăng nhập
    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => {
                var errorMessage = error.message;
                alert (errorMessage);
            });
    }

// Kiểm tra xem người dùng có đang đăng nhập ko
    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged((user) => {
            if (user) {
                var uid = user.uid;
                navigation.replace ('Chat');
            } else {
            // User is signed out
                navigation.canGoBack() && navigation.popToTop();
            }
        });
      return unsubcribe
      
    }, [])
    




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
            onPressFunction = {signIn}
            title = 'Đăng nhập'
            style = {AppStyle.LoginStyles.loginBtn}
        />

        <MashButton 
            onPressFunction = {()=> navigation.navigate ('Register')}
            title = 'Nhấn đây để đăng kí'
            style = {AppStyle.LoginStyles.signupBtn}
        />
    </View>
  )
}

export default LoginScreen

