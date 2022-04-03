import React,{useState,useEffect} from "react";
import {SafeAreaView,View,Text,TouchableOpacity,StyleSheet,Image,TextInput} from 'react-native'
import HeaderComponent from "../components/HeaderComponent";
import colors from '../constants/colors'


//! https://myshop-6c5af.firebaseio.com/contactus.json


const contactUsScreen = ({navigation}) => {


const [contactUs , setContactUs] = useState({})

    useEffect(() => {

        const getContactUs = async () => {

        const response = await fetch('https://myshop-6c5af.firebaseio.com/contactus.json')

        const responseData = await response.json()

        let contactUsData = {};

        for(const key in responseData){

            contactUsData = responseData[key]

            console.log(contactUsData)

        }

        setContactUs(contactUsData)

        }

        getContactUs()


    },[])

return(

    <SafeAreaView style = {styles.container}>

        <HeaderComponent navigation= {navigation} title = 'Contact Us' icon = 'back' parentScreenName={'HomeScreen'}/>

        <View style = {styles.content}>

        
        <TouchableOpacity 
            style = {styles.card}>

                <Image style = {{width:80,height:80}} source = {require('../../assets/icons/contactus.png')}/>

                <Text style = {{fontSize:17,color:colors.white,fontWeight:'bold',marginTop:5}}>Contact Us</Text>

            </TouchableOpacity>


        <View style = {styles.card2}>

            <Image style = {{width:25,height:25}} source = {require('../../assets/icons/lo.png')}/>

            <Text style = {{fontSize:17,marginTop:7,textAlign:'center'}}>{contactUs?.address}</Text>
     

         </View>

        <View style = {styles.card2}>

            <Image style = {{width:25,height:25}} source = {require('../../assets/icons/ph.png')}/>

            <Text style = {styles.card2text}>{contactUs?.mobile}</Text>


        </View>

        <View style = {styles.card2}>

            <Image style = {{width:25,height:25}} source = {require('../../assets/icons/eee.png')}/>    

            <Text style = {styles.card2text}>{contactUs?.email}</Text>


        </View>

        <View style = {styles.card2}>

            <Image style = {{width:25,height:25}} source = {require('../../assets/icons/time.png')}/>    

            <Text style = {{fontSize:17,textAlign:'center',marginTop:7,}}>{contactUs?.openTime}</Text>

            <Text style = {{fontSize:17,textAlign:'center',marginTop:7,}}>{contactUs?.closeTime}</Text>



        </View>

     
        </View>

    </SafeAreaView>

)
}
export default contactUsScreen;

const styles = StyleSheet.create({


container : {flex:1,backgroundColor:colors.white},

content : {flex:1,backgroundColor:colors.white},

card :  {padding:50,backgroundColor:colors.Primary,justifyContent:'center',alignItems:'center',marginTop:20},

card2 : {alignItems:'center',marginTop:20,justifyContent:'center'},

card2text : {fontSize:16,textAlign:'center',marginTop:7}

})