import React, { Component } from 'react'
import { Text, View, Button, FlatList, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import MapView from "react-native-maps";
import RNGooglePlaces from 'react-native-google-places';
import axios from 'axios';
import { ButtonGroup, Grid, Row, Col} from 'react-native-elements'
import { Card, ListItem  } from 'react-native-elements'

class Location extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      location: {
        // latitude: null,
        // longitude: null,
        // latitudeDelta: null,
        // longitudeDelta: null,
        latitude: 24.830294039871763,
        latitudeDelta: 0.0033632258318370134,
        longitude: 67.04754587262869,
        longitudeDelta: 0.0030801817774772644
    },
      error: null,
      selectedIndex: 0,
      type: 'restaurant',
    };
    this.getNearByPlaces = this.getNearByPlaces.bind(this)
  }

openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        console.log(place);
        this.setState({
          latitude: place.latitude,
          longitude: place.longitude
        })
        // place represents user's selection from the
        // suggestions and it is a simplified Google Place object.
      })
      .catch((error) => console.log(error));
  }

  getLocation() {
    // navigator.geolocation.getCurrentPosition((position) => {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: position.coords.latitudeDelta,
          longitudeDelta: position.coords.longitudeDelta,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

 // componentDidMount() {
 //    navigator.geolocation.getCurrentPosition(
 //      (position) => {
 //        this.setState({
 //          latitude: position.coords.latitude,
 //          longitude: position.coords.longitude,
 //          error: null,
 //        });
 //      },
 //      (error) => this.setState({ error: error.message }),
 //      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
 //    );
 //  }


getNearByPlaces() {
    const apiKey = 'AIzaSyB-H-72X_QM7XO4D3yhWSYBV92L6PFkk6Y';
    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
    let completeUrl = `${url}location=${this.state.latitude},${this.state.longitude}&radius=1000&type=restaurant&key=${apiKey}`;
    axios.get(completeUrl)
      .then(
      response => {
        console.log(response);
        this.setState({
          nearbyPlaces: response.data.results,
        })
      })
  }

// getNearByPlaces(selectedIndex) {
//     let typesArray = ['restaurant', 'park', 'bank', 'hospital'];
//     let type = typesArray[selectedIndex];
//     const apiKey = 'AIzaSyB-H-72X_QM7XO4D3yhWSYBV92L6PFkk6Y';
//     const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
//     let lat = this.state.location.latitude;
//     let lng = this.state.location.longitude;
//     console.log(type);
//     let completeUrl = `${url}location=${lat},${lng}&radius=500&type=${type}&key=${apiKey}`;
//     console.log('url', completeUrl)
//     // this.props.fetch_data_nearby(completeUrl);
//   }

  componentDidMount() {
    this.getNearByPlaces();
  }

  render() {
    // console.log('props', this.props)
    // console.log(this.props)
    // const buttons = ['Restautrants', 'Parks', 'Banks', 'Hospitals']
    // const { selectedIndex } = this.state
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20, paddingTop: 20 }}>
        
      <View style={{ marginBottom: 20, paddingBottom: 40 }}>
          <Button title="GET Location" onPress={this.getLocation.bind(this)} />
         <Button title="Nearby Places" onPress={this.getNearByPlaces.bind(this)} />
         <FlatList
            data={this.state.nearbyPlaces}
            renderItem={({ item }) =>
              <View>
                <FlatList
                  data={item.photos}
                  renderItem={({ item }) =>
                    <View>
                      <Image style={{ width: 200, height: 100 }} source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photo_reference}&key=AIzaSyB-H-72X_QM7XO4D3yhWSYBV92L6PFkk6Y` }} />
                    </View>
                  }
                />
                <Text>Name: {item.name}</Text>
                <Text>Rating: {item.rating}</Text>
              </View>
            }
          />
      </View>
      </View>
    );
  }
}

export default Location;