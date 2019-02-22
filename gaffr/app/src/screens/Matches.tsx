import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import {
  getMatchesByTenant,
  getMatchesByLandlord,
  getUserById
} from '../utils';
import { Match } from '../utils/interfaces';
import MatchItem from '../components/MatchItem';

export default class Matches extends Component {
  state = {
    matches: [],
    userType: ''
  };
  static navigationOptions = {
    title: 'Matches'
  };

  async componentDidMount() {
    const uid = await AsyncStorage.getItem('uid');
    const userType = await AsyncStorage.getItem('userType');
    const matches =
      uid &&
      (userType === 'tenants'
        ? await getMatchesByTenant(uid)
        : await getMatchesByLandlord(uid));
    this.setState({ matches, userType });
  }

  render() {
    const { userType, matches } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Matches!</Text>
        {matches.length
          ? matches.map((match: Match) => (
              <MatchItem userType={userType} match={match} />
            ))
          : null}
      </View>
    );
  }
}
