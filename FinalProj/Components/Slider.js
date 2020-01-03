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
          0 +
          props.item.ItemImg
          +
          "?time" +
          new Date()
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
      imageName: [],
      items: null,
      checkArrayComplete: false,
    };

  }

  // define a separate function to get triggered on focus
  onFocusFunction = async () => {
   
    this.RealoadScreen();
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
    this.focusListener.remove();
  }
  async RealoadScreen() {
      await this.GetItems();
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
    this.setState({ checkArrayComplete: true });
  };

  GetItems = async () => {
    await this.setState({
      checkArrayComplete: false,
      imagesSlider: [],
    });
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
        return res.json();
      })
      .then(
        result => {
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
    return (
      <View
      style={{
        width: "100%",
        height: 200,
        elevation: 10
      }}>
        {this.state.checkArrayComplete ? (

            <Swiper autoplay={true} autoplayTimeout={5}>
              {this.state.imagesSlider.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() =>
                    this.props.props.navigation.navigate("PostPage", {
                      item: item
                    })
                  }
                >
                  <Slider item={item} key={i} />
                </TouchableOpacity>
              ))}
            </Swiper>
          )
        : (
          console.log("Reload array")
        )}
      </View>
    );
  }
}
