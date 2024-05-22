import React, { useCallback, useEffect } from "react";
import { type ColorValue, StyleSheet, View, TextInput } from "react-native";

import Svg, { Circle, G } from "react-native-svg";
import Animated, {
  processColor,
  createAnimatedPropAdapter,
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useFonts } from "expo-font";
import GlobalStyle from "../style/GlobalStyle";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(TextInput);
const adapter = createAnimatedPropAdapter(
  (props) => {
    if (Object.keys(props).includes("stroke")) {
      props.stroke = { type: 0, payload: processColor(props.stroke as ColorValue) };
    }
  },
  ["stroke"]
);
const radius = 40;
const halfCircle = radius + 7;
const circleCircumference = 2 * Math.PI * radius;

type Props = {
  boughtDate: string | number;
  expiryDate: string | number;
};

const CircleProgressBar = ({ boughtDate, expiryDate }: Props) => {
  const [fontsLoaded, fontError] = useFonts({
    PoppinsRegular: require("../assets/font/Poppins-Regular.ttf"),
  });
  const circleProgress = useSharedValue(0);

  const animatedCircleProps = useAnimatedProps(
    () => {
      const progressStrokeDashoffset = circleCircumference - circleProgress.value * circleCircumference;
      return {
        strokeDashoffset: progressStrokeDashoffset,
        stroke: interpolateColor(
          circleProgress.value,
          [0, 0.5, 1],
          ["rgb(250,90,50)", "rgb(248,171,28)", GlobalStyle.colors.green]
        ),
      };
    },
    [boughtDate, expiryDate],
    adapter
  );

  const animatedTextProps = useAnimatedProps(() => {
    return {
      text: `${Math.floor(circleProgress.value * 100).toString()}%`,
    };
  });

  const calcProgress = useCallback(() => {
    const purchaseDateProps = new Date(+boughtDate).getTime();
    const expiryDateProps = new Date(+expiryDate).getTime();
    const currentDate = new Date().getTime();

    const totalDuration = expiryDateProps - purchaseDateProps;

    const remainingDuration = +expiryDateProps - +currentDate;
    const progress = Math.min(remainingDuration / totalDuration, 1);
    return progress;
  }, [boughtDate, expiryDate]);

  useEffect(() => {
    circleProgress.value = withTiming(calcProgress(), {
      duration: 2000,
    });
  }, [expiryDate]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <AnimatedText
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "PoppinsRegular",
        }}
        animatedProps={animatedTextProps}
      />
      <Svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation={"-90"} origin={`${halfCircle},${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={GlobalStyle.colors.green}
            strokeWidth={7}
            fill="transparent"
            strokeOpacity={0.2}
          />
          <Circle />
          <AnimatedCircle
            animatedProps={animatedCircleProps}
            cx="50%"
            cy="50%"
            r={radius}
            strokeWidth={7}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeLinecap="round"
          />
          <AnimatedCircle />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "20%",
  },
});

export default CircleProgressBar;
