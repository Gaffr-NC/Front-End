import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import firebase from "firebase";

export default class SignUpScreen extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phoneNo: "",
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
          value={this.state.email}
          onChangeText={text => this.setState({ email: text })}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputs}
          label="password"
          placeholder="password..."
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
          autoCapitalize="none"
          secureTextEntry
        />
        <TextInput
          style={styles.inputs}
          label="confirm password"
          placeholder="confirm password..."
          value={this.state.confirmPassword}
          onChangeText={text => this.setState({ confirmPassword: text })}
          autoCapitalize="none"
          secureTextEntry
        />
        <TextInput
          style={styles.inputs}
          label="name"
          placeholder="name..."
          value={this.state.name}
          onChangeText={text => this.setState({ name: text })}
        />
        <TextInput
          style={styles.inputs}
          label="phoneNo"
          placeholder="telephone number..."
          value={this.state.phoneNo}
          onChangeText={text => this.setState({ phoneNo: text })}
        />
        <Button title="SUBMIT" onPress={this.handleSignUpPress} />
      </View>
    );
  }

  handleSignUpPress = () => {
    const { email, password, confirmPassword, name, phoneNo } = this.state;
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
    } else if (!name) {
      Alert.alert("Please enter your name");
    } else if (!phoneNo) {
      Alert.alert("Please enter your telephone number");
    } else {
      console.log(email, password);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          this.props.navigation.navigate("TenantApp");
          console.log(user, "UUUUSER", "Successful login");
        })
        .catch(err => {
          console.log(err.code);
          if (err.code === "auth/weak-password") {
            Alert.alert("Password must be at least 6 characters");
          } else if (err.code === "auth/email-already-in-use") {
            Alert.alert("Email already in use");
          } else {
            Alert.alert("Invalid email/password");
          }
        });
    }
  };
}

const styles = StyleSheet.create({
  inputs: {
    backgroundColor: "powderblue",
    margin: 10,
    width: "90%",
    padding: 10
  }
});
