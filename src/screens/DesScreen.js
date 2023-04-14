import { View, Text } from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react';
import { Input ,Button} from 'react-native-elements';
import AppStyle from '../themes';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import MashButton from '../components/MashButton';
import { auth } from '../../firebase';
var CryptoJS = require("crypto-js");

const DesScreen = ({navigation,route}) => {

//Truyền giá trị giữa các màn hình
  const [name, setName] = useState('');
  const [roomKey, setRoomKey] = useState('')
  const [imageURL, setImageURL] = useState('')


  function DesEncripted (text) {
    var setText = CryptoJS.DES.encrypt (text,'fsdasdasd');
    return setText;
  }
  return (
    <View style={AppStyle.LoginStyles.loginView}>
        <Input
            placeholder='Nhập tên hiển thị của bạn'
            label ='Username'
            value= {name}
            onChangeText = {text => DesEncripted (text)}
        />
        <Input
            placeholder='Nhập mã phòng hoặc tạo mã phòng mới'
            label ='Mã phòng'
            value= {roomKey}
            onChangeText = {text => setRoomKey(text)}
        />

        <Input
            placeholder='Nhập đường dẫn ảnh đại diện'
            label ='Ảnh đại diện'
            value= {DesEncripted('')}
            onChangeText = {text => setImageURL(text)}
        />
        
        {/*Button*/}
        <MashButton 
                onPressFunction = {()=>{navigation.navigate ('Chat' ,{roomKey,name,imageURL});}}
            title = '{encrypted}'
            style = {AppStyle.LoginStyles.loginBtn}
        />
    </View>
  )
}

export default DesScreen

