import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage,
  ScrollView,
  RefreshControl
} from 'react-native';
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
import { FontAwesome } from '@expo/vector-icons';

export default class Matches extends Component {
  state = {
    matches: [],
    userType: ''
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
          doc.forEach(match => {
            if (!match.data().blocked) {
              matches.push({ ...match.data(), id: match.id });
            }
          });
          this.setState({ matches });
        });
      } else {
        liveListenMatchesLandlord(uid, (doc: QuerySnapshot) => {
          const matches: DocumentData[] = [];
          doc.forEach(match => {
            if (!match.data().blocked) {
              matches.push({ ...match.data(), id: match.id });
            }
            this.setState({ matches });
          });
        });
      }
    }
  }
  static navigationOptions = {
    title: 'Your Matches'
  };
  render() {
    const { userType, matches } = this.state;
    return matches.length ? (
      <ScrollView style={{ flex: 1, backgroundColor: '#dcd1e8' }}>
        <View>
          {matches.map((match: Match) => (
            <MatchItem userType={userType} match={match} key={match.id} />
          ))}
        </View>
      </ScrollView>
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#dcd1e8'
        }}
      >
        <Text style={{ textAlign: 'center' }}>You have no matches yet!</Text>
      </View>
    );
  }
}
