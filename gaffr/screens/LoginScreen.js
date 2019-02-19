import React, { Component } from "react";
import { View, Text, Button } from "react-native";

export default class Login extends Component {
  static navigationOptions = {
    title: "Log-In"
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Log in or sign up!</Text>
        <Button
          title="LOGIN (tenant)"
          onPress={() => this.props.navigation.navigate("TenantApp")}
        />
        <Button
          title="LOGIN (landlord)"
          onPress={() => this.props.navigation.navigate("LandApp")}
        />
        <Button
          title="SIGN UP"
          onPress={() => this.props.navigation.navigate("signUp")}
        />
      </View>
    );
  }

  logIn = () => {
    console.log(this.props)
    this.props.navigation.navigate("TenantApp")
  }
}
