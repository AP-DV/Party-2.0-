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
            
            <TouchableOpacity
                style={{ width: 70, height: 70 }}
                onPress={handleGoProfile}
            >
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
            </TouchableOpacity>
            <Image
                source={require("../../assets/Party Logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#282828",
        height: 100,
        maxHeight: 150,
        width: "100%",
        borderBottomWidth: 0.2,
        borderColor: "white",
        paddingTop : 40,
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
    },
    logo: {
        width: 60,
        height: 60,
    },
    username: {
        color: "white",

        marginTop: 50,
        fontSize: 11,
    },
    updPhoto: {
        width: 60,
        height: 60,
    },
    userIcon: {
        width: 60,
        height: 60,
    },
    notifIcon: {},
    arrow: {},
});
