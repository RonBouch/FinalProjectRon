import React, { Component } from "react";
import styles from "../Components/StyleSheet";
import { Icon } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";

import { DrawerActions } from "react-navigation-drawer";
import { Icon as Icona } from "react-native-elements";
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
  TouchableHighlight,
  Alert
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
      associationTypes: null,
      dataAssociations: null,
      searchAssociation: "",
      LoadingFirstTime:false,
    };
  }
  onFocusFunction = () => {
    this.setState({
    LoadingFirstTime:false
    })
    try {
      this.loadPage();
    } catch (e) {
      console.log("Errr Fetch ", e);
    }
       // do some stuff on every screen focus
 };

 // add a focus listener onDidMount
 async componentDidMount() {
   this.focusListener = this.props.navigation.addListener("didFocus", () => {
     this.onFocusFunction();
   });
 }

 // and don't forget to remove the listener
 componentWillUnmount() {
   this.focusListener.remove();
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
              dataAssociations: associations,
              associations: associations,
              LoadingFirstTime:true
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

  FilterAssociation = (value, index) => {
    if (index != 0) {
      let typeId = this.state.associationTypes[index - 1].AssociationTypeID;
      let data = this.state.dataAssociations.filter(item => {
        return item.AssociationTypeID == typeId;
      });
      this.setState({ associations: data });
    } else {
      this.setState({ associations: this.state.dataAssociations });
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    let Associations = [];
    let AssociationTypes = [];

    if (this.state.associationTypes != null) {
      AssociationTypes.push({ value: "הכל" });
      this.state.associationTypes.map(associationTypes => {
        AssociationTypes.push({ value: associationTypes.AssociationTypeName });
      });
    }

    if (this.state.associations != null) {
      Associations = this.state.associations.map((association, index) => {
        if (
          association.AssociationName.includes(this.state.searchAssociation)
        ) {
          return (
            <View
              key={index}
              style={s.spaceBetween}>
              <TouchableOpacity
                style={s.touchAssociation}
                onPress={() =>
                  navigate("AssociationPage", { association: association })
                }
              >
                <Image
                  style={s.imgS}
                  source={{
                    uri: association.AssociationImage
                  }}
                ></Image>
                <View style={{ marginLeft: "5%" }}>
                  <Text style={s.txtAssociationName}>
                    עמותת {association.AssociationName}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }
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
              <TouchableOpacity
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
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 35,
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    color: "rgba(255,255,255,.9)",
                    fontWeight: "bold",
                    fontSize: 25,
                    fontFamily: "serif",
                    textShadowColor: "black",
                    textShadowOffset: { width: 1, height: 4 },
                    textShadowRadius: 5
                  }}
                >
                  עמותות
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Image
                  source={require("../assets/TenYadLogo.png")}
                  style={styles.logo}
                />
              </TouchableOpacity>
            </View>
            <View
              style={s.viewDetails}>
              <View style={s.searchAssociation}>
                <Icona
                  iconStyle={{
                    marginEnd: "10%"
                  }}
                  name="search"
                  type="font-awesome"
                  color="black"
                  size={18}
                />
                <TextInput
                  placeholder="חיפוש "
                  placeholderTextColor="black"
                  onChangeText={e => {
                    this.setState({ searchAssociation: e });
                  }}
                  style={s.searchtxtInput}
                />
              </View>
              <View style={s.filteringView} >
                <Text>סינון לפי:</Text>
                <Dropdown
                  label="סוג עמותה"
                  itemColor="black"
                  baseColor="black"
                  fontSize={12}
                  dropdownMargins={{ min: 0, max: 10 }}
                  dropdownOffset={{ top: 0, left: 0 }}
                  containerStyle={{
                    width: 150
                  }}
                  data={AssociationTypes}
                  onChangeText={(value, index) => {
                    this.FilterAssociation(value, index);
                  }}
                />
              </View>
            </View>

            <ScrollView style={styles.scrollview}>
            {Associations.length!=0?
              <View style={s.associationView}>
               {Associations}
              </View>
               :
               <View style={s.noAssociations}>
               {this.state.LoadingFirstTime ?
               <Text>אין פריטים להצגה</Text>
               :
               <Image source={require("../assets/loading.gif")}/>
               }
                             </View>
                 }

            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default AssociationsList;
const s = StyleSheet.create({
  spaceBetween: {
    margin: 10
  },
  touchAssociation:{
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
  },
  imgS:{
    width: 80,
     height: 80,
      alignItems: "flex-start"
  },
  txtAssociationName:{
    textAlign: "center",
   fontWeight: "bold",
    fontSize: 12
  },
  viewDetails:{
    width: "100%",
    height: "15%",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 15
  },
  searchAssociation:{
    flexDirection: "row",
    width: 200,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderBottomWidth: 0.4
  },
  searchtxtInput:{
    fontSize: 12,
    width: 200
  },
  filteringView:{
    flexDirection: "row",
    marginTop: 30,
    width: "100%",
    justifyContent: "space-around"
  },
  associationView:{
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%"
  },
  noAssociations:{
     flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop:30
  },
});