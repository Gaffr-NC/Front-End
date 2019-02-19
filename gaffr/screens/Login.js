import React, { Component } from "react";
import { View, Text, Button } from "react-native";

export default class Login extends Component {
  static navigationOptions = {
    title: "Log-In"
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Please log in!</Text>
        <Button
          title="LOGIN"
          onPress={this.logIn}
        />
      </View>
    );
  }

  logIn = () => {
    console.log(this.props)
    this.props.navigation.navigate("App")
  }
}
