import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import colors from '../assets/colors/colors';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatNav from './chat-nav';
import SettingsNav from './settings-nav';
import DiscoverNav from './discover-nav';

const Tab = createBottomTabNavigator();

export default function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.white,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: colors.black,
        },
      }}>
      <Tab.Screen
        component={DiscoverNav}
        name="DiscoverNav"
        options={{
          headerShown: false,
          tabBarLabel: 'Discover',
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Ionicons
                name={focused ? 'bulb' : 'bulb-outline'}
                size={24}
                color={color}
              />
            );
          },
        }}
      />

      <Tab.Screen
        component={ChatNav}
        name="ChatNav"
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Ionicons
                name={focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline'}
                size={24}
                color={color}
              />
            );
          },
        }}
      />

      <Tab.Screen
        component={SettingsNav}
        name="SettingsNav"
        options={{
          headerShown: false,
          tabBarLabel: 'Settings',
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Ionicons
                name={focused ? 'settings' : 'settings-outline'}
                size={24}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
