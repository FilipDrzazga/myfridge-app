import React, { useContext, useEffect } from "react";
import { StyleSheet, Pressable, Modal, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useFormik } from "formik";
import uuid from "react-native-uuid";

import { AppContext } from "../../context/AppContext";
import GlobalStyle from "../../style/GlobalStyle";
import { validationSchema } from "../../validationSchema/modalValidationSchema";
import useIsKeyboardVisible from "../../hooks/useIsKeyboardVisible";
import CustomButton from "../CustomButton";
import { ProductCategory, ProductCompartment, ProductDate, ProductName, ProductQuantity } from "./components";

const CustomModal = () => {
  const ctx = useContext(AppContext);
  const isKeyboardVisible = useIsKeyboardVisible();
  const closeModal = () => {
    ctx.productToUpdate && ctx.updateProduct(null);
    return ctx.setModalVisible();
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      compartment: "",
      quantity: "",
      boughtDate: "",
      expiryDate: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      if (ctx.productToUpdate) {
        ctx.dispatch({
          type: "UPDATE_PRODUCT",
          payload: {
            value: { ...values, bought: values.quantity, categoryAll: "All", id: ctx.productToUpdate.id.toString() },
          },
        });
        ctx.setModalVisible();
      } else {
        ctx.setModalVisible();
        ctx.dispatch({
          type: "ADD_PRODUCT",
          payload: { ...values, bought: values.quantity, categoryAll: "All", id: uuid.v4() },
        });
      }
      actions.resetForm();
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    if (ctx.productToUpdate) {
      formik.setValues({
        name: ctx.productToUpdate.name,
        category: ctx.productToUpdate.category,
        compartment: ctx.productToUpdate.compartment,
        quantity: ctx.productToUpdate.quantity,
        boughtDate: ctx.productToUpdate.boughtDate.toString(),
        expiryDate: ctx.productToUpdate.expiryDate.toString(),
      });
    }
  }, [ctx.productToUpdate]);

  return (
    <>
      <Modal statusBarTranslucent={true} animationType="slide" transparent={true} visible={ctx.isModalVisible}>
        <Pressable onPress={() => (closeModal(), formik.resetForm())} style={styles.modalOutside}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={[
                styles.modalContent,
                isKeyboardVisible && { height: "75%", justifyContent: "flex-start", paddingTop: 30 },
              ]}
            >
              <View style={styles.modalSection}>
                <ProductName
                  formikValue={formik.values.name}
                  formikErrorMsg={formik.errors.name}
                  formikOnChange={formik.handleChange("name")}
                />
                <ProductCategory
                  formikErrorMsg={formik.errors.category}
                  formikOnChange={formik.handleChange("category")}
                  isKeyboardVisible={isKeyboardVisible}
                />
              </View>
              <View style={styles.modalSection}>
                <ProductCompartment
                  formikErrorMsg={formik.errors.compartment}
                  formikOnChange={formik.handleChange("compartment")}
                />
                <ProductQuantity
                  formikValue={formik.values.quantity}
                  formikErrorMsg={formik.errors.quantity}
                  formikOnChange={formik.handleChange("quantity")}
                />
              </View>
              <View style={[styles.modalSection, { flexDirection: "column" }]}>
                <ProductDate
                  formikBoughtErrorMsg={formik.errors.boughtDate}
                  formikExpiryErrorMsg={formik.errors.expiryDate}
                  formikOnChangeBoughtDate={formik.handleChange("boughtDate")}
                  formikOnChangeExpiryDate={formik.handleChange("expiryDate")}
                />
              </View>
              <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-evenly", marginTop: 20 }}>
                <CustomButton
                  onPress={formik.handleSubmit}
                  title={ctx.productToUpdate ? "Update" : "Save"}
                  fontSize={20}
                  additionalStyle={styles.saveButton}
                />
                <CustomButton
                  iconName="close-outline"
                  iconSize={40}
                  fontSize={20}
                  formikResetForm={formik.resetForm}
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
    gap: 10,
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
