import React,{useEffect} from 'react'
import {SafeAreaView,View,Text,Image,TouchableOpacity,StyleSheet,FlatList,} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import cartAction from '../store/actions/cart'
import totalQtyAction from '../store/actions/qty'
import wishListAction from '../store/actions/wishList'
import HeaderComponent from '../components/HeaderComponent'
import {useDispatch, useSelector} from 'react-redux'
import colors from '../constants/colors';

const wishListScreen = ({navigation}) => {

    let wishListProd = useSelector(state => state.WishList)  //! redux 

    const dispatch = useDispatch()              


    useEffect(() => {

        const getWishListProducts = async() => {

            const wishListProdFromAsync = await AsyncStorage.getItem('wishList')

            const wishListProd = JSON.parse(wishListProdFromAsync)

            if(wishListProd == null){

                AsyncStorage.setItem('wishList', JSON.stringify([]))
                dispatch(wishListAction.addToWishList([]))

            }else{

                AsyncStorage.setItem('wishList', JSON.stringify(wishListProd))
                dispatch(wishListAction.addToWishList([]))

            }
        }

        getWishListProducts()

    },[])


    const saveToCart = (cartItem) => {

        cartItem.qty = 1

        AsyncStorage.getItem('cart').then((res) => {
        const cartProducts = JSON.parse(res)
        let cartArr = []
        let totalQty = cartItem.qty


        if(cartProducts == null){

            cartArr.push(cartItem)

            AsyncStorage.setItem('cart', JSON.stringify(cartArr))
            dispatch(cartAction.addToCart(cartArr))

            AsyncStorage.setItem('cartTotalQty', JSON.stringify(totalQty))
            dispatch(totalQtyAction.setTotalQty(totalQty))

        } else {

            let isInCart = null
           
            for(let i = 0; i < cartProducts.length; i++){

                totalQty += cartProducts[i].qty

                if(cartProducts[i]._id == cartItem._id){

                    cartProducts[i].qty += 1

                    isInCart = cartItem._id

                }

            }

            if(isInCart == null){

                cartProducts.push(cartItem)

               
            }

            AsyncStorage.setItem('cart', JSON.stringify(cartProducts))
            dispatch(cartAction.addToCart(cartProducts))


            AsyncStorage.setItem('cartTotalQty', JSON.stringify(totalQty))
            dispatch(totalQtyAction.setTotalQty(totalQty))



        }

    })

    .catch((error) => {

        console.log('catch error', error)

    })

    }

    const removeEachItem = (removeItem) => {

        console.log('remove Item is...', removeItem)

        AsyncStorage.getItem('wishList').then((res) => {

        const wishListData = JSON.parse(res)

        console.log('Saved wishList items...', wishListData)

        let leftWishListData = [];

        if(wishListData != null){

            leftWishListData = wishListData.filter(prod => prod._id == removeItem._id)

        }

        AsyncStorage.setItem('wishList', JSON.stringify(leftWishListData))
        dispatch(wishListAction.addToWishList(leftWishListData))



        })
        .catch((error) => {

            console.log('catch error....', error)


        })

    }


    return(

        <SafeAreaView style = {styles.container}>

            <HeaderComponent navigation={navigation} title = 'Wish List' icon = 'back' parentScreenName={'ProfileScreen'}/>

        <View style = {styles.content}>

            {wishListProd ?. length > 0 && <View style = {styles.removeItemContainer}>

            <TouchableOpacity onPress={() => {

                AsyncStorage.removeItem('wishList')
                dispatch(wishListAction.addToWishList([]))}}>

                <Text style = {styles.removeItemText}>Remove All</Text>


            </TouchableOpacity>

            </View>}

            {wishListProd ?. length > 0 ? <FlatList
            
            data = {wishListProd}
            renderItem = {({item,index}) => {

            return(


        <TouchableOpacity key = {index} onPress = {() => {navigation.navigate('DetailScreen')}} style = {styles.cardContainer}>

        <View style = {{width:'40%',}}>                          
            <Image style = {{width:'100%',height:'100%',borderRadius:10}} source = {{uri: item.imgUrl}}/>

        </View>

        <View style = {{width:'60%', paddingLeft:15}}>      

            <Text style = {styles.CardTitleText}>{item.productName}</Text>  

            <Text style = {styles.CardCountryText}>(Made in Myanmar)</Text>

            <Text style = {styles.CardProdPrice}>{item.price}</Text>

            <TouchableOpacity onPress={() => {removeEachItem(item)}} style = {styles.removeEachItemContainer}>


                <Image style = {{width:30,height:30,tintColor:colors.Primary}} source={require('../../assets/icons/minus.png')}/>


            </TouchableOpacity>

        

            <TouchableOpacity onPress={() => saveToCart(item)} style = {styles.addToCartContainer}>

                <Text style = {styles.addToCartText}>Add To Cart</Text>

            </TouchableOpacity>

        
        </View>

        
        </TouchableOpacity>

    
        )
        }}

            keyExtractor = {(item,index) => index.toString()}

        /> : 

        <View style = {styles.noProdContainer}>

            <Text>There is no products in your wishList!!!!</Text>

        </View>

        }

        </View> 

        </SafeAreaView>

    )
}
export default wishListScreen;

const styles = StyleSheet.create({

    container : {flex:1},

    content : {flex:1},

    cardContainer : {flexDirection:'row', height:140, padding:15, backgroundColor:colors.white, borderRadius:10, margin:10},

    CardTitleText : {fontSize:18, fontWeight:'bold',},

    CardCountryText : {fontSize:15, color:colors.Primary},

    CardProdPrice   : {fontSize:18, fontWeight:'bold', color:colors.Primary, marginTop:10},

    addToCartContainer : {position:'absolute', right:-15, bottom:-15, padding:10,backgroundColor:colors.Primary,borderBottomRightRadius:10,borderTopLeftRadius:10},

    addToCartText : {fontSize:15, color:colors.white, fontWeight:'bold'},

    removeEachItemContainer : {position:'absolute', right:-15, top:-15},

    removeItemContainer : {alignItems:'flex-end',marginRight:10},

    removeItemText : {fontSize:24, fontWeight:'bold', color:colors.Primary},

    noProdContainer : {flex:1,justifyContent:'center', alignItems:'center'}
})