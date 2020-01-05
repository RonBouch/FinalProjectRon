import React, { Component } from "react";
import styles from "../Components/StyleSheet";
import { DrawerActions } from "react-navigation-drawer";
import { Icon as Icona } from "react-native-elements";
import Slider from "../Components/PostPageSlider";
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
    Linking.openURL("tel:" + this.state.item.UserPhone);
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

            <Slider
              img={this.props.navigation.state.params.item.ItemImg}
              navigation={this.props.navigation}
            />

            <Text style={{ fontWeight: "bold", fontSize: 24 }}>
              {this.state.item.ItemName}
            </Text>

            <View
              style={{
                width: "90%",
                height: 80,
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginTop: 20
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Icona
                  iconStyle={{ marginEnd: "10%" }}
                  name="user"
                  type="font-awesome"
                  color="black"
                  size={20}
                />
                <Text>{this.state.item.UserName}</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Icona
                  iconStyle={{ marginEnd: "10%" }}
                  name="map-marker"
                  type="font-awesome"
                  color="black"
                  size={20}
                />
                <Text>{this.state.item.City}</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Icona
                  iconStyle={{ marginEnd: "10%" }}
                  name="mobile"
                  type="font-awesome"
                  color="black"
                  size={24}
                />
                <Text onPress={this.callPhone} style={{ color: "green" }}>
                  {this.state.item.UserPhone}
                </Text>
              </View>
            </View>

            <View
              style={{
                borderBottomWidth: 1,
                width: "90%",
                margin: 20,
                elevation: 5
              }}
            ></View>

            {this.state.item.ItemAbout != "" ? (
              <Text style={{ fontSize: 14, marginTop: 30 }}>
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
