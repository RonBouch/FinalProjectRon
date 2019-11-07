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

class Associations extends Component {
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
    this.state={
        associatons:null,
    }
  }
 componentDidMount(){
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
          let associatons = JSON.parse(result.d);
          if (associatons == null) {
            this.setState({
              message: "לא קיימים עמותות"
            });
            return;
          } else {
            console.log("associatons = " + associatons);
            this.setState({
              associatons: associatons
            });
          }
        },
        error => {
          console.log("err post=", error);
        }
      );
  };

  render() {
      let Associatons=[];
      if(this.state.associatons!=null){
          Associations=this.state.associatons.map((associaton,index)=>{
            //   console.log("asass",associaton)
              return(
                  <View key={index}
                  style={{height:'100%',width:'100%'}}>
                      <Text>jhhy</Text>
                  </View>
              )
          })
      }
      console.log("asd",Associations)
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
          <Text>dsad</Text>
            {Associatons}
        </View>
      </View>
    );
  }
}

export default Associations;
