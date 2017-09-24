import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Home from "./src/Home";
import * as firebase from 'firebase';

export const firebaseConfig = {
  apiKey: "AIzaSyBnzrd-cOrgyo38QSkdzeb3K462L-u-6Ik",
  authDomain: "tourist-guide-1502027695550.firebaseapp.com",
  databaseURL: "https://tourist-guide-1502027695550.firebaseio.com",
  projectId: "tourist-guide-1502027695550",
  storageBucket: "",
  messagingSenderId: "783117883841"
};

firebase.initializeApp(firebaseConfig);

AppRegistry.registerComponent('TouristApp', () => Home);