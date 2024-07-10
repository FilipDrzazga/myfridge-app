import { StyleSheet, View, Text } from "react-native";
import React from "react";

import CustomSelectList from "../../CustomSelectList";

interface ProductCategoryProps {
  formikOnChange: (value: React.ChangeEvent<any> | string) => void;
  formikErrorMsg: string;
  isKeyboardVisible: boolean;
}

const ProductCategory = ({ formikOnChange, formikErrorMsg, isKeyboardVisible }: ProductCategoryProps) => {
  return (
    <View style={styles.modalSectionProductCategory}>
      <CustomSelectList formikOnChange={formikOnChange} isKeyboardVisible={isKeyboardVisible} />
      <Text style={{ width: "100%", color: "#ee313b" }}>{formikErrorMsg}</Text>
    </View>
  );
};

export default ProductCategory;

const styles = StyleSheet.create({
  modalSectionProductCategory: {
    flex: 1,
  },
});
