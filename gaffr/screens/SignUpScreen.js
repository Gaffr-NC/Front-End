import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import firebase from "firebase";
import config from '../config';

firebase.initializeApp(config);

export default class SignUpScreen extends Component {
  state = {
    email: "",
    password: ""
  };

  static navigationOptions = {
    title: "Sign Up"
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Sign up!</Text>
        <TextInput
          style={styles.inputs}
          label="email"
          placeholder="email..."
          value={this.state.userInput}
          onChangeText={text => this.setState({ email: text })}
        />
        <TextInput
          style={styles.inputs}
          label="password"
          placeholder="password..."
          value={this.state.userInput}
          onChangeText={text => this.setState({ password: text })}
        />
        <Button title="SUBMIT" onPress={this.handleSignUpPress} />
      </View>
    );
  }

  handleSignUpPress = () => {
    const { email, password } = this.state;
    console.log(email, password);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.props.navigation.navigate("TenantApp")
        console.log(user, "UUUUSER");
      })
      .catch(err => console.log(err));
  };
}

const styles = StyleSheet.create({
  inputs: {
    backgroundColor: "grey",
    margin: 10,
    width: 300
  }
});
