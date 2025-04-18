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
import axios from 'axios';
import { useSelector } from 'react-redux';
import { uploadMultipart } from '../components/api';
import { LoaderSpeen } from '../components/loaderSpeen';
import { User } from '../components/user';



const reviewSchema = yup.object({
  title: yup.string().required().min(4).max(100),
  descrip: yup.string().min(1).max(50),
});


export default function FileSubmit({ navigation }) {

  const data = useSelector(state => state.LoginReducer.data);
  const [user, setUser] = useState(User);
  const [image, setImage] = useState(null);
  const [image64, setImage64] = useState(null);
  const [isLoader, setLoader] = useState(false);

  let initialdata = {title: '',descrip: '', photo: '', UserId: ''};

  useEffect(() => {
    if(data){
      navigation.setOptions({title: "Help and support"});
      setUser(data.user);
    }
  },[data]);

  const pickImage = async () => {
   await ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImage64(result.assets[0].base64);
    }
  };

  const navTo = (vl) => {
    navigation.navigate(vl)
  }


return (
  <View style={workSheetStyle.container}>
  { !isLoader ? <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

    <View style={workSheetStyle.container}>
        <View style={workSheetStyle.content}>

                <Formik 
                    initialValues={initialdata}
                    validationSchema={reviewSchema}
                    onSubmit={ async(val, actions) => {
                        if(user != null){
                          val.UserId = user.id;
                        }
                        val.photo = image64;
                        let vl = null;
                        setLoader(true);
                        if(data){
                          vl = await uploadMultipart("postFileSubmit", val);
                        }
                       if(!vl.error){
                         setLoader(false);
                         navTo("Dashboard");
                       }else{
                         setError(true);
                       }
                }}>
                    {(props) =>(
                        <View>

                          <View style={globalStyle.profileImageIcoHolder}>
                            <View style={globalStyle.profileImageHolder}>
                              { image ?
                              <Image source={{ uri: image }} style={globalStyle.profileImage} /> :
                              <Image source={ require('../assets/images/person.jpg')} style={globalStyle.profileImage} />
                              }
                            <AntDesign style={globalStyle.imagePickerIcon} name="camera" 
                            onPress={pickImage} size={34} color="green" />
                            </View>
                          </View>

                            <Text style={loginRegisterStyle.text}>Title</Text>
                            <TextInput 
                                placeholder='Title ' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('title')}
                                value={props.values.title}/>
                            <Text style={loginRegisterStyle.title}>{props.touched.title && props.errors.title}</Text>
                            
                            <Text style={loginRegisterStyle.text}>Description </Text>
                            <TextInput 
                                placeholder='Description' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('descrip')}
                                value={props.values.descrip}/>
                            <Text style={loginRegisterStyle.errorText}></Text>

                            
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