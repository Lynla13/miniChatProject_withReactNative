import { View, Text } from 'react-native'
import React from 'react'
import { auth,db } from '../../firebase';
import { useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { useCallback,useState,useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatScreen = ({navigation}) => {
    const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
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
    db.collection ('chat').add ({
        _id,
        createdAt,
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
                          }}> Đăng xuất</Text>
                        </TouchableOpacity>
                 ),
            headerLeft: () => 
            (
                <View style = {{
                    marginLeft: 20,
                    width: 180,
                    paddingTop: 18
                }}>
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL
                        }}
                    ></Avatar>
                    <Text style = {{
                            fontSize: 20,
                        }}> {auth?.currentUser?.name}</Text>
                </View>
                
            )
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
    onSend={messages => onSend(messages)}
    user={{
      _id: auth?.currentUser?.email,
      name :auth?.currentUser?.displayName,
      avatar: auth?.currentUser?.photoURL,
    }}
  />
  )
}

export default ChatScreen