import React, { createContext, useState } from "react";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type ContextValue = {
  userId: string;
  userEmail: string;
  isUserActive: boolean;
  getUserId: (userId: string) => void;
  getUserEmail: (userEmail: string) => void;
  activeUser: (isActive: boolean) => void;
};

export const AuthContext = createContext<ContextValue | null>(null);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isUserActive, setIsUserActive] = useState(false);

  const ctx: ContextValue = {
    userId,
    userEmail,
    isUserActive,
    activeUser(isActive) {
      return setIsUserActive(isActive);
    },
    getUserId(userId) {
      return setUserId(userId);
    },
    getUserEmail(userEmail) {
      const email = userEmail;
      const match = email.match(/^[^@]+/);

      if (match) {
        const result = match[0];
        return setUserEmail(result);
      }
    },
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
