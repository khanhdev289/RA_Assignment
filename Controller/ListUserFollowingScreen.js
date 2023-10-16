import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_API_URL = "https://6526ac93917d673fd76cc515.mockapi.io/api/users";

const ListUserFollowingScreen = () => {
  const [followingList, setFollowingList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [idUser, setIdUser] = useState("");
  const [filteredFollowingList, setFilteredFollowingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Tải danh sách người dùng từ API khi màn hình được tạo
    const fetchUsers = async () => {
      try {
        const response = await axios.get(USERS_API_URL);
        const users = response.data;

        const userID = await AsyncStorage.getItem("idUser");
        if (userID) {
          setIdUser(userID);
        }
        const filteredUsers = users.filter((user) => user.idUser !== userID);
        setFollowingList(filteredUsers);
        setFilteredFollowingList(filteredUsers);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Lỗi khi tải danh sách người dùng: ", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filteredList = followingList.filter((user) =>
      user.username.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredFollowingList(filteredList);
  }, [followingList, searchText]);

  const toggleFollowing = async (userId) => {
    const userToUpdate = followingList.find((user) => user.idUser === userId);

    if (userToUpdate) {
      const isFollowing = userToUpdate.listfollow.includes(idUser);
      try {
        const updatedListFollow = isFollowing
          ? userToUpdate.listfollow.filter((id) => id !== idUser)
          : [...userToUpdate.listfollow, idUser];

        const response = await axios.put(
          `${USERS_API_URL}/${userToUpdate.idUser}`,
          {
            listfollow: updatedListFollow,
          }
        );

        if (response.status === 200) {
          // Cập nhật trạng thái và văn bản của nút theo kết quả kiểm tra
          const updatedFollowingList = followingList.map((user) => {
            if (user.idUser === userId) {
              return {
                ...user,
                isFollowing: !isFollowing,
                listfollow: updatedListFollow,
              };
            }
            return user;
          });

          setFollowingList(updatedFollowingList);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          console.error("Lỗi khi cập nhật danh sách theo dõi");
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật danh sách theo dõi: ", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="tomato" />
      ) : (
        <React.Fragment>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm..."
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <FlatList
            data={filteredFollowingList}
            renderItem={({ item: followingUser }) => {
              const isFollowing = followingUser.listfollow.includes(idUser);

              return (
                <View style={styles.userCell}>
                  <View style={styles.horizontalView}>
                    <Image
                      source={{ uri: followingUser.avatar }}
                      style={styles.imageUser}
                    />
                    <Text style={styles.userName}>
                      {followingUser.username}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.followButton,
                      {
                        backgroundColor: isFollowing ? "gray" : "green",
                      },
                    ]}
                    onPress={() => toggleFollowing(followingUser.idUser)}
                  >
                    <Ionicons
                      name={
                        isFollowing ? "person-outline" : "person-add-outline"
                      }
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </React.Fragment>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    padding: 10,
    margin: 10,
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  userCell: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  horizontalView: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
  },
  imageUser: {
    width: 40,
    height: 40,
  },
  userName: {
    marginLeft: 10,
    fontSize: 20,
  },
  followButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    margin: 10,
  },
  followButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ListUserFollowingScreen;
