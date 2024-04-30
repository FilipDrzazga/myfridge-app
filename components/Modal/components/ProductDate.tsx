import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { AppContext } from "../../../context/AppContext";
import GlobalStyle from "../../../style/GlobalStyle";
import CustomButton from "../../CustomButton";
import CustomText from "../../CustomText";

interface ProductDateProps {
  formikOnChangeBoughtDate: (value: React.ChangeEvent<any> | string | number) => void;
  formikOnChangeExpiryDate: (value: React.ChangeEvent<any> | string | number) => void;
  formikBoughtErrorMsg: string;
  formikExpiryErrorMsg: string;
}

const ProductDate = ({
  formikOnChangeBoughtDate,
  formikOnChangeExpiryDate,
  formikBoughtErrorMsg,
  formikExpiryErrorMsg,
}: ProductDateProps) => {
  const ctx = useContext(AppContext);
  const [date, setdate] = useState({
    bought: "Set Bought Day",
    expiry: "Set Expiry Day",
    presentDay: new Date().toLocaleDateString(),
  });

  const setBoughtProductDate = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: (event, userProductDate) => {
        setdate((prevState) => ({ ...prevState, bought: userProductDate.toLocaleDateString() }));
        return formikOnChangeBoughtDate(userProductDate.getTime().toString());
      },
      mode: "date",
      display: "spinner",
      maximumDate: new Date(2030, 11, 25),
      minimumDate: new Date(2024, 0, 1),
      is24Hour: true,
    });
  };

  const setExpiryProductDate = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: (event, userProductDate) => {
        setdate((prevState) => ({ ...prevState, expiry: userProductDate.toLocaleDateString() }));
        return formikOnChangeExpiryDate(userProductDate.getTime().toString());
      },
      mode: "date",
      display: "spinner",
      maximumDate: new Date(2030, 11, 25),
      minimumDate: new Date(2024, 0, 1),
      is24Hour: true,
    });
  };

  useEffect(() => {
    if (ctx?.productToUpdate?.boughtDate && ctx?.productToUpdate?.expiryDate) {
      setdate((prevState) => ({
        ...prevState,
        bought: new Date(+ctx.productToUpdate.boughtDate).toLocaleDateString(),
        expiry: new Date(+ctx.productToUpdate.expiryDate).toLocaleDateString(),
      }));
    }
  }, []);

  return (
    <>
      <CustomText fontType="PoppinsRegular" fontSize={16}>
        Best before:
      </CustomText>
      <View style={styles.modalSectionProductDate}>
        <CustomButton
          onPress={setBoughtProductDate}
          title={date.bought === date.presentDay ? "Today" : date.bought}
          additionalStyle={styles.customButton}
        />
        <CustomButton onPress={setExpiryProductDate} title={date.expiry} additionalStyle={styles.customButton} />
      </View>
      <Text style={{ width: "100%", color: "red" }}>{formikBoughtErrorMsg ?? formikExpiryErrorMsg}</Text>
    </>
  );
};

export default ProductDate;

const styles = StyleSheet.create({
  modalSectionProductDate: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  customButton: {
    width: "48%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: GlobalStyle.colors.button.border,
    borderRadius: 15,
    borderWidth: 3,
  },
});
