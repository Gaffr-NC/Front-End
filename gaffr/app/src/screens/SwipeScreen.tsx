import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper';
import { StyleSheet, View, Text, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getUsers } from '../utils/index';

// const bedIcon = parseIconFromClassName('fas fa-bed');

export default class Example extends Component {
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

  renderCard = cardData => {
    return (
      cardData && (
        <View style={styles.card}>
          <Image
            style={styles.image}
            source={{
              uri: cardData.property.images[0]
            }}
          />
          <View>
            <Text style={styles.text}>
              <FontAwesome name="bed" size={50} />
            </Text>
            <Text style={styles.text}>
              <FontAwesome name="home" size={50} />
            </Text>
            <Text style={styles.text}>
              <FontAwesome name="euro" size={50} />
            </Text>
          </View>
        </View>
      )
    );
  };

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    });
  };

  setIsSwipingBack = (isSwipingBack, cb) => {
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
          ref={swiper => {
            this.swiper = swiper;
          }}
          onSwiped={this.onSwiped}
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
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
  },

  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#0000000',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
    color: '#b3b9bd'
  },
  image: {
    flex: 1
  }
});
