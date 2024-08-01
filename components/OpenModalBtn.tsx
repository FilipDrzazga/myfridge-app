import React, { useEffect, useContext, useMemo } from "react";
import { StyleSheet, Pressable } from "react-native";
import { AppContext } from "../context/AppContext";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming, runOnJS } from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { FIREBASE_DB, ref, set, update } from "../firebase/firebaseConfig";

import { AuthContext } from "../context/AuthContex";
import Ionicons from "@expo/vector-icons/Ionicons";
import GlobalStyle from "../style/GlobalStyle";

const AnimatedPressableBtn = Animated.createAnimatedComponent(Pressable);

const OpenModalBtn = () => {
  const ctxApp = useContext(AppContext);
  const ctxAuth = useContext(AuthContext);

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

  const removeDataFromDBWrapper = () => {
    const pathObjectToDelete = ctxApp.productsToDelete.reduce((acc, item) => {
      acc[String(item)] = null;
      return acc;
    }, {});

    return update(ref(FIREBASE_DB), pathObjectToDelete);
  };

  const addBtnGesture = useMemo(() => {
    return Gesture.Tap()
      .maxDuration(99999999)
      .onBegin(() => {
        if (!ctxApp.isSelectedToDelete) {
          runOnJS(ctxApp.setModalVisible)();
        }
      })
      .onEnd(() => {
        if (ctxApp.isSelectedToDelete) {
          runOnJS(ctxApp.dispatch)({ type: "UPDATE_PRODUCT", payload: { action: "resetSelection" } });
          runOnJS(ctxApp.updateProductsToDelete)();
          runOnJS(ctxApp.selectToDelete)(false);
        }
      });
  }, [ctxApp.isSelectedToDelete, ctxApp.isModalVisible]);

  const removeBtnGesture = useMemo(() => {
    return Gesture.Tap()
      .maxDuration(99999999)
      .onStart(() => {
        if (ctxApp.isSelectedToDelete) {
          runOnJS(ctxApp.dispatch)({ type: "REMOVE_PRODUCT" });
          runOnJS(removeDataFromDBWrapper)();
        }
      })
      .onEnd(() => {
        runOnJS(ctxApp.selectToDelete)(false);
        runOnJS(ctxApp.updateProductsToDelete)();
      });
  }, [ctxApp.isSelectedToDelete, ctxApp.productsToDelete]);

  useEffect(() => {
    if (ctxApp.state.every((obj) => obj.isSelected === false)) {
      ctxApp.selectToDelete(false);
    }
    if (ctxApp.isSelectedToDelete) {
      width.value = withTiming(150);
      scale.value = withDelay(100, withTiming(1));
      rotate.value = withTiming(45);
    } else if (!ctxApp.isSelectedToDelete) {
      width.value = withTiming(70);
      scale.value = withTiming(0);
      rotate.value = withTiming(0);
    }
  }, [ctxApp.isSelectedToDelete, ctxApp.state]);

  return (
    <Animated.View style={[styles.container, animatedContainerStyleOnDelete]}>
      {ctxApp.isSelectedToDelete && (
        <GestureDetector gesture={removeBtnGesture}>
          <AnimatedPressableBtn style={[styles.removeProductBtn, animatedRemoveBtnOnDelete]}>
            <Ionicons name="trash-outline" color={GlobalStyle.colors.button.icon} size={40} />
          </AnimatedPressableBtn>
        </GestureDetector>
      )}
      <GestureDetector gesture={addBtnGesture}>
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
