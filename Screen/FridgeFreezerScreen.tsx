import React, { useEffect, useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useFonts } from "expo-font";

import { AppContext } from "../context/AppContext";
import GlobalStyle from "../style/GlobalStyle";
import FRIDGE_CATEGORIES from "../constants/FRIDGE_CATEGORY";
import Categories from "../components/Categories";
import CustomModal from "../components/Modal/CustomModal";

const Tab = createMaterialTopTabNavigator();

const FridgeFreezerScreen = ({ route }) => {
  const ctx = useContext(AppContext);

  const [fontsLoaded, fontError] = useFonts({
    PoppinsRegular: require("../assets/font/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    ctx.getCurrentTabCompartment(route.params.fromBottomTab);
  }, [route]);

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
          swipeEnabled: ctx.isSelectedToDelete ? false : true,
          tabBarScrollEnabled: true,
          tabBarPressColor: "transparent",
        }}
      >
        {FRIDGE_CATEGORIES.map((item) => (
          <Tab.Screen
            name={item.category}
            component={Categories}
            key={item.id}
            listeners={{
              tabPress: (e) => {
                ctx.isSelectedToDelete && e.preventDefault();
              },
            }}
          />
        ))}
      </Tab.Navigator>
      <CustomModal />
    </>
  );
};

export default FridgeFreezerScreen;
