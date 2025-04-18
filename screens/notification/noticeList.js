import React, { useEffect, useState } from 'react';
import {Image, Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyle, images } from '../../styles/globalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getNoticeList } from '../../redux/slices/noticeListSlice';
import { LoaderSpeen } from '../../components/loaderSpeen';
import { api_url } from '../../components/constants';
import { useNavigation } from '@react-navigation/native';

export default function Notice() {
  const noticList = useSelector(state => state.NoticeListReducer);
  const login = useSelector(state => state.LoginReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handlePress = (item) => {
    navigation.navigate("ViewNotification",{item: item});
  }

  useEffect(() => {
    navigation.setOptions({title: "Notifications"});
    navigation.addListener('focus',() =>{
          dispatch(getNoticeList(api_url(login.data.appname) + "nList"));
        });
  },[]);


  const ItemTemplate = ({ item, handlePress }) => {
    return(
    <TouchableOpacity onPress={() => handlePress(item)}> 
      <View style={globalStyle.noticeItemHolder}>
        <View style={globalStyle.noticeHeader}>
          <View style={globalStyle.noticetitleHolder}>
            <Text style={{ fontSize: 16, fontWeight: 'bold'}}>Notification!</Text>
          </View>
        </View>
        <View style={globalStyle.noticetextholder}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#777'}}>{item.message}</Text>
        </View>
      </View>
    </TouchableOpacity> 
    );
  }

    return (
      <View style={globalStyle.container} >
        { !noticList.isLoader && noticList.data ?
        <FlatList
        data={noticList.data.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
              <ItemTemplate handlePress={handlePress} item={item} />
        )}
        /> : <LoaderSpeen />
      }    
      </View>
    );
}


