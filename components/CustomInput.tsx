import { TextInput, type InputModeOptions, type KeyboardTypeOptions } from "react-native";
import React from "react";

import GlobalStyle from "../style/GlobalStyle";
import CustomText from "./CustomText";

interface CustomInputProps {
  label: string;
  secureTextEntry?: boolean;
  labelColor?: string;
  inputValue?: string;
  inputMode: InputModeOptions;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  formikOnChange?: (value: React.ChangeEvent<any> | string) => void;
  additionalStyle: { [key: string | number]: any };
  additionalTextStyle?: { [key: string | number]: any };
  cursorStyle?: string;
  textFontSize?: number;
  textFontType?: string;
}

const CustomInput = ({
  additionalStyle,
  additionalTextStyle,
  cursorStyle = GlobalStyle.colors.black,
  secureTextEntry = false,
  label,
  labelColor,
  inputValue,
  inputMode,
  keyboardType = "default",
  maxLength,
  textFontSize = 16,
  textFontType = "PoppinsRegular",
  formikOnChange,
}: CustomInputProps) => {
  return (
    <>
      <CustomText
        fontType={textFontType}
        fontSize={textFontSize}
        color={labelColor}
        additionalStyle={additionalTextStyle}
      >
        {label}
      </CustomText>
      <TextInput
        value={inputValue}
        secureTextEntry={secureTextEntry}
        onChangeText={formikOnChange}
        maxLength={maxLength}
        keyboardType={keyboardType}
        autoCorrect={false}
        inputMode={inputMode}
        autoCapitalize="sentences"
        cursorColor={cursorStyle}
        style={{ ...additionalStyle }}
      />
    </>
  );
};

export default CustomInput;
