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
  TextInput
} from "react-native";
import region from "../region";
import { Dropdown } from "react-native-material-dropdown";
import { DrawerActions } from "react-navigation-drawer";
import styles from "../Components/StyleSheet";
import { Icon as Icona } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Publish from "../screens/Publish";
import Favorite from "../screens/Favorite";

export default class Contribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      items: null,
      dataItems: null,
      filterItemsByRegion: null,
      filterItemsByType: null,
      extraDetails: -1,
      showImg: false,
      checkedFavorite: false,
      itemsFromFavorite: null,
      searchItem: "",
      itemTypes: [],
      remindView: false,
      nameToRemind: "",
      reminders: null
    };
  }
  static navigationOptions = {
    drawerLabel: "Contribution"
  };


 // define a separate function to get triggered on focus
  onFocusFunction = async () => {
    await this.GetItems();
   
  };

  // add a focus listener onDidMount
  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.onFocusFunction();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }
  _pressCall = phone => {
    const url = "tel:" + phone;
    // console.log("url  asasds",url)
    Linking.openURL(url);
  };
  AddReminder() {
    const data = {
      itemName: this.state.nameToRemind,
      userid: global.user.UserID,
      token: global.user.Token
    };
    console.log("DAta - ", data);
    fetch(
      "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/AddReminder",
      {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/Json;"
        }),
        body: JSON.stringify(data)
      }
    ).then(res => {
      console.log("res=", res);
      this.setState({ remindView: false });

      return res.json();
    }),
      error => {
        console.log("err post=", error);
      };
  }
  GetReminders() {
    fetch(
      "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/GetReminders",
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
          let reminders = JSON.parse(result.d);
          if (reminders == null) {
            this.setState({
              message: "לא קיימים סוגי פריטים"
            });
            return;
          } else {
            this.setState({
              reminders: reminders
            });

            if (this.state.items[0]!=null&&this.state.items[0].Reminder == "") {
              data = reminders.filter(re => {
                return re.ItemName.includes(this.state.items[0].ItemName);
              });
              for (i = 0; i < data.length; i++) {
                this.SendPushFromClient(data[i]);
              }
            }
          }
        },
        error => {
          console.log("err post=", error);
        }
      );
  }
  SendPushFromClient = R => {
    let per = {
      name: "תן יד",
      to: R.Token,
      title: "היי מישהו העלה - " + R.ItemName + "\n",
      body: "כנס עכשיו לראות :)!",
      badge: 3,
      backgroundColor: "black"

      // data: { name: "nir", grade: 100 }
    };

    // POST adds a random id to the object sent
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      body: JSON.stringify(per),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json != null) {
          console.log(`
                returned from server\n
                json.data= ${JSON.stringify(json.data)}`);
        } else {
          alert("err json");
        }
      });
  };
  GetItemsFromFavorite = async () => {
    const data = {
      userid: global.user.UserID
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
              dataItems: items,
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
            this.GetReminders();
          }
        },
        error => {
          console.log("err post=", error);
        }
      );
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
      userid: global.user.UserID,
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
  };

  FilterItemTypes = (value, index) => {
    if (index != 0) {
      let data = null;
      let typeId = null;
      if (this.state.filterItemsByRegion != null) {
        typeId = this.state.itemTypes[index].ItemTypeID;

        data = this.state.dataItems.filter(item => {
          console.log(item);
          return (
            item.ItemType == typeId &&
            item.Region == this.state.filterItemsByRegion
          );
        });
      } else {
        typeId = this.state.itemTypes[index].ItemTypeID;

        data = this.state.dataItems.filter(item => {
          console.log(item);

          return item.ItemType == typeId;
        });
      }
      this.setState({ items: data, filterItemsByType: typeId });
    } else {
      if (this.state.filterItemsByRegion != null) {
        let data = this.state.dataItems.filter(item => {
          return item.Region == this.state.filterItemsByRegion;
        });
        this.setState({ items: data, filterItemsByType: null });
      } else {
        this.setState({ items: this.state.dataItems, filterItemsByType: null });
      }
    }
  };
  FilterByRegion = (value, index) => {
    if (index != 0) {
      let data = null;
      if (this.state.filterItemsByType != null) {
        data = this.state.dataItems.filter(item => {
          return (
            item.Region == value &&
            this.state.filterItemsByType == item.ItemType
          );
        });
      } else {
        data = this.state.dataItems.filter(item => {
          return item.Region == value;
        });
      }
      this.setState({ items: data, filterItemsByRegion: value });
    } else {
      if (this.state.filterItemsByType != null) {
        let data = this.state.dataItems.filter(item => {
          return item.ItemType == this.state.filterItemsByType;
        });
        this.setState({ items: data, filterItemsByRegion: null });
      } else {
        this.setState({
          items: this.state.dataItems,
          filterItemsByRegion: null
        });
      }
    }
  };
  render() {
    const { navigate } = this.props.navigation;

    let ItemTypes = [];
    let data = region;
    let Items = [];

    if (this.state.itemTypes != null) {
      this.state.itemTypes.map(type => {
        ItemTypes.push({ value: type.ItemType });
      });
    }

    if (this.state.items != null && this.state.itemsFromFavorite != null) {
      Items = this.state.items.map((item, index) => {
        if (item.ItemName.includes(this.state.searchItem)) {
          return (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: "white",
                width: "95%",
                height: 210,
                margin: 10,
                borderWidth: 1,
                borderColor: "#e6e6fa",
                elevation: 10
              }}
              onPress={() =>
                navigate("PostPage", {
                  item: item
                })
              }
            >
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
              <View style={{ height: "70%" }}>
                <Image
                  source={{
                    uri:
                      "http://ruppinmobile.tempdomain.co.il/site11/imageStorage/" +
                      0 +
                      item.ItemImg
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderTopLeftRadius: 100,
                    borderBottomRightRadius: 100
                  }}
                />
              </View>
              <View
                style={{
                  justifyContent: "space-around",
                  flexDirection: "row-reverse",
                  alignContant: "center",
                  height: "30%",
                  marginTop: 15
                }}
                onPress={() => {
                  this.infoWindow(index);
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ fontSize: 10, color: "gray" }}>תאריך</Text>
                  <Text
                    style={{
                      color: "#6495ed",
                      // fontWeight: "bold",
                      fontSize: 16
                      // fontFamily: "serif"
                    }}
                  >
                    {item.ItemDate}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ fontSize: 10, color: "gray" }}>עיר</Text>

                  <Text
                    style={{
                      color: "#6495ed",
                      // fontWeight: "bold",
                      // fontFamily: "serif",
                      fontSize: 16
                    }}
                  >
                    {item.City}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ fontSize: 10, color: "gray" }}>למסירה</Text>
                  <Text
                    style={{
                      color: "#6495ed",
                      fontSize: 16
                    }}
                  >
                    {item.ItemName}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
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
                <Icona
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
                  תרומות
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
              style={{
                width: "100%",
                height: "15%",
                alignItems: "center",
                backgroundColor: "white",
                elevation: 15
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: 200,
                  marginTop: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "black",
                  borderBottomWidth: 0.4
                }}
              >
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
                  placeholder="חפש פריט"
                  placeholderTextColor="black"
                  onChangeText={this.SearchItem}
                  style={{
                    fontSize: 12,
                    width: 200
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  width: "100%",
                  justifyContent: "space-around"
                }}
              >
                <Text>סינון לפי:</Text>
                <Dropdown
                  label="קטגוריה"
                  itemColor="black"
                  baseColor="black"
                  fontSize={12}
                  dropdownMargins={{ min: 0, max: 10 }}
                  dropdownOffset={{ top: 0, left: 0 }}
                  containerStyle={{ width: 100 }}
                  data={ItemTypes}
                  onChangeText={(value, index) => {
                    this.FilterItemTypes(value, index);
                  }}
                />
                <Dropdown
                  label="איזור"
                  itemColor="black"
                  baseColor="black"
                  fontSize={12}
                  dropdownMargins={{ min: 0, max: 10 }}
                  dropdownOffset={{ top: 0, left: 0 }}
                  containerStyle={{ width: 100 }}
                  data={data}
                  onChangeText={(value, index) => {
                    this.FilterByRegion(value, index);
                  }}
                />
              </View>
            </View>

            <ScrollView style={styles.scrollview}>{Items.length!=0?Items:
            <View style={{alignItems:'center',marginTop:40}}>
              <Text style={{alignItems:'center',fontSize:16}}>אין פריטים להצגה</Text>
            </View>
            }</ScrollView>
          </View>
          {this.state.remindView ? (
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row-reverse",
                backgroundColor: "rgba(255,255,255,.8)"
              }}
            >
              <View
                style={{
                  backgroundColor: "#add8e6",
                  width: "90%",
                  height: "30%",
                  alignItems: "center",
                  padding: 20,
                  borderRadius: 20
                }}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ remindView: false })}
                  style={{
                    position: "absolute",
                    // totp: 5,
                    right: 0,
                    alignItems: "center",
                    flexDirection: "row-reverse",
                    borderRadius: 200
                  }}
                >
                  <Image
                    source={require("../assets/x.png")}
                    style={{ width: 40, height: 40, borderRadius: 200 }}
                  />
                </TouchableOpacity>
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
                  להתריע לך ?
                </Text>
                <Text style={{ padding: 5 }}>
                  אנא רשום את שם הפריט שתרצה לקבל עבורו התרעה במידה ומישהו
                  יפרסם..
                </Text>

                <View style={styles.publushInput}>
                  <Icona
                    name="edit"
                    type="font-awesome"
                    color="rgb(150,150,150)"
                    size={24}
                  />
                  <TextInput
                    placeholderTextColor="rgb(150,150,150)"
                    maxLength={20}
                    style={{
                      marginLeft: "8%",
                      fontSize: 14
                    }}
                    placeholder="שם הפריט"
                    onChangeText={e => {
                      this.setState({ nameToRemind: e });
                    }}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => this.AddReminder()}
                    style={styles.publishButton}
                  >
                    <Text style={{ color: "white" }}>תתריע לי {"  "}</Text>
                    <Icona
                      name="upload"
                      type="font-awesome"
                      color="white"
                      size={18}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            console.log(" ")
          )}

          <TouchableOpacity
            onPress={() => this.setState({ remindView: true })}
            style={{
              position: "absolute",
              bottom: 10,
              // width: Dimensions.get("window").width - 85,
              padding: 5,
              right: "5%",
              alignItems: "center",
              flexDirection: "row-reverse",
              backgroundColor: "white",
              borderRadius: 200
            }}
          >
            <Image
              source={require("../assets/add-reminder.png")}
              style={{ width: 50, height: 50, borderRadius: 200 }}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

// const TabNavigator = createMaterialBottomTabNavigator(
//   {
//     Contribution: {
//       screen: Contribution,
//       navigationOptions: {
//         tabBarLabel: "תרומות",
//         tabBarIcon: ({ tintColor }) => (
//           <View>
//             <Icona
//               color={tintColor}
//               type="font-awesome"
//               style={[{ color: tintColor }]}
//               size={25}
//               name="handshake-o"
//             />
//           </View>
//         ),
//         activeColor: "white",
//         inactiveColor: "#46f6d7",
//         barStyle: { backgroundColor: "#6495ed" }
//       }
//     },
//     Publish: {
//       screen: Publish,
//       navigationOptions: {
//         gesturesEnabled: false,
//         tabBarLabel: "תן חפץ",
//         tabBarIcon: ({ tintColor }) => (
//           <View>
//             <Icon
//               style={[{ color: tintColor }]}
//               size={25}
//               name={"ios-add-circle-outline"}
//             />
//           </View>
//         ),
//         activeColor: "white",
//         inactiveColor: "#46f6d7",
//         barStyle: { backgroundColor: "#67baf6" }
//       }
//     },
//     Favorite: {
//       screen: Favorite,
//       navigationOptions: {
//         tabBarLabel: "מועדפים",
//         tabBarIcon: ({ tintColor }) => (
//           <View>
//             <Icon
//               style={[{ color: tintColor }]}
//               size={25}
//               name={"ios-star-half"}
//             />
//           </View>
//           // <TouchableOpacity>
//           //   <Image style={{width:30,height:30}} source={require("../assets/Favorite1.png")}/>
//           // </TouchableOpacity>
//         ),
//         activeColor: "white",
//         inactiveColor: "#46f6d7",
//         barStyle: { backgroundColor: "#6495ed" }
//       }
//     }
//   },
//   {
//     initialRouteName: "Contribution",
//     activeColor: "#f0edf6",
//     inactiveColor: "#226557",
//     barStyle: { backgroundColor: "#3BAD87" }
//   }
// );

// export default createAppContainer(TabNavigator);
