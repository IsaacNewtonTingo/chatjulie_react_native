import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Icon, Input} from 'native-base';
export default function ChatInput(props) {
  const {
    value,
    name,
    onChangeText,
    placeholder,
    style,
    secureTextEntry,
    onBlur,
    handleBlur,
    InputRightElement,
  } = props;
  return (
    <Input
      borderRadius={14}
      marginY={2}
      minHeight={50}
      width="85%"
      backgroundColor="white"
      name={name}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onBlur={onBlur}
      handleBlur={handleBlur}
      InputRightElement={InputRightElement}
      multiline={true}
      style={[styles.textInput, style]}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 20,
  },
});
