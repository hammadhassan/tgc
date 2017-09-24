import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, } from 'react-native';
import * as firebase from 'firebase';
import { Spinner } from './common';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

export default class LoginScreen extends Component {
static navigationOptions = {
    title: 'Login',
  };
    constructor(props) {
        super(props)
        this.state = {
        email: '',
        password: '',
        error: '',
        isLoading: false
    }
}
    Login() {
        const { email, password } = this.state;
        this.setState({ 
            error: '',
            isLoading: true
        });

    firebase.auth().signInWithEmailAndPassword(email, password)
    // Handle respnse here
    .then(() => {
        this.nowLoginSuccess()
        alert("Login")
    }
)
    // Handle Errors here.
    .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage);
        this.setState({
            error: errorMessage,
            isLoading: false
        });
    });
    this.props.navigation.navigate("NearBy");
}

    nowLoginSuccess() {
        // alert("Login");
        this.setState({
            email: '',
            password: '',
            isLoading: false
        })
    };

    renderButtonAndLoader() {
        if (this.state.isLoading) {
            return <Spinner />
        }
        return (
            <Button 
            onPress={this.Login.bind(this)}
            title="Login"
            raised={true}
            backgroundColor= "#03A9F4"
            fontSize={24}
            borderRadius= {5}
            fontWeight="bold"
            // buttonStyle={{flex: 1}}
            />
        )
    }

    errorMessage() {
        if (this.state.email === "") {
            return <FormValidationMessage>
            {'This field is required'}
            </FormValidationMessage>
        }
    }

    render() {
        return (
            <View>
                    <FormLabel h3>
                        Email:
                    </FormLabel>
                        <FormInput 
                            value={this.state.email}
                            onChangeText={email => { this.setState({ email }) }}
                            placeholder="Please enter your Email"
                        />
                    <FormValidationMessage>
                        {'This field is required'}
                    </FormValidationMessage>    
                    <FormLabel h3>
                        Password:
                    </FormLabel>
                        <FormInput
                            secureTextEntry={true}
                            placeholder="Please enter your Password"
                            value={this.state.password}
                            onChangeText={password => { this.setState({ password }) }}
                        />
                        <FormValidationMessage>
                            {'This field is required'}
                        </FormValidationMessage>
                    <FormLabel>
                        <Text style={styles.errorStyle}>
                           {this.state.error}
                        </Text>
                    </FormLabel>
                        {this.renderButtonAndLoader()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    errorStyle : {
    color: 'red'
    },
    login: {
    backgroundColor: "#03A9F4",
    fontSize: 24,
    borderRadius: 5
    }
});