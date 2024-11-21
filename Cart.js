import React, { useState } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    StatusBar,
    SectionList,
    TouchableOpacity,
    Alert,
    Image,
} from 'react-native';
import { games } from './Data.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Cart = () => {
    return (
        <View className={styles.container}>
            <StatusBar hideNavBar={false} />
            <View style={styles.title}>
                <Text style={styles.textStyle}>CART</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 5,
        marginHorizontal: 10,
        marginBottom: 10,
    },
    textStyle: {
        textAlign: 'center',
        margin: 10,
        fontSize: 20,
    },
    title: {
        padding: 10,
        elevation: 2,
        shadowColor: 'black',
        borderRadius: 35,
        marginTop: 10,
        marginHorizontal: 10,
    }
})

export default Cart;
