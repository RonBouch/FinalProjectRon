import React from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import S1 from "./screens/S1";
import FirstPage from "./screens/FirstPage";
import DrawerNavigator from "./Components/DrawerNavigator";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}

const MainNavigator = createStackNavigator(
  {
    DrawerNavigator: { screen: DrawerNavigator },

    FirstPage: { screen: FirstPage },






    Home: { screen: Home },

    Login: { screen: Login },
    S1: { screen: S1 },
    Register: { screen: Register }
  },
  {
    headerMode: "none",
    defaultNavigationOptions: { headerVisable: false }
  },
  { initialRouteName: "FirstPage" }
);

export default createAppContainer(MainNavigator);
