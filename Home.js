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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 5,
        marginHorizontal: 10,
        marginBottom: 10,
    },
    icons: {
        color: 'black',
        fontSize: 30,
        marginRight: 5,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
    },
    sectionHeader: {
        padding: 10,
        elevation: 2,
        shadowColor: 'black',
        borderRadius: 35,
        marginTop: 10,
        marginHorizontal: 10,
    },
    sectionTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    card: {
        flexDirection: 'column',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        elevation: 5,
        shadowColor: 'black',
        borderWidth: 0.3,
        borderColor: 'black',
        borderRadius: 15,
        backgroundColor: 'linen',
        marginHorizontal: 30,
        marginVertical: 8,
    },
    image: {
        width: '100%',
        height: 160,
        borderRadius: 15,
    },
    title: {
        fontSize: 16,
    },
    buttonStyle: {
        backgroundColor: 'greenyellow',
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 5,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    appName: {
        backgroundColor: 'darkslategray',
        fontSize: 35,
        color: 'white',
        textAlign: 'center',
        padding: 20,
    },
});

const renderSectionHeader = ({ section }) => (
    <View style={[styles.sectionHeader, { backgroundColor: section.bgColor }]}>
        <View style={styles.headerContainer}>
            <Icon style={[styles.icons, { color: section.txtColor }]} name={section.icon} />
            <Text style={[styles.sectionTitle, { color: section.txtColor }]}>{section.sectionTitle}</Text>
        </View>
    </View>
);

const Home = ({navigation}) => {
    // adding to cart alert display
    // const [cartItems, setCartItems] = useState([]);

    // const addToCart = (title) => {
    //     setCartItems((prevItems) => [...prevItems, title]);
    //     Alert.alert('Item Added to Cart');
    // };

    // const viewCart = () => {
    //     if (cartItems.length > 0) {
    //         const cartList = cartItems.join('\n'); // Create a newline-separated string
    //         Alert.alert('Your Shopping Cart', cartList + '\n\nCheck Out');
    //     } else {
    //         Alert.alert('Your Shopping Cart', 'is empty!');
    //     }
    // };
    const renderItem = ({ item, index, section }) => (
        <View style={styles.card}>
            <Image source={{uri:item.image}} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.title}>S${item.price}</Text>
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                    navigation.navigate("Edit", {
                        index: index,
                        genre: section.sectionTitle,
                        item: item
                    });
                }}
            >
                <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
        </View>
    );
    return (
        <View style={styles.container}>
            <StatusBar hidden={false} />
            <SectionList
                sections={games}
                renderItem={(props) => renderItem(props)} // Pass `addToCart` to `renderItem`
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item, index) => item.title + index}
            />
            <View style={styles.button}>
                <Button title="Add new game" onPress={() => {
                    navigation.navigate("Add");
                }}/>
            </View>
        </View>
    );
};

export default Home;
