import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

export default class SignUpScreen extends Component {
    state = {
        userInput1: "",
        userInput2: "",
    }

  static navigationOptions = {
    title: "Sign Up"
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Sign up!</Text>
        <TextInput style={styles.inputs} value={this.state.userInput} onChangeText={(text) => this.setState({ userInput1: text})}></TextInput>
        <TextInput style={styles.inputs} value={this.state.userInput} onChangeText={(text) => this.setState({ userInput2: text})}></TextInput>
        <Button
          title="SUBMIT"
          onPress={() => this.props.navigation.navigate("TenantApp")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    inputs: {
       backgroundColor: "grey",
       margin: 10,
       width: 300,
    }
})