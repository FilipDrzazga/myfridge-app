import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomText from "./CustomText";
import GlobalStyle from "../style/GlobalStyle";

const NoData = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="cloud-offline-outline" size={30} color={GlobalStyle.colors.black} />
      <CustomText fontType="PoppinsRegular" fontSize={16}>
        Nothing here, yet!
      </CustomText>
    </View>
  );
};

export default memo(NoData);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 650,
    justifyContent: "center",
    alignItems: "center",
  },
});
