import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import { AsyncStorage } from "react-native";

export default class Sync extends Component {
  constructor() {
    super()
    this.state = {
      value: ""
    }
  }
  
// save data function
  saveData() {
    var Data = this.state.value;
    AsyncStorage.setItem('key', Data)
      .then(() => {
        alert(Data)
      })
      .catch((err) => {
        alert("Error" + err)
      })
  }

  // get data function
  getData() {
    AsyncStorage.getItem('key')
      .then((data) => {
        alert(data + " " + "this is your data")
      })
      .catch((err) => {
        alert("Error" + err)
      })
  }

  // remove data function
  removeData() {
    AsyncStorage.removeItem('key')
      .then(() => {
        alert('Your Data has been removed');
      })
    //   .catech((err) => {
    //       alert(err)
    //   })
  }

  render() {
    return (
      <View>
        <TextInput placeholder="Enter First Name"
          onChangeText={(text) => { this.setState({ value: text }) }}/>

        <Button title="get" onPress={this.getData.bind(this)}>
        get
        </Button>

        <Button title="remove" onPress={this.removeData.bind(this)}>
          REMOVE
        </Button>
        <Button title="save" onPress={this.saveData.bind(this)}>
          SAVE
        </Button>
      </View>
    );
  }
}