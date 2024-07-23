import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, { useAnimatedStyle, interpolate, Extrapolation, type SharedValue } from "react-native-reanimated";

import GlobalStyle from "../style/GlobalStyle";
import CustomText from "./CustomText";
import ONBOARDING_SHORTS from "../constants/ONBOARDING_SHORTS";

interface Props {
  text: string;
  scrollX: SharedValue<number>;
}

const SCREEN_WIDTH = Dimensions.get("screen").width;

const OnBoardingShorts = ({ text, scrollX }: Props) => {
  console.log(scrollX.value);
  return (
    <>
      {ONBOARDING_SHORTS.map((item, id) => {
        const animatedText = useAnimatedStyle(() => {
          const opacity = interpolate(
            scrollX.value,
            [(id - 1) * SCREEN_WIDTH, id * SCREEN_WIDTH, (id + 1) * SCREEN_WIDTH],
            [0, 1, 0],
            {
              extrapolateLeft: Extrapolation.CLAMP,
              extrapolateRight: Extrapolation.CLAMP,
            }
          );
          return {
            opacity: opacity,
          };
        });
        return (
          <Animated.View key={id} style={[styles.container, animatedText]}>
            <CustomText
              additionalStyle={{ textAlign: "center" }}
              fontType="PoppinsRegular"
              fontSize={30}
              color={GlobalStyle.colors.screen.background}
            >
              {text}
            </CustomText>
          </Animated.View>
        );
      })}
    </>
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
