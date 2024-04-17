import { StyleSheet, View } from "react-native";
import React from "react";

import GlobalStyle from "../../../style/GlobalStyle";
import CustomInput from "../../CustomInput";

interface ProductNameProps {
  formikOnChange: (value: React.ChangeEvent<any> | string) => void;
}

const ProductName = ({ formikOnChange }: ProductNameProps) => {
  return (
    <View style={styles.modalSectionProductName}>
      <CustomInput
        formikOnChange={formikOnChange}
        label="Product name:"
        inputMode="text"
        additionalStyle={styles.productNameInput}
      />
    </View>
  );
};

export default ProductName;

const styles = StyleSheet.create({
  modalSectionProductName: {
    flex: 2,
  },
  productNameInput: {
    width: "90%",
    height: 60,
    paddingHorizontal: 12,
    fontSize: 18,
    fontWeight: "500",
    color: GlobalStyle.colors.modal.inputFontColor,
    borderRadius: 15,
    backgroundColor: GlobalStyle.colors.modal.inputBackground,
  },
});
