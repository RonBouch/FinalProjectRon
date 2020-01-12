import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  AsyncStorage,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  withNavigation,
  NavigationActions,
  StackActions
} from "react-navigation";

class ContentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: ""
    };
  }
  // define a separate function to get triggered on focus
  onFocusFunction = () => {
    this.setState({ img: global.user.UserID + global.user.Email + ".jpg" });
    // do some stuff on every screen focus
  };

  // add a focus listener onDidMount
  async componentDidMount() {
    if (global.user != null) {
      this.setState({ img: global.user.UserID + global.user.Email + ".jpg" });
    }

    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.onFocusFunction();
    });
  }

  // and don't forget to remove the listener
  componentWillUnmount() {
    this.focusListener.remove();
  }

  logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("FirstPage");
    //לצאת מהאפליקציה או לא
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.drawerTransparent}
        onPress={() => this.props.navigation.goBack()}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.drawer}
          disabled={false}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => this.props.navigation.navigate("MyProfilePage")}
            >
              {this.state.img != "" && global.user != null ? (
                <Image
                  style={{
                    height: 150,
                    width: 150,
                    borderRadius: 100
                  }}
                  source={{
                    uri:
                      global.user.Image != null &&
                      this.state.img == global.user.Image
                        ? "http://ruppinmobile.tempdomain.co.il/site11/ImageStorage/" +
                          this.state.img +
                          "?time" +
                          new Date()
                        : global.user.Image
                  }}
                />
              ) : (
                <Image
                  source={require("../assets/profileIcon.png")}
                  style={[styles.headerImage, { width: 150, height: 150 }]}
                />
              )}
            </TouchableOpacity>
            <View
              style={{
                marginTop: 10,
                alignItems: "center",
                textAlign: "center"
              }}
            >
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                {global.user ? global.user.FirstName : ""}{" "}
                {global.user ? global.user.LastName : ""}
              </Text>
            </View>
          </View>
          <ScrollView>
            <TouchableHighlight
              underlayColor={"rgba(0,0,0,0.2)"}
              onPress={() => this.props.navigation.navigate("HomePage")}
            >
              <View style={styles.row}>
                <Icon
                  style={{ width: "25%", textAlign: "center" }}
                  name="home"
                  type="font-awesome"
                  color="gray"
                  size={20}
                />
                <Text style={styles.text}>דף הבית</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={"rgba(0,0,0,0.2)"}
              onPress={() =>
                this.props.navigation.navigate("AssociationsListPage")
              }
            >
              <View style={styles.row}>
                <Icon
                  style={{ width: "25%", textAlign: "center" }}
                  name="place-of-worship"
                  type="font-awesome"
                  color="gray"
                  size={20}
                />
                <Text style={styles.text}>עמותות</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={"rgba(0,0,0,0.2)"}
              onPress={() => this.props.navigation.navigate("PostsListPage")}
            >
              <View style={styles.row}>
                <Icon
                  style={{ width: "25%", textAlign: "center" }}
                  name="hand-holding-heart"
                  type="font-awesome"
                  color="gray"
                  size={20}
                />
                <Text style={styles.text}>תרומות</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={"rgba(0,0,0,0.2)"}
              onPress={() => this.props.navigation.navigate("PublishPostPage")}
            >
              <View style={styles.row}>
                <Icon
                  style={{ width: "25%", textAlign: "center" }}
                  name="cart-plus"
                  type="font-awesome"
                  color="gray"
                  size={20}
                />
                <Text style={styles.text}>פרסום תרומה</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={"rgba(0,0,0,0.2)"}
              onPress={() => this.props.navigation.navigate("MyFavoritesPage")}
            >
              <View style={styles.row}>
                <Icon
                  style={{ width: "25%", textAlign: "center" }}
                  name="gratipay"
                  type="font-awesome"
                  color="gray"
                  size={20}
                />
                <Text style={styles.text}>המועדפים שלי</Text>
              </View>
            </TouchableHighlight>

            <View style={styles.line}></View>

            <TouchableHighlight
              underlayColor={"rgba(0,0,0,0.2)"}
              onPress={() => this.props.navigation.navigate("MyProfilePage")}
            >
              <View style={styles.row}>
                <Icon
                  style={{ width: "25%", textAlign: "center" }}
                  name="user-edit"
                  type="font-awesome"
                  color="gray"
                  size={16}
                />
                <Text style={styles.text}>פרופיל</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={"rgba(0,0,0,0.2)"}
              onPress={() => this.props.navigation.navigate("AboutPage")}
            >
              <View style={styles.row}>
                <Icon
                  style={{ width: "25%", textAlign: "center" }}
                  name="info"
                  type="font-awesome"
                  color="gray"
                  size={20}
                />
                <Text style={styles.text}>אודות</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={"rgba(0,0,0,0.2)"}
              onPress={this.logout}

              //     (props) =>Alert.alert(
              //     'Log out',
              //     'Do you want to logout?',
              //     [
              //       {text: 'Cancel', onPress: () => {return null}},
              //       {text: 'Confirm', onPress: () => {
              //         // AsyncStorage.clear();
              // }}
            >
              <View style={styles.row}>
                <Icon
                  style={{ width: "25%", textAlign: "center" }}
                  name="sign-out-alt"
                  type="font-awesome"
                  color="gray"
                  size={20}
                />
                <Text style={styles.text}>התנתק</Text>
              </View>
            </TouchableHighlight>
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}
export default withNavigation(ContentComponent);

const styles = StyleSheet.create({
  drawerTransparent: {
    height: "100%",
    justifyContent: "flex-end"
  },
  drawer: {
    width: "70%",
    height: "86%",
    backgroundColor: "white",
    elevation: 10
  },
  header: {
    width: "100%",
    height: 200,
    backgroundColor: "#6495ed",
    justifyContent: "center"
    // textAlign: "center"
  },
  headerImage: {
    borderRadius: 100
  },
  row: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 15
    // paddingLeft: 10
  },
  menu: {
    width: 10,
    height: 10,
    backgroundColor: "red",
    borderRadius: 50,
    alignSelf: "center"
  },
  text: {
    width: "45%",
    fontSize: 14,
    fontWeight: "bold",
    color: "#111"
  },
  line: {
    width: "90%",
    alignSelf: "center",
    height: 1,
    backgroundColor: "gray",
    elevation: 3,
    margin: 15
  }
});
