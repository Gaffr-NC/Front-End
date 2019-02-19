import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import firebase from 'react-native-firebase';

export default class Loading extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'TenantApp' : 'Auth')
    })
  }
}