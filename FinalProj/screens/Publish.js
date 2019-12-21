import React, { Component, Fragment } from "react";
import styles from "../Components/StyleSheet";
import * as ImagePicker from "expo-image-picker";
// import Constants from 'expo-constants';
// import * as Permissions from 'expo-permissions';
import { Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "react-navigation-drawer";
import shortid from "shortid";
import {
  Autocomplete,
  withKeyboardAwareScrollView
} from "react-native-dropdown-autocomplete";
// import cities from "../city_list";
import cities from "../cityAndRegion";

import SearchableDropdown from "react-native-searchable-dropdown";

import {
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  ImageBackground
} from "react-native";
import { Dropdown } from "react-native-material-dropdown";

// const { height, width } = Dimensions.get("window");

// const DissmisKeyboard = ({ children }) => (
//   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//     {children}
//   </TouchableWithoutFeedback>
// );

class Publish extends React.Component {
  constructor(props) {
    super(props);
    this.rentOrSell = "";
    let formIsValid = false;
    this.state = {
      selectedItems: [],

      errors: {},
      resLabel: "",
      Show: false,

      location: null,
      data: "",
      delta: 0.1,
      latitude: 37.78825,
      longitude: -122.4324,
      formData: "",

      userName: "",
      userPhone: "",
      itemType: "",
      itemName: "",
      city: "",
      itemAbout: "",
      itemImg: "sdvw",

      imageName: "",
      imageBade64: ""
    };
  }
  componentDidMount() {
    this.GetItemTypes();
  }

  ItemType = (e, i) => {
    this.setState({
      itemType: i + 2
    });
  };

  City = e => {
    this.setState({
      city: e
    });
  };
  UserPhone = e => {
    this.setState({
      userPhone: e
    });
  };
  UserName = e => {
    this.setState({
      userName: e
    });
  };
  ItemName = e => {
    this.setState({
      itemName: e
    });
  };
  ItemAbout = e => {
    this.setState({
      itemAbout: e
    });
  };

  CheckCity = async () => {
    const { city } = this.state;
    var detials = city.split(",", 2);
    if (detials[1] !== "") {
      this.setState({
        delta: 0.01
      });
    } else {
      this.setState({
        delta: 0.2
      });
    }
    if (
      (await Location.geocodeAsync(city)) == "" ||
      (await Location.geocodeAsync(city)) == null
    ) {
      this.setState({
        resLabel: "*עיר או רחוב לא תקינים, נסה שוב!"
      });
      return;
    }

    // let geocode = await Location.geocodeAsync(address);

    // this.setState({
    //   latitude: geocode[0].latitude,
    //   longitude: geocode[0].longitude
    // });
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

        //base64 המידע שאני שלוח לשרת שזה השם שאני רוצה שיהיה לתמונה ואת
        const formData = {
          base64: imageBase64,
          imageName: global.user.UserID + this.state.itemName + ".jpg"
        };
        this.setState({ formData: formData });
        //לעלות את התמונה לשרת fetch עושה

        // await fetch(
        //   "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/UploadImage",
        //   {
        //     method: "post",
        //     headers: new Headers({
        //       "Content-Type": "application/Json;"
        //     }),
        //     body: JSON.stringify(formData)
        //   }
        // )
        //   .then(res => {
        //     return res.json();
        //   })
        //   .then(
        //     result => {
        //       this.setState({
        //         img: global.user.UserID + global.user.Email + ".jpg"
        //       });

        //       console.log("result = ", result);
        //     },
        //     error => {
        //       console.log("err post=", error);
        //     }
        //   );
        //   }
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
        itemImg:
          this.state.formData.imageName != null
            ? this.state.formData.imageName
            : "",
        base64:
          this.state.formData.base64 != null ? this.state.formData.base64 : ""
      };

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
            console.log("fetch POST= ", result);
            let u = JSON.parse(result.d);
            console.log("u = " + u);
            if (u == null) {
              this.setState({
                message: "לא ניתן לעלות חפץ זה ."
              });
              return;
            } else {
              this.props.navigation.navigate("Home");
            }
          },
          error => {
            console.log("err post=", error);
          }
        );
    }
  };

  isValid() {
    // let valid = false;
    // const { address } = this.state;
    // if (address.length !== 0) {
    //   valid = true;
    // }
    // if(this.name==""||this.room==""||this.address==""||this.phone==""||this.price==""||this.type==""||this.rentOrSell==""){
    //   valid=false;
    //   this.setState({
    //     resLabel:"אנא מלא שדות חובה!"
    //   })
    // }
    // return valid;
    return true;
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
  handleSelectItem(item, index) {
    const { onDropdownClose } = this.props;
    onDropdownClose();
    // console.log(item);
  }

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
    // const napa =[];
    // if(data!=null){
    //   data.map((city,i)=>{
     
    //     if(napa.includes(city.lishka)!=true)
    //     {

    //       napa.push(city.lishka);

    //     }
    //   })
    // }
    // console.log("napa  == = = = = ", napa)

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
                <Icon
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
                  פרסם פריט
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

            <ScrollView style={styles.scrollview}>
              <View
                style={{ alignItems: "center", marginTop: 10, width: "100%" }}
              >
                {/* שם הפריט  */}

                <View style={styles.publushInput}>
                  <Icon
                    name="edit"
                    type="font-awesome"
                    color="rgb(150,150,150)"
                    size={24}
                  />
                  <TextInput
                    placeholderTextColor="rgb(150,150,150)"
                    style={{
                      marginLeft: "8%",
                      fontSize: 14
                    }}
                    placeholder="שם הפריט"
                    onChangeText={e => {
                      this.setState({ itemName: e });
                    }}
                  />
                </View>

                {/* קטגוריית הפריט */}

                <View style={styles.publushInput}>
                  <Icon
                    name="mouse-pointer"
                    type="font-awesome"
                    color="rgb(150,150,150)"
                    size={24}
                  />
                  {/* <Text style={{ color: "red" }}>*</Text> */}

                  <Dropdown
                    // label="קטגוריית הפריט"
                    placeholderTextColor="rgb(150,150,150)"
                    itemColor="black"
                    placeholder="קטגוריית הפריט"
                    style={{ marginLeft: "8%", fontSize: 14 }}
                    dropdownMargins={{ min: 0, max: 1 }}
                    dropdownOffset={{ top: 0, left: 0 }}
                    data={ItemTypes}
                    onChangeText={(e, i) => this.ItemType(e, i)}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    containerStyle={{ width: "90%", height: 10 }}
                  />
                </View>

                {/* עיר ישוב */}
                <View style={styles.publushInput}>
                  <Icon
                    name="map-marker"
                    type="font-awesome"
                    color="rgb(150,150,150)"
                    size={24}
                  />
                  <Fragment>
                    {/* Single */}
                    <SearchableDropdown
                      // onPress={(item) => {
                      //   // const items = this.state.selectedItems;
                      //   // items.push(item)
                      //   this.setState({ selectedItems: item });
                      // }}
                      placeholderTextColor="rgb(150,150,150)"
                      onItemSelect={item => {
                        console.log(item,"item")
                        // const items = this.state.selectedItems;
                        // items.push(item)
                        this.setState({ selectedItems: item });
                      }}
                      containerStyle={{ width: "100%" }}
                      // onRemoveItem={(item, index) => {
                      //   const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                      //   this.setState({ selectedItems: items });
                      // }}
                      itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: "white",
                        borderColor: "#bbb",
                        borderWidth: 1,
                        borderRadius: 5
                      }}
                      itemTextStyle={{ color: "#222" }}
                      itemsContainerStyle={{ maxHeight: 200 }}
                      items={data}
                      // defaultIndex={2}
                      resetValue={false}
                      textInputProps={{
                        placeholder: "עיר/ישוב",
                        underlineColorAndroid: "transparent",
                        style: {
                          //  margin: 10,
                          //  borderWidth: 1,

                          marginLeft: "8%",
                          fontSize: 14

                          //  borderBottomColor: "rgb(150,150,150)",
                        },
                        onTextChange: text => console.log(text)
                      }}
                      listProps={{
                        nestedScrollEnabled: true
                      }}
                    />
                  </Fragment>
                </View>

                {/* מס' טלפון */}
                <View style={styles.publushInput}>
                  <Icon
                    name="phone"
                    type="font-awesome"
                    color="rgb(150,150,150)"
                    size={24}
                  />
                  {/* <Text style={{ color: "red" }}> *</Text> */}

                  <TextInput
                    keyboardType="number-pad"
                    placeholderTextColor="rgb(150,150,150)"
                    placeholder={"מס' טלפון"}
                    onChangeText={e => {
                      this.setState({ userPhone: e });
                    }}
                    style={{ marginLeft: "8%", fontSize: 14 }}
                  />
                </View>

                {/* איש קשר  */}

                <View style={styles.publushInput}>
                  <Icon
                    name="user"
                    type="font-awesome"
                    color="rgb(150,150,150)"
                    size={24}
                  />
                  {/* <Text style={{ color: "red" }}> *</Text> */}

                  <TextInput
                    placeholder="איש קשר"
                    placeholderTextColor="rgb(150,150,150)"
                    onChangeText={e => {
                      this.setState({ userName: e });
                    }}
                    style={{ marginLeft: "8%", fontSize: 14 }}
                  />
                </View>

                {/* על הפריט */}
                <View
                  style={{
                    marginTop: 20,
                    borderWidth: 0.5,
                    width: "70%",
                    height: 100,
                    backgroundColor: "rgba(255,255,255,.01)",
                    justifyContent: "center",
                    borderColor: "black"
                  }}
                >
                  <TextInput
                    multiline={true}
                    maxLength={60}
                    onChangeText={e => {
                      this.setState({ itemAbout: e });
                    }}
                    placeholderTextColor="rgb(150,150,150)"
                    placeholder="ספר בקצרה על הפריט עד 60 תווים..."
                    style={{
                      textAlign: "center",
                      fontSize: 16
                    }}
                  />
                </View>

                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <TouchableOpacity
                    style={{
                      margin: 5,
                      borderWidth: 1
                    }}
                  >
                    <Image
                      style={{
                        height: 120,
                        width: 100
                      }}
                      source={require("../assets/plusBackground.png")}
                    ></Image>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      margin: 5,
                      borderWidth: 1
                    }}
                  >
                    <Image
                      style={{
                        height: 120,
                        width: 100
                      }}
                      source={require("../assets/plusBackground.png")}
                    ></Image>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      margin: 5,
                      borderWidth: 1
                    }}
                  >
                    <Image
                      style={{
                        height: 120,
                        width: 100
                      }}
                      source={require("../assets/plusBackground.png")}
                    ></Image>
                  </TouchableOpacity>
                </View>
                {/* מצלמה */}
                {/* 
                <View style={styles.addImage}>
                  <TouchableOpacity
                    onPress={this.openCamera}
                    style={styles.uploadIcon}
                  >
                    <View>
                      <Ionicons name="ios-camera" size={60} color="black" />
                    </View>
                    <Text style={styles.textIcon}>מצלמה</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={this.openGallery}
                    style={styles.uploadIcon}
                  >
                    <View>
                      <Ionicons name="md-images" size={60} color="black" />
                      <Text style={styles.textIcon}> גלריה</Text>
                    </View>
                  </TouchableOpacity>
                </View> */}

                {/* פרסם פריט */}
                <View>
                  <TouchableOpacity
                    onPress={() => this.handleSubmit()}
                    style={styles.publishButton}
                  >
                    <Text style={{ color: "white" }}>פרסם {"  "}</Text>
                    <Icon
                      name="upload"
                      type="font-awesome"
                      color="white"
                      size={18}
                    />
                  </TouchableOpacity>
                </View>

                {!this.state.Show && (
                  <Text style={{ color: "red" }}> {this.state.resLabel}</Text>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
export default Publish;
