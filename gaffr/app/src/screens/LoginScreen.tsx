import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  AsyncStorage,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback
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
    title: 'Welcome'
  };

  DismissKeyboard = ({ children }: any) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  render() {
    return (
      <this.DismissKeyboard>
        <View style={styles.loginContainer}>
          <View style={styles.headerContainer}>
            <Image
              style={styles.logo}
              source={{ uri: 'https://i.imgur.com/NH0xhhe.png' }}
            />
            <Text style={styles.headerText}>
              It's time to move forward, and it's time to move in...
            </Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.loginForm}
              placeholder="Email Address"
              value={this.state.email}
              onChangeText={(text: String) => this.setState({ email: text })}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.loginForm}
              placeholder="Password"
              value={this.state.password}
              onChangeText={(text: String) => this.setState({ password: text })}
              autoCapitalize="none"
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.loginButton}
              onPress={this.handleLogInPress}
            >
              <Text style={{ alignSelf: 'center', color: '#ffffff' }}>
                LOG IN
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signupContainer}>
            <Text>New user?</Text>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => this.props.navigation.navigate('userType')}
            >
              <Text style={{ alignSelf: 'center', color: '#ffffff' }}>
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </this.DismissKeyboard>
    );
  }

  handleLogInPress = (): void => {
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
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    margin: 0,
    color: '#0B4F6C',
    backgroundColor: '#dcd1e8'
  },
  headerContainer: {
    alignItems: 'center',
    width: '100%',
    margin: 0
  },
  logo: {
    alignItems: 'center',
    height: 150,
    width: 200
  },
  headerText: {
    textAlign: 'center',
    marginBottom: 20,
    alignItems: 'center',
    fontSize: 12,
    padding: 0
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 0,
    margin: 0
  },
  loginForm: {
    margin: 5,
    width: '90%',
    padding: 5,
    backgroundColor: '#f9f4f5',
    borderRadius: 10
  },
  loginButton: {
    backgroundColor: '#502F4C',
    color: '#ffffff',
    margin: 5,
    width: '90%',
    padding: 5,
    borderRadius: 10
  },
  signupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 70,
    margin: 0
  },
  signupButton: {
    backgroundColor: '#502F4C',
    margin: 0,
    marginTop: 10,
    width: '75%',
    padding: 20,
    borderRadius: 10
  }
});
