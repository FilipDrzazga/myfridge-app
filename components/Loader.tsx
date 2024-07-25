import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withDelay,
  withSequence,
} from "react-native-reanimated";
import GlobalStyle from "../style/GlobalStyle";

const Loader = () => {
  const translateYOne = useSharedValue(0);
  const translateYTwo = useSharedValue(0);
  const translateYThree = useSharedValue(0);

  useEffect(() => {
    translateYOne.value = withRepeat(
      withSequence(withTiming(-2, { duration: 250 }), withTiming(2, { duration: 250 })),
      0,
      true
    );
    translateYTwo.value = withDelay(
      50,
      withRepeat(withSequence(withTiming(-2, { duration: 250 }), withTiming(2, { duration: 250 })), 0, true)
    );
    translateYThree.value = withDelay(
      100,
      withRepeat(withSequence(withTiming(-2, { duration: 250 }), withTiming(2, { duration: 250 })), 0, true)
    );
  }, []);

  const animatedDotsOne = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateYOne.value }],
    };
  });
  const animatedDotsTwo = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateYTwo.value }],
    };
  });
  const animatedDotsThree = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateYThree.value }],
    };
  });

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={[styles.first, animatedDotsOne]}></Animated.View>
      <Animated.View style={[styles.second, animatedDotsTwo]}></Animated.View>
      <Animated.View style={[styles.third, animatedDotsThree]}></Animated.View>
    </Animated.View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 40,
    height: 10,
  },
  first: { backgroundColor: GlobalStyle.colors.black, width: 10, height: 10, borderRadius: 50 },
  second: { backgroundColor: GlobalStyle.colors.black, width: 10, height: 10, borderRadius: 50 },
  third: { backgroundColor: GlobalStyle.colors.black, width: 10, height: 10, borderRadius: 50 },
});
