import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "../Components/StyleSheet";
import { DrawerActions } from "react-navigation-drawer";
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
              <Icon name="bars" type="font-awesome" color="white" size={28} />
            </TouchableOpacity>
            <View
              style={styles.textTopBar}
            >
              <Text
                style={styles.bigText}
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
            <View style={{display:'flex' ,    flexDirection: "column",width:'100%',height:'86%',justifyContent:'space-between'}}>
              <View
                style={{
                  // marginTop: 20,
                  alignItems: "center",
                  width: width,
                  justifyContent: "center",
                }}
              >
                 <Slider props={this.props} navigation={this.props.navigation} />
              </View>
            {/* <TouchableOpacity >
             <Image   style={{width:'100%',height:200}} source={require("../assets/1.jpg")}/>
            </TouchableOpacity>
   */}
          
          <View
              style={{
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontStyle: "italic",
                  textAlign: "center"
                }}
              >
                "להקל על כאב לבו של אחר, זה לשכוח את כאבך שלך."
              </Text>
              <Text style={{ marginTop: 10 }}>( אברהם לינקולן )</Text>
            </View> 
            <TouchableOpacity style={{alignItems: "center",}}  onPress={() => this.props.navigation.navigate("Contribution")}>
             <Image   style={{width:'95%',height:150,borderRadius:20}} source={require("../assets/2.jpg")}/>
            </TouchableOpacity>

         
              <TouchableOpacity style={{alignItems: "center",marginBottom:10}} onPress={() =>
                  this.props.navigation.navigate("AssociationsList")
                } >
            <Image style={{width:'95%',height:150,borderRadius:20}} source={require("../assets/3.jpg")}/>
            </TouchableOpacity>
           
            </View>

            {/* <View
              style={{
                marginTop: 30,
                width: "100%",
                padding: 20
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontStyle: "italic",
                  textAlign: "center"
                }}
              >
                "להקל על כאב לבו של אחר, זה לשכוח את כאבך שלך."
              </Text>
              <Text style={{ marginTop: 20 }}>( אברהם לינקולן )</Text>
            </View>
            <View
              style={{
                height: "30%",
                flexDirection: "row",
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
                  borderRadius: 100,
                  elevation: 5,
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
                  borderRadius: 100,
                  elevation: 5,
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
            </View> */}
        </View>
      </ImageBackground>
    );
  }
}
