import { Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import CustomText from "./CustomText";

interface CustomButtonProps {
  title?: string;
  fontSize?: number;
  fontColor?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
  onPress?: () => void;
  formikOnChange?: (value: React.ChangeEvent<any> | string) => void;
  formikResetForm?: () => void;
  additionalStyle?: { [key: string | number]: any };
}

const CustomButton = ({
  onPress,
  formikOnChange,
  formikResetForm,
  title,
  fontSize = 16,
  fontColor,
  iconName,
  iconSize,
  iconColor,
  additionalStyle,
}: CustomButtonProps) => {
  const handleOnPress = () => {
    if (onPress && formikOnChange) {
      return [onPress(), formikOnChange(title)];
    }
    if (onPress && formikResetForm) {
      return [onPress(), formikResetForm()];
    }
    return onPress ? onPress() : formikOnChange(title);
  };

  return (
    <Pressable onPress={handleOnPress} style={{ ...additionalStyle }}>
      {title && (
        <CustomText fontType="PoppinsRegular" fontSize={fontSize} color={fontColor}>
          {title}
        </CustomText>
      )}
      {iconName && <Ionicons name={iconName} size={iconSize} color={iconColor} />}
    </Pressable>
  );
};

export default CustomButton;
