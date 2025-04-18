import { StyleSheet } from 'react-native';


export const workSheetStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 16,
    justifyContent: 'center',
  },
  monthDateHolder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    color: '#f00',
    fontWeight: 'bold',
    marginTop: 0
  }
  
  });