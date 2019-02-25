import React, { Component } from 'react';
import { Text, View, Dimensions, Button, Image } from 'react-native';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');

export default class PropertyProfile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Swiper style={styles.wrapper} height={200} horizontal={true}>
          {this.props.navigation.state.params.images.map(image => (
            <View style={styles.image}>
              <Image
                source={{ uri: image }}
                resizeMode="stretch"
                style={styles.image}
              />
            </View>
          ))}
        </Swiper>

        <Swiper
          style={styles.wrapper}
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
          <View>
            <Text>Description:</Text>
            <Text>Area: </Text>
            <Text>Bedrooms: </Text>
            <Text>Price: </Text>
            <Text>Pest Allowed: </Text>
            <Text>Smoking Allowed: </Text>
          </View>
        </Swiper>
        <Button
          onPress={() =>
            console.log(this.props.navigation.state.params.images[0])
          }
          title="press"
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  image: {
    width,
    flex: 1
  }
};
