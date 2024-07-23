import React from "react";
import { Text } from "react-native";
import { useFonts } from "expo-font";

import GlobalStyle from "../style/GlobalStyle";
import { FunctionBody } from "typescript";

interface Props {
  onPress?: () => void;
  fontType: string;
  fontSize: number;
  color?: string;
  children: React.ReactNode;
  additionalStyle?: { [key: string | number]: any };
}

const CustomText = ({
  onPress,
  fontType,
  fontSize,
  color = GlobalStyle.colors.black,
  children,
  additionalStyle,
}: Props) => {
  const [fontsLoaded, fontError] = useFonts({
    PoppinsLight: require("../assets/font/Poppins-Light.ttf"),
    PoppinsRegular: require("../assets/font/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/font/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Text
      onPress={() => onPress()}
      style={{ fontFamily: fontType, color: color, fontSize: fontSize, ...additionalStyle }}
    >
      {children}
    </Text>
  );
};
export default CustomText;
