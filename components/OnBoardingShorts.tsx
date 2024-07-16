import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import GlobalStyle from "../style/GlobalStyle";
import CustomText from "./CustomText";

interface Props {
  text: string;
}

const SCREEN_WIDTH = Dimensions.get("screen").width;

const OnBoardingShorts = ({ text }: Props) => {
  return (
    <View style={styles.container}>
      <CustomText
        additionalStyle={{ textAlign: "center" }}
        fontType="PoppinsRegular"
        fontSize={25}
        color={GlobalStyle.colors.screen.background}
      >
        {text}
      </CustomText>
    </View>
  );
};

export default OnBoardingShorts;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  text: {
    color: GlobalStyle.colors.screen.background,
  },
});
