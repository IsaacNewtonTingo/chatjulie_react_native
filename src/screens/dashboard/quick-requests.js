import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import globalStyles from '../../assets/styles/global-styles';
import PrimaryText from '../../components/texts/primary-text';

export default function QuickRequests() {
  return (
    <KeyboardAwareScrollView style={globalStyles.container}>
      {/* <PrimaryText>Hello</PrimaryText> */}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({});
