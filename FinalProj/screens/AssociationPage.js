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

class AssociationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      association: null
    };
  }

  render() {
    this.state.association = this.props.navigation.state.params.association;
    console.log("a", this.state.association);
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.logo}>
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
                style={{ width: 60, height: 60 }}
              />
            </TouchableHighlight>
          </View>
          <ScrollView style={{ marginHorizontal: 20, width: "100%" }}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",

                flexDirection: "row",
                flexWrap: "wrap",
                width: "100%"
              }}
            >
              <Image
                style={{ width: 50, height: 50, alignItems: "flex-start" }}
                source={{
                  uri: this.state.association.AssociationImage
                }}
              ></Image>
              <View
                style={{
                  marginLeft: "5%"
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  עמותת {this.state.association.AssociationName}
                </Text>
                {this.state.association.AssociationAdress != "" ? (
                  <Text>
                    כתובת : {this.state.association.AssociationAdress}
                  </Text>
                ) : (
                  console.log("No Adress")
                )}
                {this.state.association.AssociationPhone != "" ? (
                  <Text>טלפון : {this.state.association.AssociationPhone}</Text>
                ) : (
                  console.log("No Phone")
                )}
                {this.state.association.AssociationAdditionalPhone != "" ? (
                  <Text>
                    טלפון נוסף :
                    {this.state.association.AssociationAdditionalPhone}
                  </Text>
                ) : (
                  console.log("No Additional Phone")
                )}
                {this.state.association.AssociationFax != "" ? (
                  <Text>פקס :{this.state.association.AssociationFax}</Text>
                ) : (
                  console.log("No Fax")
                )}
                {this.state.association.AssociationEmail != "" ? (
                  <Text>
                    דואר אלקטרוני :{this.state.association.AssociationEmail}
                  </Text>
                ) : (
                  console.log("No Email")
                )}
                {this.state.association.AssociationWebsite != "" ? (
                  <Text>
                    אתר אינטרנט :{this.state.association.AssociationWebsite}
                  </Text>
                ) : (
                  console.log("No Website")
                )}
                {this.state.association.AssociationDetails != "" ? (
                  <Text>
                    אודותינו :{this.state.association.AssociationDetails}
                  </Text>
                ) : (
                  console.log("No Details")
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default AssociationPage;
