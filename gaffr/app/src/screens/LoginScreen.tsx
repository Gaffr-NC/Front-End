import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { UserCredential } from "@firebase/auth-types";
import { getUserById } from "../utils";
import firebase, { FirebaseError } from "firebase";
import { DocumentData } from "@firebase/firestore-types";

interface States {
  email: String;
  password: String;
}

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export default class Login extends Component<Props, States> {
  public state = {
    email: "",
    password: ""
  };

  static navigationOptions = {
    title: "Welcome"
  };

  render() {
    return (
      <View style={styles.loginContainer}>
        <View style={styles.headerContainer}>
          <Text>LOGO SHOULD BE HERE!!!</Text>
          <Text>It's time to move forward, and it's time to move in.</Text>
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
            <Text>LOG IN</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
          <Text>New user?</Text>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => this.props.navigation.navigate("userType")}
          >
            <Text>SIGN UP</Text>
          </TouchableOpacity>
        </View>
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
            "tenants"
          );
          if (tenant) {
            await AsyncStorage.setItem("uid", uid);
            await AsyncStorage.setItem("userType", "tenants");
            navigate("TenantApp", { uid });
          } else {
            const landlord: DocumentData | undefined = await getUserById(
              uid,
              "landlords"
            );
            console.log(uid);
            if (landlord) {
              await AsyncStorage.setItem("uid", uid);
              await AsyncStorage.setItem("userType", "landlords");
              navigate("Properties", { uid });
            }
          }
        }
      })
      .catch((err: FirebaseError) => {
        Alert.alert("Invalid email/password");
      });
  };
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    margin: 0,
    color: "#0B4F6C",
    backgroundColor: "#FBFBFF"
  },
  headerContainer: {
    padding: 0,
    margin: 0,
    fontSize: 40
  },
  formContainer: {
    padding: 0,
    margin: 0
  },
  loginForm: {
    margin: 10,
    width: "90%",
    padding: 10,
    backgroundColor: "#757575"
  },
  loginButton: {
    backgroundColor: "#20BF55",
    margin: 0,
    width: "4clear0%",
    padding: 10,
    borderRadius: 10
  },
  signupContainer: {
    padding: 30,
    margin: 0
  },
  signupButton: {
    backgroundColor: "#20BF55",
    margin: 0,
    width: "40%",
    padding: 10,
    borderRadius: 10
  }
});
