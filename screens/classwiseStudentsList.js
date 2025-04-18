import React, { useEffect, useState } from 'react';
import {Image, Text, View, Button, TextInput, FlatList,StyleSheet, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, Linking } from 'react-native';
import { globalStyle, images } from '../styles/globalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentsList } from '../redux/slices/studentsListSlice';
import { LoaderSpeen } from '../components/loaderSpeen';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { api_url } from '../components/constants';
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';

export default function ClassWiseStudentsList({route, navigation}) {
  const nList = useSelector(state => state.StudentsListReducer);
  const login = useSelector(state => state.LoginReducer);
  const dispatch = useDispatch();
  const data = route.params;
  const nav = useNavigation();

  const focus = useIsFocused();
  const handlePress = (item) => {
    nav.navigate("StudentProfile",{item: item});
  }
  const whatsapp = (item) => {
    console.log(item.pnumber);
    Linking.openURL(`whatsapp://send?text=Assalamualaikum&phone=+88${item.pnumber}`);
    console.log('whatsapp://send?text=Assalamualaikum&phone='+item.pnumber);

  }
  const phone = (item) => {
    console.log(item.pnumber);
    Linking.openURL(`tel:${item.pnumber}`)
  }

  useEffect(() => {
      if(data){
        navigation.setOptions({title: "Class: "+data.class + "; Section: "+data.section});
        navigation.addListener('focus',() =>{
          dispatch(getStudentsList({url: api_url(login.data.appname), param: "/"+data.class+"/"+data.section}));
        });
      }
  },[]);


  const ItemTemplate = ({ item, handlePress }) => {
    return(
      <View style={style.itemholder}>
        <TouchableOpacity onPress={() => handlePress(item)} style={style.list}> 
        <View style={globalStyle.noticeHeader}>
          <Image style={globalStyle.noticeItemPhoto} source={{uri: item.image}} />
          <View style={globalStyle.noticetitleHolder}>
            <Text style={{ fontSize: 15, fontWeight: 'bold'}}>{item.efname}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{ fontSize: 14, fontWeight: 'bold'}}>{item.class};</Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold'}}> {item.section} </Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold'}}>; Roll: {item.roll} </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{ fontSize: 12, fontWeight: 'bold'}}>{item.efsname};</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{ fontSize: 12, fontWeight: 'bold'}}>{item.emsname} </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{ fontSize: 14, fontWeight: 'bold'}}>Cell: {item.pnumber} </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View style={style.actions}>
      <TouchableOpacity onPress={() => whatsapp(item)} style={style.whatsapp}>
        <View>
        <Avatar.Image
                style={[style.icon]}
                source={ require('../assets/icons/wa.png')}
                size={30}
                />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => phone(item)} style={style.phone}>
        <View>
        <Avatar.Image
                style={[style.icon]}
                source={ require('../assets/icons/phone.png')}
                size={30}
                />
        </View>
      </TouchableOpacity>
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

const style = StyleSheet.create({
  itemholder: {
    marginTop: 8,
    marginRight: 8,
    marginLeft: 8,
    padding: 8,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 2,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  actions: {
    marginRight: 8,
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  whatsapp: {
    marginBottom: 15,
  },
  list: {
    flex: 8,
  }

  

})


