import React, { Component } from 'react';
import { View, Text, AsyncStorage, ScrollView } from 'react-native';
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
      <ScrollView style={{ flex: 1}}>
        <Text>Matches!</Text>
        {matches.map((match: Match) => (
          <MatchItem userType={userType} match={match} key={match.id} />
        ))}
      </ScrollView>
    );
  }
}
