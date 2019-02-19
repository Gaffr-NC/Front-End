import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator,
  createSwitchNavigator
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

const AppStack = createMaterialTopTabNavigator(
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
        backgroundColor: "indianred",
        marginTop: 24
      },
      indicatorStyle: {
        backgroundColor: "grey"
      }
    }
  }
);

const AuthStack = createStackNavigator({ logIn: Login });

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack
    },
    { initialRouteName: "Auth" }
  )
);

export default class App extends React.Component {
  state = {
    currentUser: null
  };
  render() {
    return <AppContainer />
  }
}
