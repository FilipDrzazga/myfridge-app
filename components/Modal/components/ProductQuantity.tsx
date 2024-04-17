import { StyleSheet, View } from "react-native";
import React from "react";

import GlobalStyle from "../../../style/GlobalStyle";
import CustomInput from "../../CustomInput";

interface ProductQuantityProps {
  formikOnChange: (value: React.ChangeEvent<any> | string) => void;
}

const ProductQuantity = ({ formikOnChange }: ProductQuantityProps) => {
  return (
    <View style={styles.modalSectionProductQuantity}>
      <CustomInput
        formikOnChange={formikOnChange}
        label="Quantity:"
        inputMode="numeric"
        maxLength={2}
        additionalStyle={styles.productQuantityInput}
      />
    </View>
  );
};

export default ProductQuantity;

const styles = StyleSheet.create({
  modalSectionProductQuantity: {
    flex: 1,
  },
  productQuantityInput: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    fontWeight: "500",
    borderRadius: 15,
    paddingHorizontal: 12,
    textAlign: "center",
    backgroundColor: GlobalStyle.colors.modal.inputBackground,
  },
});
