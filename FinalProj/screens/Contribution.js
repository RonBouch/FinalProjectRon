import React, { Component } from 'react'
import { View,TouchableHighlight,Image,ImageBackground,TouchableOpacity,Text,ScrollView,Linking} from 'react-native';
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
          showImg:false,
        }

    }
    componentDidMount() {
      this.GetPlaces();
    }
    _pressCall = (phone) => {
      const url = "tel:" + phone;
      console.log("url  asasds",url)
      Linking.openURL(url);
    };
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

                ((index!=this.state.extraDetails&& !this.state.showImg))?

           
            <TouchableOpacity key={index}

            onPress={() => {
              this.infoWindow(index);
            }}

            style={{
              height: 50,
              // marginBottom: "2%",
              // backgroundColor: 'gray',
              marginTop:2,
              justifyContent: 'space-between',flexDirection:'row-reverse',width:'100%',backgroundColor: '#f0f8ff',alignItems:'center'
            }}
          >

         <Text>{item.ItemDate}</Text>
         <Text>{item.City}</Text>
         <View style={{flexDirection:'row-reverse'}}>
          <Text>{item.ItemName}</Text>
          <Icon style={{margin:2}} name="ios-checkbox-outline" size={20} color="blue"/>
          
          </View>         
          </TouchableOpacity>
              
          
              
              :         
              
              



              
<View   key={index}
style={{backgroundColor: '#e6e6fa',width:'100%', justifyContent: 'space-between',marginTop:2,
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
<View style={{width:'90%',flexDirection:'row'}}>
              <Image source={{
                      uri:
                        "http://ruppinmobile.tempdomain.co.il/site11/image/" +
                        item.ItemImg
                    }}
                    style={{ width: 100, height: 100, borderWidth: 4,borderColor:"black",margin:4}}
                  />
            <View style={{flexDirection:"column",justifyContent:'space-around'}}>
            
                <Text style={{marginRight:20}}>על הפריט : {item.ItemAbout}</Text>
                <View style={{width:'40%',justifyContent:"space-around",flexDirection:'row',padding:10 , borderRadius: 50,    backgroundColor: "rgba(255,255,255,.5)"}}>
        
        <TouchableOpacity>
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
          
</View>
            
                )
              
            })}











console.log('sadsadasds',this.state.showImg)



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
          <ScrollView style={{ marginHorizontal: 20, width: "100%",backgroundColor:'white' }}>
          <View style={styles.view}>
          <View style={{marginTop:10,flexDirection: "row",flexWrap:'wrap'}}>
                 <CheckBox 
                        title="הצג תמונה לכולם"
                        iconRight
                        checked={this.state.showImg}
                        onPress={()=>this.setState({showImg:!this.state.showImg})}
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

  const TabNavigator = createMaterialBottomTabNavigator(  
    {  
      Contribution: {  
        screen: Contribution,  
        navigationOptions:{  
            tabBarLabel:'תרומות',  
            tabBarIcon: ({ tintColor }) => (  
                <View>  
                    <Icona     color={tintColor} type="font-awesome" style={[{color: tintColor}]} size={25} name="handshake-o"/>  
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
          activeColor: 'white',  
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