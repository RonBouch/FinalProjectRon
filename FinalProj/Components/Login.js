import React from "react";
import * as Facebook from "expo-facebook";

import styles from "./StyleSheet";
import { Ionicons } from "@expo/vector-icons";
import { LoginButton, AccessToken } from "react-native-fbsdk";
import * as Google from "expo-google-app-auth";

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
  AsyncStorage
} from "react-native";
import registerForPushNotificationsAsync from "./registerForPushNotificationsAsync";
import { Notifications } from "expo";
import { Permissions } from "expo-permissions";
import { withNavigation } from "react-navigation";

import { Icon } from "react-native-elements";

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
      LoginRegister: true
    };
  }

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
          return res.json();
        })
        .then(
          result => {
            let u = JSON.parse(result.d);
            if (u == null) {
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
  GoogleLogin = async () => {
    let result = null;
    await registerForPushNotificationsAsync().then(tok => {
      this.setState({ token: tok });
    });
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
    try {
      result = await Google.logInAsync({
        androidClientId:
          "135412253455-6ep88ehld8lcfch6g6ik6llgk326m3fj.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ["profile", "email"]
      });
      console.log("Google Details - ", result);
    } catch (e) {
      console.log("error", e);
    }
    if (result != null) {
      const data = {
        firstName: result.user.givenName,
        lastName: result.user.familyName,
        email: result.user.email,
        password: "Google",
        gender: "Google",
        birthday: "1900-01-01",
        image: result.user.photoUrl,
        token: this.state.token
      };
      fetch(
        "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/RegisterWithGoogle",
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
            let u = JSON.parse(result.d);
            if (u == null) {
              this.props.navigation.navigate("FirstPage");

              return;
            } else {
              global.user = u;
              this.storeData("user", u);
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
  FacebookLogin = async () => {
    await registerForPushNotificationsAsync().then(tok => {
      this.setState({ token: tok });
    });
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "2363780303934516",
        {
          permissions: [
            "public_profile",
            "email",
            "user_birthday",
            "user_gender"
          ]
        }
      );
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?fields=gender,birthday,email,first_name,last_name,picture.type(large)&access_token=${token}`
        );
        const user = await response.json();
        var lParams = `access_token=${token}`;
        fetch(`https://graph.facebook.com/${user.id}/permissions`, {
          method: "DELETE",
          body: lParams
        });

        const data = {
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          password: "Facebook",
          gender: user.gender,
          birthday: user.birthday,
          image: user.picture.data.url,
          token: this.state.token
        };
        fetch(
          "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/RegisterWithFacebook",
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
              let u = JSON.parse(result.d);
              if (u == null) {
                this.props.navigation.navigate("FirstPage");

                return;
              } else {
                global.user = u;
                this.storeData("user", u);
                this.props.navigation.navigate("DrawerNavigator");
              }
              console.log(result.d);
              console.log(result);
            },
            error => {
              console.log("err post=", error);
            }
          );
        return;
      } else {
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  storeData = async (key, value) => {
    console.log("value ->", JSON.stringify(value));
    await AsyncStorage.setItem(key, JSON.stringify(value));
  };

  RegisterBtn = () => {
    this.props.navigation.navigate("Register");
  };

  logInFB = async () => {
    try {
      await Facebook.initializeAsync("2363780303934516");
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"]
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  render() {
    return (
      <View style={s.loginView}>
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
            style={s.txtInput}
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
            style={s.txtInput}
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={this.validation}>
          <Text style={s.btnTxt}>התחבר{"  "}</Text>
          <Icon name="login" type="antdesign" color="white" size={20} />
        </TouchableOpacity>

        <Text style={styles.textMessage}>{this.state.message}</Text>

        <View style={s.spaceGoogleFace}>
          <Text style={{ color: "white" }}>
            {"_________   "}או התחבר באמצעות{"    _________"}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={async () => {
              await this.GoogleLogin();
            }}
            style={s.spaceGoogleFace}
          >
            <Image
              source={require("../assets/googleIcon.png")}
              style={s.googleImg}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await this.FacebookLogin();
            }}
            style={s.spaceGoogleFace}
          >
            <Image
              source={require("../assets/facebookIcon2.png")}
              style={s.facebookImg}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default withNavigation(Login);
const s = StyleSheet.create({
  loginView: {
    alignItems: "center"
  },
  txtInput: {
    width: 150
  },
  btnTxt: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18
  },
  googleImg: {
    height: 55,
    width: 55,
    marginTop: 8
  },
  facebookImg: {
    height: 70,
    width: 70
  },
  spaceGoogleFace: {
    margin: 20
  }
});
