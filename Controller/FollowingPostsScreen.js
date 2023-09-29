import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const Data_Following = [
  {
    idUser: 3,
    user: {
      name: "User1",
      image: require("../assets/homeavatar.png"),
    },
    isFollowing: false,
  },
  {
    idUser: 4,
    user: {
      name: "User2",
      image: require("../assets/homeavatar.png"),
    },
    isFollowing: false,
  },
  {
    idUser: 5,
    user: {
      name: "User3",
      image: require("../assets/homeavatar.png"),
    },
    isFollowing: false,
  },
];

const Data_ListPost = [
  {
    idUser: 3,
    user: {
      name: "User1",
      image: require("../assets/homeavatar.png"),
    },
    content: "Bài viết 1 của User1",
  },
  {
    idUser: 4,
    user: {
      name: "User2",
      image: require("../assets/homeavatar.png"),
    },
    content: "Bài viết 1 của User2",
  },
  {
    idUser: 5,
    user: {
      name: "User3",
      image: require("../assets/homeavatar.png"),
    },
    content: "Bài viết 1 của User3",
  },
];

const ListUserFollowingScreen = () => {
  const [followingList, setFollowingList] = useState(Data_Following);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    // Lọc danh sách người theo dõi
    const followedUsers = followingList.filter((user) => user.isFollowing);

    // Lọc bài viết của những người theo dõi
    const postsOfFollowedUsers = Data_ListPost.filter((post) =>
      followedUsers.some((user) => user.idUser === post.idUser)
    );

    setUserPosts(postsOfFollowedUsers);
  }, [followingList]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={userPosts}
        renderItem={({ item: userPost }) => (
          <View style={styles.userCell}>
            <View style={styles.horizontalView}>
              <Image source={userPost.user.image} style={styles.imageUser} />
              <Text style={styles.userName}>{userPost.user.name}</Text>
            </View>
            <View style={styles.postContent}>
              <Text>{userPost.content}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userCell: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  horizontalView: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageUser: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  postContent: {
    marginTop: 10,
  },
});

export default ListUserFollowingScreen;
