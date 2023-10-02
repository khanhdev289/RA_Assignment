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
  const [posts, setPosts] = useState(
    Data_ListPost.map((post) => ({ ...post, isCommenting: false }))
  );
  const [nextId, setNextId] = useState(Data_ListPost.length + 1);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const handlePost = () => {
    if (inputText.trim() === "") {
      return;
    }

    const newUserPost = {
      idUser: nextId,
      user: {
        name: "Admin",
        image: require("../assets/homeavatar.png"),
      },
      content: inputText,
      heart: false,
      isCommenting: false,
    };

    setPosts((prevPosts) => [newUserPost, ...prevPosts]);
    setNextId(nextId + 1);

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

  const toggleComment = (post) => {
    const updatedPosts = posts.map((p) => {
      if (p.idUser === post.idUser && p.content === post.content) {
        return { ...p, isCommenting: !p.isCommenting };
      } else {
        return p;
      }
    });

    setPosts(updatedPosts);
  };

  const commentsForPost = (post) => {
    return comments.filter((comment) => comment.postId === post.idUser);
  };

  const handleComment = (postId, text) => {
    const newComment = {
      postId,
      text,
    };

    setComments((prevComments) => [...prevComments, newComment]);
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
            <View style={styles.cell}>
              <Text>{userPost.content}</Text>
              <View style={styles.horizontalIcon}>
                <TouchableOpacity
                  style={styles.spacingIconHert}
                  onPress={() => toggleHeart(userPost)}
                >
                  {userPost.heart ? (
                    <Ionicons name="ios-heart" size={32} color="red" />
                  ) : (
                    <Ionicons
                      name="ios-heart-outline"
                      size={32}
                      color="black"
                    />
                  )}
                  <Text>Thích</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.spacingIconComment}
                  onPress={() => toggleComment(userPost)}
                >
                  <Ionicons
                    name="chatbox-ellipses-outline"
                    size={32}
                    color="black"
                  />
                  <Text>Bình luận</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.spacingIconShare}>
                  <Ionicons name="arrow-redo-outline" size={32} color="black" />
                  <Text>Chia sẻ</Text>
                </TouchableOpacity>
              </View>
              {userPost.isCommenting && (
                <View style={styles.commentSection}>
                  <FlatList
                    data={commentsForPost(userPost)}
                    renderItem={({ item: comment }) => (
                      <View style={styles.horizontalViewComment}>
                        <Image
                          source={userPost.user.image}
                          style={styles.imageUser}
                        />
                        <View style={styles.verticalViewComment}>
                          <Text style={styles.userNameComment}>
                            {userPost.user.name}
                          </Text>
                          <View style={styles.commentItem}>
                            <Text>{comment.text}</Text>
                          </View>
                        </View>
                      </View>
                    )}
                  />
                  <TextInput
                    placeholder="Nhập bình luận..."
                    style={styles.commentInput}
                    value={commentText}
                    onChangeText={(text) => setCommentText(text)}
                    onSubmitEditing={() => {
                      handleComment(userPost.idUser, commentText);
                      setCommentText("");
                    }}
                  />
                </View>
              )}
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
  horizontalViewComment: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "white",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
  horizontalIcon: {
    flexDirection: "row",
    letterSpacing: 10,
    position: "relative",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  verticalView: {
    flexDirection: "column",
    margin: 10,
  },
  verticalViewComment: {
    flexDirection: "column",
    marginLeft: 10,
  },
  imageUser: {
    width: 40,
    height: 40,
  },
  userName: {
    marginLeft: 10,
    fontSize: 20,
  },
  userNameComment: {
    marginLeft: 10,
    fontSize: 14,
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
    marginLeft: 25,
  },
  commentSection: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  commentInput: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    height: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  commentItem: {
    backgroundColor: "#DCDCDC",
    marginVertical: 5,
    padding: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    width: 250,
  },
});

export default AllPostsScreen;
