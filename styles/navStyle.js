import { StyleSheet } from 'react-native';


export const navStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ebebeb',
    },
    content: {
      padding: 20,  
      width: '100%',
      height: '80%',
      flex: 1
  
    },
    item: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 16,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    infoHolder: {
      backgroundColor: 'green',
      padding: 5,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      margin: 16
    },
    infoTextHolder: {
      justifyContent: 'center',
      flex: 1,
    },
    userImage: {
      margin: 5,
    },
    drawBottomSection: {
      borderTopWidth: 2,
      borderColor: '#ccc',

    },
    text:{
      color: '#fff',
      fontFamily: 'Roboto',
      fontSize: 15,
      fontWeight: 'bold'
    },
    subText:{
      color: '#fff',
      fontFamily: 'Roboto',
      fontSize: 10,
      fontWeight: 'bold'
    },

    
    
  
  });