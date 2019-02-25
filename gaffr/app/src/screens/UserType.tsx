import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { NavigationScreenProp } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}
export default class UserTypeScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.buttonContainer}>
        <Text>Which type of profile would you like?</Text>
        <TouchableOpacity
          style={styles.tenantButton}
          onPress={() =>
            this.props.navigation.navigate("signUp", { userType: "tenants" })
          }
        >
          <Text>TENANT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.landlordButton}
          onPress={() =>
            this.props.navigation.navigate("signUp", { userType: "landlords" })
          }
        >
          <Text>LANDLORD</Text>
        </TouchableOpacity>
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 0,
    color: "#0B4F6C",
    backgroundColor: "#dcd1e8"
  },
  tenantButton: {
    backgroundColor: "#502F4C",
    color: "#ffffff",
    margin: 5,
    width: "90%",
    padding: 5,
    borderRadius: 10
  },
  landlordButton: {
    backgroundColor: "#502F4C",
    color: "#ffffff",
    margin: 5,
    width: "90%",
    padding: 5,
    borderRadius: 10
  }
});
