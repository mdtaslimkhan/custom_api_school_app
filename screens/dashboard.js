import React, {useEffect, useState , useRef} from 'react';
import {Modal,Checkbox , Text, View, Button, TextInput, FlatList, StyleSheet, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyle } from '../styles/globalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation , DrawerActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import { api_url } from '../components/constants';
import { getDash } from '../redux/slices/dashSlice';

export default function Dashboard({ navigation }) {
  const data = useSelector(state => state.LoginReducer.data);
  const dash = useSelector(state => state.DashReducer.data);
  const dispatch = useDispatch();
  const [modalShow, setModal] = useState(false);
  
  console.log("dash: "+JSON.stringify(dash));
  useEffect(() => {

    navigation.setOptions({title: "Dashboard"});
    navigation.addListener('focus',() =>{
      console.log('prefocused');
      dispatch(getDash(api_url(data.appname)+"dashInfo"));
      console.log('focused');
    });
    
    if(data){
      if(data.user){
        console.log("hello data: "+JSON.stringify(data.user.name));
      }else{
        console.log("logout user");
        navigation.dispatch(DrawerActions.closeDrawer());
        navigation.replace("Login")
      }
    }

  },[data])



  
const val = [
  { label: 'Students', id: 4, to: 'Class', param: ''},
  { label: 'Student Admit', id: 6, to: 'StudentAdmit', param: ''},
  { label: 'Teachers', id: 7, to: 'TeachersList', param: 2},
  { label: 'Stuff', id: 8, to: 'TeachersList', param: 3},
  { label: 'Directors', id: 9, to: 'TeachersList', param: 4},
  { label: 'Notice', id: 10, to: 'Notice', param: ''},
  { label: 'Update', id: 11, to: 'Update', param: ''},
  { label: 'Help & Support', id: 12, to: 'FileSubmit', param: ''},

];

const nav = useNavigation();
const navto = (item) => {
  nav.navigate(item.to,{u: item.param});
}

const DashItemLayout = ({item, handlePress}) => {
     return(
      <TouchableOpacity onPress={() => handlePress(item)} style={style.item}>
          <AntDesign name="Safety" size={30} color="#fff" />
          <Text style={globalStyle.dashItemText}>{item.label}</Text>
      </TouchableOpacity>
     )
}

const navToPage = (item) => {
  nav.navigate(item.to,{u: item.param});
}



const handlePress = () => {
  console.log("hello ");
  Alert.alert('New post create now', 'your post create content', [
    {text: 'Ok', onPress: () => {
      console.log('hello bd');
    }}
  ]);
}





const Modalviewobject = () => {
      return (
      <Modal 
      visible={modalShow}
      transparent={true}
      >
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, .6)'}}>
          <View style={{ backgroundColor: '#fff', width: '80%',paddingBottom: 20, borderRadius: 10}}>
            <AntDesign style={{textAlign: 'right', padding: 16}} name="close" size={26} color="#000" onPress={() => {setModal(false)}} />
            <Text style={{ textAlign: 'center', marginBottom: 10, fontWeight: 'bold', fontSize: 15 }}>New Post Create Now</Text>
            <NavigatePageItem page={'Help and support'} handleNavigate={'FileSubmit'} />
        </View>
        </View>
      </Modal>
      )
}

const NavigatePageItem = ({ page, handleNavigate }) => {
  return (
    <TouchableOpacity onPress={() => {
      setModal(false)
      navigation.navigate(handleNavigate, {data: null})
      }}>
      <View style={{ backgroundColor: '#fff', padding: 16, borderWidth: 1, borderColor: '#ebebeb',width: '100%' }}>
      <Text>{page}</Text>
      </View>
    </TouchableOpacity>
  )
}

return (
<TouchableWithoutFeedback onPress={() => {
  Keyboard.dismiss()
  console.log("keyboard hide")
}}>
<View style={globalStyle.container}>
  <Modalviewobject />
  <View style={style.content}>
        <View style={style.topHolder}>
          <View style={style.itemTopHolder}>
            <View  style={[style.logo]}>
              <Avatar.Image
                source={ data.info ? { uri: data.info.mes_photo_id } : require('../assets/images/sir.png')}
                size={50}
                /> 
            </View>
            <View style={style.title}>
              <Text style={{fontSize: 18, marginTop: 0, fontWeight: 'bold', color: 'green'}}>{data.info.etitle}</Text>
              <Text style={{fontSize: 10, marginTop: 0, fontWeight: 'bold'}}>{data.info.eaddress}
              </Text>
            </View>
            
          </View>
          <View style={style.lbitemholder} >
            <View style={style.lbitem}>
            <TouchableOpacity onPress={() => navToPage({'to': 'Class', 'param' : ''})} style={{'alignItems' : 'center'}}>
              <Text style={style.tvalue}>{dash ? dash.students : 0}</Text>
              <Text style={style.label}>Students</Text>
              </TouchableOpacity>
            </View>
            <View style={style.lbitem}>
              <Text style={style.tvalue}>{dash ? dash.pending : 0}</Text>
              <Text style={style.label}>Pending</Text>
            </View>
            <View style={style.lbitem}>
            <TouchableOpacity onPress={() => navToPage({'to': 'TeachersList', 'param' : 2})} style={{'alignItems' : 'center'}}>
              <Text style={style.tvalue}>{dash ? dash.teacher : 0}</Text>
              <Text style={style.label}>Teachers</Text>
              </TouchableOpacity>
            </View>
            <View style={style.lbitem}>
            <TouchableOpacity onPress={() => navToPage({'to': 'TeachersList', 'param' : 3})} style={{'alignItems' : 'center'}}>
              <Text style={style.tvalue}>{dash ? dash.stuff : 0}</Text>
              <Text style={style.label}>Stuffs</Text>
              </TouchableOpacity>
            </View>
            <View style={style.lbitem}>
            <TouchableOpacity onPress={() => navToPage({'to': 'Notice', 'param' : ''})} style={{'alignItems' : 'center'}}>
              <Text style={style.tvalue}>{dash ? dash.notification : 0}</Text>
              <Text style={style.label}>Notification</Text>
              </TouchableOpacity>
            </View>
            <View style={style.lbitem}>
              <Text style={style.tvalue}>{dash ? dash.attention : 0}</Text>
              <Text style={style.label}>Attention!</Text>
            </View> 
          </View>
        </View>
        
          <FlatList
          style={style.flist}
          data={val}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
                <DashItemLayout handlePress={navto} item={item} />
          )}
          numColumns={2}
          />

        <View style={globalStyle.itemBottomHolder}>
          
          <TouchableOpacity onPress={() => setModal(true)} style={globalStyle.bottomPlus}>
          <AntDesign name="plus" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
  </View>
 

</View>
</TouchableWithoutFeedback>
);

}



const style = StyleSheet.create({
  content: {
    width: '100%',
    height: '80%',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  flist: {
    padding: 8,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 0,
  },
  list: {
    flex: 8,
  },

  item: {
    backgroundColor: "rgba(20,174,67, 1)",
    borderRadius: 10,
    height: 80,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 5,
  },
  tvalue:{
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green'
  },
  topHolder:{
    paddingTop: 8
  },

  itemTopHolder:{
    flexDirection: 'row',
    paddingBottom: 0,
  },
  logo:{
    flex: 1,
    marginLeft:10,
  },
  title: {
    flex: 6,
    paddingRight: 10,
    paddingLeft: 10,
  },
  lbitemholder: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  lbitem:{
    width: '30%',
    borderRadius: 5,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: 'bold',
    margin: 5,    
  },
  label:{
    fontSize: 12
  }



  

})




