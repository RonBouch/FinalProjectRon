import React from "react";
import styles from "../Components/StyleSheet";
import { Ionicons } from "@expo/vector-icons";
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
export default class Login extends React.Component {
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
      notification: {}
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

  validation = () => {
    this.props.navigation.navigate("HomeScreen");

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
              global.id = u.ID;
              global.firstName = u.FirstName;
              global.lastName = u.LastName;
              global.email = u.Email;
              global.password = u.Password;
              global.birthday = u.Birthday;
              global.gender = u.Gender;
              this.props.navigation.navigate("S1");
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
    //   <ImageBackground
    //     source={require("../assets/background2.jpg")}
    //     style={styles.backgroundImage}
    //   >
        <View style={styles.container}>
          <View style={styles.main}>
            <View style={styles.logo}>
              {/* <Image
                source={require("../assets/houseLogo.png")}
                style={{ width: "100%", height: "100%", marginTop: "15%" }}
                resizeMode="contain"
              /> */}
            </View>
            <View style={styles.loginForm}>
              <View style={styles.input}>
                <Icon
                  iconStyle={{ marginEnd: "10%" }}
                  name="envelope"
                  type="font-awesome"
                  color="gray"
                  size={28}
                />
                <TextInput
                  keyboardType="email-address"
                  placeholder="אימייל"
                  onChangeText={this.changeEmail}
                  style={{ width: 150 }}
                />
              </View>
              <View style={styles.input}>
                <Icon
                  iconStyle={{ marginEnd: "10%" }}
                  name="lock"
                  type="font-awesome"
                  color="gray"
                  size={35}
                />
                <TextInput
                  secureTextEntry={true}
                  placeholder="סיסמא"
                  onChangeText={this.changePass}
                  style={{ width: 150 }}
                />
              </View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={this.validation}
              >
                <Text>התחבר</Text>
              </TouchableOpacity>

              <Text style={styles.textMessage}>{this.state.message}</Text>
            </View>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={this.RegisterBtn}
            >
              <Text>
                הרשמה
                {"  "}
              </Text>
              <Icon
                name="user-plus"
                type="font-awesome"
                color="black"
                size={18}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("GooglePage")}
              style={styles.googleButton}
            >
              <Text style={styles.buttonText}>
                {"  "}
                Google
              </Text>
              <Icon
                name="logo-googleplus"
                type="ionicon"
                color="white"
                size={24}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.FaceBookBtn}
              style={styles.faceBookButton}
            >
              <Text style={styles.buttonText}>
                {"  "}
                FaceBook
              </Text>
              <Icon
                name="facebook-square"
                type="font-awesome"
                color="white"
                size={18}
              />
            </TouchableOpacity>
          </View>
        </View>
    //   </ImageBackground>
    );
  }
}