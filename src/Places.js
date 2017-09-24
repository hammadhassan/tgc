import RNGooglePlaces from 'react-native-google-places';
import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

class GPlacesDemo extends Component {
    constructor() {
        super()
            this.state = {
                latitude: 24.830294039871763,
                latitudeDelta: 0.0033632258318370134,
                longitude: 67.04754587262869,
                longitudeDelta: 0.0030801817774772644    
    }
}    
// openSearchModal() {
//     // console.log(1)
//     RNGooglePlaces.openPlacePickerModal()
//     // RNGooglePlaces.getCurrentPlace()
//     // ({
//     //     latitude: 24.830294039871763,
//     //     latitudeDelta: 0.0033632258318370134,
//     //     longitude: 67.04754587262869,
//     //     longitudeDelta: 0.0030801817774772644
//     // })
//         .then((place) => {
//             console.log(place);
//             // this.props.getLocation();
//             // place represents user's selection from the
//             // suggestions and it is a simplified Google Place object.
//         })
//         .catch(error => 
//             console.log(error.message)
//         );  // error is a Javascript Error object
//     }

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
            // latitude: 53.544389,
            // longitude: -113.490927,
            latitude:  24.831309299999997,
            longitude: 67.0472758,
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
    render() {
        return (
            <View style={styles.container}>
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
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default GPlacesDemo;