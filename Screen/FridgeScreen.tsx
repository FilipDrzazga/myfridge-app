import { StyleSheet, View, Text } from "react-native";
import React from "react";
import AppText from "../components/AppText";

const FridgeScreen = () => {
  return (
    <View style={styles.container}>
      <AppText type="DMSansBold">FridgeScreen</AppText>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default FridgeScreen;
