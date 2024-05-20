import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import Animated, { useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";
import CustomText from "./CustomText";
import GlobalStyle from "../style/GlobalStyle";
import { number } from "yup";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  boughtDate: string | number;
  expiryDate: string | number;
};

const CircleProgressBar = ({ boughtDate, expiryDate }: Props) => {
  const [percentageText, setPercentageText] = useState(0);
  const circle = {
    radius: 40,
    strokeWidth: 7,
  };

  const halfCircle = circle.radius + circle.strokeWidth;
  const circleCircumference = 2 * Math.PI * circle.radius;

  const progress = useSharedValue(0);
  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circleCircumference * progress.value,
    };
  });

  useEffect(() => {
    const currentDate = new Date().getTime();
    const purchaseDateFromProps = +boughtDate;
    const expiryDateFromProps = +expiryDate;

    const totalDuration = expiryDateFromProps - purchaseDateFromProps;
    const remainingDuration = expiryDateFromProps - currentDate;
    const percentageLeft = (remainingDuration / totalDuration) * 100;
    const percentage = Math.floor(+percentageLeft.toFixed(2));

    if (currentDate < purchaseDateFromProps) {
      progress.value = withTiming(1, { duration: 2000 });
      return setPercentageText(0);
    }
    if (currentDate > expiryDateFromProps) {
      progress.value = withTiming(1, { duration: 2000 });
      return setPercentageText(0);
    }

    if (percentage < 0) {
      progress.value = withTiming(1, { duration: 2000 });
      return setPercentageText(0);
    }
    if (percentage > 0) {
      progress.value = withTiming(1 - +percentageLeft.toFixed(2) / 100, { duration: 2000 });
      setPercentageText(Math.floor(+percentageLeft.toFixed(2)));
    }
  }, []);

  return (
    <View style={styles.container}>
      <CustomText
        additionalStyle={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
        }}
        fontSize={16}
        fontType="PoppinsRegular"
      >
        {percentageText}%
      </CustomText>
      <Svg width={circle.radius * 2} height={circle.radius * 2} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation={"-90"} origin={`${halfCircle},${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            r={circle.radius}
            stroke={GlobalStyle.colors.green}
            strokeWidth={circle.strokeWidth}
            fill="transparent"
            strokeOpacity={0.2}
          />
          <Circle />
          <AnimatedCircle
            cx="50%"
            cy="50%"
            r={circle.radius}
            stroke={GlobalStyle.colors.green}
            strokeWidth={circle.strokeWidth}
            fill="transparent"
            strokeDasharray={circleCircumference}
            animatedProps={animatedProps}
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
