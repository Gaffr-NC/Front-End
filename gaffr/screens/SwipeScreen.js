import React, { Component } from "react";
import { View, Text } from "react-native";

export default class SwipeScreen extends Component {
  static navigationOptions = {
    title: "Swiper"
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Swipe Screen</Text>
      </View>
    );
  }
}
