import { Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import CustomText from "./CustomText";
import GlobalStyle from "../style/GlobalStyle";

interface CustomButtonProps {
  title?: string;
  fontSize?: number;
  icon?: boolean;
  additionalStyle?: { [key: string | number]: any };
}

const CustomButton = ({ title, fontSize = 16, icon, additionalStyle }: CustomButtonProps) => {
  return (
    <Pressable style={{ ...additionalStyle }}>
      {title && (
        <CustomText fontType="PoppinsRegular" fontSize={fontSize}>
          {title}
        </CustomText>
      )}
      {icon && <Ionicons name="close-outline" size={45} color={GlobalStyle.colors.black} />}
    </Pressable>
  );
};

export default CustomButton;
