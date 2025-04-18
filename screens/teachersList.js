import React, { useEffect, useState } from 'react';
import {Image, Text, View, Button, TextInput, FlatList,StyleSheet, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, Linking } from 'react-native';
import { globalStyle, images } from '../styles/globalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { LoaderSpeen } from '../components/loaderSpeen';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { api_url } from '../components/constants';
import { getUserList } from '../redux/slices/userListSlice';
import { Avatar } from 'react-native-paper';


export default function TeachersList({route, navigation}) {
  const nList = useSelector(state => state.UserListReducer);
  const login = useSelector(state => state.LoginReducer);
  const dispatch = useDispatch();
  const nav = useNavigation();
  const data = route.params;
  
  // this is used for loading data wehen pop back screen 
  const focus = useIsFocused();

  // console.log(JSON.stringify(nList.data));
  const handlePress = (item) => {
    nav.navigate("TeachersProfile",{item: item});
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
     // dispatch(getStudentsList("/"+data.class+"/"+data.section));
      if(data){
        if(data.u == 2){
          navigation.setOptions({title: "Teachers"});
        }else if(data.u == 3){
          navigation.setOptions({title: "Stuffs"});
        }else if(data.u == 4){
          navigation.setOptions({title: "Directors"});
        }
        dispatch(getUserList(api_url(login.data.appname)+"stuffList?type="+data.u));
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
              <Text style={{ fontSize: 14, fontWeight: 'bold'}}>Desig: {item.desig}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{ fontSize: 12, fontWeight: 'bold'}}>Joning: {item.admitiondate}</Text>
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
  phone: {
  },
  icon: {

  }
  ,
  list: {
    flex: 8,
  }

  

})




