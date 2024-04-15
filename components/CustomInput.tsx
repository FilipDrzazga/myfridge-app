import { TextInput, type InputModeOptions, type KeyboardTypeOptions } from "react-native";
import React from "react";

import GlobalStyle from "../style/GlobalStyle";
import CustomText from "./CustomText";

interface CustomInputProps {
  label: string;
  inputMode: InputModeOptions;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  additionalStyle: { [key: string | number]: any };
}

const CustomInput = ({ additionalStyle, label, inputMode, keyboardType = "default", maxLength }: CustomInputProps) => {
  return (
    <>
      <CustomText fontType="PoppinsRegular" fontSize={16}>
        {label}
      </CustomText>
      <TextInput
        maxLength={maxLength}
        keyboardType={keyboardType}
        autoCorrect={false}
        inputMode={inputMode}
        autoCapitalize="sentences"
        cursorColor={GlobalStyle.colors.black}
        style={{ ...additionalStyle }}
      />
    </>
  );
};

export default CustomInput;
