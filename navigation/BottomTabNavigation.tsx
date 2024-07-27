import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import GlobalStyle from "../style/GlobalStyle";
import FridgeFreezerScreen from "../screen/FridgeFreezerScreen";
import SettingsScreen from "../screen/SettingsScreen";
import CustomHeaderTitle from "../components/CustomHeaderTitle";
import { FridgeSmall, FridgeLarge, FrezzerLarge, FrezzerSmall } from "../assets/icons";

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: GlobalStyle.colors.tbb.background,
          height: 100,
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: "transparent",
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: GlobalStyle.colors.tbb.iconsActive,
        tabBarInactiveTintColor: GlobalStyle.colors.tbb.iconsInActive,
        headerTitle: (props) => <CustomHeaderTitle name={props.children} />,
        headerStyle: {
          height: 120,
          elevation: 0,
          shadowColor: "transparent",
          backgroundColor: GlobalStyle.colors.tbt.background,
        },
      }}
      sceneContainerStyle={{ backgroundColor: GlobalStyle.colors.screen.background }}
      initialRouteName="fridge"
    >
      <Tab.Screen
        initialParams={{ fromBottomTab: "Fridge" }}
        name="fridge"
        component={FridgeFreezerScreen}
        options={{
          tabBarIcon: ({ color, focused }) => {
            return focused ? <FridgeLarge color={color} /> : <FridgeSmall color={color} />;
          },
        }}
      />
      <Tab.Screen
        initialParams={{ fromBottomTab: "Freezer" }}
        name="freezer"
        component={FridgeFreezerScreen}
        options={{
          tabBarIcon: ({ color, focused }) => {
            return focused ? <FrezzerLarge color={color} /> : <FrezzerSmall color={color} />;
          },
        }}
      />
      <Tab.Screen
        initialParams={{ fromBottomTab: "Settings" }}
        name="settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => {
            return focused ? (
              <Ionicons name="settings-outline" size={40} color={color} />
            ) : (
              <Ionicons name="settings-outline" size={24} color={color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation;
