import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/action';

export default function AddTodoInput({ submitTodoText }){
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const textHandler = (text) => {
        setText(text);
    }
    const submitText = (t) => {
        dispatch(addToCart(t));
    }

    return (
        <View>
            <TextInput 
            placeholder='e.g. John doe' style={styles.input}
            onChangeText={(v) => textHandler(v)} />
            <Button onPress={() => submitText(text) } title='Add item' style={styles.button} />
         </View>
    );
}

const styles = StyleSheet.create({
    input: {
        color: '#333',
        fontSize: 15,
        fontWeight: 'bold',
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 16,
        borderWidth: 1,
        borderColor: '#777',
        marginBottom: 16

    },
    button:{
        marginTop: 16,
    }
});