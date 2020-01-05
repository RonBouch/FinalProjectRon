import React, { Component } from "react";
import { Dimensions } from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import ContentComponent from "./ContentComponent";
import AssociationsList from "../screens/AssociationsList";
import AssociationPage from "../screens/AssociationPage";
import Home from "../screens/Home";
import Reminders from "../screens/Reminders";
import Publish from "../screens/Publish";
import Profile from "../screens/Profile";
import Favorite from "../screens/Favorite";
// import EditPage from "../screens/EditPage";
import ProfilePost from "../screens/ProfilePost";
import PostPage from "../screens/PostPage";
import EditProfile from "../screens/EditProfile";
import About from "../screens/About";
import FirstPage from "../screens/FirstPage";
import Contribution from "../screens/Contribution";
import S3 from "../screens/S3.js";
import EditPost from "../screens/EditPost";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: Home },

    Contribution: { screen: Contribution },

    ProfilePost: { screen: ProfilePost },

    Profile: { screen: Profile },


    Favorite: { screen: Favorite },



    EditPost: { screen: EditPost },
    
    AssociationsList: { screen: AssociationsList },

    Publish: { screen: Publish },





    EditProfile: { screen: EditProfile },




    Reminders: { screen: Reminders },


    About: { screen: About },
    Publish: { screen: Publish },
    S3: { screen: S3 },

    PostPage: { screen: PostPage },



    AssociationPage: { screen: AssociationPage }
  },
  {
    headerMode: "none"
  }
);

const DNav = createDrawerNavigator(
  {
    MainNavigator: { screen: MainNavigator }
  },
  {
    initialRouteName: "MainNavigator",
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
