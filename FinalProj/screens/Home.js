import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ImageBackground
} from "react-native";
import styles from "../Components/StyleSheet";
import { DrawerActions } from "react-navigation-drawer";
// import StyleSheet from "../Components/StyleSheet";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import Slider from "../Components/Slider";

export default class Home extends Component {
  static navigationOptions = {
    drawerLabel: "Home"
  };
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.topBar}>
            <TouchableHighlight
              onPress={() =>
                this.props.navigation.dispatch(DrawerActions.openDrawer())
              }
              style={styles.touchableHighlight}
              underlayColor={"rgba(0,0,0,0.8)"}
            >
              <Icon
                iconStyle={{ marginEnd: "10%" }}
                name="bars"
                type="font-awesome"
                color="white"
                size={28}
              />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Image
                source={require("../assets/TenYadLogo.png")}
                style={styles.logo}
              />
            </TouchableHighlight>
          </View>
        <View style={{flex:1}}>
        <View style={{flex:1,alignContent:'center',alignItems:'center'}}>
            <Slider/>
          </View>
        <View style={{flex:3}}>
            <TouchableOpacity
              style={{
                marginTop: 80,
                justifyContent: "center",
                alignItems: "center",
                height: 140,
                width: 280,
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 50,
                elevation: 15,
                backgroundColor: "#fff",
                shadowColor: "rgba(0,0,0, .4)",
                shadowOffset: { height: 1, width: 1 },
                shadowOpacity: 1,
                shadowRadius: 1,
                backgroundColor: "#dc143c"
              }}
              onPress={() => this.props.navigation.navigate("AssociationsList")}
            >
              <Text
                style={{
                  fontSize: 25
                }}
              >
                רשימת העמותות
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 80,
                justifyContent: "center",
                alignItems: "center",
                height: 140,
                width: 280,
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 50,
                elevation: 15,
                backgroundColor: "#fff",
                shadowColor: "rgba(0,0,0, .4)",
                shadowOffset: { height: 1, width: 1 },
                shadowOpacity: 1,
                shadowRadius: 1,
                backgroundColor: "#7fff00"
              }}
              onPress={() => this.props.navigation.navigate("Contribution")}
            >
              <Text
                style={{
                  fontSize: 25
                }}
              >
                פורום תרומות
              </Text>
            </TouchableOpacity>
          </View>


        </View>
          
         
        </View>
        
    );
  }
}
