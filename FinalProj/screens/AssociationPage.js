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
              {this.state.association.AssociationAdress != "" ? (
                <Text>כתובת : {this.state.association.AssociationAdress}</Text>
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
        </View>
      </View>
    );
  }
}

export default AssociationPage;
