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
import { WebView } from "react-native-webview";
import * as Sharing from "expo-sharing";
const WebViewScreen = () => {
  const shareToFacebook = async () => {
    const shared = await Sharing.shareAsync("https://example.com");

    if (shared.action === Sharing.ActionType.SHARED) {
      console.log("Shared successfully");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: "https://www.facebook.com" }}
        style={{ flex: 1 }}
      />
      <TouchableOpacity
        onPress={shareToFacebook}
        style={{ padding: 16, backgroundColor: "tomato" }}
      >
        <Text style={{ color: "white" }}>Chia sẻ lên Facebook</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WebViewScreen;
