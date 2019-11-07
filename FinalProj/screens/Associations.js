import React, { Component } from "react";
import styles from "../Components/StyleSheet";
import { Icon } from "react-native-elements";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions
} from "react-native";

class Associations extends Component {
  constructor(props) {
    super(props);
    this.AssociationsName = "";
    this.AssociationsEmail = "";
    this.AssociationsPhone = "";
    this.AssociationAdditionalPhone = "";
    this.AssociationFax = "";
    this.AssociationWebsite = "";
    this.AssociationAdress = "";
    this.AssociationDetails = "";
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.logo}>
            {/* <Image
              source={require("../assets/houseLogo.png")}
              style={{ width: "100%", height: "100%", marginTop: "15%" }}
              resizeMode="contain"
            /> */}
          </View>
          <View>
            <Text>fdhd</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Associations;
