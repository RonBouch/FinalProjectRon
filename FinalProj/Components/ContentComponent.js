import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { Icon } from "react-native-elements";

export default class ContentComponent extends Component {
  constructor(props) {
    super(props);
      this.state={
        img:"",

      }

  }
  // define a separate function to get triggered on focus
onFocusFunction = () => {

  console.log("Change Picture .");
  this.setState({img:global.image})
  // do some stuff on every screen focus
}

// add a focus listener onDidMount
async componentDidMount () {
  this.focusListener = this.props.navigation.addListener('didFocus', () => {
    this.onFocusFunction()
  })
}

// and don't forget to remove the listener
componentWillUnmount () {
  this.focusListener.remove()
}

  
  render() {
    console.log("IMg name ", global.image )
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
            {this.state.img!=""? 
            <Image
                    style={{
                      height: 150,
                      width: 150,
                      borderRadius: 100
                    }}
                    source={{
                      uri:
                        "http://ruppinmobile.tempdomain.co.il/site11/ImageStorage/"+this.state.img
                    }}
                  />:<Image
                source={require("../assets/TenYadLogo.png")}
                style={[styles.headerImage, { width: 150, height: 150 }]}
              />}
              
              <Text style={[styles.text, { color: "white" }]}>תן יד</Text>
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
              onPress={() => this.props.navigation.navigate("Publish")}
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
              onPress={() => this.props.navigation.navigate("Register")}
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
    height: 200,
    backgroundColor: "#6495ed",
    alignItems: "center",
    justifyContent: "center"
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
    marginLeft: 15,
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
