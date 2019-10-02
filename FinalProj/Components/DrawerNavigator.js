import React, { Component } from 'react'
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import {createAppContainer} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer'; 
import ContentComponent from './ContentComponent';

import Home from '../screens/Home';
import Login from '../screens/Login'
import Register from '../screens/Register'
import S2 from '../screens/S2'
 
const DNav = createDrawerNavigator({
    Home: {screen: Home},  
  Login: {screen: Login},
  Register:{screen:Register},
  
  S2: {screen: S2},

}, 
{
     initialRouteName: 'Home',
     contentComponent:ContentComponent,
    drawerWidth:Dimensions.get('window').width,
    drawerPosition:'right',
    drawerBackgroundColor:'transparent'
    }
);

const AppContainer = createAppContainer(DNav);
export default class DrawerNavigator extends Component{
  render(){
      return <AppContainer/>
  }
}
