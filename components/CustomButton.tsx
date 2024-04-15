import { Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import CustomText from "./CustomText";
import GlobalStyle from "../style/GlobalStyle";

interface CustomButtonProps {
  title?: string;
  fontSize?: number;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  onPress?: () => void;
  additionalStyle?: { [key: string | number]: any };
}

const CustomButton = ({
  onPress,
  title,
  fontSize = 16,
  iconName,
  iconSize,
  iconColor,
  additionalStyle,
}: CustomButtonProps) => {
  return (
    <Pressable onPress={onPress} style={{ ...additionalStyle }}>
      {title && (
        <CustomText fontType="PoppinsRegular" fontSize={fontSize}>
          {title}
        </CustomText>
      )}
      {iconName && <Ionicons name={iconName} size={iconSize} color={iconColor} />}
    </Pressable>
  );
};

export default CustomButton;
