import React from "react";
import styles from "../Components/StyleSheet";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TouchableHighlight,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Image
} from "react-native";
import { DrawerActions } from "react-navigation-drawer";
import { Icon as Icona } from "react-native-elements";
import { Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";

import DatePicker from "react-native-datepicker";
import RadioForm from "react-native-simple-radio-button";
import { Ionicons } from "@expo/vector-icons";

// const DissmisKeyboard = ({ children }) => (
//   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//     {children}
//   </TouchableWithoutFeedback>
// );

var radio_props = [
  {
    label: "  זכר  ",
    value: "זכר"
  },
  {
    label: "  נקבה  ",
    value: "נקבה"
  }
];

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.password = "";
    this.verifyPassword = "";
    this.birthday = "";
    this.gender = "";
    this.vaildForm = false;
    this.state = {
      message: "",
      date: "",
      formIsValid: true,
      errors: {}
    };
  }
  changeGender = e => {
    this.gender = e;
  };
  render() {
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
                  עדכון פרטים
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
            <KeyboardAvoidingView
              style={{ alignItems: "center" }}
              behavior="padding"
            >
              <TextInput
                style={styles.inputUpdate}
                placeholder={global.user.FirstName}
                placeholderTextColor="rgba(155,155,155,.7)"
                onChangeText={this.changeFirstName}
              />

              <TextInput
                style={styles.inputUpdate}
                placeholder={global.user.LastName}
                placeholderTextColor="rgba(155,155,155,.7)"
                onChangeText={this.changeLastName}
              />

              <DatePicker
                style={{
                  width: 150,
                  margin: 5
                }}
                date={this.state.date}
                mode="date"
                placeholder={global.user.Birthday}
                format="DD/MM/YYYY"
                minDate={
                  new Date().getDate() +
                  "-" +
                  (new Date().getMonth() + 1) +
                  "-" +
                  (new Date().getFullYear() - 120)
                }
                maxDate={new Date()}
                customStyles={{
                  placeholderText: { color: "rgba(155,155,155,.7)" },
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36,
                    borderColor: "black",
                    borderWidth: 0,
                    borderBottomWidth: 1
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={date => {
                  this.setState({ date: date });
                }}
              />

              <RadioForm
                radio_props={radio_props}
                initial={null}
                selectedButtonColor={"black"}
                selectedLabelColor={"black"}
                buttonColor={"black"}
                labelColor={"black"}
                animation={true}
                style={styles.radioGender}
                onPress={this.changeGender}
              />

              <TouchableOpacity
                style={styles.registerButton}
                onPress={this.register}
              >
                <Text
                  style={{ fontWeight: "bold", color: "white", fontSize: 18 }}
                >
                  עדכון
                  {"  "}
                </Text>
                <Icon
                  name="user-plus"
                  type="font-awesome"
                  color="white"
                  size={18}
                />
              </TouchableOpacity>

              <Text style={styles.textMessage}>
                {this.state.errors.firstName ||
                  this.state.errors.lastName ||
                  this.state.errors.email ||
                  this.state.errors.password ||
                  this.state.errors.verifyPassword ||
                  this.state.errors.birthday ||
                  this.state.errors.gender}
              </Text>
            </KeyboardAvoidingView>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
