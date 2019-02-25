import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper';
import { StyleSheet, View, Text, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getUsers } from '../utils/index';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export default class SwipeScreen extends Component<Props> {
  state = {
    cards: [],
    swipedAllCards: false,
    swipeDirection: '',
    isSwipingBack: false,
    cardIndex: 0
  };

  static navigationOptions: {
    header: { visible: false };
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

  onClickCard = (cardIndex: number) => {
    const card = this.state.cards[cardIndex];
    this.props.navigation.navigate('PropertyProfile', {
      images: card.property.images,
      area: card.property.city,
      price: card.property.price,
      propertyType: card.property.propertyType,
      description: card.property.description,
      bedrooms: card.property.bedrooms,
      smokingAllowed: card.property.smokingAllowed,
      petsAllowed: card.property.petsAllowed
    });
  };

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    });
  };

  Capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  render() {
    return (
      <View style={styles.container}>
        <Swiper
          style={styles.swiper}
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
          onTapCard={(cardIndex: number) => this.onClickCard(cardIndex)}
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
