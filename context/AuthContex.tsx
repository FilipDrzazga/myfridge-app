import React, { createContext, useState } from "react";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type ContextValue = {
  isUserActive: boolean;
  activeUser: (isActive: boolean) => void;
};

export const AuthContext = createContext<ContextValue | null>(null);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isUserActive, setIsUserActive] = useState(false);

  const ctx: ContextValue = {
    isUserActive,
    activeUser(isActive) {
      return setIsUserActive(isActive);
    },
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
