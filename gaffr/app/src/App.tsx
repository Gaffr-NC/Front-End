import * as React from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator,
  createSwitchNavigator
} from 'react-navigation';

import SwipeScreen from './screens/SwipeScreen';
import Login from './screens/LoginScreen';
import Matches from './screens/Matches';
import Profile from './screens/Profile';
import PropertyScreen from './screens/PropertyScreen';
import Loading from './screens/Loading';

import UserType from './screens/UserType';

import SignUpScreen from './screens/SignUpScreen';
import Chat from './screens/Chat';

interface User {
  id: String;
  name: String;
  email: String;
  phone: String;
}
interface States {
  currentUser: User | null;
}

const MatchStack = createStackNavigator(
  {
    Matches: Matches,
    Chat: Chat
  },
  {
    initialRouteName: 'Matches'
  }
);

const TenantAppStack = createMaterialTopTabNavigator(
  {
    Profile: Profile,
    Swiper: SwipeScreen,
    Matches: MatchStack
  },
  {
    initialRouteName: 'Swiper',
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#fff',
      style: {
        backgroundColor: '#502f4c',
        marginTop: 24
      },
      indicatorStyle: {
        backgroundColor: 'grey'
      }
    }
  }
);

const LandAppStack = createMaterialTopTabNavigator(
  {
    Profile: Profile,
    Properties: PropertyScreen,
    Matches: MatchStack
  },
  {
    initialRouteName: 'Properties',
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#fff',
      style: {
        backgroundColor: '#502f4c',
        marginTop: 24
      },
      indicatorStyle: {
        backgroundColor: 'grey'
      }
    }
  }
);

const AuthStack = createStackNavigator({
  logIn: Login,
  signUp: SignUpScreen,
  userType: UserType
});
const SwitchNav = createSwitchNavigator(
  {
    Loading: Loading,
    Auth: AuthStack,
    TenantApp: {
      screen: TenantAppStack
    },
    LandApp: LandAppStack
  },
  { initialRouteName: 'Auth' }
);

const AppContainer = createAppContainer(SwitchNav);

export default class App extends React.Component<States> {
  public state = {
    currentUser: null
  };

  render() {
    return <AppContainer />;
  }
}
