import React from "react";
import { StyleSheet, Pressable, View } from "react-native";

import GlobalStyle from "../style/GlobalStyle";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomText from "./CustomText";
import CircleProgressBar from "./CircleProgressBar";

const Product = () => {
  return (
    <View style={styles.ProductContainer}>
      <View style={styles.ProductExpDate}>
        <CircleProgressBar />
      </View>
      <View style={styles.ProductDescriptionContainer}>
        <View>
          <CustomText fontType="PoppinsBold" fontSize={16}>
            Bananna
          </CustomText>
          <CustomText fontType="PoppinsRegular" fontSize={14}>
            Days after buy 3
          </CustomText>
          <CustomText fontType="PoppinsRegular" fontSize={14}>
            5/pcs
          </CustomText>
        </View>
      </View>
      <View style={styles.ProductValue}>
        <Pressable style={styles.PressableRemove}>
          <View>
            <Ionicons name="remove" size={20} color={GlobalStyle.colors.black} />
          </View>
        </Pressable>
        <CustomText fontType="PoppinsRegular" fontSize={24}>
          5
        </CustomText>
        <Pressable style={styles.PressableAdd}>
          <View>
            <Ionicons name="add" size={20} color={GlobalStyle.colors.black} />
          </View>
        </Pressable>
      </View>
    </View>
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
