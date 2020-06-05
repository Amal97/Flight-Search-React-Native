import * as React from 'react';
import { Text, View, Button, StyleSheet, TextInput, AsyncStorage, Alert } from 'react-native';
import { Constants } from 'expo';

import * as RootNavigation from '../RootNavigation';

export default class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            password: '',
            successful: false
        };
    }

    onChangeText(data,value) {
        AsyncStorage.setItem(data, value, () => {
            this.setState({
                [data]: value,
            });
        });
    }

    submitDetails() {
        AsyncStorage.setItem("name", this.state.name);
        AsyncStorage.setItem("password", this.state.password);
        this.setState({
            successful: true
        })
    }

    render() {

        return (
            <React.Fragment>

                <View style={styles.container}>
                <TextInput style={styles.textInput} placeholder="Username" onChangeText={value => this.onChangeText("name",value)} />
                <TextInput style={styles.textInput} placeholder="Password" onChangeText={value => this.onChangeText("password", value)} />

                <Button title="Submit" onPress={() => {this.submitDetails();}} />
                {this.state.successful && <Text> Sign Up Successful. Return to Login Page </Text>}
                {this.state.successful && <Button title="Back to Login" onPress={() => {RootNavigation.navigate('Login',{success: this.state.successful});}}/>}

                </View>
            </React.Fragment>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      padding: 50
    },
    textInput: {
        height: 40,
        paddingLeft: 6
    }
  });
  