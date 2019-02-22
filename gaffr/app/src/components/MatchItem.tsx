import React, { Component } from 'react';
import { getUserById } from '../utils';
import { Match, User } from '../utils/interfaces';
import { View, Text } from 'react-native';

interface States {
  user: User | null;
}
interface Props {
  userType: string;
  match: Match;
}

export default class MatchItem extends Component<Props, States> {
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
    if (user) {
      const thisUser: User = user;
      return <View>{user ? <Text>{thisUser.name}</Text> : null}</View>;
    }
    return <Text>Loading user...</Text>;
  }
}
