import React, { Component } from 'react'
import { View,TouchableHighlight,Image,ImageBackground,TouchableOpacity,Text,ScrollView} from 'react-native';
import { Dropdown } from "react-native-material-dropdown";
import { DrawerActions } from "react-navigation-drawer";

import styles from "../Components/StyleSheet";
import { Icon as Icona } from "react-native-elements";

import { createBottomTabNavigator, createAppContainer} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Icon from 'react-native-vector-icons/Ionicons';  
import S3 from './S3';
import Publish from '../screens/Publish'
import { CheckBox } from "react-native-elements";

class Contribution extends Component {
    constructor(props) {
        super(props);
        this.state={
            type:"",
            region:"",  
          checkedB: false,
          items:null,
          extraDetails:-1,
        }

    }
    componentDidMount() {
      this.GetPlaces();
    }
  
    GetPlaces = () => {
     
      fetch(
        "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/GetItems",
        {
          method: "post",
          headers: new Headers({
            "Content-Type": "application/Json;"
          }),
         
        }
      )
        .then(res => {
          console.log("res=", res);
          return res.json();
        })
        .then(
          result => {
            console.log("fetch POST= ", result);
            let items = JSON.parse(result.d);
            if (items == null) {
              this.setState({
                message: "הרשמה נכשלה"
              });
              return;
            } else {
              console.log("U = " + items);
              this.setState({
                items: items,
                

              });
            }
          },
          error => {
            console.log("err post=", error);
          }
        );
    };
    
    static navigationOptions={
        drawerLabel:'Contribution',
    }
    Type = e => {
        this.setState({
          type: e
        });
      };
      Region = e => {
        this.setState({
          region: e
        });
      };
      infoWindow = (i) => {
        
        if (this.state.extraDetails == -1 ||this.state.extraDetails!=i) {
          this.setState({
            extraDetails: i,
          });
        } else {
          this.setState({
            extraDetails: -1,
          });
        }
      };
    render() {
        let Type = [
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
        let Region = [
            {
                value: "הכל"
              },
            {
              value: "צפון"
            },
            {
              value: "שפלה"
            },
            {
              value: "שרון"
            },
            {
              value: "מרכז"
            },
            {
              value: "דרום"
            },
          ];
          let Items = [];

          if (this.state.items != null) {
            console.log("ASDADSSADADS")
            Items = this.state.items.map((item, index) => { 
              console.log("Extr ",this.state.extraDetails+ " Index",index) 
              return (
                ((index!=this.state.extraDetails))?

           
            <TouchableOpacity key={index}

            onPress={() => {
              this.infoWindow(index);
            }}

            style={{
              height: 50,
              // marginBottom: "2%",
              // backgroundColor: 'gray',
              marginTop:2,
              justifyContent: 'space-between',flexDirection:'row-reverse',width:'100%',backgroundColor: '#f0f8ff'
            }}
          >
         <Text>{item.ItemDate}</Text>
         <Text>{item.City}</Text>
         <Text>{item.ItemName}</Text>
          </TouchableOpacity>
              
          
              
              :             
<View   key={index}
style={{backgroundColor: '#e6e6fa',width:'100%', justifyContent: 'space-between'}}>
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
<Text>{item.ItemName}</Text>
</TouchableOpacity>
                <View style={styles.line}></View>

                 <View  
                 onResponderGrant={() => {
                  this.infoWindow(index);
                }}
                style={{
                flexDirection:'row',width:'100%',
              }}>
                <Image source={require("../assets/bg2.jpg")}
                    style={{ width: 70, height: 70,   marginLeft:3 }}
                  />
                </View>
</View>
            
                )
              
            })}















          return (
            <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.logo}>
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
                source={require("../assets/imageedit_3_3371400810.png")}
                style={{ width: 60, height: 60 }}
              />
            </TouchableHighlight>
          </View>
          <ScrollView style={{ marginHorizontal: 20, width: "100%",backgroundColor:'white' }}>
          <View style={styles.view}>
          <View style={{marginTop:10,flexDirection: "row",flexWrap:'wrap'}}>
                 <CheckBox 
                        title="מודעות לפי תאריך"
                        iconRight
                        checked={true}
                        // containerStyle={{width:200,height:50}}
                        />
                   <CheckBox 
                        title="רק עם תמונה"
                        iconRight
                        // containerStyle={{width:200,height:50}}
                        />
                       
         <Dropdown
                      label="קטגוריה"
                      itemColor="black"
                      dropdownMargins={{ min: 0, max: 1 }}
                      dropdownOffset={{ top: 0, left: 0 }}
                      containerStyle={{ width: 180, padding: 5,marginTop:10 }}
                      data={Type}
                      onChangeText={this.Type}
                    />
                    <Dropdown
                      label="איזור"
                      itemColor="black"
                      dropdownMargins={{ min: 0, max: 1 }}
                      dropdownOffset={{ top: 0, left: 0 }}
                      containerStyle={{ width: 100, padding: 5 ,marginTop:10 }}
                      data={Region}
                      onChangeText={this.Region}
                    />
                    
                    <TouchableOpacity
                    //   onPress={this.handleSubmit}
                      style={styles.searchButton}
                    >
                      <Text style={{ color: "white" }}>חפש {"  "}</Text>
                      <Icona
                        name="search"
                        type="font-awesome"
                        color="white"
                        size={18}
                      />
                    </TouchableOpacity>
         </View>
         <View style={styles.line}></View>
   
         <View  style={{justifyContent: 'space-between',flexDirection:'row-reverse',width:'100%',backgroundColor: '#6495ed',marginBottom:10}} >
         <Text style={{fontWeight: "bold",fontSize:16}}>תאריך פרסום</Text>
         <Text style={{fontWeight: "bold",fontSize:16}}> עיר/יישוב </Text>
        <Text style={{fontWeight: "bold",fontSize:16}}>חפצים למסירה</Text>
         </View>

          {Items}
         
      
       

         </View>
          </ScrollView>
        </View>
      </View>
        )
    }
}
// class HomeScreen extends React.Component {  
//     render() {  
//       return (  
//           <View style={styles.container}>  
//             <Text>Home Screen</Text>  
//           </View>  
//       );  
//     }  
//   }  

  const TabNavigator = createMaterialBottomTabNavigator(  
    {  
      // HomeScreen: { screen: HomeScreen,  
      //       navigationOptions:{  
      //           tabBarLabel:'תן יד',  
      //           tabBarIcon: ({ tintColor }) => (  
      //               <View>  
      //                   <Icon style={[{color: tintColor}]} size={25} name={'ios-home'}/>  
      //               </View>),  
      //       }  
      //   },  
      Contribution: {  
        screen: Contribution,  
        navigationOptions:{  
            tabBarLabel:'תרומות',  
            tabBarIcon: ({ tintColor }) => (  
                <View>  
                    <Icona      type="font-awesome" style={[{color: tintColor}]} size={25} name="handshake-o"/>  
                </View>),  
                 activeColor: 'white',  
                 inactiveColor: '#46f6d7',  
                 barStyle: { backgroundColor: '#6495ed' },   
        }  
    },  
    Publish: { screen: Publish,  
      navigationOptions:{  
          tabBarLabel:'תן חפץ',  
          tabBarIcon: ({ tintColor }) => (  
              <View>  
                  <Icon style={[{color: tintColor}]} size={25} name={'ios-add-circle-outline'}/>  
              </View>),  
          activeColor: '#615af6',  
          inactiveColor: '#46f6d7',  
          barStyle: { backgroundColor: '#67baf6' },  
      }  
  },  
        S3: { screen: S3,  
            navigationOptions:{  
                tabBarLabel:'הודעות',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-chatbubbles'}/>  
                    </View>),  
               activeColor: 'white',  
               inactiveColor: '#46f6d7',  
               barStyle: { backgroundColor: '#6495ed' },  
            }  
        },  
     
       
    },  
    {  
      initialRouteName: "Contribution",  
      activeColor: '#f0edf6',  
      inactiveColor: '#226557',  
      barStyle: { backgroundColor: '#3BAD87' },  
    },  
);  
  
export default createAppContainer(TabNavigator);  