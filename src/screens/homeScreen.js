import React,{useState,useEffect} from "react";
import {SafeAreaView,View,Text,TouchableOpacity,StyleSheet,Image,Dimensions,FlatList,BackHandler} from 'react-native'
import HeaderComponent from "../components/HeaderComponent";
import colors from "../constants/colors";
import BottomTabComponent from "../components/BottomTabComponent";
import AsyncStorage from '@react-native-async-storage/async-storage'
import cartAction from '../store/actions/cart'
import totalQtyAction from '../store/actions/qty'
import { useDispatch } from "react-redux";

const homeScreen = ({navigation}) => {

    const [prod, setProd] = useState([])

    const dispatch = useDispatch()


    
useEffect (() => {

    const getProductList = async() => {

        const response = await fetch('https://mobidevzoneshopapi.herokuapp.com/api/products')

        const responseJsonData = await response.json()

        console.log(responseJsonData)

        setProd(responseJsonData)

    }

    getProductList()

    const backAction = () => {

        return true;

    };

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );
  
    return () => backHandler.remove();

},[])


const saveToCart = (cartItem) => {

    console.log('cartItems.....', cartItem)

    cartItem.qty = 1
    
    AsyncStorage.getItem('cart').then((res) => {
    const cartProducts = JSON.parse(res)

    let cartArr = []
    let totalQty = cartItem.qty

    if(cartProducts == null){

        cartArr.push(cartItem)

        console.log('init cartArray.........' , cartArr)

        AsyncStorage.setItem('cart', JSON.stringify(cartArr))
        dispatch(cartAction.addToCart(cartArr))

        AsyncStorage.setItem('cartTotalQty', JSON.stringify(totalQty))
        dispatch(totalQtyAction.setTotalQty(totalQty))

    }else{

        let isInCart = null

        for(let i = 0; i < cartProducts.length; i++){

            totalQty += cartProducts[i].qty

            if(cartProducts[i]._id == cartItem._id){

                cartProducts[i].qty += 1

                isInCart = cartItem._id

            }
        }    
    
        if (isInCart == null){

            cartProducts.push(cartItem)

            
        } 

        AsyncStorage.setItem('cart', JSON.stringify(cartProducts))
        dispatch(cartAction.addToCart(cartProducts))

        AsyncStorage.setItem('cartTotalQty', JSON.stringify(totalQty))
        dispatch(totalQtyAction.setTotalQty(totalQty))

    }

    })

    .catch((error) => {

        console.log('error......', error)

    })
    
}



return(

    <SafeAreaView style = {styles.container}>

        <HeaderComponent navigation = {navigation} title = 'Home' icon = 'menu'/>

        <View style = {styles.content}>

            <Text style = {styles.TitleText}>Popular Items</Text>

            <FlatList

            data = {prod}
            
            renderItem = {({item,index}) => {
               

            return(
                
                <TouchableOpacity key = {index} onPress = {() => {navigation.navigate('DetailScreen', {product : item , parentScreen : 'HomeScreen'})}} style = {styles.cardContainer} >
                
               <View style = {{width:'40%',}}>                          
                    <Image style = {{width:'100%',height:'100%',borderRadius:10}} source  = {{uri: item.imgUrl}}/>

                </View>

                <View style = {{width:'60%', paddingLeft:15}}>      

                    <Text style = {styles.CardTitleText}>{item.productName}</Text>  

                    <Text style = {styles.CardCountryText}>(Made in Myanmar)</Text>

                    <Text style = {styles.CardProdPrice}>{item.price}</Text>

                    <TouchableOpacity onPress = {() => saveToCart(item)} style = {styles.BuyViewContainer}>

                        <Text style = {styles.BuyText}>Add To Cart</Text>

                    </TouchableOpacity>

                </View>


                </TouchableOpacity>

               
                 
            )

            }}

                keyExtractor = {(item,index) => index.toString()}
    

            />



        </View>


            <BottomTabComponent navigation = {navigation} screenName = 'HomeScreen'/>


    </SafeAreaView>

)
}
export default homeScreen;

const styles = StyleSheet.create({

container : {flex:1},

content   : {flex:1,backgroundColor:colors.screenBg},

TitleText  : {fontSize:20, fontWeight:'bold',marginTop:5, color: colors.Primary, marginLeft:10},

cardContainer : {flexDirection:'row', height:140, padding:15, backgroundColor:colors.white, borderRadius:10, margin:10},

CardTitleText : {fontSize:18, fontWeight:'bold',},

CardCountryText : {fontSize:15, color:colors.Primary},

CardProdPrice   : {fontSize:18, fontWeight:'bold', color:colors.Primary, marginTop:10},

BuyViewContainer : {width:100,
                    height:40,
                    padding:10, 
                    borderBottomRightRadius:10,
                    backgroundColor:colors.Primary, 
                    position:'absolute', bottom:-15,right:-15,
                    justifyContent:'center',alignItems:'center'},

BuyText          : {fontSize:15, fontWeight:'bold', color:colors.white}

})