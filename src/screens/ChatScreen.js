import { View, Text } from 'react-native'
import React from 'react'
import { auth,db } from '../../firebase';
import { useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { useCallback,useState,useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
var CryptoJS = require("crypto-js");


  const ChatScreen = ({navigation,route}) => {
  const {name, roomKey,imageURL }=route.params;
  const [messages, setMessages] = useState([]);

  //Tạo hàm lấy ảnh background
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
                            }}> Xuất</Text>
                      </TouchableOpacity>
                  ),
              headerLeft: () => 
              (
                  <View style = {{
                      width: 200,
                    }}>
                       <Text style = {{
                            fontSize: 20,
                            }}> {name}
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
    )
}

export default ChatScreen