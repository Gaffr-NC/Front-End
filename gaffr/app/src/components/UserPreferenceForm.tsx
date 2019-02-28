import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { ButtonGroup, Slider } from 'react-native-elements';
import { User } from '../utils/interfaces';
import { updatePreferences } from '../utils';

interface Props {
  user: User;
}
class userPreferenceForm extends Component<Props> {
  state = {
    preferences: {
      minPrice: 0,
      maxPrice: 1000,
      propertyType: 'House',
      bedrooms: 2,
      city: 'Manchester',
      smokingAllowed: false,
      petsAllowed: true
    }
  };

  async componentDidMount() {
    const { user } = this.props;
    if (user.preferences) {
      const { preferences } = this.state;
      this.setState({
        preferences: { ...preferences, ...user.preferences }
      });
    }
  }
  updateSmoking = (selectedIndex: number) => {
    this.setState({
      preferences: {
        ...this.state.preferences,
        smokingAllowed: selectedIndex ? true : false
      }
    });
  };
  updatePets = (selectedIndex: number) => {
    this.setState({
      preferences: {
        ...this.state.preferences,
        petsAllowed: selectedIndex ? true : false
      }
    });
  };
  submitPreferences = () => {
    const { preferences } = this.state;
    const {
      user: { id }
    } = this.props;
    if (id) {
      updatePreferences(id, preferences);
      Alert.alert('Preferences updated');
    }
  };
  render() {
    const {
      minPrice,
      maxPrice,
      propertyType,
      bedrooms,
      city,
      smokingAllowed,
      petsAllowed
    } = this.state.preferences;
    const propertyTypes = ['House', 'Apartment', 'Bungalow'];
    const cities = ['Manchester', 'London', 'Leeds'];
    return (
      <View style={styles.propertyForm}>
        <Text style={styles.inputLabel}>Minimum Price (pcm):</Text>
        <Text style={styles.inputLabel}>£{minPrice}</Text>
        <Slider
          maximumValue={2000}
          minimumValue={0}
          step={50}
          value={minPrice}
          thumbTintColor={'#502f4c'}
          onValueChange={(minPrice: number) =>
            this.setState({
              preferences: {
                ...this.state.preferences,
                minPrice,
                maxPrice: maxPrice <= minPrice ? minPrice : maxPrice
              }
            })
          }
          style={{ width: 300 }}
        />
        <Text style={styles.inputLabel}>Maximum Price (pcm):</Text>
        <Text style={styles.inputLabel}>£{maxPrice}</Text>
        <Slider
          maximumValue={2000}
          minimumValue={0}
          step={50}
          value={maxPrice}
          thumbTintColor={'#502f4c'}
          onValueChange={(maxPrice: number) =>
            this.setState({
              preferences: {
                ...this.state.preferences,
                maxPrice,
                minPrice: minPrice >= maxPrice ? maxPrice : minPrice
              }
            })
          }
          style={{ width: 300 }}
        />
        <Text style={styles.inputLabel}>Number of bedrooms: </Text>
        <TextInput
          placeholder="bedrooms..."
          style={styles.input}
          value={String(bedrooms)}
          onChangeText={(text: string) =>
            this.setState({
              preferences: {
                ...this.state.preferences,
                bedrooms: parseInt(text) ? parseInt(text) : 0
              }
            })
          }
        />
        <Text style={styles.inputLabel}>City: </Text>
        <ButtonGroup
          onPress={index =>
            this.setState({
              preferences: {
                ...this.state.preferences,
                city: cities[index]
              }
            })
          }
          buttons={cities}
          selectedIndex={cities.indexOf(city)}
          containerBorderRadius={10}
          containerStyle={{
            height: 50,
            backgroundColor: 'transparent',
            borderWidth: 0
          }}
          selectedButtonStyle={{ backgroundColor: '#502f4c' }}
          innerBorderStyle={{ width: 0 }}
          buttonStyle={{
            borderRadius: 10,
            margin: 5,
            backgroundColor: '#f9f4f6'
          }}
          textStyle={{ color: '#d1d1d1' }}
        />
        <Text style={styles.inputLabel}>Property Type: </Text>
        <ButtonGroup
          onPress={index =>
            this.setState({
              preferences: {
                ...this.state.preferences,
                propertyType: propertyTypes[index]
              }
            })
          }
          buttons={propertyTypes}
          selectedIndex={propertyTypes.indexOf(propertyType)}
          containerBorderRadius={10}
          containerStyle={{
            height: 50,
            backgroundColor: 'transparent',
            borderWidth: 0
          }}
          selectedButtonStyle={{ backgroundColor: '#502f4c' }}
          innerBorderStyle={{ width: 0 }}
          buttonStyle={{
            borderRadius: 10,
            margin: 5,
            backgroundColor: '#f9f4f6'
          }}
          textStyle={{ color: '#d1d1d1' }}
        />
        <ButtonGroup
          onPress={this.updateSmoking}
          selectedIndex={smokingAllowed ? 1 : 0}
          buttons={['No Smoking', 'Smoking']}
          containerBorderRadius={10}
          containerStyle={{
            height: 50,
            backgroundColor: 'transparent',
            borderWidth: 0
          }}
          selectedButtonStyle={{ backgroundColor: '#502f4c' }}
          innerBorderStyle={{ width: 0 }}
          buttonStyle={{
            borderRadius: 10,
            margin: 3,
            backgroundColor: '#f9f4f5'
          }}
          textStyle={{ color: '#d1d1d1' }}
        />
        <ButtonGroup
          onPress={this.updatePets}
          selectedIndex={petsAllowed ? 1 : 0}
          buttons={['No Pets', 'Pets']}
          containerBorderRadius={10}
          containerStyle={{
            height: 50,
            backgroundColor: 'transparent',
            borderWidth: 0
          }}
          selectedButtonStyle={{ backgroundColor: '#502f4c' }}
          innerBorderStyle={{ width: 0 }}
          buttonStyle={{
            borderRadius: 10,
            margin: 3,
            backgroundColor: '#f9f4f5'
          }}
          textStyle={{ color: '#d1d1d1' }}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.submitPreferences()}
        >
          <Text
            style={{
              alignSelf: 'center',
              color: '#ffffff',
              fontWeight: 'bold'
            }}
          >
            Save Preferences
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  propertyFormContainer: {
    flex: 1,
    backgroundColor: '#dcd1e8'
  },
  propertyForm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 5,
    margin: 0
  },
  input: {
    margin: 5,
    width: '90%',
    padding: 5,
    backgroundColor: '#f9f4f5',
    borderRadius: 10
  },
  landlordProperty: {
    alignItems: 'center',
    margin: 25,
    width: '90%',
    padding: 5,
    backgroundColor: '#f9f4f5',
    borderRadius: 10
  },
  inputLabel: {
    alignSelf: 'center'
  },
  submitButton: {
    backgroundColor: '#502F4C',
    marginTop: 10,
    width: '55%',
    padding: 10,
    borderRadius: 10
  }
});

export default userPreferenceForm;
