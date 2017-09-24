import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import MapView from 'react-native-maps';
// import { get_direction, success_direction } from './store/actions/mapActions'
import Polyline from '@mapbox/polyline';
// import { connect } from 'react-redux';
import RNGooglePlaces from 'react-native-google-places';

class RnDirections extends Component {
  constructor(props) {
    super(props) 
    this.state = {
    // location: {
      lat: null,
      lng: null,
    // },
    coords: []
  }
  this.getDirectin_handler = this.getDirectin_handler.bind(this);
}

  componentDidMount() {
    // this.getDirectin_handler();
  }

  async getDirectin_handler() {
// console.log('get direc success')
    try {
      let url = 'https://maps.googleapis.com/maps/api/directions/json?origin=';
      let completeUrl = `${url}${this.props.location.latitude},${this.props.location.longitude}&destination=${this.state.lat},${this.state.lng}`;
      console.log('url', completeUrl)    
      let resp = await fetch(completeUrl)
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })

      this.setState({
        coords: coords
      })
      // this.props.success_direction(coords);

      return coords
    } catch (error) {
      console.log('get dir error', error);
    }
  }

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        this.setState({
            lat: place.latitude,
            lng: place.longitude
        })
      // console.log('nav state', this.state )
      })
      .then(() =>  {
        this.getDirectin_handler();
      })
      .catch((error) => console.log(error));
  }

  render() {
    // console.log('props', this.props)
    return (
      <View>
        <MapView style={styles.map} region={this.props.location} >
          <MapView.Polyline
            coordinates={this.props.coords}
            strokeWidth={4}
            strokeColor="red" />
        </MapView>
        <View>
          <Button title="Give your destination" onPress={() => this.openSearchModal()} 
          color="#373F46"
            />
        </View>
      </View>
    );
  }
}

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
  btnStyle: {
    backgroundColor: '#373F46',
    color: "#F8B71D",
  }
});



// const mapStateToProps = state => {
//   return {
//     // current_location: state.mapReducer.location,
//     destination: state.mapReducer.destination,
//     location: state.mapReducer.location,
//     coords: state.mapReducer.coords
//   }
// }


// const mapDispatchToProps = (dispatch) => {
//   return {
//     get_direction: (url) => {
//       dispatch(get_direction(url));
//     },
//     success_direction: (coords) => {
//       dispatch(success_direction(coords))
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(RnDirections)

export default RnDirections;