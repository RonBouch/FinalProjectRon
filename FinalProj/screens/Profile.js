import React from "react";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  TouchableHighlight
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

  componentDidMount() {
    console.log("global profile ", global.user.Image);
    this.setState({ img: global.user.Image }, function() {
      console.log("img state", this.state.img);
    });
  }
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
                  פרופיל
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Image
                  source={require("../assets/TenYadLogo.png")}
                  style={styles.logo}
                />
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderRadius: 100,
                  borderColor: "black",
                  height: 150,
                  width: 150
                }}
                onPress={this.openGallery}
              >
                {/* בדיקה עם יש תמונה למשתמש. ואם אין למשתמש תמונה אז יהיה תמונת ברירת מחדל.  */}
                {this.state.img != "" ? (
                  <Image
                    style={{
                      height: 150,
                      width: 150,
                      borderRadius: 100
                    }}
                    // אם יש תמונה למשתמש זה נותן את הכתובת לתמונה בשרת.. קורא לתמונה עם התאריך הכי חדש שכל פעם שיחליפו תמונה התמונה תתעדכן
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
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 100
                    }}
                    source={this.profileImage}
                  />
                )}
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: 20,
                  marginBottom: 30,
                  fontWeight: "bold",
                  fontSize: 24
                }}
              >
                {global.user.FirstName} {global.user.LastName}
              </Text>

              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => this.props.navigation.navigate("EditProfile")}
              >
                <Text style={styles.register}>
                  עידכון פרטים
                  {"  "}
                </Text>
                <Icon name="edit" type="font-awesome" color="black" size={18} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => this.props.navigation.navigate("ProfilePost")}
              >
                <Text style={styles.register}>
                  הפירסומים שלי
                  {"  "}
                </Text>
                <Icon name="edit" type="font-awesome" color="black" size={18} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
