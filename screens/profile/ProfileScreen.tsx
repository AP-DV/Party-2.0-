import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React from "react";
import {
    NavigationProp,
    ParamListBase,
    useNavigation,
} from "@react-navigation/native";
import Header from "../headers/Header";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, UserState } from "../../reducers/user";
import { Fontisto } from "@expo/vector-icons";
import PhotoModal from "../events/PhotoModal";
import { BACKENDADRESS } from "../../config";
import { Button } from "../../ui/button";

type UserScreenProps = {
    navigation: NavigationProp<ParamListBase>;
};

const EMAIL_REGEX: RegExp = /./;
//    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function ProfileOnFocusScreen({ navigation }: UserScreenProps) {
    const dispatch = useDispatch();

    const user = useSelector((state: { user: UserState }) => state.user.value);
    console.log("User =>", user);

    const [photo, setPhoto] = useState<string>("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [missingError, setMissingError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [isPhotoModalOpened, setIsPhotoModalOpened] = useState(false);
    const [text, onChangeText] = React.useState("Useless Text");

    const handleAddPhoto = (imageURI: string) => {
        const formData = new FormData();
        //@ts-expect-error
        formData.append("photoFromFront", {
            uri: imageURI,
            name: "photo.jpg",
            type: "image/jpeg",
        });
        fetch(BACKENDADRESS + "/upload", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("URI photo =>", data.photo);
                setPhoto(data.photo.url);
            });
    };

    const handleModifiedEmail = () => {
        if (!email || !EMAIL_REGEX.test(email)) {
            setEmailError(true);
        } else {
            fetch(BACKENDADRESS + `/users/update/${user.token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.token) {
                        dispatch(
                            login({
                                email: data.user.email,
                                username: data.user.username,
                                token: data.token,
                                userPhoto: data.user.userPhoto,
                            }),
                        );
                    }
                })
                .catch(console.error);

            setEmailError(false);
        }
    };

    const handleModifiedPassword = () => {
        if (!oldPassword) {
            setMissingError(true);
        }  else if (!newPassword) {
            setMissingError(true);
        }
        else {
            fetch(BACKENDADRESS + `/users/update/${user.token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    oldPassword,
                    newPassword,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error === "Wrong password") {
                        setPasswordError(true);
                        setOldPassword("");
                    }
                    if (data.result) {
                        console.log(data.user);
                        dispatch(
                            login({
                                email: data.user.email,
                                username: data.user.username,
                                token: data.token,
                                userPhoto: data.user.userPhoto,
                            }),
                        );
                    }
                })

                .catch(console.error);
        }
        setOldPassword("");
        setNewPassword("");
        setMissingError(false);
        setPasswordError(false);
    };

    const deconnected = () => {
        dispatch(logout());
        navigation.navigate("Home");
    };

    return (
        <View>
            <View style={styles.header}>
                <Header destination={"Chat"} goBack={true} />
            </View>
            <View style={styles.container}>
                <PhotoModal
                    onClose={() => setIsPhotoModalOpened(false)}
                    visible={isPhotoModalOpened}
                    addPhoto={handleAddPhoto}
                />
                <View style={styles.user}>
                    {photo ? (
                        <Image
                            style={styles.updPhoto}
                            source={{ uri: photo }}
                        />
                    ) : (
                        <Fontisto
                            style={styles.photos}
                            name="photograph"
                            size={95}
                            color={"white"}
                            onPress={() => setIsPhotoModalOpened(true)}
                        />
                    )}
                    <Text style={styles.title}>{user.username}</Text>
                    <Text style={styles.title}>{user.email}</Text>
                </View>
                <View>
                    <Text style={styles.title}>Connexion et sécurité</Text>
                    <View style={styles.modified}>
                        <View style={styles.champ}>
                            <Text style={styles.title}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Your email..."
                                placeholderTextColor="grey"
                                onChangeText={(value) => setEmail(value)}
                                value={email}
                            />
                            {emailError && (
                                <Text style={styles.error}>
                                    Invalid email address
                                </Text>
                            )}
                        </View>
                        <Button
                            colour="blue"
                            size="m"
                            text="Modifier"
                            onPress={handleModifiedEmail}
                        />
                    </View>
                    <View style={styles.modified}>
                        <View style={styles.champ}>
                            <Text style={styles.title}>
                                Ancien mot de passe
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Old password..."
                                placeholderTextColor="grey"
                                onChangeText={(value) => setOldPassword(value)}
                                value={oldPassword}
                            />
                            <Text style={styles.title}>
                                Nouveau mot de passe
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="New password..."
                                placeholderTextColor="grey"
                                onChangeText={(value) => setNewPassword(value)}
                                value={newPassword}
                            />
                            {missingError && (
                                <Text style={styles.error}>
                                    Missing or empty fields
                                </Text>
                            )}
                            {passwordError && (
                                <Text style={styles.error}>
                                    wrong password !
                                </Text>
                            )}
                        </View>
                        <Button
                            colour="blue"
                            size="m"
                            text="Modifier"
                            onPress={handleModifiedPassword}
                        />
                    </View>
                </View>
                <Button
                    colour="green"
                    size="s"
                    text="Deconnection"
                    onPress={deconnected}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#151515",
        height: 900,
        padding: 80,
    },
    user: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#000",
        maxHeight: 125,
        width: "100%",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
        padding: 10,
    },
    photos: {
        backgroundColor: "#323232",
        width: 100,
        height: 100,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: "white",
        marginLeft: 10,
        marginRight: 10,
        padding: 15,
    },
    updPhoto: {
        width: 120,
        height: 120,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: "white",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    input: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        height: 40,
        margin: 15,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#323232",
        color: "grey",
        borderColor: "white",
        borderRadius: 17,
        width: "80%",
    },
    error: {
        marginTop: 10,
        color: "red",
    },
    modified: {
        flexDirection: "row",
        backgroundColor: "grey",
        borderWidth: 2,
        borderBlockColor: "black",
        height: 200,
    },
    champ: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
});
