import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
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
    const id = '0PMhHlUuq6lCP2N3VC1S';
    const user = await getUserById(id, 'landlords');
    this.setState({ user });
    //fetch user data
  }

  render() {
    const { user } = this.state;
    if (user) {
      const thisUser: User = user;
      return (
        <ScrollView
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text>Profile!</Text>
            <Text>Name: {thisUser.name}</Text>
            <Text>email: {thisUser.email}</Text>
            <Text>Telephone: {thisUser.phone}</Text>
            {thisUser.preferences && (
              <View>
                <Text>My prefs...</Text>
                <Text>Bedrooms: {thisUser.preferences.bedrooms}</Text>
                <Text>City: {thisUser.preferences.city}</Text>
              </View>
            )}
            {thisUser.property && (
              <View>
                <Text>Bedrooms: {thisUser.property.bedrooms} </Text>
                <Text>City: {thisUser.property.city} </Text>
                <Text> Price: {`£${thisUser.property.price} per month`} </Text>
                <Text> Bedrooms: {thisUser.property.bedrooms} </Text>
                <Text> Property type: {thisUser.property.propertyType}</Text>
                <Text>
                  {thisUser.property.petsAllowed
                    ? 'Pets allowed.'
                    : 'Pets not allowed'}{' '}
                </Text>
                <Text>
                  {' '}
                  {thisUser.property.smokingAllowed
                    ? 'Smoking allowed.'
                    : 'Smoking not allowed'}{' '}
                </Text>
                {thisUser.property.images.map(img => (
                  <Image
                    source={{ uri: img }}
                    key={img}
                    style={{ height: 200, width: 200 }}
                  />
                ))}
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
          <Text>Loading profilne</Text>
        </View>
      );
    }
  }
}
