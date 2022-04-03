import React,{useState} from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createDrawerNavigator, DrawerContentScrollView} from '@react-navigation/drawer'
import DrawerMenu from './DrawerMenu';
import AsyncStorage from '@react-native-async-storage/async-storage'

import loginScreen from '../screens/loginScreen';
import homeScreen from '../screens/homeScreen';
import detailScreen from '../screens/detailScreen';
import orderListScreen from '../screens/orderListScreen';
import orderDetailScreen from '../screens/orderDetailScreen';
import profileScreen from '../screens/profileScreen';
import hotestItemScreen from '../screens/hotestItemScreen';
import latestItemScreen from '../screens/latestItemScreen';
import aboutUsScreen from '../screens/aboutUsScreen';
import contactUsScreen from '../screens/contactUsScreen';
import cartScreen from '../screens/cartScreen';
import wishListScreen from '../screens/wishListScreen';




const stack = createNativeStackNavigator();
const drawer = createDrawerNavigator();


const DrawerContentMenu = props => {



    return(

        <DrawerContentScrollView {...props}>


            <DrawerMenu navigation = {props.navigation} />


        </DrawerContentScrollView>

    )


}


const MainNavigator = () => {

    const [isUser, setIsUser] = useState(false)

    AsyncStorage.getItem('loginUser').then((res) => {

        let user = JSON.parse(res)

        if(user != null){

            setIsUser(true)


        }

    })


    return(


    <NavigationContainer>

        <drawer.Navigator drawerContent = {props => DrawerContentMenu(props)} screenOptions = {{headerShown:false}}>

            {!isUser &&  <drawer.Screen name = 'LoginScreen' component = {loginScreen}/>} 

            <drawer.Screen name = 'HomeScreen' component = {homeScreen}/>

            <drawer.Screen name = 'DetailScreen' component = {detailScreen}/>

            <drawer.Screen name = 'OrderListScreen' component = {orderListScreen}/>

            <drawer.Screen name = 'OrderDetailScreen' component = {orderDetailScreen}/>

            <drawer.Screen name = 'ProfileScreen' component = {profileScreen}/>

            <drawer.Screen name = 'HotestItemScreen' component = {hotestItemScreen}/>

            <drawer.Screen name = 'LatestItemScreen' component = {latestItemScreen}/>

            <drawer.Screen name = 'AboutUsScreen' component = {aboutUsScreen}/>

            <drawer.Screen name = 'ContactUsScreen' component = {contactUsScreen}/>

            <drawer.Screen name = 'CartScreen'   component = {cartScreen}/>

            <drawer.Screen name = 'WishListScreen' component = {wishListScreen}/>

            
        </drawer.Navigator>

    </NavigationContainer>

)

}
export default MainNavigator;