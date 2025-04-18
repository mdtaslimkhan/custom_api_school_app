import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { globalStyle } from '../styles/globalStyle';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated } from "react-native";
import { gradiantEnd, gradiantStart, navgradiantEnd, navgradiantStart } from '../styles/styleConstants';
import { navStyle } from '../styles/navStyle';
import { useDispatch, useSelector } from 'react-redux';
import { User } from './user';
import { logOut } from '../redux/slices/loginSlice';


const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const nav = [
    {icon: 'windowso', label: 'Dashboard', navigateTo: 'Dashboard'},
    {icon: 'Safety', label: 'Students', navigateTo: 'Class'},
    {icon: 'Safety', label: 'Receive Payment', navigateTo: 'Cashbookreport'},
    {icon: 'Safety', label: 'Update', navigateTo: 'Update'},
    // {icon: 'Safety', label: 'Profile', navigateTo: 'Profile'},
    // {icon: 'Safety', label: 'Help and support', navigateTo: 'FileSubmit'},
];



const DrawerLayout = ({icon, label, navigateTo}) => {
    const navigation = useNavigation();
    return(
        <DrawerItem
            icon={({color, size}) => <AntDesign name={icon} size={size} color="green" />}
            label={label}
            onPress={() => navigation.navigate(navigateTo)}
        />
    );
}

const DrawerItems = props => {
    return nav.map((el, i) => {
        return <DrawerLayout
        key={i}
        icon={el.icon}
        label={el.label}
        navigateTo={el.navigateTo}
         />
    })
}

export default function DrawerContentCustom({ props }){
    const [user, setUser] = useState(User);
    const [userPhoto, setPhoto] = useState('../assets/favicon.png');
    const data = useSelector(state => state.LoginReducer.data);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    useEffect(() => {
        if(data != null && data.user != null){
            setUser(data.user);
            setPhoto(data.user.Photo);
        }
    },[data])

    console.log('afdad :' +userPhoto);


    const handleLogout = () => {
        console.log('hello');
        dispatch(logOut());
    }

    return (
        <View style={globalStyle.container}>
            <AnimatedLinearGradient
            colors={[navgradiantStart, navgradiantEnd]}
            style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <TouchableOpacity>
                    <View style={navStyle.infoHolder} >
                       <Avatar.Image
                        style={navStyle.userImage}
                        source={ userPhoto ? { uri: userPhoto } : require('../assets/images/sir.png')}
                        size={50}
                        /> 
                        <View style={navStyle.infoTextHolder}>
                            <Text style={navStyle.text} >{user.name}</Text>
                            <Text style={navStyle.subText} >{user.email}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <DrawerItems />
            </DrawerContentScrollView>
            <View style={navStyle.drawBottomSection}>
                <DrawerItem
                    icon={() => <AntDesign name="logout" size={24} color="red" />}
                    label="Log out"
                    onPress={() => handleLogout()}
                />
            </View>
            </AnimatedLinearGradient>
        </View>
    );
}