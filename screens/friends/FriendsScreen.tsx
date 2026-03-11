import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Button } from "../../ui/button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { UserState } from "../../reducers/user";
import { BACKENDADRESS } from "../../config";
import Header from "../headers/Header";

type UserScreenProps = {
    navigation: NavigationProp<ParamListBase>;
};

export default function FriendsScreen({ navigation }: UserScreenProps) {
    const [username, setUsername] = useState<string>("");
    const user = useSelector((state: { user: UserState }) => state.user.value);

    const friendsList = user.friendsList;

    const addFriend = () => {
        fetch(BACKENDADRESS + `/users/${user.token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.result) {
                    console.log(data);
                }
            });
    };
    const handleAddFriend = () => {};
    return (
        <View>
            <View style={styles.header}>
                <Header destination={"Events"} goBack={false} />
            </View>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Liste d'amis</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Recherche un ami ..."
                        placeholderTextColor="grey"
                        onChangeText={(value) => setUsername(value)}
                        value={username}
                    />
                    <Button
                        colour="grey"
                        size="m"
                        text="+"
                        onPress={handleAddFriend}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#000",
        maxHeight: 155,
        width: "100%",
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
    },
    input: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    texte: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
    },
});
