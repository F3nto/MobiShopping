import React,{useState,useEffect} from "react";
import {SafeAreaView,View,Text,TouchableOpacity,StyleSheet,Image} from 'react-native'
import HeaderComponent from "../components/HeaderComponent";
import colors from '../constants/colors'


//! https://myshop-6c5af.firebaseio.com/aboutus.json


const aboutUsScreen = ({navigation}) => {

    const [aboutUs, setAboutUs] = useState([])

    useEffect(() => {

        const getAboutUsData = async () => {

            const response = await fetch('https://myshop-6c5af.firebaseio.com/aboutus.json')

            const responseData = await response.json()

            let list = [];

            for(const key in responseData){

                list.push(responseData[key])

                console.log(list)

            }

            setAboutUs(list)

        }
        getAboutUsData()

    },[])

return(

    <SafeAreaView style = {styles.container}>

        <HeaderComponent navigation= {navigation} title = 'About Us' icon = 'back' parentScreenName={'HomeScreen'}/>

    <View style = {styles.content}>

        <View style = {styles.aboutUsContainer}>

            <Image style = {{width:80,height:80}} source = {require('../../assets/icons/about_us.png')}/>

            <Text style = {styles.aboutUstxt}>About Us</Text>


        </View>


        {

            aboutUs.map((item,index)=> {

                return(
                    
                    <View key = {index}  style = {styles.outerView}>

                    

                        <View style = {{backgroundColor:colors.Primary,width:20,height:20}}/>

                        <Text style = {styles.innerTxt}>{item.description}</Text>


                    </View>


                )

            })


        }

    </View>

    </SafeAreaView>

)
}
export default aboutUsScreen;

const styles = StyleSheet.create({

container : {flex:1},

content   : {flex:1,},

aboutUsContainer : {justifyContent:'center',alignItems:'center',backgroundColor:colors.Primary,height:200},

aboutUstxt       : {fontSize:18,fontWeight:'bold',color:colors.white,marginTop:5},

outerView        : {flexDirection:'row', alignItems:'center',paddingHorizontal:15,paddingVertical:10,marginTop:10},

innerTxt         : {flex:1,fontSize:16,color:'grey',marginLeft:15}

})