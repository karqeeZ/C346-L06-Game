import { games } from "./Data";
import React, { useState } from "react";
import {
    TextInput,
    Button,
    View,
    Text,
    StatusBar,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

const Edit = ({ navigation, route }) => {
    // State for editing game properties
    const [title, setTitle] = useState(route.params.item.title);
    const [price, setPrice] = useState(route.params.item.price);
    const [image, setImage] = useState(route.params.item.image);
    const [genre, setGenre] = useState(route.params.item.genre);

    // URL validation function
    const isValidUrl = (string) => {
        const regex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
        return regex.test(string);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar hidden={false} />
            <Text style={styles.title}>Edit Game</Text>

            <Text style={styles.label}>Title:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter game title"
                onChangeText={setTitle}
                value={title}
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
                onChangeText={setImage}
                value={image}
            />

            {/* Image Preview */}
            {image && isValidUrl(image) ? (
                <Image
                    source={{ uri: image }}
                    style={styles.imagePreview}
                    onError={() => alert("Invalid image URL")}
                />
            ) : (
                <Text style={styles.imagePlaceholder}>
                    {image ? "Invalid image URL" : "Image preview will appear here."}
                </Text>
            )}

            <Text style={styles.label}>Genre:</Text>
            <View style={styles.pickerContainer}>
                <RNPickerSelect
                    placeholder={{ label: "Select a genre", value: null }}
                    onValueChange={(value) => setGenre(value)}
                    value={genre}
                    items={[
                        { label: "Horror", value: "Horror" },
                        { label: "Racing", value: "Racing" },
                    ]}
                    style={{
                        placeholder: {
                            color: "dimgrey",
                        },
                    }}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        if (!title || !price || !image || !genre) {
                            alert("Please fill all fields");
                            return;
                        }

                        // Save the updated item
                        const indexnum = genre === "Horror" ? 0 : 1;
                        games[indexnum].data[route.params.index] = {
                            title,
                            price,
                            image,
                            genre,
                        };
                        navigation.navigate("Home");
                    }}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        const indexnum = genre === "Horror" ? 0 : 1;
                        Alert.alert(
                            "Are you sure?",
                            "",
                            [
                                {
                                    text: "Yeah",
                                    onPress: () => {
                                        // Delete the item
                                        games[indexnum].data.splice(route.params.index, 1);
                                        navigation.navigate("Home");
                                    },
                                },
                                { text: "Nahh" },
                            ]
                        );
                    }}
                >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Edit;

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
        marginTop: 20,
    },
    buttonText: {
        color: "black",
        fontSize: 20,
        fontWeight: "600",
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlign: "center",
        backgroundColor: "greenyellow",
        borderRadius: 8,
        marginVertical: 10,
    },
    deleteButtonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlign: "center",
        backgroundColor: "red",
        borderRadius: 8,
        marginVertical: 10,
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
