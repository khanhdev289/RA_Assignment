import { useNavigation } from "@react-navigation/native";
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
import { Picker } from "@react-native-picker/picker";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [role, setRole] = useState("user");
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState("user");

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleRegister = async () => {
    if (username && password && password2) {
      if (password === password2) {
        const newUser = {
          username,
          password,
          role: selectedRole,
        };

        try {
          // Thực hiện yêu cầu POST đến API
          const response = await fetch(
            "https://6526ac93917d673fd76cc515.mockapi.io/api/users",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newUser),
            }
          );

          if (response.status === 201) {
            alert("Đăng ký thành công!");
            navigation.navigate("Login");
          } else {
            alert("Có lỗi xảy ra khi đăng ký.");
            console.log(response.status);
          }
        } catch (error) {
          alert("Có lỗi xảy ra khi đăng ký.");
          console.error("Lỗi: ", error);
        }
      } else {
        alert("Mật khẩu xác nhận không khớp.");
      }
    } else {
      alert("Vui lòng điền đầy đủ thông tin đăng ký.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/loginbackground.jpeg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Đăng Ký</Text>

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
        <TextInput
          style={styles.input}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry
          onChangeText={(text) => setPassword2(text)}
        />
        <TouchableOpacity
          title="Vai trò"
          onPress={() => setIsPickerVisible(true)}
        >
          <Text style={styles.textButton}>Vai trò</Text>
        </TouchableOpacity>
        {isPickerVisible && (
          <Picker
            selectedValue={selectedRole}
            style={{ height: 50, width: 200 }}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedRole(itemValue);
            }}
          >
            <Picker.Item label="Người dùng" value="user" />
            <Picker.Item label="Admin" value="admin" />
          </Picker>
        )}

        <TouchableOpacity
          title="Đăng ký"
          onPress={handleRegister}
          style={styles.button}
        >
          <Text style={styles.textButton}> Đăng Ký</Text>
        </TouchableOpacity>
        <TouchableOpacity
          title="Đăng nhập"
          onPress={handleLogin}
          color="white"
          backgroundColor="orage"
        >
          <Text>Đăng Nhập</Text>
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
    marginTop: 150,
  },
  textButton: {
    fontSize: 20,
    color: "white",
  },
});

export default RegisterScreen;
