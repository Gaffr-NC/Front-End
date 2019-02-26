import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper';
import { StyleSheet, View, Text, Image, AsyncStorage } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getUsers, addMatch, liveListenMatchesTenant } from '../utils/index';
import { NavigationScreenProp } from 'react-navigation';
import { User, Match, Property } from '../utils/interfaces';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export default class SwipeScreen extends Component<Props> {
  state = {
    uid: '',
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
    const uid = await AsyncStorage.getItem('uid');
    this.setState({ uid });
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
    const card: User = this.state.cards[cardIndex];
    const { property } = card;
    if (property) {
      this.props.navigation.navigate('PropertyProfile', {
        images: property.images,
        area: property.city,
        price: property.price,
        propertyType: property.propertyType,
        description: property.description,
        bedrooms: property.bedrooms,
        smokingAllowed: property.smokingAllowed,
        petsAllowed: property.petsAllowed
      });
    }
  };

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    });
  };
  onSwipeRight = async (cardIndex: number) => {
    const { uid, cards } = this.state;

    const card: User = cards[cardIndex];
    if (card.id && uid) {
      addMatch(card.id, uid);
    }
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
          onSwipedRight={this.onSwipeRight}
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
    color: '#f9f4f5',
    borderRadius: 10
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
