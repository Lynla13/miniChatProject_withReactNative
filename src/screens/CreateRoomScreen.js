import {ImageBackground,CheckBox, Text, View} from 'react-native';
import React from 'react'
import { useState,useEffect } from 'react';
import { Input ,Button} from 'react-native-elements';
import AppStyle from '../themes';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import MashButton from '../components/MashButton';
import { auth } from '../../firebase';
var CryptoJS = require("crypto-js");
import { db } from '../../firebase';
import firebase from 'firebase/compat/app';

const CreateRoomScreen = ({navigation,route}) => {

//Truyền giá trị giữa các màn hình
  const [roomName, setRoomName] = useState ('')
  const [roomKey, setRoomKey] = useState('')
  const [backImgURL, setBackImgURL] = useState('')
  const [name, setName] = useState('');
  const [key, setKey] = useState('')
  const image = {uri: backImgURL ? backImgURL:'https://images.alphacoders.com/905/905516.png'};
    // Tạo một chức năng nkhi nhấn thì tạo 1 collection mới

    function createNewRoom () {
        if (roomName == '' || roomKey =='' || key == '' ) {
            alert ('Vui lòng nhập đầy đủ thông tin');
        }else {
            createNewCollecs ();
        }
    }

    function createNewCollecs () {
        db.collection(roomKey)
        .limit(1)
        .get()
        .then((snapshot) => {
            if (snapshot.size == 0) {
                makeAndJoinRoom()
            } else {
                alert ('Tồn tại phòng');
            }
        })
    }

  function makeAndJoinRoom() {
    db.collection (roomKey).add ({
        _id : '',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        text : 'Tên phòng: ' +roomName + '. Mã phòng: ' +roomKey+ '. Khóa:' +key ,
        user :{
            _id: name,
          name : name,
          avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/542px-Unknown_person.jpg",
        }
    })
                //Thêm thông tin tên phòng và ảnh nền vào config chung
    db.collection ('config').add ({
                    key: key,
                    backImgURL: backImgURL,
                    roomName: roomName,
                    roomkeyBase: roomKey,
                })
    navigation.replace ('Login' ,{roomKey});
  }
 
  return (
    <View style={AppStyle.LoginStyles.loginView}>
         <ImageBackground source={image} resizeMode="cover"  style={AppStyle.LoginStyles.backgroundImage} >

                <Text style = {AppStyle.MakeRoomStyle.inputLabel}> Tên phòng: (*) </Text>
                <Input
                    placeholder='Nhập tên phòng'
                    value= {roomName}
                    onChangeText = {text => setRoomName(text)}
                />

                <Text style = {AppStyle.MakeRoomStyle.inputLabel}> Nhập mã phòng: (*)</Text>
                <Input
                    placeholder='Nhập mã phòng hoặc tạo mã phòng mới'
                    value= {roomKey}
                    onChangeText = {text => setRoomKey(text)}
                />

               
                <Text style = {AppStyle.MakeRoomStyle.inputLabel}> Nhập khóa: (*)</Text> 
                <Input 
                    placeholder='Nhập mã khóa '
                    value= {key}
                    onChangeText = {text => setKey(text)}
                />

                 <Text style = {AppStyle.MakeRoomStyle.inputLabel}> Nhập đường dẫn ảnh:  (Tùy chọn)</Text> 
                <Input
                    placeholder='Nhập đường dẫn ảnh'
                    value= {backImgURL}
                    onChangeText = {text => setBackImgURL(text)}
                />
                
            
                {/*Button*/}
                <MashButton 
                    onPressFunction = {() => createNewRoom ()}
                    title = 'Tạo phòng'
                    style = {AppStyle.LoginStyles.loginBtn}

                  />
         </ImageBackground>
    </View>
  )
}

export default CreateRoomScreen

