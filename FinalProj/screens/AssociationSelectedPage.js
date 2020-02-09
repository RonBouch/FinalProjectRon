import React, { Component } from "react";
import styles from "../Components/StyleSheet";
import { DrawerActions } from "react-navigation-drawer";
import { Icon } from "react-native-elements";
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
  ScrollView
} from "react-native";
import { Linking } from "expo";
import { Button } from "react-native-paper";

class AssociationSelectedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      association: null //משתנה שמכיל את פרטי העמותה
    };
  }

  //פונקציה לפתיחת אתר האינטרנט
  openWebSite = () => {
    Linking.openURL(this.state.association.AssociationWebsite);
  };

  //פונקציה לפתיחת המייל
  sendMail = () => {
    Linking.openURL("mailto:" + this.state.association.AssociationEmail);
  };

  //פונקציה לפתיחת ניווט
  openAdress = () => {
    Linking.openURL(
      "https://www.google.com/maps/search/?api=1&query=" +
        this.state.association.AssociationAdress
    );
  };

  //פונקציה לחיוג למספר
  callPhone = () => {
    Linking.openURL("tel:" + this.state.association.AssociationPhone);
  };

  //פונקציה לחיוג למספר
  callAdditionalPhone = () => {
    Linking.openURL("tel:" + this.state.association.AssociationAdditionalPhone);
  };

  render() {
    //הכנסת העמותה הנבחרת לתוך המשתנה
    this.state.association = this.props.navigation.state.params.association;
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
              >
                <Icon name="bars" type="font-awesome" color="white" size={28} />
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

            <ScrollView style={styles.scrollview}>
              <View style={s.viewHeader}>
                <View style={{ width: "60%" }}>
                  <Text style={s.txtTitle}>
                    עמותת {this.state.association.AssociationName}
                  </Text>
                  <Text></Text>
                  {this.state.association.AssociationPhone != "" ? (
                    <Text onPress={this.callPhone}>
                      טלפון :{" "}
                      <Text style={s.txtPhone}>
                        {this.state.association.AssociationPhone}
                      </Text>
                    </Text>
                  ) : (
                    console.log("No Phone")
                  )}
                  {this.state.association.AssociationAdditionalPhone != "" ? (
                    <Text onPress={this.callAdditionalPhone}>
                      טלפון נוסף :
                      <Text style={s.txtPhone}>
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
                  style={s.imgS}
                  source={{ uri: this.state.association.AssociationImage }}
                ></Image>
              </View>

              {this.state.association.AssociationAdress != "" ? (
                <Button onPress={this.openAdress} style={s.btnLinks}>
                  ניווט
                </Button>
              ) : (
                console.log("No Adress")
              )}

              {this.state.association.AssociationEmail != "" ? (
                <Button onPress={this.sendMail} style={s.btnLinks}>
                  פנייה באמצעות מייל
                </Button>
              ) : (
                console.log("No Email")
              )}

              {this.state.association.AssociationWebsite != "" ? (
                <Button onPress={this.openWebSite} style={s.btnLinks}>
                  לאתר האינטרנט
                </Button>
              ) : (
                console.log("No Website")
              )}

              {this.state.association.AssociationDetails != "" ? (
                <Text style={s.txtDetails}>
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

export default AssociationSelectedPage;
const s = StyleSheet.create({
  viewHeader: {
    width: "100%",
    flexDirection: "row",
    padding: "5%"
  },
  txtTitle: {
    fontWeight: "bold",
    fontSize: 20
  },
  txtPhone: {
    color: "green"
  },
  imgS: {
    width: 100,
    height: 100,
    width: "40%"
  },
  btnLinks: {
    color: "blue",
    fontWeight: "bold"
  },
  txtDetails: {
    fontSize: 14,
    padding: 10
  }
});
