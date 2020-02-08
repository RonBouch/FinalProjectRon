import React, { Component } from "react";
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  ScrollView,
  Linking,
  TextInput,
  StyleSheet
} from "react-native";
import region from "../region";
import { Dropdown } from "react-native-material-dropdown";
import { DrawerActions } from "react-navigation-drawer";
import styles from "../Components/StyleSheet";
import { Icon as Icona } from "react-native-elements";

export default class PostListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      items: null,
      dataItems: null,
      filterItemsByRegion: null,
      filterItemsByType: null,
      itemsFromFavorite: null,
      searchItem: "",
      itemTypes: [],
      remindView: false,
      nameToRemind: "",
      reminders: null,
      LoadingFirstTime: false
    };
    _isMounted = false;
  }
  static navigationOptions = {
    drawerLabel: "PostListPage"
  };

  // define a separate function to get triggered on focus
  onFocusFunction = async () => {
    _isMounted = true;

    await this.GetItems();
  };

  // add a focus listener onDidMount
  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.onFocusFunction();
    });
  }

  componentWillUnmount() {
    _isMounted = false;
    this.focusListener.remove();
  }

  AddReminder() {
    const data = {
      itemName: this.state.nameToRemind,
      userid: global.user.UserID,
      token: global.user.Token
    };
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
      this.setState({ remindView: false });

      return res.json();
    }),
      error => {
        console.log("err post=", error);
      };
  }
  GetReminders = async () => {
    const idToSend = {
      userid: 0
    };
    fetch(
      "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/GetReminders",
      {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/Json;"
        }),
        body: JSON.stringify(idToSend)
      }
    )
      .then(res => {
        return res.json();
      })
      .then(
        result => {

          if (_isMounted) {
            let reminders = JSON.parse(result.d);
            if (reminders == null) {
              this.setState({
                message: "לא קיימים סוגי פריטים"
              });
              return;
            }
             else {

              this.setState({
                reminders: reminders
              });

              if (
                this.state.items[0] != null &&
                this.state.items[0].Reminder == ""
              ) {
                data = reminders.filter(re => {
                  return re.ItemName.includes(this.state.items[0].ItemName);
                });
                for (i = 0; i < data.length; i++) {

                  this.SendPushFromClient(data[i]);
                }
              }
            }
          }
        },
        error => {
          console.log("err post=", error);
        }
      );
  };
  SendPushFromClient = R => {
    let per = {
      name: "תן יד",
      to: R.Token,
      title: "היי מישהו העלה - " + R.ItemName + "\n",
      body: "כנס עכשיו לראות !",
      badge: 3,
      backgroundColor: "black"

    };

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
                returned Push from server\n
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
          if (_isMounted) {
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
          }
        },
        error => {
          console.log("err post=", error);
        }
      );
  };

  GetItems = async () => {
    this.setState({
      LoadingFirstTime: false
    });
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
        return res.json();
      })
      .then(
        result => {
          if (_isMounted) {
            let items = JSON.parse(result.d);
            if (items == null) {
              this.setState({
                message: "הרשמה נכשלה",
                LoadingFirstTime: true
              });
              return;
            } else {
              this.setState({
                dataItems: items,
                items: items
              });
              this.GetItemsFromFavorite();
            }
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
          if (_isMounted) {
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
          }
        },
        error => {
          console.log("err post=", error);
        }
      );
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
        return res.json();
      })
      .then(
        result => {
          this.GetItems();
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
          return (
            item.ItemType == typeId &&
            item.Region == this.state.filterItemsByRegion
          );
        });
      } else {
        typeId = this.state.itemTypes[index].ItemTypeID;
        data = this.state.dataItems.filter(item => {
          return item.ItemType == typeId;
        });
      }
      if (data.length == 0) {
        this.setState({ LoadingFirstTime: true });
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
      if (data.length == 0) {
        this.setState({ LoadingFirstTime: true });
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
              style={styles.contributionView}
              onPress={() =>
                navigate("PostSelectedPage", {
                  item: item
                })
              }
            >
              <View style={styles.heartIconStyle}>
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
              </View>
              <View style={styles.viewImageStyle}>
                <Image
                  source={{
                    uri:
                      "http://ruppinmobile.tempdomain.co.il/site11/imageStorage/" +
                      0 +
                      item.ItemImg +
                      "?time" +
                      new Date()
                  }}
                  style={styles.imageStyle}
                />
              </View>
              <View
                style={styles.viewDetails} >
                <View style={styles.viewTitle}>
                  <Text style={styles.txtTitle}>תאריך</Text>
                  <Text style={styles.txtDetails}>{item.ItemDate}</Text>
                </View>
                <View style={styles.viewTitle}>
                  <Text style={styles.txtTitle}>עיר</Text>
                  <Text style={styles.txtDetails}>{item.City}</Text>
                </View>
                <View style={styles.viewTitle}>
                  <Text style={styles.txtTitle}>למסירה</Text>
                  <Text style={styles.txtDetails}>{item.ItemName}</Text>
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
              <View style={styles.textTopBar}>
                <Text style={styles.bigText}>תרומות</Text>
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("HomePage")}
              >
                <Image
                  source={require("../assets/TenYadLogo.png")}
                  style={styles.logo}
                />
              </TouchableOpacity>
            </View>

            <View style={s.optionView}>
              <View style={s.searchView}>
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
                  style={s.searchTxtInput}
                />
              </View>
              <View style={s.filteringView}>
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

            {Items.length != 0 ? (
              <ScrollView style={styles.scrollview}>
                <View style={styles.viewItems}>{Items}</View>
              </ScrollView>
            ) : (
              <View style={styles.viewNoItems}>
                {this.state.LoadingFirstTime ? (
                  <Text>אין פריטים להצגה</Text>
                ) : (
                  <Image source={require("../assets/loading.gif")} />
                )}
              </View>
            )}
          </View>
          {this.state.remindView ? (
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,.8)"
              }}
            >
              <View
                style={{
                  backgroundColor: "#6495ed",
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
                    right: 0
                  }}
                >
                  <Image
                    source={require("../assets/x.png")}
                    style={{ width: 40, height: 40 }}
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
                  לעדכן אותך ?
                </Text>
                <Text style={{ textAlign: "center", padding: 5 }}>
                  אנא הזן את שם הפריט ואנו נעדכן ברגע שיעלה פרסום רלוונטי
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                    width: "70%",
                    borderBottomWidth: 0.5,
                    borderColor: "white"
                  }}
                >
                  <Icona
                    name="edit"
                    type="font-awesome"
                    color="white"
                    size={24}
                  />
                  <TextInput
                    placeholderTextColor="rgba(255,255,255,.5)"
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
                    style={{
                      backgroundColor: "rgb(117, 9, 1)",
                      flexDirection: "row",
                      elevation: 10,
                      height: 45,
                      marginTop: 30,
                      width: 180,
                      borderRadius: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      borderColor: "white"
                    }}
                  >
                    <Text style={{ color: "white" }}>תעדכן אותי !</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            console.log(" ")
          )}

          <TouchableOpacity
            onPress={() => this.setState({ remindView: true })}
            style={s.reminderTouch}
          >
            <Image
              source={require("../assets/add-reminder.png")}
              style={s.reminderImg}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const s = StyleSheet.create({
  optionView: {
    width: "100%",
    height: "15%",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 15
  },
  searchView: {
    flexDirection: "row",
    width: 200,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderBottomWidth: 0.4
  },
  searchTxtInput: {
    fontSize: 12,
    width: 200
  },
  filteringView: {
    flexDirection: "row",
    marginTop: 20,
    width: "100%",
    justifyContent: "space-around"
  },
  reminderTouch: {
    position: "absolute",
    bottom: 10,
    padding: 5,
    right: "5%",
    alignItems: "center",
    flexDirection: "row-reverse",
    backgroundColor: "white",
    borderRadius: 200
  },
  reminderImg: {
    width: 50,
    height: 50,
    borderRadius: 200
  }
});
