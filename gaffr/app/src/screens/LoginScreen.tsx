import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  AsyncStorage
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { UserCredential } from '@firebase/auth-types';
import { getUserById } from '../utils';
import firebase, { FirebaseError } from 'firebase';
import { DocumentData } from '@firebase/firestore-types';

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
        <Button title="LOG IN" onPress={this.handleLogInPress} />
        <Button
          title="SIGN UP"
          onPress={() => this.props.navigation.navigate('userType')}
        />
      </View>
    );
  }

  handleLogInPress = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (user: UserCredential) => {
        if (user.user) {
          const { uid } = user.user;
          const { navigate } = this.props.navigation;
          const tenant: DocumentData | undefined = await getUserById(
            uid,
            'tenants'
          );
          if (tenant) {
            await AsyncStorage.setItem('uid', uid);
            await AsyncStorage.setItem('userType', 'tenants');
            navigate('TenantApp', { uid });
          } else {
            const landlord: DocumentData | undefined = await getUserById(
              uid,
              'landlords'
            );
            if (landlord) {
              await AsyncStorage.setItem('uid', uid);
              await AsyncStorage.setItem('userType', 'landlords');
              navigate('Properties', { uid });
            }
          }
        }
      })
      .catch((err: FirebaseError) => {
        Alert.alert('Invalid email/password');
      });
  };
}

const styles = StyleSheet.create({
  inputs: {
    backgroundColor: 'white',
    margin: 10,
    width: '90%',
    padding: 10
  }
});
