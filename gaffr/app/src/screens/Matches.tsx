import React, { Component } from 'react';
import { View, Text, AsyncStorage, ScrollView } from 'react-native';
import {
  getMatchesByTenant,
  getMatchesByLandlord,
  getUserById,
  liveListen,
  liveListenMatchesTenant,
  liveListenMatchesLandlord
} from '../utils';
import { Match } from '../utils/interfaces';
import MatchItem from '../components/MatchItem';
import {
  CollectionReference,
  QuerySnapshot,
  DocumentData
} from '@firebase/firestore-types';

export default class Matches extends Component {
  state = {
    matches: [],
    userType: ''
  };
  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    const uid = await AsyncStorage.getItem('uid');
    const userType = await AsyncStorage.getItem('userType');
    const matches = uid
      ? userType === 'tenants'
        ? await getMatchesByTenant(uid)
        : await getMatchesByLandlord(uid)
      : [];
    this.setState({ matches, userType });
    if (uid) {
      if (userType === 'tenants') {
        liveListenMatchesTenant(uid, (doc: QuerySnapshot) => {
          const matches: DocumentData[] = [];
          doc.forEach(match => matches.push({ ...match.data(), id: match.id }));
          console.log(matches);
          this.setState({ matches });
        });
      } else {
        liveListenMatchesLandlord(uid, (doc: QuerySnapshot) => {
          const matches: DocumentData[] = [];
          doc.forEach(match => matches.push({ ...match.data(), id: match.id }));
          console.log(matches);
          this.setState({ matches });
        });
      }
    }
  }

  render() {
    const { userType, matches } = this.state;
    return (
      <ScrollView style={{ flex: 1 }}>
        <Text>Matches!</Text>
        {matches &&
          matches.map((match: Match) => (
            <MatchItem userType={userType} match={match} key={match.id} />
          ))}
      </ScrollView>
    );
  }
}
