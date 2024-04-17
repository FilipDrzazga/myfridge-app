import { StyleSheet, View } from "react-native";
import React from "react";

import CustomSelectList from "../../CustomSelectList";

interface ProductCategoryProps {
  formikOnChange: (value: React.ChangeEvent<any> | string) => void;
  isKeyboardVisible: boolean;
}

const ProductCategory = ({ formikOnChange, isKeyboardVisible }: ProductCategoryProps) => {
  return (
    <View style={styles.modalSectionProductCategory}>
      <CustomSelectList formikOnChange={formikOnChange} isKeyboardVisible={isKeyboardVisible} />
    </View>
  );
};

export default ProductCategory;

const styles = StyleSheet.create({
  modalSectionProductCategory: {
    flex: 1,
  },
});
