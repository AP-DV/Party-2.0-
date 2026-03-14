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
import { UserState, addFriend, removeFriend } from "../../reducers/user";
import { BACKENDADRESS } from "../../config";
import Header from "../headers/Header";
import { User } from "../../types/user";

type UserScreenProps = {
    navigation: NavigationProp<ParamListBase>;
};

export default function FriendsScreen({ navigation }: UserScreenProps) {
    const dispatch = useDispatch();
    const [newFriendName, setNewFriendName] = useState<string>("");
    const [oldFriendName, setOldFriendName] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);
    const [friendsList, setFriendsList] = useState<User[]>([]);
    const [friendError, setFriendError] = useState(false);

    const user = useSelector((state: { user: UserState }) => state.user.value);

    useEffect(() => {
        const fetchUsersList = async () => {
            try {
                const response = await fetch(BACKENDADRESS + "/users");
                const data = await response.json();
                setUsers(data.users);
            } catch (error) {
                console.error("Erreur de récupération des users", error);
            }
        };
        fetchUsersList();
    }, []);

    const handleAddFriend = async () => {
        if (newFriendName) {
            const friend = users.find(
                (user) => user.username === newFriendName,
            );

            if (!friend) {
                setFriendError(true);
                return;
            }
            if (!friendsList.includes(friend)) {
                setFriendsList([...friendsList, friend]);

                const response = await fetch(
                    BACKENDADRESS + `/users/update/${user.token}`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ friendId: friend._id }),
                    },
                );
                const data = await response.json();
                if (data) {
                    console.log(data);
                    dispatch(addFriend(friend._id));
                }
            }
        }
        setNewFriendName("");
    };

    const handleRemoveFriend = async () => {
        if (oldFriendName) {
            const friend = users.find(
                (user) => user.username === oldFriendName,
            );

            if (!friend) {
                setFriendError(true);
                return;
            }

            setFriendsList(friendsList.filter((e) => e._id !== friend._id));

            const response = await fetch(
                BACKENDADRESS + `/users/update/${user.token}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        friendId: friend._id,
                        remove: true,
                    }),
                },
            );
            const data = await response.json();
            if (data) {
                console.log(data);
                dispatch(removeFriend(friend._id));
            }
        }
        setOldFriendName("");
    };
console.log(user);

    return (
        <View>
            <View style={styles.header}>
                <Header destination={"Events"} goBack={false} />
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Ma liste d'amis : </Text>
                <FlatList
                    style={styles.listPosition}
                    data={friendsList}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.infosBox}>
                            <Text style={styles.texte}>{item.username}</Text>
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
                            <Text style={styles.texte}>{item.username}</Text>
                            <Image
                                style={styles.userPhoto}
                                source={{ uri: item.userPhoto }}
                            />
                        </View>
                    )}
                />
                <Text style={styles.title}>Ajoute un ami </Text>
                <View style={styles.addFriend}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nom de ton futur ami ..."
                        placeholderTextColor="grey"
                        onChangeText={(value) => setNewFriendName(value)}
                        value={newFriendName}
                    />
                    {friendError && (
                        <Text style={styles.error}>L'user n'existe pas</Text>
                    )}
                    <Button
                        colour="grey"
                        size="s"
                        text="+"
                        onPress={handleAddFriend}
                    />
                    <Text style={styles.title}>Supprime un ami </Text>
                </View>
                <View style={styles.addFriend}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nom de ton ancien ami ..."
                        placeholderTextColor="grey"
                        onChangeText={(value) => setOldFriendName(value)}
                        value={oldFriendName}
                    />
                    {friendError && (
                        <Text style={styles.error}>L'user n'existe pas</Text>
                    )}
                    <Button
                        colour="grey"
                        size="s"
                        text="-"
                        onPress={handleRemoveFriend}
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
        width: "100%",
        height: "100%",
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
        height: 50,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#323232",
        color: "grey",
        borderColor: "white",
        borderRadius: 17,
        width: "100%",
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
        justifyContent: "space-around",
        alignContent: "center",
    },
    listPosition: {
        height: 100,
        width: 200,
    },
    addFriend: {
        height: "30%",
        width: "80%",
    },
    error: {
        marginTop: 10,
        color: "red",
    },
});
