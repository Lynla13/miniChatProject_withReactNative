import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { Input ,Button} from 'react-native-elements';
import AppStyle from '../themes';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import MashButton from '../components/MashButton';
import { auth } from '../../firebase';
import { ToastAndroid } from 'react-native-web';

const RegisterScreen = ( {navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [imageURL, setImageURL] = useState('')

    const register = () =>{
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                user.updateProfile({
                    displayName: username,
                    photoURL: imageURL? imageURL :"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/542px-Unknown_person.jpg"
                  }).then(() => {
                  }).catch((error) => {
                    // An error occurred
                    // ...
                  });  
                  navigation.popToTop();
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert (errorMessage);
            });
         }
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
            onPressFunction = {register}
            title = 'Đăng kí'
            style = {AppStyle.LoginStyles.loginBtn}
        />
    </View>
  )
}

export default RegisterScreen

