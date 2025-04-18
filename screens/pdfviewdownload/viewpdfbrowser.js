import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from "react-native-webview";



export default function ViewPdfBrowser({route, navigation}) {
  const data = route.params;

  useEffect(() => {
    if(data){
      navigation.setOptions({title: data.title});
      console.log(data.src.uri);
    }
},[]);

    return (
       <View style={styles.container}>
        <View >
          <Text style={styles.label}>Downloaded</Text>
          <Text style={styles.subhead}>Please check notification</Text>
        </View>
        
      <WebView
        source={{
          uri: data.src.uri,
        }}
      />
      </View>
    );
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 25,
  },
  label: {
    fontSize: 30
  },
  subhead: {
    textAlign: 'center',
  },
  head: {
    textAlign: 'center',
    fontSize: 20
  },
});

