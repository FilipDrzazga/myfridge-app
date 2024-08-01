import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";

import { AuthContext } from "../context/AuthContex";
import { AppContext } from "../context/AppContext";
import GlobalStyle from "../style/GlobalStyle";
import CustomButton from "../components/CustomButton";
import { getFriendlyFirebaseAuthErrorMessage } from "../helpers";
import { FIREBASE_AUTH, signOut } from "../firebase/firebaseConfig";

const SettingsScreen = () => {
  const ctxAuth = useContext(AuthContext);
  const ctxApp = useContext(AppContext);
  const [itemsCounter, setItemsCounter] = useState(0);

  const showToast = (message) => {
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const signOutUser = () => {
    signOut(FIREBASE_AUTH)
      .then(() => {
        ctxAuth.activeUser(false);
        ctxApp.loadingIndicator(false);
      })
      .catch((error) => {
        showToast(getFriendlyFirebaseAuthErrorMessage(error.code));
      });
  };

  useEffect(() => {
    setItemsCounter(ctxApp.getNumberOfItems());
  }, [ctxApp.state]);

  return (
    <View style={styles.container}>
      <View style={styles.userInformationBtns}>
        <View style={styles.usernameBtnContainer}>
          <CustomButton
            onPress={signOutUser}
            iconName="person-outline"
            iconSize={35}
            title={`${ctxAuth.userEmail}`}
            fontSize={20}
            iconColor={GlobalStyle.colors.black}
            fontColor={GlobalStyle.colors.black}
            additionalStyle={styles.usernameBtn}
          />
        </View>
        <View style={styles.itemCounterBtnContainer}>
          <CustomButton
            onPress={signOutUser}
            iconName="cloud-outline"
            iconSize={35}
            title={itemsCounter === 1 ? `${itemsCounter} product` : `${itemsCounter} products`}
            fontSize={20}
            iconColor={GlobalStyle.colors.black}
            fontColor={GlobalStyle.colors.black}
            additionalStyle={styles.itemCounterBtn}
          />
        </View>
      </View>
      <View style={styles.logoutBtnContainer}>
        <CustomButton
          onPress={signOutUser}
          iconName="log-out-outline"
          iconSize={40}
          title="Sign out"
          fontSize={20}
          iconColor={GlobalStyle.colors.screen.background}
          fontColor={GlobalStyle.colors.screen.background}
          additionalStyle={styles.logoutBtn}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  userInformationBtns: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 0,
  },
  logoutBtnContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    width: "90%",
    height: 80,
    marginBottom: 40,
    backgroundColor: GlobalStyle.colors.black,
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
  usernameBtnContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "90%",
    height: 80,
    marginTop: 20,
    backgroundColor: GlobalStyle.colors.modal.background,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  usernameBtn: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingLeft: 20,
    gap: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  itemCounterBtnContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "90%",
    height: 80,
    marginTop: 2,
    backgroundColor: GlobalStyle.colors.modal.background,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  itemCounterBtn: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingLeft: 20,
    gap: 15,
  },
});
