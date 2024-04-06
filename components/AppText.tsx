import { Text } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

interface Props {
  fontType: string;
  fontSize: number;
  color?: string;
  children: React.ReactNode;
}

const AppText = ({ fontType, fontSize, color, children }: Props) => {
  const [fontsLoaded, fontError] = useFonts({
    PoppinsLight: require("../assets/font/Poppins-Light.ttf"),
    PoppinsRegular: require("../assets/font/Poppins-Regular.ttf"),
    PoppinsBlack: require("../assets/font/Poppins-Black.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <Text style={{ fontFamily: fontType, color: color, fontSize: fontSize }}>{children}</Text>;
};

export default AppText;
