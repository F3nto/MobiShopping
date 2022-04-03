import React,{useState, useEffect} from "react";
import {SafeAreaView,ScrollView,View,Text,TouchableOpacity,StyleSheet,Image} from 'react-native'
import HeaderComponent from "../components/HeaderComponent";
import colors from "../constants/colors";

//! https://myshop-6c5af.firebaseio.com/orders.json

const orderDetailScreen = ({navigation,route}) => {

    const {selectedProducts} = route?.params
return(

    <SafeAreaView style = {styles.container}>

        <HeaderComponent navigation= {navigation} title = 'Order Detail' icon = 'back' parentScreenName={'OrderListScreen'}/>

        <ScrollView>

        <View style = {styles.content}>

            <Text style = {styles.ordate}>{selectedProducts.voucherNo}</Text>

            <Text style = {styles.orno}>{selectedProducts.orderDate}</Text>




        <View style = {styles.NqptContainer}>

            <Text style = {[{flex:1,color:'black',fontWeight:'bold'},styles.titleText]}>Name</Text>

            <Text style = {[{width:'15%',textAlign:'center',color:'black',fontWeight:'bold'},styles.titleText]}>Qty</Text>

            <Text style = {[{width:'20%',textAlign:'right',color:'black',fontWeight:'bold'},styles.titleText]}>Price</Text>

            <Text style = {[{width:'20%',textAlign:'right',color:'black',fontWeight:'bold'},styles.titleText]}>Total</Text>

        </View>
        
        <View style = {styles.boldDivider}/>
        
        {

        selectedProducts?.porducts.map((item,index) => {

            return(
            

            <View key = {index}>

                <View  style = {styles.NqptContainer}>

                    <Text style = {[{flex:1,color:'grey'},styles.titleText]}>{item.proudctName}</Text>

                    <Text style = {[{width:'15%',textAlign:'center',color:'grey'},styles.titleText]}>{item.qty}</Text>

                    <Text style = {[{width:'20%',textAlign:'right',color:'grey'},styles.titleText]}>{item.price}</Text>

                    <Text style = {[{width:'20%',textAlign:'right',color:'black',fontWeight:'bold'},styles.titleText]}>{item.qty * item.price}</Text>


                </View>

                <View style = {styles.greyDivider}/>
                
            </View>

            )

            })

        }

        <View style = {styles.subTotalContainer}>

            <View>

                <Text style = {styles.totaltaxAndDeltxt}>Sub Total -</Text> 

                <Text style = {styles.totaltaxAndDeltxt}>Tax -</Text>

                <Text style = {styles.totaltaxAndDeltxt}>Delivery -</Text>


            </View>

            <View>

                <Text style = {styles.totaltaxAndDeltxt}>{selectedProducts.totalAmount}</Text>

                <Text style = {styles.totaltaxAndDeltxt}>{selectedProducts.tax}</Text>

                <Text style = {styles.totaltaxAndDeltxt}>{selectedProducts.delivery}</Text>


            </View>


        </View>

        <View style = {[{top:5},styles.boldDivider]}/>

        <View style = {[{marginTop:5},styles.subTotalContainer]}>

            <Text style = {styles.totaltaxAndDeltxt}>Total -</Text>


            <Text style = {styles.totaltaxAndDeltxt}>{selectedProducts.totalAmount + selectedProducts.tax + selectedProducts.delivery}</Text>


        </View>


        <View style = {[{top:10},styles.boldDivider]}/>


        </View>


        </ScrollView>
    </SafeAreaView>

)
}
export default orderDetailScreen;

const styles = StyleSheet.create({

container : {flex:1},

content   : {flex:1,padding:15},

ordate    : {fontSize:16, textAlign:'right',},

orno      : {fontSize:20, fontWeight:'bold',},

NqptContainer : {flexDirection:'row', alignItems:'center',marginTop:15},

titleText : {fontSize:16,},

boldDivider: {height:2,backgroundColor:'grey',marginTop:5},
 
greyDivider : {height:1,backgroundColor:'grey',marginTop:15},

subTotalContainer : {flexDirection:'row',alignItems:'center',justifyContent:'flex-end'},

totaltaxAndDeltxt : {fontSize:18,fontWeight:'bold',textAlign:'right',marginTop:10,paddingLeft:15}


})