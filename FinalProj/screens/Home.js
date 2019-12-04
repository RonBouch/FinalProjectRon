import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ImageBackground,
  Dimensions
} from "react-native";
import styles from "../Components/StyleSheet";
import { DrawerActions } from "react-navigation-drawer";
// import StyleSheet from "../Components/StyleSheet";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import Slider from "../Components/Slider";
const { width } = Dimensions.get("window");

export default class Home extends Component {
  static navigationOptions = {
    drawerLabel: "Home"
  };
  render() {
    return (
      <ImageBackground
        source={require("../assets/background2.jpg")}
        style={styles.imageBackground}
      >
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
          <View style={{ flex: 1 }}>
            <View>
              <View
                style={{
                  // marginTop: 20,
                  alignItems: "center",
                  width: width,
                  justifyContent: "center"
                }}
              >
                {/* <Image style={{width:100,height:70}} source={require('../assets/new1.gif')}/> */}
                <Slider props={this.props} />
              </View>
            </View>
            <View style={{ flex: 3, alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  marginTop: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 100,
                  width: 200,
                  borderWidth: 1,
                  borderColor: "white",
                  borderRadius: 30,
                  elevation: 15,
                  shadowColor: "rgba(0,0,0, .4)",
                  shadowOffset: { height: 1, width: 1 },
                  shadowOpacity: 1,
                  shadowRadius: 1,
                  backgroundColor: "rgba(67, 204, 29,.9)"
                }}
                onPress={() => this.props.navigation.navigate("Contribution")}
              >
                <Text
                  style={{
                    fontSize: 25,
                    color: "white"
                  }}
                >
                  פורום תרומות
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 100,
                  width: 200,
                  borderWidth: 1,
                  borderColor: "white",
                  borderRadius: 30,
                  elevation: 15,
                  backgroundColor: "#fff",
                  shadowColor: "rgba(0,0,0, .4)",
                  shadowOffset: { height: 1, width: 1 },
                  shadowOpacity: 1,
                  shadowRadius: 1,
                  backgroundColor: "#dc143c"
                }}
                onPress={() =>
                  this.props.navigation.navigate("AssociationsList")
                }
              >
                <Text
                  style={{
                    fontSize: 25,
                    color: "white"
                  }}
                >
                  עמותות
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
