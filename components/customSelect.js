import React from 'react';
import {StyleSheet, Text, View } from 'react-native';

import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function CustomSelect({ selecteds, planList, label }) {


return (
        <SelectDropdown
            data={planList}
            onSelect={(selectedItem, index) => {
              selecteds(selectedItem.title);
              console.log(selectedItem.title, index);
            }}
            renderButton={(selectedItem, isOpened) => {
            return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem.title) || label}
                  </Text>
                  <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
            );
            }}
            renderItem={(item, index, isSelected) => {
            return (
                <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
            );
            }}
            showsVerticalScrollIndicator={true}
            dropdownStyle={styles.dropdownMenuStyle}
        />
                            
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
      borderColor: '#777',
      marginTop: 3
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 15,
      fontWeight: '500',
      color: '#777',
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
      fontSize: 15,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  });