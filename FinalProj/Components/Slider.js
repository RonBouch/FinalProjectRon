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
        borderWidth:3,
        borderColor:'black',
        margin:10,
        borderRadius: 40
    },
    image:{
        // flex:1,
        // alignContent:'center',
        // marginLeft:30,
        width:'100%',
        height:'100%',
        borderRadius: 40,

        // resizeMode:'cover'
        
    }
}
export default class extends Component{
    constructor(props) {
        super(props);
        this.state={
            imagesSlider:[
                require('../assets/mekarer.jpg'),
                require('../assets/shoes.jpg'),
                require('../assets/aron.jpg'),
                require('../assets/shulhan.jpg'),

                
            ],
            show:false,
        }
    }
render(){
    return(
        <View style={{width:150,height:150
    }}>
            <Swiper
            style={{alignItems:'center'}}
            showsButtons	
            buttonWrapperStyle={{flexDirection:'row-reverse'}}
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
