import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, pins, Button } from 'react-native';
import MapView from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';

class Map extends Component {
  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal({
    // type: 'establishment',
    // country: 'CA',
    // latitude: 53.544389,
    // longitude: -113.490927,
    // radius: 10
    country: "PK",
    latitude: 24.830294039871763,
    latitudeDelta: 0.0033632258318370134,
    longitude: 67.04754587262869,
    longitudeDelta: 0.0030801817774772644,
    radius: 10
})
    .then((place) => {
        console.log(place);
        // place represents user's selection from the 
        // suggestions and it is a simplified Google Place object. 
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object 
  }

getAutoComplete() {        
            // RNGooglePlaces.getAutocompletePredictions('facebook')
            // .then((results) => this.setState({ predictions: results }))
            // .catch((error) => console.log(error.message));
        RNGooglePlaces.openPlacePickerModal({
            latitude: 53.544389,
            longitude: -113.490927,
            radius: 0.01 // 10 meters
        })
        .then((place) => {
            console.log(place);
            // this.props.getLocation();
            // place represents user's selection from the
            // suggestions and it is a simplified Google Place object.
        })
        .catch(error => 
            console.log(error.message)
        );  // error is a Javascript Error object            
}
getCurrentLocation() {
    RNGooglePlaces.getCurrentPlace()
    
    .then((results) => console.log(results))

    .catch((error) => console.log(error.message));
    
}
//   constructor() {
//     super()
//     this.state = {
//         latitude: 0.78825,
//         longitude: -122.4324,
//         latitudeDelta: 0.0002,
//         longitudeDelta: 0.0021,
//         statusBarHeight: {},

//     }

// }   
  // constructor() {
    //     super();
    //     this.state = {
    //       selectedTab: 0,
    //       annotations: [
    //         {
    //           title: 'Smithsonian Museum',
    //           latitude: 38.8980,
    //           longitude: -77.0230
    //         },
    //         {
    //           title: 'UMCP',
    //           latitude: 38.9869,
    //           longitude: -76.9426
    //         },
    //         {
    //           title: 'Arlington',
    //           latitude: 38.8783,
    //           longitude: -77.0687
    //         }
    //       ]
    //     };
    //   }
    // state = {
    //   mapLoaded: false,
    //   pin :{
    //     latitude: 65.9667,
    //     longitude: -18.5333,
    //     latitudeDelta: 0.09,
    //     longitudeDelta: 0.04,
    //     // title: "White House"
    // pin: {
    //   latitude: 0.78825,
    //   longitude: -122.4324,
    //   latitudeDelta: 0.0002,
    //   longitudeDelta: 0.0021
    // }
    //   }
    // }  
//   componentDidMount() {
//     this.setState({
//       mapLoaded: true
//     });
//   }

// onRegionChangeComplete = (region) => {
//   this.setState({ 
//     pin: {
//       latitude: 0.78825,
//       longitude: -122.4324,
//       latitudeDelta: 0.0002,
//       longitudeDelta: 0.0021
//     }
//    });
// }
//   myLocation(){
//     region.setMyLocationEnabled(true);
//   }
constructor() {
  super()
    this.state = {
    location: {
      latitude: 24.830294039871763,
        latitudeDelta: 0.0033632258318370134,
        longitude: 67.04754587262869,
        longitudeDelta: 0.0030801817774772644
    },
    // marker: {
    //   latitude: 24.830294039871763,
    //     latitudeDelta: 0.0033632258318370134,
    //     longitude: 67.04754587262869,
    //     longitudeDelta: 0.0030801817774772644
    // }
  };
}
onRegionChange(region) {
  this.setState({
    location: region,
  });
  alert(region),
  () => {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
  }
}

// componentDidMount() {
//   navigator.geolocation.getCurrentPosition(
//       (position) => {
//         this.setState({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           error: null,
//         });
//         // alert(this.state.location.latitude)
//         // alert(this.state.location.longitude)
//       },
//       (error) => this.setState({ error: error.message }),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
//     );
// }

render() {
  return (
  <View>
  <MapView
      region={this.state.location}
      onRegionChange={this.onRegionChange.bind(this)}
      style={styles.map}
      followsUserLocation
      showsUserLocation
      showsCompass
      showsMyLocationButton
      toolbarEnabled
    >
    </MapView>
    {/*// {this.state.marker.map(marker => (
    // <MapView.Marker
    //   coordinate={marker.latlng}
    //   title={marker.title}
    //   description={marker.description}
    // />
  // ))}*/}
    
      <Button title="open search model"
      onPress={this.openSearchModal.bind(this)}    
      >
      </Button>
      <Text></Text>
      <Button title="get current location"
      onPress={this.getCurrentLocation.bind(this)}
      >
      </Button>
      <Text></Text>
      <Button title="open auto complete"
      onPress={this.getAutoComplete.bind(this)}
      >
      </Button>
      
      </View>
  );
}
  // render() {
    // const { region } = this.props;
    // <PlaceMap annotations={this.state.annotations} />
    // onRegionChange={this.onRegionChange}

    // var pins = [{
    //     latitude: 37,
    //     longitude: -122
    // }];
    // if (!this.state.mapLoaded) {
    //   return (
    //     <View style={{flex: 1, justifyContent: "center" }}>
    //       <ActivityIndicator size="large"/>
    //     </View>
    //   )
    // }

    // return (
    //     <View style ={styles.container}>
    //     <Button title="My Location" onPress={this.myLocation.bind(this)}/>
    //     <MapView
    //     style={styles.map}
    //     region={this.state.region}
    //     annotations={[this.state.pin]}
    //     onRegionChangeComplete={this.onRegionChangeComplete}
    //     mapType="standard"
    //     followsUserLocation
    //     showsUserLocation
    //     showsCompass
    //     showsMyLocationButton
    //     toolbarEnabled
    //     >
    //     </MapView>
    //   </View>
    // );
    // onRegionChange: (region) => {
    //     // console.log(region);
    //     this.setState({
    //         pin: {
    //             longitude: this.region.longitude,
    //             latitude: this.region.latitude
    //         }
    //     });
    // }
  // }
}

const styles = StyleSheet.create({
  // container: {
  //   ...StyleSheet.absoluteFillObject,
  //   height: 600,
  //   width: 600,
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  //   // flex: 1
  // },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
 },
});

export default Map;
