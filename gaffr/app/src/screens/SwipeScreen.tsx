import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper';
import {
  StyleSheet,
  View,
  Text,
  Image,
  AsyncStorage,
  RefreshControl,
  ScrollView
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {
  getUsers,
  addMatch,
  getUserById,
  getSuitableLandlords,
  capitalise
} from '../utils/index';
import { NavigationScreenProp } from 'react-navigation';
import { User } from '../utils/interfaces';

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
    cardIndex: 0,
    refreshing: false
  };

  static navigationOptions: {
    // header: { visible: false };
    headerVisible: false;
    header: null;
  };

  componentDidMount = async () => {
    const uid = await AsyncStorage.getItem('uid');
    await this.setState({ uid });
    this.fetchData();
  };
  fetchData = async () => {
    const { uid } = this.state;
    if (uid) {
      const user = await getUserById(uid, 'tenants');
      const landlords = user.preferences
        ? await getSuitableLandlords(user.preferences, uid)
        : await getUsers('landlords');
      this.setState({
        uid,
        cards: landlords.filter((landlord: User) => landlord.property),
        cardIndex: 0,
        swipedAllCards: false
      });
    }
  };

  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.fetchData().then(() => {
      this.setState({ refreshing: false });
    });
  };

  renderCard = (cardData: any) => {
    return (
      cardData && (
        <View style={styles.swiperContainer}>
          <View style={styles.card}>
            <Image
              style={styles.image}
              source={{
                uri: cardData.property.images[0]
              }}
            />
            <View style={styles.textBox}>
              <Text style={styles.text}>
                <FontAwesome name="home" size={30} />{' '}
                {capitalise(cardData.property.propertyType)}
              </Text>
              <Text style={styles.text}>
                <FontAwesome name="bed" size={30} />{' '}
                {cardData.property.bedrooms}
              </Text>
              <Text style={styles.text}>
                <FontAwesome name="gbp" size={30} /> {cardData.property.price}
              </Text>
            </View>
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

  render() {
    const { cards, swipedAllCards, refreshing } = this.state;
    return cards.length && !swipedAllCards ? (
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        {!refreshing && (
          <Swiper
            stackSize={6}
            backgroundColor={'#dcd1e8'}
            verticalSwipe={false}
            cards={this.state.cards}
            cardIndex={this.state.cardIndex}
            cardVerticalMargin={40}
            renderCard={this.renderCard}
            onSwipedAll={this.onSwipedAllCards}
            onSwipedRight={this.onSwipeRight}
            showSecondCard={true}
            overlayLabels={{
              left: {
                title: '✗',
                style: {
                  label: {
                    backgroundColor: 'transparent',
                    borderColor: '#f44242',
                    color: '#f44242',
                    borderWidth: 7
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: -30
                  }
                }
              },
              right: {
                title: '✓',
                style: {
                  label: {
                    backgroundColor: 'transparent',
                    borderColor: '#2fc47c',
                    color: '#2fc47c',
                    borderWidth: 7
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: 30
                  }
                }
              }
            }}
            animateOverlayLabelsOpacity
            animateCardOpacity
            onTapCard={(cardIndex: number) => this.onClickCard(cardIndex)}
          />
        )}
      </ScrollView>
    ) : (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: '#dcd1e8'
        }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        <Text style={{ textAlign: 'center' }}>
          No more gaffs matching your criteria: pull down to refresh?
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  swiperContainer: {
    flex: 1
  },
  textBox: {
    flex: 0.5,
    justifyContent: 'flex-start',
    height: 50,
    alignItems: 'flex-start',
    borderRadius: 10
  },
  card: {
    flex: 1,
    backgroundColor: '#f9f4f5',
    padding: 10,
    color: '#000000',
    borderColor: '#502f4c',
    borderWidth: 3,
    borderRadius: 10
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // marginBottom: 20
  },
  text: {
    marginLeft: 20,
    fontSize: 20,
    backgroundColor: 'transparent',
    color: '#000000'
  },
  image: {
    flex: 1,
    borderRadius: 10
  }
});
