import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView  } from 'react-native';
import FormDetails from './FormDetails';
import Flights from './Flights';


export default class Home extends Component {
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
    <React.Fragment>
        <ScrollView>
            <Text style={styles.header}> Flight Search </Text>  
        
            <View style={styles.container}>
                <FormDetails handleFail={this.handleFail} handleSubmit={this.handleSubmit} slider={this.handlePrice}/>
            </View>
        
            <ScrollView>
                <Flights data = {this.state}/>
            </ScrollView>
        </ScrollView>
    </React.Fragment>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 50,
    paddingTop: 10
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 20
  }
});
