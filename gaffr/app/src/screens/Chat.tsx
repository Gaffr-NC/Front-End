import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView
} from 'react-native';
import { getMatchById, liveListen, sendChatMessage } from '../utils';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { ChatMessage, Match } from '../utils/interfaces';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  match: Match;
  userType: string;
  navigation: NavigationScreenProp<any, any>;
}

export default class Chat extends Component<Props> {
  state = {
    chatHistory: [],
    message: '',
  };
  async componentDidMount() {
    const match = JSON.parse(this.props.navigation.getParam('match', 'ERROR'));
    liveListen('matches', match.id, (doc: DocumentSnapshot) => {
      const matchData = doc.data();
      this.setState({
        chatHistory: matchData ? matchData.chatHistory : []
      });
    });
  }
  sendMessage = async () => {
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
  render() {
    const { message, chatHistory } = this.state;
    return (
      <ScrollView style={{ flex: 1 }}>
        {chatHistory.map((message: ChatMessage) => (
          <View key={message.timestamp.toString()}>
            <Text>{message.speaker}</Text>
            <Text>{message.message}</Text>
          </View>
        ))}
        <TextInput
          placeholder="type your message..."
          value={message}
          onChangeText={(text: String) => this.setState({ message: text })}
        />
        <Button title="Send" onPress={() => this.sendMessage()} />
      </ScrollView>
    );
  }
}
