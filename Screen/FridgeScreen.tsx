import { StyleSheet, View, Text } from "react-native";
import React from "react";

const FridgeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>FridgeScreen</Text>
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
