import { useState, useEffect } from "react";
import { Keyboard } from "react-native";

const useIsKeyboardVisible = (): boolean => {
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => setKeyboardIsVisible(true));
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => setKeyboardIsVisible(false));

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return keyboardIsVisible;
};

export default useIsKeyboardVisible;
