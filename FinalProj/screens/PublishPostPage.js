import React, { Component, Fragment } from "react";
import styles from "../Components/StyleSheet";
import * as ImagePicker from "expo-image-picker";
import { Icon } from "react-native-elements";
import { DrawerActions } from "react-navigation-drawer";
import cities from "../cityAndRegion";
import SearchableDropdown from "react-native-searchable-dropdown";
import { Dropdown } from "react-native-material-dropdown";

import {
  Text,
  View,
  Alert,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";

class Publish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      errors: {},
      formData: "",
      userName: "",
      userPhone: "",
      itemType: "",
      itemName: "",
      city: "",
      itemAbout: "",
      img: []
    };
  }

  async componentDidMount() {
    this.GetItemTypes();
  }

  ItemType = (e, i) => {
    this.setState({
      itemType: i + 2
    });
  };

  openCamera = async index => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false, // higher res on iOS
      aspect: [4, 3],
      base64: true,
      quality: 0.1
    });

    if (result.cancelled) {
      console.log("result ", result);
    } else {
      let imageBase64 = result.base64;

      const formData = {
        base64: imageBase64,
        imageName: index + this.state.itemName + global.user.UserID + ".jpg",
        userid: 0
      };

      if (this.state.img.length > 2 || this.state.img[index] != null) {
        const list = this.state.formData.map((item, j) => {
          if (j === index) {
            return formData;
          } else {
            return item;
          }
        });

        let imageArray = this.state.img.filter(image => {
          return image != this.state.img[index];
        });
        imageArray.push(result.uri);
        this.setState({
          img: imageArray,
          formData: list
        });
      } else {
        this.setState({
          formData: [...this.state.formData, formData],
          img: [...this.state.img, result.uri]
        });
      }
    }
  };

  openGallery = async index => {
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

        //base64 המידע שאני שלוח לשרת שזה השם שאני רוצה שיהיה לתמונה ואת
        const formData = {
          base64: imageBase64,
          imageName: index + this.state.itemName + global.user.UserID + ".jpg",
          userid: 0
        };

        if (this.state.img.length > 2 || this.state.img[index] != null) {
          const list = this.state.formData.map((item, j) => {
            if (j === index) {
              return formData;
            } else {
              return item;
            }
          });

          let imageArray = this.state.img.filter(image => {
            return image != this.state.img[index];
          });
          imageArray.push(result.uri);
          this.setState({
            img: imageArray,
            formData: list
          });
        } else {
          this.setState({
            formData: [...this.state.formData, formData],
            img: [...this.state.img, result.uri]
          });
        }
      }
    }
  };

  handleSubmit = async () => {
    if (this.isValid()) {
      const data = {
        userId: global.user.UserID,
        userName: this.state.userName,
        userPhone: this.state.userPhone,
        itemType: this.state.itemType,
        itemName: this.state.itemName,
        city: this.state.selectedItems.name,
        region: this.state.selectedItems.shem_napa,
        itemAbout: this.state.itemAbout,
        itemImg: this.state.itemName + global.user.UserID + ".jpg"
      };
      if (this.state.formData != "" && this.state.formData != null) {
        for (i = 0; this.state.formData[i] != null; i++) {
          const imageToUpload = this.state.formData[i];
          await fetch(
            "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/UploadImage",
            {
              method: "post",
              headers: new Headers({
                "Content-Type": "application/Json;"
              }),
              body: JSON.stringify(imageToUpload)
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
        }

        fetch(
          "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/InsertItem",
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
                  message: "לא ניתן לעלות חפץ זה ."
                });
                return;
              } else {
                this.props.navigation.navigate("PostsListPage");
              }
            },
            error => {
              console.log("err post=", error);
            }
          );
      }
    }
  };

  isValid() {
    let errors = {};
    let formIsValid = true;

    //בדיקה האם הוזן איש קשר
    if (this.state.userName == "") {
      formIsValid = false;
      errors["userName"] = "* אנא הזן איש קשר";
    }
    //בדיקה האם הוזן מספר טלפון
    if (this.state.userPhone == "") {
      formIsValid = false;
      errors["userPhone"] = "* אנא הזן מספר טלפון";
    }
    //בדיקה האם הוזן ישוב
    if (this.state.selectedItems.name == "") {
      formIsValid = false;
      errors["city"] = "* אנא הזן עיר/ישוב ";
    }
    //בדיקה האם הוזן שם פריט
    if (this.state.itemName == "") {
      formIsValid = false;
      errors["itemName"] = "* אנא הזן שם פריט ";
    }
    //בדיקה האם הוזן שם פריט
    if (this.state.itemType == "") {
      formIsValid = false;
      errors["itemType"] = "* אנא הזן קטגורית פריט ";
    }
    this.setState({
      errors: errors
    });
    return formIsValid;
  }
  GetItemTypes = async () => {
    fetch(
      "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/GetItemTypes",
      {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/Json;"
        })
      }
    )
      .then(res => {
        return res.json();
      })
      .then(
        result => {
          let itemTypes = JSON.parse(result.d);
          if (itemTypes == null) {
            this.setState({
              message: "לא קיימים סוגי פריטים"
            });
            return;
          } else {
            this.setState({
              itemTypes: itemTypes
            });
          }
        },
        error => {
          console.log("err post=", error);
        }
      );
  };

  render() {
    let ItemTypes = [];
    if (this.state.itemTypes != null) {
      this.state.itemTypes.map((type, index) => {
        if (index != 0) {
          ItemTypes.push({ value: type.ItemType });
        }
      });
    }
    const data = cities;

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
                <Icon
                  iconStyle={{ marginEnd: "10%" }}
                  name="bars"
                  type="font-awesome"
                  color="white"
                  size={28}
                />
              </TouchableOpacity>
              <View style={styles.textTopBar}>
                <Text style={styles.bigText}>פרסם תרומה</Text>
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
            <KeyboardAvoidingView style={styles.container} behavior="padding">
              <ScrollView keyboardShouldPersistTaps="always">
                <View style={s.titleView}>
                  <Text>פרטים:</Text>
                </View>
                <View style={{ alignItems: "center", width: "100%" }}>
                  {/* איש קשר  */}
                  <View style={s.publishInput}>
                    <Icon
                      name="user"
                      type="font-awesome"
                      color="black"
                      size={24}
                    />

                    <TextInput
                      value={this.state.userName}
                      placeholder="איש קשר"
                      placeholderTextColor="rgb(150,150,150)"
                      onChangeText={e => {
                        this.setState({ userName: e });
                      }}
                      style={s.textInputStyle}
                    />
                  </View>
                  {/* מס' טלפון */}
                  <View style={s.publishInput}>
                    <Icon
                      name="phone"
                      type="font-awesome"
                      color="black"
                      size={24}
                    />

                    <TextInput
                      value={this.state.userPhone}
                      keyboardType="number-pad"
                      placeholderTextColor="rgb(150,150,150)"
                      placeholder="מס' טלפון"
                      onChangeText={e => {
                        this.setState({ userPhone: e });
                      }}
                      style={s.textInputStyle}
                    />
                  </View>
                  {/* עיר ישוב */}
                  <View style={s.publishInput}>
                    <Icon
                      name="map-marker"
                      type="font-awesome"
                      color="black"
                      size={24}
                    />

                    <Fragment>
                      <SearchableDropdown
                        placeholderTextColor="rgb(150,150,150)"
                        onItemSelect={item => {
                          this.setState({ selectedItems: item });
                        }}
                        containerStyle={{ width: "100%" }}
                        itemStyle={{
                          padding: 10,
                          height: 30,
                          backgroundColor: "white"
                        }}
                        itemsContainerStyle={{ maxHeight: 240 }}
                        items={data}
                        // defaultIndex={2}
                        resetValue={false}
                        textInputStyle={s.textInputStyle}
                        textInputProps={{
                          placeholder: "עיר/ישוב",
                          underlineColorAndroid: "transparent",

                          onTextChange: text => console.log(text)
                        }}
                        listProps={{
                          nestedScrollEnabled: true
                        }}
                      />
                    </Fragment>
                  </View>
                  {/* שם הפריט  */}
                  <View style={s.publishInput}>
                    <Icon
                      name="edit"
                      type="font-awesome"
                      color="black"
                      size={24}
                    />
                    <TextInput
                      value={this.state.itemName}
                      placeholderTextColor="rgb(150,150,150)"
                      style={s.textInputStyle}
                      placeholder="שם הפריט"
                      onChangeText={e => {
                        this.setState({ itemName: e });
                      }}
                    />
                  </View>
                  {/* קטגוריית הפריט */}
                  <View style={s.publishInput}>
                    <Icon
                      name="mouse-pointer"
                      type="font-awesome"
                      color="black"
                      size={24}
                    />

                    <Dropdown
                      placeholderTextColor="rgb(150,150,150)"
                      itemColor="black"
                      baseColor="black"
                      placeholder="קטגוריית הפריט"
                      value={this.state.itemType}
                      style={s.textInputStyle}
                      dropdownMargins={{ min: 0, max: 10 }}
                      dropdownOffset={{ top: 0, left: 0 }}
                      data={ItemTypes}
                      onChangeText={(e, i) => this.ItemType(e, i)}
                      inputContainerStyle={{ borderBottomWidth: 0 }}
                      containerStyle={{ width: "90%" }}
                    />
                  </View>
                  {/* על הפריט */}
                  <View style={s.titleView}>
                    <Text>תיאור:</Text>
                    <View
                      style={{
                        margin: 5,
                        width: 300,
                        borderRadius: 10,
                        backgroundColor: "white",
                        justifyContent: "center",
                        elevation: 5,
                        borderColor: "black"
                      }}
                    >
                      <TextInput
                        value={this.state.itemAbout}
                        numberOfLines={4}
                        multiline={true}
                        maxLength={60}
                        onChangeText={e => {
                          this.setState({ itemAbout: e });
                        }}
                        placeholderTextColor="rgb(150,150,150)"
                        placeholder="תאר את הפריט עד 60 תווים"
                        style={s.textInputStyle}
                      />
                    </View>
                  </View>
                  {/* מצלמה/גלריה */}
                  <View style={s.uploadImageView}>
                    <Text>תמונה:</Text>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={s.uploadImageTouch}
                        onPress={() =>
                          Alert.alert("בחר תמונה", "האם תרצה גלריה/מצלמה?", [
                            {
                              text: "מצלמה",
                              onPress: () => {
                                this.openCamera(0);
                              }
                            },
                            {
                              text: "גלריה",
                              onPress: () => {
                                this.openGallery(0);
                              }
                            }
                          ])
                        }
                      >
                        {this.state.img[0] != null ? (
                          <Image
                            style={s.uploadImage}
                            source={{ uri: this.state.img[0] }}
                          ></Image>
                        ) : (
                          <Image
                            style={s.uploadImage}
                            source={require("../assets/plusBackground.png")}
                          ></Image>
                        )}
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={s.uploadImageTouch}
                        onPress={() =>
                          Alert.alert("בחר תמונה", "האם תרצה גלריה/מצלמה?", [
                            {
                              text: "מצלמה",
                              onPress: () => {
                                this.openCamera(1);
                              }
                            },
                            {
                              text: "גלריה",
                              onPress: () => {
                                this.openGallery(1);
                              }
                            }
                          ])
                        }
                      >
                        {this.state.img[1] != null ? (
                          <Image
                            style={s.uploadImage}
                            source={{ uri: this.state.img[1] }}
                          ></Image>
                        ) : (
                          <Image
                            style={s.uploadImage}
                            source={require("../assets/plusBackground.png")}
                          ></Image>
                        )}
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={s.uploadImageTouch}
                        onPress={() =>
                          Alert.alert("בחר תמונה", "האם תרצה גלריה/מצלמה?", [
                            {
                              text: "מצלמה",
                              onPress: () => {
                                this.openCamera(2);
                              }
                            },
                            {
                              text: "גלריה",
                              onPress: () => {
                                this.openGallery(2);
                              }
                            }
                          ])
                        }
                      >
                        {this.state.img[2] != null ? (
                          <Image
                            style={s.uploadImage}
                            source={{ uri: this.state.img[2] }}
                          ></Image>
                        ) : (
                          <Image
                            style={s.uploadImage}
                            source={require("../assets/plusBackground.png")}
                          ></Image>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/* פרסם פריט */}
                  <View>
                    <TouchableOpacity
                      onPress={() => this.handleSubmit()}
                      style={s.publishButton}
                    >
                      <Text style={{ color: "white", fontSize: 20 }}>
                        הוסף {"  "}
                      </Text>
                      <Icon
                        name="cart-plus"
                        type="font-awesome"
                        color="white"
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ height: 50, justifyContent: "center" }}>
                    <Text style={styles.textMessage}>
                      {this.state.errors.userName ||
                        this.state.errors.userPhone ||
                        this.state.errors.city ||
                        this.state.errors.itemName ||
                        this.state.errors.itemType}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
export default Publish;
const s = StyleSheet.create({
  titleView: {
    marginTop: 10,
    padding: 5
  },
  textInputStyle: {
    marginLeft: "8%",
    fontSize: 14
  },
  aboutView: {
    color: "rgba(255,255,255,.9)",
    fontWeight: "bold",
    fontSize: 25,
    fontFamily: "serif",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 4 },
    textShadowRadius: 5
  },
  uploadImageView: {
    marginTop: 30,
    padding: 5,
    borderRadius: 40
  },
  uploadImage: {
    height: 120,
    width: 100,
    borderRadius: 10
  },
  uploadImageTouch: {
    margin: 5,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white"
  },
  publishButton: {
    backgroundColor: "#6495ed",
    flexDirection: "row",
    height: 45,
    marginTop: 30,
    width: 180,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 1
  },
  radioPublish: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "center"
  },
  addImage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  uploadIcon: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    marginTop: 5
  },
  publishInput: {
    flexDirection: "row",
    marginTop: 20,
    width: "70%",
    borderBottomWidth: 0.5,
    borderColor: "black"
  }
});
