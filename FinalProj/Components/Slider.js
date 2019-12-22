import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  AppState,
  TouchableOpacity
} from "react-native";
import Swiper from "react-native-swiper";
import { array } from "prop-types";
import { withNavigation } from "react-navigation";

const { width } = Dimensions.get("window");
const Slider = props => (
  
  
  <View style={styles.container}>

    <Image
      style={{
        width: 70,
        height: 70,
        position: "absolute",
        left: 5,
        zIndex: 1
      }}
      source={require("../assets/new1.gif")}
    />

    <Image
      style={styles.image}
      source={{
        uri:
          "http://ruppinmobile.tempdomain.co.il/site11/imageStorage/" +
          props.item.ItemImg
      }}
    />
    <View
      style={{
        width: "100%",
        height: "13%",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        top: "87%",
        backgroundColor: "rgba(0,0,0,.8)"
      }}
    >
      <Text style={{ color: "white", fontSize: 14 }}>
        {props.item.ItemName}
      </Text>
    </View>
  </View>
);
const Slider2 = props => (
  
  
  <View style={styles.container}>
<Image source={{ uri:  "http://ruppinmobile.tempdomain.co.il/site11/imageStorage/" +props.item}} onError={console.log(props.item)} defaultSource={require("../assets/bg.jpg")} />
     {/* <Image
      style={styles.image}
      source={{
        uri:
          "http://ruppinmobile.tempdomain.co.il/site11/imageStorage/" +
          props.item.ItemImg
      }}
      onError={console.log("ERRR")}
    /> */}

    <View
      style={{
        width: "100%",
        height: "13%",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        top: "87%",
        backgroundColor: "rgba(0,0,0,.8)"
      }}
    >
      <Text style={{ color: "white", fontSize: 14 }}>
        {props.item.ItemName}
      </Text>
    </View>
  </View>
);
const styles = {
  container: {
    // padding: 8
  },
  image: {
    width: "100%",
    height: "100%",

    resizeMode: "cover"
  }
};
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesSlider: [],
      itemImageArray:null,
      imageName: [],
      items: null,
      show: false
    };
  }
  async componentDidMount() {
   
    if(this.props.img!=null&&this.props.img!=undefined)
    {
      let imgArr=[];
      for(i=0;i<3;i++){
        imgArr.push(i+this.props.img)
       
      }
      this.setState({
     itemImageArray:imgArr
      })
   console.log("img to slider ",this.props.img)
    }
    else{
      // this.GetItems();

    }
  }

  // פונקציה שלוקחת את ה5 פריטים האחרונים ממערך ושמה אותם במערך חדש
  ImageArray = async items => {
    for (let index = 0; index < 5; index++) {
      // יצירת לולאה שרצה 5 פעמים
      if (items.length > index) {
        // בדיקה אם העורך של המערך קטן מ5
        await this.setState(prevState => ({
          // מוסיף למערך החדש את המשתנה של המערך הישן
          imagesSlider: [items[index], ...prevState.imagesSlider]
        }));
      }
    }
  };

  GetItems = async () => {
    console.log("Get Items");

    fetch(
      "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/GetItems",
      {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/Json;"
        })
      }
    )
      .then(res => {
        // console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          // console.log("fetch POST= ", result);
          let items = JSON.parse(result.d);
          if (items == null) {
            this.setState({
              message: "הרשמה נכשלה"
            });
            return;
          } else {
            this.ImageArray(items);
          }
        },
        error => {
          console.log("err post=", error);
        }
      );
  };

  render() {
    console.log(this.state.itemImageArray)
    return (
      <View style={{ width: "100%", height: 200 }}>
      {
        this.state.itemImageArray!=null?
        
        <Swiper autoplay={false} >
          {this.state.itemImageArray.map((item, i) => (
            <TouchableOpacity
              key={i}
  
            >
              <Slider2 item={item} key={i} />
            </TouchableOpacity>
          ))}
        </Swiper>
        
        :
        <Swiper autoplay={true} autoplayTimeout={5}>
          {this.state.imagesSlider.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() =>
                this.props.props.navigation.navigate("PostPage", { item: item })
              }
            >
              <Slider item={item} key={i} />
            </TouchableOpacity>
          ))}
        </Swiper>
      }
        
      </View>
    );
  }
}
