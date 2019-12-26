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
} from "react-native";

class Publish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      errors: {},
      resLabel: "",
      showErrLabel: false,
      formData: "",

      userName: "",
      userPhone: "",
      itemType: "",
      itemName: "",
      city: "",
      itemAbout: "",
      img:[],

    };

  }

  onFocusFunction = async() => {
    console.log("Focus s")
   this.setState({
    userName: "",
    userPhone: "",
    itemType: "",
    itemName: "",
    city: "",
    itemAbout: "",
    img:[],
    formData: "",
    selectedItems: [],



   })
    this.GetItemTypes();

    // do some stuff on every screen focus
  };

  // add a focus listener onDidMount
  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.onFocusFunction();
    });
  }

  // and don't forget to remove the listener
  componentWillUnmount() {
    console.log("WILL MOUNT")
    this.focusListener.remove();
  }



  ItemType = (e, i) => {
    this.setState({
      itemType: i + 2
    });
  };

  openCamera = async (index) => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false, // higher res on iOS
      aspect: [4, 3],
      base64: true,
      quality: 0.1
    });

    if (result.cancelled) {
      console.log("result ", result);
    }
    else{

      let imageBase64 = result.base64;

      const formData = {
        base64: imageBase64,
        imageName: index+this.state.itemName+global.user.UserID+".jpg",
        userid:0,
      };
      console.log(formData.imageName)

      if(this.state.img.length>2||this.state.img[index]!=null){
          
        const list = this.state.formData.map((item, j) => {
            if (j === index) {
              return formData;
            } else {
              return item;
            }
        })
         
        let imageArray = this.state.img.filter(image => {
          return (
            image != this.state.img[index]
                        );
        });
        imageArray.push(result.uri)
       this.setState({
         img:imageArray,
         formData:list,
       })
      }
      else{
        this.setState({ 
          formData: [...this.state.formData,formData],
          img:[...this.state.img, result.uri] 
        });

      }
    }

    
    // let filename = localUri.split("/").pop();
    // let imageBase64 = result.base64;

    // let match = /\.(\w+)$/.exec(filename);
    // let type = match ? `image/${match[1]}` : `image`;

    // const formData = { base64: imageBase64, imageName: "imgRon1.jpg" };

  };

  openGallery = async (index) => {
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
          imageName: index+this.state.itemName+global.user.UserID+".jpg",
          userid:0,
        };
      
        console.log(formData.imageName)

        
        if(this.state.img.length>2||this.state.img[index]!=null){
          
          const list = this.state.formData.map((item, j) => {
              if (j === index) {
                return formData;
              } else {
                return item;
              }
          })
           
          let imageArray = this.state.img.filter(image => {
            return (
              image != this.state.img[index]
                          );
          });
          imageArray.push(result.uri)
         this.setState({
           img:imageArray,
           formData:list,
         })
        }
        else{
          this.setState({ 
            formData: [...this.state.formData,formData],
            img:[...this.state.img, result.uri] 
          });
  
        }
      }
    }
  }

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
        itemImg:this.state.itemName+global.user.UserID+".jpg"
        };
        if(this.state.formData!=""&&this.state.formData!=null){
     
         for(i=0;this.state.formData[i]!=null;i++)
         {
           const imageToUpload=this.state.formData[i];
           console.log("send pic to upload", JSON.stringify(imageToUpload.imageName))
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

        // console.log( JSON.stringify(data))
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
              this.props.navigation.navigate("Contribution");
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
  
  render() {
    console.log("STATE + ",this.state)
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
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Image
                  source={require("../assets/TenYadLogo.png")}
                  style={styles.logo}
                />
              </TouchableOpacity>
            </View>

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
                  value={this.state.itemName}
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
                  value={this.state.itemType==""?this.state.itemType:null}

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
                      console.log(item, "item");
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
                  value={this.state.userPhone}

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
                  value={this.state.userName}

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
                  value={this.state.itemAbout}

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

       
            {/* מצלמה/גלריה */}
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <TouchableOpacity style={{ margin: 5, borderWidth: 1 }} 
                   onPress={() =>Alert.alert(
                  'בחר תמונה',
                  'האם תרצה גלריה/מצלמה?',
                  [
                    {text: 'מצלמה', onPress: () => {this.openCamera(0)}},
                    {text: 'גלריה', onPress: () => {this.openGallery(0)}}
                   ])}
                    >
                 {this.state.img[0]!=null? <Image
                      style={{
                        height: 120,
                        width: 100
                      }}
                      source={{uri:this.state.img[0]}}
                    ></Image>: <Image
                    style={{
                      height: 120,
                      width: 100
                    }}
                    source={require("../assets/plusBackground.png")}
                  ></Image>}
                   
                  </TouchableOpacity>



                  <TouchableOpacity  style={{ margin: 5, borderWidth: 1 }}  onPress={() =>Alert.alert(
                  'בחר תמונה',
                  'האם תרצה גלריה/מצלמה?',
                  [
                    {text: 'מצלמה', onPress: () => {this.openCamera(1)}},
                    {text: 'גלריה', onPress: () => {this.openGallery(1)}}
                   ])}
                    >
              {this.state.img[1]!=null? <Image
                      style={{
                        height: 120,
                        width: 100
                      }}
                      source={{uri:this.state.img[1]}}
                    ></Image>: <Image
                    style={{
                      height: 120,
                      width: 100
                    }}
                    source={require("../assets/plusBackground.png")}
                  ></Image>}
                   
                  </TouchableOpacity>



                  <TouchableOpacity  style={{ margin: 5, borderWidth: 1 }}  onPress={() =>Alert.alert(
                  'בחר תמונה',
                  'האם תרצה גלריה/מצלמה?',
                  [
                    {text: 'מצלמה', onPress: () => {this.openCamera(2)}},
                    {text: 'גלריה', onPress: () => {this.openGallery(2)}}
                   ])}
                    >
                  {this.state.img[2]!=null? <Image
                      style={{
                        height: 120,
                        width: 100
                      }}
                      source={{uri:this.state.img[2]}}
                    ></Image>: <Image
                    style={{
                      height: 120,
                      width: 100
                    }}
                    source={require("../assets/plusBackground.png")}
                  ></Image>}
                   
                  </TouchableOpacity>
                </View>
              
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

              {!this.state.showErrLabel && (
                <Text style={{ color: "red" }}> {this.state.resLabel}</Text>
              )}
              


              {/* לא להוריד את הSCROLL VIEW!!!!!!!!!! */}
              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                horizontal
                showsHorizontalScrollIndicator={false}
              ></ScrollView>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
export default Publish;
