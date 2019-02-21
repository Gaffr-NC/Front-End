import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Constants } from 'expo';

export default class Exemple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: ['1', '2', '3', '4', '5', '6'],
      swipedAllCards: false,
      swipeDirection: '',
      isSwipingBack: false,
      cardIndex: 0
    };
  }

  renderCard = () => {
    return (
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{
            uri:
              'https://images.unsplash.com/photo-1529408632839-a54952c491e5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjU3MDIwfQ'
          }}
        />
        <View>
          <Text style={styles.text}>property type</Text>
          <Text style={styles.text}>bedrooms</Text>
          <Text style={styles.text}>price</Text>
        </View>
      </View>
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
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ffffff'
    // flex: 1
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
