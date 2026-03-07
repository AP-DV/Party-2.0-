import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import Header from "../headers/Header";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../../reducers/user";
import { Fontisto } from "@expo/vector-icons";
import PhotoModal from "../events/PhotoModal"

type UserScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

export default function ProfileOnFocusScreen({ navigation }: UserScreenProps) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [missingError, setMissingError] = useState(false);
  const [photo, setPhoto] = useState<string>("");
  const [isPhotoModalOpened, setIsPhotoModalOpened] = useState(false);
  const [text, onChangeText] = React.useState("Useless Text");

  const user = useSelector((state: { user: UserState }) => state.user.value);

  const handleAddPhoto = (profiePhotoUrl: string) => {
    setPhoto(profiePhotoUrl);
  };

  console.log(user);

  return (
    <View>
      <View style={styles.header}>
        <Header destination={"Chat"} goBack={true} />
      </View>
      <View style={styles.container}>
        <View>

          <Fontisto
            style={styles.photos}
            name="photograph"
            size={95}
            color={"white"}
            onPress={() => setIsPhotoModalOpened(true)}
          />
          <PhotoModal
            onClose={() => setIsPhotoModalOpened(false)}
            visible={isPhotoModalOpened}
            addPhoto={handleAddPhoto}
          />
          <Text style={styles.title}>{user.username}</Text>
          <Text style={styles.title}>{user.email}</Text>
          <Text style={styles.title}>{user.userPhoto}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#151515",
    height:900,
    padding: 80
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
    padding: 40
  },
  photos: {
    backgroundColor: "#323232",
    width: 140,
    height: 140,
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
});
