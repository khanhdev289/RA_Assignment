import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://6526ac93917d673fd76cc515.mockapi.io/api/users?username=" +
          username,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const userData = await response.json();
        if (userData.length === 1 && userData[0].password === password) {
          const idUser = userData[0].idUser;
          const userRole = userData[0].role;
          const userImage = userData[0].avatar;
          const userListFollow = userData[0].listfollow;
          const userListFollowString = JSON.stringify(userListFollow);
          console.log(userData);
          AsyncStorage.setItem("idUser", idUser);
          AsyncStorage.setItem("userName", username);
          AsyncStorage.setItem("userRole", userRole);
          AsyncStorage.setItem("userAvatar", userImage);
          AsyncStorage.setItem("userListFollow", userListFollowString);
          navigation.navigate("Home");
        } else {
          alert("Tên đăng nhập hoặc mật khẩu không đúng.");
        }
      } else {
        alert("Tên đăng nhập hoặc mật khẩu không đúng.");
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập: ", error);
      alert("Có lỗi xảy ra khi đăng nhập.");
    }
  };

  const tapToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <ImageBackground
      source={require("../assets/loginbackground.jpeg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Đăng Nhập</Text>

        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          title="Đăng nhập"
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.textButton}>Đăng Nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity title="Đăng ký" onPress={tapToRegister}>
          <Text> Đăng Ký</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: "#fcba03",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 30,
  },
  textButton: {
    fontSize: 20,
    color: "white",
  },
});

export default LoginScreen;
