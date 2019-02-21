import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Picker,
  Alert,
  StyleSheet
} from 'react-native';
import { getUserById } from '../utils';
import { NavigationScreenProp } from 'react-navigation';
import { updateProperty } from '../utils';
import {
  User,
  Property,
  UserWithProperty,
  UpdatePreferences
} from '../utils/interfaces';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface States {
  user: User | undefined;
  bedrooms: number;
  city: string;
  images: string[];
  currentImage: string;
  price: number;
  propertyType: string;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  [key: string]: any;
}

export default class PropertyScreen extends Component<Props, States> {
  public state = {
    user: undefined,
    bedrooms: 1,
    city: 'the moon',
    images: ['http://example.com/img.jpg'],
    currentImage: '',
    price: 350,
    propertyType: 'house',
    petsAllowed: false,
    smokingAllowed: false
  };

  static navigationOptions = {
    title: 'Properties'
  };
  async handleHouse(user: UserWithProperty) {
    const {
      bedrooms,
      city,
      images,
      currentImage,
      price,
      propertyType,
      petsAllowed,
      smokingAllowed
    } = this.state;
    const array = Object.entries({
      city,
      images,
      price,
      currentImage
    });
    array.forEach(
      property => !property[1] && Alert.alert(`Invalid ${property[0]}`)
    );
    const property: Property = {
      bedrooms,
      city,
      images,
      price,
      propertyType,
      petsAllowed,
      smokingAllowed
    };
    const uid = this.props.navigation.getParam('uid', 'ERROR');
    updateProperty(uid, property);
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
    const {
      bedrooms,
      city,
      smokingAllowed,
      petsAllowed,
      price,
      propertyType,
      currentImage
    } = this.state;
    const userWithProperty: UserWithProperty = user;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Property!</Text>
        {userWithProperty.property ? (
          // property profile
          <Text>Hello mr landlord you've got a house</Text>
        ) : (
          // property form
          <View>
            <TextInput
              placeholder="price..."
              style={styles.inputs}
              value={String(price)}
              onChangeText={(text: string) =>
                this.setState({ price: parseInt(text) ? parseInt(text) : 0 })
              }
            />
            <TextInput
              placeholder="bedrooms..."
              style={styles.inputs}
              value={String(bedrooms)}
              onChangeText={(text: string) =>
                this.setState({ bedrooms: parseInt(text) ? parseInt(text) : 0 })
              }
            />
            <TextInput
              placeholder="city"
              style={styles.inputs}
              value={city}
              onChangeText={(text: string) => this.setState({ city: text })}
            />
            <TextInput
              placeholder="property type"
              style={styles.inputs}
              value={propertyType}
              onChangeText={(text: string) =>
                this.setState({ propertyType: text })
              }
            />
            <TextInput
              placeholder="image url"
              style={styles.inputs}
              value={currentImage}
              onChangeText={(text: string) =>
                this.setState({ currentImage: text })
              }
            />
            <Text>Smoking allowed: </Text>
            <Picker
              selectedValue={smokingAllowed}
              onValueChange={(value: boolean) =>
                this.setState({ smokingAllowed: value })
              }
              itemStyle={{ height: 44 }}
            >
              <Picker.Item value={true} label="yes" />
              <Picker.Item value={false} label="no" />
            </Picker>
            <Text>Pets allowed: </Text>
            <Picker
              itemStyle={{ height: 44 }}
              selectedValue={petsAllowed}
              onValueChange={(value: boolean) =>
                this.setState({ petsAllowed: value })
              }
            >
              <Picker.Item value={true} label="yes" />
              <Picker.Item value={false} label="no" />
            </Picker>

            <Button
              title="get me a house!"
              onPress={() => this.handleHouse(userWithProperty)}
            />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputs: {
    backgroundColor: 'powderblue',
    margin: 10,
    width: 150,
    padding: 10
  }
});
