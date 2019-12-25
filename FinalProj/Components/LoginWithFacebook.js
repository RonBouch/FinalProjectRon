import React from "react";
import * as Facebook from "expo-facebook";
import { Alert } from "react-native";
import registerForPushNotificationsAsync from "./registerForPushNotificationsAsync";

export default class LoginWithFacebook extends React.Component {
constructor(props) {
  super(props);
  this.state={
    notification:"",
  }
}

  componentDidMount() {
   console.log("FAce BOOOKK LOGIN")
     registerForPushNotificationsAsync().then(tok => {
      this.setState({ token: tok });
    });
    console.log("Token   = " + this.state.tok);
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
    this.FacebookLogin();

  }
  _handleNotification = notification => {
    this.setState({ notification: notification });
  };

  btnSendPushFromClient = () => {
    let per = {
      to: this.state.token,
      title: "תודה שנכנסת שוב :)",
      body: "מצא את הדירה שלך עכשיו!",
      badge: 3,
      data: { name: "nir", grade: 100 }
    };

    // POST adds a random id to the object sent
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      body: JSON.stringify(per),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json != null) {
          console.log(`
                returned from server\n
                json.data= ${JSON.stringify(json.data)}`);
        } else {
          alert("err json");
        }
      });
  };
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
      

        const user = await response.json();
        // console.log("user =", user);

        // this.setState({
        //   firstName: user.name,
        //   image: user.picture.data.url,
        //   email: user.email
        // });
        const data = {
          firstName: user.name,
          lastName: "",
          email: user.email,
          password: "Facebook",
          gender: "Facebook",
          birthday: "1900-01-01",
          image: user.picture.data.url
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
                // this.storeData("user", u);
                this.btnSendPushFromClient();
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
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };
}
