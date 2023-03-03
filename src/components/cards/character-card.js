import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('window');

export default function CharacterCard(props) {
  const {backgroundColor} = props;
  return (
    <TouchableOpacity
      style={[
        styles.card,
        {backgroundColor: backgroundColor},
      ]}></TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width / 3.5,
    height: width / 3.5,
    borderRadius: 10,
    marginBottom: 20,
  },
});
