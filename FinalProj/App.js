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
    FirstPage: { screen: FirstPage },
    Login: { screen: Login },
    DrawerNavigator: { screen: DrawerNavigator },
    S1: { screen: S1 },
    Register: { screen: Register },
    Home: { screen: Home }
  },
  {
    headerMode: "none",
    defaultNavigationOptions: { headerVisable: false }
  },
  { initialRouteName: "FirstPage" }
);

export default createAppContainer(MainNavigator);
