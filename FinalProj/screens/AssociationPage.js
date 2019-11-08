import React, { Component } from "react";
import styles from "../Components/StyleSheet";
import {
  View,
  TouchableHighlight,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text
} from "react-native";

class AssociationPage extends Component {
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
    let Associations = [];
    if (this.state.associations != null) {
      Associations = this.state.associations.map((association, index) => {
        //   console.log("asass",association)
        return (
          <View
            key={index}
            style={{}}
          >
            <Image
              style={{ width: 50, height: 50, alignItems: "flex-start" }}
              source={{
                uri: association.AssociationImage
              }}
            ></Image>
            <View
              style={{
                marginLeft: "5%"
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                עמותת {association.AssociationName}
              </Text>
              <Text>כתובת : {association.AssociationAdress}</Text>
              <Text>טלפון : {association.AssociationPhone}</Text>
            </View>
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
          <View>{Associations}</View>
        </View>
      </View>
    );
  }
}

export default AssociationPage;
