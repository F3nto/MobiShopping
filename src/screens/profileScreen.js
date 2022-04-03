import React,{useState,useEffect} from "react";
import {SafeAreaView,View,Text,TouchableOpacity,StyleSheet,Image} from 'react-native'
import HeaderComponent from "../components/HeaderComponent";
import BottomTabComponent from "../components/BottomTabComponent";
import ModalComponent from '../components/ModalComponent'
import colors from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage'
import loginAction from '../store/actions/login'
import {useDispatch} from 'react-redux'

//! https://myshop-6c5af.firebaseio.com/profile.json

const profileScreen = ({navigation}) => {

const [showDialog, setShowDialog] = useState(false)

const [profileData, setProfileData] = useState({})

    const dispatch = useDispatch()

    useEffect(() => {
        
        const getProfileData = async() => {

        const response = await fetch('https://myshop-6c5af.firebaseio.com/profile.json')

        const responseData = await JSON.parse(response)

        let profileData = {}

        for(const key in responseData)

            profileData = responseData[key]

            setProfileData(profileData)
        }

        getProfileData()

    },[])

return(

    <SafeAreaView style = {styles.container}>

        <HeaderComponent navigation= {navigation} title = 'Profile' icon = 'menu'/>

        <View style = {styles.content}>

        <View style = {styles.profileContainer}>

            <Image style = {{width:100,height:100,borderRadius:50}} source = {require('../../assets/images/tor.jpg')}/>

            <Text style = {{fontSize:18,fontWeight:'bold',marginTop:10,color:colors.white,textAlign:'center'}}>{profileData?.name} ({profileData?.school})</Text>

            <Text style = {{fontSize:18,fontWeight:'bold',marginTop:10,color:colors.white}}>{profileData?.phone}</Text>

        </View>

        <View style = {styles.phoneAndEmailContainer}>

            <View style = {styles.phoneAndEmailDivider}>

                <Text style = {{fontSize:18,fontWeight:'bold'}}>Phone</Text>

                <Text style = {{fontSize:16,color:'grey'}}>09xxxxxxxxx</Text>


            </View>

            <View style = {{width:'100%',height:1,backgroundColor:colors.black,marginTop:10,marginBottom:10}}/>

            <View style = {styles.phoneAndEmailDivider}>

                <Text style = {{fontSize:18,fontWeight:'bold'}}>Email</Text>

                <Text style = {{fontSize:16,color:'grey'}}>{profileData?.email}</Text>


            </View>

        </View>
        
        <View style = {styles.addressContainer}>

            <Text style = {{fontSize:18,fontWeight:'bold'}}>Address</Text>

            <Text style = {{marginTop:7,fontSize:16,color:'grey'}}>{profileData?.address}</Text>

        </View>


        <View style = {styles.tabsContainer}>

            <TouchableOpacity onPress = {() => {navigation.navigate('OrderListScreen')}} style = {styles.tabsContentDivider}>
    
                <Image style = {{width:28,height:28,tintColor:colors.Primary}} source= {require('../../assets/icons/oo.png')}/>

                <Text style = {{color:'grey',fontSize:16,paddingLeft:10}}>My Order</Text>


            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.navigate('WishListScreen')}} style = {styles.tabsContentDivider}>
    
                <Image style = {{width:28,height:28,tintColor:colors.Primary}} source= {require('../../assets/icons/heart.png')}/>

                <Text style = {{color:'grey',fontSize:16,paddingLeft:10}}>My Wishlist</Text>


            </TouchableOpacity>

            <TouchableOpacity onPress = {() => {setShowDialog(true)}} style = {styles.tabsContentDivider}>
    
                <Image style = {{width:28,height:28,tintColor:colors.Primary}} source= {require('../../assets/icons/logou.png')}/>

                <Text style = {{color:'grey',fontSize:16,paddingLeft:10}}>Logout</Text>


            </TouchableOpacity>

        </View>

        </View>


        <ModalComponent
        logoutHandler={() => {AsyncStorage.removeItem('loginUser')
                             dispatch(loginAction.login(null))
                             navigation.navigate('LoginScreen')
                             setShowDialog(false)}}
        
        cancelHandler = {() => setShowDialog(false)} visible = {showDialog}/>

        <BottomTabComponent navigation = {navigation} screenName = 'ProfileScreen'/>



    </SafeAreaView>

)
}
export default profileScreen;

const styles = StyleSheet.create({

container : {flex:1},

content   : {flex:1,backgroundColor:colors.screenBg},

profileContainer : {backgroundColor:colors.Primary,height:200,justifyContent:'center',alignItems:'center'},


phoneAndEmailContainer : {padding:10,margin:10,backgroundColor:colors.white,borderRadius:10,shadowColor:colors.black,elevation:5,},

phoneAndEmailDivider  : {flexDirection:'row',alignItems:'center',justifyContent:'space-between'},

addressContainer   : {top:-5,padding:10,margin:10,backgroundColor:colors.white,borderRadius:10,shadowColor:colors.black,elevation:5},

tabsContainer   :  {top:-10,padding:10,margin:10,backgroundColor:colors.white,borderRadius:10,shadowColor:colors.black,elevation:5},

tabsContentDivider : {flexDirection:'row',alignItems:'center',padding:10},

})