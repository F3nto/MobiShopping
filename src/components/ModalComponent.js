import React,{useState} from "react";
import {View,TouchableOpacity,Text,StyleSheet,Modal } from "react-native";
import colors from "../constants/colors";

const ModalComponent = ({cancelHandler, visible,logoutHandler}) => {

return(

    <Modal animationType= 'fade' transparent= {true} visible = {visible}>

        <View style = {styles.container}>

            <View style = {styles.outerView}>

            <Text style = {{fontSize:20, fontWeight:'bold', textAlign:'center',color:colors.Primary, opacity:0.8}}>Please Come Back Soon!!</Text>


            <Text style = {{fontSize:16, fontWeight:'bold', textAlign:'center',color: 'grey',marginTop:10}}>Are you sure want to exit?</Text>


            <View style = {styles.innerView}>

                <TouchableOpacity onPress = {() => logoutHandler()} style = {styles.yesAndNoContainer}>

                    <Text style = {{color:colors.white, fontWeight:'bold', fontSize:18, textAlign:'center'}}>Yes</Text>


                </TouchableOpacity>


                <TouchableOpacity onPress = {() => {cancelHandler()}} style = {styles.yesAndNoContainer}>


                    <Text style = {{color:colors.white, fontWeight:'bold', fontSize:18, textAlign:'center'}}>No</Text>


                </TouchableOpacity>




            </View>
            </View>

        </View>
        

    </Modal>


)
} 
export default ModalComponent;

const styles = StyleSheet.create({

container : {flex:1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent:'center', alignItems:'center'},

outerView   : {width:'90%', backgroundColor:colors.white, padding:20, borderRadius:10 },

innerView   : {width:'100%',marginTop:10, flexDirection:'row', justifyContent:'space-around' ,alignItems:'center'},

yesAndNoContainer: {marginTop:10, width:'30%',backgroundColor:colors.Primary,padding:10,borderRadius:10},




})