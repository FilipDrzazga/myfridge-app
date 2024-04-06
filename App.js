import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import FridgeAndFreezerScreen from "./Screen/FridgeAndFreezerScreen";
import SettingsScreen from "./Screen/SettingsScreen";
import HeaderTitle from "./components/HeaderTitle";
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
              backgroundColor: GlobalStyle.color.white100,
              height: 80,
              borderTopWidth: 0,
              elevation: 0,
              shadowColor: "transparent",
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: GlobalStyle.color.black100,
            tabBarInactiveTintColor: GlobalStyle.color.gray100,
            headerTitle: (props) => <HeaderTitle name={props.children} />,
            headerStyle: {
              height: 120,
              elevation: 0,
              shadowColor: "transparent",
            },
          }}
          sceneContainerStyle={{ backgroundColor: GlobalStyle.color.screenBackgroundColor }}
          initialRouteName="Fridge"
        >
          <Tab.Screen
            name="fridge"
            component={FridgeAndFreezerScreen}
            options={{
              tabBarIcon: ({ color, focused }) => {
                return focused ? <FridgeLarge color={color} /> : <FridgeSmall color={color} />;
              },
            }}
          />
          <Tab.Screen
            name="freezer"
            component={FridgeAndFreezerScreen}
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
