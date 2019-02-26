import React, { Component } from "react";
import firebase from "firebase";
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
} from "react-native";
import uuid from "uuid";
import { ImagePicker, Permissions } from "expo";
import { getUserById } from "../utils";
import { NavigationScreenProp } from "react-navigation";
import { updateProperty } from "../utils";
import {
  User,
  Property,
  UserWithProperty,
  UpdatePreferences
} from "../utils/interfaces";
import ImageUploader from "../components/ImageUploader";

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
    image: "abcdef",
    user: undefined,
    bedrooms: 1,
    city: "the moon",
    images: [],
    currentImage: "",
    price: 350,
    propertyType: "house",
    petsAllowed: false,
    smokingAllowed: false
  };

  static navigationOptions = {
    title: "Properties"
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
    const uid = this.props.navigation.getParam("uid", "ERROR");
    updateProperty(uid, property);
    this.setState({ user: { ...user, property } });
  }
  async componentDidMount() {
    const uid = this.props.navigation.getParam("uid", "ERROR");
    const user: User | undefined = await getUserById(uid, "landlords");
    if (user && !user.property) {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      await Permissions.askAsync(Permissions.CAMERA);
    }
    this.setState({ user });
  }

  addImage = (image: string) => {
    const { images } = this.state;
    this.setState({ images: [...images, image] });
  };

  Capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
      <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center" }}>
        <Text>Your property!</Text>
        {userWithProperty.property ? (
          // property profile
          <Text>{`Hello, ${userWithProperty.name}`}</Text>
        ) : (
          // property form
          <View>
            {images &&
              images.map((img: string) => (
                <Image
                  key={img}
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

            <ImageUploader addImage={this.addImage} />
            <Button
              title="get me a house!"
              onPress={() => this.handleHouse(userWithProperty)}
            />
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {image ? null : (
                <Text
                  style={{
                    fontSize: 20,
                    marginBottom: 20,
                    textAlign: "center",
                    marginHorizontal: 15
                  }}
                >
                  Upload ImagePicker result
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
  propertyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 0,
    color: "#0B4F6C",
    backgroundColor: "#dcd1e8"
  },
  inputs: {
    margin: 5,
    width: "90%",
    padding: 5,
    backgroundColor: "#f9f4f5",
    borderRadius: 10
  }
});
