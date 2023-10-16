import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const POSTS_API_URL = "https://6526ac93917d673fd76cc515.mockapi.io/api/post";
const USERS_API_URL = "https://6526ac93917d673fd76cc515.mockapi.io/api/users";

const SettingsScreen = ({ navigation }) => {
  const [userAvatar, setUserAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [listFollow, setListFollow] = useState("");
  const [posts, setPosts] = useState([]);
  const [idUser, setIdUser] = useState("");
  const [userPosts, setUserPosts] = useState("");

  useEffect(() => {
    // Lấy dữ liệu từ API bảng posts
    const fetchPosts = async () => {
      try {
        const response = await axios.get(POSTS_API_URL);
        setPosts(response.data);

        const userID = await AsyncStorage.getItem("idUser");
        if (userID) {
          setIdUser(userID);
          const userPosts = response.data.filter(
            (post) => post.idUser === userID
          );
          setUserPosts(userPosts);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu bài đăng: ", error);
      }
    };

    // Lấy dữ liệu từ API bảng users
    const fetchUsers = async () => {
      try {
        const response = await axios.get(USERS_API_URL);
        setUsers(response.data);
        // console.log(response.data);
        const username = await AsyncStorage.getItem("userName");
        if (username) {
          setUsername(username);
        }
        const userAvatar = await AsyncStorage.getItem("userAvatar");
        if (userAvatar) {
          setUserAvatar(userAvatar);
        }
        const listFollowString = await AsyncStorage.getItem("userListFollow");
        if (listFollowString) {
          const listFollowArray = JSON.parse(listFollowString);
          setListFollow(listFollowArray);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu người dùng: ", error);
      }
    };
    fetchPosts();
    fetchUsers();
  }, []);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("idUser");
      await AsyncStorage.removeItem("userName");
      await AsyncStorage.removeItem("userAvatar");
      await AsyncStorage.removeItem("userListFollow");
    } catch (error) {
      console.error("Lỗi khi đăng xuất: ", error);
    }
    navigation.navigate("Login");
  };
  const handleProfile = () => {
    alert("Không thể ấn vào đấy");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleProfile}>
        <View style={styles.userProfile}>
          <View style={styles.verticalView}>
            {userAvatar && (
              <Image source={{ uri: userAvatar }} style={styles.userImage} />
            )}
            <Text style={styles.userName}>{username}</Text>
          </View>
          <View style={styles.verticalView}>
            <Text style={styles.boldFont}>({userPosts.length})</Text>
            <Text> Bài Viết</Text>
          </View>
          <View style={styles.verticalView}>
            <Text style={styles.boldFont}>({listFollow.length})</Text>
            <Text> Người theo dõi</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Đăng Xuất</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizontalView: {
    flexDirection: "row",
    flex: 1,
  },
  verticalView: {
    flexDirection: "col",
    flex: 1,
    alignItems: "center",
  },
  boldFont: {
    fontWeight: "bold",
  },
  userProfile: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "white",
    margin: 20,
    borderRadius: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: "tomato",
    paddingVertical: 16,
    paddingHorizontal: 32,
    margin: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default SettingsScreen;
