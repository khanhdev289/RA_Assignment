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

const ListUserFollowingScreen = () => {
  const [followingList, setFollowingList] = useState(Data_Following);

  const toggleFollowing = (userId) => {
    const updatedFollowingList = followingList.map((user) => {
      if (user.user.idUser === userId) {
        // So sánh trực tiếp với userId
        return {
          ...user,
          isFollowing: !user.isFollowing,
        };
      }
      return user;
    });

    setFollowingList(updatedFollowingList);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={followingList}
        renderItem={({ item: followingUser }) => (
          <View style={styles.userCell}>
            <View style={styles.horizontalView}>
              <Image
                source={followingUser.user.image}
                style={styles.imageUser}
              />
              <Text style={styles.userName}>{followingUser.user.name}</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.followButton,
                {
                  backgroundColor: followingUser.isFollowing ? "gray" : "green",
                },
              ]}
              onPress={() => toggleFollowing(followingUser.user.idUser)}
            >
              <Text style={styles.followButtonText}>
                {followingUser.isFollowing ? "Đã theo dõi" : "Theo dõi"}
              </Text>
            </TouchableOpacity>
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
