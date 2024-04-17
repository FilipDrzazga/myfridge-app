import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import GlobalStyle from "../../../style/GlobalStyle";
import CustomButton from "../../CustomButton";
import CustomText from "../../CustomText";

interface ProductDateProps {
  formikOnChangeBoughtDate: (value: React.ChangeEvent<any> | string | number) => void;
  formikOnChangeExpiryDate: (value: React.ChangeEvent<any> | string | number) => void;
}

const ProductDate = ({ formikOnChangeBoughtDate, formikOnChangeExpiryDate }: ProductDateProps) => {
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
