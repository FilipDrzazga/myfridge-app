import React, { useContext, useEffect } from "react";
import { StyleSheet, Pressable, Modal, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useFormik } from "formik";
import uuid from "react-native-uuid";

import { AppContext } from "../../context/AppContext";
import { AuthContext } from "../../context/AuthContex";
import GlobalStyle from "../../style/GlobalStyle";
import { validationSchema } from "../../validationSchema/modalValidationSchema";
import useIsKeyboardVisible from "../../hooks/useIsKeyboardVisible";
import CustomButton from "../CustomButton";
import { ProductCategory, ProductCompartment, ProductDate, ProductName, ProductQuantity } from "./components";
import { FIREBASE_DB, push, ref, set } from "../../firebase/firebaseConfig";

const CustomModal = () => {
  const ctxApp = useContext(AppContext);
  const ctxAuth = useContext(AuthContext);
  const isKeyboardVisible = useIsKeyboardVisible();
  const closeModal = () => {
    ctxApp.productToUpdate && ctxApp.updateProduct(null);
    return ctxApp.setModalVisible();
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
      const uniqueId = uuid.v4().toString();
      const fridgeRef = ref(FIREBASE_DB, `users/${ctxAuth.userId}/fridge`);

      if (ctxApp.productToUpdate) {
        const productRefUpdated = ref(
          FIREBASE_DB,
          `users/${ctxAuth.userId}/fridge/${ctxApp.productToUpdate.databaseRefId}`
        );
        set(productRefUpdated, {
          ...values,
          bought: values.quantity,
          categoryAll: "All",
          id: ctxApp.productToUpdate.id.toString(),
          isSelected: false,
          databaseRefId: ctxApp.productToUpdate.databaseRefId,
        });
        ctxApp.dispatch({
          type: "UPDATE_PRODUCT",
          payload: {
            value: { ...values, bought: values.quantity, categoryAll: "All", id: ctxApp.productToUpdate.id.toString() },
          },
        });
        return ctxApp.setModalVisible();
      } else if (!ctxApp.productToUpdate) {
        ctxApp.setModalVisible();
        const newFridgeItemRef = push(fridgeRef);
        set(newFridgeItemRef, {
          ...values,
          bought: values.quantity,
          categoryAll: "All",
          id: uniqueId,
          isSelected: false,
          databaseRefId: newFridgeItemRef.key,
        });
        ctxApp.dispatch({
          type: "ADD_PRODUCT",
          payload: {
            data: {
              ...values,
              bought: values.quantity,
              categoryAll: "All",
              id: uniqueId,
              isSelected: false,
              databaseRefId: newFridgeItemRef.key,
            },
          },
        });
      }
      actions.resetForm();
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    if (ctxApp.productToUpdate) {
      formik.setValues({
        name: ctxApp.productToUpdate.name,
        category: ctxApp.productToUpdate.category,
        compartment: ctxApp.productToUpdate.compartment,
        quantity: ctxApp.productToUpdate.quantity,
        boughtDate: ctxApp.productToUpdate.boughtDate.toString(),
        expiryDate: ctxApp.productToUpdate.expiryDate.toString(),
      });
    }
  }, [ctxApp.productToUpdate]);

  return (
    <>
      <Modal statusBarTranslucent={true} animationType="slide" transparent={true} visible={ctxApp.isModalVisible}>
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
                  title={ctxApp.productToUpdate ? "Update" : "Save"}
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
    </>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
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
