import React, { Component } from 'react';
import firebase from 'firebase';
import {
  View,
  Text,
  Button,
  TextInput,
  Picker,
  Alert,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView
} from 'react-native';
import uuid from 'uuid';
import { ImagePicker, Permissions } from 'expo';
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
  image?: string;
  uploading?: boolean;
  user: User | undefined;
  bedrooms: number;
  city: string;
  images: string[];
  currentImage: string;
  price: number;
  propertyType: string;
  petsAllowed: boolean;
  smokingAllowed: boolean;
}

export default class PropertyScreen extends Component<Props, States> {
  public state = {
    image: 'abcdef',
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
      price,
      propertyType,
      petsAllowed,
      smokingAllowed
    } = this.state;
    const array = Object.entries({
      city,
      images,
      price
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
    if (user && !user.property) {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      await Permissions.askAsync(Permissions.CAMERA);
    }
    this.setState({ user });
  }

  _takePhoto = async () => {
    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async (pickerResult: ImagePicker.ImageResult) => {
    try {
      this.setState({ uploading: true });
      if (!pickerResult.cancelled) {
        const uploadUrl = await this.uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };

  uploadImageAsync = async (uri: string) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob: any = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref()
      .child(uuid.v4());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    const url = await snapshot.ref.getDownloadURL();
    const { images } = this.state;
    this.setState({ images: [...images, url] });
    console.log(url);
    //TODO send url to database / registration state
    // !
    // ?
    // *

    return url;
  };

  render() {
    const user = this.state.user;
    if (!user) return <Text>Loading...</Text>;
    const {
      image,
      images,
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
      <ScrollView style={{ flex: 1 }}>
        <Text>Property!</Text>
        {userWithProperty.property ? (
          // property profile
          <Text>Hello mr landlord you've got a house</Text>
        ) : (
          // property form
          <View>
            {images &&
              images.map((img: string) => (
                <Image
                  source={{ uri: img }}
                  style={{ height: 50, width: 50 }}
                />
              ))}
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
              onPress={this._pickImage}
              title="Pick an image from camera roll"
            />

            <Button onPress={this._takePhoto} title="Take a photo" />
            <Button
              title="get me a house!"
              onPress={() => this.handleHouse(userWithProperty)}
            />
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {image ? null : (
                <Text
                  style={{
                    fontSize: 20,
                    marginBottom: 20,
                    textAlign: 'center',
                    marginHorizontal: 15
                  }}
                >
                  Example: Upload ImagePicker result
                </Text>
              )}

              <StatusBar barStyle="default" />
            </View>
          </View>
        )}
      </ScrollView>
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
