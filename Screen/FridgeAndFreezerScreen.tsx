import { StyleSheet } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useFonts } from "expo-font";

import FRIDGE_CATEGORIES from "../constants/FRIDGE_CATEGORY";
import Categories from "../components/Categories";

const Tab = createMaterialTopTabNavigator();

const FridgeAndFreezerScreen = () => {
  const [fontsLoaded, fontError] = useFonts({
    PoppinsRegular: require("../assets/font/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          marginTop: 20,
          shadowOpacity: 0,
          shadowColor: "transparent",
        },
        tabBarItemStyle: {
          width: 130,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: "PoppinsRegular",
          textTransform: "none",
        },
        tabBarIndicatorStyle: {
          width: 20,
          height: 5,
          left: (130 - 20) / 2,
          borderRadius: 5,
          backgroundColor: "black",
        },
        tabBarScrollEnabled: true,
        tabBarPressColor: "transparent",
      }}
    >
      {FRIDGE_CATEGORIES.map((item) => (
        <Tab.Screen name={item.category} component={Categories} key={item.id} />
      ))}
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default FridgeAndFreezerScreen;
