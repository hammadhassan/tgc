// import React, { Component } from 'react'
// import { Text, View, Button, FlatList, Image, TouchableOpacity } from 'react-native'
// import MapView from "react-native-maps";
// import RNGooglePlaces from 'react-native-google-places';
// import getDirections from 'react-native-google-maps-directions'
// import { get_location } from './store/actions/mapActions'
// import { connect } from 'react-redux';
// import axios from 'axios';


// class AddPlaces extends Component {
//   constructor() {
//     super()
//     this.state = {
//       // latitude: 0.78825,
//       // longitude: -122.4324,
//       // latitudeDelta: 0.0002,
//       // longitudeDelta: 0.0021,
// 	location: {
//         latitude: 24.8841584,
//         longitude: 67.1379614,
//         latitudeDelta: 0.0002,
//         longitudeDelta: 0.0021,
//     },
//     currentLocation: {latitude: 24.8841584, longitude: 67.1379614},
//     destination: {latitude: 24.882830499999997, longitude: 67.0680423},
//     coords : [],
//     get_direction_error: '',
//     isLocation: false,
//     isNearbyData: false,
//     nearby_data: [],
//     nearby_error: '',
//       nearbyPlaces: []
//     }
//   }


//   handleGetDirections = () => {
//     const data = {
//       source: {
//         latitude: -33.8356372,
//         longitude: 18.6947617
//       },
//       destination: {
//         latitude: -33.8600024,
//         longitude: 18.697459
//       },
//       params: [
//         {
//           key: "dirflg",
//           value: "w"
//         }
//       ]
//     }
//     getDirections(data)
//   }


//   openSearchModal() {
//     RNGooglePlaces.openAutocompleteModal()
//       .then((place) => {
//         console.log(place);
//         this.setState({
//           latitude: place.latitude,
//           longitude: place.longitude
//         })
//         // place represents user's selection from the
//         // suggestions and it is a simplified Google Place object.
//       })
//       .catch((error) => console.log(error));
//   }

//   componentWillMount() {
//     navigator.geolocation.getCurrentPosition((position) => {
//     	if (position) {
//     		var crd = position.coords;
//             // let location = {
//                 // latitude: position.coords.latitude,
//                 // longitude: position.coords.longitude
//         this.setState({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude
//         })
//       }
//     },
//       (err) => {
//         alert('check your network conectivity and location or gps', err.message)
//       }),
//       () => {
//         var options = {
//           enableHighAccuracy: true,
//           timeout: 5000,
//           maximumAge: 0
//         };
//       }
//   }

//   getNearByPlaces() {
//     const apiKey = 'AIzaSyB-H-72X_QM7XO4D3yhWSYBV92L6PFkk6Y';
//     const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
//     let completeUrl = `${url}location=${this.state.latitude},${this.state.longitude}&radius=500&type=restaurant&key=${apiKey}`;
//     axios.get(completeUrl)
//       .then(
//       response => {
//         console.log(response);
//         this.setState({
//           nearbyPlaces: response.data.results,
//         })
//       })
//   }


//   render() {
//     console.log('props', this.props)


//     return (
//       <View style={styles.container}>
//         <View>

//           <Button title="Search your desired place" onPress={() => this.openSearchModal()} />
//           <Button onPress={this.handleGetDirections} title="Get Directions" />

//         </View>

//         <View style={{ marginBottom: 20, paddingBottom: 40 }}>
//           <Button title="Nearby Places" onPress={this.getNearByPlaces.bind(this)} />

//           <FlatList
//             data={this.state.nearbyPlaces}
//             renderItem={({ item }) =>
//               <View>
//                 <FlatList
//                   data={item.photos}
//                   renderItem={({ item }) =>
//                     <View>
//                       <Image style={{ width: 200, height: 100 }} source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photo_reference}&key=AIzaSyB-H-72X_QM7XO4D3yhWSYBV92L6PFkk6Y` }} />
//                     </View>
//                   }
//                 />
//                 <Text>Name: {item.name}</Text>
//                 <Text>Rating: {item.rating}</Text>
//               </View>
//             }
//           />
//         </View>
//       </View>
//     )
//   }
// }
// export default AddPlaces


// const styles = {
//     container: {
//       paddingLeft: 10,
//       paddingRight: 10,
//       marginRight: 10,
//       marginLeft: 10,
//       marginTop: 15,
//       marginBottom: 20
//     },
//     mapContainer: {
//       height: 200,
//       width: 400,
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       justifyContent: 'flex-end',
//       alignItems: 'center',
//     },
//     map: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//     },
//   }