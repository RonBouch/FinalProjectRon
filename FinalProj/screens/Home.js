import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ImageBackground,
  Dimensions,
  Button
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "../Components/StyleSheet";
import { DrawerActions } from "react-navigation-drawer";
// import StyleSheet from "../Components/StyleSheet";
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
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.dispatch(DrawerActions.openDrawer())
              }
              style={styles.touchableHighlight}
            >
              <Icon
                iconStyle={{ marginEnd: "10%" }}
                name="bars"
                type="font-awesome"
                color="white"
                size={28}
              />
            </TouchableOpacity>
            <View
              style={{
                marginTop: 35,
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  color: "rgba(255,255,255,.9)",
                  fontWeight: "bold",
                  fontSize: 25,
                  fontFamily: "serif",
                  textShadowColor: "black",
                  textShadowOffset: { width: 1, height: 4 },
                  textShadowRadius: 5
                }}
              >
                דף הבית
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Image
                source={require("../assets/TenYadLogo.png")}
                style={styles.logo}
              />
            </TouchableOpacity>
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
                <Slider props={this.props} navigation={this.props.navigation} />
              </View>
            </View>
            <View
              style={{
                height: "50%",
                flexDirection: "row",
                marginTop: 30,
                alignItems: "center",
                justifyContent: "space-around"
              }}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 150,
                  width: 150,
                  borderWidth: 1,
                  borderColor: "white",
                  borderRadius: 30,
                  // elevation: 15,
                  shadowColor: "rgba(0,0,0, .4)",
                  shadowOffset: { height: 1, width: 1 },
                  shadowOpacity: 1,
                  shadowRadius: 1,
                  backgroundColor: "#6495ed"
                }}
                onPress={() => this.props.navigation.navigate("Contribution")}
              >
                <Text
                  style={{
                    fontSize: 25,
                    color: "white"
                  }}
                >
                  תרומות
                </Text>
                <Text></Text>
                <Icon
                  style={{ width: "25%", textAlign: "center" }}
                  name="hand-holding-heart"
                  type="font-awesome"
                  color="white"
                  size={34}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 150,
                  width: 150,
                  borderWidth: 1,
                  borderColor: "white",
                  borderRadius: 30,
                  elevation: 15,
                  shadowColor: "rgba(0,0,0, .4)",
                  shadowOffset: { height: 1, width: 1 },
                  shadowOpacity: 1,
                  shadowRadius: 1,
                  backgroundColor: "#6495ed"
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
                <Text></Text>
                <Icon
                  style={{ width: "25%", textAlign: "center" }}
                  name="place-of-worship"
                  type="font-awesome"
                  color="white"
                  size={34}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
