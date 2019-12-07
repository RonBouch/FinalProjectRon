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
import { withNavigation } from "react-navigation";

import { Icon } from "react-native-elements";

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AuthSession } from "expo";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.password = "";
    this.email = "";
    this.vaildForm = false;
    global.user = null;
    this.state = {
      message: ""
    };
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
              global.user = u;

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
      <View style={{ alignItems: "center" }}>
        <View style={styles.input}>
          <Icon
            iconStyle={{
              marginEnd: "10%"
            }}
            name="envelope"
            type="font-awesome"
            color="white"
            size={18}
          />
          <TextInput
            keyboardType="email-address"
            placeholder="אימייל"
            placeholderTextColor="rgba(255,255,255,.7)"
            onChangeText={this.changeEmail}
            style={{ width: 150 }}
          />
        </View>

        <View style={styles.input}>
          <Icon
            iconStyle={{ marginEnd: "10%" }}
            name="lock"
            type="font-awesome"
            color="white"
            size={22}
          />
          <TextInput
            secureTextEntry={true}
            placeholder="סיסמא"
            maxLength={12}
            placeholderTextColor="rgba(255,255,255,.7)"
            onChangeText={this.changePass}
            style={{ width: 150 }}
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={this.validation}>
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>
            התחבר{"  "}
          </Text>
          <Icon name="login" type="antdesign" color="white" size={20} />
        </TouchableOpacity>

        <Text style={styles.textMessage}>{this.state.message}</Text>

        <View style={{ marginTop: 20 }}>
          <Text style={{ color: "white" }}>
            {"_________   "}או התחבר באמצעות{"    _________"}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            // onPress={() => this.props.navigation.navigate("GooglePage")}
            style={{ margin: 20 }}
          >
            <Image
              source={require("../assets/googleIcon.png")}
              style={{ height: 55, width: 55, marginTop: 8 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={this.FaceBookBtn} style={{ margin: 20 }}>
            <Image
              source={require("../assets/facebookIcon2.png")}
              style={{ height: 70, width: 70 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default withNavigation(Login);
