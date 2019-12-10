import React, { Component } from "react";
import { Dimensions } from "react-native";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import ContentComponent from "./ContentComponent";
import AssociationsList from "../screens/AssociationsList";
import AssociationPage from "../screens/AssociationPage";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Publish from "../screens/Publish";
import Profile from "../screens/Profile";
import EditPage from "../screens/EditPage";
import ProfilePost from "../screens/ProfilePost";
import FirstPage from "../screens/FirstPage";
import Contribution from "../screens/Contribution";
import S3 from "../screens/S3.js";

const DNav = createDrawerNavigator(
  {
    S3: { screen: S3 },

    Home: { screen: Home },

    FirstPage:{screen:FirstPage},
    Contribution: { screen: Contribution },
     Publish:{screen:Publish},
    S3:{screen:S3},
    Profile: { screen: Profile },

    ProfilePost: { screen: ProfilePost },

    EditPage: { screen: EditPage },

    AssociationsList: { screen: AssociationsList },

    

    AssociationPage: { screen: AssociationPage },

      },
  {
    initialRouteName: "S3",
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
