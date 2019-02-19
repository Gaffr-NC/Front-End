import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import HomeScreen from "./screens/Home";
import SwipeScreen from "./screens/SwipeScreen";
import Login from "./screens/LoginScreen";
import Matches from "./screens/Matches";
import Profile from "./screens/Profile";
import SignUpScreen from "./screens/SignUpScreen";
import PropertyScreen from "./screens/PropertyScreen";
import Loading from './screens/Loading';

const TenantAppStack = createMaterialTopTabNavigator(
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

const LandAppStack = createMaterialTopTabNavigator(
  {
    Profile: Profile,
    Properties: PropertyScreen,
    Matches: Matches
  },
  {
    initialRouteName: "Properties",
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

const AuthStack = createStackNavigator({ logIn: Login, signUp: SignUpScreen });

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      Auth: AuthStack,
      TenantApp: TenantAppStack,
      LandApp: LandAppStack,
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
