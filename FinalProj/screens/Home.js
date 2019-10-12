import React, { Component } from 'react'
import {  StyleSheet,Text, View,TouchableHighlight,Image,ImageBackground} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';
// import StyleSheet from "../Components/StyleSheet";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Home extends Component {
    static navigationOptions={
        drawerLabel:'Home',

    }
    render() {
        return (
            <ImageBackground source={require('../assets/bg2.jpg')} style={styles.backgroundImage}>

         <View style={styles.view}>
            <TouchableHighlight onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())}
            style={styles.touchableHighlight} underlayColor={'rgba(0,0,0,0.8)'}>
            <Icon  iconStyle={{ marginEnd: "10%" }} name="bars" type="font-awesome"  color="black" size={28} />                    
            </TouchableHighlight>
            <View style={styles.body}>
                <TouchableOpacity style={styles.imageContainer}>
                    <Image source={require('../assets/g3.jpg')} style={styles.image}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.imageContainer}>
                <Image source={require('../assets/contribution.jpg')} style={styles.image}/>

                </TouchableOpacity>


                <TouchableOpacity style={styles.imageContainer}>
                <Image source={require('../assets/contribution2.jpg')} style={styles.image}/>

                </TouchableOpacity>
            </View>
            <Text style={styles.text}>This IS Home Screen </Text>
         </View>
         </ImageBackground>

        )
    }
}
const styles=StyleSheet.create({
    
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    height:'100%'
  },
    view:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'white',
      },
      body:{
          marginTop:200,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
      },
      text:{
        fontSize:26,
        color:'purple',
      },
      imageContainer:{
      },
      image:{
       width:300,
       height:130,
       borderRadius:20,

      },
      touchableHighlight:{
        width:50,
        height:50,
        // backgroundColor:'red',
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        left:10,
        top:20,
      },
      open:{
        color:'white',
        fontSize:16,
        fontWeight:'bold',
      },
    
})
