import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";
import { getMatchById, liveListen, sendChatMessage } from "../utils";
import { DocumentSnapshot } from "@firebase/firestore-types";
import { ChatMessage, Match } from "../utils/interfaces";
import { NavigationScreenProp } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  match: Match;
  userType: string;
  name: string;
  navigation: NavigationScreenProp<any, any>;
}

export default class Chat extends Component<Props> {
  state = {
    chatHistory: [],
    message: "",
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name', 'error - no user')
    }
  }
  async componentDidMount() {
    const match = JSON.parse(this.props.navigation.getParam("match", "ERROR"));
    liveListen("matches", match.id, (doc: DocumentSnapshot) => {
      const matchData = doc.data();
      this.setState({
        chatHistory: matchData ? matchData.chatHistory : []
      });
    });
  }
  sendMessage = async () => {
    const { message } = this.state;
    const match = JSON.parse(this.props.navigation.getParam("match", "ERROR"));
    const userType = this.props.navigation.getParam("userType", "ERROR");
    if (message) {
      const chatMessage: ChatMessage = {
        message,
        speaker: userType,
        timestamp: Date.now().toLocaleString()
      };
      sendChatMessage(match.id, chatMessage);
      this.setState({ message: "" });
    }
  };
  render() {
    const { message, chatHistory } = this.state;
    const userType = this.props.navigation.getParam("userType", "ERROR");
    return (
      <View style={{ flex: 1 }}>
        { chatHistory[0] ? <ScrollView style={{ flex: 1 }}>
          {chatHistory.map((message: ChatMessage) => (
            <View
              key={message.timestamp.toString()}
              style={
                message.speaker === userType
                  ? styles.userBubble
                  : styles.partnerBubble
              }
            >
              {/* <Text>{message.speaker}</Text> */}
              <Text
                style={
                  message.speaker === userType ? styles.user : styles.partner
                }
              >
                {message.message}
              </Text>
            </View>
          ))}
        </ScrollView> : <Text style={{ flex:1, textAlign: 'center', textAlignVertical: 'center'}}>Begin the conversation!</Text>}
        <View style={styles.inputBar}>
          <TextInput
            placeholder="type your message..."
            value={message}
            onChangeText={(text: String) => this.setState({ message: text })}
            style={styles.messageInput}
          />
          <TouchableOpacity
            onPress={() => this.sendMessage()}
            style={styles.sendButton}
          >
            <FontAwesome name="arrow-up" size={25} style={styles.arrow} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  user: {
    textAlign: "right",
    color: "white"
  },
  partner: {
    textAlign: "left"
  },
  userBubble: {
    backgroundColor: "#502f4c",
    width: "70%",
    alignSelf: "flex-end",
    borderRadius: 20,
    margin: 5,
    padding: 12
  },
  partnerBubble: {
    backgroundColor: "#fa214b",
    width: "70%",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 5,
    padding: 12
  },
  inputBar: {
    height: 50,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  messageInput: {
    width: "80%",
    padding: 5,
    position: "absolute",
    bottom: 0
  },
  sendButton: {
    backgroundColor: "powderblue",
    padding: 12,
    borderRadius: 100,
    width: "20%",
    borderColor: "steelblue",
    borderWidth: 2,
    justifyContent: "center",
    position: "absolute",
    bottom: 0
  },
  arrow: {
    textAlign: "center",
    color: "steelblue"
  }
});
