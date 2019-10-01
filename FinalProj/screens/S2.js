import React, { Component } from 'react'
import {  Text, View,TouchableHighlight,Image} from 'react-native';
import StyleSheet from "../Components/StyleSheet";

export default class S2 extends Component {
    static navigationOptions={
        drawerLabel:'S2',
        
    }
    render() {
        return (
         <View style={StyleSheet.view}>
                     <Text style={StyleSheet.text}>This IS S2 Screen </Text>

            <TouchableHighlight onPress={()=>this.props.navigation.goBack()}
            style={StyleSheet.touchableHighlight} underlayColor={'#f1f1f1'}>
                <Text style={StyleSheet.open}>Go Back</Text>
            </TouchableHighlight>
         </View>
        )
    }
}
