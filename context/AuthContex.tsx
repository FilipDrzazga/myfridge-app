import React, { createContext, useState } from "react";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type ContextValue = {
  isUserLogin: boolean;
  setIsUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<ContextValue | null>(null);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isUserLogin, setIsUserLogin] = useState(false);

  const ctx: ContextValue = {
    isUserLogin,
    setIsUserLogin,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
