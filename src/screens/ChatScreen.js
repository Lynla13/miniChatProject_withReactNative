import {ImageBackground, View, Text } from 'react-native'
import React from 'react'
import { auth,db } from '../../firebase';
import { useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { useCallback,useState,useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import AppStyle from '../themes';
var CryptoJS = require("crypto-js");
import Toast from 'react-native-root-toast';


  const ChatScreen = ({navigation,route}) => {
  const {name, roomKey,imageURL, backImgURL,roomName,key}=route.params;
  const [messages, setMessages] = useState([]);
  //Set background 
  const image = {uri: backImgURL ? backImgURL:''};
  // Viết hàm mã hóa 
  function encryptByDES(message, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  //Viết hàm giải mã
  function decryptByDES(ciphertext, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);

    var decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    }, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }


  useLayoutEffect(() => 
    {
      const unsubcribe = db.collection(roomKey).orderBy('createdAt','desc').onSnapshot(snapshot=>
          setMessages(snapshot.docs.map(doc=>({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: decryptByDES(doc.data().text, key),
        user: doc.data().user,
      }))))
        return unsubcribe;
    
    }, [])

  const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      const {
          _id,
          createdAt,
          text,
          user
      }= messages [0]
      //Nhập vào database
      db.collection (roomKey).add ({
          _id,
          createdAt,
          //Đưa mã hóa vào database
          text : encryptByDES(text, key),
          user
      })
      Toast.show(encryptByDES(text, key), {
        duration: Toast.durations.LONG,
      });
    }, [])


      //Set LogOut Icon
  useLayoutEffect(() => {
        navigation.setOptions ({
              headerRight: () => 
                  (
                      <TouchableOpacity onPress={signOut} style = {{
                          marginRight:10,
                        }} >
                          <Text style = {{
                            fontSize: 16,
                            }}>Đăng xuất</Text>
                      </TouchableOpacity>
                  ),
              title: roomName + ':'+ roomKey
        })
      }, [])

  const signOut =()=>{
          auth.signOut().then(() => {
              navigation.replace ('Login')
            }).catch((error) => {
              // An error happened.
            });
      }
    return (
      <View style={{ backgroundColor: "#000000", flex: 1 }}>
          <ImageBackground source={image} resizeMode="cover"  style={AppStyle.LoginStyles.backgroundImage} >
          <GiftedChat
              messages={messages}
              showAvatarForEveryMessage = {true}
              renderUsernameOnMessage ={true}
              onSend={messages => onSend(messages)}
              user={{
                _id: route.params.name,
                name :route.params.name,
                avatar: route.params.imageURL ? route.params.imageURL :"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/542px-Unknown_person.jpg",
              }}
           />
          </ImageBackground>
    </View>
    )
}

export default ChatScreen