import {
    StyleSheet,
    Text,
    View,
    TextInput,
    FlatList,
    Image,
} from "react-native";
import React, { useEffect } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Button } from "../../ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../../reducers/user";
import { BACKENDADRESS } from "../../config";
import Header from "../headers/Header";
import { User } from "../../types/user";

type UserScreenProps = {
    navigation: NavigationProp<ParamListBase>;
};

export default function FriendsScreen({ navigation }: UserScreenProps) {
    const [friendName, setFriendName] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);
    const user = useSelector((state: { user: UserState }) => state.user.value);
    const dispatch = useDispatch();
    const [friendsList, setFriendsList] = useState<string[]>(user.friendsIds);

    useEffect(() => {
        const fetchUsersList = async () => {
            try {
                const response = await fetch(BACKENDADRESS + "/users");
                const data = await response.json();
                setUsers(data.users);
                console.log(data.users);
            } catch (error) {
                console.error("Erreur de récupération des users", error);
            }
        };
        fetchUsersList();
    }, []);

    const addFriend = () => {

        const friend =  users.find( user => user.username === friendName)
        console.log(friend);
        


        // const response = await fetch(BACKENDADRESS + `/users/${friendName}`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({}),
        // })
        // const data = await response.json()
        // if(data) {
        //         console.log(data);

        //     };
    };


    const handleAddFriend = () => {};

    return (
        <View>
            <View style={styles.header}>
                <Header destination={"Events"} goBack={false} />
            </View>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Ma liste d'amis : </Text>
                    <FlatList
                        style={styles.listPosition}
                        data={friendsList}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.infosBox}>
                                <Text style={styles.texte}>
                                    {item.username}
                                </Text>
                            </View>
                        )}
                    />
                    <Text style={styles.title}>Liste des users : </Text>
                    <FlatList
                        style={styles.listPosition}
                        data={users}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.infosBox}>
                                <Text style={styles.texte}>
                                    {item.username}
                                </Text>
                                <Image
                                    style={styles.userPhoto}
                                    source={{ uri: item.userPhoto }}
                                />
                            </View>
                        )}
                    />
                    <Text style={styles.title}>Ajoute un ami </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Recherche un ami ..."
                        placeholderTextColor="grey"
                        onChangeText={(value) => setFriendName(value)}
                        value={friendName}
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
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
    },
    input: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    userPhoto: {
        width: 30,
        height: 30,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: "white",
    },
    texte: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
    },
    infosBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
    },
    // listPosition: {
    //     height: "30%",
    //     width: "30%",
    // },
});
