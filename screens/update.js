import React from 'react';
import { Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, Linking, Platform } from 'react-native';
import { globalStyle } from '../styles/globalStyle';
import * as Updates from 'expo-updates';
import * as FileSystem from 'expo-file-system';
import { useNavigation, useIsFocused } from '@react-navigation/native';
// import {shareAsync} from 'expo-sharing';
import { StatusBar } from 'expo-status-bar';
import { api_url } from '../components/constants';
import { useSelector } from 'react-redux';



const saveFile = async (uri, filename, mimetype) => {
  const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
   if (permissions.granted){
        const base64 = await FileSystem.readAsStringAsync(uri,{encoding: FileSystem.EncodingType.Base64}); 
        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype) 
        .then (async uri => {
          await FileSystem.writeAsStringAsync(uri, base64,{ encoding: FileSystem.EncodingType.Base64});
          console.log('file written: ' + uri);
          const source = { uri: uri};
          nav.navigate("ViewPdf",{item: source});
        })
        .catch(e => console.log(e))
      } else {
        console.log('file shared');
      }
}


export default function AppUpdate() {
  const data = useSelector(state => state.LoginReducer.data);
  
  const source = { uri: api_url(data.appname)+'cashbookreport?startDate=2025-01-01&endDate=2025-03-03', cache: true };
    const nav = useNavigation();

    const handlePress = (item) => {
      nav.navigate("ViewPdf",{src: source, title: "Admit card"});
    }
    const handlePressBrowser = (item) => {
      nav.navigate("ViewPdfBrowser");
    }

    async function onFetchUpdateAsync() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        alert(`Error fetching latest Expo update: ${error}`);
      }
    }

    return (
      <View style={{ justifyContent: 'center' , alignItems: 'center', flex: 1}}>
        <Text style={globalStyle.text}>Version 3.1.11 </Text>
        <TouchableOpacity style={globalStyle.item} onPress={() => onFetchUpdateAsync()}>
          <Text>Update</Text>
        </TouchableOpacity>
      </View>
    );
}


