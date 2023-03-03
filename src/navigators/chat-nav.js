import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatThemeContext} from '../context/chat-theme-context';

import Chat from '../screens/dashboard/chat';
import Conversation from '../screens/dashboard/conversation';
import colors from '../assets/colors/colors';
import StartChat from '../screens/dashboard/start-chat';
import DynamicConversation from '../screens/dashboard/dynamic-conversation';

const Stack = createNativeStackNavigator();

export default function ChatNav() {
  const {chatTheme, setChatTheme} = useContext(ChatThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: colors.white,
      }}>
      {/* <Stack.Screen
        options={({route}) => ({
          headerTitle: 'Chat Julie',
          headerStyle: {
            backgroundColor:
              chatTheme == colors.theme1
                ? colors.darkOrange
                : chatTheme == colors.theme2
                ? colors.darkBlue
                : colors.darkRed,
          },
        })}
        component={Chat}
        name="Chat"
      /> */}

      <Stack.Screen
        options={({route}) => ({
          headerTitle: '',
          headerStyle: {
            backgroundColor: colors.black,
          },
        })}
        component={Chat}
        name="Chat"
      />
    </Stack.Navigator>
  );
}
