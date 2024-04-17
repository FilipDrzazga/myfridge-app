import React, { useState } from "react";
import { StyleSheet, Pressable, Modal, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useFormik } from "formik";

import GlobalStyle from "../../style/GlobalStyle";
import useIsKeyboardVisible from "../../hooks/useIsKeyboardVisible";
import { ProductCategory, ProductCompartment, ProductDate, ProductName, ProductQuantity } from "./components";
import CustomButton from "../CustomButton";

const CustomModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const isKeyboardVisible = useIsKeyboardVisible();
  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      compartment: "",
      quantity: "",
      boughtDate: "",
      expiryDate: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const closeModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Pressable onPress={closeModal} style={styles.modalOutside}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.modalContent, isKeyboardVisible && { height: "70%" }]}>
              <View style={styles.modalSection}>
                <ProductName formikOnChange={formik.handleChange("name")} />
                <ProductCategory
                  formikOnChange={formik.handleChange("category")}
                  isKeyboardVisible={isKeyboardVisible}
                />
              </View>
              <View style={styles.modalSection}>
                <ProductCompartment formikOnChange={formik.handleChange("compartment")} />
                <ProductQuantity formikOnChange={formik.handleChange("quantity")} />
              </View>
              <View style={[styles.modalSection, { flexDirection: "column" }]}>
                <ProductDate
                  formikOnChangeBoughtDate={formik.handleChange("boughtDate")}
                  formikOnChangeExpiryDate={formik.handleChange("expiryDate")}
                />
              </View>
              <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-evenly", marginTop: 20 }}>
                <CustomButton
                  onPress={formik.handleSubmit}
                  title="Save"
                  fontSize={20}
                  additionalStyle={styles.saveButton}
                />
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
});
