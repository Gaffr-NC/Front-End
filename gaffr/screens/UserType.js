import React, { Component } from "react";
import { View, Button, Text } from "react-native";

export default class UserTypeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="I am a tenant" onPress={() => this.props.navigation.navigate("signUp", {userType: "tenant"})}/>
        <Button title="I am a landlord" onPress={() => this.props.navigation.navigate("signUp", {userType: "landlord"})}/>
      </View>
    );
  }
}