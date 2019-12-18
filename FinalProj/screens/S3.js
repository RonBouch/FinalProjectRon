import React, { Component,Fragment } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
  ImageBackground,
  TouchableHighlight,
  Image,Dimensions
  ,ScrollView
} from "react-native";
import { Icon as Icona } from "react-native-elements";
import styles from "../Components/StyleSheet";
const screenHeight = Math.round(Dimensions.get('window').height);

import { Ionicons } from "@expo/vector-icons";
import shortid from "shortid";
import {
  Autocomplete,
  
} from "react-native-dropdown-autocomplete";
import SearchableDropdown from 'react-native-searchable-dropdown';

import cities from "../city_list";
import Slider from "../Components/Slider";
class S3 extends Component {
  constructor(props) {
    super(props);
    this.state={
      selectedItems: [
        {
          id: 7,
          name: 'Go',
        }],
        screenHeight:""
    }
  }
  
  handleSelectItem(item, index) {
    const { onDropdownClose } = this.props;
    onDropdownClose();
    console.log(item);
  }
  getScreenSize = () => {  
    // const screenWidth = Math.round(Dimensions.get('window').width);  
    const screenHeight = Math.round(Dimensions.get('window').height);  
    this.setState({ screenHeight: screenHeight })  
    }  
  render() {
    
    const autocompletes = [...Array(1).keys()];

    const data = cities;

    // const apiUrl = "https://5b927fd14c818e001456e967.mockapi.io/branches";

    const { scrollToInput, onDropdownClose, onDropdownShow } = this.props;

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
                <Icona
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
                  מועדפים
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

         

          {/* <View  style={{flex:1}}> */}
          
        <Fragment>
     
          {/* Single */}
          <SearchableDropdown
          // onPress={(item) => {
          //   console.log(item)
          //   // const items = this.state.selectedItems;
          //   // items.push(item)
          //   this.setState({ selectedItems: item });
          // }}
            onItemSelect={(item) => {
              console.log(item)
              // const items = this.state.selectedItems;
              // items.push(item)
              this.setState({ selectedItems: item });
            }}
            containerStyle={{ padding: 5,}}
            // onRemoveItem={(item, index) => {
            //   const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
            //   this.setState({ selectedItems: items });
            // }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{  maxHeight:200,}}
            items={data}
            // defaultIndex={2}
            resetValue={false}
            textInputProps={
              {
                placeholder: "עיר/ישוב",
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                },
                onTextChange: text => console.log(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />

      </Fragment>
      <ScrollView  contentContainerStyle={{flexGrow:1,}} style={styles.scrollableView} horizontal showsHorizontalScrollIndicator={false}>
          
      {/* </View> */}
      <Image
                  source={require("../assets/TenYadLogo.png")}
                  style={{height:200,width:200}}
                /> 
                      <Slider/>
                      <Image
                  source={require("../assets/TenYadLogo.png")}
                  style={{height:200,width:200}}
                /> 
  
            
                </ScrollView>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
// const styles1 = StyleSheet.create({
//   autocompletesContainer: {
//     marginTop: 30,
//     // zIndex: 1,
//     width: "100%"
//     // paddingHorizontal: 8
//   },
//   // input: { maxHeight: 40 },
//   inputContainer: {
//     // display: "flex",
//     // flexShrink: 0,
//     // flexGrow: 0,
//     // flexDirection: "row",
//     // flexWrap: "wrap",
//     // alignItems: "center",
//     // borderBottomWidth: 1,
//     // borderColor: "#c7c6c1",
//     // paddingVertical: 13,
//     // paddingLeft: 12,
//     // paddingRight: "5%",
//     // width: "100%",
//     // justifyContent: "flex-start"
//   },
//   container: {
//     // flex: 1,
//     // backgroundColor: "#ffffff"
//   },
//   plus: {
//     position: "absolute",
//     left: 15,
//     top: 10
//   }
// });

export default (S3);
   {/* <View style={styles1.autocompletesContainer}>
              <SafeAreaView>
                {autocompletes.map(() => (
                  <Autocomplete
                    key={shortid.generate()}
                    data={data}
                    // style={styles1.input}
                    scrollToInput={ev => scrollToInput(ev)}
                    handleSelectItem={(item, id) =>
                      this.handleSelectItem(item, id)
                    }
                    onDropdownClose={() => onDropdownClose()}
                    onDropdownShow={() => onDropdownShow()}
                    placeholder="חפש"
                    renderIcon={() => (
                      <Ionicons
                        name="md-search"
                        size={20}
                        color="#c7c6c1"
                        style={styles1.plus}
                      />
                    )}
                    // fetchDataUrl={apiUrl}

                    minimumCharactersCount={0}
                    highlightText
                    valueExtractor={item => item.name}
                    rightTextExtractor={item => item.id}
                  />
                ))}
              </SafeAreaView>
            </View> */}