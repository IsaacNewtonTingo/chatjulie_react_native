import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/auth/login';
import Welcome from '../screens/auth/welcome';
import Signup from '../screens/auth/signup';
import TabNav from './tab-nav';
import ForgotPassword from '../screens/auth/forgot-password';

const Stack = createNativeStackNavigator();

export default function AuthNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        component={Welcome}
        name="Welcome"
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        component={Login}
        name="Login"
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        component={Signup}
        name="Signup"
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        component={ForgotPassword}
        name="ForgotPassword"
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        component={TabNav}
        name="TabNav"
      />
    </Stack.Navigator>
  );
}
