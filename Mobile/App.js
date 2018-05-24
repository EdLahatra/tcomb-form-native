import React from "react";
import {
  StyleSheet, Text, View, TouchableHighlight, ScrollView, TouchableOpacity,Image
} from "react-native";
import t, { form, struct, String, maybe, Number, Boolean, Date } from "tcomb-form-native";
import moment from "moment";
import FloatingLabel from 'react-native-floating-label'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Autocomplete from './autocomplete-input';

import {countries} from './countries';

const API = 'https://swapi.co/api';
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

const Form = form.Form;

const Gender = t.enums({
  M: 'Male',
  F: 'Female'
});

const Positive = t.refinement(t.Number, n => n > 0);
Positive.getValidationErrorMessage = (value, path, context) => 'bad age !';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const EmailField = t.refinement(t.String, email => EMAIL_REGEX.test(email));

// here we are: define your domain model
const Person = struct({
  name: String,              // a required string
  surname: maybe(String),  // an optional string
  age: Positive,              // a required number
  email: EmailField,
  rememberMe: Boolean,        // a boolean
  position: struct({
    latitude: Number,
    longitude: Number
  }),
  birthDate: Date, // a date field
  gender: Gender // enum
});
 
const options = {
  i18n: {
    optional: ' (optional)',
    required: ' *',
    add: 'Add',   // add button
    remove: '✘',  // remove button
    up: '↑',      // move up button
    down: '↓'     // move down button
  },
  fields: {
    name: {
      factory: FloatingLabel,
    },
    email: {
      factory: FloatingLabel,
    },
    age: {
      factory: FloatingLabel,
    },
    surname: {
      factory: FloatingLabel,
    },
    gender: {
      nullOption: {value: '', text: 'Choose your gender'},
    },
    birthDate: {
      label: 'birth Date',
      mode: 'date',
      config: {
        format: (date) => moment(date).format('YYYY-mm-d'),
      },
    },
  },
}; // optional rendering options (see documentation)
const googleUrl = 'https://maps.googleapis.com/maps/api/';
const key = 'AIzaSyD6eIzwfy2fSLPKhEBQko8fnmecjlPYuS0';
const query = query => `${googleUrl}place/autocomplete/json?input=${query}&types=geocode&key=${key}`;

const flag = code => `https://countryflags.io/${code}/flat/64.png`;

export default class AwesomeProject extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      value: '',
      isLoading: false,
      query: '',
      indicator: true
    };
  }
  
  _onChangeText(text) {
    this.setState({isLoading: true, value: text});
    
    fetch(query(text))
      .then((result) => {
        // Process list of suggestions
        console.log(result);
        this.setState({isLoading: false});
      });
  }

  onPress = () => {
    // call getValue() to get the values of the form
    const value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
    }
    this.setState({ value: null });
  }

  customCell = (name, code) => (
    <TouchableOpacity onPress={() => this.setState({ query: name })}>
      <View style={styles.cell}>
        <Image source={{ uri: flag(code) }} style={styles.image} />
        <Text style={styles.cellText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );

  findData(query) {
    if (query === '') {
      return [];
    }
    const regex = new RegExp(`${query.trim()}`, 'i');
    return countries.filter(item => item.name.search(regex) >= 0);
  }
 
  render() {
    const { query } = this.state;
    const data = this.findData(query);
    const comp = (a, b) => typeof (a && b) === 'string' && a.toLowerCase().trim() === b.toLowerCase().trim();
    return (
      <View style={styles.container}>
        <ScrollView>
          <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={styles.autocompleteContainer}
            data={data.length === 1 && comp(query, data[0].name) ? [] : data}
            defaultValue={query}
            onChangeText={text => this.setState({ query: text })}
            placeholder="Enter Star Wars film title"
            renderItem={({ name, code }) => this.customCell(name, code)}
            indicator={this.state.indicator}
          />
          <Form
            ref="form"
            type={Person}
            options={options}
          />
          <GooglePlacesAutocomplete
            placeholder={'googleplaces.search'}
            minLength={2} // minimum length of text to search
            autoFocus={true}
            fetchDetails={true}
            onPress={(data, details) => { // 'details' is provided when fetchDetails = true
              // Actions.pop({ refresh: { place: { input: this.props.input, data } } });
              console.log(data, details);
            }}
            /* getDefaultValue={() => {
                return this.props.value; // text input default value
              }} */
            getDefaultValue={() => ''}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key,
              language: 'fr',
              types: 'geocode',
            }}
            styles={{
              description: {
                fontWeight: 'bold',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              }
            }}
            // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            // currentLocationLabel={I18n.t('googleplaces.currentLocationLabel')}
            nearbyPlacesAPI="GoogleReverseGeocoding" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
              // available options for GoogleReverseGeocoding
              // API : https://developers.google.com/maps/documentation/geocoding/intro
            }}
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch
              // API : https://developers.google.com/places/web-service/search
              rankby: 'distance'
            }}
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
            // filter the reverse geocodingresults by types - ['locality', 'administrative_area_level_3']
            // if you want to display only cities
            enablePoweredByContainer={false}
            predefinedPlaces={[homePlace, workPlace]}
          />
          <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 25
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "lightblue",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  cellText: {
    flex: 1,
    marginLeft: 10
  },
  image: {
    width: 20,
    height: 20,
    marginLeft: 10
  },
});
