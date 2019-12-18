import React, { Component } from "react";
import {
  View,
  TouchableHighlight,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  ScrollView,
  Linking,
  Dimensions,
  TextInput,
  ActionButton
} from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { DrawerActions } from "react-navigation-drawer";

import styles from "../Components/StyleSheet";
import { Icon as Icona } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import S3 from "./S3";
import Publish from "../screens/Publish";
import Favorite from "../screens/Favorite";

import { CheckBox } from "react-native-elements";
import { array } from "prop-types";

class Contribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      region: "",
      // checkedB: false,
      item: null,
      items: null,
      dataItems:null,
      extraDetails: -1,
      showImg: false,
      checkedFavorite: false,
      itemsFromFavorite:null,
      searchItem:"",
      itemTypes:[],
    };
  }

  // define a separate function to get triggered on focus
  onFocusFunction = () => {
    console.log("Change Picture .");
    this.GetItems();
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

  _pressCall = phone => {
    const url = "tel:" + phone;
    // console.log("url  asasds",url)
    Linking.openURL(url);
  };

  GetItemsFromFavorite = async () => {
    const data = {
      userid: 1
    };
    await fetch(
      "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/GetItemsFromFavorite",
      {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/Json;"
        }),
        body: JSON.stringify(data)
      }
    )
      .then(res => {
        return res.json();
      })
      .then(
        result => {
          let itemsFromFavorite = JSON.parse(result.d);
          if (itemsFromFavorite == null) {
            console.log("no Favorite");
            return;
          } else {
            this.setState({
              itemsFromFavorite: itemsFromFavorite
            });

          }
          this.GetItemTypes();

        },
        error => {
          console.log("err post=", error);
        }
      );
  };

  GetItems = () => {
    fetch(
      "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/GetItems",
      {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/Json;"
        })
      }
    )
      .then(res => {
        // console.log("res=", res);
        return res.json();
      })
      .then(
        result => {

          // console.log("fetch POST= ", result);
          let items = JSON.parse(result.d);
          if (items == null) {
            this.setState({
              message: "הרשמה נכשלה"
            });
            return;
          } else {
            // console.log("U = " + items);
            this.setState({
              dataItems:items,
              items: items
            });
            this.GetItemsFromFavorite();
          }
        },
        error => {
          console.log("err post=", error);
        }
      );
  };

  GetItemTypes = async () => {
    fetch(
      "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/GetItemTypes",
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
          let itemTypes = JSON.parse(result.d);
          if (itemTypes == null) {
            this.setState({
              message: "לא קיימים סוגי פריטים"
            });
            return;
          } else {
            this.setState({
              itemTypes: itemTypes
            });
          }
        },
        error => {
          console.log("err post=", error);
        }
      );
  };
  static navigationOptions = {
    drawerLabel: "Contribution"
  };
  Type = e => {
    this.setState({
      type: e
    });
  };
  Region = e => {
    this.setState({
      region: e
    });
  };
  infoWindow = (index, item) => {
    if (this.state.extraDetails == -1 || this.state.extraDetails != index) {
      this.setState({
        extraDetails: index,
        item: item,
        checkedFavorite: false
      });
    } else {
      this.setState({
        extraDetails: -1,
        item: item
      });
    }
  };

  Favorite = item => {
    const data = {
      userid: 1,
      itemid: item.ItemID
    };
    fetch(
      "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/InsertFavorite",
      {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/Json;"
        }),
        body: JSON.stringify(data)
      }
    )
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch POST= ", result);
          // let favorite = JSON.parse(result.d);
          this.GetItems();
          console.log(result.d);
          console.log(result);
        },
        error => {
          console.log("err post=", error);
        }
      );
  };
  SearchItem = e => {
    this.setState(prevState => ({
      searchItem: e,
      ...prevState.imagesSlider
    }));
    }


    FilterItemTypes=(value,index)=>{
      if(index != 0){
        console.log("index = > ",index)
        // console.log("ITEM FROM DB => ",this.state.itemTypes[index].ItemTypeID)
        let typeId = this.state.itemTypes[index].ItemTypeID;
        let data = this.state.dataItems.filter((item)=>{return item.ItemType == typeId});
        console.log("DATA +>",data)
        this.setState({items:data});
      }
     else{
      this.setState({items:this.state.dataItems});
     }
    }
  render() {
    // console.log("ItemType== >",this.state.itemTypes)
    let ItemTypes = [];

    if (this.state.itemTypes != null) {
      this.state.itemTypes.map(type => {
        ItemTypes.push({ value: type.ItemType });
      });
    }

    let Type = [
      {
        value: "הכל"
      },
      {
        value: "מוצרי חשמל"
      },
      {
        value: "בגדים"
      },
      {
        value: "ריהוט וכלי בית"
      },
      {
        value: "ספרים ומדיה דיגיטלית"
      },
      {
        value: "לתינוק ולילד"
      },
      {
        value: "סיוע חברתי וסביבתי"
      },
      {
        value: "שונות"
      }
    ];
    let Region = [
      {
        value: "הכל"
      },
      {
        value: "צפון"
      },
      {
        value: "שפלה"
      },
      {
        value: "שרון"
      },
      {
        value: "מרכז"
      },
      {
        value: "דרום"
      }
    ];
    let Items = [];

    if (this.state.items != null&&this.state.itemsFromFavorite!=null) {
      console.log("Items from filter = > ",this.state.items)
      Items = this.state.items.map((item, index) => {
        if (item.ItemName.includes(this.state.searchItem)) {
          return (
            <View
              key={index}
              style={{
                backgroundColor: "white",
                width: "95%",
                height: 260,
                margin: 10,
                borderWidth: 1,
                borderColor: "#e6e6fa",
                elevation: 10
              }}
            >
              {/* <View style={styles.line}></View> */}
              <View
                style={{
                  position: "absolute",
                  zIndex: 1,
                  margin: 5,
                  left: 2
                }}
              >
                <TouchableOpacity onPress={() => this.Favorite(item)}>
                  {this.state.itemsFromFavorite.filter(
                    data => data.ItemID == item.ItemID
                  ) != "" ? (
                    <Icona
                      name="heart"
                      type="font-awesome"
                      size={14}
                      color="red"
                      raised
                    />
                  ) : (
                    <Icona
                      name="heart"
                      type="feather"
                      size={14}
                      color="black"
                      raised
                    />
                  )}
                </TouchableOpacity>
                {/* <TouchableOpacity>
                <Icon
                  name="md-call"
                  size={30}
                  color="green"
                  onPress={() => this._pressCall(item.UserPhone)}
                />
              </TouchableOpacity> */}
              </View>
              <Image
                source={{
                  uri:
                    "http://ruppinmobile.tempdomain.co.il/site11/image/" +
                    item.ItemImg
                }}
                style={{
                  width: "100%",
                  height: "50%"
                }}
              />
              <View
                style={{
                  justifyContent: "space-around",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  height: "10%"
                }}
                onPress={() => {
                  this.infoWindow(index);
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 18,
                    fontFamily: "serif"
                  }}
                >
                  {item.ItemDate}
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontFamily: "serif",
                    fontSize: 18
                  }}
                >
                  {item.City}
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 18,
                    fontFamily: "serif"
                  }}
                >
                  {item.ItemName}
                </Text>
              </View>
              <View style={{ margin: 10, height: "20%" }}>
                <Text>{item.ItemAbout}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  height: "10%"
                }}
              ></View>
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
              <TouchableHighlight
                onPress={() =>
                  this.props.navigation.dispatch(DrawerActions.openDrawer())
                }
                style={styles.touchableHighlight}
                underlayColor={"rgba(0,0,0,0.8)"}
              >
                <Icona
                  iconStyle={{ marginEnd: "10%" }}
                  name="bars"
                  type="font-awesome"
                  color="white"
                  size={28}
                />
              </TouchableHighlight>
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
                  תרומות
                </Text>
              </View>
              <TouchableHighlight
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Image
                  source={require("../assets/TenYadLogo.png")}
                  style={styles.logo}
                />
              </TouchableHighlight>
            </View>
            <View
              style={{
                width: "100%",
                // height: "10%",
                // flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
                elevation: 15,
                justifyContent: "space-around"
              }}
            >
              <View style={{
    flexDirection: "row",
    width: 200,
    height: 40,
    alignItems: "center",
    borderColor: "black",
    borderBottomWidth: 1,
    marginTop: 5
  }}>
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
            // keyboardType="email-address"
            placeholder="חפש פריט"
            // placeholderTextColor="black"
            onChangeText={this.SearchItem}
            style={{ width: 200 }}
          />
        </View>
             
             <View style={{
                flexDirection: "row",
                elevation: 15,
                justifyContent: "space-around"
              }}>
            <Dropdown
                  label="קטגוריה"
                  itemColor="black"
                  dropdownMargins={{ min: 0, max: 10 }}
                  dropdownOffset={{ top: 0, left: 0 }}
                  containerStyle={{
                    width: "40%",
                    padding: 5,
                    marginTop: 10,
                    marginLeft: "5%"
                  }}
                  data={ItemTypes}
                  onChangeText={(value, index) =>{ this.FilterItemTypes(value,index)}}
                />
              <Dropdown
                label="איזור"
                itemColor="black"
                dropdownMargins={{ min: 0, max: 1 }}
                dropdownOffset={{ top: 0, left: 0 }}
                containerStyle={{ width: 100, padding: 5, marginTop: 10 }}
                data={Region}
                onChangeText={this.Region}
              />
             </View>
            
            </View>

            <ScrollView style={styles.scrollview}>{Items}</ScrollView>
          </View>
          <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 10,
                  // width: Dimensions.get("window").width - 85,
                  padding:5,
                  right:'5%',
                  alignItems:'center',
                  flexDirection: "row-reverse",
                  backgroundColor:'white',
                  borderRadius: 200,

                }}
              >
            
            <Image
            source={require("../assets/add-reminder.png")}
            style={{width:50,height:50,borderRadius:200}}
            />
              </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Contribution: {
      screen: Contribution,
      navigationOptions: {
        tabBarLabel: "תרומות",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icona
              color={tintColor}
              type="font-awesome"
              style={[{ color: tintColor }]}
              size={25}
              name="handshake-o"
            />
          </View>
        ),
        activeColor: "white",
        inactiveColor: "#46f6d7",
        barStyle: { backgroundColor: "#6495ed" }
      }
    },
    Publish: {
      screen: Publish,
      navigationOptions: {
        tabBarLabel: "תן חפץ",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={25}
              name={"ios-add-circle-outline"}
            />
          </View>
        ),
        activeColor: "white",
        inactiveColor: "#46f6d7",
        barStyle: { backgroundColor: "#67baf6" }
      }
    },
    Favorite: {
      screen: Favorite,
      navigationOptions: {
        tabBarLabel: "מועדפים",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={25}
              name={"ios-star-half"}
            />
          </View>
          // <TouchableOpacity>
          //   <Image style={{width:30,height:30}} source={require("../assets/Favorite1.png")}/>
          // </TouchableOpacity>
        ),
        activeColor: "white",
        inactiveColor: "#46f6d7",
        barStyle: { backgroundColor: "#6495ed" }
      }
    }
  },
  {
    initialRouteName: "Contribution",
    activeColor: "#f0edf6",
    inactiveColor: "#226557",
    barStyle: { backgroundColor: "#3BAD87" }
  }
);

export default createAppContainer(TabNavigator);
