import React, { Component } from 'react'
import {TouchableOpacity , Text,View,ImageBackground,Image,TouchableHighlight} from 'react-native'
import { DrawerActions } from "react-navigation-drawer";
import styles from "../Components/StyleSheet";
import { Icon as Icona } from "react-native-elements";
import { Icon } from "react-native-elements";

export default class Reminders extends Component {
    constructor(props) {
        super(props);
        this.state={
            reminders:null,
        }
        
    }
    onFocusFunction = async() => {
       await this.GetReminders();

    }
  async  componentDidMount(){
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            this.onFocusFunction();
          });
    }
    componentWillUnmount() {
        this.focusListener.remove();
      }
    DeleteReminder = (item) => {
        console.log("item = ", item);
    
        if (item.UserID != null) {
          const data = {
            userid: global.user.UserID,
            itemName: item.ItemName
          };
          console.log("DATA = ", data);
          fetch(
            "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/DeleteReminder",
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
                // console.log("fetch POST= ", result);
    
                let Del = JSON.parse(result.d);
                if (Del == -1) {
                    console.log("Delete Reminder")
                    this.GetReminders();
                  return;
                } else {
                }
                console.log(result.d);
                console.log(result);
              },
              error => {
                console.log("err post=", error);
              }
            );
        }
      };
    
   async  GetReminders(){
        fetch(
           "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/GetReminders",
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
               let reminders = JSON.parse(result.d);
              //  console.log("data ",reminders)
               if (reminders == null) {
                 this.setState({
                   message: "לא קיימים סוגי פריטים"
                 });
                 return;
               } else {
                 this.setState({
                   reminders: reminders
                 });
            
                   }
             },
             error => {
               console.log("err post=", error);
             }
           );
       };
    render() {
        let Items = [];

    if (this.state.reminders != null) {
      Items = this.state.reminders.map((item, index) => {
          if(global.user.UserID==item.UserID){
          
        return (
                    <View key={index} style={{padding: 10,
                        marginTop: 10,
                        backgroundColor: '#ddd',
                        borderColor: '#bbb',
                        borderWidth: 1,
                        borderRadius: 20,
                        width:150}} >
                     <TouchableOpacity
          onPress={()=>this.DeleteReminder(item)}
            style={{
              position: "absolute",
              // totp: 5,
              right: 0,
              alignItems: "center",
              flexDirection: "row-reverse",
              borderRadius: 500
            }}
          >
            <Image
              source={require("../assets/x.png")}
              style={{ width: 40, height: 40}}
            />
          </TouchableOpacity>
                        <Text>{item.ItemName}</Text>
                    </View>
                  )
        }
        }
      )
    }
        
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
                    <Icona
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
                      התרעות
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
                <View style={{ marginTop: 10, padding: 5 }}>
                <Text>ההתרעות שלי:</Text>
              </View>
                  <View style={{ flex: 1, alignItems: "center" }}>{Items}</View>
              </View>
            </View>
          </ImageBackground>
        )
    }
}
