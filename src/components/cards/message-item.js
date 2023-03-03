import {StyleSheet, Text, Dimensions, Image, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import PrimaryText from '../texts/primary-text';
import colors from '../../assets/colors/colors';

import {TypingAnimation} from 'react-native-typing-animation';
import {ChatThemeContext} from '../../context/chat-theme-context';

import TypeWriter from 'react-native-typewriter';

const {width} = Dimensions.get('window');

export default function MessageItem({item, submitting, user}) {
  const {chatTheme, setChatTheme} = useContext(ChatThemeContext);
  const aiResponse = item.user._id !== user._id;
  const containsImage = item.image !== null;
  const [content, setContent] = useState(item.text);

  const [loadingImage, setLoadingImage] = useState(true);

  return (
    <View
      style={
        aiResponse
          ? [
              styles.responseMessageContainer,
              {
                backgroundColor:
                  chatTheme == colors.theme1
                    ? colors.veryLightOrange
                    : chatTheme == colors.theme2
                    ? colors.veryLightBlue
                    : colors.veryLightRed,
              },
            ]
          : containsImage
          ? {backgroundColor: 'red'}
          : styles.requestMessageContainer
      }>
      {loadingImage && containsImage && (
        <PrimaryText
          selectable={true}
          style={{color: colors.white, position: 'absolute', zIndex: 1}}>
          Loading image...
        </PrimaryText>
      )}
      {containsImage ? (
        <Image
          onLoadEnd={() => setLoadingImage(false)}
          source={{uri: item.image}}
          style={styles.generatedImage}
        />
      ) : (
        <PrimaryText style={{color: colors.black, textAlign: 'left'}}>
          {content}
        </PrimaryText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  responseMessageContainer: {
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: -14,
    borderBottomRightRadius: 14,
    padding: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
    maxWidth: width / 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  requestMessageContainer: {
    backgroundColor: colors.white,
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: -14,
    padding: 20,
    alignSelf: 'flex-end',
    marginBottom: 10,
    maxWidth: width / 1.2,
  },
  generatedImage: {
    width: width / 1.4,
    height: width / 1.4,
    backgroundColor: colors.gray,
  },
  image: {
    backgroundColor: 'red',
  },
});
