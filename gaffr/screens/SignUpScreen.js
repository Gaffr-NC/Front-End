import React, { Component } from "react";
import { View, Text } from "react-native";

export default class SignUpScreen extends Component {
  static navigationOptions = {
    title: "Sign Up"
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Sign up!</Text>
      </View>
    );
  }
}