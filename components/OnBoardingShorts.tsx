import React from "react";
import { StyleSheet, Dimensions, type ListRenderItemInfo } from "react-native";
import Animated, { useAnimatedStyle, interpolate, Extrapolation, type SharedValue } from "react-native-reanimated";

import GlobalStyle from "../style/GlobalStyle";
import CustomText from "./CustomText";

interface Props {
  item: ListRenderItemInfo<{
    short: string;
    id: number;
  }>;
  scrollX: SharedValue<number>;
}

const SCREEN_WIDTH = Dimensions.get("screen").width;

const OnBoardingShorts = ({ item, scrollX }: Props) => {
  const animatedText = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      [(item.item.id - 1) * SCREEN_WIDTH, item.item.id * SCREEN_WIDTH, (item.item.id + 1) * SCREEN_WIDTH],
      [0, 1, 0],
      { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP }
    );
    return {
      opacity: opacity,
    };
  }, []);

  return (
    <Animated.View key={item.item.id} style={[styles.container, animatedText]}>
      <CustomText
        additionalStyle={{ textAlign: "center" }}
        fontType="PoppinsRegular"
        fontSize={30}
        color={GlobalStyle.colors.screen.background}
      >
        {item.item.short}
      </CustomText>
    </Animated.View>
  );
  // return (
  //   <>
  //     {ONBOARDING_SHORTS.map((item, id) => {
  //       const animatedText = useAnimatedStyle(() => {
  //         const opacity = interpolate(
  //           scrollX.value,
  //           [(id - 1) * SCREEN_WIDTH, id * SCREEN_WIDTH, (id + 1) * SCREEN_WIDTH],
  //           [0, 1, 0],
  //           { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP }
  //         );
  //         return {
  //           opacity: opacity,
  //         };
  //       });
  //       return (
  //         <Animated.View key={id} style={[styles.container, animatedText]}>
  //           <CustomText
  //             additionalStyle={{ textAlign: "center" }}
  //             fontType="PoppinsRegular"
  //             fontSize={30}
  //             color={GlobalStyle.colors.screen.background}
  //           >
  //             {item.short}
  //           </CustomText>
  //         </Animated.View>
  //       );
  //     })}
  //   </>
  // );
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
