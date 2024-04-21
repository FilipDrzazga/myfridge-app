import React, { useReducer, createContext } from "react";

type Action =
  | { type: "ADD_PRODUCT"; payload: State }
  | { type: "REMOVE_PRODUCT"; payload: Pick<State, "id"> }
  | { type: "UPDATE_PRODUCT"; payload: State };

type State = {
  id: string | number[];
  name: string;
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
  state: State;
  dispatch: React.Dispatch<Action>;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      return console.log(action.payload);
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

const initialState: State = {
  id: "",
  name: "",
  category: "",
  compartment: "",
  quantity: null,
  boughtDate: null,
  expiryDate: null,
};

export const AppContext = createContext<ContextValue | null>(null);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const ctx = {
    state,
    dispatch,
  };
  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
