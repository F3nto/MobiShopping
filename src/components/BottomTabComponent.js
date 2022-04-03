import React,{useEffect} from "react";
import {View,Text,TouchableOpacity,StyleSheet,Image,Dimensions} from 'react-native'
import colors from "../constants/colors";
import {useDispatch, useSelector} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import totalQtyAction from '../store/actions/qty'

const screenWidth = Dimensions.get('screen').width

const BottomTabComponent = ({navigation,screenName}) => {

    const totalQty = useSelector(state => state.TotalQty)
    
    const dispatch = useDispatch()

    useEffect(() => {

        const getTotalQty = async() => {

            const totalQtyFromAsync = await AsyncStorage.getItem('cartTotalQty')
            const qty = JSON.parse(totalQtyFromAsync)

            if(qty == null){

                AsyncStorage.setItem('cartTotalQty', JSON.stringify(0))
                dispatch(totalQtyAction.setTotalQty(0))

            }else{

                AsyncStorage.setItem('cartTotalQty', JSON.stringify(qty))
                dispatch(totalQtyAction.setTotalQty(qty))

            }
        }

        getTotalQty()


    },[])
        


return(

    <View style = {styles.container}>

        <TouchableOpacity onPress = {() => {navigation.navigate('HomeScreen')}} style = {styles.innerView}>

            <Image style = {[styles.btabIcon, {tintColor: screenName == 'HomeScreen' ? colors.Primary : 'gray'}]} source = {require('../../assets/icons/gray_home.png')}/>

            <Text style = {{color: screenName == 'HomeScreen' ? colors.Primary : 'gray'}}>Home</Text>

        </TouchableOpacity>

        <TouchableOpacity onPress = {() => {navigation.navigate('CartScreen')}} style = {styles.innerView}>

            <Image style = {[styles.btabIcon, {tintColor: screenName == 'CartScreen' ? colors.Primary : 'gray'}]} source = {require('../../assets/icons/cart.png')}/>


            {totalQty != 0 && 
                <View style = {{position:'absolute',top: -5, right:0,
                                marginTop: 5, 
                                borderRadius:11, 
                                marginRight:screenWidth/8,width:22,height:22,
                                justifyContent:'center',alignItems:'center',backgroundColor:'green'}}>


                    <Text style = {{fontSize: 12,color:colors.white}}>{totalQty}</Text>


                </View>
            }

            <Text style = {{color: screenName == 'CartScreen' ? colors.Primary : 'gray'}}>Cart</Text>

        </TouchableOpacity>

        <TouchableOpacity onPress = {() => {navigation.navigate('OrderListScreen')}} style = {styles.innerView}>

            <Image style = {[styles.btabIcon, {tintColor: screenName == 'OrderListScreen' ? colors.Primary : 'gray'}]} source = {require('../../assets/icons/oo.png')}/>

            <Text style = {{color: screenName == 'OrderListScreen' ? colors.Primary : 'gray'}}>Order</Text>

        </TouchableOpacity>

        <TouchableOpacity onPress = {() => {navigation.navigate('ProfileScreen')}} style = {styles.innerView} source = {require('../../assets/icons/user.png')}>

            <Image style = {[styles.btabIcon, {tintColor : screenName == 'ProfileScreen' ? colors.Primary : 'gray'}]} source = {require('../../assets/icons/user.png')}/>

            <Text style = {{color : screenName == 'ProfileScreen' ? colors.Primary : 'gray'}}>Profile</Text>

        </TouchableOpacity>


    </View>

)
}
export default BottomTabComponent;

const styles = StyleSheet.create({

container : {flexDirection : 'row',height:60, backgroundColor:colors.white, width:screenWidth, shadowColor:colors.black, elevation:5},

innerView : {width:screenWidth/4, justifyContent:'center', alignItems:'center'},

btabIcon  : {width:25, height:25,}



})