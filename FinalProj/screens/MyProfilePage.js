import React, { Component } from "react";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet
} from "react-native";
import { Icon as Icona } from "react-native-elements";
import styles from "../Components/StyleSheet";
import { Icon } from "react-native-elements";
import { DrawerActions } from "react-navigation-drawer";

import * as ImagePicker from "expo-image-picker";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: ""
    };
    this.profileImage = require("../assets/profileIcon.png");
  }

  componentDidMount = async () => {
    this.setState({ img: global.user.Image }, function() {
    });
  };

  openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false, // higher res on iOS
      aspect: [4, 3],
      base64: true,
      quality: 0.1
    });

    if (result.cancelled) {
      return;
    }

    let localUri = result.uri;
    let filename = localUri.split("/").pop();
    let imageBase64 = result.base64;

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    const formData = { base64: imageBase64, imageName: "imgRon1.jpg" };
    console.log("formdata = ", formData);
    await fetch(
      "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/UploadImage",
      {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/Json;"
        }),
        body: JSON.stringify(formData)
      }
    )
      .then(res => {
        return res.json();
      })
      .then(
        result => {
          console.log("result = ", result);
        },
        error => {
          console.log("err post=", error);
        }
      );
  };
  openGallery = async () => {
    // פתיחת גלריה לבחירת תמונה
    if ((await ImagePicker) != null) {
      let result = await ImagePicker.launchImageLibraryAsync({
        // נותן אופציה לשנות את גודל התמונה
        allowsEditing: true,
        // גודל התמונה שתתקבל
        aspect: [4, 3],
        base64: true,
        // איכות התמונה
        quality: 0.5
      });

      // בדיקה אם לא נבחרה תמונה
      if (result.cancelled) {
        console.log("result ", result);
      }
      // אחרי שהמשתמש בחר את תמונת הפרופיל
      else {
        //הקוד של התמונה ושם במשתנה base64 לוקח את ה
        let imageBase64 = result.base64;
        // שם במשתנה הגלובלי את שם התמונה החדשה
        global.user.Image = global.user.UserID + global.user.Email + ".jpg";
        //base64 המידע שאני שלוח לשרת שזה השם שאני רוצה שיהיה לתמונה ואת
        const formData = {
          base64: imageBase64,
          imageName: global.user.UserID + global.user.Email + ".jpg",
          userid: global.user.UserID
        };
        //לעלות את התמונה לשרת fetch עושה
        console.log(
          global.user.UserID + global.user.Email + ".jpg",
          global.user.UserID
        );
        await fetch(
          "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/UploadImage",
          {
            method: "post",
            headers: new Headers({
              "Content-Type": "application/Json;"
            }),
            body: JSON.stringify(formData)
          }
        )
          .then(res => {
            return res.json();
          })
          .then(
            result => {
              this.setState({
                img: global.user.UserID + global.user.Email + ".jpg"
              });

              console.log("result = ", result);
            },
            error => {
              console.log("err post=", error);
            }
          );
      }

      // let localUri = result.uri;
      // let filename = localUri.split("/").pop();
      // let match = /\.(\w+)$/.exec(filename);
      // let type = match ? `image/${match[1]}` : `image`;
    }
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
              <View style={styles.textTopBar}>
                <Text style={styles.bigText}>
                  פרופיל
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

            <View style={s.profileView}>
              <TouchableOpacity style={s.touchProfileImg} onPress={() =>
                  Alert.alert("בחר תמונה", "האם תרצה גלריה/מצלמה?", [
                    {
                      text: "מצלמה",
                      onPress: () => {
                        this.openCamera();
                      }
                    },
                    {
                      text: "גלריה",
                      onPress: () => {
                        this.openGallery();
                      }
                    }
                  ])
                }
              >
                {this.state.img != "" ? (
                  <Image style={s.profileImage}
                    source={{
                      uri:
                        this.state.img ==
                        global.user.UserID + global.user.Email + ".jpg"
                          ? "http://ruppinmobile.tempdomain.co.il/site11/ImageStorage/" +
                            this.state.img +
                            "?time" +
                            new Date()
                          : this.state.img
                    }}
                  />
                ) : (
                  <Image
                    style={s.profileImage}
                    source={this.profileImage}
                  />
                )}
              </TouchableOpacity>
              <Text style={s.txtName} >
                {global.user.FirstName} {global.user.LastName}
              </Text>
              <TouchableOpacity
                style={s.updateButton}
                onPress={() => this.props.navigation.navigate("EditProfilePage")}
              >
                <Text style={styles.register}>
                  עדכון פרטים
                  {"  "}
                </Text>
                <Icon name="edit" type="font-awesome" color="black" size={18} />
              </TouchableOpacity>
              <TouchableOpacity
                style={s.updateButton}
                onPress={() => this.props.navigation.navigate("MyPostsPage")}
              >
                <Text style={styles.register}>
                  הפירסומים שלי
                  {"  "}
                </Text>
                <Icon
                  name="cart-plus"
                  type="font-awesome"
                  color="black"
                  size={18}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={s.updateButton}
                onPress={() => this.props.navigation.navigate("MyAlertsPage")}
              >
                <Text style={styles.register}>
                  ההתראות שלי
                  {"  "}
                </Text>
                <Icon name="bell" type="font-awesome" color="black" size={18} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const s= StyleSheet.create({
profileView:{
  alignItems: "center"
},
  touchProfileImg:{
  backgroundColor: "white",
  marginTop: 20,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderRadius: 100,
  borderColor: "black",
  height: 150,
  width: 150
},
profileImage:{
  height: 150,
  width: 150,
  borderRadius: 100
},
txtName:{
  marginTop: 20,
 marginBottom: 30,
  fontWeight: "bold",
  fontSize: 24
},
 updateButton: {
    flexDirection: "row",
    elevation: 10,
    backgroundColor: "rgba(208, 222, 9,.9)",
    borderRadius: 20,
    height: 40,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 1,
    marginTop: 10
  },
});