import React, { useEffect, useState } from 'react';
import { Text, View,StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api_url } from '../../../components/constants';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import DatePicker from 'react-native-date-picker';
import { GetDateCustom, getFullDate } from '../../../components/common';




const getCurrentDate = () => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  return year + '-' + month + '-' + date;
}

export default function Cashbookreport() {
  const [startdatedp, setStartDate] = useState(new Date())
  const [enddatedp, setEndDate] = useState(new Date())
  const [openStart, setOpenStart] = useState(false)
  const [openEnd, setOpenEndDate] = useState(false)
    
  let initialdata = { enddatedp: "", startdatedp: ""}

  var year = new Date().getFullYear();
  var month = new Date().getMonth() + 1;
  var date = new Date().getDate();
  if(month < 10){
    month = '0'+month;
 }
 if(date < 10){
    date = '0'+date;
 }
  const ydate = {
    startDate: year+'-01-01',
    endDate: year+'-12-31'
  };
  const tdate = {
    startDate: year+'-01-01',
    endDate: year+'-'+month+'-'+date
  };

  useEffect(() => {

  },[data])



  const data = useSelector(state => state.LoginReducer.data);
  const nav = useNavigation();
  
  const handlePressBrowser = (odate) => {
    const source = { uri: api_url(data.appname)+'cashbookreport?startDate='+odate.startDate+'&endDate='+odate.endDate, cache: true };
    nav.navigate("ViewPdf",{src: source, title: "Receive Payment"});
    console.log(odate.startDate);
    console.log(odate.endDate);
    console.log(source);
  }

    return (
      <View style={{ justifyContent: 'center' , alignItems: 'center', flex: 1}}>
        <View>
        <Text style={styles.text}>Report till today</Text>
        <TouchableOpacity style={styles.item} onPress={() => handlePressBrowser(tdate)}>
          <Text style={styles.btn} >View</Text>
        </TouchableOpacity>
        </View>
        <View>
        <Text style={styles.text}>Report by date range</Text>
        </View>


              <Formik 
                    initialValues={initialdata}
                    onSubmit={ async (val, actions) => {
                    console.log("log from : "+JSON.stringify(val));
                    handlePressBrowser({startDate: getFullDate(startdatedp), endDate: getFullDate(enddatedp)});
                }}>
                    {(props) =>(
                        <View>
                            <View>
                              <>
                                <DatePicker
                                  modal mode='date' open={openStart} date={startdatedp}
                                  onConfirm={(date) => {
                                    setOpenStart(false)
                                    setStartDate(date)
                                    console.log("date string :" + date.getDate());
                                    props.values.startdatedp = getFullDate(date);
                                  }}
                                  onCancel={() => {
                                    setOpenStart(false)
                                  }}/>
                              </>
                            </View>
                            <View style={styles.startDate}>
                                <GetDateCustom setOpen={setOpenStart} date={startdatedp ? getFullDate(startdatedp) : 'Day'} type={'Start Date'} />
                            </View>

                            <View>
                              <>
                                <DatePicker
                                  modal mode='date' open={openEnd} date={enddatedp}
                                  onConfirm={(date) => {
                                    setOpenEndDate(false)
                                    setEndDate(date)
                                    console.log("date string :" + date.getDate());
                                    props.values.enddatedp = getFullDate(date);
                                  }}
                                  onCancel={() => {
                                    setOpenEndDate(false)
                                  }}/>
                              </>
                            </View>
                            <View style={styles.endDate}>
                                <GetDateCustom setOpen={setOpenEndDate} date={enddatedp ? getFullDate(enddatedp) : 'Day'} type={'End Date'} />
                            </View>
                            
                            <Text style={styles.text}>{getFullDate(startdatedp)} - {getFullDate(enddatedp)}</Text>

                            <TouchableOpacity 
                                onPress={props.handleSubmit}
                                style={styles.item}>
                                <Text style={styles.btn}>View report</Text>
                            </TouchableOpacity>
  
                        </View>
                    )}
                </Formik>
      </View>
    );
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 5,
  },
  item: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: '#19854c',
    padding: 5,
    marginBottom: 30,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 15
  },
  btn: {
    color: '#fff',
    width: 100,
    textAlign: 'center'
  }

});


