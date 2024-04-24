import React, { useReducer, createContext, useState } from "react";

type Action =
  | { type: "ADD_PRODUCT"; payload: State }
  | { type: "REMOVE_PRODUCT"; payload: Pick<State, "id"> }
  | { type: "UPDATE_PRODUCT"; payload: State };

type State = {
  id: string | number[];
  name: string;
  categoryAll: string;
  category: string;
  compartment: string;
  quantity: string;
  boughtDate: string | number;
  expiryDate: string | number;
};

type AppContextProviderProps = {
  children: React.ReactNode;
};

type ContextValue = {
  state: State[] | [];
  dispatch: React.Dispatch<Action>;
  activeCompartmentTab: string;
  getCurrentTabCompartment: (compartment: string) => void;
};

const reducer = (state: State[] | [], action: Action) => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const { payload } = action;
      const newArr = [...state, payload];
      return newArr;
    }
    case "REMOVE_PRODUCT": {
      console.log("remove from state", state);
      return { ...state };
    }
    case "UPDATE_PRODUCT": {
      console.log("updated", state);
      return state;
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
};

const initialState: State[] | [] = [];

export const AppContext = createContext<ContextValue | null>(null);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [activeCompartmentTab, setActiveCompartmentTab] = useState("");
  // console.log(compartment);
  const ctx: ContextValue = {
    state,
    dispatch,
    activeCompartmentTab,
    getCurrentTabCompartment(value) {
      return setActiveCompartmentTab(value);
    },
  };

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
