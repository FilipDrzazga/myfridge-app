import { StyleSheet, Text, View } from "react-native";
import React, { type CSSProperties, useContext, useState, useEffect } from "react";

import { AppContext } from "../../../context/AppContext";
import GlobalStyle from "../../../style/GlobalStyle";
import CustomText from "../../CustomText";
import CustomButton from "../../CustomButton";

interface ProductCompartmentProps {
  formikOnChange: (value: React.ChangeEvent<any> | string) => void;
  formikErrorMsg: string;
}

const ProductCompartment = ({ formikOnChange, formikErrorMsg }: ProductCompartmentProps) => {
  const ctx = useContext(AppContext);
  const [compartment, setCompartment] = useState({ fridge: false, freezer: false });

  const handleCompartmentOnPress = (value: string): void => {
    if (value === "fridge") {
      return !compartment.fridge && setCompartment({ fridge: true, freezer: false });
    }
    if (value === "freezer") {
      return !compartment.freezer && setCompartment({ fridge: false, freezer: true });
    }
  };

  const renderStyleBtn = (compartmentStateValue: boolean | string): CSSProperties => {
    return compartmentStateValue
      ? {
          ...styles.customButton,
          backgroundColor: GlobalStyle.colors.black,
        }
      : { ...styles.customButton };
  };

  useEffect(() => {
    if (ctx?.productToUpdate?.compartment) {
      ctx.productToUpdate.compartment === "Fridge"
        ? setCompartment({ fridge: true, freezer: false })
        : setCompartment({ fridge: false, freezer: true });
    }
  }, []);

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
          fontColor={
            compartment.freezer || ctx.productToUpdate?.compartment === "Freezer"
              ? GlobalStyle.colors.button.font
              : GlobalStyle.colors.black
          }
          additionalStyle={renderStyleBtn(compartment.freezer || ctx?.productToUpdate?.compartment === "Freezer")}
        />
      </View>
      <Text style={{ width: "100%", color: "#ee313b" }}>{formikErrorMsg}</Text>
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
