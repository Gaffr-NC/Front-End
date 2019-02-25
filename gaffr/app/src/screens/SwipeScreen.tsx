import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper';
import { StyleSheet, View, Text, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getUsers } from '../utils/index';

// const bedIcon = parseIconFromClassName('fas fa-bed');

export default class SwipeScreen extends Component {
  state = {
    cards: [],
    swipedAllCards: false,
    swipeDirection: '',
    isSwipingBack: false,
    cardIndex: 0
  };

  componentDidMount = async () => {
    const landlords = await getUsers('landlords');
    this.setState({ cards: landlords.filter(landlord => landlord.property) });
  };

  renderCard = (cardData: any) => {
    return (
      cardData && (
        <View style={styles.card}>
          <Image
            style={styles.image}
            source={{
              uri: cardData.property.images[0]
            }}
          />
          <View style={styles.textBox}>
            <Text style={styles.text}>
              <FontAwesome name="home" size={50} />{' '}
              {this.Capitalize(cardData.property.propertyType)}
            </Text>
            <Text style={styles.text}>
              <FontAwesome name="bed" size={50} /> {cardData.property.bedrooms}
            </Text>
            <Text style={styles.text}>
              <FontAwesome name="gbp" size={50} /> {cardData.property.price}
            </Text>
          </View>
        </View>
      )
    );
  };

  onClickCard = () => {
    console.log('the card has been clicked');
  };

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    });
  };

  Capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  setIsSwipingBack = (isSwipingBack: any, cb: any) => {
    this.setState(
      {
        isSwipingBack: isSwipingBack
      },
      cb
    );
  };

  jumpTo = () => {
    this.swiper.jumpToCardIndex(2);
  };

  render() {
    return (
      <View style={styles.container}>
        <Swiper
          style={styles.swiper}
          ref={(swiper: any) => {
            this.swiper = swiper;
          }}
          stackSize={6}
          verticalSwipe={false}
          cards={this.state.cards}
          cardIndex={this.state.cardIndex}
          cardVerticalMargin={80}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          showSecondCard={true}
          overlayLabels={{
            left: {
              title: 'NOPE',
              backgroundOpacity: '0.75'
            },
            right: {
              title: 'LIKE',
              backgroundOpacity: '0.75'
            }
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
          onTapCard={() => this.onClickCard()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f4f5',
    color: '#f9f4f5'
  },
  textBox: {
    flex: 0.5,
    justifyContent: 'flex-start',
    height: 50,
    alignItems: 'flex-start'
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#dcd1e8'
  },
  text: {
    marginLeft: 20,
    fontSize: 30,
    backgroundColor: 'transparent',
    color: '#000000'
  },
  image: {
    flex: 1
  },
  swiper: {}
});
