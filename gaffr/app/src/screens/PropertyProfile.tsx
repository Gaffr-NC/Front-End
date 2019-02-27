import React, { Component } from "react";
import { Text, View, Dimensions, Image, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import Swiper from "react-native-swiper";
const { width } = Dimensions.get("window");
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons
} from "@expo/vector-icons";
import { capitalise } from "../utils";
import { NavigationScreenProp } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export default class PropertyProfile extends Component<Props> {
  Capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  ConvertPets = (str: string) => {
    if (str === "false") {
      return "Pets not allowed";
    } else {
      return "Pets allowed";
    }
  };

  ConvertSmoking = (str: string) => {
    if (str === "false") {
      return "No smoking";
    } else {
      return "Smoking allowed";
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Swiper style={styles.wrapper} height={200} horizontal={true}>
          {this.props.navigation.state.params.images.map((image: string) => (
            <View key={image} style={styles.image}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          ))}
        </Swiper>

        <Swiper
          height={240}
          dot={
            <View
              style={{
                backgroundColor: "rgba(0,0,0,.2)",
                width: 5,
                height: 5,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: "#000",
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3
              }}
            />
          }
          paginationStyle={{
            bottom: -23,
            right: 10
          }}
          loop
        >
          <ScrollView style={styles.view}>
            <Text style={styles.price}>
              £{this.props.navigation.state.params.price}/month
            </Text>
            <Text style={styles.city}>
              {capitalise(this.props.navigation.state.params.area)}
            </Text>
            <Divider />
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={styles.description}>
                {this.props.navigation.state.params.description}
              </Text>
            </View>
            <Text style={styles.textStyle}>
              <Ionicons name="ios-home" size={40} />{" "}
              {this.Capitalize(this.props.navigation.state.params.propertyType)}
            </Text>
            <Text style={styles.textStyle}>
              <FontAwesome name="bed" size={30} />{" "}
              {this.props.navigation.state.params.bedrooms}
            </Text>
            <Text style={styles.dog}>
              {" "}
              <MaterialCommunityIcons name="dog-side" size={40} />
              {this.ConvertPets(
                this.props.navigation.state.params.petsAllowed.toString()
              )}
            </Text>
            <Text style={styles.smoking}>
              <MaterialIcons name="smoking-rooms" size={40} />
              {this.ConvertSmoking(
                this.props.navigation.state.params.smokingAllowed.toString()
              )}
            </Text>
          </ScrollView>
        </Swiper>
      </View>
    );
  }
}

const styles = {
  price: {
    marginLeft: 20,
    fontSize: 40
  },
  city: {
    marginLeft: 20,
    fontSize: 30
  },
  description: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold" as "bold"
  },
  container: {
    flex: 1
  },
  view: {
    backgroundColor: "#f9f4f5"
  },
  dog: {
    marginLeft: 17,
    fontSize: 20
  },
  smoking: {
    marginLeft: 22,

    fontSize: 20
  },
  image: {
    width,
    flex: 1
  },
  textStyle: {
    marginLeft: 25,
    fontSize: 20
  },
  wrapper: {}
};
