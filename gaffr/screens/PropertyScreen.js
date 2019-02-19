import React, { Component } from "react";
import { View, Text } from "react-native";

export default class PropertyScreen extends Component {
  static navigationOptions = {
    title: "Properties"
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Properties!</Text>
      </View>
    );
  }
}