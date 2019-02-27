import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  AsyncStorage,
  Image,
  StyleSheet
} from 'react-native';
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
      <View style={styles.loadingContainer}>
        <Image
          style={styles.logo}
          source={{ uri: 'https://i.imgur.com/NH0xhhe.png' }}
        />
        <Text style={styles.headerText}>
          It's time to move forward, and it's time to move in...
        </Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: '#dcd1e8',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  logo: {
    alignItems: 'center',
    height: 150,
    width: 200
  },
  headerText: {
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 18,
    padding: 0
  }
});
