import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Linking,
  ScrollView,
  ImageBackground
} from "react-native";
import styles from "../Components/StyleSheet";
import { Icon as Icona } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { DrawerActions } from "react-navigation-drawer";
import { NavigationEvents } from "react-navigation";

import RadioForm from "react-native-simple-radio-button";
const { height } = Dimensions.get("window");
export default class ProfilePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      item: null,
      //   checkedB: true,
      screenHeight: 0,
      userPhone: "",
      pageToShow: null,
      reloadPage: false,
      LoadingFirstTime: false
    };
  }
  // define a separate function to get triggered on focus
  onFocusFunction = async () => {
    this.setState({
      LoadingFirstTime: false
    });
    this.GetItemsByID();
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

  GetItemsByID = async () => {
    const data = {
      userid: global.user.UserID
    };
    await fetch(
      "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/GetItemsByID",
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
          let items = JSON.parse(result.d);
          if (items == null) {
            this.setState({
              //   message: "הרשמה נכשלה"
            });
            return;
          } else {
            console.log("ITEMS ", items);
            this.setState({
              items: items,
              LoadingFirstTime: true
            });
          }
        },
        error => {
          console.log("err post=", error);
        }
      );
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };
  _pressCall = p => {
    this.setState({
      userPhone: p
    });
    const url = "tel:" + p;
    Linking.openURL(url);
  };

  // async DeleteItem(item) {
  //   await this.setState({
  //     item: item
  //   });
  //   this.DeleteItemByID();
  // }
  DeleteItemByID = item => {
    console.log("item = ", item);

    if (item.ItemID != null) {
      const data = {
        userid: global.user.UserID,
        itemid: item.ItemID
      };
      console.log("DATA = ", data);
      fetch(
        "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/DeleteItem",
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
            // console.log("fetch POST= ", result);

            let favorite = JSON.parse(result.d);
            this.GetItemsByID();
            console.log("YESYESTWS");
            if (favorite == -1) {
              console.log("Allready Exist this favorite");
              return;
            } else {
            }
            console.log(result.d);
            console.log(result);
          },
          error => {
            console.log("err post=", error);
          }
        );
    }
  };

  render() {
    //Doing alerts whern i come back to Favorite screen .!
    {
      /* <NavigationEvents onDidFocus={()=>alert("Hello, I'm focused!")} /> */
    }

    // const scrollEnabled = this.state.screenHeight > height ;
    const { navigate } = this.props.navigation;

    let Items = [];

    if (this.state.items != null) {
      Items = this.state.items.map((item, index) => {
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
              <TouchableOpacity onPress={() => this.DeleteItemByID(item)}>
                <Icona
                  name="trash"
                  type="font-awesome"
                  size={18}
                  color="red"
                  raised
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigate("EditPost", {
                    item: item
                  })
                }
              >
                <Icona
                  name="edit"
                  type="font-awesome"
                  size={20}
                  color="red"
                  raised
                />
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
                  הפרסומים שלי
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

            {Items.length != 0 ? (
              <ScrollView style={styles.scrollview}>
                <View style={{ flex: 1, alignItems: "center" }}>{Items}</View>
              </ScrollView>
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {this.state.LoadingFirstTime ? (
                  <Text>אין פריטים להצגה</Text>
                ) : (
                  <Image source={require("../assets/loading.gif")} />
                )}
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    );
  }
}
