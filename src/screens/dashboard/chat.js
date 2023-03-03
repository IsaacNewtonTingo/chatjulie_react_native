import React, {useState, useRef, useContext, useEffect} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Modal} from 'native-base';

import {ChatThemeContext} from '../../context/chat-theme-context';

import globalStyles from '../../assets/styles/global-styles';
import PrimaryText from '../../components/texts/primary-text';
import CharacterCard from '../../components/cards/character-card';
import PrimaryButton from '../../components/buttons/primary-button';
import SecondaryButton from '../../components/buttons/secondary-button';
import colors from '../../assets/colors/colors';

import AntDesign from 'react-native-vector-icons/AntDesign';

const {height, width} = Dimensions.get('window');

export default function Chat({navigation}) {
  const {chatTheme, setChatTheme} = useContext(ChatThemeContext);
  const [themesModal, setThemesModal] = useState(!chatTheme ? true : false);
  const scrollViewRef = useRef(null);

  const scrollToIndex = index => {
    scrollViewRef.current.scrollTo({x: index * width, y: 0, animated: true});
  };

  const [index, setIndex] = React.useState(0);
  const handleScroll = event => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / width);
    setIndex(index);
  };

  const characters = [
    {
      backgroundColor: '#F9A826',
      title: 'Name 1',
    },

    {
      backgroundColor: '#3F3D56',
      title: 'Name 2',
    },

    {
      backgroundColor: '#3066BE',
      title: 'Name 3',
    },

    {
      backgroundColor: '#DE3C4B',
      title: 'Name 4',
    },

    {
      backgroundColor: '#7D83FF',
      title: 'Name 5',
    },

    {
      backgroundColor: '#4CD964',
      title: 'Name 6',
    },
  ];

  useEffect(() => {
    if (!chatTheme) {
      setThemesModal(true);
    } else {
      navigation.navigate('DynamicConversation', {title: 'Chat Julie'});
    }
    return () => {
      setIndex(0);
    };
  }, []);

  async function handleStartChatPress() {
    if (!chatTheme) {
      setThemesModal(true);
    } else {
      navigation.navigate('DynamicConversation', {title: 'Chat Julie'});
    }
  }

  const Theme1 = () => (
    <View style={styles.themeContainer}>
      <TouchableOpacity style={styles.leftArrow}>
        <AntDesign name="left" color={colors.gray} size={30} />
      </TouchableOpacity>

      <Image
        style={styles.themeImage}
        source={require('../../assets/images/preview1.png')}
      />

      <TouchableOpacity
        onPress={() => scrollToIndex(1)}
        style={styles.rightArrow}>
        <AntDesign name="right" color={colors.white} size={30} />
      </TouchableOpacity>

      <PrimaryButton
        onPress={() => handleSelectTheme(1)}
        style={{
          marginTop: 20,
          backgroundColor: colors.theme1,
          width: width - 40,
        }}
        title="Select theme"
      />

      <SecondaryButton
        style={{marginTop: 20}}
        title="Cancel"
        onPress={() => setThemesModal(false)}
      />
    </View>
  );

  const Theme2 = () => (
    <View style={styles.themeContainer}>
      <TouchableOpacity
        onPress={() => scrollToIndex(0)}
        style={styles.leftArrow}>
        <AntDesign name="left" color={colors.white} size={30} />
      </TouchableOpacity>

      <Image
        style={styles.themeImage}
        source={require('../../assets/images/preview2.png')}
      />

      <TouchableOpacity
        onPress={() => scrollToIndex(2)}
        style={styles.rightArrow}>
        <AntDesign name="right" color={colors.white} size={30} />
      </TouchableOpacity>

      <PrimaryButton
        onPress={() => handleSelectTheme(2)}
        style={{
          marginTop: 20,
          backgroundColor: colors.theme2,
          width: width - 40,
        }}
        title="Select theme"
      />

      <SecondaryButton
        style={{marginTop: 20}}
        title="Cancel"
        onPress={() => setThemesModal(false)}
      />
    </View>
  );

  const Theme3 = () => (
    <View style={styles.themeContainer}>
      <TouchableOpacity
        onPress={() => scrollToIndex(1)}
        style={styles.leftArrow}>
        <AntDesign name="left" color={colors.white} size={30} />
      </TouchableOpacity>

      <Image
        style={styles.themeImage}
        source={require('../../assets/images/preview3.png')}
      />

      <TouchableOpacity style={styles.rightArrow}>
        <AntDesign name="right" color={colors.gray} size={30} />
      </TouchableOpacity>

      <PrimaryButton
        onPress={() => handleSelectTheme(3)}
        style={{
          marginTop: 20,
          backgroundColor: colors.theme3,
          width: width - 40,
        }}
        title="Select theme"
      />

      <SecondaryButton
        style={{marginTop: 20}}
        title="Cancel"
        onPress={() => setThemesModal(false)}
      />
    </View>
  );

  function handleSelectTheme(theme) {
    if (theme == 1) {
      setChatTheme(colors.theme1);
      navigation.navigate('DynamicConversation', {title: 'Chat Julie'});
      setThemesModal(false);
    } else if (theme == 2) {
      setChatTheme(colors.theme2);
      navigation.navigate('DynamicConversation', {title: 'Chat Julie'});
      setThemesModal(false);
    } else {
      setChatTheme(colors.theme3);
      navigation.navigate('DynamicConversation', {title: 'Chat Julie'});
      setThemesModal(false);
    }
  }

  return (
    <KeyboardAwareScrollView style={globalStyles.container}>
      <PrimaryText style={{textAlign: 'left', fontSize: 20}}>
        Choose your character
      </PrimaryText>

      <View style={styles.mapCharacters}>
        {characters.map((character, i) => (
          <CharacterCard key={i} backgroundColor={character.backgroundColor} />
        ))}
      </View>

      <PrimaryButton onPress={handleStartChatPress} title="Start chat" />

      <Modal
        style={styles.modalContainer}
        isOpen={themesModal}
        onClose={() => setThemesModal(false)}>
        <View style={styles.innerModal}>
          <ScrollView
            horizontal
            snapToInterval={width}
            snapToAlignment="center"
            contentContainerStyle={styles.imageContainer}
            ref={scrollViewRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}>
            <Theme1 />
            <Theme2 />
            <Theme3 />
          </ScrollView>
          {/* 
          <PrimaryButton
            onPress={handleSelectTheme}
            style={{
              marginTop: 20,
              backgroundColor:
                index == 0
                  ? colors.theme1
                  : index == 1
                  ? colors.theme2
                  : index == 2
                  ? colors.theme3
                  : colors.theme1,
              width: width,
            }}
            title="Select theme"
          />
          <SecondaryButton
            style={{marginTop: 20}}
            title="Cancel"
            onPress={() => setThemesModal(false)}
          /> */}
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  mapCharacters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginVertical: 40,
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    flex: 1,
  },
  innerModal: {},
  themeImage: {},
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  switch: {},
  themeContainer: {
    width: width,
    alignItems: 'center',
  },
  rightArrow: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: height / 2.5,
  },
  leftArrow: {
    position: 'absolute',
    alignSelf: 'flex-start',
    zIndex: 1,
    top: height / 2.5,
  },
});
