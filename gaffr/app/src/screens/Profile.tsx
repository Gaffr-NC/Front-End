import React, { Component } from "react";
import { View, Text } from "react-native";
import { User } from "../utils/interfaces";

export default class Profile extends Component {
  static navigationOptions = {
    title: "Profile"
  };

  componentDidMount () {
    //fetch user data
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile!</Text>
        {/* <Text>Name: {user.name}</Text>
        <Text>email: {user.email}</Text>
        <Text>Telephone: {user.phone}</Text>
        {user.preferences && (
          <View>
            <Text>My prefs...</Text>
            <Text>Bedrooms: {user.preferences.bedrooms}</Text>
            <Text>City: {user.preferences.city}</Text>
          </View>
        )} */}
      </View>
    );
  }
}
