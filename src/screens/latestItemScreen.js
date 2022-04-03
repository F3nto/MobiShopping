import React,{useState,useEffect} from "react";
import {SafeAreaView,View,Text,TouchableOpacity,StyleSheet,Image,FlatList,Dimensions} from 'react-native'
import HeaderComponent from "../components/HeaderComponent";
import AsyncStorage from '@react-native-async-storage/async-storage'
import cartAction from '../store/actions/cart'
import { useDispatch } from "react-redux";
import colors from "../constants/colors";

const screenWidth = Dimensions.get('screen').width



const latestItemScreen = ({navigation}) => {

    const dispatch = useDispatch()

    const [latestProduct, setLatestProduct] = useState([])

    useEffect(() => {

        const getLatestProduct = async() => {

            const response = await fetch('https://mobidevzoneshopapi.herokuapp.com/api/products')
            const responseData = await response.json()


            responseData.map(prod => prod.qty = 1)
    
            setLatestProduct(responseJsonData)
    
        }

        getLatestProduct()

    }, [])



    const clickMinus = async(item) => {

        const response = await fetch('https://mobidevzoneshopapi.herokuapp.com/api/products')

        const responseData = await response.json()

        responseData.map((prod) => prod.qty = 1)

        console.log('Selected Minus Products.....', item)

        if(item.qty > 1){

            item.qty -= 1

            let index = responseData.findIndex(prod => prod._id == item._id)

            responseData[index] = item
        }

        setLatestProduct(responseData)

    }

    const clickPlus = async(item) => {

        const response = await fetch('https://mobidevzoneshopapi.herokuapp.com/api/products')

        const responseData = await response.json()

        responseData.map(prod => prod.qty = 1)

        item.qty += 1

        let index = responseData.findIndex(prod => prod._id == item._id)

        responseData[index] = item

        setLatestProduct(responseData)

    }
    const saveToCart = (currentItem) => {

        AsyncStorage.getItem('cart').then((res) => {
        
        const cartData = JSON.parse(res)
        let cartArr = []

        if(cartData == null){

            cartArr.push(currentItem)

            AsyncStorage.setItem('cart', JSON.stringify(cartArr))
            dispatch(cartAction.addToCart(cartArr))

        }else{

            let isInCartId = null
            
            for(let i = 0; i < cartData.length; i++){

                if(cartData._id == currentItem._id){

                    isInCartId = currentItem.id


                }


            }

            if(isInCartId == null){

                cartData.push(currentItem)

            }

            AsyncStorage.setItem('cart', JSON.stringify(cartData))
            dispatch(cartAction.addToCart(cartData))

        }

    })

    .catch((error) => {

        console.log('catch error.....', error)

    })
    
    }

return(

    <SafeAreaView style = {styles.container}>

        <HeaderComponent navigation= {navigation} title = 'Latest Items' icon = 'back' parentScreenName={'HomeScreen'}/>

        <View style = {styles.content}>

        <FlatList

        numColumns = {2}

        
        data = {latestProduct}

        renderItem = {({item,index}) => {

        return(

        <TouchableOpacity  key = {index} onPress = {() => {navigation.navigate('DetailScreen', item)}} style = {styles.card}>

            <View style = {{width:100,height:100}}>

            <Image style = {{width:'100%',height:'100%'}} source = {{uri: item.imgUrl}}/>


            </View>

            <Text style = {styles.prodName}>{item.productName}</Text>


            <Text style = {styles.prodPrice}>{item.price}</Text>

            <View style = {styles.plusAndMinusContainer}>

                <TouchableOpacity onPress={() => clickMinus(item)}>
                    
               <Image style = {{width:30,height:30,tintColor:colors.Primary}} source = {require('../../assets/icons/minus.png')}/> 

               </TouchableOpacity>

               <Text style = {styles.oneTextContainer}>{item.qty}</Text>

               <TouchableOpacity onPress={() => clickPlus(item)}>
               
               <Image style = {{width:30,height:30,tintColor:colors.Primary}} source = {require('../../assets/icons/plus.png')}/>

               </TouchableOpacity>

            </View>


            <TouchableOpacity onPress={() => saveToCart(item)} style = {styles.addToCartView}>

                <Text style = {{color:colors.white, fontSize:16}}>Add to Cart</Text>

            </TouchableOpacity>

        </TouchableOpacity>

        )

        }}
        
            keyExtractor = {(item,index) => index.toString()}
        
        />







        </View>
    </SafeAreaView>

)
}
export default latestItemScreen;

const styles = StyleSheet.create({

    container : {flex:1},
    
    content   : {flex:1,backgroundColor:colors.screenBg},
    
    card      : {justifyContent:'center',alignItems:'center',margin:10, paddingTop:15,width:screenWidth/2 -20,shadowColor:colors.black, shadowRadius:10,elevation:5,backgroundColor:colors.white},
    
    prodName : {marginTop:10,fontSize:17,color:colors.black},
    
    prodPrice : {color:'grey',fontSize:15},
    
    plusAndMinusContainer : {flexDirection:'row',alignItems:'center',marginTop:10},
    
    oneTextContainer     : {fontSize:16,fontWeight:'bold',color:colors.Primary, paddingHorizontal:10},
    
    addToCartView       : {marginTop:10,backgroundColor:colors.Primary, justifyContent:'center',alignItems:'center',padding:10,width:screenWidth/2 -20}
    
    
})