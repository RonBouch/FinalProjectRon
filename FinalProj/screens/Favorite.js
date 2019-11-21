import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  TouchableHighlight,
  Linking,
  ScrollView
} from "react-native";
import styles from "../Components/StyleSheet";
import { Icon as Icona } from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons';  

import RadioForm from "react-native-simple-radio-button";

const { height } = Dimensions.get("window");
export default class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      item: null,
    //   checkedB: true,
      screenHeight: 0,
      userPhone: "",
      pageToShow: null
    };
  }
  componentDidMount() {
    this.GetItems();
  }

  GetItems = () => {
    // console.log("iddddd"+id);
    const data = {
      userid: 1
    };
    fetch(
        "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/GetItemsFromFavorite",
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
        //   console.log("fetch POST= ", result);
          let items = JSON.parse(result.d);
          if (items == null) {
            this.setState({
            //   message: "הרשמה נכשלה"
            });
            return;
          } else {
            // console.log("U = " + items);
            this.setState({
              items: items
            });
          }
          console.log(result.d);
        //   console.log(result);
        },
        error => {
          console.log("err post=", error);
        }
      );
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };
  _pressCall = (p) => {
    this.setState({
      userPhone: p
    });
    const url = "tel:" + p;
    Linking.openURL(url);
  };
  infoWindow = (item, i) => {
    // console.log('page to show  -- -- - = = == '+ p.City+i)
    // console.log("imgggg = " + p.Img);

    if (this.state.pageToShow == null || this.state.pageToShow != i) {
      this.setState({
        pageToShow: i,
        item: item
      });
    } else {
      this.setState({
        pageToShow: null,
        item: null
      });
    }
  };
  render() {
    const scrollEnabled = this.state.screenHeight > height - 1000;

    let Items = [];

    if (this.state.items != null) {
      debugger;
      Items = this.state.items.map((item, index) => {
        // if (index == this.state.pageToShow) {
        //   this.viewPage = item.Address;
        // }

        return (
            <View   key={index}
            style={{backgroundColor: '#e6e6fa',margin:15, justifyContent: 'space-between',borderWidth:1,
            }}
            >
            
                 <TouchableOpacity
            style={{
              marginTop:2,
              justifyContent: 'space-between',flexDirection:'row-reverse', alignItems: "center",
            
            }}
            onPress={() => {
              this.infoWindow(index);
            }}
            >
            <Text>{item.ItemDate}</Text>
            <Text>{item.City}</Text>
            <View style={{flexDirection:'row-reverse'}}>
                      <Text>{item.ItemName}</Text>
                      <Icon style={{margin:2}} name="ios-checkbox-outline" size={20} color="blue"/>
                      
                      </View>         
                      </TouchableOpacity>
                          
                            <View style={styles.line}></View>
            
            
                             <View  
                            style={{
                              width:'100%',padding:5
                          }}>
            <View style={{flexDirection:'row'}}>
                          <Image source={{
                                  uri:
                                    "http://ruppinmobile.tempdomain.co.il/site11/image/" +
                                    item.ItemImg
                                }}
                                style={{ width: 100, height: 100, borderWidth: 4,borderColor:"black",margin:4}}
                              />
                        <View style={{flexDirection:"column",justifyContent:'space-around'}}>
                        
                            <Text style={{marginRight:20}}>על הפריט : {item.ItemAbout}</Text>
            
            
                            <View style={{width:250,flexDirection:'row',padding:5,justifyContent:'space-around',borderWidth:1,    backgroundColor: "rgba(255,255,255,.5)",marginRight:200}}>
                    
                    <TouchableOpacity onPress={() => this.FavoriteChack(item)}>
                      <Icon name="md-heart" size={40} color="red"/>
                    </TouchableOpacity>
            
            
            
                    <TouchableOpacity>
                      <Icon name="ios-chatbubbles" size={40} color='blue'/>
                    </TouchableOpacity>
            
                          <TouchableOpacity>
                    <Icon name="md-call" size={40} color="green" onPress={()=>this._pressCall(item.UserPhone)}/>
            
                    </TouchableOpacity>
                  </View>
                         </View>
                         </View>
                         </View>  
                         <TouchableOpacity style={{backgroundColor:'#8fbc8f',height:30,alignItems:'center'}}>
                         <Text style={{fontSize:16,color:'white',fontWeight:'bold'}}>מחק פריט
                             </Text>
                             </TouchableOpacity>
                         </View> 
                         
        );
      });
    }

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
              <Icona
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

          <ScrollView style={styles.scrollview}>
            
            
            <View style={{flex:1}}>
             {Items}
            </View>


            </ScrollView>
          </View>
        </View>
    );
  }
}