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
  KeyboardAvoidingView,
  Image
} from "react-native";
import { Icon } from "react-native-elements";

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

export default class Register extends React.Component {
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

  changeVerifyPassword = e => {
    this.verifyPassword = e;
  };

  changeGender = e => {
    this.gender = e;
  };

  //אימות שדות במהלך הרשמה
  registerValidatation() {
    let errors = {};
    let formIsValid = true;

    //בדיקה האם הוזן שם פרטי
    if (this.firstName == "") {
      formIsValid = false;
      errors["firstName"] = "* אנא הכנס שם פרטי";
    }
    //בדיקה האם הוזן שם משפחה
    if (this.lastName == "") {
      formIsValid = false;
      errors["lastName"] = "* אנא הכנס שם משפחה";
    }
    //בדיקה האם הוזנה כתובת מייל
    if (!this.email) {
      formIsValid = false;
      errors["email"] = "* אנא הכנס כתובת מייל";
    }
    //בדיקה האם כתובת המייל שהוזנה תקינה
    if (this.email != "") {
      let pattern = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
      if (!pattern.test(this.email)) {
        formIsValid = false;
        errors["email"] = "* כתובת המייל אינה תקינה";
      }
    }
    //בדיקה האם הוזנה סיסמא
    if (this.password == "") {
      formIsValid = false;
      errors["password"] = "* אנא הכנס סיסמה ";
    }
    //בדיקה האם הסיסמא שהוזנה תקינה
    if (this.password != "") {
      // let pattern = /^(?=.{4,})[a-zA-Z0-9_.-]*$/;
      let pattern = /^(?=.{6,12})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
      if (!pattern.test(this.password)) {
        formIsValid = false;
        errors["password"] =
          "* הכנס סיסמה בעלת 6 תווים" +
          "\n" +
          "בשילוב אות גדולה אות קטנה ומספר";
      }
    }
    //בדיקה האם אימות הסיסמא הוזן
    if (this.verifyPassword == "") {
      formIsValid = false;
      errors["verifyPassword"] = "* אנא אמת סיסמה";
    }
    //בדיקה האם הסיסמאות תואמות
    if (this.verifyPassword != "") {
      if (this.verifyPassword != this.password) {
        formIsValid = false;
        errors["verifyPassword"] = "* הסיסמה אינה זהה";
      }
    }
    //בדיקה האם הוזן תאריך לידה
    if (!this.state.date) {
      formIsValid = false;
      errors["birthday"] = "* אנא הכנס תאריך לידה";
    }
    //בדיקה האם הוזן מגדר
    if (!this.gender) {
      formIsValid = false;
      errors["gender"] = "* אנא בחר מגדר";
    }
    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  register = () => {
    if (this.registerValidatation()) {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender,
        email: this.email,
        password: this.password,
        birthday: this.state.date
      };
      console.log(data);
      fetch(
        "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/Register",
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
              id = u.UserID;

              this.props.navigation.navigate("DrawerNavigator");
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
      <KeyboardAvoidingView style={{ alignItems: "center" }} behavior="padding">
        <TextInput
          style={styles.input}
          placeholder="שם פרטי"
          placeholderTextColor="rgba(255,255,255,.7)"
          onChangeText={this.changeFirstName}
        />

        <TextInput
          style={styles.input}
          placeholder="שם משפחה"
          placeholderTextColor="rgba(255,255,255,.7)"
          onChangeText={this.changeLastName}
        />

        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="אמייל"
          placeholderTextColor="rgba(255,255,255,.7)"
          onChangeText={this.changeEmail}
        />

        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="סיסמא"
          maxLength={12}
          placeholderTextColor="rgba(255,255,255,.7)"
          onChangeText={this.changePassword}
        />

        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="אימות סיסמא"
          maxLength={12}
          placeholderTextColor="rgba(255,255,255,.7)"
          onChangeText={this.changeVerifyPassword}
        />
        <DatePicker
          style={{
            width: 150,
            margin: 5
          }}
          date={this.state.date}
          mode="date"
          placeholder="יום הולדת"
          format="DD-MM-YYYY"
          minDate={
            new Date().getDate() +
            "-" +
            (new Date().getMonth() + 1) +
            "-" +
            (new Date().getFullYear() - 120)
          }
          maxDate={new Date()}
          customStyles={{
            placeholderText: { color: "rgba(255,255,255,.7)" },
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36,
              borderColor: "white",
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
          selectedLabelColor={"white"}
          buttonColor={"white"}
          labelColor={"white"}
          animation={true}
          style={styles.radioGender}
          onPress={this.changeGender}
        />

        <TouchableOpacity style={styles.registerButton} onPress={this.register}>
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>
            הרשמה
            {"  "}
          </Text>
          <Icon name="user-plus" type="font-awesome" color="white" size={18} />
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
    );
  }
}
