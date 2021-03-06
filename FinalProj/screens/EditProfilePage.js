import React from "react";
import styles from "../Components/StyleSheet";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
  KeyboardAvoidingView,
  Image
} from "react-native";
import { DrawerActions } from "react-navigation-drawer";
import { Icon as Icona } from "react-native-elements";
import { Icon } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import RadioForm from "react-native-simple-radio-button";

var radio_props = [
  {
    label: "  זכר  ",
    value:"male"
  },
  {
    label: "  נקבה  ",
    value: "female"
  }
];

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      firstName:"",
      lastName:"",
      birthday:global.user.Birthday,
      gender:global.user.Gender,
      date:"",
    }

  }
  
  storeData = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  };

  EditProfile = () => {
    const data = {
      userid: global.user.UserID,
      firstName: this.state.firstName!=""?this.state.firstName:global.user.FirstName,
      lastName: this.state.lastName!=""?this.state.lastName:global.user.LastName,
      gender: this.state.gender,
      birthday: this.state.date!=""?this.state.date:global.user.Birthday,
    };
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
        return res.json();
      })
      .then(
        result => {
          let u = JSON.parse(result.d);
          if (u == null) {
            this.setState({
              message: "הרשמה נכשלה"
            });
            return;
          } else {
            global.user = u;
            this.storeData("user", u);

            this.props.navigation.navigate("HomePage");
          }
        },
        error => {
          console.log("err post=", error);
        }
      );
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
              <TouchableOpacity
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
              </TouchableOpacity>
              <View style={styles.textTopBar} >
                <Text style={styles.bigText} >
                  עדכון פרטים
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("HomePage")}
              >
                <Image
                  source={require("../assets/TenYadLogo.png")}
                  style={styles.logo}
                />
              </TouchableOpacity>
            </View>
            <KeyboardAvoidingView style={s.pageView} behavior="padding" >
              <TextInput
                style={s.inputUpdate}
                placeholder={global.user.FirstName}
                onChangeText={(e)=>this.setState({firstName:e})}
              />

              <TextInput
                style={s.inputUpdate}
                placeholder={global.user.LastName}
                onChangeText={(e)=>this.setState({lastName:e})}
              />

              <DatePicker
                style={s.dataPicker}
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
                  dateIcon: s.dateIcon ,
                  dateInput: s.dateInput,
                }}
                onDateChange={date => {
                  this.setState({ date: date });
                }}
              />

              <RadioForm
                radio_props={radio_props}
                initial={global.user.Gender=="male"?0:1}
                selectedButtonColor={"black"}
                selectedLabelColor={"black"}
                buttonColor={"black"}
                labelColor={"black"}
                animation={true}
                style={styles.radioGender}
                onPress={(e)=>this.setState({gender:e})}
              />

              <TouchableOpacity
                style={styles.registerButton}
                onPress={this.EditProfile}
              >
                <Text style={s.txtBtn}>
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
            </KeyboardAvoidingView>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const s = StyleSheet.create({
  inputUpdate: {
    flexDirection: "row",
    width: 200,
    height: 40,
    alignItems: "center",
    borderColor: "black",
    borderBottomWidth: 1,
    marginTop: 5
  },
  pageView:{
    alignItems: "center"
  },
  dataPicker:{
    width: 150,
    margin: 5
  },
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
    },
    txtBtn:{
      fontWeight: "bold", 
      color: "white", 
      fontSize: 18
    },
});