import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const initialState = {
  transactions: JSON.parse(localStorage.getItem("transactions")) || [],
  categories: JSON.parse(localStorage.getItem("categories")) || [
    "food",
    "transport",
    "bills",
    "other",
  ],
};

const transactionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case "ADD_CATEGORY":
      if (state.categories.includes(action.payload)) return state;
      return { ...state, categories: [...state.categories, action.payload] };
    default:
      return state;
  }
};

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state.transactions));
  }, [state.transactions]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(state.categories));
  }, [state.categories]);

  const addTransaction = useCallback((transaction) => {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  }, []);

  const deleteTransaction = useCallback((id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  }, []);

  const addCategory = useCallback((category) => {
    dispatch({ type: "ADD_CATEGORY", payload: category });
  }, []);

  const value = useMemo(
    () => ({
      transactions: state.transactions,
      categories: state.categories,
      addTransaction,
      deleteTransaction,
      addCategory,
    }),
    [
      state.transactions,
      state.categories,
      addTransaction,
      deleteTransaction,
      addCategory,
    ],
  );

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);
