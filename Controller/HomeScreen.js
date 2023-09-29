// HomeScreen.js
import React from "react";
import { View, Text, Button, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import ListUserFollowingScreen from "./ListUserFollowingScreen";
import AllPostsScreen from "./AllPostsScreen";
import FollowingPostsScreen from "./FollowingPostsScreen";
import SetingScreen from "./SettingScreen";
import Notification from "./Notification";
import LoginScreen from "./LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();

const HomeScreen = ({}) => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "AllPostsScreen") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "FollowingPostsScreen") {
              iconName = focused ? "list-circle" : "list-circle-outline";
            } else if (route.name === "ListUserFollowingScreen") {
              iconName = focused ? "people-circle" : "people-circle-outline";
            } else if (route.name === "Notification") {
              iconName = focused
                ? "notifications-sharp"
                : "notifications-outline";
            } else if (route.name === "SetingScreen") {
              iconName = focused ? "settings-sharp" : "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="AllPostsScreen"
          component={AllPostsScreen}
          options={{
            headerShown: true,
            tabBarLabel: "Trang Chủ",
            title: "Tất cả bài viết",
          }}
        />
        <Tab.Screen
          name="FollowingPostsScreen"
          component={FollowingPostsScreen}
          options={{
            headerShown: true,
            tabBarLabel: "Theo Dõi",
            title: "Bài viết bạn bè",
          }}
        />
        <Tab.Screen
          name="ListUserFollowingScreen"
          component={ListUserFollowingScreen}
          options={{
            headerShown: true,
            tabBarLabel: "Bạn Bè",
            title: "Danh sách bạn bè",
          }}
        />
        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{
            headerShown: true,
            tabBarLabel: " Thông báo",
            title: "Thông báo",
          }}
        />
        <Tab.Screen
          name="SetingScreen"
          component={SetingScreen}
          options={{
            headerShown: true,
            tabBarLabel: "Cài Đặt",
            title: "Tài khoản",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default HomeScreen;
