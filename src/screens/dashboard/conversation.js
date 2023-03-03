import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from 'react';

import UUID from 'react-native-uuid';

import globalStyles from '../../assets/styles/global-styles';
import ChatInput from '../../components/inputs/chat-input';
import colors from '../../assets/colors/colors';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MessageItem from '../../components/cards/message-item';
import {showMyToast} from '../../functions/show-toast';
import PrimaryText from '../../components/texts/primary-text';
import {
  BarIndicator,
  PulseIndicator,
  WaveIndicator,
} from 'react-native-indicators';

import {ChatThemeContext} from '../../context/chat-theme-context';

import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';
import axios from 'axios';
import {TypingAnimation} from 'react-native-typing-animation';
import {Modal} from 'native-base';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {ScrollView} from 'react-native';
import PrimaryButton from '../../components/buttons/primary-button';
import SecondaryButton from '../../components/buttons/secondary-button';

const {width, height} = Dimensions.get('window');

export default function Conversation({route}) {
  const defaultMessage = 'How can I help you today?';

  const {chatTheme, setChatTheme} = useContext(ChatThemeContext);
  console.log(chatTheme);
  const [submitting, setSubmitting] = useState(false);
  const [awaitingMessage, setAwaitingMessage] = useState(false);

  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: defaultMessage,
      image: null,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'Chat julie',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
  ]);
  const [message, setMessage] = useState('');
  const [isRecording, setRecording] = useState(false);

  const [messagesToSend, setMessagesToSend] = useState([
    {role: 'system', content: 'You are a helpful assistant.'},
  ]);

  const [chatID, setChatID] = useState('');
  const [chatName, setChatName] = useState('');
  const [createdNewChat, setCreatedNewChat] = useState(false);

  const [themesModal, setThemesModal] = useState(false);
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
          width: width,
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
          width: width,
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
          width: width,
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
      setThemesModal(false);
      console.log(colors.theme1);
    } else if (theme == 2) {
      setChatTheme(colors.theme2);
      setThemesModal(false);
      console.log(colors.theme2);
    } else {
      setChatTheme(colors.theme3);
      setThemesModal(false);
      console.log(colors.theme3);
    }
  }

  const apiEndPoint = `https://chatjulie.ape30technologies.com/api/text/text-completion`;

  const [user, setUser] = useState({
    _id: 2,
    name: 'Tingo',
    avatar: null,
  });

  const flatListRef = useRef(null);

  const [recognized, setRecognized] = useState('');
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    getChatCheme();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      setChatID('');
      setChatName('');
      setCreatedNewChat(false);
    };
  }, []);

  function getChatCheme() {
    if (!chatTheme) {
      setThemesModal(true);
    }
  }

  const onSpeechStart = e => {
    console.log('onSpeechStart: ', e);
    setStarted('√');
  };

  const onSpeechRecognized = e => {
    console.log('onSpeechRecognized: ', e);
    setRecognized('√');
  };

  const onSpeechEnd = e => {
    console.log('onSpeechEnd: ', e);
    setEnd('√');
  };

  const onSpeechError = e => {
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = e => {
    console.log('onSpeechResults: ', e);
    setResults(e.value);
  };

  const onSpeechPartialResults = e => {
    console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = e => {
    console.log('onSpeechVolumeChanged: ', e);
    setPitch(e.value);
  };

  const startRecognizing = async () => {
    setRecognized('');
    setPitch('');
    setError('');
    setStarted('');
    setResults([]);
    setPartialResults([]);
    setEnd('');

    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    setRecognized('');
    setPitch('');
    setError('');
    setStarted('');
    setResults([]);
    setPartialResults([]);
    setEnd('');
  };

  async function sendMessage() {
    if (!message) {
      showMyToast({
        status: 'error',
        title: 'Required',
        description: 'Please write something before submitting',
      });
    } else {
      setAwaitingMessage(true);

      flatListRef.current.scrollToEnd();
      let id = Math.floor(100000 + Math.random() * 900000).toString();
      const newMessage = {
        _id: id,
        text: message,
        image: null,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Tingo',
          avatar: 'https://placeimg.com/140/140/any',
        },
      };

      const newMessageToSend = {
        role: 'user',
        content: message,
      };

      setMessages(prevState => [...prevState, newMessage]);
      setMessagesToSend(prevState => [...prevState, newMessageToSend]);
      sendToOpenAI([...messagesToSend, newMessageToSend]);

      if (!createdNewChat) {
        setCreatedNewChat(true);
        //set new chat id
        setChatID(UUID.v4());
        //set new chat name
        setChatName(message);
      }
    }
  }

  async function sendToOpenAI(dataToSend) {
    flatListRef.current.scrollToEnd();

    const imageBody = {
      prompt: message,
    };

    const textBody = {
      messages: dataToSend,
    };

    await axios
      .post(apiEndPoint, textBody)
      .then(response => {
        setAwaitingMessage(false);

        let responseId = Math.floor(100000 + Math.random() * 900000).toString();

        const aiResponse = {
          _id: responseId,
          text: response.data.data[0].message.content,
          image: null,
          createdAt: new Date(),
          user: {
            name: 'Chat Julie',
            avatar: 'https://placeimg.com/140/140/any',
          },
        };

        const aiResToSend = {
          role: 'assistant',
          content: response.data.data[0]
            ? response.data.data[0].message.content
            : null,
        };

        setMessages(prevState => [...prevState, aiResponse]);
        setMessagesToSend(prevState => [...prevState, aiResToSend]);
        setMessage('');

        flatListRef.current.scrollToEnd();
      })
      .catch(err => {
        console.log(err);
        setAwaitingMessage(false);
      });
  }

  async function handleRecord() {
    if (!isRecording) {
      startRecognizing();
      setRecording(true);
    } else {
      stopRecognizing();
      setRecording(false);
    }
  }

  return (
    <View
      style={[
        styles.messagingscreen,
        {
          backgroundColor:
            chatTheme == colors.theme1
              ? colors.lightOrange
              : chatTheme == colors.theme2
              ? colors.lightBlue
              : colors.lightRed,
        },
      ]}>
      <Modal isOpen={awaitingMessage}>
        <View
          style={{
            height: 70,
            width: 70,
            padding: 20,
            borderRadius: 14,
            backgroundColor: colors.black,
          }}>
          <BarIndicator color={colors.white} size={20} />
        </View>
      </Modal>

      <View style={[styles.messagingscreen, {padding: 10}]}>
        {messages[0] ? (
          <>
            <KeyboardAwareFlatList
              style={{paddingBottom: 100}}
              ref={flatListRef}
              showsVerticalScrollIndicator={false}
              data={messages}
              keyExtractor={item => item._id}
              renderItem={({item}) => (
                <MessageItem
                  submitting={submitting}
                  key={item._id}
                  item={item}
                  user={user}
                />
              )}
            />

            {/* {awaitingMessage && (
              <TypingAnimation dotColor={colors.white} dotRadius={5} />
            )} */}
          </>
        ) : (
          ''
        )}
      </View>

      <View style={styles.messaginginputContainer}>
        <ChatInput
          onBlur={() => {
            flatListRef.current.scrollToEnd();
          }}
          value={message}
          name="message"
          onChangeText={setMessage}
          placeholder={
            isRecording ? 'Recording in progress...' : 'Write something'
          }
          style={styles.input}
          InputRightElement={
            <View style={styles.recordingComponent}>
              <TouchableOpacity
                style={globalStyles.iconRight}
                onPress={() => handleRecord()}>
                {!isRecording ? (
                  <Ionicons
                    name={isRecording ? 'mic' : 'ios-mic-outline'}
                    size={30}
                    color={isRecording ? 'red' : 'black'}
                  />
                ) : (
                  <PulseIndicator color="red" size={30} />
                )}
              </TouchableOpacity>
            </View>
          }
        />

        <TouchableOpacity onPress={sendMessage}>
          <Ionicons
            name="md-send-sharp"
            size={30}
            color={
              chatTheme == colors.theme1
                ? colors.lightOrange
                : chatTheme == colors.theme2
                ? colors.theme2
                : colors.theme3
            }
          />
        </TouchableOpacity>
      </View>

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
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messagingscreen: {
    flex: 1,
  },
  messaginginputContainer: {
    width: '100%',
    backgroundColor: colors.gray,
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordingComponent: {
    flexDirection: 'column',
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
