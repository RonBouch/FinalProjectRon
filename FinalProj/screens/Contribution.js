import React, { Component } from 'react'
import { View,TouchableHighlight,Image,ImageBackground,TouchableOpacity,Text} from 'react-native';
import { Dropdown } from "react-native-material-dropdown";

import styles from "../Components/StyleSheet";
// import { Icon } from "react-native-elements";
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Icon from 'react-native-vector-icons/Ionicons';  
import S3 from './S3';
import Publish from '../screens/Publish'

class Contribution extends Component {
    constructor(props) {
        super(props);
        this.state={
            type:"",
        }
    }
    
    static navigationOptions={
        drawerLabel:'Contribution',
    }
    Type = e => {
        this.setState({
          type: e
        });
      };
    render() {
        let Type = [
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
         <View style={{marginTop:10}}>
         <Dropdown
                      label="קטגוריה"
                      itemColor="black"
                      dropdownMargins={{ min: 0, max: 1 }}
                      dropdownOffset={{ top: 0, left: 0 }}
                      containerStyle={{ width: 200, padding: 5 }}
                      data={Type}
                      onChangeText={this.type}
                    />
         </View>

         <Text style={styles.text}>This IS S2 Screen </Text>

       
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
  class ProfileScreen extends React.Component {  
    render() {  
      return (  
          <View style={styles.container}>  
            <Text>Profile Screen</Text>  
          </View>  
      );  
    }  
  }  
  class ImageScreen extends React.Component {  
      render() {  
          return (  
              <View style={styles.container}>  
                  <Text>Image Screen</Text>  
              </View>  
          );  
      }  
  }  
  class CartScreen extends React.Component {  
      render() {  
          return (  
              <View style={styles.container}>  
                  <Text>Cart Screen</Text>  
              </View>  
          );  
      }  
  }  
  const TabNavigator = createMaterialBottomTabNavigator(  
    {  
        Home: { screen: HomeScreen,  
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