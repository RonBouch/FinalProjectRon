import React, { Component } from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import FirstPage from "./Screens/FirstPage";
import DrawerNavigator from "./Components/DrawerNavigator";
import LoginWithFacebook from "./Components/LoginWithFacebook";
import LoginWithGoogle from "./Components/LoginWithGoogle";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}

const MainNavigator = createStackNavigator(
  {
    FirstPage: {
      screen: FirstPage,
      navigationOptions: {
        title: "FirstPage",
        headerLeft: null
      }
    },

    DrawerNavigator: { screen: DrawerNavigator },

    Login: { screen: Login },

    Register: { screen: Register },

    LoginWithFacebook: { screen: LoginWithFacebook },

    LoginWithGoogle: { screen: LoginWithGoogle }
  },
  {
    headerMode: "none",
    defaultNavigationOptions: { headerVisable: false }
  },
  { initialRouteName: "FirstPage" }
);

export default createAppContainer(MainNavigator);
