import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet } from "react-native";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate fetching notifications from an API or storage
    const fetchedNotifications = [
      { id: 1, message: "Có bài viết mới từ User1" },
      { id: 2, message: "User2 đã theo dõi bạn" },
      // Add more notifications here
    ];

    setNotifications(fetchedNotifications);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>{item.message}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notificationItem: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    padding: 16,
    margin: 10,
    borderRadius: 10,
  },
  notificationText: {
    fontSize: 16,
  },
});

export default Notification;
