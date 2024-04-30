import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Ionicons from "@expo/vector-icons/Ionicons";

import { AppContext } from "../context/AppContext";
import FRIDGE_CATEGORIES from "../constants/FRIDGE_CATEGORY";
import GlobalStyle from "../style/GlobalStyle";
import CustomText from "./CustomText";

interface CustomSelectListProps {
  formikOnChange: (value: React.ChangeEvent<any> | string) => void;
  isKeyboardVisible: boolean;
}

const CustomSelectList = ({ isKeyboardVisible, formikOnChange }: CustomSelectListProps) => {
  const ctx = useContext(AppContext);

  const renderDropdownItem = (item: any, index: number, isSelected: boolean): React.ReactNode => {
    return (
      <View
        style={{
          ...styles.dropdownItemStyle,
          ...(isSelected && { backgroundColor: GlobalStyle.colors.black }),
        }}
      >
        <Text
          style={{
            ...styles.dropdownItemTxtStyle,
            ...(isSelected && { color: GlobalStyle.colors.modal.background }),
          }}
        >
          {item.category}
        </Text>
      </View>
    );
  };

  const renderDropdownBtn = (selectedItem: any, isOpened: boolean): React.ReactNode => {
    return (
      <View style={styles.dropdownButtonStyle}>
        <Text style={styles.dropdownButtonTxtStyle}>
          {(selectedItem && selectedItem.category) || (ctx.productToUpdate ? ctx.productToUpdate.category : "...")}
        </Text>
        <Ionicons name={isOpened ? "chevron-up" : "chevron-down"} color={GlobalStyle.colors.black} size={24} />
      </View>
    );
  };

  const onSelectDropdownItem = (selectItem: any, id: number): void => {
    return formikOnChange(selectItem.category);
  };

  return (
    <>
      <CustomText fontType="PoppinsRegular" fontSize={16}>
        Category:
      </CustomText>
      <SelectDropdown
        data={FRIDGE_CATEGORIES.filter((item) => item.category !== "All")}
        onSelect={onSelectDropdownItem}
        renderButton={renderDropdownBtn}
        renderItem={renderDropdownItem}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
        disabled={isKeyboardVisible}
      ></SelectDropdown>
    </>
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: 12,
    backgroundColor: GlobalStyle.colors.modal.inputBackground,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: GlobalStyle.colors.modal.inputFontColor,
  },
  dropdownMenuStyle: {
    marginTop: "-10%",
    borderRadius: 12,
    backgroundColor: GlobalStyle.colors.modal.background,
  },
  dropdownItemStyle: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    fontWeight: "500",
    color: GlobalStyle.colors.modal.inputFontColor,
  },
});

export default CustomSelectList;
