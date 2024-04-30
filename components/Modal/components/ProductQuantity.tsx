import { StyleSheet, View, Text } from "react-native";
import React, { useContext } from "react";

import { AppContext } from "../../../context/AppContext";
import GlobalStyle from "../../../style/GlobalStyle";
import CustomInput from "../../CustomInput";

interface ProductQuantityProps {
  formikOnChange: (value: React.ChangeEvent<any> | string) => void;
  formikErrorMsg: string;
}

const ProductQuantity = ({ formikOnChange, formikErrorMsg }: ProductQuantityProps) => {
  const ctx = useContext(AppContext);

  return (
    <View style={styles.modalSectionProductQuantity}>
      <CustomInput
        inputValue={ctx.productToUpdate && ctx.productToUpdate.quantity.toString()}
        formikOnChange={formikOnChange}
        label="Quantity:"
        inputMode="numeric"
        maxLength={2}
        additionalStyle={styles.productQuantityInput}
      />
      <Text style={{ width: "100%", color: "red" }}>{formikErrorMsg}</Text>
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
