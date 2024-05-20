import { Text } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import GlobalStyle from "../style/GlobalStyle";

interface Props {
  fontType: string;
  fontSize: number;
  color?: string;
  children: React.ReactNode;
  additionalStyle?: { [key: string | number]: any };
}

const CustomText = ({ fontType, fontSize, color = GlobalStyle.colors.black, children, additionalStyle }: Props) => {
  const [fontsLoaded, fontError] = useFonts({
    PoppinsLight: require("../assets/font/Poppins-Light.ttf"),
    PoppinsRegular: require("../assets/font/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/font/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <Text style={{ fontFamily: fontType, color: color, fontSize: fontSize, ...additionalStyle }}>{children}</Text>;
};
export default CustomText;
