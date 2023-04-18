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


  const ChatScreen = ({navigation,route}) => {
  const {name, roomKey,imageURL, backImgURL}=route.params;
  const [messages, setMessages] = useState([]);
  alert (backImgURL);
  //Set background 
  const image = {uri: backgroundImg ? backgroundImg:'https://images.alphacoders.com/905/905516.png'};

  useLayoutEffect(() => 
    {
      const unsubcribe = db.collection(roomKey).orderBy('createdAt','desc').onSnapshot(snapshot=>
          setMessages(snapshot.docs.map(doc=>({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
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
          text,
          user
      })
    }, [])


      //Set LogOut Icon
  useLayoutEffect(() => {
        navigation.setOptions ({
              headerRight: () => 
                  (
                      <TouchableOpacity onPress={signOut} style = {{
                          marginRight:20,
                          width: 100,
                        }} >
                          <Text style = {{
                            fontSize: 20,
                            }}>Xuất</Text>
                      </TouchableOpacity>
                  ),
              headerLeft: () => 
              (
                  <View style = {{
                      width: 200,
                    }}>
                       <Text style = {{
                            fontSize: 20,
                            }}> {background}
                        </Text>
                  </View>
              ),
              title: ':' + roomKey

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