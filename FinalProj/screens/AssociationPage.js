import React, { Component } from "react";
import styles from "../Components/StyleSheet";
import { DrawerActions } from "react-navigation-drawer";
import { Icon } from "react-native-elements";
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

class AssociationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      association: null,
      url: null,
      email: null,
      adress: null,
      phone: null,
      additionalPhone: null
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
    this.state.association = this.props.navigation.state.params.association;
    this.state.url = this.state.association.AssociationWebsite;
    this.state.email = this.state.association.AssociationEmail;
    this.state.adress = this.state.association.AssociationAdress;
    this.state.phone = this.state.association.AssociationPhone;
    this.state.additionalPhone = this.state.association.AssociationAdditionalPhone;
    console.log("image: ", this.state.association.AssociationImage);
    return (
      <ImageBackground
        source={require("../assets/background2.jpg")}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <View style={styles.main}>
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

            <ScrollView style={styles.scrollview}>
              <View
                style={{
                  width: "100%",

                  flexDirection: "row",
                  padding: "5%"
                }}
              >
                <View
                  style={{
                    width: "60%"
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    עמותת {this.state.association.AssociationName}
                  </Text>
                  <Text></Text>
                  {this.state.association.AssociationPhone != "" ? (
                    <Text onPress={this.callPhone}>
                      טלפון :{" "}
                      <Text style={{ color: "green" }}>
                        {this.state.association.AssociationPhone}
                      </Text>
                    </Text>
                  ) : (
                    console.log("No Phone")
                  )}
                  {this.state.association.AssociationAdditionalPhone != "" ? (
                    <Text onPress={this.callAdditionalPhone}>
                      טלפון נוסף :
                      <Text style={{ color: "green" }}>
                        {this.state.association.AssociationAdditionalPhone}
                      </Text>
                    </Text>
                  ) : (
                    console.log("No Additional Phone")
                  )}
                  {this.state.association.AssociationFax != "" ? (
                    <Text>פקס :{this.state.association.AssociationFax}</Text>
                  ) : (
                    console.log("No Fax")
                  )}
                </View>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    width: "40%"
                  }}
                  source={{
                    uri: this.state.association.AssociationImage
                  }}
                ></Image>
              </View>

              {this.state.association.AssociationAdress != "" ? (
                <Button
                  onPress={this.openAdress}
                  style={{ color: "blue", fontWeight: "bold" }}
                >
                  ניווט
                </Button>
              ) : (
                console.log("No Adress")
              )}

              {this.state.association.AssociationEmail != "" ? (
                <Button
                  onPress={this.sendMail}
                  style={{ color: "blue", fontWeight: "bold" }}
                >
                  פנייה באמצעות מייל
                </Button>
              ) : (
                console.log("No Email")
              )}

              {this.state.association.AssociationWebsite != "" ? (
                <Button
                  onPress={this.openWebSite}
                  style={{ color: "blue", fontWeight: "bold" }}
                >
                  לאתר האינטרנט
                </Button>
              ) : (
                console.log("No Website")
              )}

              {this.state.association.AssociationDetails != "" ? (
                <Text style={{ fontSize: 14, padding: 10 }}>
                  {this.state.association.AssociationDetails}
                  {"\n"}
                  {"\n"}
                  {"\n"}
                  {"\n"}
                </Text>
              ) : (
                console.log("No Details")
              )}
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default AssociationPage;
