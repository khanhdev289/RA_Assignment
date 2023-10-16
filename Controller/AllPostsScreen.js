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
  Modal,
  Share,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

const POSTS_API_URL = "https://6526ac93917d673fd76cc515.mockapi.io/api/post";
const USERS_API_URL = "https://6526ac93917d673fd76cc515.mockapi.io/api/users";

const AllPostsScreen = ({ navigation }) => {
  const [inputText, setInputText] = useState("");
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [username, setUsername] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [userRole, setUserRole] = useState("");
  const [users, setUsers] = useState([]);
  const [idUser, setIdUser] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [deletePostId, setDeletePostId] = useState("");
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editedPostContent, setEditedPostContent] = useState("");
  const [editPostId, setEditPostId] = useState("");
  const [stories, setStories] = useState([
    {
      idStory: "1",
      imageStory:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/487.jpg",
      titleStory: "Câu chuyện 1",
    },
    {
      idStory: "2",
      imageStory:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/823.jpg",
      titleStory: "Câu chuyện 2",
    },
    {
      idStory: "3",
      imageStory:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/843.jpg",
      titleStory: "Câu chuyện 2",
    },
    {
      idStory: "4",
      imageStory:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/123.jpg",
      titleStory: "Câu chuyện 2",
    },
    {
      idStory: "5",
      imageStory:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/523.jpg",
      titleStory: "Câu chuyện 2",
    },
  ]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const handleOpenOptionsModal = (postId) => {
    setDeletePostId(postId);
    setShowOptionsModal(true);
  };
  const handleOpenEditModal = (postId) => {
    console.log(" postId = " + postId);
    setEditPostId(postId);
    setEditModalVisible(true);
    setEditedPostContent("");
  };
  const handleCloseEditModal = () => {
    setEditModalVisible(false);
    setEditedPostContent("");
  };

  const handleCloseOptionsModal = () => {
    setShowOptionsModal(false);
  };
  useEffect(() => {
    // Lấy dữ liệu từ API bảng posts
    const fetchPosts = async () => {
      try {
        const response = await axios.get(POSTS_API_URL);
        setPosts(response.data);
        // console.log(response.data);

        const username = await AsyncStorage.getItem("userName");
        if (username) {
          setUsername(username);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Lỗi khi tải dữ liệu bài đăng: ", error);
      }
    };

    // Lấy dữ liệu từ API bảng users
    const fetchUsers = async () => {
      try {
        const response = await axios.get(USERS_API_URL);
        setUsers(response.data);
        // console.log(response.data);
        const userID = await AsyncStorage.getItem("idUser");
        if (userID) {
          setIdUser(userID);
        }

        const avatar = await AsyncStorage.getItem("userAvatar");
        if (avatar) {
          setUserAvatar(avatar);
        }

        const role = await AsyncStorage.getItem("userRole");
        if (role) {
          setUserRole(role);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Lỗi khi tải dữ liệu người dùng: ", error);
      }
    };
    fetchPosts();
    fetchUsers();
  }, []);
  const toggleHeart = async (postId) => {
    // Tìm bài đăng cần cập nhật
    const postToUpdate = posts.find((post) => post.idPost === postId);

    if (postToUpdate) {
      const isLiked = postToUpdate.likedBy.includes(idUser);

      try {
        const updatedLikedBy = isLiked
          ? postToUpdate.likedBy.filter((id) => id !== idUser)
          : [...postToUpdate.likedBy, idUser];

        const response = await axios.put(
          `${POSTS_API_URL}/${postToUpdate.idPost}`,
          {
            likedBy: updatedLikedBy,
          }
        );

        if (response.status === 200) {
          const updatedPosts = posts.map((post) => {
            if (post.idPost === postId) {
              return {
                ...post,
                likedBy: updatedLikedBy,
              };
            }
            return post;
          });

          setPosts(updatedPosts);
        } else {
          console.error("Lỗi khi cập nhật danh sách likedBy");
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật danh sách likedBy: ", error);
      }
    }
  };
  const handleSaveEditedPost = async () => {
    console.log(" " + editPostId);
    if (editedPostContent.trim() === "") {
      return;
    }

    const postToUpdate = posts.find((post) => post.idPost === editPostId);

    if (!postToUpdate) {
      console.error("Bài đăng không tồn tại.");
      console.log(postToUpdate);
      handleCloseEditModal();
      return;
    }

    try {
      const response = await axios.put(`${POSTS_API_URL}/${editPostId}`, {
        content: editedPostContent,
      });

      if (response.status === 200) {
        const updatedPosts = posts.map((post) => {
          if (post.idPost === editPostId) {
            return {
              ...post,
              content: editedPostContent,
            };
          }
          return post;
        });
        setPosts(updatedPosts);
        handleCloseEditModal();
      } else {
        console.error("Lỗi khi cập nhật bài đăng");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật bài đăng: ", error);
    }
  };

  const handleDeletePost = async (postId) => {
    const postToDelete = posts.find((post) => post.idPost === postId);

    if (!postToDelete) {
      console.error("Bài đăng không tồn tại.");
      return;
    }

    try {
      const response = await axios.delete(`${POSTS_API_URL}/${postId}`);

      if (response.status === 200) {
        const updatedPosts = posts.filter((post) => post.idPost !== postId);
        setPosts(updatedPosts);
        handleCloseOptionsModal();
      } else {
        console.error("Lỗi khi xoá bài đăng");
      }
    } catch (error) {
      console.error("Lỗi khi xoá bài đăng: ", error);
    }
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

  const handleComment = (postId, text) => {
    if (text.trim() === "") {
      return;
    }
    const newComment = {
      text,
      user: {
        id: idUser,
        name: username,
        avatar: userAvatar,
      },
    };
    const newComments = { ...comments };
    if (!newComments[postId]) {
      newComments[postId] = [newComment];
    } else {
      newComments[postId].push(newComment);
    }
    setComments(newComments);
    setCommentText("");
  };

  const handlePost = async () => {
    if (inputText.trim() === "") {
      return;
    }

    const newUserPost = {
      idUser: idUser,
      name: username,
      image: userAvatar,
      imagePost: selectedImage,
      likedBy: [],
      content: inputText,
      heart: false,
      isCommenting: false,
    };

    try {
      const response = await axios.post(POSTS_API_URL, newUserPost);

      if (response.status === 201) {
        setPosts((prevPosts) => [...prevPosts, response.data]);
        setInputText("");
        removeSelectedImage();
      } else {
        console.error("Lỗi khi tạo bài đăng mới");
      }
    } catch (error) {
      console.error("Lỗi khi tạo bài đăng mới: ", error);
    }
  };
  const openImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
      }
    }
  };
  const removeSelectedImage = () => {
    setSelectedImage(null);
  };
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

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="tomato" />
      ) : (
        <React.Fragment>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: userAvatar }}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 50,
                  margin: 15,
                  borderWidth: 3,
                  borderColor: "tomato",
                }}
              />
              <TouchableOpacity
                onPress={removeSelectedImage}
                style={{ position: "absolute", left: 65, bottom: 10 }}
              >
                <Ionicons name="add-circle" size={24} color="red" />
              </TouchableOpacity>
            </View>

            <FlatList
              horizontal
              data={stories}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View>
                  <TouchableOpacity>
                    <Image
                      source={{ uri: item.imageStory }}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        margin: 15,
                        borderWidth: 3,
                        borderColor: "tomato",
                      }}
                    />
                  </TouchableOpacity>
                  {index === currentStoryIndex && (
                    <View style={styles.storyProgress}>
                      <View
                        style={{ width: "auto", backgroundColor: "tomato" }}
                      ></View>
                    </View>
                  )}
                </View>
              )}
            />
          </View>

          {userRole === "admin" && (
            <View style={styles.postContainer}>
              <View style={{ flexDirection: "row" }}>
                <Image source={{ uri: userAvatar }} style={styles.imageUser} />
              </View>
              <View style={{ flex: 1, flexDirection: "col" }}>
                <TextInput
                  placeholder="Bạn đang nghĩ gì?"
                  style={styles.postInput}
                  value={inputText}
                  onChangeText={(text) => setInputText(text)}
                />

                {selectedImage && (
                  <View style={{ flexDirection: "col" }}>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={{ uri: selectedImage }}
                        style={{
                          width: 250,
                          height: 250,
                          marginTop: 10,
                          marginLeft: 10,
                        }}
                      />
                      <TouchableOpacity onPress={removeSelectedImage}>
                        <Ionicons name="close-circle" size={24} color="red" />
                      </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <TouchableOpacity
                        onPress={handlePost}
                        style={styles.viewPostButton}
                      >
                        <View>
                          <Text style={styles.postButtonText}>Đăng</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
              <View>
                <TouchableOpacity onPress={openImagePicker}>
                  <Ionicons name="camera-outline" size={32} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          <FlatList
            data={posts.slice().reverse()}
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
                    {userRole === "admin" && (
                      <View
                        style={{
                          top: 0,
                          right: 0,
                          position: "absolute",
                          flexDirection: "row",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => handleOpenEditModal(userPost.idPost)}
                        >
                          <Ionicons
                            name="color-wand-outline"
                            size={20}
                            color="black"
                            style={{ marginRight: 15 }}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleOpenOptionsModal}>
                          <Ionicons
                            name="close-circle-outline"
                            size={20}
                            color="black"
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={isEditModalVisible}
                      onRequestClose={handleCloseEditModal}
                    >
                      <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                          <TextInput
                            placeholder="Sửa nội dung bài viết..."
                            style={styles.postInput}
                            value={editedPostContent}
                            onChangeText={(text) => setEditedPostContent(text)}
                          />
                          <View style={styles.verticalView}>
                            <TouchableOpacity
                              onPress={() =>
                                handleSaveEditedPost(userPost.idPost)
                              }
                            >
                              <Text style={styles.optionText}>Lưu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCloseEditModal}>
                              <Text style={styles.optionText}>Thoát</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </Modal>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={showOptionsModal}
                      onRequestClose={handleCloseOptionsModal}
                    >
                      <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                          <Text style={styles.optionText}>
                            Bạn có muốn xoá bài viết không ?
                          </Text>
                          <TouchableOpacity
                            onPress={() => handleDeletePost(userPost.idPost)}
                          >
                            <Text style={styles.optionText}>Có</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={handleCloseOptionsModal}>
                            <Text style={styles.optionText}>Hủy</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  </View>
                  <View style={styles.cell}>
                    <Text>{userPost.content}</Text>
                    {userPost.imagePost != null ? (
                      <Image
                        source={{ uri: userPost.imagePost }}
                        style={{
                          width: "100%",
                          height: 350,
                          marginTop: 10,
                          borderRadius: 10,
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
                        onPress={() => toggleComment(userPost)}
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
                    {userPost.isCommenting && (
                      <View style={styles.commentSection}>
                        <FlatList
                          data={comments[userPost.idPost]}
                          renderItem={({ item: comment }) => (
                            <View style={styles.horizontalViewComment}>
                              <Image
                                source={{ uri: comment.user.avatar }}
                                style={styles.imageUser}
                              />
                              <View style={styles.verticalViewComment}>
                                <Text style={styles.userNameComment}>
                                  {comment.user.name}
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
                            handleComment(userPost.idPost, commentText);
                          }}
                        />
                      </View>
                    )}
                  </View>
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
  userCell: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 20,
  },
  cell: {
    backgroundColor: "white",
    margin: 10,
    paddingLeft: 10,
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
    borderRadius: 20,
  },
  userName: {
    marginLeft: 10,
    fontSize: 20,
    alignItems: "center",
  },
  userNameComment: {
    marginLeft: 10,
    fontSize: 14,
  },
  postContainer: {
    marginTop: 5,
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    height: "auto",
  },
  postInput: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 16,
  },
  viewPostButton: {
    backgroundColor: "tomato",
    // position: "absolute",
    // bottom: 10,
    right: 10,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 40,
    marginTop: 15,
    color: "white",
  },
  postButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
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
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    marginVertical: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});

export default AllPostsScreen;
