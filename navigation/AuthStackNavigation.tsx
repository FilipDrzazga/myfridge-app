import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../screen/SignUpScreen";
import SignInScreen from "../screen/SignInScreen";
import PasswordScreen from "../screen/PasswordScreen";
import AuthScreen from "../screen/AuthScreen";

export type RootStackParams = {
  AuthScreen: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Password: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

const AuthStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="AuthScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          gestureEnabled: false,
          animation: "none",
        }}
      />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Password" component={PasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigation;
