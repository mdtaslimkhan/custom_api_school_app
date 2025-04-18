import React, {useEffect, useState, Component } from 'react';
import {StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyle } from '../../styles/globalStyle';
import { loginRegisterStyle } from '../login/loginStyle';
import { Formik, Field, Form } from 'formik';
import { workSheetStyle } from './workSheetStyle';
import { ScrollView } from 'react-native-gesture-handler';
import CustomSelect from '../../components/customSelect';
import * as yup from 'yup';
import DatePicker from 'react-native-date-picker';
import { GetDateCustom } from '../../components/common';
import { LoaderSpeen } from '../../components/loaderSpeen';
import { guestDataPost } from '../../components/api';
import { useSelector } from 'react-redux';



const reviewSchema = yup.object({
  Plan: yup.string().required(),
  Presenter_Name: yup.string().required().min(4).max(30),
  Guest_Name: yup.string().required().min(4).max(30),
  address: yup.string().required().min(4).max(300),
  Mobile: yup.string().required().min(4).max(300),
});


export default function WorkSheet({route, navigation}) {
  const userProfile = useSelector(state => state.LoginReducer.data);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [isError, setError] = useState(false);
  const { data } = route.params;
 console.log(JSON.stringify(userProfile.user.id));
  

  const [isShow, setIsShow] = useState(false);

  const switchSignInReg = () => {
      setIsShow(true);
      console.log("true : " + isShow);
  }
  let initialvalue = {};

  if(data){
    initialvalue = data;
  }else{
    initialvalue = {UserId: -1, Date: date, Plan:'', Guest_Name: '',Address: '', Mobile: '',
      Comment: '', Comment_2nd: '', Comment_3rd: ''  };
  }

  useEffect(() => {
    if(data){
      navigation.setOptions({title: "Edit Work Sheet"});
    }else{
      navigation.setOptions({title: "Create a Work Item"});
    }

  },[]);

  
  const navTo = (vl) => {
    navigation.navigate(vl)
  }


  const planList = [
    {title: 'Seminar'},
    {title: 'Marketing'},
    {title: 'Follow up'},
  ];

  const presenterList = [
    {title: 'Jashim'},
    {title: 'Md Abu toha'},
    {title: 'Md Aminul'},
  ];



return (
  <View style={workSheetStyle.container}>
  { !isLoader ?
    
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

    <View style={workSheetStyle.container}>
        <View style={workSheetStyle.content}>

                <Formik 
                    initialValues={initialvalue}
                    onSubmit={async(val, actions) => {
                        if(userProfile.user != null){
                          val.UserId = userProfile.user.id;
                          val.Date = date;
                        }
                        console.log(val);
                        let vl = null;
                        setLoader(true);
                        if(data){
                          vl = await guestDataPost("updateWorkSheet", val);
                        }else{
                          vl = await guestDataPost("postWorkSheet", val);
                          console.log(val);
                        }
                       if(!vl.error){
                         setLoader(false);
                         navTo("WorkSheetList");
                       }else{
                         setError(true);
                       }
                        console.log(val);
                }}>
                    {(props) =>(
                        <View>
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
                                    props.values.Date = date;
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
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Date && props.errors.Date}</Text>
                        

                           <Text style={loginRegisterStyle.text}>Plan </Text>
                            <CustomSelect label={"Plan"} 
                            planList={planList}
                            onChangeText={props.handleChange('Plan')}
                            selecteds={(val) => props.values.Plan = val} />
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Plan && props.errors.Plan}</Text>
                            
                            <Text style={loginRegisterStyle.text}>Presenter </Text>
                            <TextInput 
                                placeholder='Presenter' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Presenter_Name')}
                                value={props.values.Presenter_Name}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Presenter_Name && props.errors.Presenter_Name}</Text>

                            <Text style={loginRegisterStyle.text}>Guest Name </Text>
                            <TextInput 
                                placeholder='Guest' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Guest_Name')}
                                value={props.values.Guest_Name}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Guest_Name && props.errors.Guest_Name}</Text>

                            <Text style={loginRegisterStyle.text}>Address </Text>
                            <TextInput 
                                placeholder='Address' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Address')}
                                value={props.values.Address}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Address && props.errors.Address}</Text>

                            <Text style={loginRegisterStyle.text}>Phone number </Text>
                            <TextInput 
                                placeholder='Phone Number' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Mobile')}
                                value={props.values.Mobile}/>
                            <Text style={loginRegisterStyle.errorText}>{props.touched.Mobile && props.errors.Mobile}</Text>
                            
                            <Text style={loginRegisterStyle.text}>Your comment </Text>
                            <TextInput 
                                placeholder='Comment' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Comment')}
                                value={props.values.Comment}/>
                            <Text style={loginRegisterStyle.errorText}></Text>

                            <Text style={loginRegisterStyle.text}>Your 2nd comment </Text>
                            <TextInput 
                                placeholder='Second Comment' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Comment_2nd')}
                                value={props.values.Comment_2nd}/>
                            <Text style={loginRegisterStyle.errorText}></Text>

                            <Text style={loginRegisterStyle.text}>Your 3rd comment </Text>
                            <TextInput 
                                placeholder='Third Comment' style={loginRegisterStyle.input}
                                onChangeText={props.handleChange('Comment_3rd')}
                                value={props.values.Comment_3rd}/>
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