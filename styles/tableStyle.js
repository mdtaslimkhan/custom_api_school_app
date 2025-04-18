
import { StyleSheet } from 'react-native';


export const tableStyle = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    header: { height: 40, backgroundColor: '#ebebeb' , fontSize: 13},
    text: { textAlign: 'center', fontWeight: 'bold', color: '#000' },
    bodytext: {textAlign: 'center', fontWeight: 'bold', fontSize:12 },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' },
    btn: { alignItems: 'center', justifyContent: 'center' },
    icon: {  },
    tableBorder: {borderWidth: 1, borderColor: '#000'},
    tableTopButton: {
      backgroundColor: "green",
      padding: 8,
      width: 150,
      textAlign: 'center',
      borderRadius: 7,
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold'
    },
    buttonContainer: {
      alignItems: 'center',
      marginBottom: 10
    },
    buttonContainerSecond: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20
    }
  });
  