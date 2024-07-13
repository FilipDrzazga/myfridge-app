import React, { useEffect, useContext } from "react";
import { StyleSheet, Pressable } from "react-native";
import { AppContext } from "../context/AppContext";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming, runOnJS } from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

import Ionicons from "@expo/vector-icons/Ionicons";
import GlobalStyle from "../style/GlobalStyle";

const AnimatedPressableBtn = Animated.createAnimatedComponent(Pressable);

const OpenModalBtn = () => {
  const ctx = useContext(AppContext);

  const width = useSharedValue(70);
  const scale = useSharedValue(0);
  const rotate = useSharedValue(0);

  const animatedContainerStyleOnDelete = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  const animatedRemoveBtnOnDelete = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const animatedAddBtnOnDelete = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rotate.value + "deg" }],
    };
  });

  const AddBtnGesture = Gesture.Tap()
    .maxDuration(99999999)
    .onBegin(() => {
      if (!ctx.isSelectedToDelete) {
        runOnJS(ctx.setModalVisible)();
      } else if (ctx.isSelectedToDelete) {
        runOnJS(ctx.dispatch)({ type: "UPDATE_PRODUCT", payload: { action: "resetSelection" } });
        runOnJS(ctx.updateProductsToDelete)();
        runOnJS(ctx.selectToDelete)(false);
      }
    });

  useEffect(() => {
    if (ctx.state.every((obj) => obj.isSelected === false)) {
      runOnJS(ctx.selectToDelete)(false);
    }
    if (ctx.isSelectedToDelete) {
      width.value = withTiming(150);
      scale.value = withDelay(100, withTiming(1));
      rotate.value = withTiming(45);
    } else if (!ctx.isSelectedToDelete) {
      width.value = withTiming(70);
      scale.value = withTiming(0);
      rotate.value = withTiming(0);
    }
  }, [ctx.isSelectedToDelete, ctx.state]);

  return (
    <Animated.View style={[styles.container, animatedContainerStyleOnDelete]}>
      {ctx.isSelectedToDelete && (
        <AnimatedPressableBtn style={[styles.removeProductBtn, animatedRemoveBtnOnDelete]}>
          <Ionicons name="trash-outline" color={GlobalStyle.colors.button.icon} size={40} />
        </AnimatedPressableBtn>
      )}
      <GestureDetector gesture={AddBtnGesture}>
        <AnimatedPressableBtn style={[styles.button, animatedAddBtnOnDelete]}>
          <Ionicons name="add-outline" color={GlobalStyle.colors.button.icon} size={50} />
        </AnimatedPressableBtn>
      </GestureDetector>
    </Animated.View>
  );
};

export default OpenModalBtn;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    right: 33,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: GlobalStyle.colors.button.background,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: GlobalStyle.colors.button.background,
  },
  removeProductBtn: {
    position: "absolute",
    bottom: 0,
    right: 80,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: GlobalStyle.colors.button.background,
  },
});
