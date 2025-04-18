import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import Pdf from 'react-native-pdf';


export default function ViewPdf ({route, navigation}) {
  const data = route.params;

   useEffect(() => {
        if(data){
          navigation.setOptions({title: data.title, headerRight: () => {
            return(
              <TouchableOpacity
              style={{padding: 13,marginRight: -13}}
              onPress={() => navigation.navigate("ViewPdfBrowser", {src: data.src, title: data.title})}
              >
            <AntDesign 
            name="download" 
            size={24} 
            color="white" /></TouchableOpacity>
            );
          }});
        }
    },[]);

    return (
      <View style={styles.container}>
        <Pdf
            trustAllCerts={false}
            source={data.src}
            onLoadComplete={(numberOfPages,filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page,numberOfPages) => {
                console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
                console.log(error);
            }}
            onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}/>
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
  pdf: {
      flex:1,
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
  }
});
