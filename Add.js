import { games } from "./Data";
import React, { useState } from "react";
import {TextInput, Button, View, Text, StatusBar, StyleSheet, ScrollView, TouchableOpacity, Image} from "react-native";
import RNPickerSelect from "react-native-picker-select";

const Add = ({ navigation }) => {
    const [img, setImg] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [genre, setGenre] = useState("");

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar hidden={false} />
            <Text style={styles.title}>Add a New Game</Text>

            <Text style={styles.label}>Title:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter game title"
                onChangeText={setName}
                value={name}
            />

            <Text style={styles.label}>Price:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter game price"
                onChangeText={setPrice}
                value={price}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Image URL:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter image URL"
                onChangeText={setImg}
                value={img}
            />

            {/* Image Preview */}
            {img ? (
                <Image
                    source={{ uri: img }}
                    style={styles.imagePreview}
                    onError={() => alert("Invalid image URL")}
                />
            ) : (
                <Text style={styles.imagePlaceholder}>Image preview will appear here.</Text>
            )}

            <Text style={styles.label}>Genre:</Text>
            <View style={styles.pickerContainer}>
                <RNPickerSelect
                    placeholder={{ label: "Select a genre", value: null, }}
                    onValueChange={(value) => setGenre(value)}
                    items={[
                        { label: "Horror", value: "Horror" },
                        { label: "Racing", value: "Racing" },
                    ]}
                    style={{
                        placeholder: {
                            color: "dimgrey",
                        }
                    }}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => {
                    if (!name || !price || !img || !genre) {
                        alert("Please fill all fields");
                        return;
                    }

                    let item = { title: name, price: price, genre: genre, image: img  };
                    let indexnum = genre === "Horror" ? 0 : 1;

                    games[indexnum].data.push(item);
                    navigation.navigate("Home");
                }}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Add;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#F9F9F9",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "black",
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 5,
        color: "dimgrey",
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: "ghostwhite",

    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 8,
        padding: 5,
        marginBottom: 20,
        backgroundColor: "ghostwhite",
    },
    buttonContainer: {
        color: 'black',
        paddingHorizontal: 20,
        marginHorizontal: 100,
        borderRadius: 8,
        marginTop: 5,
        backgroundColor: "greenyellow",
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        fontWeight: '600',
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlign: "center"
    },
    imagePreview: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        marginVertical: 10,
        resizeMode: "cover",
    },
    imagePlaceholder: {
        fontSize: 14,
        color: "grey",
        textAlign: "center",
        marginVertical: 10,
    },
});

