import React, { useReducer, createContext, useState } from "react";

type Action =
  | { type: "ADD_PRODUCT"; payload: State }
  | { type: "REMOVE_PRODUCT"; payload: Pick<State, "id"> }
  | {
      type: "UPDATE_PRODUCT";
      payload: { field: string; id: string; action?: string; value?: string | number | boolean };
    };

export type State = {
  id: string | number[];
  name: string;
  categoryAll: string;
  category: string;
  compartment: string;
  quantity: string;
  bought: string;
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
  isModalVisible: boolean;
  productToUpdate: null | State;
  getCurrentTabCompartment: (compartment: string) => void;
  setModalVisible: () => void;
  updateProduct: (product?: State | null) => void;
};

const reducer = (state: State[] | [], action: Action) => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const { payload } = action;
      const newState = [...state, payload];
      return newState;
    }
    case "REMOVE_PRODUCT": {
      console.log("remove from state", state);
      return { ...state };
    }
    case "UPDATE_PRODUCT": {
      const { payload } = action;

      const maxValue = 99;
      const minValue = 0;

      const newState = state.map((item) => {
        if (payload.field === "quantity") {
          if (payload.action === "increase" && item.quantity < maxValue) {
            return item.id === payload.id ? { ...item, quantity: +item.quantity + 1 } : item;
          }
          if (payload.action === "decrease" && item.quantity > minValue) {
            return item.id === payload.id ? { ...item, quantity: +item.quantity - 1 } : item;
          }
          return item;
        }

        return { ...item, [payload.field]: payload.value };
      });
      return newState;
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productToUpdate, setProductToUpdated] = useState<null | State>(null);
  console.log(state);

  const ctx: ContextValue = {
    state,
    dispatch,
    activeCompartmentTab,
    isModalVisible,
    productToUpdate,
    getCurrentTabCompartment(value) {
      return setActiveCompartmentTab(value);
    },
    setModalVisible() {
      return setIsModalVisible(!isModalVisible);
    },
    updateProduct(product) {
      return product ? setProductToUpdated(product) : setProductToUpdated(null);
    },
  };

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
