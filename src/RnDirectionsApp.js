import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import RNGooglePlaces from 'react-native-google-places';
import axios from "axios";

class RnDirectionsApp extends Component {

   static navigationOptions = {
    title: 'Get Direction',
  };
  constructor(props) {
    super(props)
    this.state = {
      location: {
        latitude: 24.830294039871763,
        latitudeDelta: 0.0033632258318370134,
        longitude: 67.04754587262869,
        longitudeDelta: 0.0030801817774772644
        // latitude: null,
        // longitude: null,
        // latitudeDelta: null,
        // longitudeDelta: null,
    },
    lat: null,
    long: null,
    // currentLocation: {latitude: 24.8841584, longitude: 67.1379614},
    // destination: {latitude: 24.8302940, longitude: 67.0475458},
    coords: []
    }
    // this.getURL = this.getURL.bind(this);
    this.getDirections = this.getDirections.bind(this);
  }

// getURL() {
//     axios.get('https://maps.googleapis.com/maps/api/directions/json?origin=24.8841584,67.1379614&destination=24.882830499999997,67.0680423')
//       .then((resp) => {
//           let respJson = resp.JSON()
//           let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
//           let coords = points.map((point, index) => {
//               return {
//                   latitude: point[0],
//                   longitude: point[1]
//               }
//           })
//           this.setState({coords: coords})
//           alert(this.state)
//           return coords
//       })
//       .catch((err) => {
//           alert(err)
//       })
//     }

openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        this.setState({
            lat: place.latitude,
            long: place.longitude
        })
      })
      .then(() =>  {
        this.getDirections();
      })
      .catch((error) => console.log(error));
  }

  componentWillMount() {
    // alert(this.state.location.latitude)
    // this.getDirections("24.8302940, 67.0475458", "24.8841584, 67.1379614")
    // this.getDirections(`{this.state.location.latitude},{this.state.location.longitude}`, `{this.state.lat},{this.state.long}`)
    // this.getURL()
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        alert(this.state.location.latitude)
        alert(this.state.location.longitude)
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  async getDirections(startLoc, destinationLoc) {
        try {
            let url = 'https://maps.googleapis.com/maps/api/directions/json?origin=';
            let completeUrl = `${url}${this.state.location.latitude},${this.state.location.longitude}&destination=${this.state.lat},${this.state.long}`;
            // let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
            let resp = await fetch(completeUrl)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            this.setState({coords: coords})
            return coords
            // alert(coords)
        } catch(error) {
            // alert(error)
            return error
        }
    }

  render() {
    return (
      <View>

        <MapView style={styles.map}
            initialRegion={this.state.location}
            mapType="standard"
            showsMyLocationButton
            followsUserLocation={true}
            showsUserLocation={true}
            // showsCompass
            moveOnMarkerPress
            toolbarEnabled>
        <MapView.Polyline 
            coordinates={this.state.coords}
            strokeWidth={3}
            strokeColor="green"/>
        </MapView>
          <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button title="Enter Your Desire Location" onPress={() => this.openSearchModal()} 
          color="green"
          />
        </View>
      </View>
    );
  }
}

export default RnDirectionsApp

/*// 
<Button title="URL" onPress={() => this.getURL()} 
          color="black"
          />
<Text>Latitude: {this.state.location.latitude}</Text>
        // <Text>Longitude: {this.state.location.longitude}</Text>
        // {this.state.error ? <Text>Error: {this.state.error}</Text> : null}*/

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});