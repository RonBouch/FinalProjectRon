import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import ContentComponent from "./ContentComponent";
import AssociationsList from "../screens/AssociationsList";
import AssociationPage from "../screens/AssociationPage";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Contribution from "../screens/Contribution";
import S3 from "../screens/S3.js";

const DNav = createDrawerNavigator(
  {
    Contribution: { screen: Contribution },

    AssociationsList: { screen: AssociationsList },



    AssociationPage: { screen: AssociationPage },


    S3: { screen: S3 },

    Home: { screen: Home },
    Login: { screen: Login },
    Register: { screen: Register }
  },
  {
    initialRouteName: "Contribution",
    contentComponent: ContentComponent,
    drawerWidth: Dimensions.get("window").width,
    drawerPosition: "right",
    drawerBackgroundColor: "transparent"
  }
);

const AppContainer = createAppContainer(DNav);
export default class DrawerNavigator extends Component {
  render() {
    return <AppContainer />;
  }
}
