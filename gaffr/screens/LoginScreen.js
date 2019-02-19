import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import firebase from 'firebase';

// const config = {
//   apiKey: "AIzaSyAT17FgnbY-cnJ9FZXLgF05LWxwJKbNQ-s",
//   authDomain: "gaffr-fa935.firebaseapp.com",
//   databaseURL: "https://gaffr-fa935.firebaseio.com",
//   projectId: "gaffr-fa935",
//   storageBucket: "gaffr-fa935.appspot.com",
//   messagingSenderId: "446143175338"
// };
// firebase.initializeApp(config);

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
