import React from "react";
import styles from "../Components/StyleSheet";
import { Ionicons } from "@expo/vector-icons";
import Login from "./Login";
import Register from "./Register";
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
// import registerForPushNotificationsAsync from "./registerForPushNotificationsAsync.js";
import { Notifications, Permissions } from "expo";

import { Icon } from "react-native-elements";

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AuthSession } from "expo";
export default class FirstPage extends React.Component {
  constructor(props) {
    super(props);
    this.password = "";
    this.email = "";
    this.vaildForm = false;
    (global.id = 0),
      (global.firstName = ""),
      (global.lastName = ""),
      (global.email = ""),
      (global.password = ""),
      (global.birthday = ""),
      (global.gender = ""),
      (this.state = {
        message: ""
      });
    this.state = {
      token: "",
      txtToken: "",
      notification: {},
      LoginRegister: true
    };
  }

  // componentDidMount() {
  //   registerForPushNotificationsAsync().then(tok => {
  //     this.setState({ token: tok });
  //   });
  //   console.log("Token   = " + this.state.tok);
  //   this._notificationSubscription = Notifications.addListener(
  //     this._handleNotification
  //   );
  // }
  // _handleNotification = notification => {
  //   this.setState({ notification: notification });
  // };

  // btnSendPushFromClient = () => {
  //   let per = {
  //     to: this.state.token,
  //     title: "תודה שנכנסת שוב :)",
  //     body: "מצא את הדירה שלך עכשיו!",
  //     badge: 3,
  //     data: { name: "nir", grade: 100 }
  //   };

  //   // POST adds a random id to the object sent
  //   fetch("https://exp.host/--/api/v2/push/send", {
  //     method: "POST",
  //     body: JSON.stringify(per),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8"
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(json => {
  //       if (json != null) {
  //         console.log(`
  //               returned from server\n
  //               json.data= ${JSON.stringify(json.data)}`);
  //       } else {
  //         alert("err json");
  //       }
  //     });
  // };
  changePass = e => {
    this.password = e;
  };

  changeEmail = e => {
    this.email = e;
  };

  changeToRegister = () => {
    this.setState({ LoginRegister: false });
  };

  changeToLogin = () => {
    this.setState({ LoginRegister: true });
  };

  validation = () => {
    // this.props.navigation.navigate("HomeScreen");

    if (this.email == "") {
      this.setState({ message: "* אנא הכנס כתובת אימייל" });
    } else if (this.password == "") {
      this.setState({ message: "* אנא הכנס סיסמא" });
    } else {
      this.vaildForm = true;
      this.login();
    }
  };

  login = () => {
    if (this.vaildForm) {
      const data = {
        password: this.password,
        email: this.email
      };
      console.log(data);
      fetch(
        "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/Login",
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
            let u = JSON.parse(result.d);
            console.log("u = " + u);
            if (u == null) {
              console.log("ASffasasf");
              this.setState({
                message: "התחברות נכשלה"
              });
              return;
            } else {
              // this.btnSendPushFromClient();
              global.id = u.UserID;
              global.firstName = u.FirstName;
              global.lastName = u.LastName;
              global.email = u.Email;
              global.password = u.Password;
              global.birthday = u.Birthday;
              global.gender = u.Gender;
              global.image = u.Image;

              this.props.navigation.navigate("DrawerNavigator");
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

  RegisterBtn = () => {
    this.props.navigation.navigate("Register");
  };

  // FaceBookBtn = () => {
  //   this.props.navigation.navigate("FaceBookPage");
  // };

  // GoogleBtn = () => {
  //   this.props.navigation.navigate("GooglePage");
  // };

  render() {
    return (
      <View style={styles.firstPageContainer}>
        <View style={styles.form}>
          <Image
            source={require("../assets/TenYadLogo.png")}
            style={{ height: 120, width: 120 }}
          />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={this.changeToLogin}>
              <Text
                style={
                  this.state.LoginRegister
                    ? styles.linebottom
                    : {
                        margin: 20,
                        color: "rgba(255,255,255,.9)",
                        fontWeight: "bold",
                        fontSize: 25,
                        fontFamily: "serif",
                        textShadowColor: "black",
                        textShadowOffset: { width: 1, height: 4 },
                        textShadowRadius: 5
                      }
                }
              >
                התחברות
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.changeToRegister}>
              <Text
                style={
                  !this.state.LoginRegister
                    ? styles.linebottom
                    : {
                        margin: 20,
                        color: "rgba(255,255,255,.9)",
                        fontWeight: "bold",
                        fontSize: 25,
                        fontFamily: "serif",
                        textShadowColor: "black",
                        textShadowOffset: { width: 1, height: 4 },
                        textShadowRadius: 5
                      }
                }
              >
                הרשמה
              </Text>
            </TouchableOpacity>
          </View>
          {this.state.LoginRegister ? <Login /> : <Register />}
        </View>
      </View>
    );
  }
}
