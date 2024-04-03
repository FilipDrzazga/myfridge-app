import { View, Text } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

interface Props {
  type: string;
  children: React.ReactNode;
}

const AppText = ({ type, children }: Props) => {
  const [fontsLoaded, fontError] = useFonts({
    "DMSans-Thin": require("./assets/font/DMSans-Thin"),
    "DMSans-Light": require("./assets/font/DMSans-Light"),
    "DMSans-Regular": require("./assets/font/DMSans-Regular"),
    "DMSans-Meduim": require("./assets/font/DMSans-Meduim"),
    "DMSans-SemiBold": require("./assets/font/DMSans-SemiBold"),
    "DMSans-Bold": require("./assets/font/DMSans-Bold"),
    "DMSans-Black": require("./assets/font/DMSans-Black"),
    "DMSans-ExtraBold": require("./assets/font/DMSans-ExtraBold"),
  });

  return (
    <View>
      <Text style={{ fontFamily: type }}>{children}</Text>
    </View>
  );
};

export default AppText;
