import React from "react";
import {View,Text,TouchableOpacity,Image,StyleSheet,} from 'react-native'

const HeaderComponent = ({navigation,title,icon,parentScreenName}) => {

return(

    <View style = {styles.content}>


    {icon == 'menu' ?

        <TouchableOpacity onPress = {() => {navigation.toggleDrawer()}} style = {{marginBottom:10}}>

            <Image style = {{width:25, height:25}} source = {require('../../assets/icons/menu.png')}/>

        </TouchableOpacity>

    :   

        <TouchableOpacity onPress = {() => {navigation.navigate(parentScreenName)}} style = {{marginBottom:10}}>

            <Image style = {{width:25, height:25}} source = {require('../../assets/icons/left-arrow.png')} />

        </TouchableOpacity>


    }

        <Text style = {styles.headerTitle}>{title}</Text>




    </View>


)

}
export default HeaderComponent;

const styles = StyleSheet.create({

content : {flexDirection:'row', alignItems:'center', marginTop:40, marginLeft:10},

headerTitle : {fontSize:18, fontWeight:'bold',marginLeft:5, marginBottom:10,}

})