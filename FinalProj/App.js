import React from 'react';
import Home from './screens/Home';
import Login from './screens/Login'
import Register from './screens/Register'

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

class App extends React.Component{
  render(){
    return <AppNavigator/>
  }
}

const MainNavigator = createStackNavigator({
  Login: {screen: Login},
  Register:{screen:Register},
  Home: {screen: Home},
},
     {
       headerMode:'none',
       defaultNavigationOptions:{headerVisable:false}
     },
  { initialRouteName: 'Login'});



export default createAppContainer(MainNavigator);

