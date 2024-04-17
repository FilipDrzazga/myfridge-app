import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useFonts } from "expo-font";

import FRIDGE_CATEGORIES from "../constants/FRIDGE_CATEGORY";
import Categories from "../components/Categories";
import GlobalStyle from "../style/GlobalStyle";
import CustomModal from "../components/Modal/CustomModal";

const Tab = createMaterialTopTabNavigator();

const FridgeFreezerScreen = () => {
  const [fontsLoaded, fontError] = useFonts({
    PoppinsRegular: require("../assets/font/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: GlobalStyle.colors.screen.background }}
        screenOptions={{
          tabBarStyle: {
            shadowOpacity: 0,
            shadowColor: "transparent",
            backgroundColor: GlobalStyle.colors.tbt.background,
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
            backgroundColor: GlobalStyle.colors.indicator.color,
          },
          tabBarScrollEnabled: true,
          tabBarPressColor: "transparent",
        }}
      >
        {FRIDGE_CATEGORIES.map((item) => (
          <Tab.Screen name={item.category} component={Categories} key={item.id} />
        ))}
      </Tab.Navigator>
      <CustomModal />
    </>
  );
};

export default FridgeFreezerScreen;
