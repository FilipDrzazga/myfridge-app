import React, { useContext } from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";

import { AuthContext } from "../context/AuthContex";
import GlobalStyle from "../style/GlobalStyle";
import CustomButton from "../components/CustomButton";
import { getFriendlyFirebaseAuthErrorMessage } from "../helpers";
import { FIREBASE_AUTH, signOut } from "../firebase/firebaseConfig";

const SettingsScreen = () => {
  const ctxAuth = useContext(AuthContext);

  const showToast = (message) => {
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const signOutUser = () => {
    signOut(FIREBASE_AUTH)
      .then(() => {
        ctxAuth.activeUser(false);
      })
      .catch((error) => {
        showToast(getFriendlyFirebaseAuthErrorMessage(error.code));
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoutBtnContainer}>
        <CustomButton
          onPress={signOutUser}
          iconName="log-out-outline"
          iconSize={40}
          title="Sign out"
          fontSize={20}
          iconColor={GlobalStyle.colors.black}
          fontColor={GlobalStyle.colors.black}
          additionalStyle={styles.logoutBtn}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  logoutBtnContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "90%",
    height: 80,
    marginTop: 20,
    backgroundColor: GlobalStyle.colors.modal.background,
    borderRadius: 15,
  },
  logoutBtn: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingLeft: 20,
    gap: 15,
    borderRadius: 15,
  },
});
