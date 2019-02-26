import React from 'react';
import { View, Text, ActivityIndicator, AsyncStorage } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export default class Loading extends React.Component<Props> {
  async componentDidMount() {
    const uid = await AsyncStorage.getItem('uid');
    const userType = await AsyncStorage.getItem('userType');
    if (uid && userType) {
      this.props.navigation.navigate(
        userType === 'tenants' ? 'Swiper' : 'Properties'
      );
    } else {
      AsyncStorage.removeItem('userType');
      AsyncStorage.removeItem('uid');
      this.props.navigation.navigate('logIn');
    }
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
