import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { AuthContext } from "../context/AuthContex";
import GlobalStyle from "../style/GlobalStyle";
import CustomButton from "../components/CustomButton";
import { FIREBASE_AUTH, signOut } from "../firebase/firebaseConfig";

const SettingsScreen = () => {
  const ctx = useContext(AuthContext);

  const signOutUser = () => {
    signOut(FIREBASE_AUTH)
      .then(() => {
        ctx.activeUser(false);
      })
      .catch((error) => {
        // An error happened.
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
