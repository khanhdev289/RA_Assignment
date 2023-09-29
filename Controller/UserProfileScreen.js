import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const UserProfile = {
  name: "John Doe",
  image: require("../assets/homeavatar.png"),
};

const Data_Following = [
  {
    idUser: 1,
    user: {
      name: "User1",
      image: require("../assets/homeavatar.png"),
    },
  },
  {
    idUser: 2,
    user: {
      name: "User2",
      image: require("../assets/homeavatar.png"),
    },
  },
  {
    idUser: 3,
    user: {
      name: "User3",
      image: require("../assets/homeavatar.png"),
    },
  },
];

const UserProfileScreen = () => {
  const [followingList, setFollowingList] = useState(Data_Following);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userProfile}>
        <Image source={UserProfile.image} style={styles.userImage} />
        <Text style={styles.userName}>{UserProfile.name}</Text>
      </View>
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
              style={styles.followButton}
              onPress={() => toggleFollowing(followingUser.user.idUser)}
            >
              <Text style={styles.followButtonText}>Theo dõi</Text>
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
    backgroundColor: "white",
  },
  userProfile: {
    flexDirection: "row",
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
  userCell: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 16,
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
  followButton: {
    backgroundColor: "blue",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  followButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default UserProfileScreen;
