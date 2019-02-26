import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  AsyncStorage,
  StyleSheet
} from "react-native";
import { User } from "../utils/interfaces";
import { getUserById } from "../utils";

export default class Profile extends Component {
  state = {
    user: null
  };
  static navigationOptions = {
    title: "Profile"
  };

  async componentDidMount() {
    const uid = await AsyncStorage.getItem("uid");
    const userType = await AsyncStorage.getItem("userType");
    const user = uid && userType ? await getUserById(uid, userType) : undefined;
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    if (user) {
      const thisUser: User = user;
      return (
        <ScrollView>
          <View style={styles.profileContainer}>
            <View style={styles.userContainer}>
              <Text style={{ fontWeight: "bold" }}>Your Profile</Text>
              <Text>Name: {thisUser.name}</Text>
              <Text>Email: {thisUser.email}</Text>
              <Text>Telephone: {thisUser.phone}</Text>
            </View>
            {thisUser.preferences && (
              <View style={styles.tenantProperty}>
                <Text>My prefs...</Text>
                <Text>Bedrooms: {thisUser.preferences.bedrooms}</Text>
                <Text>City: {thisUser.preferences.city}</Text>
              </View>
            )}
            {thisUser.property && (
              <View style={styles.landlordProperty}>
                <Text>Bedrooms: {thisUser.property.bedrooms} </Text>
                <Text>City: {thisUser.property.city} </Text>
                <Text>Price: {`£${thisUser.property.price} per month`} </Text>
                <Text>Bedrooms: {thisUser.property.bedrooms} </Text>
                <Text>Property type: {thisUser.property.propertyType}</Text>

                <Text style={{ fontStyle: "italic" }}>
                  {thisUser.property.petsAllowed
                    ? "Pets allowed"
                    : "Pets not allowed"}
                </Text>
                <Text style={{ fontStyle: "italic" }}>
                  {thisUser.property.smokingAllowed
                    ? "Smoking allowed"
                    : "Smoking not allowed"}
                </Text>
                <View style={styles.imageContainer}>
                  {thisUser.property.images.map(img => (
                    <Image
                      source={{ uri: img }}
                      key={img}
                      style={styles.propertyImages}
                    />
                  ))}
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Loading profile...</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 0,
    color: "#0B4F6C",
    backgroundColor: "#dcd1e8"
  },
  userContainer: {
    alignItems: "center",
    margin: 5,
    width: "90%",
    padding: 5,
    backgroundColor: "#f9f4f5",
    borderRadius: 10
  },
  tenantProperty: {
    alignItems: "center",
    margin: 5,
    width: "90%",
    padding: 5,
    backgroundColor: "#f9f4f5",
    borderRadius: 10
  },
  landlordProperty: {
    alignItems: "center",
    margin: 5,
    width: "90%",
    padding: 5,
    backgroundColor: "#f9f4f5",
    borderRadius: 10
  },
  imageContainer: {
    margin: 10,
    padding: 10
  },
  propertyImages: {
    height: 200,
    width: 200,
    borderRadius: 10,
    padding: 0,
    margin: 5
  }
});
