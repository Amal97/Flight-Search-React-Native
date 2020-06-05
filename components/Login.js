import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, TextInput, AsyncStorage, Alert } from 'react-native';
import { Constants } from 'expo';

import * as RootNavigation from '../RootNavigation';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            storedName: '',
            storedPassword: '',
            fail: false,
            count: 0
        };
    }

    onChangeText(data,value) {
        AsyncStorage.setItem(data, value, () => {
            this.setState({
                [data]: value,
            });
        });
    }

    componentWillMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('focus', () => {
            this.setState({ count: 0 });
            AsyncStorage.getItem('name').then((value) => this.setState({ 'storedName': value }));
            AsyncStorage.getItem('password').then((value) => this.setState({ 'storedPassword': value })) 
        });
    }

    checkDetails() {
            if(this.state.name == this.state.storedName && this.state.password == this.state.storedPassword){
                this.setState({
                    fail: false
                })
                RootNavigation.navigate('Home');
            }
            else{
                this.setState({
                    fail: true
                })
            }
        }

    render() {
        return (
            <React.Fragment>
                <Text style={styles.header}> Login to Flight Searcher </Text>
                <View style={styles.container}>
                <TextInput style={styles.textInput} placeholder="Username" onChangeText={value => this.onChangeText("name",value)} />
                <TextInput style={styles.textInput} placeholder="Password" onChangeText={value => this.onChangeText("password", value)} />

                <Button title="Sign In" onPress={() => {this.checkDetails();}} />
                <Button title="Sign Up" onPress={() => {RootNavigation.navigate('Sign Up');;}} />
                {this.state.fail && <Text style={{color: 'red'}}> Invalid Username or Password </Text>} 
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
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 20
      }
  });
  