import React, { useReducer, createContext, useState } from "react";

type Action =
  | { type: "ADD_PRODUCT"; payload: State }
  | { type: "REMOVE_PRODUCT" }
  | {
      type: "UPDATE_PRODUCT";
      payload: {
        field?: "quantity";
        id?: string;
        action?: "increase" | "decrease" | "resetSelection";
        value?: Partial<State>;
        isSelected?: boolean;
      };
    };

export type State = {
  id: string;
  name: string;
  categoryAll: string;
  category: string;
  compartment: string;
  quantity: string;
  bought: string;
  boughtDate: string | number;
  expiryDate: string | number;
  isSelected?: boolean;
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
  isSelectedToDelete: boolean;
  productsToDelete: string[];
  loader: boolean;
  getCurrentTabCompartment: (compartment: string) => void;
  setModalVisible: () => void;
  updateProduct: (product?: State | null) => void;
  selectToDelete: (isSelected: boolean) => void;
  updateProductsToDelete: (poductId?: string) => void;
  isLoading: (isLoading: boolean) => void;
};

const reducer = (state: State[] | [], action: Action) => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const { payload } = action;
      const newState = [...state, payload];
      return newState;
    }
    case "REMOVE_PRODUCT": {
      const newState = state.filter((item) => item.isSelected === false);

      return newState;
    }
    case "UPDATE_PRODUCT": {
      const { payload } = action;

      const maxValue = 99;
      const minValue = 0;

      const newState = state.map((item) => {
        if (payload.field === "quantity") {
          if (payload.action === "increase" && +item.quantity < maxValue) {
            return item.id === payload.id ? { ...item, quantity: +item.quantity + 1 } : item;
          }
          if (payload.action === "decrease" && +item.quantity > minValue) {
            return item.id === payload.id ? { ...item, quantity: +item.quantity - 1 } : item;
          }
          return item;
        }
        if (payload.action === "resetSelection") {
          return { ...item, isSelected: false };
        }
        if (payload.value.id === item.id) {
          return (item = { ...payload.value });
        }
        return item;
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
  const [isSelectedToDelete, setIsSelectedToDelete] = useState(false);
  const [productsToDelete, setProductsToDelete] = useState([]);
  const [loader, setLoader] = useState(false);

  const ctx: ContextValue = {
    state,
    dispatch,
    activeCompartmentTab,
    isModalVisible,
    productToUpdate,
    isSelectedToDelete,
    productsToDelete,
    loader,
    getCurrentTabCompartment(value) {
      return setActiveCompartmentTab(value);
    },
    setModalVisible() {
      return setIsModalVisible(!isModalVisible);
    },
    updateProduct(product) {
      return product ? setProductToUpdated(product) : setProductToUpdated(null);
    },
    selectToDelete(isSelected) {
      return setIsSelectedToDelete(isSelected);
    },
    updateProductsToDelete(productId) {
      if (!productId) {
        return setProductsToDelete([]);
      } else if (productId) {
        return setProductsToDelete((prevState) => [...prevState, productId]);
      }
    },
    isLoading(isLoading) {
      setLoader(isLoading);
    },
  };

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
