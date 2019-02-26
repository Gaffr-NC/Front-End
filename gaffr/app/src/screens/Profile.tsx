import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  AsyncStorage,
  StyleSheet
} from 'react-native';
import { User } from '../utils/interfaces';
import { getUserById } from '../utils';

export default class Profile extends Component {
  state = {
    user: null
  };
  static navigationOptions = {
    title: 'Profile'
  };

  async componentDidMount() {
    const uid = await AsyncStorage.getItem('uid');
    const userType = await AsyncStorage.getItem('userType');
    const user = uid && userType ? await getUserById(uid, userType) : undefined;
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    if (user) {
      const thisUser: User = user;
      return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={styles.profileContainer}>
            <View style={styles.userContainer}>
              <Text style={{ fontWeight: 'bold' }}>Your Profile</Text>
              <Text>Name: {thisUser.name}</Text>
              <Text>Email: {thisUser.email}</Text>
              <Text>Telephone: {thisUser.phone}</Text>
            </View>
            {thisUser.preferences && (
              <View style={styles.tenantPreferences}>
                <Text>My prefs...</Text>
                <Text>Bedrooms: {thisUser.preferences.bedrooms}</Text>
                <Text>City: {thisUser.preferences.city}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text>Loading profile...</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    margin: 0,
    color: '#0B4F6C',
    backgroundColor: '#dcd1e8'
  },
  userContainer: {
    alignItems: 'center',
    margin: 5,
    width: '90%',
    padding: 5,
    backgroundColor: '#f9f4f5',
    borderRadius: 10
  },
  tenantPreferences: {
    alignItems: 'center',
    margin: 5,
    width: '90%',
    padding: 5,
    backgroundColor: '#f9f4f5',
    borderRadius: 10
  }
});
