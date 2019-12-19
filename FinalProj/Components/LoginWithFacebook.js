import React from "react";
import * as Facebook from "expo-facebook";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  AsyncStorage
} from "react-native";
import { Alert } from "react-native";

export default class LoginWithFacebook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      image: "",
      email: "",
      password: "",
      birthday: null
    };
  }

  componentDidMount() {
    this.FacebookLogin();
  }

  FacebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "2363780303934516",
        {
          permissions: ["public_profile", "email"]
        }
      );

      //console.log("token=", token);
      console.log("type=", type);
      if (type === "success") {
        // Get the user's name using Facebook's Graph API

        const response = await fetch(
          `https://graph.facebook.com/me?fields=email,name,picture.type(large)&access_token=${token}`
        );
        // Alert.alert("Logged in!", `Hi ${await response.json()}!`);
        // console.log(await response.json());
        // this.props.navigation.navigate("DrawerNavigator");
        // return await response.json()

        const user = await response.json();
        // console.log("user =", user);

        this.setState({
          firstName: user.name,
          image: user.picture.data.url,
          email: user.email
        });
        return;
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }

    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: "Facebook",
      gender: "Facebook",
      birthday: "1900-01-01",
      image: this.state.image
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
            // console.log("U = " ,u);
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
  };
  render() {
    return (
      <View>
        <Text>sfhf</Text>
      </View>
    );
  }
}
