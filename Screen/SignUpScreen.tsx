import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Keyboard } from "react-native";
import Animated, {
  useAnimatedStyle,
  useAnimatedKeyboard,
  useSharedValue,
  withTiming,
  ZoomInLeft,
  ZoomIn,
  ZoomInDown,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFormik } from "formik";

import GlobalStyle from "../style/GlobalStyle";
import CustomText from "../components/CustomText";
import ICONS_BACKGROUND from "../constants/ICONS_BACKGROUND";
import CustomInput from "../components/CustomInput";
import { signUpSchema } from "../validationSchema/modalValidationSchema";
import CustomButton from "../components/CustomButton";

const SignUpScreen = () => {
  const [keyboardStatus, setKeyboardStatus] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values, actions) => {
      console.log(values);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const keyboard = useAnimatedKeyboard({ isStatusBarTranslucentAndroid: true });
  const modalHeight = useSharedValue(500);
  const borderRadius = useSharedValue(50);

  const animatedModalHeight = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard.height.value + 39 }],
      height: modalHeight.value,
      borderTopRightRadius: borderRadius.value,
      borderTopLeftRadius: borderRadius.value,
    };
  });

  useEffect(() => {
    if (keyboardStatus === "Keyboard Shown") {
      borderRadius.value = withTiming(0);
    } else if (keyboardStatus === "Keyboard Hidden") {
      borderRadius.value = withTiming(50);
    }
    modalHeight.value = withTiming(800);

    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [keyboardStatus]);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundIcons}>
        {ICONS_BACKGROUND.map((icon, id) => (
          <Ionicons key={`icons-${id}`} name={icon.name} size={icon.size} color={icon.color} />
        ))}
      </View>
      <View style={styles.logoTxt}>
        <CustomText fontType="PoppinsBold" fontSize={50} color={GlobalStyle.colors.black}>
          fridge
        </CustomText>
      </View>
      <Animated.View style={[styles.modal, animatedModalHeight]}>
        <Animated.View entering={ZoomInLeft.delay(100)} style={styles.createAccountTxtContainer}>
          <CustomText fontSize={45} fontType="PoppinsBold" color={GlobalStyle.colors.screen.background}>
            Create account
          </CustomText>
          <CustomText
            additionalStyle={{ marginTop: -20 }}
            fontSize={16}
            fontType="PoppinsLight"
            color={GlobalStyle.colors.screen.background}
          >
            Join to your digital fridge now.
          </CustomText>
        </Animated.View>
        <View style={styles.inputsContainer}>
          <Animated.View entering={ZoomIn.delay(200)} style={styles.inputContainer}>
            <CustomInput
              inputValue={formik.values.email}
              formikOnChange={formik.handleChange("email")}
              label="Your email adress"
              labelColor={GlobalStyle.colors.screen.background}
              inputMode="email"
              cursorStyle={GlobalStyle.colors.screen.background}
              additionalStyle={styles.emailInput}
              additionalTextStyle={{ paddingLeft: 20, marginBottom: -10 }}
              textFontType={"PoppinsLight"}
            />
            <Text style={styles.errors}>{formik.errors.email}</Text>
          </Animated.View>
          <Animated.View entering={ZoomIn.delay(300)} style={styles.inputContainer}>
            <CustomInput
              inputValue={formik.values.password}
              formikOnChange={formik.handleChange("password")}
              label="Choose a password"
              labelColor={GlobalStyle.colors.screen.background}
              inputMode="text"
              secureTextEntry={true}
              cursorStyle={GlobalStyle.colors.screen.background}
              additionalStyle={styles.passwordInput}
              additionalTextStyle={{ paddingLeft: 20, marginBottom: -10 }}
              textFontType={"PoppinsLight"}
            />
            {/* <View style={styles.forgotPasswordAndErrorContainer}>
              <Text style={styles.errors}>{formik.errors.password}</Text>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </View> */}
            <Text style={styles.errors}>{formik.errors.password}</Text>
          </Animated.View>
        </View>
        <Animated.View entering={ZoomInDown.delay(350)} style={styles.buttonsContainer}>
          <CustomButton
            onPress={formik.handleSubmit}
            title="Create account"
            fontSize={20}
            additionalStyle={styles.createAccountBtn}
          />
          <View style={styles.separatorContainer}>
            <View style={styles.separator} />
            <View>
              <CustomText
                additionalStyle={{ width: 150, textAlign: "center" }}
                fontSize={16}
                fontType="PoppinsLight"
                color={GlobalStyle.colors.screen.background}
              >
                Or create with
              </CustomText>
            </View>
            <View style={styles.separator} />
          </View>
          <CustomButton
            iconName="logo-google"
            iconSize={30}
            onPress={formik.handleSubmit}
            title="oogle"
            fontSize={20}
            additionalStyle={styles.createAccountGoogleBtn}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyle.colors.screen.background,
  },
  backgroundIcons: {
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 60,
    width: "100%",
    height: "50%",
    marginTop: 40,
    opacity: 0.1,
  },
  logoTxt: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 60,
    width: "100%",
    paddingTop: 40,
    backgroundColor: GlobalStyle.colors.black,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  createAccountTxtContainer: { width: "90%", paddingLeft: 20, marginTop: -5 },
  inputsContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  inputContainer: { width: "100%", gap: 10 },
  emailInput: {
    width: "100%",
    height: 80,
    paddingHorizontal: 12,
    fontSize: 18,
    fontWeight: "500",
    color: GlobalStyle.colors.screen.background,
    borderWidth: 2,
    borderColor: GlobalStyle.colors.screen.background,
    borderRadius: 50,
    paddingLeft: 20,
    backgroundColor: "transparent",
  },
  passwordInput: {
    width: "100%",
    height: 80,
    paddingHorizontal: 12,
    fontSize: 18,
    fontWeight: "500",
    color: GlobalStyle.colors.screen.background,
    borderWidth: 2,
    borderColor: GlobalStyle.colors.screen.background,
    borderRadius: 50,
    paddingLeft: 20,
    backgroundColor: "transparent",
  },
  // forgotPasswordAndErrorContainer: {
  //   width: "100%",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   flexDirection: "row",
  // },
  errors: { width: "50%", color: "#ee313b", paddingLeft: 30, marginTop: -5 },
  // forgotPassword: {
  //   width: "50%",
  //   paddingLeft: 60,
  //   fontSize: 16,
  //   fontWeight: "regular",
  //   color: GlobalStyle.colors.screen.background,
  // },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 200,
    gap: 10,
  },
  createAccountBtn: {
    width: "90%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyle.colors.yellow,
    borderRadius: 15,
  },
  separatorContainer: { flexDirection: "row", alignItems: "center", width: "90%" },
  separator: { flex: 1, height: 1, backgroundColor: GlobalStyle.colors.screen.background },
  createAccountGoogleBtn: {
    width: "90%",
    height: 70,
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyle.colors.pink,
    borderRadius: 15,
  },
});
