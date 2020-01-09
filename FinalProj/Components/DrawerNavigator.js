import { Dimensions } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import ContentComponent from "./ContentComponent";
import AssociationsListPage from "../Screens/AssociationsListPage";
import AssociationSelectedPage from "../Screens/AssociationSelectedPage";
import HomePage from "../Screens/HomePage";
import MyAlertsPage from "../Screens/MyAlertsPage";
import PublishPostPage from "../Screens/PublishPostPage";
import MyProfilePage from "../Screens/MyProfilePage";
import MyFavoritesPage from "../Screens/MyFavoritesPage";
import MyPostsPage from "../Screens/MyPostsPage";
import PostSelectedPage from "../Screens/PostSelectedPage";
import EditProfilePage from "../Screens/EditProfilePage";
import AboutPage from "../Screens/AboutPage";
import PostsListPage from "../Screens/PostsListPage";
import EditPostPage from "../Screens/EditPostPage";

const MainNavigator = createStackNavigator(
  {
    HomePage: { screen: HomePage },

    PostsListPage: { screen: PostsListPage },

    MyPostsPage: { screen: MyPostsPage },

    MyProfilePage: { screen: MyProfilePage },

    MyFavoritesPage: { screen: MyFavoritesPage },

    EditPostPage: { screen: EditPostPage },

    AssociationsListPage: { screen: AssociationsListPage },

    PublishPostPage: { screen: PublishPostPage },

    EditProfilePage: { screen: EditProfilePage },

    MyAlertsPage: { screen: MyAlertsPage },

    AboutPage: { screen: AboutPage },

    PostSelectedPage: { screen: PostSelectedPage },

    AssociationSelectedPage: { screen: AssociationSelectedPage }
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
