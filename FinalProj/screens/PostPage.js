import React, { Component } from "react";
import styles from "../Components/StyleSheet";
import { DrawerActions } from "react-navigation-drawer";
import { Icon as Icona } from "react-native-elements";
import Slider from "../Components/Slider";
import {
  View,
  TouchableHighlight,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  ScrollView
} from "react-native";
import { Linking } from "expo";
import { Button } from "react-native-paper";

class PostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      ItemName: null,
      ItemAbout: null,
      ItemDate: null,
      UserPhone: null,
      ItemImg: null
    };
  }

  openWebSite = () => {
    Linking.openURL(this.state.url);
  };

  sendMail = () => {
    Linking.openURL("mailto:" + this.state.email);
  };

  openAdress = () => {
    Linking.openURL(
      "https://www.google.com/maps/search/?api=1&query=" + this.state.adress
    );
  };

  callPhone = () => {
    Linking.openURL("tel:" + this.state.phone);
  };

  callAdditionalPhone = () => {
    Linking.openURL("tel:" + this.state.additionalPhone);
  };

  render() {
    const { navigate } = this.props.navigation;

    this.state.item = this.props.navigation.state.params.item;
    this.state.ItemName = this.state.item.ItemName;
    this.state.ItemAbout = this.state.item.ItemAbout;
    this.state.ItemDate = this.state.item.ItemDate;
    this.state.UserPhone = this.state.item.UserPhone;
    console.log(
      "props from contribution",
      this.props.navigation.state.params.item.ItemImg
    );
    return (
      <ImageBackground
        source={require("../assets/background2.jpg")}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <View style={styles.main}>
            <View style={styles.topBar}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.dispatch(DrawerActions.openDrawer())
                }
                style={styles.touchableHighlight}
                underlayColor={"rgba(0,0,0,0.8)"}
              >
                <Icona
                  iconStyle={{ marginEnd: "10%" }}
                  name="bars"
                  type="font-awesome"
                  color="white"
                  size={28}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Image
                  source={require("../assets/TenYadLogo.png")}
                  style={styles.logo}
                />
              </TouchableOpacity>
            </View>
            {/* <Image
              source={{
                uri:
                  "http://ruppinmobile.tempdomain.co.il/site11/imageStorage/" +
                  this.state.item.ItemImg
              }}
              style={{
                width: 400,
                height: 200
              }}
            /> */}
            <Slider
              img={this.props.navigation.state.params.item.ItemImg}
              navigation={this.props.navigation}
            />
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {this.state.item.ItemName}
            </Text>
            <Text onPress={this.callPhone}>
              טלפון : <Text> {this.state.item.City}</Text>
            </Text>
            <Text>
              עיר :{" "}
              <Text style={{ color: "green" }}>
                {this.state.item.UserPhone}
              </Text>
            </Text>
             :  console.log("No Phone") }
            {this.state.item.ItemAbout != "" ? (
              <Text style={{ fontSize: 14, padding: 10 }}>
                {this.state.item.ItemAbout}
              </Text>
            ) : (
              console.log("No Details")
            )}
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default PostPage;
