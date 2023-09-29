import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Data_ListPost = [
  {
    idUser: 0,
    user: {
      name: "Khanh",
      image: require("../assets/homeavatar.png"),
    },
    content: "leu leu heheheehehheehhehehehehhehe",
    heart: false,
  },
  {
    idUser: 1,
    user: {
      name: "Khanh1",
      image: require("../assets/homeavatar.png"),
    },
    content: "leu leu heheheehehheehhehehehehhehe leu leueehhehehehehhehe",
    heart: false,
  },
  {
    idUser: 2,
    user: {
      name: "Khanh2",
      image: require("../assets/homeavatar.png"),
    },
    content: "leu leu heheheehehheehhehehehehhehe",
    heart: false,
  },
];

const AllPostsScreen = () => {
  const [inputText, setInputText] = useState("");
  const [posts, setPosts] = useState(Data_ListPost);
  const [nextId, setNextId] = useState(Data_ListPost.length + 1); // Sử dụng biến đếm để theo dõi idUser tiếp theo

  const handlePost = () => {
    if (inputText.trim() === "") {
      return;
    }

    const newUserPost = {
      idUser: nextId, // Sử dụng giá trị của nextId làm idUser
      user: {
        name: "Admin",
        image: require("../assets/homeavatar.png"),
      },
      content: inputText,
      heart: false,
    };

    // Cập nhật danh sách bài viết hiện có và tăng giá trị nextId
    setPosts((prevPosts) => [newUserPost, ...prevPosts]);
    setNextId(nextId + 1); // Tăng giá trị nextId

    setInputText("");
  };

  const toggleHeart = (post) => {
    const updatedPosts = posts.map((p) => {
      if (p.idUser === post.idUser && p.content === post.content) {
        return { ...p, heart: !p.heart };
      } else {
        return p;
      }
    });

    setPosts(updatedPosts);
  };

  return (
    <SafeAreaView>
      <View style={styles.postContainer}>
        <Image
          source={require("../assets/homeavatar.png")}
          style={styles.imageUser}
        />
        <TextInput
          placeholder="Bạn đang nghĩ gì?"
          style={styles.postInput}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity onPress={handlePost}>
          <Text style={styles.postButton}>Đăng</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.container}
        data={posts}
        renderItem={({ item: userPost }) => (
          <View style={styles.userCell}>
            <View style={styles.horizontalView}>
              <Image source={userPost.user.image} style={styles.imageUser} />
              <Text style={styles.userName}>{userPost.user.name}</Text>
            </View>
            <FlatList
              data={posts.filter((post) => post.idUser === userPost.idUser)}
              renderItem={({ item: post }) => (
                <View style={styles.cell}>
                  <Text>{post.content}</Text>
                  <View style={styles.horizontalIcon}>
                    <TouchableOpacity
                      style={styles.spacingIconHert}
                      onPress={() => toggleHeart(post)}
                    >
                      {post.heart ? (
                        <Ionicons name="ios-heart" size={32} color="red" />
                      ) : (
                        <Ionicons
                          name="ios-heart-outline"
                          size={32}
                          color="black"
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.spacingIconShare}>
                      <Ionicons
                        name="arrow-redo-outline"
                        size={32}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  userCell: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 20,
  },
  cell: {
    backgroundColor: "white",
    margin: 10,
  },
  horizontalView: {
    flexDirection: "row",
    margin: 20,
  },
  horizontalIcon: {
    flexDirection: "row",
    letterSpacing: 10,
    position: "relative",
    marginTop: 30,
  },
  verticalView: {
    flexDirection: "column",
    margin: 10,
  },
  imageUser: {
    width: 40,
    height: 40,
  },
  userName: {
    marginLeft: 10,
    fontSize: 20,
  },
  postContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  postInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  postButton: {
    color: "blue",
    fontSize: 16,
  },
  spacingIconHert: {},
  spacingIconShare: {
    position: "absolute",
    right: 30,
  },
});

export default AllPostsScreen;
