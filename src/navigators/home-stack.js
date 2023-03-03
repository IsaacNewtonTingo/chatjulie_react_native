import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ChatThemeContext} from '../context/chat-theme-context';

import TabNav from './tab-nav';
import colors from '../assets/colors/colors';
import Conversation from '../screens/dashboard/conversation';
import DynamicConversation from '../screens/dashboard/dynamic-conversation';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const {chatTheme, setChatTheme} = useContext(ChatThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.white,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        component={TabNav}
        name="TabNav"
      />

      <Stack.Screen
        options={({route}) => ({
          headerTitle: route.params.title ? route.params.title : 'Chat Julie',
          headerStyle: {
            backgroundColor:
              chatTheme == colors.theme1
                ? colors.darkOrange
                : chatTheme == colors.theme2
                ? colors.darkBlue
                : colors.darkRed,
          },
        })}
        component={DynamicConversation}
        name="DynamicConversation"
      />
    </Stack.Navigator>
  );
}
