import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useSelector } from "react-redux";
import { UserState } from "../../reducers/user";

export default function Header({
    destination,
    goBack,
}: {
    destination?: string;
    goBack: boolean;
}) {
    const navigation = useNavigation<any>();

    const user = useSelector((state: { user: UserState }) => state.user.value);
    console.log("User =>", user);

    const handleGoBack = () => {
        navigation.navigate(destination);
    };

    const handleGoProfile = () => {
        navigation.navigate("FocusOnProfil");
    };

    return (
        <View style={styles.header}>
            {goBack && (
                <FontAwesome6
                    style={styles.arrow}
                    name="arrow-left"
                    size={35}
                    color="white"
                    onPress={handleGoBack}
                />
            )}
            <Image
                source={require("../../assets/Party Logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />

            {user.userPhoto ? (
                    <Image
                        style={styles.updPhoto}
                        source={{ uri: user.userPhoto }}
                    />
                ) : (
                    <EvilIcons
                    style={styles.userIcon}
                    name="user"
                    size={45}
                    color="white"
                    onPress={handleGoProfile}
                    />
                )}

            <Ionicons
                style={styles.notifIcon}
                name="notifications-outline"
                size={35}
                color="white"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#282828",
        height: 100,
        maxHeight: 150,
        width: "100%",
        borderBottomWidth: 0.2,
        borderColor: "white",
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
    },
    logo: {
        position: "absolute",
        width: 70,
        height: 70,
        left: 152,
        top: 33,
    },
    username: {
        position: "absolute",
        color: "white",
        left: 220,
        marginTop: 50,
        fontSize: 11,
    },
    updPhoto: {
        position: "absolute",
        width: 37,
        height: 37,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: "white",
        marginLeft: 10,
        marginRight: 10,
        left: 260,
        top: 47.5,
    },
    userIcon: {
        position: "absolute",
        width: 60,
        height: 60,
        left: 275,
        top: 50,
    },
    notifIcon: {
        position: "absolute",
        left: 325,
        top: 50,
    },
    arrow: {
        position: "absolute",
        left: 20,
        top: 50,
    },
});
