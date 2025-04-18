import React, { useState, useEffect, Component } from 'react';
import {Image, StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyle } from '../styles/globalStyle';
import { loginRegisterStyle } from './login/loginStyle'; 
import { Formik, Field, Form } from 'formik';
import { workSheetStyle } from './worksheet/workSheetStyle';
import { ScrollView } from 'react-native-gesture-handler';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import {useDispatch , useSelector } from 'react-redux';
import { LoaderSpeen } from '../components/loaderSpeen';
import { updateStudent } from '../redux/slices/loginSlice';
import { useNavigation } from '@react-navigation/native';
import { api_url } from '../components/constants';


const reviewSchema = yup.object({
  efname: yup.string().required().min(2).max(50),
  fname: yup.string().required().min(2).max(50),
  efsname: yup.string().required().min(2).max(50),
  fsname: yup.string().required().min(2).max(50),
  emsname: yup.string().required().min(2).max(50),
  msname: yup.string().required().min(2).max(50),
  pnumber: yup.string().required().min(1).max(15),
  address: yup.string().max(300),
});


export default function TeachersProfile({route, navigation}) {
  const login = useSelector(state => state.LoginReducer);

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState(null);
  const [image64, setImage64] = useState(null);
  const [isLoader, setLoader] = useState(false);
  const [srvPhoto, setSrvPhoto] = useState('');
  const params = route.params;
  const dispatch = useDispatch();
  const nav = useNavigation();

  let initialdata = {};
  if(params){
    initialdata = {
      'efname': params.item.efname,
      'fname': params.item.fname,
      'efsname': params.item.efsname,
      'fsname': params.item.fsname,
      'emsname': params.item.emsname,
      'msname': params.item.msname,
      'pnumber': params.item.pnumber,
      'birthdate': params.item.birthdate,
      'admitiondate': params.item.admitiondate,
      'gender': params.item.gender,
      'bloodgroup': params.item.bloodgroup,
      'address': params.item.address,
      'utype': params.item.userType,
    }
  }


  useEffect(() => {
    if(params){
      navigation.setOptions({title: ""+params.item.efname});
      setSrvPhoto(params.item.image);
    }
  },[]);

  
  const pickImage = async () => {
   await ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
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
                            <TouchableOpacity onPress={pickImage}>
                              { image ?
                              <Image source={{ uri: image }} style={globalStyle.profileImage} /> :
                              <Image source={ srvPhoto ? { uri: srvPhoto } : require('../assets/images/boy.png')} style={globalStyle.profileImage} />
                              }
                            <AntDesign style={globalStyle.imagePickerIcon} name="camera" 
                            size={34} color="green" />
                            </TouchableOpacity>
                            </View>
                          </View>

                <Formik 
                    initialValues={initialdata}
                    validationSchema={reviewSchema}
                    onSubmit={ async (val, actions) => {
                          val.photo = image64;
                          val.id = params.item.id;
                          let vl = null;
                          setLoader(true);
                          dispatch(updateStudent({aurl: api_url(login.data.appname) + "updatestudent",data: val}));
                          setLoader(false);
                          nav.navigate("TeachersList", {u: initialdata.utype});
                }}>
                    {(props) =>(
                        <View>
                            <Text style={loginRegisterStyle.text}>Name </Text>
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

                          
         
                            <Text style={loginRegisterStyle.text}>Fathers Name </Text>
                            <TextInput 
                                placeholder='Fathers Name ' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('efsname')}
                                value={props.values.efsname}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.efsname && props.errors.efsname}</Text>

                            <Text style={loginRegisterStyle.text}>Fathers Name Bangla </Text>
                            <TextInput 
                                placeholder='Fathers Name Bangla ' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('fsname')}
                                value={props.values.fsname}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.fsname && props.errors.fsname}</Text>
                            
         
                            <Text style={loginRegisterStyle.text}>Mothers Name </Text>
                            <TextInput 
                                placeholder='Mothers Name ' style={loginRegisterStyle.input}
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
                                value={props.values.pnumber}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.pnumber && props.errors.pnumber}</Text>

                            <Text style={loginRegisterStyle.text}>Date of Birth </Text>
                            <TextInput 
                                placeholder='Birth date' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('birthdate')}
                                value={props.values.birthdate}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.birthdate && props.errors.birthdate}</Text>

                            <Text style={loginRegisterStyle.text}>Joning Date </Text>
                            <TextInput 
                                placeholder='Admission date' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('admitiondate')}
                                value={props.values.admitiondate}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.admitiondate && props.errors.admitiondate}</Text>

                            <Text style={loginRegisterStyle.text}>Address </Text>
                            <TextInput 
                                placeholder='Enter Your Address' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('address')}
                                value={props.values.address}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.address && props.errors.address}</Text>
                            
                            
                            <TouchableOpacity 
                                onPress={props.handleSubmit}
                                style={loginRegisterStyle.buttonSubmit}>
                                <Text style={loginRegisterStyle.customButtonTopText}>Save</Text>
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