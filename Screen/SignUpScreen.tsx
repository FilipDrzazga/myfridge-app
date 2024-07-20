import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";

import GlobalStyle from "../style/GlobalStyle";
import CustomText from "../components/CustomText";
import ICONS_BACKGROUND from "../constants/ICONS_BACKGROUND";
import CustomInput from "../components/CustomInput";

const SignUpScreen = () => {
  const modalHeight = useSharedValue(600);

  const animatedModalHeight = useAnimatedStyle(() => {
    return {
      height: modalHeight.value,
    };
  });

  useEffect(() => {
    modalHeight.value = withTiming(800);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundIcons}>
        {ICONS_BACKGROUND.map((icon, id) => (
          <Ionicons key={`icons-${id}`} name={icon.name} size={icon.size} color={icon.color} />
        ))}
      </View>
      <View style={styles.logoTxt}>
        <CustomText fontType="PoppinsBold" fontSize={50} color={GlobalStyle.colors.black}>
          fridge
        </CustomText>
      </View>
      <Animated.View style={[styles.modal, animatedModalHeight]}></Animated.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyle.colors.screen.background,
  },
  backgroundIcons: {
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 60,
    width: "100%",
    height: "50%",
    marginTop: 40,
    opacity: 0.1,
  },
  logoTxt: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "100%",
    backgroundColor: GlobalStyle.colors.black,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});
