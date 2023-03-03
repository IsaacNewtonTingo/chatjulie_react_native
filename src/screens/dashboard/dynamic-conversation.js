import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
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

const {width} = Dimensions.get('window');

export default function DynamicConversation({route}) {
  const defaultMessage =
    route.params.title == 'Chat Julie'
      ? 'How can I help you today?'
      : route.params.title == 'Text completion'
      ? 'What do you want to know?'
      : route.params.title == 'Developer category'
      ? 'Do you need any developer query? Talk to me.'
      : route.params.title == 'Image generation'
      ? 'Do you want any image generated for you? Talk to me.'
      : route.params.title == 'Summarization'
      ? 'Enter text you need a summary of'
      : '';

  const {chatTheme, setChatTheme} = useContext(ChatThemeContext);
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

  const apiEndPoint =
    route.params.title == 'Chat Julie'
      ? `${process.env.API_ENDPOINT}/text/text-completion`
      : route.params.title == 'Text completion'
      ? `${process.env.API_ENDPOINT}/text/text-completion`
      : route.params.title == 'Developer category'
      ? `${process.env.API_ENDPOINT}/text/text-completion`
      : route.params.title == 'Image generation'
      ? `${process.env.API_ENDPOINT}/image/generate-image`
      : route.params.title == 'Summarization'
      ? `${process.env.API_ENDPOINT}/text/text-completion`
      : `${process.env.API_ENDPOINT}/text/text-completion`;

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

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      setChatID('');
      setChatName('');
      setCreatedNewChat(false);
    };
  }, []);

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

  // function onChangeText(text){
  //   setMessage(text)

  // }

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
      .post(
        apiEndPoint,
        route.params.title == 'Image generation' ? imageBody : textBody,
      )
      .then(response => {
        setAwaitingMessage(false);

        let responseId = Math.floor(100000 + Math.random() * 900000).toString();

        const aiResponse = {
          _id: responseId,
          text:
            route.params.title == 'Image generation'
              ? null
              : response.data.data[0].message.content,
          image:
            route.params.title == 'Image generation'
              ? response.data.data.data[0].url
              : null,
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
    showMyToast({
      status: 'info',
      title: 'Oops !!!',
      description:
        'Speech to text functionality coming soon. Sorry for the inconvenience',
    });
    // if (!isRecording) {
    //   startRecognizing();
    //   setRecording(true);
    // } else {
    //   stopRecognizing();
    //   setRecording(false);
    // }
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
});
