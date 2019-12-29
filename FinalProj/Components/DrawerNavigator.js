import React, { Component } from "react";
import { Dimensions } from "react-native";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import ContentComponent from "./ContentComponent";
import AssociationsList from "../screens/AssociationsList";
import AssociationPage from "../screens/AssociationPage";
import Home from "../screens/Home";
import Reminders from "../screens/Reminders";
import Publish from "../screens/Publish";
import Profile from "../screens/Profile";
import EditPage from "../screens/EditPage";
import ProfilePost from "../screens/ProfilePost";
import PostPage from "../screens/PostPage";
import EditProfile from "../screens/EditProfile";
import FirstPage from "../screens/FirstPage";
import Contribution from "../screens/Contribution";
import S3 from "../screens/S3.js";

const DNav = createDrawerNavigator(
  {
    Home: { screen: Home },

    Profile: { screen: Profile },

    Contribution: { screen: Contribution },
    Contribution: { screen: Contribution },

    Publish: { screen: Publish },

    Publish: { screen: Publish },
    S3: { screen: S3 },

    EditProfile: { screen: EditProfile },

    // FirstPage: { screen: FirstPage },
    S3: { screen: S3 },
    Reminders: { screen: Reminders },

    ProfilePost: { screen: ProfilePost },

    PostPage: { screen: PostPage },

    EditPage: { screen: EditPage },

    AssociationsList: { screen: AssociationsList },

    AssociationPage: { screen: AssociationPage }
  },
  {
    initialRouteName: "Home",
    contentComponent: ContentComponent,
    drawerWidth: Dimensions.get("window").width,
    drawerPosition: "right",
    overlayColor: "none",
    drawerBackgroundColor: "transparent"
  }
);
export default DNav;
// const AppContainer = createAppContainer(DNav);
// export default class DrawerNavigator extends Component {
//   render() {
//     return <AppContainer />;
//   }
// }
