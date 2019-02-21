import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { getUserById } from '../utils';

export default class PropertyScreen extends Component {
  static navigationOptions = {
    title: 'Properties'
  };

  async componentDidMount() {
    // const {uid} = this.props.n
    // const user = await getUserById()
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Property!</Text>
        {/* <Button 
          title="Hello button"
          onPress=
        /> */}
      </View>
    );
  }
}
