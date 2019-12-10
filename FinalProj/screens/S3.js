import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
  ImageBackground,
  TouchableHighlight,
  Image
} from "react-native";
import { Icon as Icona } from "react-native-elements";
import styles from "../Components/StyleSheet";

import { Ionicons } from "@expo/vector-icons";
import shortid from "shortid";
import {
  Autocomplete,
  withKeyboardAwareScrollView
} from "react-native-dropdown-autocomplete";

import cities from "../city_list";
import Slider from "../Components/Slider";
class S3 extends Component {
  handleSelectItem(item, index) {
    const { onDropdownClose } = this.props;
    onDropdownClose();
    console.log(item);
  }

  render() {
    const autocompletes = [...Array(1).keys()];

    const data = cities;

    // const apiUrl = "https://5b927fd14c818e001456e967.mockapi.io/branches";

    const { scrollToInput, onDropdownClose, onDropdownShow } = this.props;

    return (
      <ImageBackground
        source={require("../assets/background2.jpg")}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <View style={styles.main}>
            <View style={styles.topBar}>
              <TouchableHighlight
                onPress={() =>
                  this.props.navigation.dispatch(DrawerActions.openDrawer())
                }
                style={styles.touchableHighlight}
                underlayColor={"rgba(0,0,0,0.8)"}
              >
                <Icona
                  iconStyle={{ marginEnd: "10%" }}
                  name="bars"
                  type="font-awesome"
                  color="white"
                  size={28}
                />
              </TouchableHighlight>
              <View
                style={{
                  marginTop: 35,
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    color: "rgba(255,255,255,.9)",
                    fontWeight: "bold",
                    fontSize: 25,
                    fontFamily: "serif",
                    textShadowColor: "black",
                    textShadowOffset: { width: 1, height: 4 },
                    textShadowRadius: 5
                  }}
                >
                  מועדפים
                </Text>
              </View>
              <TouchableHighlight
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Image
                  source={require("../assets/TenYadLogo.png")}
                  style={styles.logo}
                />
              </TouchableHighlight>
            </View>

            <View style={styles1.autocompletesContainer}>
              <SafeAreaView>
                {autocompletes.map(() => (
                  <Autocomplete
                    key={shortid.generate()}
                    data={data}
                    // style={styles1.input}
                    scrollToInput={ev => scrollToInput(ev)}
                    handleSelectItem={(item, id) =>
                      this.handleSelectItem(item, id)
                    }
                    onDropdownClose={() => onDropdownClose()}
                    onDropdownShow={() => onDropdownShow()}
                    placeholder="חפש"
                    renderIcon={() => (
                      <Ionicons
                        name="md-search"
                        size={20}
                        color="#c7c6c1"
                        style={styles1.plus}
                      />
                    )}
                    // fetchDataUrl={apiUrl}

                    minimumCharactersCount={0}
                    highlightText
                    valueExtractor={item => item.name}
                    rightTextExtractor={item => item.id}
                  />
                ))}
              </SafeAreaView>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const styles1 = StyleSheet.create({
  autocompletesContainer: {
    marginTop: 30,
    // zIndex: 1,
    width: "100%"
    // paddingHorizontal: 8
  },
  // input: { maxHeight: 40 },
  inputContainer: {
    // display: "flex",
    // flexShrink: 0,
    // flexGrow: 0,
    // flexDirection: "row",
    // flexWrap: "wrap",
    // alignItems: "center",
    // borderBottomWidth: 1,
    // borderColor: "#c7c6c1",
    // paddingVertical: 13,
    // paddingLeft: 12,
    // paddingRight: "5%",
    // width: "100%",
    // justifyContent: "flex-start"
  },
  container: {
    // flex: 1,
    // backgroundColor: "#ffffff"
  },
  plus: {
    position: "absolute",
    left: 15,
    top: 10
  }
});

export default withKeyboardAwareScrollView(S3);
