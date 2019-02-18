import React from "react";
import { View } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";
import HomeScreen from "./screens/Home";
import SwipeScreen from "./screens/SwipeScreen";
import Login from "./screens/Login";

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

const AppNavigator = createMaterialTopTabNavigator({
  Home: HomeScreen,
  Swiper: SwipeScreen,
  Login: Login
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
        <AppContainer />
    );
  }
}
