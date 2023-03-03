import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../assets/colors/colors';

export default function SecondaryText(props) {
  return (
    <Text style={[styles.primaryText, props.style]}>{props.children}</Text>
  );
}

const styles = StyleSheet.create({
  primaryText: {
    color: colors.white,
    fontFamily: 'FuturaLT-Bold',
  },
});
