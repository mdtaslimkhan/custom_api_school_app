import React, {useEffect, useState} from 'react';
import {ToastAndroid, Text, View, Button, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';
import { gradiantStart, gradiantEnd } from '../../styles/styleConstants';
import { loginRegisterStyle } from './loginStyle';
import { Formik } from 'formik';


import { Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import LoginFields from './loginFields';
import RegisterFields from './registerFields';
import { ScrollView } from 'react-native-gesture-handler';
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);




export default function Login({ navigation }) {


    const [isShow, setIsShow] = useState(true);

    const switchscreen = (val) => {
        setIsShow(val);
        console.log("true : " + val);
    }

return (
<TouchableWithoutFeedback onPress={() => {
  Keyboard.dismiss()
  console.log("keyboard hide")
}}>
    <AnimatedLinearGradient
    colors={[gradiantStart, gradiantEnd]}
    style={{ flex: 1 }}>
            <View style={loginRegisterStyle.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                { isShow ? <LoginFields navigation={navigation} switchscreen={switchscreen} /> :
                <RegisterFields navigation={navigation} switchscreen={switchscreen} /> }
                </ScrollView>
            </View>
    </AnimatedLinearGradient>
</TouchableWithoutFeedback>
);

}



