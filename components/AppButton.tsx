import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import GlobalStyle from "../style/GlobalStyle";

const AppButton = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Ionicons name="add" size={50} color={GlobalStyle.colors.button.icon} />
      </Pressable>
    </View>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: GlobalStyle.colors.button.background,
  },
});
