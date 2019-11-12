import React, { Component } from "react";
import styles from "../Components/StyleSheet";
import { Icon } from "react-native-elements";
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
  constructor(props) {
    super(props);
    this.state = {
      associations: null
    };
  }
  componentDidMount() {
    this.GetAssociations();
  }
  GetAssociations = async () => {
    fetch(
      "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/GetAssociations",
      {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/Json;"
        })
      }
    )
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch POST= ", result);
          let associations = JSON.parse(result.d);
          if (associations == null) {
            this.setState({
              message: "לא קיימים עמותות"
            });
            return;
          } else {
            console.log("associations = " + associations);
            this.setState({
              associations: associations
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
    if (this.state.associations != null) {
      Associations = this.state.associations.map((association, index) => {
        //   console.log("asass",association)
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
              // onPress={() => this.props.navigation.navigate("AssociationPage")}
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
              width: "100%",
              backgroundColor: "white"
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
              {Associations}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default AssociationsList;
