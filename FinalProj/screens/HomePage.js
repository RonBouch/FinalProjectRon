import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions
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
            <View style={styles.textTopBar}>
              <Text style={styles.bigText}>דף הבית</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("HomePage")}
            >
              <Image
                source={require("../assets/TenYadLogo.png")}
                style={styles.logo}
              />
            </TouchableOpacity>
          </View>
          <View style={s.viewHome}>
            <View style={s.sliderView}>
              <Slider props={this.props} navigation={this.props.navigation} />
            </View>

            <View style={s.sentenceView}>
              <Text style={s.sentenceViewTxt}>
                "להקל על כאב לבו של אחר, זה לשכוח את כאבך שלך."
              </Text>
              <Text style={{ marginTop: 10 }}>( אברהם לינקולן )</Text>
            </View>
            <TouchableOpacity
              style={s.touchStyle}
              onPress={() => this.props.navigation.navigate("PostsListPage")}
            >
              <Image style={s.touchImage} source={require("../assets/2.jpg")} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ alignItems: "center", marginBottom: 10 }}
              onPress={() =>
                this.props.navigation.navigate("AssociationsListPage")
              }
            >
              <Image style={s.touchImage} source={require("../assets/3.jpg")} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const s = StyleSheet.create({
  viewHome: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "86%",
    justifyContent: "space-between"
  },
  sliderView: {
    alignItems: "center",
    width: width,
    justifyContent: "center"
  },
  sentenceView: {
    width: "100%"
  },
  sentenceViewTxt: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center"
  },
  touchImage: {
    width: "95%",
    height: 150,
    borderRadius: 20
  },
  touchStyle: {
    alignItems: "center"
  }
});
