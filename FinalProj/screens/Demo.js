import React, { Component } from 'react'
import { View,TouchableHighlight,Image,ImageBackground,TouchableOpacity,Text} from 'react-native';
import styles from "../Components/StyleSheet";
import Icon from 'react-native-vector-icons/Ionicons';  

class Demo extends Component {
    static navigationOptions={
        drawerLabel:'Demo',
    }
    render() {
        return (
      
            <ImageBackground source={require('../assets/bg2.jpg')} style={styles.backgroundImage}>
              <View style={styles.logo}>
              <TouchableHighlight onPress={()=>this.props.navigation.goBack()}
            style={styles.touchableHighlight} underlayColor={'rgba(0,0,0,0.8)'}>
            <Icon  iconStyle={{ marginEnd: "10%" }} name="md-arrow-round-forward" type="font-awesome"  color="black" size={28} />             
            </TouchableHighlight>
              <Image
                source={require("../assets/logo3.jpg")}
                style={{ width: "80%", height: 100 ,borderRadius:50,marginTop:'15%'}}
                resizeMode="contain"
              />
            </View>
       
         <View style={styles.view}>

         <Text style={styles.text}>This IS S2 Screen </Text>

       
         </View>
         
         </ImageBackground>
        )
    }
}