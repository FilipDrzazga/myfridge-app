import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Navigations from "./navigation/Navigations";
import AppContextProvider from "./context/AppContext";
import AuthContextProvider from "./context/AuthContex";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppContextProvider>
        <AuthContextProvider>
          <NavigationContainer>
            <Navigations />
          </NavigationContainer>
        </AuthContextProvider>
      </AppContextProvider>
    </GestureHandlerRootView>
  );
}
