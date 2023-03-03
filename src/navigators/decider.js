import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {CredentialsContext} from '../context/credentials-context';
import AuthNav from './auth-nav';
import HomeStack from './home-stack';

export default function Decider() {
  return (
    <CredentialsContext.Consumer>
      {({storedCredentials}) => (
        <>{storedCredentials ? <HomeStack /> : <AuthNav />}</>
      )}
    </CredentialsContext.Consumer>
  );
}

const styles = StyleSheet.create({});
