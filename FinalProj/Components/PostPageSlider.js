import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Swiper from "react-native-swiper";


const Slider = props => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      source={{
        uri:
          "http://ruppinmobile.tempdomain.co.il/site11/imageStorage/" +
          props.item
      }}
    />
  </View>
);
const styles = {
  container: {
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
      itemImageArray: [],
      checkURL: null,
      checkArrayComplete: false,
    };

  }

  onFocusFunction = async () => {
   
    this.RealoadScreen();
  };

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.onFocusFunction();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }
  async RealoadScreen() {

    if (this.props.img != null && this.props.img != undefined) {
      let imgArr = [];
      for (i = 0; i < 3; i++) {
        console.log(
          await this.checkImageURL(
            "http://ruppinmobile.tempdomain.co.il/site11/imageStorage/" +
              i +
              this.props.img
          )
        );
        if (this.state.checkURL) {
          imgArr.push(i + this.props.img);
        }
      }
      this.setState({
        itemImageArray: imgArr,
        checkArrayComplete: true
      });
    } 
  }
  async checkImageURL(url) {
    await fetch(url)
      .then(res => {
        if (res.status == 404) {
          this.setState({ checkURL: false });

          return false;
        } else {
          this.setState({ checkURL: true });
          return true;
        }
      })
      .catch(err => console.log(err));
  }

 
  render() {
    return (
      <View
      style={{
        width: "100%",
        height: 350,
        elevation: 10
      }}>
        {
          this.state.itemImageArray != null &&
          this.state.itemImageArray != ""&& this.state.checkArrayComplete ? (
            <View  style={{
              width: "100%",
              height: 300,
              elevation: 10
            }}>
            <Swiper autoplay={false}buttonWrapperStyle={{flexDirection: "row-reverse",}}  showsButtons>
              {this.state.itemImageArray.map((item, i) => (
                <TouchableOpacity key={i}>
                  {i <= this.state.itemImageArray.length ? (
                    <Slider item={item} key={i} />
                  ) : (
                    console.log("yeeeee")
                  )}
                </TouchableOpacity>
              ))}
            </Swiper>
         </View> ) :
           (
          console.log("Reload array")
        )}
      </View>
    );
  }
}
