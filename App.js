import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView  } from 'react-native';
import FormDetails from './components/FormDetails';
import Flights from './components/Flights';

import Login from './components/Login';
// import Navigator from './routes/homeStack';

export default class App extends Component {
 constructor(){
   super();
   this.state = {
    DestinationCity:'',
    DepatureDate: '',
    OriginCity:'',
    Passengers:0,
    ReturnDate:  '',
    OneWay:true,
    fail: false,
    priceRange:[0,20000]
}
 }

 handleFail = () =>{
   this.setState({
     fail : true
   });
 }

 handleSubmit = (Fail,OriginCity,DestinationCity,DepatureDate,ReturnDate,Passengers,OneWay) => {
  this.setState({
      fail: Fail,
      DestinationCity:DestinationCity,
      DepatureDate:DepatureDate,
      Passengers:Passengers,
      ReturnDate:ReturnDate,
      OneWay:OneWay,
      OriginCity:OriginCity
  });
}

handlePrice = (priceRange) =>{
  this.setState({
    priceRange:priceRange
  })
}

  render(){
    return (
      <View style={styles.container}>
          {/* <View >
          <Text style={styles.header}> Flight Search </Text>  
          <FormDetails handleFail={this.handleFail} handleSubmit={this.handleSubmit} slider={this.handlePrice}/>
          </View>
          <ScrollView> 
          <Flights data = {this.state}/>
          </ScrollView> */}

          {/* <Navigator /> */}
          <Login />

      </View>
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
