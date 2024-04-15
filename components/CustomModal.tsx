import React, { useState } from "react";
import { StyleSheet, Pressable, Modal, View, TouchableWithoutFeedback, Keyboard, NativeTouchEvent } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import GlobalStyle from "../style/GlobalStyle";
import CustomText from "./CustomText";
import useIsKeyboardVisible from "../hooks/useIsKeyboardVisible";
import CustomButton from "./CustomButton";
import CustomSelectList from "./CustomSelectList";
import CustomInput from "./CustomInput";

const CustomModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [productDate, setProductDate] = useState({
    presentDay: new Date(),
    boughtDate: new Date(),
    expiryDate: new Date(),
  });
  const isKeyboardVisible = useIsKeyboardVisible();

  const closeModal = () => {
    setModalVisible(!modalVisible);
  };

  const setBoughtProductDate = () => {
    DateTimePickerAndroid.open({
      value: productDate.presentDay,
      onChange: (event, userProductDate) => {
        setProductDate((prevState) => ({ ...prevState, boughtDate: userProductDate }));
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
      value: productDate.presentDay,
      onChange: (event, userProductDate) => {
        setProductDate((prevState) => ({ ...prevState, expiryDate: userProductDate }));
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
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Pressable onPress={closeModal} style={styles.modalOutside}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.modalContent, isKeyboardVisible && { height: "80%" }]}>
              <View style={styles.modalSection}>
                <View style={styles.modalSectionProductName}>
                  <CustomInput label="Product name:" inputMode="text" additionalStyle={styles.productNameInput} />
                </View>
                <View style={styles.modalSectionProductCategory}>
                  <CustomSelectList isKeyboardVisible={isKeyboardVisible} />
                </View>
              </View>
              <View style={styles.modalSection}>
                <View style={styles.modalSectionProductCompartment}>
                  <CustomText fontType="PoppinsRegular" fontSize={16}>
                    Compartment
                  </CustomText>
                  <View style={styles.modalSectionCompartmentButtons}>
                    <CustomButton title="Fridge" additionalStyle={styles.customButton} />
                    <CustomButton title="Freezer" additionalStyle={styles.customButton} />
                  </View>
                </View>
                <View style={styles.modalSectionProductQuantity}>
                  <CustomInput
                    label="Quantity:"
                    inputMode="numeric"
                    maxLength={2}
                    additionalStyle={styles.productQuantityInput}
                  />
                </View>
              </View>
              <View style={[styles.modalSection, { flexDirection: "column" }]}>
                <CustomText fontType="PoppinsRegular" fontSize={16}>
                  Choose a days:
                </CustomText>
                <View style={styles.modalSectionProductDate}>
                  <CustomButton
                    onPress={setBoughtProductDate}
                    title={
                      productDate.boughtDate.toLocaleDateString() === productDate.presentDay.toLocaleDateString()
                        ? "Today"
                        : productDate.boughtDate.toLocaleDateString()
                    }
                    additionalStyle={styles.customButton}
                  />
                  <CustomButton
                    onPress={setExpiryProductDate}
                    title={
                      productDate.expiryDate.toLocaleDateString() === productDate.presentDay.toLocaleDateString()
                        ? "Expiry Date"
                        : productDate.expiryDate.toLocaleDateString()
                    }
                    additionalStyle={styles.customButton}
                  />
                </View>
              </View>
              <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-evenly", marginTop: 20 }}>
                <CustomButton title="Save" fontSize={20} additionalStyle={styles.saveButton} />
                <CustomButton
                  iconName="close-outline"
                  iconSize={40}
                  fontSize={20}
                  onPress={closeModal}
                  additionalStyle={styles.closeModalButton}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
      <CustomButton
        onPress={closeModal}
        iconName="add"
        iconSize={50}
        iconColor={GlobalStyle.colors.button.icon}
        additionalStyle={styles.button}
      />
    </>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 40,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: GlobalStyle.colors.button.background,
  },
  saveButton: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    backgroundColor: GlobalStyle.colors.green,
    borderRadius: 15,
  },
  closeModalButton: {
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    backgroundColor: GlobalStyle.colors.pink,
    borderRadius: 50,
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
  modalOutside: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: GlobalStyle.colors.modal.outsideBackground + "99",
  },
  modalContent: {
    width: "100%",
    height: "55%",
    gap: 30,
    justifyContent: "center",
    paddingHorizontal: 30,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: GlobalStyle.colors.modal.background,
  },
  modalSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalSectionProductName: {
    flex: 2,
  },
  modalSectionProductCategory: {
    flex: 1,
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
  modalSectionProductCompartment: {
    flex: 2,
  },
  modalSectionCompartmentButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
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
  modalSectionProductDate: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
