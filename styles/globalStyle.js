import { StyleSheet } from 'react-native';


export const globalStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ebebeb',
    },
    content: {
      width: '100%',
      height: '80%',
      flex: 1,
      justifyContent: 'space-between',
  
    },
    list: {
      flex: 1,
      margin: 8
    },
    item: {
        color: '#000',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 16,
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    text:{
        color: 'green',
        fontFamily: 'Roboto',
        fontSize: 15,
    },
    statusbar:{
        height: 80,
        paddingTop: 38,
        backgroundColor: 'magenta'
    }, 
    title: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    itemThumbHolder: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10 
    },
    dashItem: {
      backgroundColor: "rgba(20,174,67, 1)",
      padding: 5,
      borderRadius: 10,
      height: 100,
      flexBasis: '45%',
      alignItems: 'center',
      justifyContent: 'center'

    },
    dashItemText: {
      color: '#fff',
      marginTop: 5
    },
    
    dashItemMember: {
      backgroundColor: "rgba(20,174,67, 1)",
      padding: 10,
      borderRadius: 10,
      height: 70,
      alignItems: 'center',
      marginTop: 5,
      justifyContent: 'center',
      width: '40%',

    },
    itemThumbHolderTop: {
      flexWrap: "wrap",
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    
    dashTimeHolder:{
      justifyContent: 'space-around',
      flexDirection: 'row',
      marginBottom: 20
      
    },
    dashTimeLabel: {
      alignItems: 'center',
    },
    dashTime: {
      fontSize: 55,
      fontWeight: '400',
      color: 'green'
    },
    itemBottomHolder: {
      alignItems: 'center',
      backgroundColor: 'white',
      height: 50
    },
    bottomPlus: {
      backgroundColor: 'green',
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      marginBottom: 30,
      position: 'absolute',
      bottom: -10
    },
    profileImageIcoHolder: {
      alignItems: 'center',
    },
    profileImageHolder: {
      height: 106,
      width: 106,
      borderWidth: 3,
      borderColor: '#ccc',
      borderRadius: 55,
    },
    profileImage: {
      height: 100,
      width: 100,
      borderRadius: 50,
    },
    imagePickerIcon: {
      position: 'absolute',
      right: -12,
      bottom: 5
    },
    noticeItemHolder: {
      marginTop: 8,
      marginRight: 8,
      marginLeft: 8,
      padding: 8,
      borderRadius: 5,
      borderColor: "#ccc",
      borderWidth: 2,
      backgroundColor: '#fff'
    },
    noticeHeader: {
      gap: 10 ,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 0
    },
    noticeItemPhoto: {
      borderRadius: 50,
      height: 60,
      width: 60,
    },
    noticetitleHolder: {
    },
    noticetextholder: {
      flex: 1
    },
    versionText:{
      color: 'green',
      fontFamily: 'Roboto',
      fontSize: 30,
  },
  loaderStyle: {
    borderRadius: 0,
    height: 30,
    width: 30,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 0
  },
  loaderOnly: {
    borderRadius: 40,
    height: 40,
    width: 40,
  },
  loaderHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  loaderSubHolder: {
    backgroundColor: '#ebebeb',
    padding: 10,
    borderRadius: 10
  },
  loader: {

  }
  
   

    
  
  });


  export const images = {
    icons: {
      '1' : require('../assets/favicon.png'),
      '2' : require('../assets/images/person.jpg'),
      'loader' : require('../assets/loader.gif'),
    }
  }