import React, { Component } from 'react'
import {  Text, View,TouchableHighlight,Image} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';
import StyleSheet from "../Components/StyleSheet";

export default class Home extends Component {
    static navigationOptions={
        drawerLabel:'Home',

    }
    render() {
        return (
         <View style={StyleSheet.view}>
            <TouchableHighlight onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())}
            style={StyleSheet.touchableHighlight} underlayColor={'rgba(0,0,0,0.8)'}>
                <Text style={StyleSheet.open}>Open</Text>
            </TouchableHighlight>
            <Text style={StyleSheet.text}>This IS Home Screen </Text>
         </View>
        )
    }
}
