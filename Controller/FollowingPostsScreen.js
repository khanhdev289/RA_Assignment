import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Share,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

const POSTS_API_URL = "https://6526ac93917d673fd76cc515.mockapi.io/api/post";
const USERS_API_URL = "https://6526ac93917d673fd76cc515.mockapi.io/api/users";

function FollowingPostsScreen() {
  const [posts, setPosts] = useState([]);
  const [idUser, setIdUser] = useState("");

  useEffect(() => {
    const CloneData = async () => {
      try {
        const userID = await AsyncStorage.getItem("idUser");
        if (userID) {
          setIdUser(userID);
        }
        const response = await axios.get(POSTS_API_URL);
        const response1 = await axios.get(USERS_API_URL);

        const currentUser = response1.data.find(
          (user) => user.idUser === userID
        );

        if (currentUser) {
          const followingIDs = currentUser.listfollow;
          const filteredData = response.data.filter((item) =>
            followingIDs.includes(item.idUser)
          );
          setPosts(filteredData);
        }
      } catch (error) {
        console.error("Lỗi " + error);
      }
    };

    CloneData();
  }, []);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Share on facebook",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const toggleHeart = async () => {
    alert("Không thể bấm vào đây");
  };
  const toggleComment = async () => {
    alert("Không thể bấm vào đây");
  };

  return (
    <View style={{ width: "100%", height: 740 }}>
      <FlatList
        data={posts}
        renderItem={({ item: userPost }) => {
          const isLiked = userPost.likedBy.includes(idUser);
          return (
            <View style={styles.userCell}>
              <View style={styles.horizontalView}>
                <Image
                  source={{ uri: userPost.image }}
                  style={styles.imageUser}
                />
                <Text style={styles.userName}>{userPost.name}</Text>

                <View
                  style={{
                    top: 0,
                    right: 0,
                    position: "absolute",
                    flexDirection: "row",
                  }}
                ></View>
              </View>
              <View style={styles.cell}>
                <Text>{userPost.content}</Text>
                {userPost.imagePost != null ? (
                  <Image
                    source={{ uri: userPost.imagePost }}
                    style={{
                      width: "100%",
                      height: 250,
                      marginTop: 10,
                    }}
                  />
                ) : null}
                <View style={styles.horizontalIcon}>
                  <TouchableOpacity
                    style={[styles.spacingIconHert]}
                    onPress={() => toggleHeart(userPost.idPost)}
                  >
                    {isLiked ? (
                      <Ionicons name="ios-heart" size={32} color="red" />
                    ) : (
                      <Ionicons
                        name="ios-heart-outline"
                        size={32}
                        color="black"
                      />
                    )}
                    <Text>Thích ({userPost.likedBy.length})</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.spacingIconComment}
                    onPress={() => toggleComment()}
                  >
                    <Ionicons
                      name="chatbox-ellipses-outline"
                      size={32}
                      color="black"
                    />
                    <Text>Bình luận</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.spacingIconShare}
                    onPress={onShare}
                  >
                    <Ionicons
                      name="arrow-redo-outline"
                      size={32}
                      color="black"
                    />
                    <Text>Chia sẻ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userCell: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 20,
  },
  horizontalView: {
    flexDirection: "row",
    margin: 20,
  },
  imageUser: {
    width: 40,
    height: 40,
    borderRadius: "50%",
  },
  userName: {
    marginLeft: 10,
    fontSize: 20,
    alignItems: "center",
  },
  cell: {
    backgroundColor: "white",
    margin: 10,
    paddingLeft: 10,
  },
  horizontalIcon: {
    flexDirection: "row",
    letterSpacing: 10,
    position: "relative",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  spacingIconHert: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 25,
  },
  spacingIconComment: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 25,
    marginRight: 25,
  },
  spacingIconShare: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
});

export default FollowingPostsScreen;
