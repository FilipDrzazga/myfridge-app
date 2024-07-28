import React, { createContext, useState } from "react";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type ContextValue = {
  userId: string;
  isUserActive: boolean;
  getUserId: (userId: string) => void;
  activeUser: (isActive: boolean) => void;
};

export const AuthContext = createContext<ContextValue | null>(null);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [userId, setUserId] = useState("");
  const [isUserActive, setIsUserActive] = useState(false);

  const ctx: ContextValue = {
    userId,
    isUserActive,
    activeUser(isActive) {
      return setIsUserActive(isActive);
    },
    getUserId(userId) {
      return setUserId(userId);
    },
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
