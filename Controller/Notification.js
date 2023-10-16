import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const POSTS_API_URL = "https://6526ac93917d673fd76cc515.mockapi.io/api/post";
const USERS_API_URL = "https://6526ac93917d673fd76cc515.mockapi.io/api/users";

function Notification() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userID = await AsyncStorage.getItem("idUser");

        const response = await axios.get(POSTS_API_URL);
        const response1 = await axios.get(USERS_API_URL);

        const currentUser = response1.data.find(
          (user) => user.idUser === userID
        );
        if (currentUser) {
          const followingIDs = currentUser.listfollow;
          console.log("id gồm", followingIDs);
          const filteredData = response.data.filter((item) =>
            followingIDs.includes(item.idUser)
          );
          console.log("Bài đăng của các người đang theo dõi:", filteredData);
          setData(filteredData);
        }
      } catch (error) {
        console.error("Lỗi " + error);
      }
    };
    // const interval = setInterval(() => {
    //   fetchPosts();
    // }, 10000);

    // return () => clearInterval(interval);
    fetchPosts();
  }, []);

  return (
    <View style={{ width: "100%", height: 740 }}>
      <FlatList
        data={data}
        renderItem={({ item: userPost }) => {
          return (
            <TouchableOpacity style={{ alignItems: "center" }}>
              <View style={styles.stylepost}>
                <Image
                  style={styles.imgavtar}
                  source={{ uri: userPost.image }}
                />
                <Text style={styles.textname}>{userPost.name}</Text>
                <Text style={{ fontSize: 18, marginTop: 18 }}>
                  {" "}
                  đã đăng 1 bài mới
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginStart: 20,
  },
  imgavtar: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginStart: 10,
    marginEnd: 20,
    marginBottom: 10,
  },
  stylepost: {
    backgroundColor: "white",
    width: "90%",
    height: 80,
    borderRadius: 10,
    flexDirection: "row",
    paddingTop: 5,
    paddingLeft: 10,
    marginTop: 20,
  },
  textname: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 18,
  },
});

export default Notification;
