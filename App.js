import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FridgeScreen from "./Screen/FridgeScreen";
import { FridgeSmall, FridgeLarge, FrezzerLarge, FrezzerSmall } from "./assets/icons";
import GlobalStyle from "./style/GlobalStyle";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: GlobalStyle.color.black100,
            height: 80,
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: GlobalStyle.color.white100,
          tabBarInactiveTintColor: GlobalStyle.color.gray100,
        }}
        initialRouteName="Fridge"
      >
        <Tab.Screen
          name="Fridge"
          component={FridgeScreen}
          options={{
            tabBarIcon: ({ color, focused }) => {
              return focused ? <FridgeLarge color={color} /> : <FridgeSmall color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Freezer"
          component={FridgeScreen}
          options={{
            tabBarIcon: ({ color, focused }) => {
              return focused ? <FrezzerLarge color={color} /> : <FrezzerSmall color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Settings"
          component={FridgeScreen}
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
  );
}
