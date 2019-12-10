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
  AsyncStorage
} from "react-native";
import { Icon } from "react-native-elements";
import { withNavigation, NavigationActions } from "react-navigation";
import FirstPage from "../screens/FirstPage";
class ContentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: ""
    };
  }
  // define a separate function to get triggered on focus
  onFocusFunction = () => {
    console.log("Change Picture .");
    console.log("global contnenet ", global.user);
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

  render() {
    // console.log(global.user.Image)
  
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
          <ScrollView>
            <View style={styles.header}>
              <View style={{ alignItems: "center", marginTop: 25 }}>
                {this.state.img != "" ? (
                  <Image
                    style={{
                      height: 150,
                      width: 150,
                      borderRadius: 100
                    }}
                    source={{
                      uri:
                      global.user.Image!=null&& (this.state.img == global.user.Image)
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
              </View>
              <View
                style={{
                  marginTop: 10,
                  alignItems: "center",
                  textAlign: "center"
                }}
              >
                <Text style={[styles.text, { color: "white", fontSize: 16 }]}>
                  {global.user.FirstName} {global.user.LastName}
                </Text>
              </View>
            </View>
            <TouchableHighlight
              underlayColor={"rgba(0,0,0,0.2)"}
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <View style={styles.row}>
                <Icon
                  iconStyle={{ marginEnd: "10%" }}
                  name="home"
                  type="font-awesome"
                  color="gray"
                  size={28}
                />
                <Text style={styles.text}>דף הבית</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={"rgba(0,0,0,0.2)"}
              onPress={() => this.props.navigation.navigate("Contribution")}
            >
              <View style={styles.row}>
                <Icon
                  iconStyle={{ marginEnd: "10%" }}
                  name="thumbs-up"
                  type="font-awesome"
                  color="gray"
                  size={28}
                />
                <Text style={styles.text}>תרומות</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={"rgba(0,0,0,0.2)"}
              onPress={() => this.props.navigation.navigate("Favorite")}
            >
              <View style={styles.row}>
                <Icon
                  iconStyle={{ marginEnd: "10%" }}
                  name="user"
                  type="font-awesome"
                  color="gray"
                  size={28}
                />
                <Text style={styles.text}>מועדפים</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={"rgba(0,0,0,0.2)"}
              onPress={() => this.props.navigation.navigate("AssociationsList")}
            >
              <View style={styles.row}>
                <Icon
                  iconStyle={{ marginEnd: "10%" }}
                  name="envelope"
                  type="font-awesome"
                  color="gray"
                  size={28}
                />
                <Text style={styles.text}>עמותות</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={"rgba(0,0,0,0.2)"}
              onPress={() => this.props.navigation.navigate("Profile")}
            >
              <View style={styles.row}>
                <Icon
                  iconStyle={{ marginEnd: "10%" }}
                  name="envelope"
                  type="font-awesome"
                  color="gray"
                  size={28}
                />
                <Text style={styles.text}>פרופיל</Text>
              </View>
            </TouchableHighlight>

            <View style={styles.line}></View>
            <TouchableHighlight
              underlayColor={"rgba(0,0,0,0.2)"}
              onPress={() => this.props.navigation.navigate("S3")}
            >
              <View style={styles.row}>
                <Icon
                  iconStyle={{ marginEnd: "10%" }}
                  name="share"
                  type="font-awesome"
                  color="gray"
                  size={28}
                />
                <Text style={styles.text}>About</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={"rgba(0,0,0,0.2)"}
              onPress={
                
                (props) =>Alert.alert(
                'Log out',
                'Do you want to logout?',
                [
                  {text: 'Cancel', onPress: () => {return null}},
                  {text: 'Confirm', onPress: () => {
                    AsyncStorage.clear();
                    const resetAction = NavigationActions.reset({
                      index: 0,
                      key:1,
                      actions: [
                        NavigationActions.navigate({ routeName: 'FirstPage'})
                      ]
                    })
                    return () => this.props.navigation.dispatch(resetAction)

                    this.props.navigation.navigate('FirstPage')
                  }},
                ],
                { cancelable: false }
              ) 
            }
            >
              <View style={styles.row}>
                <Icon
                  iconStyle={{ marginEnd: "10%" }}
                  name="home"
                  type="font-awesome"
                  color="gray"
                  size={28}
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
    flex: 1,
    backgroundColor: "transparent"
  },
  drawer: {
    flex: 1,
    width: "80%",
    backgroundColor: "white"
  },
  header: {
    width: "100%",
    height: 250,
    backgroundColor: "#6495ed",
    justifyContent: "center"
    // textAlign: "center"
  },
  headerImage: {
    borderRadius: 100
  },
  row: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingLeft: 10
  },
  menu: {
    width: 10,
    height: 10,
    backgroundColor: "red",
    borderRadius: 50,
    alignSelf: "center"
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111"
  },
  line: {
    width: "90%",
    alignSelf: "center",
    height: 1,
    backgroundColor: "gray",
    margin: 15
  }
});
