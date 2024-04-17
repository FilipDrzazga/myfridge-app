import { StyleSheet, Text, View } from "react-native";
import React, { CSSProperties, useState } from "react";

import GlobalStyle from "../../../style/GlobalStyle";
import CustomText from "../../CustomText";
import CustomButton from "../../CustomButton";

interface ProductCompartmentProps {
  formikOnChange: (value: React.ChangeEvent<any> | string) => void;
}

const ProductCompartment = ({ formikOnChange }: ProductCompartmentProps) => {
  const [compartment, setCompartment] = useState({ fridge: false, freezer: false });

  const handleCompartmentOnPress = (value: string): void => {
    if (value === "fridge") {
      return !compartment.fridge && setCompartment({ fridge: true, freezer: false });
    }
    if (value === "freezer") {
      return !compartment.freezer && setCompartment({ fridge: false, freezer: true });
    }
  };

  const renderStyleBtn = (compartmentStateValue: boolean): CSSProperties => {
    return compartmentStateValue
      ? {
          ...styles.customButton,
          backgroundColor: GlobalStyle.colors.black,
        }
      : { ...styles.customButton };
  };

  return (
    <View style={styles.modalSectionProductCompartment}>
      <CustomText fontType="PoppinsRegular" fontSize={16}>
        Compartment
      </CustomText>
      <View style={styles.modalSectionCompartmentButtons}>
        <CustomButton
          onPress={() => handleCompartmentOnPress("fridge")}
          formikOnChange={formikOnChange}
          title="Fridge"
          fontColor={compartment.fridge ? GlobalStyle.colors.button.font : GlobalStyle.colors.black}
          additionalStyle={renderStyleBtn(compartment.fridge)}
        />
        <CustomButton
          onPress={() => handleCompartmentOnPress("freezer")}
          formikOnChange={formikOnChange}
          title="Freezer"
          fontColor={compartment.freezer ? GlobalStyle.colors.button.font : GlobalStyle.colors.black}
          additionalStyle={renderStyleBtn(compartment.freezer)}
        />
      </View>
    </View>
  );
};

export default ProductCompartment;

const styles = StyleSheet.create({
  customButton: {
    width: "48%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: GlobalStyle.colors.button.border,
    borderRadius: 15,
    borderWidth: 3,
  },
  modalSectionProductCompartment: {
    flex: 2,
  },
  modalSectionCompartmentButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
});
