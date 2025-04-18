import React, { useState, useEffect, Component } from 'react';
import {Image, StyleSheet, Text, View, Button, TextInput, FlatList, ToastAndroid, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
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
import { GetDateCustom, getFullDate } from '../components/common';
import DatePicker from 'react-native-date-picker';
import placeHoder from '../assets/favicon.png';
import {useDispatch , useSelector } from 'react-redux';
import { uploadMultipart } from '../components/api';
import { LoaderSpeen } from '../components/loaderSpeen';
import { updateUser } from '../redux/slices/loginSlice';
import { getClassList } from '../redux/slices/classListSlice';
import { getList } from '../redux/slices/getListSlice';
import { api_url } from '../components/constants';


const reviewSchema = yup.object({
  efname: yup.string().required().min(2).max(50),
  fname: yup.string().required().min(2).max(50),
  efsname: yup.string().required().min(2).max(50),
  fsname: yup.string().required().min(2).max(50),
  emsname: yup.string().required().min(2).max(50),
  msname: yup.string().required().min(2).max(50),
  pnumber: yup.number().required().min(1).max(9999999999),
  address: yup.string().max(300),
  roll: yup.number().required().min(1).max(100),
  class: yup.string().required().min(1).max(50),
  section: yup.string().required().min(1).max(50),
  gender: yup.string().required().min(2).max(20),
  bloodgroup: yup.string().required().min(1).max(10),
  address: yup.string().min(1).max(150),
});


export default function StudentAdmit({route, navigation}) {
  const user = useSelector(state => state.LoginReducer.data);
  const data = useSelector(state => state.ClassListReducer);
  const getSecList = useSelector(state => state.GetListReducer);
  let initialdata = {efname:"",fname:"",class:"",section:"",pnumber:"",roll:"",
    efsname:"",fsname:"",emsname:"",msname:"",address:"",gender:"",bloodgroup:"", address: "", extinfo: "",
    usertype: "", status: "", birthdate: "", admitiondate: ""
  }

  const [birthdate, setBirthDate] = useState(new Date())
  const [admissiondate, setAdmissionDate] = useState(new Date())
  const [openBirth, setOpenBirth] = useState(false)
  const [openAdmission, setOpenAdmission] = useState(false)
  const [image, setImage] = useState(null);
  const [image64, setImage64] = useState(null);
  const [isLoader, setLoader] = useState(false);
  const [srvPhoto, setSrvPhoto] = useState('');
  const [classList, setClassList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const dispatch = useDispatch();

  

  useEffect(() => {
    navigation.setOptions({title: "New Student Admit"});
    dispatch(getClassList(api_url(user.appname)));
    if(data.data){
        let classes = [];
        data.data.map((dt) => {
          classes.push({title: dt.name});
        });
        setClassList(classes);
        birthdate.setFullYear(birthdate.getFullYear() - 5);

    }
  },[]);

  const getSection = async (val) => {
    dispatch(getList(api_url(user.appname)+"getSection/"+val));
    let sections = [];
    if(getSecList.data){
        getSecList.data.map((v) => {
          sections.push({title: v.same});
        });
    }
    setSectionList(sections);
  }

  
  const navTo = (vl) => {
    navigation.navigate(vl)
  }
  const pickImage = async () => {
   await ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true
    });
  

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
    {title: 'male'},
    {title: 'female'},
    {title: 'other'},
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
  { !data.isLoader ? 
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

    <View style={workSheetStyle.container}>
        <View style={workSheetStyle.content}>
                          <View style={globalStyle.profileImageIcoHolder}>
                            <TouchableOpacity onPress={pickImage}>
                            <View style={globalStyle.profileImageHolder}>
                              { image ?
                              <Image source={{ uri: image }} style={globalStyle.profileImage} /> :
                              <Image source={ srvPhoto ? { uri: srvPhoto } : require('../assets/images/boy.png')} style={globalStyle.profileImage} />
                              }
                            <AntDesign style={globalStyle.imagePickerIcon} name="camera" 
                             size={34} color="green" />
                            </View>
                            </TouchableOpacity>
                          </View>

                <Formik 
                    initialValues={initialdata}
                    validationSchema={reviewSchema}
                    onSubmit={ async (val, actions) => {
                       // actions.resetForm();

                          val.photo = image64;
                          val.usertype = 1;
                          val.status = 1;
                          let vl = null;
                        setLoader(true);
                        if(user){
                          console.log("user" + user);
                          console.log("user" + JSON.stringify(val));
                          vl = await uploadMultipart(api_url(user.appname)+"poststudent", val);
                        }
                        if(!vl.data.error){
                          setLoader(false);
                          ToastAndroid.show('Success: '+vl.data.msg, ToastAndroid.SHORT);
                        }else{
                          ToastAndroid.show('Failed: '+vl.data.msg, ToastAndroid.SHORT);
                        }
                        console.log("log from : "+JSON.stringify(val));

                }}>
                    {(props) =>(
                        <View><Text style={loginRegisterStyle.text}>Name </Text>
                        <TextInput 
                            placeholder='Students Name ' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('efname')}
                            value={props.values.efname}/>
                        <Text style={loginRegisterStyle.errorText}>{props.touched.efname && props.errors.efname}</Text>

                        <Text style={loginRegisterStyle.text}>Name Bangla</Text>
                        <TextInput 
                            placeholder='Students Name Bangla' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('fname')}
                            value={props.values.fname}/>
                        <Text style={loginRegisterStyle.errorText}>{props.touched.fname && props.errors.fname}</Text>

                        <Text style={loginRegisterStyle.text}>Class List </Text>
                            <CustomSelect label={"Class List"} 
                            planList={classList} 
                            selecteds={(val) => { 
                              props.values.class = val;
                              getSection(val);
                            }} />
                            <Text style={loginRegisterStyle.errorText}>{props.touched.class && props.errors.class}</Text>

                        <Text style={loginRegisterStyle.text}>Section</Text>
                            <CustomSelect label={"Section"} 
                            planList={sectionList}
                            disabled={true}
                            selecteds={(val) => props.values.section = val}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.section && props.errors.section}</Text>

                        <Text style={loginRegisterStyle.text}>Class Roll</Text>
                        <TextInput 
                            placeholder='Class Roll' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('roll')}
                            keyboardType='numeric'
                            value={props.values.roll}/>
                        <Text style={loginRegisterStyle.errorText}>{props.touched.roll && props.errors.roll}</Text>
     
                        <Text style={loginRegisterStyle.text}>Fathers Name English </Text>
                        <TextInput 
                            placeholder='Fathers Name English' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('efsname')}
                            value={props.values.efsname}/>
                        <Text style={loginRegisterStyle.errorText}>{props.touched.efsname && props.errors.efsname}</Text>

                        <Text style={loginRegisterStyle.text}>Fathers Name Bangla </Text>
                        <TextInput 
                            placeholder='Fathers Name Bangla ' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('fsname')}
                            value={props.values.fsname}/>
                        <Text style={loginRegisterStyle.errorText}>{props.touched.fsname && props.errors.fsname}</Text>
                        
     
                        <Text style={loginRegisterStyle.text}>Mothers Name English</Text>
                        <TextInput 
                            placeholder='Mothers Name English' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('emsname')}
                            value={props.values.emsname}/>
                        <Text style={loginRegisterStyle.errorText}>{props.touched.emsname && props.errors.emsname}</Text>

                        <Text style={loginRegisterStyle.text}>Mothers Name Bangla </Text>
                        <TextInput 
                            placeholder='Mothers Name Bangla' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('msname')}
                            value={props.values.msname}/>
                        <Text style={loginRegisterStyle.errorText}>{props.touched.msname && props.errors.msname}</Text>

                        <Text style={loginRegisterStyle.text}>Phone Number</Text>
                        <TextInput 
                            placeholder='Phone number' style={loginRegisterStyle.input}
                            onChangeText={props.handleChange('pnumber')}
                            keyboardType='numeric'
                            value={props.values.pnumber}/>
                        <Text style={loginRegisterStyle.errorText}>{props.touched.pnumber && props.errors.pnumber}</Text>

                            <View>
                              <>
                                <DatePicker
                                  modal mode='date' open={openAdmission} date={admissiondate}
                                  onConfirm={(date) => {
                                    setOpenAdmission(false)
                                    setAdmissionDate(date)
                                    console.log("date string :" + date.getDate());
                                    props.values.admitiondate = getFullDate(admissiondate);
                                  }}
                                  onCancel={() => {
                                    setOpenAdmission(false)
                                  }}/>
                              </>
                            </View>
                            <View style={workSheetStyle.monthDateHolder}>
                                <GetDateCustom setOpen={setOpenAdmission} date={admissiondate ? getFullDate(admissiondate) : 'Day'} type={'Admission Date'} />
                            </View>

                            <View>
                              <>
                                <DatePicker
                                  modal mode='date' open={openBirth} date={birthdate}
                                  onConfirm={(date) => {
                                    setOpenBirth(false)
                                    setBirthDate(date)
                                    console.log("date string :" + date.getDate());
                                    props.values.birthdate = getFullDate(date);
                                  }}
                                  onCancel={() => {
                                    setOpenBirth(false)
                                  }}/>
                              </>
                            </View>
                            <View style={workSheetStyle.monthDateHolder}>
                                <GetDateCustom setOpen={setOpenBirth} date={birthdate ? getFullDate(birthdate) : 'Day'} type={'Birth Date'} />
                            </View>
                            
                            <Text style={loginRegisterStyle.text}>Gender </Text>
                            <CustomSelect label={"Gender"} 
                            planList={GenderList} 
                            selecteds={(val) => props.values.gender = val} />
                            <Text style={loginRegisterStyle.errorText}>{props.touched.gender && props.errors.gender}</Text>
                            
                            <Text style={loginRegisterStyle.text}>Blood Group </Text>
                            <CustomSelect label={"Blood Group"} 
                            planList={BloodGroupList} 
                            selecteds={(val) => props.values.bloodgroup = val} />
                            <Text style={loginRegisterStyle.errorText}>{props.touched.bloodgroup && props.errors.bloodgroup}</Text>

                            <Text style={loginRegisterStyle.text}>Address </Text>
                              <TextInput 
                                  placeholder='Enter Your Address' style={loginRegisterStyle.input}
                                  onChangeText={props.handleChange('address')}
                                  value={props.values.address}/>
                              <Text style={loginRegisterStyle.errorText}>{props.touched.address && props.errors.address}</Text>

                            <Text style={loginRegisterStyle.text}>Extra info </Text>
                              <TextInput 
                                  placeholder='Extra info' style={loginRegisterStyle.input}
                                  onChangeText={props.handleChange('extinfo')}
                                  value={props.values.extinfo}/>
                              <Text style={loginRegisterStyle.errorText}>{props.touched.extinfo && props.errors.extinfo}</Text>
                                  
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