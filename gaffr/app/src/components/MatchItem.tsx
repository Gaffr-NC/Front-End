import React, { Component } from 'react';
import { getUserById, trimMessage } from '../utils';
import { Match, User } from '../utils/interfaces';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationScreenProp, withNavigation } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

interface States {
  user: User | null;
}
interface Props {
  userType: string;
  match: Match;
  navigation?: NavigationScreenProp<any, any>;
}

class MatchItem extends Component<any, States> {
  state = {
    user: null
  };

  async componentDidMount() {
    const { userType, match } = this.props;
    const user =
      userType === 'landlords'
        ? await getUserById(match.tenantId, 'tenants')
        : await getUserById(match.landlordId, 'landlords');
    if (user) this.setState({ user });
  }
  render() {
    const { user } = this.state;
    const { navigation, match, userType } = this.props;
    const lastMessage = match.chatHistory.length
      ? match.chatHistory[match.chatHistory.length - 1].message
      : 'Begin the conversation!';
    const lastUser = match.chatHistory.length
      ? match.chatHistory[match.chatHistory.length - 1].speaker
      : '';
    const messagePreview = trimMessage(lastMessage);
    if (user) {
      const matchedUser: User = user;
      return (
        <View>
          {user ? (
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                navigation.navigate('Chat', {
                  match: JSON.stringify(match),
                  userType,
                  name: matchedUser.name
                })
              }
            >
              <Text style={styles.text}>{matchedUser.name}</Text>
              <Text style={styles.message}>
                {lastUser === userType && (
                  <FontAwesome name="reply" size={15} style={styles.arrow} />
                )}
                {messagePreview}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      );
    }
    return <Text>Loading user...</Text>;
  }
}

const styles = StyleSheet.create({
  item: {
    height: 80,
    borderColor: '#502f4c',
    borderWidth: 2,
    margin: 5,
    borderRadius: 10
  },
  text: {
    textAlignVertical: 'center',
    padding: 12
  },
  message: {
    color: 'lightgray',
    padding: 12,
    marginBottom: 5
  },
  arrow: { marginRight: 5 }
});

export default withNavigation(MatchItem);
export { MatchItem };
