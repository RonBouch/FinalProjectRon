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
                padding: "8%",
                height: 140,
                width: 140,
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 50,
                marginBottom: "3%"
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
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>
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
          <View style={styles.logo}>
            {/* <Image
              source={require("../assets/houseLogo.png")}
              style={{ width: "100%", height: "100%", marginTop: "15%" }}
              resizeMode="contain"
            /> */}
          </View>
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
        </View>
      </View>
    );
  }
}

export default AssociationsList;
