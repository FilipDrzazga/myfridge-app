import { StyleSheet, View, Text } from "react-native";
import React, { useContext } from "react";

import { AppContext } from "../../../context/AppContext";
import GlobalStyle from "../../../style/GlobalStyle";
import CustomInput from "../../CustomInput";

interface ProductNameProps {
  formikValue: string;
  formikOnChange: (value: React.ChangeEvent<any> | string) => void;
  formikErrorMsg: string;
}

const ProductName = ({ formikValue, formikOnChange, formikErrorMsg }: ProductNameProps) => {
  const ctx = useContext(AppContext);
  return (
    <View style={styles.modalSectionProductName}>
      <CustomInput
        inputValue={formikValue}
        formikOnChange={formikOnChange}
        label="Product name:"
        inputMode="text"
        additionalStyle={styles.productNameInput}
      />
      <Text style={{ width: "100%", color: "#ee313b" }}>{formikErrorMsg}</Text>
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
