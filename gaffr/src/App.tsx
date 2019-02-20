import * as React from 'react';
import * as firebase from 'firebase';
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
import SignUpScreen from './screens/SignUpScreen';
import PropertyScreen from './screens/PropertyScreen';
import Loading from './screens/Loading';
import config from './config';
import UserType from './screens/UserType';

firebase.initializeApp(config);

interface User {
  id: String;
  name: String;
  email: String;
  phone: String;
}
interface States {
  currentUser: User | null;
}

const TenantAppStack = createMaterialTopTabNavigator(
  {
    Profile: Profile,
    Swiper: SwipeScreen,
    Matches: Matches
  },
  {
    initialRouteName: 'Swiper',
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#fff',
      style: {
        backgroundColor: 'indianred',
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
    Matches: Matches
  },
  {
    initialRouteName: 'Properties',
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#fff',
      style: {
        backgroundColor: 'indianred',
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

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      Auth: AuthStack,
      TenantApp: TenantAppStack,
      LandApp: LandAppStack
    },
    { initialRouteName: 'Auth' }
  )
);

export default class App extends React.Component<States> {
  public state = {
    currentUser: null
  };
  render() {
    return <AppContainer />;
  }
}
