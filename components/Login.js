import * as React from 'react';
import { Text, View, Button, StyleSheet, TextInput, AsyncStorage, Alert } from 'react-native';
import { Constants } from 'expo';

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            password: '',
            storedName: '',
            storedPassword: ''
        };
    }

    setUserAndPassword(){
        console.log("setting");
        AsyncStorage.setItem("name", "Amal");
        AsyncStorage.setItem("password", "abc");
    }
    
    onChangeText(data,value) {
        AsyncStorage.setItem(data, value, () => {
            this.setState({
                [data]: value,
            });
            console.log('Button clicked');
        });
    }

    componentDidMount = () => {
        AsyncStorage.getItem('name').then((value) => this.setState({ 'storedName': value }))
        AsyncStorage.getItem('password').then((value) => this.setState({ 'storedPassword': value }))
    }

    checkDetails() {

        if(this.state.name == this.state.storedName && this.state.password == this.state.storedPassword){
            console.log("PASS");
        }
        else{
            console.log("FAIL");
        }
    }
    render() {
        const setUserAndPassword = () => {
            AsyncStorage.setItem("name", "Amal");
            AsyncStorage.setItem("password", "abc");
        }

        return (
            <React.Fragment>
                {setUserAndPassword()}

                <View style={styles.container}>
                    <TextInput style={styles.box} onChangeText={value => {this.onChangeText("name",value);}}/>
                    <TextInput style={styles.box} onChangeText={value => {this.onChangeText("password", value);}}/>

                    <Button title="Retrieve Name" onPress={() => {this.checkDetails();}} />
                </View>
            </React.Fragment>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
    },
    box: {
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        width: 200,
    },
});
