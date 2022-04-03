import React,{useState} from 'react'
import {SafeAreaView,View,Text,TouchableOpacity,StyleSheet,TextInput} from 'react-native'
import colors from '../constants/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import loginAction from '../store/actions/login'

//!https://mobidevzoneshopapi.herokuapp.com/api/users

const loginScreen = ({navigation,route}) => {

    const [userName, setUserName] = useState('')
    const [userPass, setUserPass] = useState('')

    const dispatch = useDispatch()   //! Redux

    const loginHandler = async() => {

        const response = await fetch('https://mobidevzoneshopapi.herokuapp.com/api/users')

        const responseData = await response.json()

        console.log('Response Data....', responseData)

        responseData.map((res) => {

            if(res.username == userName && res.password == userPass){

                AsyncStorage.setItem('loginUser', JSON.stringify(res))

                dispatch(loginAction.login(res))

                setUserName('')

                setUserPass('')

                navigation.navigate('HomeScreen')

            }


        })

    }

    return(

        <SafeAreaView style = {styles.container}>

            <View style = {styles.content}>


            <TextInput

            style = {styles.textInput}

            placeholder='User Name'

            onChangeText={text => setUserName(text)}
            value={userName}

            />

            <TextInput

            style = {styles.textInput}

            placeholder='User Password'

            onChangeText={text => setUserPass(text)}
            value={userPass}

            />

            <TouchableOpacity style = {styles.loginBtn} onPress={() => loginHandler()}>

                <Text style = {styles.loginText}>Login</Text>

            </TouchableOpacity>



            </View>

        </SafeAreaView>

    )

    }

export default loginScreen;

const styles = StyleSheet.create({

    container : {flex:1},

    content   : {flex:1,justifyContent:'center', alignItems:'center'},

    textInput : {width:'90%',padding:10,margin:10,borderColor:colors.Primary,borderWidth:2,borderRadius:10},

    loginBtn  : {width:'90%',padding:10,marginTop:20,backgroundColor:colors.Primary},

    loginText : {fontSize:16,fontWeight:'bold',color:colors.white,textAlign:'center'}



})