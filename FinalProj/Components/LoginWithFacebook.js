import React from "react";
import * as Facebook from "expo-facebook";
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

  static async FacebookLogin() {
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
        if(user!=null){
          const data = {
            firstName: user.name,
            lastName: "",
            email: user.email ,
            password: "Facebook",
            image:user.picture.data.url 
          };
          console.log("DAta To DB",data)
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
                console.log("u   -- > ",u)
                if (u == null) {
                  this.props.navigation.navigate("FirstPage");
      
                  return;
                } else {
                  // console.log("U = " ,u);
                  global.user = u;
                  // this.storeData("user", u);
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
      
        return;
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }

    
  }
}
