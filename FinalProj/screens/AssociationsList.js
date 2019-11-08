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
    this.AssociationsName = "";
    this.AssociationsEmail = "";
    this.AssociationsPhone = "";
    this.AssociationAdditionalPhone = "";
    this.AssociationFax = "";
    this.AssociationWebsite = "";
    this.AssociationAdress = "";
    this.AssociationDetails = "";
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
    let Associations = [];
    if (this.state.associations != null) {
      Associations = this.state.associations.map((association, index) => {
        //   console.log("asass",association)
        return (
          <TouchableOpacity
            key={index}
            style={{
              padding: "3%",
              height: 100,
              width: 300,
              borderWidth: 1,
              borderColor: "black",
              marginBottom: "3%"
            }}
          >
            <Image
              style={{ width: 50, height: 50, justifyContent: "Left" }}
              source={{
                uri: association.AssociationImage
              }}
            ></Image>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              עמותת {association.AssociationName}
            </Text>
            <Text>כתובת : {association.AssociationAdress}</Text>
            <Text>טלפון : {association.AssociationPhone}</Text>
          </TouchableOpacity>
        );
      });
    }
    console.log("asd", Associations);
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
          <View>{Associations}</View>
        </View>
      </View>
    );
  }
}

export default AssociationsList;
