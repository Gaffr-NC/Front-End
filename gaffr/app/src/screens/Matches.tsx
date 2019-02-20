import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Matches extends Component {
  static navigationOptions = {
    title: 'Matches'
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Matches!</Text>
      </View>
    );
  }
}
