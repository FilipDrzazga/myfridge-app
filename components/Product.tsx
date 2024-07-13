import React, { useContext, useEffect } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";

import GlobalStyle from "../style/GlobalStyle";
import { AppContext, type State } from "../context/AppContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomText from "./CustomText";
import CircleProgressBar from "./CircleProgressBar";

interface ProductProps {
  product: State;
}

const Product = ({ product }: ProductProps) => {
  const ctx = useContext(AppContext);

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const increaseQuantity = () => {
    ctx.dispatch({
      type: "UPDATE_PRODUCT",
      payload: { field: "quantity", id: product.id.toString(), action: "increase" },
    });
  };
  const decreaseQuantity = () => {
    ctx.dispatch({
      type: "UPDATE_PRODUCT",
      payload: { field: "quantity", id: product.id.toString(), action: "decrease" },
    });
  };
  const updateProduct = (product) => {
    ctx.setModalVisible();
    ctx.updateProduct(product);
  };

  const animatedProductStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });
  const onLongPressGesture = Gesture.LongPress()
    .minDuration(ctx.isSelectedToDelete ? 50 : 1000)
    .onStart(() => {
      if (product.isSelected) {
        opacity.value = withTiming(1, { duration: 300 });
        scale.value = withTiming(1, { duration: 300 });
        runOnJS(ctx.dispatch)({ type: "UPDATE_PRODUCT", payload: { value: { ...product, isSelected: false } } });
      } else if (!product.isSelected) {
        runOnJS(ctx.dispatch)({ type: "UPDATE_PRODUCT", payload: { value: { ...product, isSelected: true } } });
        opacity.value = withTiming(0.3, { duration: 300 });
        scale.value = withTiming(0.95, { duration: 300 });
        runOnJS(ctx.updateProductsToDelete)(product.id);
      }
    })
    .onEnd(() => {
      if (!ctx.isSelectedToDelete) {
        runOnJS(ctx.selectToDelete)(true);
      }
    });

  useEffect(() => {
    if (!ctx.isSelectedToDelete) {
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withTiming(1, { duration: 300 });
    }
  }, [ctx.isSelectedToDelete]);

  return (
    <>
      <GestureDetector gesture={onLongPressGesture}>
        <Animated.View entering={ZoomIn} exiting={ZoomOut}>
          <Animated.View style={[{ flex: 1 }, animatedProductStyle]}>
            <Pressable
              onPress={() => !ctx.isSelectedToDelete && updateProduct(product)}
              style={styles.productContainer}
            >
              <View style={styles.productExpDate}>
                <CircleProgressBar boughtDate={product.boughtDate} expiryDate={product.expiryDate} />
              </View>
              <View style={styles.productDescriptionContainer}>
                <View>
                  <CustomText fontType="PoppinsBold" fontSize={16}>
                    {product.name}
                  </CustomText>
                  <CustomText fontType="PoppinsRegular" fontSize={14}>
                    Days after buy 3
                  </CustomText>
                  <CustomText fontType="PoppinsRegular" fontSize={14}>
                    bought {product.bought}/pcs
                  </CustomText>
                </View>
              </View>
              <View style={styles.productValue}>
                <Pressable onPress={decreaseQuantity} style={styles.pressableRemove}>
                  <View>
                    <Ionicons name="remove" size={20} color={GlobalStyle.colors.black} />
                  </View>
                </Pressable>
                <CustomText fontType="PoppinsRegular" fontSize={24}>
                  {product.quantity}
                </CustomText>
                <Pressable onPress={increaseQuantity} style={styles.pressableAdd}>
                  <View>
                    <Ionicons name="add" size={20} color={GlobalStyle.colors.black} />
                  </View>
                </Pressable>
              </View>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </>
  );
};

export default Product;

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    gap: 3,
    width: "100%",
    height: 100,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#EEE8DB",
  },
  productExpDate: { flex: 2, justifyContent: "center", alignItems: "center" },
  productDescriptionContainer: { flex: 4, justifyContent: "center", alignItems: "flex-start" },

  productValue: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pressableAdd: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 25,
    borderStyle: "dashed",
    backgroundColor: GlobalStyle.colors.pink,
  },
  pressableRemove: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 25,
    borderStyle: "dashed",
    backgroundColor: GlobalStyle.colors.yellow,
  },
});
