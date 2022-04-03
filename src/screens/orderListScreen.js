import React,{useState,useEffect} from "react";
import {SafeAreaView,View,Text,TouchableOpacity,StyleSheet,Image,FlatList} from 'react-native'
import HeaderComponent from "../components/HeaderComponent";
import BottomTabComponent from "../components/BottomTabComponent";
import colors from "../constants/colors";

//! https://myshop-6c5af.firebaseio.com/orders.json


const orderListScreen = ({navigation}) => {

    const [orderList, setOrderList] = useState([])

    useEffect(() => {

        const getOrderList = async() => {

            const response = await fetch('https://myshop-6c5af.firebaseio.com/orders.json')

            const responseData = await response.json()

            let list = []

            for(const key in responseData)

            list.push(responseData[key])

            setOrderList(list)
        }

        getOrderList()
    
    },[])

return(

    <SafeAreaView style = {styles.container}>

        <HeaderComponent navigation= {navigation} title = 'Order List' icon = 'menu'/>

        <View style = {styles.content}>

        <FlatList
        
        data = {orderList}
        
        renderItem = {({item,index}) => {
        
        return(

       
        <TouchableOpacity key = {index} onPress = {() => {navigation.navigate('OrderDetailScreen', {selectedProducts: item})}} style = {styles.cardContainer}>

            <Text style = {styles.orderDate}>{item.orderDate}</Text>

            <Text style = {styles.orderNo}>{item.voucherNo}</Text>

            <View style =  {styles.totalVsIconContainer}>

                <Text style = {styles.total}>Total-{item.totalAmount}</Text>

                <Image style = {{width:30,height:30}} source = {require('../../assets/icons/right-arrow.png')}/>


            </View>


        </TouchableOpacity>

        )
        }}

            keyExtractor = {(item,index) => index.toString()}
        
        />




        </View>



        <BottomTabComponent navigation = {navigation} screenName = 'OrderListScreen'/>


    </SafeAreaView>

)
}
export default orderListScreen;

const styles = StyleSheet.create({

container : {flex:1},

content   : {flex:1,backgroundColor:colors.screenBg},

cardContainer : {padding:10,backgroundColor:colors.white,margin:5},

orderDate : {textAlign:'right', fontSize:14, textAlign:'right'},

orderNo  : {fontSize:20,fontWeight:'bold',color:colors.black,marginBottom:5},

totalVsIconContainer : {flexDirection:'row',justifyContent:'space-between',alignItems:'center'},

total     : {fontSize:16,}


})