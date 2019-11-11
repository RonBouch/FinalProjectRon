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
            {/* <Image
              source={require("../assets/houseLogo.png")}
              style={{ width: "100%", height: "100%", marginTop: "15%" }}
              resizeMode="contain"
            /> */}
          </View>
          <View>
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
              <Text>כתובת : {this.state.association.AssociationAdress}</Text>
              <Text>טלפון : {this.state.association.AssociationPhone}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default AssociationPage;
