import React,{useEffect} from "react";
import {SafeAreaView,View,Text,StyleSheet,TouchableOpacity,FlatList,Dimensions,Image } from 'react-native'
import HeaderComponent from "../components/HeaderComponent";
import BottomTabComponent from "../components/BottomTabComponent";
import colors from "../constants/colors";
import {useDispatch,useSelector} from 'react-redux'
import cartAction from '../store/actions/cart'
import totalQtyAction from '../store/actions/qty'
import AsyncStorage from '@react-native-async-storage/async-storage'

const screenWidth = Dimensions.get('screen').width

const cartScreen = ({navigation}) => {

    let cartProducts = useSelector(state => state.Cart)
    let totalQty = useSelector(state => state.TotalQty)

    const dispatch = useDispatch()

    useEffect(() => {

        const getCartProducts = async() => {

            const cartProdFromAsync = await AsyncStorage.getItem('cart')
            const cartProducts = JSON.parse(cartProdFromAsync)

            if(cartProducts == null){

                AsyncStorage.setItem('cart', JSON.stringify([]))
                dispatch(cartAction.addToCart([]))

            }else{

                AsyncStorage.setItem('cart', JSON.stringify(cartProducts))
                dispatch(cartAction.addToCart(cartProducts))


            }
        }

        const getTotalQty = async() => {

            const totalQtyFromAsync = await AsyncStorage.getItem('cartTotalQty')

            const totalQty = JSON.parse(totalQtyFromAsync)

            if(totalQty == null){

                AsyncStorage.setItem('cartTotalQty', JSON.stringify(0))
                dispatch(totalQtyAction.setTotalQty(0))

            }else{

                AsyncStorage.setItem('cartTotalQty', JSON.stringify(totalQty))
                dispatch(totalQtyAction.setTotalQty(totalQty))
            }
        }
        getCartProducts();
        getTotalQty();
        
    },[])


    const clickMinus = (minProd) => {

        const index =  cartProducts.findIndex(prod => prod == minProd)


        if(cartProducts[index].qty > 1 ){

            cartProducts[index].qty -= 1


            AsyncStorage.setItem('cart', JSON.stringify(cartProducts))
            dispatch(cartAction.addToCart(cartProducts))

            AsyncStorage.setItem('cartTotalQty', JSON.stringify(totalQty - 1))
            dispatch(totalQtyAction.setTotalQty(totalQty - 1))


        } else {

            deleteHandle(minProd)

        }

        console.log('Index.......', index)

    }

    const clickPlus = (plusProd) => {

        let index = cartProducts.findIndex(prod => prod == plusProd)

        cartProducts[index].qty += 1
        
        dispatch(cartAction.addToCart(cartProducts))
        AsyncStorage.setItem('cart', JSON.stringify(cartProducts))
        
        dispatch(totalQtyAction.setTotalQty(totalQty + 1))
        AsyncStorage.setItem('cartTotalQty', JSON.stringify(totalQty + 1))

    }

    const deleteHandle = (delItem) => {

        let index = cartProducts.findIndex(prod => prod == delItem) 


        let leftData = []

        AsyncStorage.getItem('cart').then((res) =>{ 
        
            const cartData = JSON.parse(res)

            console.log('cart data ..........' , cartData)

            if(cartData == null){

                AsyncStorage.setItem('cart', JSON.stringify([]))
                dispatch(cartAction.addToCart([]))

                AsyncStorage.setItem('cartTotalQty',  JSON.stringify(0))
                dispatch(totalQtyAction.setTotalQty(0))

            }else{

                for(let i = 0; i < cartData.length; i++){

                    if(cartData[i]._id != delItem._id){

                        leftData.push(cartData[i])

                    }


                }


                console.log('left data....', leftData)

                AsyncStorage.setItem('cart', JSON.stringify(leftData))
                dispatch(cartAction.addToCart(leftData))

                AsyncStorage.setItem('cartTotalQty', JSON.stringify(totalQty - cartProducts[index].qty))
                dispatch(totalQtyAction.setTotalQty(totalQty - cartProducts[index].qty))


            }



        })

    }
    

return(

    <SafeAreaView style = {styles.container}>

        <HeaderComponent navigation= {navigation} title = 'Cart' icon = 'back' parentScreenName={'HomeScreen'}/>

        <View style = {styles.content}>
 
        {cartProducts ?. length > 0 ? <FlatList
        
        data = {cartProducts}
        renderItem = {({item,index}) => {

    return(


    <TouchableOpacity key = {index} onPress = {() => {navigation.navigate('DetailScreen')}} style = {styles.cardContainer}  >

   <View style = {{width:'40%',}}>                          
        <Image style = {{width:'100%',height:'100%',borderRadius:10}} source = {{uri: item.imgUrl}}/>

    </View>

    <View style = {{width:'60%', paddingLeft:15}}>      

        <Text style = {styles.CardTitleText}>{item.productName}</Text>  

        <Text style = {styles.CardCountryText}>(Made in Myanmar)</Text>

        <Text style = {styles.CardProdPrice}>{item.price}</Text>

        <View style = {styles.plusAndMinusContainer}>

            <TouchableOpacity onPress={() => {clickMinus(item)}}>

            <Image style = {{width:30,height:30,tintColor:colors.Primary}} source = {require('../../assets/icons/minus.png')}/> 

            </TouchableOpacity>


                <Text style = {styles.oneTextContainer}>{item.qty}</Text>

            <TouchableOpacity onPress={() => {clickPlus(item)}}>

            <Image style = {{width:30,height:30,tintColor:colors.Primary}} source = {require('../../assets/icons/plus.png')}/>

            </TouchableOpacity>
        </View>

       
    </View>

       


    </TouchableOpacity>

   
     
    )

    }}

    keyExtractor = {(item,index) => index.toString()}

    
    ListFooterComponent={
    
        <TouchableOpacity onPress={() => {
        
        AsyncStorage.removeItem('cart')

        dispatch(cartAction.addToCart([]))

        AsyncStorage.removeItem('cartTotalQty')

        dispatch(totalQtyAction.setTotalQty(0))
    
    
    
        }} style = {styles.shopping}>

        <Text style = {{fontSize:16,fontWeight:'bold',color:colors.white}}>Shopping</Text>


        </TouchableOpacity>

    }

    /> :


     <View style = {styles.noProduct}>

        <Text>There is no product in your cart!!!!</Text>


    </View>
    
    }
   

    </View>


    <BottomTabComponent navigation = {navigation} screenName = 'CartScreen'/>


    

    </SafeAreaView>

)
}
export default cartScreen;

const styles = StyleSheet.create({

container : {flex:1},

content   : {flex:1},


cardContainer : {flexDirection:'row', height:140, padding:15, backgroundColor:colors.white, borderRadius:10, margin:10},

CardTitleText : {fontSize:18, fontWeight:'bold',},

CardCountryText : {fontSize:15, color:colors.Primary},

CardProdPrice   : {fontSize:18, fontWeight:'bold', color:colors.Primary, marginTop:10},

plusAndMinusContainer : {flexDirection:'row',alignItems:'center',marginTop:10},

oneTextContainer     : {fontSize:16,fontWeight:'bold',color:colors.Primary, paddingHorizontal:10},

shopping : {width:screenWidth,padding:10,backgroundColor:colors.Primary,justifyContent:'center',alignItems:'center'},

noProduct : {flex:1, justifyContent:'center', alignItems:'center'}

})