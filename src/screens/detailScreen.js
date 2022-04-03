import React,{useState,useEffect} from "react";
import {SafeAreaView,View,Text,TouchableOpacity,StyleSheet,Image, ScrollView, Dimensions} from 'react-native'
import HeaderComponent from "../components/HeaderComponent";
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from "../constants/colors";
import {useDispatch, useSelector} from 'react-redux'
import cartAction from '../store/actions/cart'
import totalQtyAction from '../store/actions/qty'
import wishListAction from '../store/actions/wishList'
const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width



const detailScreen = ({navigation,route}) => {

    const [isInWishList, setIsInWishList] = useState(false)

    const [qty, setQty] = useState(1)

    const dispatch = useDispatch() //! redux

    let {product, parentScreen} = route.params //! cause of back screen may be two screens or more

useEffect(() => {

    AsyncStorage.getItem('wishList').then((res) => {

    const wishListData = JSON.parse(res)

    if(wishListData == null){

        setIsInWishList(false)

    }else{

        let isWishListId = null

        for(let i = 0; i < wishListData.length; i++){

            if(wishListData[i]._id == product._id){

                isWishListId = product._id

            }

        }

        if(isWishListId != null){

            setIsInWishList(true)

        }else{

            setIsInWishList(false)

        }
    }

    })

},[route])

 


const saveToCart = (prodItem) => {

    prodItem.qty = qty
    let totalQty = prodItem.qty

    AsyncStorage.getItem('cart').then((res) => {

        
        const cartProducts = JSON.parse(res)

        let cartArr = []

        if(cartProducts == null){

            cartArr.push(prodItem)
            AsyncStorage.setItem('cart', JSON.stringify(cartArr))
            dispatch(cartAction.addToCart(cartArr))

            AsyncStorage.setItem('cartTotalQty', JSON.stringify(totalQty))
            dispatch(totalQtyAction.setTotalQty(totalQty))
            
        }else {

            let isInCart = null
            

            for(let i = 0; i < cartProducts.length; i++){

                totalQty += cartProducts[i].qty

                if(cartProducts[i]._id == prodItem._id){

                    cartProducts[i].qty += 1

                    isInCart = prodItem._id

                }


            }

            if(isInCart == null){ 
            
                cartProducts.push(prodItem)
        
            }

            AsyncStorage.setItem('cart', JSON.stringify(cartProducts))
            dispatch(cartAction.addToCart(cartProducts))

            AsyncStorage.setItem('cartTotalQty', JSON.stringify(totalQty))
            dispatch(totalQtyAction.setTotalQty(totalQty))

            setQty(1)
        }


    })

    .catch((error) => {

        console.log('catch error........', error)

    })


}

const clickMinus = () => {

    if(qty > 1){

    setQty(qty - 1)

    }

}

const clickPlus = () => {

    setQty(qty + 1)

}


const saveToWishList = (wishListItem) => {

    if(isInWishList){

        AsyncStorage.getItem('wishList').then((res) => {

            const wishListData = JSON.parse(res)

            let wishListArr = []

            if(wishListData != null){

                wishListArr = wishListData.filter(prod => prod._id != wishListItem._id)

            }

            AsyncStorage.setItem('wishList', JSON.stringify(wishListArr))
            dispatch(wishListAction.addToWishList(wishListArr))


        })
        setIsInWishList(false)

    }else{

        AsyncStorage.getItem('wishList').then((res) => {

            const wishListData = JSON.parse(res)
            let wishListArr = []
        
            if(wishListData == null){
        
                wishListArr.push(wishListItem)
        
                AsyncStorage.setItem('wishList', JSON.stringify(wishListArr))
                dispatch(wishListAction.addToWishList(wishListArr))
        
        
            }else {
        
                let isWishListId = null
        
                for(let i=0; i < wishListData.length; i++){
        
                    if(wishListData[i]._id == wishListItem._id){
        
                        isWishListId = wishListItem._id
        
                    }
        
                }
        
                console.log('is ID null.....', isWishListId)
        
                if(isWishListId == null){
        
                    wishListData.push(wishListItem)
        
                }
        
                AsyncStorage.setItem('wishList', JSON.stringify(wishListData))
                dispatch(wishListAction.addToWishList(wishListData))
                
            }
                setIsInWishList(true)
           
            })

        }

    }


return(

   
    <SafeAreaView style = {styles.container}>

        <HeaderComponent navigation= {navigation} title = {product.productName} icon = 'back' parentScreenName={parentScreen}/>

        <ScrollView>

        <View style = {styles.content}>

        <View style={{width: '100%',  height: 2/3 * width}}>

            <Image style = {{width:'100%', height:'100%'}} resizeMode="cover"  source = {{uri: product.imgUrl}}/>

        </View>
        <View style = {styles.titleContainer}>

            <View style = {styles.titleFirstContainer}>

                <Text style = {{color:colors.Primary, fontSize:18, fontWeight:'bold'}}>{product.productName}</Text>

           

                <TouchableOpacity onPress={() => {saveToWishList(product)}}>

                   { isInWishList ? <Image style = {{width:25,height:25}} source = {require('../../assets/icons/heart2.png')}/>

                    :

                    <Image style = {{width:25,height:25}} source={require('../../assets/icons/heart.png')}/>}

                </TouchableOpacity>

              
            </View>  

            <View style = {styles.titleSecContainer}>

                { product.discount != 0 && <Text style = {{color:'grey',textDecorationLine:'line-through'}}>{product.price}</Text> }
                
                <Text style = {{paddingHorizontal:7}}>{product.price - product.discount}</Text>
                
            </View>

        </View>

        <View style = {styles.bottomContainer}>
             
            <View style = {{flexDirection:'row',alignItems:'center',margin:5}}>

                <TouchableOpacity onPress={() => {clickMinus()}} >

                <Image style = {{width:25,height:25,tintColor:colors.Primary}} source= {require('../../assets/icons/minus.png')}/>
                
                </TouchableOpacity>

                <Text style = {{paddingHorizontal:10,fontSize:16}}>{qty}</Text>

                <TouchableOpacity onPress={() => {clickPlus()}}>

                <Image style = {{width:25,height:25,tintColor:colors.Primary}} source= {require('../../assets/icons/plus.png')}/>        

                </TouchableOpacity>
            </View>


            <TouchableOpacity onPress={() => saveToCart(product)} style = {styles.addToCartContainer}>


                <Text style = {{color:colors.white,fontSize:16,fontWeight:'bold'}}>Add to Cart</Text>



            </TouchableOpacity>
             
        </View> 

        <View style = {styles.descContainer}>

            <Text style = {{color:colors.black, fontSize:18, fontWeight:'bold'}}>Description</Text>

            <Text style = {{fontSize:14, marginTop:5}}>{product.description}</Text>

        </View>               
        </View>
        </ScrollView>
    </SafeAreaView>
    
   

)
}
export default detailScreen;

const styles = StyleSheet.create({

container: {flex:1,},

content: {flex:1, backgroundColor:colors.white},

titleContainer : {backgroundColor:colors.white , padding:10, margin:10, borderRadius:10, shadowColor:colors.black, elevation:5},

titleFirstContainer : {flexDirection:'row', justifyContent:'space-between'},

titleSecContainer : {flexDirection:'row',marginTop:15 },

descContainer   : {backgroundColor:colors.white, padding:10,  margin:10, borderRadius:10, shadowColor:colors.black, elevation:5 },

bottomContainer : {flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10 ,padding:10, margin:10, backgroundColor:colors.white, borderRadius:10, shadowColor:colors.black, elevation:5},

addToCartContainer : {backgroundColor:colors.Primary,width:120,borderRadius:5,padding:5,justifyContent:'center',alignItems:'center',margin:5}


})