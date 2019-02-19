import React from "react";
import { View, Platform, StatusBar, StyleSheet } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";
import HomeScreen from "./screens/Home";
import SwipeScreen from "./screens/SwipeScreen";
import Login from "./screens/Login";
import Matches from "./screens/Matches";
import Profile from "./screens/Profile";

// const AppNavigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Swiper: SwipeScreen,
//     Login: Login
//   },
//   {
//     initialRouteName: "Login",
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: "indianred"
//       },
//       headerTintColor: "#fff",
//       headerTitleStyle: {
//         fontWeight: "bold"
//       }
//     }
//   }
// );

const AppNavigator = createMaterialTopTabNavigator(
  {
    Profile: Profile,
    Swiper: SwipeScreen,
    Matches: Matches
  },
  {
    initialRouteName: "Swiper",
    tabBarOptions: {
      activeTintColor: "#fff",
      inactiveTintColor: "#fff",
      style: {
        backgroundColor: "indianred"
      },
      indicatorStyle: {
        backgroundColor: "grey"
      }
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: { paddingTop: StatusBar.currentHeight }
});
