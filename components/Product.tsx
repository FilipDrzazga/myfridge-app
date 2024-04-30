import React, { useContext } from "react";
import { StyleSheet, Pressable, View } from "react-native";

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

  return (
    <Pressable onPress={() => updateProduct(product)} style={styles.ProductContainer}>
      <View style={styles.ProductExpDate}>
        <CircleProgressBar />
      </View>
      <View style={styles.ProductDescriptionContainer}>
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
      <View style={styles.ProductValue}>
        <Pressable onPress={decreaseQuantity} style={styles.PressableRemove}>
          <View>
            <Ionicons name="remove" size={20} color={GlobalStyle.colors.black} />
          </View>
        </Pressable>
        <CustomText fontType="PoppinsRegular" fontSize={24}>
          {product.quantity}
        </CustomText>
        <Pressable onPress={increaseQuantity} style={styles.PressableAdd}>
          <View>
            <Ionicons name="add" size={20} color={GlobalStyle.colors.black} />
          </View>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default Product;

const styles = StyleSheet.create({
  ProductContainer: {
    flexDirection: "row",
    gap: 3,
    width: "100%",
    height: 100,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#EEE8DB",
  },
  ProductExpDate: { flex: 2, justifyContent: "center", alignItems: "center" },
  ProductDescriptionContainer: { flex: 4, justifyContent: "center", alignItems: "flex-start" },

  ProductValue: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  PressableAdd: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 25,
    borderStyle: "dashed",
    backgroundColor: GlobalStyle.colors.pink,
  },
  PressableRemove: {
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
