import React, { Component } from 'react';
import { StyleSheet, Switch, Text, View, TextInput, Button } from 'react-native';

export default class FormDetails extends Component {
    constructor(){
        super();
        this.state = {
            DestinationCity:'',
            DepatureDate: '',
            fail:false,
            Passengers: "",
            ReturnDate: '',
            ReturnWay:false,
            OneWay:true,
            OriginCity:'',
            priceRange:[0, 5000]
        }
    }

    onChange = (name, value) => {
        let re;
        if(name === "DepatureDate" || name === "ReturnDate"){
            this.setState({
                [name]:value,
                fail:false
            });
        }
        else{
            if(name === "Passengers"){
                re = /^[0-9]+$/;
            }
            else{
                re = /^[a-zA-Z]+$/;
            }
            let valid =   re.test(value);

            if(valid){
                this.setState({
                    [name]:value,
                    fail:false
                });
            }
            else{
                this.setState({
                    fail:true
                });
            }
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.fail === true || this.state.OriginCity === '' || this.state.DestinationCity === '' || this.state.DepatureDate === '' || this.state.Passengers === ''){
            this.setState({
                fail:true,
            });
            this.props.handleFail()
        }
        else if(!this.state.fail){
            this.props.handleSubmit(false,this.state.OriginCity,this.state.DestinationCity,this.state.DepatureDate,this.state.ReturnDate,this.state.Passengers,this.state.OneWay);
        }
    }

    toggleSwitch = () =>{
        this.setState({
            OneWay:!this.state.OneWay,
        });
    }

    returnDayBox = () =>{
        if(this.state.OneWay === false){
            return(<React.Fragment>
                <Text>Enter Return Date</Text>
                <TextInput style={styles.textInput}  onChangeText={value => this.onChange("ReturnDate", value)} />
            </React.Fragment>
            )
        }
        else{
            return;
        }
    }

    handlePriceChange = (event, newValue) =>{
        this.setState({
            priceRange:newValue
        })

        this.props.slider(newValue);
    }

  render(){
    return (
    <View style={styles.container}>

        <View style={{flexDirection: 'row'}}>        
            <Text>   Return   </Text>
            <Switch ios_backgroundColor="#81b0ff" onValueChange={this.toggleSwitch} value={this.state.OneWay} />
            <Text>   One Way   </Text>
        </View>
        
        <View style={{paddingTop: "10%"}}>
        <Text>Enter Origin City </Text>
            <TextInput style={styles.textInput}  onChangeText={value => this.onChange("OriginCity", value)} />
        <Text>Enter Destination City </Text>    
            <TextInput style={styles.textInput}  onChangeText={value => this.onChange("DestinationCity", value)} />
        <Text>Enter Depature Date </Text>
            <TextInput style={styles.textInput}  onChangeText={value => this.onChange("DepatureDate", value)} />
            {this.returnDayBox()}
        <Text>Enter Passengers </Text>
            <TextInput style={styles.textInput}  onChangeText={value => this.onChange("Passengers", value)} />
            <Button title="Search" onPress={this.onSubmit} />
        </View>
    
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 50
  },
  textInput: {
    borderBottomWidth : 0.5,
    borderColor: 'grey',
    height: 40,
    paddingLeft: 6,
    marginBottom: 30
  }
});
