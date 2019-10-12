import React, { Component } from "react";
import RadioForm from "react-native-simple-radio-button";
import styles from "../Components/StyleSheet";
import { Location, Permissions, ImagePicker } from "expo";
// import CheckBox from 'react-native-check-box'
import { Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { Dropdown } from "react-native-material-dropdown";

const radio_props = [
  {
    label: "  השכרה  ",
    value: "R"
  },
  {
    label: "  מכירה  ",
    value: "B"
  }
];

const { height, width } = Dimensions.get("window");

const DissmisKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class Publish extends React.Component {
  constructor(props) {
    super(props);
    this.rentOrSell = "";
    let formIsValid = false;
    this.state = {
      errors: {},
      resLabel: "",
      Show: false,
      location: null,
      data: "",
      delta: 0.1,
      latitude: 37.78825,
      longitude: -122.4324,

      address: "",
      phone: "",
      name: "",
      type: "",
      room: "",
      floor: "",
      squareMeter: "",
      about: "",
      price: "",
      img: "H5.jpg"
    };
  }
  HouseType = e => {
    this.setState({
      type: e
    });
  };
  HouseRooms = e => {
    this.setState({
      room: e
    });
  };
  postType = e => {
    this.rentOrSell = e;
  };

  handleAddress = e => {
    this.setState({
      address: e
    });
  };

  openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false, // higher res on iOS
      aspect: [4, 3]
    });

    if (result.cancelled) {
      return;
    }

    let localUri = result.uri;
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append("photo", { uri: localUri, name: filename, type });
    console.log("formdata = ", formData);
    return await fetch("http://ruppinmobile.tempdomain.co.il/site11/image", {
      method: "POST",
      body: formData,
      header: {
        "content-type": "multipart/form-data"
      }
    });
  };

  openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    if (!result.cancelled) {
      console.log("result ", result);
      // this.setState({ img: result.uri });
      // alert(this.state.img);
    }
  };

  handleSubmit = async () => {
    if (this.isValid()) {
      const { address } = this.state;
      var detials = address.split(",", 2);
      console.log("detials = " + detials);
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
        (await Location.geocodeAsync(address)) == "" ||
        (await Location.geocodeAsync(address)) == null
      ) {
        this.setState({
          resLabel: "*עיר או רחוב לא תקינים, נסה שוב!"
        });
        return;
      }
      if (this.state.about == "" || this.state.name == "") {
        this.setState({
          resLabel: "*אנא מלא את כל השדות!."
        });
        return;
      }
      let geocode = await Location.geocodeAsync(address);
      console.log("geocode  = " + geocode[0].latitude);

      this.setState({
        latitude: geocode[0].latitude,
        longitude: geocode[0].longitude
      });
      console.log("latitdue  = " + this.state.latitude);

      const data = {
        userid: id,
        address: this.state.address,
        lati: this.state.latitude,
        longi: this.state.longitude,
        name: this.state.name,
        about: this.state.about,
        phone: this.state.phone,
        img: this.state.img,
        price: this.state.price,
        room: this.state.room,
        floor: this.state.floor,
        type: this.state.type,
        squareMeter: this.state.squareMeter,
        rb: this.rentOrSell
      };
      console.log(JSON.stringify(data));

      fetch(
        "http://ruppinmobile.tempdomain.co.il/site11/WebServise.asmx/InsertHouse",
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
            }
             else
              {
              this.props.navigation.navigate("HomePage");
            }
          },
          error => {
            console.log("err post=", error);
          }
        );
    }
  };

  isValid() {
    let valid = false;
    const { address } = this.state;
    if (address.length !== 0) {
      valid = true;
    }
    if(this.name==""||this.room==""||this.address==""||this.phone==""||this.price==""||this.type==""||this.rentOrSell==""){
      valid=false;
      this.setState({
        resLabel:"אנא מלא שדות חובה!"
      })
    }
    return valid;
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  render() {
    let houseRooms = [
      {
        value: "1"
      },
      {
        value: "1.5"
      },
      {
        value: "2"
      },
      {
        value: "2.5"
      },
      {
        value: "3"
      },
      {
        value: "3.5"
      },
      {
        value: "4"
      },
      {
        value: "4.5"
      },
      {
        value: "5"
      }
    ];
    let houseType = [
      {
        value: "דירה"
      },
      {
        value: "דירת גן"
      },
      {
        value: "פרטי"
      },
      {
        value: "פנטהאוז"
      },
      {
        value: "יחידת דיור"
      },
      {
        value: "מגרש"
      }
    ];

    const scrollEnabled = this.state.screenHeight > height - 300;
    return (
      <ImageBackground
        source={require("../assets/bg.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={styles.main}>
            <View style={styles.logo}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon
                  name="arrow-circle-left"
                  type="font-awesome"
                  iconStyle={{ marginLeft: "85%" }}
                  color="black"
                  size={34}
                />
              </TouchableOpacity>
              <Image
                source={require("../assets/logo2.jpg")}
                style={{ width: 150, height: 150 }}
                resizeMode="contain"
              />
            </View>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
              <ScrollView
                contentContainerStyle={styles.scrollview}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
              >
                <View style={{ alignItems: "center",marginTop:10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 0.2,
                      borderBottomColor: "rgb(150,150,150)",
                      width: 200,
                      marginBottom: 15
                    }}
                  >
                    <Text style={{ color: "red" }}> *</Text>
                    <TextInput
                      placeholder="כתובת הנכס"
                      placeholderTextColor="rgb(150,150,150)"
                      style={{
                        width: "80%",
                        marginRight: "8%",
                        fontSize: 16
                      }}
                      onChangeText={this.handleAddress}
                    />
                    <Icon
                      name="map-marker"
                      type="font-awesome"
                      color="rgb(150,150,150)"
                      size={24}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 0.2,
                      borderBottomColor: "rgb(150,150,150)",
                      width: 200,
                      marginBottom: 15
                    }}
                  >
                    <Text style={{ color: "red" }}> *</Text>

                    <TextInput
                      keyboardType="number-pad"
                      placeholderTextColor="rgb(150,150,150)"
                      placeholder={"מס' טלפון"}
                      onChangeText={e => {
                        this.setState({ phone: e });
                      }}
                      style={{ width: "80%", marginRight: "8%", fontSize: 16 }}
                    />
                    <Icon
                      name="phone"
                      type="font-awesome"
                      color="rgb(150,150,150)"
                      size={24}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 0.2,
                      borderBottomColor: "rgb(150,150,150)",
                      width: 200,
                      marginBottom: 15
                    }}
                  >
                    <Text style={{ color: "red" }}> *</Text>

                    <TextInput
                      placeholder="איש קשר"
                      placeholderTextColor="rgb(150,150,150)"
                      onChangeText={e => {
                        this.setState({ name: e });
                      }}
                      style={{ width: "80%", marginRight: "8%", fontSize: 16 }}
                    />
                    <Icon
                      name="user"
                      type="font-awesome"
                      color="rgb(150,150,150)"
                      size={24}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    <Text style={{ color: "red" }}>*</Text>
                    <RadioForm
                      radio_props={radio_props}
                      initial={null}
                      style={styles.radioPublish}
                      onPress={this.postType}
                    />
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "red" }}>*</Text>

                    <Dropdown
                      label="סוג הנכס"
                      itemColor="black"
                      dropdownMargins={{ min: 0, max: 1 }}
                      dropdownOffset={{ top: 0, left: 0 }}
                      containerStyle={{ width: 110, padding: 5 }}
                      data={houseType}
                      onChangeText={this.HouseType}
                    />
                    <Text style={{ color: "red" }}>*</Text>

                    <Dropdown
                      label="מס' חדרים"
                      itemColor="black"
                      dropdownMargins={{ min: 0, max: 1 }}
                      dropdownOffset={{ top: 0, left: 0 }}
                      containerStyle={{ width: 110, padding: 5 }}
                      data={houseRooms}
                      onChangeText={this.HouseRooms}
                    />
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        borderBottomWidth: 0.2,
                        borderBottomColor: "rgb(150,150,150)",
                        width: 105,
                        padding: 5
                      }}
                    >
                      <TextInput
                        placeholderTextColor="rgb(150,150,150)"
                        keyboardType="number-pad"
                        style={{
                          width: "100%",
                          textAlign: "center",
                          fontSize: 16
                        }}
                        onChangeText={e => {
                          this.setState({ floor: e });
                        }}
                        placeholder="קומה"
                      />
                    </View>
                    <View style={{ width: 10 }} />
                    <View
                      style={{
                        borderBottomWidth: 0.2,
                        borderBottomColor: "rgb(150,150,150)",
                        width: 105,
                        padding: 5
                      }}
                    >
                      <TextInput
                        placeholderTextColor="rgb(150,150,150)"
                        keyboardType="number-pad"
                        style={{
                          width: "100%",
                          textAlign: "center",
                          fontSize: 16
                        }}
                        placeholder="גודל במ'ר"
                        onChangeText={e => {
                          this.setState({ squareMeter: e });
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                      borderWidth: 1,
                      width: 210,
                      height: 100,
                      backgroundColor: "white",
                      justifyContent: "center",
                      borderColor: "black"
                    }}
                  >
                    <TextInput
                      multiline={true}
                      maxLength={60}
                      onChangeText={e => {
                        this.setState({ about: e });
                      }}
                      placeholder="ספר בקצרה על הנכס עד 60 תווים..."
                      style={{
                        textAlign: "center",
                        fontSize: 16,
                        width: 200
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 1,
                      borderBottomColor: "rgb(100,100,100)",
                      width: 150,
                      padding: 5,
                      marginTop: 15,
                      marginBottom: 10
                    }}
                  >
                    <Text style={{ color: "red" }}> *</Text>

                    <TextInput
                      placeholderTextColor="rgb(100,100,100)"
                      keyboardType="number-pad"
                      placeholder="מחיר"
                      style={{ width: "70%", marginRight: "10%", fontSize: 16 }}
                      onChangeText={e => {
                        this.setState({ price: e });
                      }}
                    />
                    <Icon
                      name="shekel"
                      type="font-awesome"
                      color="rgb(100,100,100)"
                      size={24}
                    />
                  </View>

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
                  </View>

                  <View>
                    <TouchableOpacity
                      onPress={this.handleSubmit}
                      style={styles.publishButton}
                    >
                      <Text style={{ color: "white" }}>פרסם נכס {"  "}</Text>
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
            </KeyboardAvoidingView>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
