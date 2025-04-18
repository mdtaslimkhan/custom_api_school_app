import React, { useState, useEffect, Component } from 'react';
import {Image, StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyle } from '../styles/globalStyle';
import { loginRegisterStyle } from './login/loginStyle'; 
import { Formik, Field, Form } from 'formik';
import { workSheetStyle } from './worksheet/workSheetStyle';
import { ScrollView } from 'react-native-gesture-handler';
import CustomSelect from '../components/customSelect';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { GetDateCustom } from './../components/common';
import DatePicker from 'react-native-date-picker';
import placeHoder from '../assets/favicon.png';
import {useDispatch , useSelector } from 'react-redux';
import { uploadMultipart } from '../components/api';
import { LoaderSpeen } from '../components/loaderSpeen';
import { updateUser } from '../redux/slices/loginSlice';

const reviewSchema = yup.object({
  Name: yup.string().required().min(4).max(30),
  Desig: yup.string().required().min(1).max(50),
  Phone: yup.string().required().min(1).max(50),
  Email: yup.string().required().min(5).max(50),
  Nid_no: yup.string().required().min(5).max(30),
  Address: yup.string().max(300),
  Gender: yup.string().required(),
  Blood_group: yup.string().required(),
});


export default function Profile({route, navigation}) {
  let loggedUser = {};
  const data = useSelector(state => state.LoginReducer.data);
  loggedUser = data ? data.user : {};

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState(null);
  const [image64, setImage64] = useState(null);
  const [isLoader, setLoader] = useState(false);
  const [srvPhoto, setSrvPhoto] = useState('');
  const dispatch = useDispatch();

  let initialdata = {};
  if(loggedUser){
    initialdata = loggedUser;
  }else{
    initialdata = {Name: '',Desig: '', Phone: '',
      Email: '',Photo: '', Nid_no: '' , Address: '', Birth_date: '',
      Gender: '', Blood_group: ''};
  }


  useEffect(() => {
    if(data){
      navigation.setOptions({title: "User Profile"});
      setSrvPhoto(JSON.stringify(data.user.Photo));
    }
  },[]);

  
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
   await ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true
    });

  //  console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImage64(result.assets[0].base64);
    }
  };



  const [isShow, setIsShow] = useState(false);

  const switchSignInReg = () => {
      setIsShow(true);
      console.log("true : " + isShow);
  }

  const GenderList = [
    {title: 'Male'},
    {title: 'Female'},
    {title: 'Other'},
  ];

  const BloodGroupList = [
    {title: 'A+'},
    {title: 'B+'},
    {title: 'O+'},
    {title: 'AB+'},
    {title: 'B-'},
    {title: 'O-'},
    {title: 'AB-'},
    {title: 'A-'},
  ];

  


return (
  <View style={workSheetStyle.container}>
  { !isLoader ? 
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

    <View style={workSheetStyle.container}>
        <View style={workSheetStyle.content}>
                          <View style={globalStyle.profileImageIcoHolder}>
                            <View style={globalStyle.profileImageHolder}>
                              { image ?
                              <Image source={{ uri: image }} style={globalStyle.profileImage} /> :
                              <Image source={ srvPhoto ? { uri: srvPhoto } : require('../assets/images/person.jpg')} style={globalStyle.profileImage} />
                              }
                            <AntDesign style={globalStyle.imagePickerIcon} name="camera" 
                            onPress={pickImage} size={34} color="green" />
                            </View>
                          </View>

                <Formik 
                    initialValues={loggedUser}
                    validationSchema={reviewSchema}
                    onSubmit={ async (val, actions) => {
                        if(loggedUser.user != null){
                          val.UserId = loggedUser.user.id;
                        }
                          val.photo = image64;
                          let vl = null;
                          setLoader(true);
                          dispatch(updateUser(val));
                          setLoader(false);
                          navTo("Dashboard");

                }}>
                    {(props) =>(
                        <View>

                          

                            <Text style={loginRegisterStyle.text}>Your Name </Text>
                            <TextInput 
                                placeholder='Enter Your Name ' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Name')}
                                value={props.values.Name}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Name && props.errors.Name}</Text>
                            
                            <Text style={loginRegisterStyle.text}>Member ID </Text>
                            <TextInput 
                                placeholder='Member ID ' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('id')}
                                value={props.values.id}/>
                            <Text style={loginRegisterStyle.errorText}></Text>

                            <Text style={loginRegisterStyle.text}>Your Designation </Text>
                            <TextInput 
                                placeholder='Your Designation ' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Desig')}
                                value={props.values.Desig}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Desig && props.errors.Desig}</Text>

                            <Text style={loginRegisterStyle.text}>Your Phone Number </Text>
                            <TextInput 
                                placeholder='Your Phone Number' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Phone')}
                                keyboardType='number-pad'
                                value={props.values.Phone}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Phone && props.errors.Phone}</Text>
                            
                            <Text style={loginRegisterStyle.text}>Email </Text>
                            <TextInput 
                                placeholder='Email' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Email')}
                                value={props.values.Email}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Email && props.errors.Email}</Text>
                            
                            <Text style={loginRegisterStyle.text}>NID/Birth Certificate </Text>
                            <TextInput 
                                placeholder='NID/Birth Certificate' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Nid_no')}
                                keyboardType='number-pad'
                                value={props.values.Nid_no}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Nid_no && props.errors.Nid_no}</Text>
                            
                            <Text style={loginRegisterStyle.text}>Your Address </Text>
                            <TextInput 
                                placeholder='Enter Your Address' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Address')}
                                value={props.values.Address}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Address && props.errors.Address}</Text>
                            
                            <View>
                              <>
                                <DatePicker
                                  modal
                                  mode='date'
                                  open={open}
                                  date={date}
                                  onConfirm={(date) => {
                                    setOpen(false)
                                    setDate(date)
                                    console.log("date string :" + date.getDay());
                                    props.values.Birth_date = date;
                                  }}
                                  onCancel={() => {
                                    setOpen(false)
                                  }}
                                />
                              </>
                            </View>
                            <View style={workSheetStyle.monthDateHolder}>
                                <GetDateCustom setOpen={setOpen} date={date ? date.getDay() : 'Day'} type={'Day'} />
                                <GetDateCustom setOpen={setOpen} date={date ? date.getMonth() : 'Month'} type={'Month'} />
                                <GetDateCustom setOpen={setOpen} date={date ? date.getFullYear() : 'Year'} type={'Year'} />
                            </View>
                            
                            <Text style={loginRegisterStyle.text}>Gender </Text>
                            <CustomSelect label={"Gender"} 
                            planList={GenderList} 
                            selecteds={(val) => props.values.Gender = val} />
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Gender && props.errors.Gender}</Text>
                            
                            <Text style={loginRegisterStyle.text}>Blood Group </Text>
                            <CustomSelect label={"Blood Group"} 
                            planList={BloodGroupList} 
                            selecteds={(val) => props.values.Blood_group = val} />
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Blood_group && props.errors.Blood_group}</Text>
                            
                            <TouchableOpacity 
                                onPress={props.handleSubmit}
                                style={loginRegisterStyle.buttonSubmit}>
                                <Text style={loginRegisterStyle.customButtonTopText}>Post Now</Text>
                            </TouchableOpacity>
  
                        </View>
                    )}
                </Formik>        
        </View>
  </View>
  </ScrollView> : <LoaderSpeen />
  }      
  </View>
);


}


const styles = StyleSheet.create({
    dropdownButtonStyle: {
      width: '100%',
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: '#000'
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#fff',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  });