import React, { Component } from 'react'
import { Text, View, Button, FlatList, Image, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native'
import MapView from "react-native-maps";
import RNGooglePlaces from 'react-native-google-places';
import axios from 'axios';
import { ButtonGroup, Grid, Row, Col} from 'react-native-elements'
import { Card, ListItem  } from 'react-native-elements'

class Location2 extends Component {
static navigationOptions = {
    title: 'Resturant NearBy',
  };
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      // location: {
    //   latitude: null,
    //   longitude: null,
    //   // latitudeDelta: null,
    //   // longitudeDelta: null,
    // // },
    //   error: null,
    //   selectedIndex: 0,
    //   type: 'restaurant',
    // };
    // this.getNearbyPlaces = this.getNearbyPlaces.bind(this)
      latitude: 24.830294039871763,
      latitudeDelta: 0.0033632258318370134,
      longitude: 67.04754587262869,
      longitudeDelta: 0.003080181777,
      nearbyPlaces: []
    }
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

  // getLocation() {
  //   // navigator.geolocation.getCurrentPosition((position) => {
  //   this.watchId = navigator.geolocation.watchPosition(
  //     (position) => {
  //       this.setState({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //         latitudeDelta: position.coords.latitudeDelta,
  //         longitudeDelta: position.coords.longitudeDelta,
  //         error: null,
  //       });
  //     },
  //     (error) => this.setState({ error: error.message }),
  //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
  //   );
  // }

componentWillMount() {
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

getNearByPlaces() {
    // let typesArray = ['restaurant'];
    // let type = typesArray[selectedIndex];  
    const apiKey = 'AIzaSyB-H-72X_QM7XO4D3yhWSYBV92L6PFkk6Y';
    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
    let completeUrl = `${url}location=${this.state.latitude},${this.state.longitude}&radius=500&type=restaurant&key=${apiKey}`;
    axios.get(completeUrl)
      .then(
      response => {
        console.log(response);
        this.setState({
          nearbyPlaces: response.data.results,
        })
      })
  }

// getNearbyPlaces(selectedIndex) {
//     let typesArray = ['restaurant', 'park', 'bank', 'hospital'];
//     let type = typesArray[selectedIndex];
//     const apiKey = 'AIzaSyB-H-72X_QM7XO4D3yhWSYBV92L6PFkk6Y';
//     const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
//     let lat = this.state.location.latitude;
//     let lng = this.state.location.longitude;
//     console.log(type);
//     let completeUrl = `${url}location=${lat},${lng}&radius=500&type=${type}&key=${apiKey}`;
//     console.log('url', completeUrl)
//     this.props.fetch_data_nearby(completeUrl);
//   }

  // componentDidMount() {
  //   this.getNearbyPlaces(0);
  // }

  render() {
    // console.log('props', this.props)
    // console.log(this.props)
    // const buttons = ['Restautrants', 'Parks', 'Banks', 'Hospitals']
    // const { selectedIndex } = this.state
    return (
      <View style={styles.container}>
          <View>
            <Button title="Enter your Favourite Place" onPress={() => this.openSearchModal()} />
          </View>
        <View style={{ marginBottom: 20, paddingBottom: 40 }}>
          <Button title="Press to Get NearBy Restautrants" onPress={this.getNearByPlaces.bind(this)} />

          {/* <FlatList
            data={this.state.nearbyPlaces}
            renderItem={({ item }) =>
              <View>
                <FlatList
                  data={item.photos}
                  renderItem={({ item }) =>
                    <View>
                      <Image style={{ width: 200, height: 100 }} source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photo_reference}&key=AIzaSyBTeynBGQE3bjKAewueKWEVtbt9JlrUIn8` }} />
                    </View>
                  }
                />

                <Text>Name: {item.name}</Text>
                <Text>Rating: {item.rating}</Text>
              </View>
            }
          /> */}
          {this.state.nearbyPlaces ? <Card containerStyle={{ padding: 0 }} >
            {
              this.state.nearbyPlaces.map((item) => {
                return (
                  <ListItem
                    roundAvatar
                    title={item.name}
                    rightIcon={{ name: 'arrow-right', type: 'font-awesome' }}
                  >
                  </ListItem>
                );
              })
            }
          </Card> : <ActivityIndicator size='large'/> }
        </View>
      </View>
    );
  }
}

export default Location2;

const styles = StyleSheet.create({
  container: {
      paddingLeft: 10,
      paddingRight: 10,
      marginRight: 10,
      marginLeft: 10,
      marginTop: 15,
      marginBottom: 20
    },
  });