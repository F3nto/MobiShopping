import React,{useState} from 'react'
import {SafeAreaView,View,Text,TouchableOpacity,StyleSheet,Image} from 'react-native'
import colors from '../constants/colors'
import ModalComponent from '../components/ModalComponent'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import loginAction from '../store/actions/login'


const DrawerMenu = ({navigation}) => {

const [showDialog, setShowDialog] = useState(false)

const dispatch = useDispatch()

return(

    <SafeAreaView style = {styles.container}>

        <View style = {styles.outerView}>

            <Image style = {{width:80,height:80,borderRadius:100}} source= {require('../../assets/images/tor.jpg')}/>

            <Text style = {styles.outerViewText}>Name</Text>

            <Text style = {{color:colors.white}}>09754199668</Text>


        </View>

    <View style = {styles.content}> 

        <TouchableOpacity onPress = {() => {navigation.navigate('HomeScreen')}} style = {styles.innerView}>

            <Image style = {{width:25,height:25,tintColor:colors.Primary}} source = {require('../../assets/icons/gray_home.png')}/>

            <Text style = {styles.innerViewText}>Home</Text>


        </TouchableOpacity>


        <TouchableOpacity onPress = {() => {navigation.navigate('OrderListScreen')}} style = {styles.innerView}>


            <Image style = {{width:25,height:25,tintColor:colors.Primary}} source = {require('../../assets/icons/oo.png')}/>

            <Text style = {styles.innerViewText}>Order</Text>


        </TouchableOpacity>

        <TouchableOpacity onPress = {() => {navigation.navigate('HotestItemScreen')}} style = {styles.innerView}>

            <Image style = {{width:25,height:25,tintColor:colors.Primary}} source = {require('../../assets/icons/hot.png')}/>

            <Text style = {styles.innerViewText}>Hotest Items</Text>


        </TouchableOpacity>

        <TouchableOpacity onPress = {() => {navigation.navigate('LatestItemScreen')}} style = {styles.innerView}>

            <Image style = {{width:25,height:25,tintColor:colors.Primary}} source = {require('../../assets/icons/last.png')}/>


            <Text style = {styles.innerViewText}>Latest Items</Text>


        </TouchableOpacity>

        <View style = {{width:'90%', height:2, backgroundColor:colors.Primary,marginTop:10}}/>

        <TouchableOpacity onPress = {() => {navigation.navigate('ProfileScreen')}} style = {styles.innerView}>

            <Image style = {{width:25,height:25,tintColor:colors.Primary}} source = {require('../../assets/icons/user.png')}/>


            <Text style = {styles.innerViewText}>Profile</Text>


        </TouchableOpacity>

        <TouchableOpacity onPress = {() => {navigation.navigate('AboutUsScreen')}} style = {styles.innerView}>

            <Image style = {{width:25,height:25,tintColor:colors.Primary}} source = {require('../../assets/icons/about.png')}/>

            <Text style = {styles.innerViewText}>About Us</Text>

        </TouchableOpacity>

        

        <TouchableOpacity onPress = {() => {navigation.navigate('ContactUsScreen')}} style = {styles.innerView}>

            <Image style = {{width:25,height:25,tintColor:colors.Primary}} source = {require('../../assets/icons/cont.png')}/>


            <Text style = {styles.innerViewText}>Contact Us</Text>


        </TouchableOpacity>

        <View style = {{width:'90%', height:2, backgroundColor:colors.Primary,marginTop:10}}/>

        <TouchableOpacity onPress = {() => {setShowDialog(true)}} style = {styles.innerView}>

            <Image style = {{width:25,height:25,tintColor:colors.Primary}} source = {require('../../assets/icons/log.png')}/>


            <Text style = {styles.innerViewText}>Logout</Text>


        </TouchableOpacity>

        

    </View>

        <ModalComponent logoutHandler = {() => { AsyncStorage.removeItem('loginUser')  
                                               dispatch(loginAction.login(null))
                                               navigation.navigate('LoginScreen')
                                               setShowDialog(false)}} 
                                               
                                               cancelHandler = {() => {setShowDialog(false)}} 
                                               visible = {showDialog} /> 







    </SafeAreaView>


)
}

export default DrawerMenu;

const styles = StyleSheet.create({

    container : {flex:1},

    outerView : {height:200,justifyContent:'center',alignItems:'center',backgroundColor:colors.Primary},

    outerViewText : {fontSize:18,fontWeight:'bold',color:'#fff'},

    content   : {flex:1,marginLeft:40},

    innerView : {flexDirection:'row',alignItems:'center',marginTop:30},

    innerViewText : {fontWeight:'bold',marginLeft:7}

    



})