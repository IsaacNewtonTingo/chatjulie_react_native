import {StyleSheet, LogBox} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';

import Decider from './src/navigators/decider';

import {CredentialsContext} from './src/context/credentials-context';
import {ChatThemeContext} from './src/context/chat-theme-context';

import EncryptedStorage from 'react-native-encrypted-storage';
import TabNav from './src/navigators/tab-nav';
import HomeStack from './src/navigators/home-stack';

LogBox.ignoreAllLogs();

export default function App() {
  const [storedCredentials, setStoredCredentials] = useState('');
  const [chatTheme, setChatTheme] = useState('');

  useEffect(() => {
    checkStoredUserData();
  }, []);

  async function checkStoredUserData() {
    try {
      const userData = await EncryptedStorage.getItem('userData');
      if (userData) {
        setStoredCredentials(JSON.parse(userData));
      } else {
        setStoredCredentials(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CredentialsContext.Provider
      value={{storedCredentials, setStoredCredentials}}>
      <ChatThemeContext.Provider value={{chatTheme, setChatTheme}}>
        <NativeBaseProvider>
          <NavigationContainer>
            <HomeStack />
          </NavigationContainer>
        </NativeBaseProvider>
      </ChatThemeContext.Provider>
    </CredentialsContext.Provider>
  );
}

const styles = StyleSheet.create({});
