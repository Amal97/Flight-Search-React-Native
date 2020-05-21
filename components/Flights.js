import React, { Component } from 'react';
import FlightData from '../data/FlightData.json'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Card } from 'react-native-elements';

export default class Flights extends Component {

  render(){

    const {OriginCity,DestinationCity,OneWay,Passengers,DepatureDate,ReturnDate,priceRange, fail} = this.props.data
        let flightListDepart = [];
        let flightListArrival = [];

        const filterData = () =>{ 

            flightListDepart = FlightData.filter( flightDepart => (
                                flightDepart.from.toLowerCase() === OriginCity.toLowerCase() &&
                                flightDepart.to.toLowerCase() === DestinationCity.toLowerCase()  &&
                                flightDepart.depatureDate === DepatureDate.toLowerCase()  &&
                                flightDepart.seats >= Passengers             
                            )).map((flights,i) =>{ return flights})
                            
            if(!OneWay){
                flightListArrival = FlightData.filter( flightArrive => (
                                    flightArrive.to.toLowerCase() === OriginCity.toLowerCase() &&
                                    flightArrive.from.toLowerCase() === DestinationCity.toLowerCase()  &&
                                    flightArrive.depatureDate === ReturnDate.toLowerCase()      &&
                                    flightArrive.seats >= Passengers  
                                )).map((flights,i) =>{ return flights})
                        }
                    }

        const fullTicket = [];
        const returnTicket = () =>{
           let k = 0;
            for (let i = 0; i < flightListDepart.length; i++) {
                fullTicket[k] ={...flightListDepart[i],flightListArrival};
                k++;
           }
       }

       const displayTickets = () =>{
        const finalList = [];
        let k = 0;
        let totalFlightPrice = 0;
        let loop = flightListArrival.length;
        if(flightListArrival.length === 0){
            loop = flightListDepart.length;
        }

        if(fail === true) {
            return <Text> Invalid Search </Text>
        }
        if(OriginCity.length !== 0 && fullTicket.length === 0){
            return(<Text> No results found </Text>);
        }

        for (let i = 0; i < flightListDepart.length; i++) {
            for (let j = 0; j < loop; j++) {
                if(flightListArrival.length === 0){
                    totalFlightPrice = fullTicket[i].price;
                }
                else{
                    totalFlightPrice = fullTicket[i].price + fullTicket[i].flightListArrival[j].price;
                }
                if(totalFlightPrice >= priceRange[0] && totalFlightPrice <= priceRange[1]){
                    finalList.push(
                        <Card style={{ width: '50%', opacity:'0.95' }} key={k}
                                title={"Total Price: $" + totalFlightPrice}  >
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                                <View>
                                    <Text> {fullTicket[i].flightNo}  </Text>
                                    <Text> {fullTicket[i].from} > {fullTicket[i].to} </Text>
                                    <Text> Depart: {fullTicket[i].departTime} </Text>
                                    <Text> Arrive: {fullTicket[i].arriveTime} </Text>
                                </View>
                                    {ticketDisplayHandler(i,j)}
                                </View>
                        </Card>
                    )
                    k++;
                }
                if(flightListArrival.length === 0){
                    break;
                }            
            }
        }

        return finalList;
    }

       const ticketDisplayHandler = (i,j) =>{
        if(flightListArrival.length !== 0){
            return(
                <View>
                    <Text>{OneWay ? "" : fullTicket[i].flightListArrival[j].flightNo} </Text>
                    <Text>{OneWay ? "":  fullTicket[i].to + " > " + fullTicket[i].from }</Text>
                    <Text>{OneWay ?"" :"Depart :" + fullTicket[i].flightListArrival[j].departTime}</Text>
                    <Text>{OneWay ? "" :"Arrive :" + fullTicket[i].flightListArrival[j].arriveTime}</Text>
                </View>
            )
        }
    }

    return (
        <React.Fragment>
    {filterData()}
    {returnTicket()}
    {/* {header()} */}
    {displayTickets()}
    </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 50
  },
});
