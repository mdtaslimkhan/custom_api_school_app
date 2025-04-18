import React, { useEffect } from 'react';
import { Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, StyleSheet, Keyboard, Linking, Platform } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
// import {shareAsync} from 'expo-sharing';
import { useDispatch, useSelector } from 'react-redux';
import { api_url } from '../../components/constants';
import { getStudentsList } from '../../redux/slices/studentsListSlice';


export default function ViewNotification({route, navigation}) {
  const data = useSelector(state => state.LoginReducer.data);
  const nav = useNavigation();
  const dispatch = useDispatch();
  const param = route.params.item;
  useEffect(() => {
    console.log(param.item);
    nav.setOptions({title: "Notification view"});
    

  },[]);

    return (
      <View style={{ alignItems: 'center', flex: 1}}>
        <Text style={styles.text}>{param.message}</Text>
      </View>
    );
}


const styles = StyleSheet.create({
  text:{
      color: 'green',
      fontFamily: 'Roboto',
      fontSize: 20,
      padding: 8
  },
});


