import React, { Component } from "react";
import styles from "../Components/StyleSheet";
import { Icon } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";

import { DrawerActions } from "react-navigation-drawer";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
  ScrollView,
  StatusBar,
  TouchableHighlight
} from "react-native";
import { Left } from "native-base";

class AssociationsList extends Component {
  loadPage() {
    this.GetAssociations();
  }

  constructor(props) {
    super(props);
    this.state = {
      associations: null,
      associationTypes: null
    };
  }
  componentDidMount() {
    try {
      this.loadPage();
    } catch (e) {
      console.log("Errr Fetch ", e);
    }
    // this.GetAssociationsType();
    // this.GetAssociations();
  }
  GetAssociations = async () => {
    await fetch(
      "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/GetAssociations",
      {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/Json;"
        })
      }
    )
      .then(res => {
        return res.json();
      })
      .then(
        result => {
          let associations = JSON.parse(result.d);
          if (associations == null) {
            this.setState({
              message: "לא קיימים סוגי עמותות"
            });
            return;
          } else {
            this.setState({
              associations: associations
            });
          }
        },
        error => {
          console.log("err post=", error);
        }
      );
    this.GetAssociationsType();
  };

  GetAssociationsType = async () => {
    fetch(
      "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/GetAssociationTypes",
      {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/Json;"
        })
      }
    )
      .then(res => {
        return res.json();
      })
      .then(
        result => {
          let associationTypes = JSON.parse(result.d);
          if (associationTypes == null) {
            this.setState({
              message: "לא קיימים סוגי עמותות"
            });
            return;
          } else {
            this.setState({
              associationTypes: associationTypes
            });
          }
        },
        error => {
          console.log("err post=", error);
        }
      );
  };

  render() {
    const { navigate } = this.props.navigation;
    let Associations = [];
    let AssociationTypes = [];

    if (this.state.associationTypes != null) {
      this.state.associationTypes.map(associationTypes => {
        AssociationTypes.push({ value: associationTypes.AssociationTypeName });
      });
    }

    if (this.state.associations != null) {
      Associations = this.state.associations.map((association, index) => {
        return (
          <View
            key={index}
            style={{
              margin: 10
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 140,
                width: 140,
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 50,
                elevation: 10,
                backgroundColor: "#fff",
                shadowColor: "rgba(0,0,0, .4)",
                shadowOffset: { height: 1, width: 1 },
                shadowOpacity: 1,
                shadowRadius: 1
              }}
              onPress={() =>
                navigate("AssociationPage", { association: association })
              }
            >
              <Image
                style={{ width: 80, height: 80, alignItems: "flex-start" }}
                source={{
                  uri: association.AssociationImage
                }}
              ></Image>
              <View
                style={{
                  marginLeft: "5%"
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 12
                  }}
                >
                  עמותת {association.AssociationName}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      });
    }
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
            <ScrollView
              style={{
                marginHorizontal: 20,
                width: "100%"
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",

                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "100%"
                }}
              >
                <TextInput
                  placeholder="חיפוש"
                  placeholderTextColor="rgb(150,150,150)"
                  style={{
                    borderBottomWidth: 0.2,
                    borderBottomColor: "rgb(150,150,150)",
                    width: "40%",
                    marginLeft: "5%",
                    fontSize: 16
                  }}
                  // onChangeText={this.City}
                />
                <Dropdown
                  label="סוג עמותה"
                  itemColor="black"
                  dropdownMargins={{ min: 0, max: 10 }}
                  dropdownOffset={{ top: 0, left: 0 }}
                  containerStyle={{
                    width: "40%",
                    padding: 5,
                    marginTop: 10,
                    marginLeft: "5%"
                  }}
                  data={AssociationTypes}
                  // onChangeText={this.Type}
                />

                {Associations}
              </View>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default AssociationsList;
