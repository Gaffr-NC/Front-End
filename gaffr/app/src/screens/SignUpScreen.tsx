import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import firebase from 'firebase';
import { UserCredential } from '@firebase/auth-types';
import { FirebaseError } from '@firebase/util';
import { addUser } from '../utils';
interface States {
  email: String;
  password: String;
  confirmPassword: String;
  name: String;
  phoneNo: String;
}
interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export default class SignUpScreen extends Component<Props, States> {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phoneNo: ''
  };

  static navigationOptions = {
    title: 'Sign Up'
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Sign up!</Text>
        <TextInput
          style={styles.inputs}
          placeholder="email..."
          value={this.state.email}
          onChangeText={(text: String) => this.setState({ email: text })}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputs}
          placeholder="password..."
          value={this.state.password}
          onChangeText={(text: String) => this.setState({ password: text })}
          autoCapitalize="none"
          secureTextEntry
        />
        <TextInput
          style={styles.inputs}
          placeholder="confirm password..."
          value={this.state.confirmPassword}
          onChangeText={(text: String) =>
            this.setState({ confirmPassword: text })
          }
          autoCapitalize="none"
          secureTextEntry
        />
        <TextInput
          style={styles.inputs}
          placeholder="name..."
          value={this.state.name}
          onChangeText={(text: String) => this.setState({ name: text })}
        />
        <TextInput
          style={styles.inputs}
          placeholder="telephone number..."
          value={this.state.phoneNo}
          onChangeText={(text: String) => this.setState({ phoneNo: text })}
        />
        <Text>{this.props.navigation.getParam('userType', 'ERROR')}</Text>
        <Button title="SUBMIT" onPress={() => this.handleSignUpPress()} />
      </View>
    );
  }

  handleSignUpPress = () => {
    const { email, password, confirmPassword, name, phoneNo } = this.state;
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
    } else if (!name) {
      Alert.alert('Please enter your name');
    } else if (!phoneNo) {
      Alert.alert('Please enter your telephone number');
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user: UserCredential) => {
          const uid: string | null = user.user ? user.user.uid : 'ERRROR';
          const userType: string = this.props.navigation.getParam(
            'userType',
            'ERROR'
          );
          addUser(uid, { name, email, phone: phoneNo }, userType);
          this.props.navigation.navigate(
            userType === 'tenants' ? 'TenantApp' : 'LandApp',
            { uid }
          );
        })
        .catch((err: FirebaseError) => {
          if (err.code === 'auth/weak-password') {
            Alert.alert('Password must be at least 6 characters');
          } else if (err.code === 'auth/email-already-in-use') {
            Alert.alert('Email already in use');
          } else {
            Alert.alert('Invalid email/password');
          }
        });
    }
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
