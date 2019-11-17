import React, { Component } from 'react'
import {View,Text,Image,Dimensions} from 'react-native'
import Swiper from 'react-native-swiper'

const {width}=Dimensions.get('window')
const Slider =props => (
    <View style={styles.container}>
        <Image style={styles.image} source={props.uri}/>
    </View>
)
const styles={
    container:{
        flex:1,
        justifyContent:'center',
    },
    image:{
        flex:1,
        width
        
    }
}
export default class extends Component{
    constructor(props) {
        super(props);
        this.state={
            imagesSlider:[
                require('../assets/bg.jpg'),
                require('../assets/bg2.jpg'),
                require('../assets/g3.jpg'),
                
            ]
        }
    }
render(){
    return(
        <View style={{flex:1,borderWidth:5,borderColor:'#000080'}}>
            <Swiper
 onResponderRelease={2}
 autoplay
height={240}
  >
               {this.state.imagesSlider.map((item,i)=>
               <Slider
               uri={item}
               key={i}/>
               )}
            </Swiper>
        </View>
    )
}
    
}
