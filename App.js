import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView  } from 'react-native';

import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';

import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';
import { createStackNavigator } from '@react-navigation/stack';

import * as RootNavigation from './RootNavigation';

const RootStack = createStackNavigator();

export default class App extends Component {

  SignOut = () =>{
    RootNavigation.navigate('Login');
  }

  render(){
    return (
      <NavigationContainer ref={navigationRef}>{
        <RootStack.Navigator>
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="Home" component={Home} options={{ headerRight: () => (
          <Text style={{fontWeight: "bold", fontSize: 15}} onPress={() => this.SignOut()}> Sign Out </Text>),}} />
        <RootStack.Screen name="Sign Up" component={SignUp} />
      </RootStack.Navigator>
      }</NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 50
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center"

  }
});
