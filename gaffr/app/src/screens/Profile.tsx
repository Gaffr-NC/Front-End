import React, { Component } from "react";
import { View, Text } from "react-native";
import { User } from "../utils/interfaces";

export default class Profile extends Component {
  static navigationOptions = {
    title: "Profile"
  };

  render() {
    const user: User = {
      email: "landlord@aol.com",
      name: "Ya Boi Chungus",
      phone: "0754369543845",
      property: {
        bedrooms: 1,
        city: "manchester",
        images: ["hi"],
        propertyType: "gay",
        petsAllowed: true,
        smokingAllowed: false,
        price: 1
      },
      preferences: {
        bedrooms: 1,
        city: "manchester",
        propertyType: "gay",
        petsAllowed: true,
        smokingAllowed: false,
        maxPrice: 1,
        minPrice: 0
      }
    };
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile!</Text>
        <Text>Name: {user.name}</Text>
        <Text>email: {user.email}</Text>
        <Text>Telephone: {user.phone}</Text>
        {user.preferences && (
          <View>
            <Text>My prefs...</Text>
            <Text>Bedrooms: {user.preferences.bedrooms}</Text>
            <Text>City: {user.preferences.city}</Text>
          </View>
        )}
      </View>
    );
  }
}
