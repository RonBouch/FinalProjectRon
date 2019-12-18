import React from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  AsyncStorage
} from "react-native"
// import * as Expo from "expo"
import * as Google from 'expo-google-app-auth'
import { setProvidesAudioData } from "expo/build/AR";
//import Expo from "expo"

const WSURL = "http://ruppinmobile.tempdomain.co.il/site11//WebServise.asmx/Register";

export default class LoginWithGoogle extends React.Component {
  constructor(props) {
    super(props)
    global.user = null;

    this.state = {
      signedIn: false,
      FirstName: "",
      lastname: "",
      photoUrl: "",
      Email: "",
      password: "",
      gender: "",
      birthday: null,
      image: null,
    }
  }
  componentDidMount() {
    this.signIn();
  }
  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: "135412253455-6ep88ehld8lcfch6g6ik6llgk326m3fj.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ["profile", "email"]
      })
      // console.log("Google Details - ", result)
      if (result.type === "success") {
        this.setState({
          signedIn: true,
          FirstName: result.user.givenName,
          lastname: result.user.familyName,
          photoUrl: result.user.photoUrl,
          Email: result.user.email,
          image: result.user.photoUrl


        })

      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
    const data = {
      firstName: this.state.FirstName,
      lastName: this.state.lastname,
      email: this.state.Email,
      password: "Google",
      gender: "Google",
      birthday: "1900-01-01",
      image: this.state.image
    };
    fetch(
        "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/RegisterWithGoogle", {
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
            this.props.navigation.navigate('FirstPage');

            return;
          } else {
            // console.log("U = " ,u);
            global.user = u;
            this.storeData('user',u);
            this.props.navigation.navigate('DrawerNavigator');
          }
          console.log(result.d);
          console.log(result);
        },
        error => {
          console.log("err post=", error);
        }
      );
  };

  storeData = async(key,value)=>{
    console.log('value ->', JSON.stringify(value));
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  render() {
    return (
       <View style = {styles.container } >
      {this.state.signedIn ? ( 
        <LoggedInPage FirstName = {this.state.FirstName}
          photoUrl = {this.state.photoUrl}
          Email = {this.state.Email} />
        ) : 
        (
          //   <LoginPage signIn={this.signIn} />
          null
        )
      }
       </View>
    )
  }
}

const LoginPage = props => {
  return ( 
  <View>
    <View style = {{alignItems: 'center'}} >
    <Image source = {require("../assets/Google.png")}
    style = {{
        width: 200,
        height: 200,
        marginTop: "15%"
      }
    }
    resizeMode = "contain" />
    </View>
    <Text style = {styles.header}> Sign In With Google </Text> 
    <Button title = "Sign in with Google" onPress = {() => props.signIn()}/> 
    </View>
  )
}

const LoggedInPage = props => {
  return ( <View style = {
      styles.container
    } >
    <Text style = {styles.header}> Welcome: {props.FirstName} email: {props.Email} </Text>

    <Image style = {
      styles.image
    }
    source = {{uri: props.photoUrl}}/> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25,
    paddingTop: 30,
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
})