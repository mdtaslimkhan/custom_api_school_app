import React from 'react';
import {Text, View, TouchableOpacity, Linking } from 'react-native';
import { loginRegisterStyle } from '../screens/login/loginStyle';

const GetDateCustom = ({date, type, setOpen}) => {
    return(
      
      <View style={{width: "100%"}}>
          <Text style={loginRegisterStyle.text}>{type}</Text>
            <TouchableOpacity 
              onPress={() => setOpen(true)}>
                <Text style={loginRegisterStyle.dateinput}>{ date }</Text>
          </TouchableOpacity>
      </View>
      
    )
  }

  const getFullDate = (date) => {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if(month < 10){
       month = '0'+month;
    }
    if(day < 10){
       day = '0'+day;
    }
    return(
      date.getFullYear() + "-" + month + "-" + day
    );
  }

  const downloaddocs = (url) => {
    try {
      console.log("fired")
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      });
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest document: ${error}`);
    }
  }

  module.exports = { GetDateCustom, getFullDate, downloaddocs }