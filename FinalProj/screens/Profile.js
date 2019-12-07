import React from "react";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  TouchableHighlight
} from "react-native";
import styles from "../Components/StyleSheet";
import { Icon } from "react-native-elements";
import { DrawerActions } from "react-navigation-drawer";

import * as ImagePicker from 'expo-image-picker';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: ""
    };
    this.profileImage = require("../assets/profileIcon.png");
  }

  componentDidMount(){
      this.setState({img:global.image},function(){
          console.log("img state",this.state.img)
      })
  }
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
    // פתיחת גלריה לבחירת תמונה 
    if( await ImagePicker!=null){
      let result = await ImagePicker.launchImageLibraryAsync({
    // נותן אופציה לשנות תמונה בגודל וכו
        allowsEditing: true,
    // גודל התמונה שתתקבל
        aspect: [4, 3], 
        base64:true,
    // איכות התמונה
        quality:0.5
      });

  // אם לא נבחרה אף תמונה והמשתמש ביטל את השימוש של הגלריה , כדי שלא יהיה הערה 
      if (result.cancelled) {
        console.log("result ", result);
       
      }
  // אחרי שהמשתמש בחר את תמונת הפרופיל
      else{
      //הקוד של התמונה ושם במשתנה base64 לוקח את ה 
      let imageBase64 = result.base64;
    // שם במשתנה הגלובלי את שם התמונה החדשה
      global.image= global.id +global.firstName+".jpg";
      //base64 המידע שאני שלוח לשרת שזה השם שאני רוצה שיהיה לתמונה ואת  
      const formData = { base64:imageBase64, imageName:global.id +global.firstName+".jpg" };
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
          this.setState({ img:global.id +global.firstName+".jpg" });
  
          console.log("result = ",result);
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

            <TouchableHighlight
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Image
                source={require("../assets/TenYadLogo.png")}
                style={styles.logo}
              />
            </TouchableHighlight>
          </View>
         
           
              <View style={{justifyContent:'space-between'}}>
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
                         source={{uri:"http://ruppinmobile.tempdomain.co.il/site11/ImageStorage/"+this.state.img +'?time'+new Date() }}
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
              <Text style={{ marginTop: 30, fontWeight: "bold", fontSize: 24 }}>
                ברוך הבא, {global.firstName} {global.lastName}
              </Text>

              <TouchableOpacity
                style={styles.registerButton2}
                onPress={() => this.props.navigation.navigate("EditPage")}
              >
                <Text style={styles.register}>
                  עידכון פרטים
                  {"  "}
                </Text>
                <Icon name="edit" type="font-awesome" color="black" size={18} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.registerButton2}
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
    );
  }
}