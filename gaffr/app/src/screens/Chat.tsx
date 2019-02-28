import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Button,
  Alert
} from 'react-native';
import { blockMatch, liveListen, sendChatMessage } from '../utils';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { ChatMessage, Match } from '../utils/interfaces';
import { NavigationScreenProp, NavigationComponent } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  match: Match;
  userType: string;
  name: string;
  navigation: NavigationScreenProp<any, any>;
}

export default class Chat extends Component<Props> {
  state = {
    chatHistory: [],
    message: ''
  };

  static navigationOptions = ({ navigation }: NavigationComponent) => {
    return {
      title: navigation.getParam('name', 'error - no user'),
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam('block')}>
          <FontAwesome
            name="ban"
            style={{
              color: 'red',
              textAlign: 'center',
              textAlignVertical: 'center',
              fontSize: 40,
              marginRight: 10
            }}
          />
        </TouchableOpacity>
      )
    };
  };

  async componentDidMount(): Promise<void> {
    this.props.navigation.setParams({ block: this.block });
    const match = JSON.parse(this.props.navigation.getParam('match', 'ERROR'));
    liveListen('matches', match.id, (doc: DocumentSnapshot) => {
      const matchData = doc.data();
      this.setState({
        chatHistory: matchData ? matchData.chatHistory : []
      });
    });
  }
  sendMessage = async (): Promise<void> => {
    const { message } = this.state;
    const match = JSON.parse(this.props.navigation.getParam('match', 'ERROR'));
    const userType = this.props.navigation.getParam('userType', 'ERROR');
    if (message) {
      const chatMessage: ChatMessage = {
        message,
        speaker: userType,
        timestamp: Date.now().toLocaleString()
      };
      sendChatMessage(match.id, chatMessage);
      this.setState({ message: '' });
    }
  };

  block = (): void => {
    const match = JSON.parse(this.props.navigation.getParam('match', 'ERROR'));
    if (match.id) {
      Alert.alert(
        'Are you sure you want to block this user?',
        "The user will not be able to see you anymore, and you won't see the user in-app any more.",
        [
          {
            text: 'Yes, block them!',
            onPress: () => {
              blockMatch(match.id);
              this.props.navigation.goBack();
            }
          },
          { text: 'No, cancel', style: 'cancel' }
        ]
      );
    } else {
      Alert.alert('Error blocking this user');
    }
  };
  DismissKeyboard = ({ children }: any) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  render() {
    const { message, chatHistory } = this.state;
    const userType = this.props.navigation.getParam('userType', 'ERROR');
    return (
      <this.DismissKeyboard>
        <View style={{ flex: 1, backgroundColor: '#f9f4f5' }}>
          {chatHistory[0] ? (
            <ScrollView style={{ flex: 1 }}>
              {chatHistory.map((message: ChatMessage) => (
                <View
                  key={message.timestamp.toString()}
                  style={
                    message.speaker === userType
                      ? styles.userBubble
                      : styles.partnerBubble
                  }
                >
                  <Text
                    style={
                      message.speaker === userType
                        ? styles.user
                        : styles.partner
                    }
                  >
                    {message.message}
                  </Text>
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                textAlignVertical: 'center'
              }}
            >
              Begin the conversation!
            </Text>
          )}
          <KeyboardAvoidingView
            // style={{ flex: 1 }}
            behavior="position"
            keyboardVerticalOffset={142}
          >
            <View style={styles.inputBar}>
              <TextInput
                placeholder="type your message..."
                value={message}
                onChangeText={(text: String) =>
                  this.setState({ message: text })
                }
                style={styles.messageInput}
              />
              <TouchableOpacity
                onPress={() => this.sendMessage()}
                style={styles.sendButton}
              >
                <FontAwesome name="arrow-up" size={25} style={styles.arrow} />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </this.DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  user: {
    textAlign: 'right',
    color: 'white'
  },
  partner: {
    textAlign: 'left'
  },
  userBubble: {
    backgroundColor: '#502f4c',
    width: '70%',
    alignSelf: 'flex-end',
    borderRadius: 20,
    margin: 5,
    padding: 12
  },
  partnerBubble: {
    backgroundColor: '#fa214b',
    width: '70%',
    alignSelf: 'flex-start',
    borderRadius: 20,
    margin: 5,
    padding: 12
  },
  inputBar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#f9f4f5'
  },
  messageInput: {
    width: '80%',
    padding: 12,
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  sendButton: {
    backgroundColor: '#dcd1e8',
    padding: 12,
    borderRadius: 100,
    width: '20%',
    borderColor: '#502f4c',
    borderWidth: 2,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0
  },
  arrow: {
    textAlign: 'center',
    color: '#502f4c'
  }
});
