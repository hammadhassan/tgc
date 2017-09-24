// import React, { Component } from 'react'
// import { Text, View, Button, FlatList, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
// import { fetch_data_nearby } from "./store/actions/mapActions";
// import { connect } from 'react-redux';
// import axios from 'axios';
// import { ButtonGroup, Grid, Row, Col} from 'react-native-elements'
// import { Card, ListItem  } from 'react-native-elements'


// class FavPlaces extends Component {
//   constructor() {
//     super()
//     console.disableYellowBox = true;
//     this.state = {
//       selectedIndex: 0,
//       type: 'restaurant',
//     }
//     this.getNearbyPlaces = this.getNearbyPlaces.bind(this)
//   }

//   getNearbyPlaces(selectedIndex) {
//     let typesArray = ['restaurant', 'park', 'bank', 'hospital'];
//     let type = typesArray[selectedIndex];
//     const apiKey = 'AIzaSyB-H-72X_QM7XO4D3yhWSYBV92L6PFkk6Y';
//     const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
//     let lat = this.props.location.latitude;
//     let lng = this.props.location.longitude;
//     console.log(type);
//     let completeUrl = `${url}location=${lat},${lng}&radius=500&type=${type}&key=${apiKey}`;
//     console.log('url', completeUrl)
//     this.props.fetch_data_nearby(completeUrl);
//   }

//   componentDidMount() {
//     this.getNearbyPlaces(0);
//   }

//   render() {
//     console.log(this.props)
//     const buttons = ['Restautrants', 'Parks', 'Banks', 'Hospitals']
//     const { selectedIndex } = this.state
 
//     return (
//       <ScrollView>
//         <View style={{ marginBottom: 20, paddingBottom: 40 }}>
//           <ButtonGroup
//             onPress={this.getNearbyPlaces}
//             selectedIndex={selectedIndex}
//             buttons={buttons}
//             containerStyle={{ height: 50 }} />
//         {this.props.isNearbyData ? <Card containerStyle={{ padding: 0 }} >
//             {
//               this.props.nearby_data.map((u, i) => {
//                 return (
//                   <ListItem
//                     key={i}
//                     roundAvatar
//                     title={u.name}
//                     avatar={{ uri: u.icon }}
//                   >
//                   </ListItem>
//                 );
//               })
//             }
//           </Card> : <ActivityIndicator size='large'/> }
//         </View>
//       </ScrollView>
//     )
//   }
// }


// const mapStateToProps = state => {
//   return {
//     nearby_data: state.mapReducer.nearby_data,
//     location: state.mapReducer.location,
//     isNearbyData: state.mapReducer.isNearbyData
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetch_data_nearby: (url) => {
//       dispatch(fetch_data_nearby(url));
//     }
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(FavPlaces)