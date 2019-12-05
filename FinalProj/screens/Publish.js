import React, { Component } from "react";
import styles from "../Components/StyleSheet";
import * as ImagePicker from 'expo-image-picker';
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
import cities from "../city_list";

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
  SafeAreaView
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
      errors: {},
      resLabel: "",
      Show: false,

      location: null,
      data: "",
      delta: 0.1,
      latitude: 37.78825,
      longitude: -122.4324,

      userName: "",
      userPhone: "",
      itemType: "",
      itemName: "",
      city: "",
      itemAbout: "",
      itemImg: "sdvw",

      imageName:"",
      imageBade64:""
    };
  }

  ItemType = e => {
    this.setState({
      itemType: e
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
      (await Location.geocodeAsync(city)) == "" ||
      (await Location.geocodeAsync(city)) == null
    ) {
      this.setState({
        resLabel: "*עיר או רחוב לא תקינים, נסה שוב!"
      });
      return;
    }

    // let geocode = await Location.geocodeAsync(address);
    // console.log("geocode  = " + geocode[0].latitude);

    // this.setState({
    //   latitude: geocode[0].latitude,
    //   longitude: geocode[0].longitude
    // });
    // console.log("latitdue  = " + this.state.latitude);
  };
  openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false, // higher res on iOS
      aspect: [4, 3],
      base64:true,
      quality:0.1
    });

    if (result.cancelled) {
      return;
    }

    let localUri = result.uri;
    let filename = localUri.split("/").pop();
    let imageBase64 = result.base64;

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    const formData = { base64:imageBase64, imageName: "imgRon1.jpg" };
    console.log("formdata = ", formData);
    await fetch("http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/UploadImage" ,  
    {
      method: "post",
          headers: new Headers({
            "Content-Type": "application/Json;"
          }),
          body: JSON.stringify(formData)
    }).then ( res => {
      return res.json();
    })
    .then(
      result => {
        console.log("result = ",result);
      },
      error => {
        console.log("err post=", error);
      }
    );
  };

  openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality:0.1
    });
    if (!result.cancelled) {
      console.log("result ", result);
      // this.setState({ img: result.uri });
      // alert(this.state.img);
    }
  };

  handleSubmit = async () => {
    if (this.isValid()) {
      const data = {
        userId: 1,
        userName: this.state.userName,
        userPhone: this.state.userPhone,
        itemType: this.state.itemType,
        itemName: this.state.itemName,
        city: this.state.city,
        itemAbout: this.state.itemAbout,
        itemImg: this.state.itemImg
      };
      console.log(JSON.stringify(data));

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

  // onContentSizeChange = (contentWidth, contentHeight) => {
  //   this.setState({ screenHeight: contentHeight });
  // };

  handleSelectItem(item, index) {
    const { onDropdownClose } = this.props;
    onDropdownClose();
    console.log(item);
  }

  render() {
    const autocompletes = [...Array(1).keys()];
    const data = cities;
    const { scrollToInput, onDropdownClose, onDropdownShow } = this.props;

    let itemType = [
      {
        value: "הכל"
      },
      {
        value: "מוצרי חשמל"
      },
      {
        value: "בגדים"
      },
      {
        value: "ריהוט וכלי בית"
      },
      {
        value: "ספרים ומדיה דיגיטלית"
      },
      {
        value: "לתינוק ולילד"
      },
      {
        value: "סיוע חברתי וסביבתי"
      },
      {
        value: "שונות"
      }
    ];

    // const scrollEnabled = this.state.screenHeight > height;
    return (
  

      
    
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

          <TouchableHighlight
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Image
              source={require("../assets/TenYadLogo.png")}
              style={styles.logo}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.container}>



        <View style={styles.autocompletesContainer}>
        <SafeAreaView>
          {autocompletes.map(() => (
            <Autocomplete
              key={shortid.generate()}
              style={styles.input}
              scrollToInput={ev => scrollToInput(ev)}
              handleSelectItem={(item, id) => this.handleSelectItem(item, id)}
              onDropdownClose={() => onDropdownClose()}
              onDropdownShow={() => onDropdownShow()}
              renderIcon={() => (
                <Ionicons name="ios-add-circle-outline" size={20} color="#c7c6c1" style={styles.plus} />
              )}
              data={data}
              // fetchDataUrl={apiUrl}
              minimumCharactersCount={2}
              highlightText
              valueExtractor={item => item.name}
              rightContent
              rightTextExtractor={item => item.properties}
            />
          ))}
        </SafeAreaView>
      </View>
  


        <View style={{ alignItems: "center", marginTop: 10 }}> 
        <ScrollView
                contentContainerStyle={styles.scrollview}
                // scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
              >
                <View style={{ alignItems: "center", marginTop: 10 }}>
                  <Text>באמצעות טופס זה תוכלו לפרסם את הפריט שתרצו לתרום!</Text>


 

                  <View
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 0.2,
                      borderBottomColor: "rgb(150,150,150)",
                      width: 200,
                      margin: 15
                    }}
                  >
                    <Text style={{ color: "red" }}> *</Text>
                    <TextInput
                      placeholder="עיר/יישוב"
                      placeholderTextColor="rgb(150,150,150)"
                      style={{
                        width: "80%",
                        marginRight: "8%",
                        fontSize: 16
                      }}
                      onChangeText={this.City}
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
                        this.setState({ userPhone: e });
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
                        this.setState({ userName: e });
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

                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "red" }}>*</Text>

                    <Dropdown
                      label="קטגוריית הפריט"
                      itemColor="black"
                      dropdownMargins={{ min: 0, max: 1 }}
                      dropdownOffset={{ top: 0, left: 0 }}
                      containerStyle={{ width: "80%", padding: 5 }}
                      data={itemType}
                      onChangeText={this.ItemType}
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
                        style={{
                          width: "100%",
                          textAlign: "center",
                          fontSize: 16
                        }}
                        placeholder="שם הפריט"
                        onChangeText={e => {
                          this.setState({ itemName: e });
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
                        this.setState({ itemAbout: e });
                        console.log(this.state.itemAbout);
                      }}
                      placeholder="ספר בקצרה על הנכס עד 60 תווים..."
                      style={{
                        textAlign: "center",
                        fontSize: 16,
                        width: 200
                      }}
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
                      onPress={() => this.handleSubmit()}
                      style={styles.publishButton}
                    >
                      <Text style={{ color: "white" }}>פרסם פריט {"  "}</Text>
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
  
            {/* <KeyboardAvoidingView style={styles.container} behavior="padding">
            
            </KeyboardAvoidingView> */}

           
          </View>
        </View>
    );
  }
}
export default withKeyboardAwareScrollView(Publish);