import React, { Component } from 'react';
import { Text, View, Dimensions, Image, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons
} from '@expo/vector-icons';

export default class PropertyProfile extends Component {
  Capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  render() {
    return (
      <View style={styles.container}>
        <Swiper style={styles.wrapper} height={200} horizontal={true}>
          {this.props.navigation.state.params.images.map(image => (
            <View style={styles.image}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          ))}
        </Swiper>

        <Swiper
          height={240}
          onMomentumScrollEnd={(e, state, context) =>
            console.log('index:', state.index)
          }
          dot={
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,.2)',
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
                backgroundColor: '#000',
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
            left: null,
            right: 10
          }}
          loop
        >
          <ScrollView>
            <Text style={styles.price}>
              £{this.props.navigation.state.params.price}/month
            </Text>
            <Text style={styles.city}>
              {this.Capitalize(this.props.navigation.state.params.area)}
            </Text>
            <Divider />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.description}>
                {this.props.navigation.state.params.description}
              </Text>
            </View>
            <Text style={styles.textStyle}>
              <Ionicons name="ios-home" size={40} /> Property type:{' '}
              {this.props.navigation.state.params.propertyType}
            </Text>
            <Text style={styles.textStyle}>
              <FontAwesome name="bed" size={30} /> Bedrooms:{' '}
              {this.props.navigation.state.params.bedrooms}
            </Text>
            <Text style={styles.textStyle}>
              {' '}
              <MaterialCommunityIcons name="dog-side" size={40} />
              Pets Allowed:{' '}
              {this.props.navigation.state.params.petsAllowed.toString()}
            </Text>
            <Text style={styles.textStyle}>
              <MaterialIcons name="smoking-rooms" size={40} /> Smoking Allowed:{' '}
              {this.props.navigation.state.params.smokingAllowed.toString()}
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
    fontSize: 50
  },
  city: {
    marginLeft: 20,
    fontSize: 30
  },
  description: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
  },
  container: {
    flex: 1
  },

  image: {
    width,
    flex: 1
  },
  textStyle: {
    marginLeft: 25,
    fontSize: 15
  }
};
