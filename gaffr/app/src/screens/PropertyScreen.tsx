import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { getUserById } from '../utils';
import { NavigationScreenProp } from 'react-navigation';
import { User, Property, UserWithProperty } from '../utils/interfaces';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface States {
  user: User | undefined;
}

export default class PropertyScreen extends Component<Props, States> {
  public state = {
    user: undefined as undefined
  };

  static navigationOptions = {
    title: 'Properties'
  };
  async handleHouse(user: UserWithProperty) {
    const property: Property = {
      bedrooms: 2,
      city: 'string',
      images: ['string[]', 'ghouagr'],
      price: 2,
      propertyType: 'string',
      petsAllowed: true,
      smokingAllowed: true
    };
    this.setState({ user: { ...user, property } });
  }
  async componentDidMount() {
    const uid = this.props.navigation.getParam('uid', 'ERROR');
    console.log('this is the uid mate', uid);
    const user: User | undefined = await getUserById(uid, 'landlords');
    this.setState({ user });
  }

  render() {
    const user = this.state.user;
    if (!user) return <Text>Loading...</Text>;

    const userWithProperty: UserWithProperty = user;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Property!</Text>
        {userWithProperty.property ? (
          // property profile
          <Text>Hello mr landlord you've got a house</Text>
        ) : (
          // property form
          <Button
            title="get me a house!"
            onPress={() => this.handleHouse(userWithProperty)}
          />
        )}
      </View>
    );
  }
}
