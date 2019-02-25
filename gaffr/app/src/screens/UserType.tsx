import React, { Component } from "react";
import { View, Button } from "react-native";
import { NavigationScreenProp } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}
export default class UserTypeScreen extends Component<Props> {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="I am a tenant"
          onPress={() =>
            this.props.navigation.navigate("signUp", { userType: "tenants" })
          }
        />
        <Button
          title="I am a landlord"
          onPress={() =>
            this.props.navigation.navigate("signUp", { userType: "landlords" })
          }
        />
      </View>
    );
  }
}
