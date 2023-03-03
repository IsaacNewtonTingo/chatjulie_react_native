import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import PrimaryText from '../../components/texts/primary-text';
import globalStyles from '../../assets/styles/global-styles';
import PrimaryButton from '../../components/buttons/primary-button';

const {width} = Dimensions.get('window');

const B = props => (
  <Text
    style={{
      textShadowColor: '#993333',
      textShadowOffset: {
        height: 1,
        width: 1,
      },
      textShadowRadius: 3,
    }}>
    {props.children}
  </Text>
);

const C = props => (
  <Text
    style={{
      color: '#33cccc',
    }}>
    {props.children}
  </Text>
);

const slides = [
  {
    key: 1,
    title: 'Welcome to',
    text: 'Welcome to our digital factory OpenAI Chatbot',
    image: require('../../assets/images/firstIMG.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Discover',
    text: 'Write emails, interview questions or code with Open AI Chatbot',
    image: require('../../assets/images/secondIMG.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Get started with',
    text: 'Choose any character of your choice to get started!',
    image: require('../../assets/images/3rdIMG.png'),
    backgroundColor: '#22bcb5',
  },
];

export default function Welcome({navigation}) {
  const renderItem = ({item}) => {
    return (
      <>
        <Image
          style={globalStyles.logoContainer}
          source={require('../../assets/images/dfLogo.png')}
        />
        <Image source={item.image} style={styles.image} />

        <View style={styles.lowerContainer}>
          <PrimaryText style={{fontSize: 20}}>{item.text}</PrimaryText>
        </View>
      </>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <PrimaryText style={{fontSize: 14}}>Next</PrimaryText>
      </View>
    );
  };

  const renderPrevButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <PrimaryText style={{fontSize: 14}}>Prev</PrimaryText>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <PrimaryText style={{fontSize: 14}}>Done</PrimaryText>
      </View>
    );
  };

  const renderSkipButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <PrimaryText>Skip</PrimaryText>
      </View>
    );
  };

  const onDone = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={globalStyles.container}>
      <AppIntroSlider
        data={slides}
        onDone={onDone}
        renderItem={renderItem}
        showSkipButton={true}
        showPrevButton={true}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        renderPrevButton={renderPrevButton}
        renderSkipButton={renderSkipButton}
        dotStyle={{backgroundColor: 'gray'}}
      />

      <PrimaryButton
        onPress={() => navigation.navigate('Login')}
        style={{width: width - 40}}
        title="Get started"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  companyTextStyles: {
    color: 'white',
    fontSize: 60,
    fontFamily: 'PaytoneOne-Regular',
    textShadowColor: '#993333',
    textShadowOffset: {
      height: 1,
      width: 2,
    },
    textShadowRadius: 10,
  },
  image: {
    width: 253,
    height: 208,
    alignSelf: 'center',
    marginVertical: 40,
    resizeMode: 'contain',
  },
  text: {
    color: 'white',
    fontWeight: '800',
  },
  lowerContainer: {
    padding: 50,
    height: '50%',
    width: width,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  title: {
    color: 'white',
    fontFamily: 'PaytoneOne-Regular',
    fontSize: 30,
  },
  description: {
    color: '#C5C5C5',
    marginTop: 40,
    fontSize: 16,
  },
});
