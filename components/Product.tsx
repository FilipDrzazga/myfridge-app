import React, { useContext, useEffect, useMemo } from "react";
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
import { FIREBASE_DB, ref, update } from "../firebase/firebaseConfig";

import { AppContext, type State } from "../context/AppContext";
import { AuthContext } from "../context/AuthContex";
import GlobalStyle from "../style/GlobalStyle";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomText from "./CustomText";
import CircleProgressBar from "./CircleProgressBar";

interface ProductProps {
  product: State;
}

const Product = ({ product }: ProductProps) => {
  const ctxApp = useContext(AppContext);
  const ctxAuth = useContext(AuthContext);

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const increaseQuantity = () => {
    const updates = {};
    const pathObjectToupdate = `users/${ctxAuth.userId}/fridge/${product.databaseRefId}`;
    const updateDataProduct = { ...product, quantity: +product.quantity + 1 };
    updates[pathObjectToupdate] = updateDataProduct;
    update(ref(FIREBASE_DB), updates);

    ctxApp.dispatch({
      type: "UPDATE_PRODUCT",
      payload: { field: "quantity", id: product.id.toString(), action: "increase" },
    });
  };
  const decreaseQuantity = () => {
    const updates = {};
    const pathObjectToupdate = `users/${ctxAuth.userId}/fridge/${product.databaseRefId}`;
    const updateDataProduct = { ...product, quantity: +product.quantity - 1 };
    updates[pathObjectToupdate] = updateDataProduct;
    update(ref(FIREBASE_DB), updates);

    ctxApp.dispatch({
      type: "UPDATE_PRODUCT",
      payload: { field: "quantity", id: product.id.toString(), action: "decrease" },
    });
  };
  const updateProduct = (product) => {
    ctxApp.setModalVisible();
    ctxApp.updateProduct(product);
  };

  const animatedProductStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });
  const onLongPressGesture = useMemo(() => {
    return Gesture.LongPress()
      .minDuration(ctxApp.isSelectedToDelete ? 50 : 1000)
      .onStart(() => {
        if (!product.isSelected) {
          opacity.value = withTiming(0.3, { duration: 300 });
          scale.value = withTiming(0.95, { duration: 300 });
        } else {
          opacity.value = withTiming(1, { duration: 300 });
          scale.value = withTiming(1, { duration: 300 });
        }
      })
      .onEnd(() => {
        const productPath = `users/${ctxAuth.userId}/fridge/${product.databaseRefId}`;
        if (!product.isSelected) {
          runOnJS(ctxApp.dispatch)({ type: "UPDATE_PRODUCT", payload: { value: { ...product, isSelected: true } } });
          runOnJS(ctxApp.updateProductsToDelete)(productPath, false);
          runOnJS(ctxApp.selectToDelete)(true);
        } else {
          console.log("im here");
          runOnJS(ctxApp.dispatch)({ type: "UPDATE_PRODUCT", payload: { value: { ...product, isSelected: false } } });
          runOnJS(ctxApp.updateProductsToDelete)(productPath, true);
        }
      });
  }, [ctxApp.isSelectedToDelete, product.isSelected, ctxApp.productsToDelete]);

  useEffect(() => {
    if (!ctxApp.isSelectedToDelete) {
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withTiming(1, { duration: 300 });
    }
  }, [ctxApp.isSelectedToDelete]);

  return (
    <>
      <GestureDetector gesture={onLongPressGesture}>
        <Animated.View entering={ZoomIn} exiting={ZoomOut}>
          <Animated.View style={[{ flex: 1 }, animatedProductStyle]}>
            <Pressable
              onPress={() => !ctxApp.isSelectedToDelete && updateProduct(product)}
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
