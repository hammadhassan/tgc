import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class Review extends Component {

//   constructor() {
//     super()
//     this.state = {
//       location: {
//         latitude: 24.830294039871763,
//         latitudeDelta: 0.0033632258318370134,
//         longitude: 67.04754587262869,
//         longitudeDelta: 0.0030801817774772644
//       // },
//     }
//   }

//   getLocation() {
//     navigator.geolocation.getCurrentPosition((pos) => {
//       console.log(pos.coords)
//       var crd = pos.coords;
//       this.setState({
//         latitude: pos.coords.latitude,
//         longitude: pos.coords.longitude
//       })
//     },
//       (err) => {
//         alert('check your network conectivity and location or gps')
//       }),
//       () => {
//         var options = {
//           enableHighAccuracy: true,
//           timeout: 5000,
//           maximumAge: 0
//         };
//       }
//   }

//   render() {
//     return (

//       <View>

//         <Button title="GET"
//           onPress={this.getLocation.bind(this)}
//         >GET</Button>

//         <Text>latitude : {this.state.location.latitude}</Text>
//         <Text>longitude : {this.state.location.longitude}</Text>

//       </View>
//     );
//   }
// }

  constructor(props) {
    super(props);

    this.state = {
      location: {
        latitude: null,
        longitude: null,
      error: null,
      }
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    );
    }
  // }
}

export default Review