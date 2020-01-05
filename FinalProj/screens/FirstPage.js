import React from "react";
import styles from "../Components/StyleSheet";
import Login from "./Login";
import Register from "./Register";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
  Image,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";
import { getLightEstimationEnabled } from "expo/build/AR";

export default class FirstPage extends React.Component {
  constructor(props) {
    super(props);
    global.user = null;

    this.state = {
      LoginRegister: true
    };
  }
  static navigationOptions = {
    drawerLabel: "FirstPage"
  };

  componentDidMount() {
    this.retriveData("user");
  }

  retriveData = async () => {
    let u = await AsyncStorage.getItem("user");
    // console.log('u->>',u);
    if (u != null) {
      global.user = JSON.parse(u);
      this.props.navigation.navigate("DrawerNavigator");
    }
  };


  changeToRegister = () => {
    this.setState({ LoginRegister: false });
  };

  changeToLogin = () => {
    this.setState({ LoginRegister: true });
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/background.jpg")}
        style={styles.imageBackground}
      >
        <View style={styles.firstPageContainer}>
          <View style={styles.form}>
            <Image
              source={require("../assets/TenYadLogo.png")}
              style={s.logoStyle}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={this.changeToLogin}>
                <Text
                  style={
                    this.state.LoginRegister
                      ? styles.LoginRegisterSelected
                      : styles.LoginRegisterNotSelected
                  }
                >
                  התחברות
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.changeToRegister}>
                <Text
                  style={
                    !this.state.LoginRegister
                      ? styles.LoginRegisterSelected
                      : styles.LoginRegisterNotSelected
                  }
                >
                  הרשמה
                </Text>
              </TouchableOpacity>
            </View>
            {this.state.LoginRegister ? <Login /> : <Register />}
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const s =StyleSheet.create({
  logoStyle:{
    height: 120, width: 120
  },
});