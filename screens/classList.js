import React, { useEffect, useState } from 'react';
import {Image, Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyle, images } from '../styles/globalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getClassList } from '../redux/slices/classListSlice';
import { LoaderSpeen } from '../components/loaderSpeen';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { api_url } from '../components/constants';


export default function Class({navigation}) {
  const nList = useSelector(state => state.ClassListReducer);
  const login = useSelector(state => state.LoginReducer);
  const dispatch = useDispatch();
  const nav = useNavigation();

  const focus = useIsFocused();

  const handlePress = (item) => {
    nav.navigate('ClassWiseStudentsList',{class: item.nname, section: item.same});
    console.log(item.same)
    console.log(item.nname)
  }

  useEffect(() => {
    navigation.setOptions({title: "Class list"});
    if(focus){
      dispatch(getClassList(api_url(login.data.appname)));
    }
  },[focus]);


  const ItemTemplate = ({ item, handlePress }) => {
    return(
    
      <View style={globalStyle.noticeItemHolder}>
        <View style={[globalStyle.noticeHeader,{backgroundColor: '#fff'}]}>
          <View style={[globalStyle.noticetitleHolder]}>
            <Text style={{ fontSize: 16, fontWeight: 'bold'}}>{item.name} Total: {item.total} </Text>
            </View>
            </View>
            <View style={[globalStyle.noticetextholder, {columnGap: 5, flexDirection: 'row', flex: 1, justifyContent: 'space-around',alignItems: 'flex-start'}]}>
              {item?.sections?.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => handlePress(item)} style={{flex: 1}}> 
                <View style={{backgroundColor: '#479911', alignItems: 'center', borderRadius: 5}}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', padding: 8}} >{item.same} {item.total}</Text>
                </View>
                </TouchableOpacity> 
              ))}
            </View>
      </View>
    );
  }

    return (
      <View style={globalStyle.container} >
        { !nList.isLoader ?
        <FlatList
        data={nList.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
              <ItemTemplate handlePress={handlePress} item={item} />
        )}
        /> : <LoaderSpeen />
      }    
      </View>
    );
}


