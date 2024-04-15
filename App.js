import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import FridgeFreezerScreen from "./Screen/FridgeFreezerScreen";
import SettingsScreen from "./Screen/SettingsScreen";
import CustomHeaderTitle from "./components/CustomHeaderTitle";
import { FridgeSmall, FridgeLarge, FrezzerLarge, FrezzerSmall } from "./assets/icons";
import GlobalStyle from "./style/GlobalStyle";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: GlobalStyle.colors.tbb.background,
              height: 80,
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
          initialRouteName="Fridge"
        >
          <Tab.Screen
            name="fridge"
            component={FridgeFreezerScreen}
            options={{
              tabBarIcon: ({ color, focused }) => {
                return focused ? <FridgeLarge color={color} /> : <FridgeSmall color={color} />;
              },
            }}
          />
          <Tab.Screen
            name="freezer"
            component={FridgeFreezerScreen}
            options={{
              tabBarIcon: ({ color, focused }) => {
                return focused ? <FrezzerLarge color={color} /> : <FrezzerSmall color={color} />;
              },
            }}
          />
          <Tab.Screen
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
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
