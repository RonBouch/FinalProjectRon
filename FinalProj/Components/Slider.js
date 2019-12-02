import React, { Component } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import { array } from "prop-types";

const { width } = Dimensions.get("window");
const Slider = props => (
  <View
    style={styles.container}
    onTouchEndCapture={() => {
      alert("hi");
    }}
  >
    <Image
      style={styles.image}
      source={{
        uri: "http://ruppinmobile.tempdomain.co.il/site11/image/" + props.uri
      }}
    />
  </View>
);
const styles = {
  container: {
  },
  image: {
    // flex:1,
    // alignContent:'center',
    // marginLeft:30,
    width: "100%",
    height: "100%",
    borderRadius: 40,

    resizeMode: "cover"
  }
};
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesSlider: [],
      items: null,
      show: false
    };
  }
  async componentDidMount() {
    this.GetItems();
  }
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
            for (let index = 1; index <= 5; index++) {
              this.setState(prevState => ({
                imagesSlider: [
                  items[items.length - index].ItemImg,
                  ...prevState.imagesSlider
                ]
              }));
            }
          }
        },
        error => {
          console.log("err post=", error);
        }
      );
  };

  render() {
    console.log("  image slider", this.state.imagesSlider);
    return (
      <View style={{ width: "70%", height: 160 }}>
        <Swiper
          style={{ alignItems: "center" }}
          showsButtons
          buttonWrapperStyle={{
            flexDirection: "row-reverse"
          }}
          autoplay
          height={240}
        >
          {this.state.imagesSlider.map((item, i) => (
            <Slider uri={item} key={i} />
          ))}
        </Swiper>
      </View>
    );
  }
}