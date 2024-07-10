import React, { useContext } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  ZoomIn,
  ZoomOut,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { AppContext } from "../context/AppContext";
import GlobalStyle from "../style/GlobalStyle";
import CustomText from "./CustomText";

const AnimatedPressableRemoveBtn = Animated.createAnimatedComponent(Pressable);
const AnimatedPressableDismissBtn = Animated.createAnimatedComponent(Pressable);

const RemoveSelectedProduct = () => {
  const ctx = useContext(AppContext);

  const removeBtnscale = useSharedValue(1);
  const dismissBtnscale = useSharedValue(1);

  const removeTapGesture = Gesture.Tap()
    .maxDuration(99999999)
    .onTouchesDown(() => {
      removeBtnscale.value = withTiming(0.9);
    })
    .onTouchesUp(() => {
      removeBtnscale.value = withTiming(1);
    })
    .onTouchesCancelled(() => {
      removeBtnscale.value = withTiming(1);
    })
    .onEnd(() => {
      if (ctx.productsToDelete) {
        runOnJS(ctx.dispatch)({ type: "REMOVE_PRODUCT", payload: { productsToDelete: ctx.productsToDelete } });
        runOnJS(ctx.selectToDelete)(false);
      }
    });
  const dismissTapGesture = Gesture.Tap()
    .maxDuration(99999999)
    .onTouchesDown(() => {
      dismissBtnscale.value = withTiming(0.9);
    })
    .onTouchesUp(() => {
      dismissBtnscale.value = withTiming(1);
    })
    .onTouchesCancelled(() => {
      dismissBtnscale.value = withTiming(1);
    })
    .onEnd(() => {
      runOnJS(ctx.updateProductsToDelete)();
      runOnJS(ctx.selectToDelete)(false);
    });

  const animatedRemoveBtnStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: removeBtnscale.value }],
    };
  });
  const animatedDismissBtnStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: dismissBtnscale.value }],
    };
  });

  return (
    <View style={styles.removeSelectedProductContainer}>
      <GestureDetector gesture={removeTapGesture}>
        <Animated.View style={animatedRemoveBtnStyle}>
          <AnimatedPressableRemoveBtn
            entering={ZoomIn.duration(150)}
            exiting={ZoomOut.duration(150)}
            style={styles.removeBtn}
          >
            <CustomText fontType="PoppinsRegular" fontSize={18} color={GlobalStyle.colors.screen.background}>
              Remove
            </CustomText>
          </AnimatedPressableRemoveBtn>
        </Animated.View>
      </GestureDetector>
      <GestureDetector gesture={dismissTapGesture}>
        <Animated.View style={animatedDismissBtnStyle}>
          <AnimatedPressableDismissBtn
            entering={ZoomIn.duration(150).delay(50)}
            exiting={ZoomOut.duration(150).delay(50)}
            style={styles.dismissBtn}
          >
            <CustomText fontType="PoppinsRegular" fontSize={18} color={GlobalStyle.colors.screen.background}>
              Dismiss
            </CustomText>
          </AnimatedPressableDismissBtn>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default RemoveSelectedProduct;

const styles = StyleSheet.create({
  removeSelectedProductContainer: {
    position: "absolute",
    bottom: 40,
    right: 113,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "73%",
    height: 70,
  },
  removeBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 165,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#ee313b",
  },
  dismissBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 165,
    height: 70,
    borderRadius: 50,
    backgroundColor: GlobalStyle.colors.button.background,
  },
});
