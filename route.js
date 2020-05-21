import React  from 'react';
import { createStackNavigator } from 'react-navigation';//install package
import App from "./App";
import Login from "./Componant/Login";




export default App = createStackNavigator(
    //create navigation screens
    {
        First: { screen: Login },//for main screen we have used first. Here its only type of variable.
        Second: { screen: App }//second screen reference
    });