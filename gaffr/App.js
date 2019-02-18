import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';

export default class App extends Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    return <View style={styles.container}><Text>HELLO</Text></View>
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
