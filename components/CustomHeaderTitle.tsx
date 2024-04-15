import { StyleSheet, View } from "react-native";
import React from "react";
import CustomText from "./CustomText";

interface Props {
  name: string;
}

const CustomHeaderTitle = ({ name }: Props) => {
  return (
    <View>
      <CustomText fontType="PoppinsRegular" fontSize={40}>
        <CustomText fontType="PoppinsBold" fontSize={40}>
          .
        </CustomText>
        {name}
      </CustomText>
    </View>
  );
};

export default CustomHeaderTitle;

const styles = StyleSheet.create({});
