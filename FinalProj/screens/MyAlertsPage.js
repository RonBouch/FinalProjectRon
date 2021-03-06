import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  Image,
  StyleSheet
} from "react-native";
import { DrawerActions } from "react-navigation-drawer";
import styles from "../Components/StyleSheet";
import { Icon as Icona } from "react-native-elements";
import { Icon } from "react-native-elements";

export default class Reminders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: null,
      LoadingFirstTime:false,
    };
  }

  onFocusFunction = () => {
    this.setState({
      LoadingFirstTime:false,
    })
    this.GetReminders();
  };

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.onFocusFunction();
    });
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }
  DeleteReminder = item => {

    if (item.UserID != null) {
      const data = {
        userid: global.user.UserID,
        itemName: item.ItemName
      };
      fetch(
        "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/DeleteReminder",
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
            let Del = JSON.parse(result.d);
            if (Del == -1) {
              this.GetReminders();
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

  GetReminders = async () => {
    const data = {
      userid: global.user.UserID,
    };
    fetch(
      "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/GetReminders",
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
          let reminders = JSON.parse(result.d);
          if (reminders == null) {
            this.setState({
              message: "לא קיימים סוגי פריטים"
            });
            return;
          } else {
            this.setState({
              reminders: reminders,
              LoadingFirstTime:true

            });
          }
        },
        error => {
          console.log("err post=", error);
        }
      );
  };
  render() {
    let Items = [];

    if (this.state.reminders != null) {
      Items = this.state.reminders.map((item, index) => {
        
          return (
            <View
              key={index}
              style={s.viewReminder}>
              <Text style={s.txtReminderName}>{item.ItemName}</Text>

              <TouchableOpacity
                onPress={() => this.DeleteReminder(item)}
                style={{ marginLeft: 20 }}
              >
                <Icon
                  name="bell-slash"
                  type="font-awesome"
                  color="white"
                  size={24}
                />
              </TouchableOpacity>
            </View>
          );
        }
      );
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
                <Text style={styles.bigText}>
                  ההתראות שלי
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
            {Items.length!=0 ? (
              <View style={styles.viewItems}>
                {Items}
              </View>
            ) : (
              <View style={styles.viewNoItems}>
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
const s =StyleSheet.create({
viewReminder:{
  marginTop: 10,
  flexDirection: "row",
  backgroundColor: "#6495ed",
  borderColor: "white",
  borderWidth: 1,
  borderRadius: 20,
  padding: 10,
  height: 40,
  elevation: 5,
  justifyContent: "space-around",
  alignItems: "center"
},
txtReminderName:{
  color: "white"
}
});