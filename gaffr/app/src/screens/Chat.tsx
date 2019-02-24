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
import { ChatMessage } from '../utils/interfaces';

export default class Chat extends Component {
  state = {
    chatHistory: [],
    message: ''
  };
  async componentDidMount() {
    // const {id, userType} = this.props
    const id = '13JfwO1SNvwMLeGg1Wph';
    const match = await getMatchById(id);
    this.setState({ match });
    liveListen('matches', id, (doc: DocumentSnapshot) => {
      const matchData = doc.data();
      this.setState({
        match: matchData,
        chatHistory: matchData ? matchData.chatHistory : []
      });
    });
    // get match by props
    // set state with matches
  }
  sendMessage = async () => {
    const { message } = this.state;
    // const { id, userType } = this.props;
    if (message) {
      const id = '13JfwO1SNvwMLeGg1Wph';
      const chatMessage: ChatMessage = {
        message,
        speaker: 'tenants',
        timestamp: Date.now().toLocaleString()
      };
      sendChatMessage(id, chatMessage);
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
