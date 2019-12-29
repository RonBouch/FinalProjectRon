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
  ImageBackground,
  ScrollView
} from "react-native";
import styles from "../Components/StyleSheet";
import { Icon as Icona } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { DrawerActions } from "react-navigation-drawer";

export default class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      item: null,
      screenHeight: 0,
      userPhone: "",
      pageToShow: null,
      reloadPage: false
    };
  }

  // define a separate function to get triggered on focus
  onFocusFunction = () => {
    console.log("Call fetch Get Items .");
    this.GetItemsFromFavorite();
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
          let items = JSON.parse(result.d);
          if (items == null) {
            this.setState({
              //   message: "הרשמה נכשלה"
            });
            return;
          } else {
            this.setState({
              items: items
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
  infoWindow = (item, i) => {
    if (this.state.pageToShow == null || this.state.pageToShow != i) {
      this.setState({
        pageToShow: i,
        item: item
      });
    } else {
      this.setState({
        pageToShow: null,
        item: null
      });
    }
  };

  async FavoriteChack(item) {
    await this.setState({
      item: item
    });
    this.Favorite();
  }

  Favorite = () => {
    if (this.state.item.ItemID != null) {
      const data = {
        userid: global.user.UserID,
        itemid: this.state.item.ItemID
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
            let favorite = JSON.parse(result.d);
            this.GetItemsFromFavorite();
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

  async ReloadPage() {
    this.setState({ reloadPage: !this.state.reloadPage });
    // this.GetItemsFromFavorite();
  }
  render() {
    const { navigate } = this.props.navigation;

    //Doing alerts whern i come back to Favorite screen .!
    {
      /* <NavigationEvents onDidFocus={()=>alert("Hello, I'm focused!")} /> */
    }

    // const scrollEnabled = this.state.screenHeight > height ;

    let Items = [];
    console.log("test:", this.state.items);

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
              <TouchableOpacity onPress={() => this.FavoriteChack(item)}>
                <Icona
                  name="heart"
                  type="font-awesome"
                  size={14}
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
                  מועדפים
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

            {Items[0] != null ? (
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
                <Text>אין פריטים להצגה</Text>
              </View>
            )}

            {/* <View style={{ flex: 1, alignItems: "center" }}>
                  <Text>dfhrd</Text>
                </View> */}
          </View>
        </View>
      </ImageBackground>
    );
  }
}
