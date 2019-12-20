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
import { NavigationEvents } from "react-navigation";

import RadioForm from "react-native-simple-radio-button";
const { height } = Dimensions.get("window");
export default class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      item: null,
      //   checkedB: true,
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
      userid:global.user.UserID
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
    // console.log("state item ", this.state.item.ItemID);

    if (this.state.item.ItemID != null) {
      const data = {
        userid: 1,
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
            // console.log("fetch POST= ", result);

            let favorite = JSON.parse(result.d);
            this.GetItemsFromFavorite();
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

  async ReloadPage() {
    this.setState({ reloadPage: !this.state.reloadPage });
    // this.GetItemsFromFavorite();
  }
  render() {
    //Doing alerts whern i come back to Favorite screen .!
    {
      /* <NavigationEvents onDidFocus={()=>alert("Hello, I'm focused!")} /> */
    }

    // const scrollEnabled = this.state.screenHeight > height ;

    let Items = [];

    if (this.state.items != null) {
      Items = this.state.items.map((item, index) => {
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
            <Image
              source={{
                uri:
                  "http://ruppinmobile.tempdomain.co.il/site11/image/" +
                  item.ItemImg
              }}
              style={{
                width: "100%",
                height: "60%"
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
                  מועדפים
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

            <ScrollView style={styles.scrollview}>
              <View style={{ flex: 1, alignItems: "center" }}>{Items}</View>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
