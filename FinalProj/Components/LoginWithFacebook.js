import * as Facebook from "expo-facebook";
import { Alert } from "react-native";

export default class LoginWithFacebook {
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
        //Alert.alert("Logged in!", `Hi ${await response.json()}!`);
        //console.log(response.json());
        // this.props.navigation.navigate("DrawerNavigator");
        let ret = { user: await response.json(), token: token };
        return ret;
      } else {
        // type === 'cancel'
        return;
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
      return;
    }
  }
}
