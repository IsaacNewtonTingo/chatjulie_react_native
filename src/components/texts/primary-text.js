import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function PrimaryText(props) {
  const {style, selectable} = props;
  return (
    <Text selectable={selectable} style={[styles.primaryText, style]}>
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  primaryText: {
    color: 'white',
    fontFamily: 'FuturaLT',
    textAlign: 'center',
  },
});
