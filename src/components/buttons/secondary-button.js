import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {BallIndicator} from 'react-native-indicators';
import colors from '../../assets/colors/colors';
import PrimaryText from '../texts/primary-text';

export default function SecondaryButton(props) {
  const {title, onPress, disabled, style, submitting} = props;

  return (
    <TouchableOpacity
      style={[styles.button, style, {}]}
      disabled={disabled}
      onPress={onPress}>
      {submitting ? (
        <BallIndicator color={colors.dark} size={20} />
      ) : (
        <PrimaryText>{title}</PrimaryText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
  },
});
