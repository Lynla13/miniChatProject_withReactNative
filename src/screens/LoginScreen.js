import {Image, ImageBackground,View, Text } from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react';
import { Input ,Button} from 'react-native-elements';
import AppStyle from '../themes';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import MashButton from '../components/MashButton';
import { auth,db } from '../../firebase';
import { collection, query, where,getDocs } from "firebase/firestore";



const LoginScreen = ({navigation,route}) => {
//Nhận giá trị
//Truyền giá trị giữa các màn hình
  const [name, setName] = useState('');
  const [roomKey, setRoomKey] = useState('')
  const [imageURL, setImageURL] = useState('')

  const image = {uri: 'https://images.alphacoders.com/905/905516.png'};
  const imageAva = {uri: imageURL?imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/542px-Unknown_person.jpg'};

  
// Kiểm tra xem người dùng có đang đăng nhập ko
    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged((user) => {
            if (user) {
                var uid = user.uid;
            } else {
            // User is signed out
                navigation.canGoBack() && navigation.popToTop();
            }
        });
      return unsubcribe
    }, [])
    


//Kiểm tra database
 function joinRoomChat () {
    if (name == '' ) {
        alert ('Vui lòng nhập tên hiển thị của bạn!');
    }else if (roomKey == '') {
        alert ('Vui lòng nhập mã phòng!');
    }else
    {
        db.collection(roomKey)
        .limit(1)
        .get()
        .then((snapshot) => {
            if (snapshot.size == 0) {
                alert ('Phòng không có sẵn!');
            } else {
                navigation.replace ('Chat' ,{roomKey,name,imageURL})
            }
        })
    }
 }




  return (
    <View style={AppStyle.LoginStyles.loginView}>
        {/* Set background */}
        <ImageBackground source={image} resizeMode="cover"  style={AppStyle.LoginStyles.backgroundImage} >
        {/* Set Profile */}
        <View style = {AppStyle.LoginStyles.profile}>
            <Image
                style={AppStyle.LoginStyles.profileBoder}
                source={imageAva}
            />
            <View>
                <Text style= {AppStyle.LoginStyles.avaText} > @{name}</Text>
                <Text style= {AppStyle.LoginStyles.subAvaText} > Mã phòng: {roomKey}</Text>
            </View>
        </View>

        
        <Text style = {AppStyle.MakeRoomStyle.inputLabel}> Username: (*) </Text>
        <Input
            placeholder='Nhập tên hiển thị của bạn'
            value= {name}
            onChangeText = {text => setName(text)}
        />

        <Text style = {AppStyle.MakeRoomStyle.inputLabel}> Mã phòng: (*) </Text>
        <Input
            placeholder='Nhập mã phòng hoặc tạo mã phòng mới'
            value= {roomKey}
            onChangeText = {text => setRoomKey(text)}
        />

        <Text style = {AppStyle.MakeRoomStyle.inputLabel}> Ảnh đại diện: (Tùy chọn) </Text>
        <Input
            placeholder='Nhập đường dẫn ảnh đại diện'
            value= {imageURL}
            onChangeText = {text => setImageURL(text)}
        />
        
        {/*Button*/}
        <MashButton 
            // onPressFunction = {()=>{navigation.navigate ('Chat' ,{roomKey,name,imageURL});}}
            onPressFunction = {()=> getValueConfig()}
            title = '{roomName}'
            style = {AppStyle.LoginStyles.loginBtn}
        />
        <MashButton 
            onPressFunction = {()=>{navigation.navigate ('MakeNewRoom');}}
            title = 'Tạo phòng mới'
            style = {AppStyle.LoginStyles.loginBtn}
        />
        </ImageBackground>
    </View>
  )
}

export default LoginScreen

