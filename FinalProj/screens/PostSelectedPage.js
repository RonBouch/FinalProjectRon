import React, { Component } from "react";
import styles from "../Components/StyleSheet";
import { DrawerActions } from "react-navigation-drawer";
import { Icon as Icona } from "react-native-elements";
import Slider from "../Components/PostPageSlider";
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";
import { Linking } from "expo";

class PostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.navigation.state.params.item,
    };
  }
  callPhone = () => {
    Linking.openURL("tel:" + this.state.item.UserPhone);
  };
  render() {
    const { navigate } = this.props.navigation;
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
                onPress={() => this.props.navigation.navigate("HomePage")}
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

            <Text style={s.titleTxt}>{this.state.item.ItemName}</Text>

            <View style={s.detailsView}>
              <View style={s.detailsLine}>
                <Icona
                  iconStyle={s.iconStyle}
                  name="user"
                  type="font-awesome"
                  color="black"
                  size={20}
                />
                <Text>{this.state.item.UserName}</Text>
              </View>

              <View style={s.detailsLine}>
                <Icona
                  iconStyle={s.iconStyle}
                  name="map-marker"
                  type="font-awesome"
                  color="black"
                  size={20}
                />
                <Text>{this.state.item.City}</Text>
              </View>

              <View style={s.detailsLine}>
                <Icona
                  iconStyle={s.iconStyle}
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

            <View style={s.itemAboutView}></View>

            {this.state.item.ItemAbout != "" ? (
              <Text style={s.txtItemAbout}>{this.state.item.ItemAbout}</Text>
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
const s = StyleSheet.create({
  titleTxt: {
    fontWeight: "bold",
    fontSize: 24
  },
  detailsView: {
    width: "90%",
    height: 80,
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 20
  },
  detailsLine: {
    flexDirection: "row"
  },
  iconStyle: {
    marginEnd: "10%"
  },
  txtItemAbout: {
    fontSize: 14,
    marginTop: 30
  },
  itemAboutView: {
    borderBottomWidth: 1,
    width: "90%",
    margin: 20,
    elevation: 5
  }
});
