import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ImageBackground,
  ScrollView
} from "react-native";
import styles from "../Components/StyleSheet";
import { Icon as Icona } from "react-native-elements";
import { DrawerActions } from "react-navigation-drawer";

export default class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      item: null,
      screenHeight: 0,
      userPhone: "",
      reloadPage: false,
      LoadingFirstTime:false,
    
    };
  }

  // define a separate function to get triggered on focus
  onFocusFunction = () => {
     this.setState({
     LoadingFirstTime:false
     })
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
              items: items,
              LoadingFirstTime:true
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
  }
  render() {
    const { navigate } = this.props.navigation;
    let Items = [];
    if (this.state.items != null) {
      Items = this.state.items.map((item, index) => {
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
              <TouchableOpacity onPress={() => this.FavoriteChack(item)}>
                <Icona
                  name="heart"
                  type="font-awesome"
                  size={14}
                  color="red"
                  raised
                />
              </TouchableOpacity>
            </View>
            <View style={styles.viewImageStyle}>
              <Image
                source={{
                  uri:
                    "http://ruppinmobile.tempdomain.co.il/site11/imageStorage/" +
                    0 +
                    item.ItemImg+
                    "?time" +
                    new Date()
                }}
                style={styles.imageStyle} />
            </View>

            <View
              style={styles.viewDetails}
            >
              <View style={styles.viewTitle} >
                <Text style={styles.txtTitle}>תאריך</Text>
                <Text  style={styles.txtDetails} >
                  {item.ItemDate}
                </Text>
              </View>
              <View style={styles.viewTitle} >
                <Text style={styles.txtTitle}>עיר</Text>

                <Text style={styles.txtDetails} >
                  {item.City}
                </Text>
              </View>
              <View style={styles.viewTitle} >
                <Text style={styles.txtTitle}>למסירה</Text>
                <Text style={styles.txtDetails} >
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
              <View  style={styles.textTopBar} >
                <Text style={styles.bigText}>
                  המועדפים שלי
                </Text>
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

            {Items[0] != null ? (
              <ScrollView style={styles.scrollview}>
                <View style={styles.viewItems}>
                {Items}
                </View>
              </ScrollView>
            ) : (
              <View
                style={styles.viewNoItems}
              >
              {this.state.LoadingFirstTime ?
                <Text>אין פריטים להצגה</Text>
                :
                <Image source={require("../assets/loading.gif")}/>
                }           
                   </View>
            )}
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const s = StyleSheet.create({


});