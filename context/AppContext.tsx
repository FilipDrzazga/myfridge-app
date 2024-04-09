import React, { createContext } from "react";

interface AppContextType {
  addProduct: () => void;
  removeProduct: () => void;
  editProduct: () => void;
}

interface AppContextProviderProps {
  children: React.ReactNode;
}

const AppContext = createContext<AppContextType | null>(null);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const ctx: AppContextType = {
    addProduct: () => {},
    removeProduct: () => {},
    editProduct: () => {},
  };
  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
