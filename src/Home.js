import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import { TabNavigator, StackNavigator, } from 'react-navigation';
import Map from "./Map";
import AddPlaces from "./AddPlaces";
import LoginScreen from "./Login";
import Location from "./Location";
import SignupScreen from "./SignUp";
import GPlacesDemo from "./Places";
import * as firebase from 'firebase';
import App from "./App";
import Review from "./Review"
// import RnDirections from "./Navigater";
import RnDirectionsApp from "./RnDirectionsApp";
import Location1 from "./Location1";
import Location2 from "./Location2";

class Home extends Component {
// componentWillMount(){
//   var config = {
//     apiKey: "AIzaSyBnzrd-cOrgyo38QSkdzeb3K462L-u-6Ik",
//     authDomain: "tourist-guide-1502027695550.firebaseapp.com",
//     databaseURL: "https://tourist-guide-1502027695550.firebaseio.com",
//     projectId: "tourist-guide-1502027695550",
//     storageBucket: "",
//     messagingSenderId: "783117883841"
//   };
//   firebase.initializeApp(config);
// }
  constructor(props){
  super(props)
    this.state = {
    loggedIn: false
    }
}  

  checkAuthantication() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ loggedIn: true })
    })
    this.setState({ loggedIn: false })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>TouristApp</Text>
      </View>
    );
  }
}

const MainNavigator  = TabNavigator({
  Welcome: { screen: Home },
  NearBy: { screen: Location2 },
  Main: {
    screen: StackNavigator({
      Map : {screen: RnDirectionsApp },
      Login : { screen: LoginScreen },
      SignUp : { screen: SignupScreen }
    })
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
    },
  favourite: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 50,
    },
});

export default (Home, MainNavigator);