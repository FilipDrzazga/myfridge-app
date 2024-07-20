import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import AuthScreen from "./screen/AuthScreen";

import AppContextProvider from "./context/AppContext";
import AuthStackNavigation from "./navigation/AuthStackNavigation";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppContextProvider>
        <NavigationContainer>
          <AuthStackNavigation />
          {/* <BottomTabNavigation /> */}
        </NavigationContainer>
      </AppContextProvider>
    </GestureHandlerRootView>
  );
}
