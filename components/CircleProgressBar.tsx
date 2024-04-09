import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import AppText from "./AppText";
import GlobalStyle from "../style/GlobalStyle";

const circrle = {
  percentage: 75,
  radius: 40,
  strokeWidth: 7,
  duration: 500,
  color: "green",
  delay: 0,
  max: 100,
};
const halfCircle = circrle.radius + circrle.strokeWidth;

const CircleProgressBar = () => {
  return (
    <View style={styles.container}>
      <AppText
        additionalStyle={{
          position: "absolute",
          top: "35%",
          left: "23%",
        }}
        fontSize={16}
        fontType="PoppinsRegular"
      >
        100%
      </AppText>
      <Svg width={circrle.radius * 2} height={circrle.radius * 2} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle},${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            r={circrle.radius}
            stroke={GlobalStyle.colors.green}
            strokeWidth={circrle.strokeWidth}
            fill="transparent"
            strokeDasharray={2 * Math.PI * circrle.radius}
            strokeDashoffset={100}
            strokeLinecap="round"
          />
          <Circle />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text: { position: "absolute" },
});

export default CircleProgressBar;
