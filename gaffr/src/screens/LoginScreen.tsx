import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import firebase from 'firebase';

interface States {
  email: String;
  password: String;
}

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export default class Login extends Component<Props, States> {
  public state = {
    email: '',
    password: ''
  };

  static navigationOptions = {
    title: 'Log-In'
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Log in or sign up!</Text>
        <TextInput
          style={styles.inputs}
          placeholder="email..."
          value={this.state.email}
          onChangeText={text => this.setState({ email: text })}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputs}
          placeholder="password..."
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
          autoCapitalize="none"
          secureTextEntry
        />
        <Button title="LOG IN" onPress={this.handleLogInPress} />
        <Button
          title="SIGN UP"
          onPress={() => this.props.navigation.navigate('userType')}
        />
      </View>
    );
  }

  logIn = () => {
    console.log(this.props);
    this.props.navigation.navigate('TenantApp');
  };

  handleLogInPress = () => {
    console.log('PRESSED LOG IN');
    const { email, password } = this.state;
    console.log(email, password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user: any) => {
        this.props.navigation.navigate('TenantApp');
        console.log(user, 'UUUUSER');
      })
      .catch((err: any) => {
        console.log(err);
        Alert.alert('Invalid email/password');
      });
  };
}

const styles = StyleSheet.create({
  inputs: {
    backgroundColor: 'powderblue',
    margin: 10,
    width: '90%',
    padding: 10
  }
});
