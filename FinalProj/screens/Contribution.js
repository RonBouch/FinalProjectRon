import React, { Component } from 'react'
import { View,TouchableHighlight,Image,ImageBackground,TouchableOpacity,Text} from 'react-native';
import { Dropdown } from "react-native-material-dropdown";

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
      infoWindow = (p, i) => {
        
        if (this.state.extraDetails == -1 ) {
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
              this.infoWindow(item, index);
            }}

            style={{
              height: 50,
              // marginBottom: "2%",
              // backgroundColor: 'gray',
              marginTop:2,
              justifyContent: 'space-between',flexDirection:'row-reverse',width:'100%',backgroundColor: '#f5f5dc'
            }}
          >
         <Text>{item.ItemDate}</Text>
         <Text>{item.City}</Text>
         <Text>{item.ItemName}</Text>
          </TouchableOpacity>
              
          
              
              :             

           
                  <TouchableOpacity key={index}
      
                  onPress={() => {
                    this.infoWindow(item, index);
                  }}
      
                  style={{
                    height: 100,
                    // marginBottom: "2%",
                    // backgroundColor: 'gray',
                    marginTop:2,
                    justifyContent: 'space-between',flexDirection:'row-reverse',width:'100%',backgroundColor: '#f5f5dc'
                  }}
                >
               <Text>{item.ItemDate}</Text>
               <Text>{item.City}</Text>
               <Text>{item.ItemName}</Text>
                </TouchableOpacity>)
              
            })}
          return (
      
            <ImageBackground source={require('../assets/bg2.jpg')} style={styles.backgroundImage}>
              <View style={styles.logo}>
              <TouchableHighlight onPress={()=>this.props.navigation.goBack()}
            style={styles.touchableHighlight} underlayColor={'rgba(0,0,0,0.8)'}>
            <Icon  iconStyle={{ marginEnd: "10%" }} name="md-arrow-round-forward" type="font-awesome"  color="black" size={28} />             
            </TouchableHighlight>
              <Image
                source={require("../assets/logo3.jpg")}
                style={{ width: "80%", height: 100 ,borderRadius:50,marginTop:'15%'}}
                resizeMode="contain"
              />
            </View>
       
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
   
         <View  style={{justifyContent: 'space-between',flexDirection:'row-reverse',width:'100%',backgroundColor: 'gray'}} >
         <Text style={{fontWeight: "bold",fontSize:14}}>תאריך פרסום</Text>
         <Text style={{fontWeight: "bold",fontSize:14}}> עיר/יישוב </Text>
        <Text style={{fontWeight: "bold",fontSize:14}}>חפצים למסירה</Text>
         </View>

          {Items}
         
      
       

         </View>
         
         </ImageBackground>
        )
    }
}
class HomeScreen extends React.Component {  
    render() {  
      return (  
          <View style={styles.container}>  
            <Text>Home Screen</Text>  
          </View>  
      );  
    }  
  }  

  const TabNavigator = createMaterialBottomTabNavigator(  
    {  
      HomeScreen: { screen: HomeScreen,  
            navigationOptions:{  
                tabBarLabel:'תן יד',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-home'}/>  
                    </View>),  
            }  
        },  
        S3: { screen: S3,  
            navigationOptions:{  
                tabBarLabel:'חפש חפץ',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'md-search'}/>  
                    </View>),  
                activeColor: '#f60c0d',  
                inactiveColor: '#f65a22',  
                barStyle: { backgroundColor: '#f69b31' },  
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
        Contribution: {  
            screen: Contribution,  
            navigationOptions:{  
                tabBarLabel:'Cart',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'md-hand'}/>  
                    </View>),  
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