import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import GlobalStyle from "../style/GlobalStyle";
import AppText from "./AppText";
import CircleProgressBar from "./CircleProgressBar";

const Categories = ({ navigation, route }) => {
  // console.log(route);
  return (
    <View style={styles.container}>
      <View style={styles.ProductContainer}>
        <View style={styles.ProductExpDate}>
          <CircleProgressBar />
        </View>
        <View style={styles.ProductDescriptionContainer}>
          <View style={styles.ProductDescriptionTexts}>
            <AppText fontType="PoppinsBold" fontSize={16}>
              Bananna
            </AppText>
            <AppText fontType="PoppinsRegular" fontSize={14}>
              Bought 17/12/2024
            </AppText>
            <AppText fontType="PoppinsRegular" fontSize={14}>
              5/pcs
            </AppText>
          </View>
        </View>
        <View style={styles.ProductValue}>
          <Pressable style={styles.PressableRemove}>
            <View>
              <Ionicons name="remove" size={20} color={GlobalStyle.colors.black} />
            </View>
          </Pressable>
          <AppText fontType="PoppinsRegular" fontSize={24}>
            5
          </AppText>
          <Pressable style={styles.PressableAdd}>
            <View>
              <Ionicons name="add" size={20} color={GlobalStyle.colors.black} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, marginTop: 10 },
  ProductContainer: {
    flexDirection: "row",
    gap: 3,
    width: "100%",
    height: 100,
    padding: 10,
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

// styles.ProductExpDate
