import { createContext, useContext, useEffect, useReducer } from "react";

// import reducer
import reducer from "./reducer";
import cartItems from "./data";

// import utils
import { getTotals } from "./utils";

// import actions
import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from "./actions";

const url = "https://www.course-api.com/react-useReducer-cart-project";

const AppContext = createContext();

const initialState = {
  loading: true,
  cart: new Map(),
};

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { totalAmount, totalCost } = getTotals(state.cart);

  // handle function clearCart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  // handle function remove
  const remove = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
  };

  // handle function increase
  const increase = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };

  // handle function decrease
  const decrease = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };

  const fetchData = async () => {
    // loading true
    dispatch({ type: LOADING });

    const response = await fetch(url);
    const cart = await response.json();
    // console.log(cart);

    // loading false
    dispatch({ type: DISPLAY_ITEMS, payload: { cart } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(AppContext);
}
