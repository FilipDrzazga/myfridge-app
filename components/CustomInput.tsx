import { TextInput, type InputModeOptions, type KeyboardTypeOptions } from "react-native";
import React from "react";

import GlobalStyle from "../style/GlobalStyle";
import CustomText from "./CustomText";

interface CustomInputProps {
  label: string;
  inputValue?: string;
  inputMode: InputModeOptions;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  formikOnChange?: (value: React.ChangeEvent<any> | string) => void;
  additionalStyle: { [key: string | number]: any };
}

const CustomInput = ({
  additionalStyle,
  label,
  inputValue,
  inputMode,
  keyboardType = "default",
  maxLength,
  formikOnChange,
}: CustomInputProps) => {
  return (
    <>
      <CustomText fontType="PoppinsRegular" fontSize={16}>
        {label}
      </CustomText>
      <TextInput
        placeholder={inputValue}
        onChangeText={formikOnChange}
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
