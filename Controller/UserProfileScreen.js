import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";

const UserProfile = {
  name: "Khánh Pro Vip",
  image: require("../assets/homeavatar.png"),
};

const Data_Posts = [
  {
    id: 1,
    user: {
      name: "Admin",
      image: require("../assets/homeavatar.png"),
    },
    content: "kekeekekkeke",
  },
  {
    id: 1,
    user: {
      name: "Admin",
      image: require("../assets/homeavatar.png"),
    },
    content: "Keeekakakaka",
  },
];

const UserProfileScreen = () => {
  const [postList, setPostList] = useState(Data_Posts);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userProfile}>
        <Image source={UserProfile.image} style={styles.userImage} />
        <Text style={styles.userName}>{UserProfile.name}</Text>
      </View>
      <FlatList
        data={postList}
        renderItem={({ item: post }) => (
          <View style={styles.postContainer}>
            <View style={styles.horizontalView}>
              <Image source={post.user.image} style={styles.imageUser} />
              <Text style={styles.userName}>{post.user.name}</Text>
            </View>
            <Text style={styles.postContent}>{post.content}</Text>
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
  userProfile: {
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    marginLeft: 16,
    fontSize: 24,
  },
  postContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "white",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderRadius: 10,
  },
  horizontalView: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageUser: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postContent: {
    marginTop: 8,
    fontSize: 16,
    borderRadius: 10,
  },
});

export default UserProfileScreen;
