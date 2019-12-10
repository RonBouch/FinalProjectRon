import React from "react";
import styles from "../Components/StyleSheet";
import Login from "./Login";
import Register from "./Register";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,AsyncStorage,
  Image
} from "react-native";

export default class FirstPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      LoginRegister: true
    };
  }
  componentWillMount(){
  // AsyncStorage.clear();
}
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
              style={{ height: 120, width: 120 }}
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
