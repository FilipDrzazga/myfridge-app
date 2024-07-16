import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import AuthScreen from "./screen/AuthScreen";

import AppContextProvider from "./context/AppContext";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppContextProvider>
        <AuthScreen />
        {/* <NavigationContainer>
          <BottomTabNavigation />
        </NavigationContainer> */}
      </AppContextProvider>
    </GestureHandlerRootView>
  );
}
