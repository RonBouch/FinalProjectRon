import React from "react";
import styles from "../Components/StyleSheet";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableHighlight,
  KeyboardAvoidingView,
  Image
} from "react-native";
import { Icon } from "react-native-elements";
import { DrawerActions } from "react-navigation-drawer";

import DatePicker from "react-native-datepicker";
import RadioForm from "react-native-simple-radio-button";
import { Ionicons } from "@expo/vector-icons";

const DissmisKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

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

export default class EditPage extends React.Component {
  constructor(props) {
    super(props);
    this.firstName = global.user.FirstNane;
    this.lastName = global.user.LastName;
    this.email = global.user.Email;
    this.password = global.user.Password;
    this.vaildForm = false;
    this.state = {
      message: "",
      date: "",
      formIsValid: false,
      errors: {}
    };
  }

  changeFirstName = e => {
    this.firstName = e;
  };

  changeLastName = e => {
    this.lastName = e;
  };

  changeEmail = e => {
    this.email = e;
  };

  changePassword = e => {
    this.password = e;
  };

  validateForm() {
    let errors = {};
    let formIsValid = true;

    if (this.firstName == "") {
      formIsValid = false;
      errors["firstName"] = "* אנא הכנס שם פרטי";
    }
    if (this.lastName == "") {
      formIsValid = false;
      errors["lastName"] = "* אנא הכנס שם משפחה";
    }
    if (!this.email) {
      formIsValid = false;
      errors["email"] = "* אנא הכנס כתובת מייל";
    }
    if (this.email != "") {
      let pattern1 = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
      if (!pattern1.test(this.email)) {
        formIsValid = false;
        errors["email"] = "* כתובת המייל אינה תקינה";
      }
    }
    if (this.password == "") {
      formIsValid = false;
      errors["password"] = "* אנא הכנס סיסמה ";
    }
    if (this.password != "") {
      let re = /^(?=.{4,})[a-zA-Z0-9_.-]*$/;
      let res = re.test(this.password);
      if (!res) {
        formIsValid = false;
        errors["password"] = "* הכנס סיסמה בעלת 4 מספרים ואותיות";
      }
    }
    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  EditProfile = () => {
    if (this.validateForm()) {
      const data = {
        id: global.user.UserID,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      };
      console.log(data);
      fetch(
        "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/EditProfile",
        {
          method: "post",
          headers: new Headers({
            "Content-Type": "application/Json;"
          }),
          body: JSON.stringify(data)
        }
      )
        .then(res => {
          console.log("res=", res);
          return res.json();
        })
        .then(
          result => {
            console.log("fetch POST= ", result);
            let u = JSON.parse(result.d);
            console.log("u = " + u);
            if (u == null) {
              this.setState({
                message: "הרשמה נכשלה"
              });
              return;
            } else {
              console.log("ID" + id);
              id = u.ID;

              alert("היי ," + this.firstName + " " + this.lastName);
              this.props.navigation.navigate("HomePage");
            }
            console.log(result.d);
            console.log(result);
          },
          error => {
            console.log("err post=", error);
          }
        );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.dispatch(DrawerActions.openDrawer())
              }
              style={styles.touchableHighlight}
              underlayColor={"rgba(0,0,0,0.8)"}
            >
              <Icon
                iconStyle={{ marginEnd: "10%" }}
                name="bars"
                type="font-awesome"
                color="white"
                size={28}
              />
            </TouchableOpacity>

            <TouchableHighlight
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Image
                source={require("../assets/TenYadLogo.png")}
                style={styles.logo}
              />
            </TouchableHighlight>
          </View>

          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <TextInput
              style={styles.input}
              placeholder="שם פרטי"
              defaultValue={global.user.FirstName}
              onChangeText={this.changeFirstName}
            />

            <TextInput
              style={styles.input}
              placeholder="שם משפחה"
              defaultValue={global.user.LastName}
              onChangeText={this.changeLastName}
            />

            <TextInput
              style={styles.input}
              keyboardType="email-address"
              placeholder="אמייל"
              defaultValue={global.user.Email}
              onChangeText={this.changeEmail}
            />

            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="סיסמא"
              defaultValue={global.user.Password}
              onChangeText={this.changePassword}
            />

            <TouchableOpacity
              style={styles.registerButton2}
              onPress={this.EditProfile}
            >
              <Text>
                עדכן
                {"  "}
              </Text>
              <Icon name="edit" type="font-awesome" color="black" size={18} />
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
    );
  }
}
