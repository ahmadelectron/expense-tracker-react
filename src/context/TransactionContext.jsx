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
  // اگر در لوکال نبود، این دسته‌بندی‌های پیش‌فرض را بگذار
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
      // جلوگیری از اضافه کردن دسته تکراری
      if (state.categories.includes(action.payload)) return state;
      return { ...state, categories: [...state.categories, action.payload] };
    default:
      return state;
  }
};

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  // ذخیره تراکنش‌ها
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state.transactions));
  }, [state.transactions]);

  // ذخیره دسته‌بندی‌های جدید
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

// // src/context/TransactionContext.jsx

// import React, {
//   createContext,
//   useReducer,
//   useContext,
//   useEffect,
//   useCallback,
//   useMemo,
// } from "react";

// const initialState = {
//   transactions: JSON.parse(localStorage.getItem("transactions")) || [],
// };

// const transactionReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_TRANSACTION":
//       return {
//         ...state,
//         transactions: [action.payload, ...state.transactions],
//       };
//     case "DELETE_TRANSACTION":
//       return {
//         ...state,
//         transactions: state.transactions.filter((t) => t.id !== action.payload),
//       };
//     default:
//       return state;
//   }
// };

// const TransactionContext = createContext();

// export const TransactionProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(transactionReducer, initialState);

//   useEffect(() => {
//     localStorage.setItem("transactions", JSON.stringify(state.transactions));
//   }, [state.transactions]);

//   // ۱. استفاده از useCallback برای اضافه کردن تراکنش
//   const addTransaction = useCallback((transaction) => {
//     dispatch({ type: "ADD_TRANSACTION", payload: transaction });
//   }, []); // آرایه وابستگی خالی است چون به متغیر بیرونی وابسته نیست

//   // ۲. استفاده از useCallback برای حذف تراکنش
//   const deleteTransaction = useCallback((id) => {
//     dispatch({ type: "DELETE_TRANSACTION", payload: id });
//   }, []);

//   // ۳. بهینه‌سازی نهایی: استفاده از useMemo برای مقادیر ارسالی در کانتکست
//   // این کار باعث می‌شود کامپوننت‌های مصرف‌کننده فقط وقتی تراکنش‌ها تغییر کردند رندر شوند
//   const value = useMemo(
//     () => ({
//       transactions: state.transactions,
//       addTransaction,
//       deleteTransaction,
//     }),
//     [state.transactions, addTransaction, deleteTransaction],
//   );

//   return (
//     <TransactionContext.Provider value={value}>
//       {children}
//     </TransactionContext.Provider>
//   );
// };

// export const useTransactions = () => useContext(TransactionContext);

// // src/context/TransactionContext.jsx

// import React, { createContext, useReducer, useContext, useEffect } from "react";

// // ۱. وضعیت اولیه (Initial State)
// const initialState = {
//   transactions: JSON.parse(localStorage.getItem("transactions")) || [],
// };

// // ۲. تابع Reducer برای مدیریت تغییرات
// const transactionReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_TRANSACTION":
//       return {
//         ...state,
//         transactions: [action.payload, ...state.transactions],
//       };
//     case "DELETE_TRANSACTION":
//       return {
//         ...state,
//         transactions: state.transactions.filter((t) => t.id !== action.payload),
//       };
//     default:
//       return state;
//   }
// };

// // ۳. ایجاد Context
// const TransactionContext = createContext();

// // ۴. ساخت Provider (تأمین‌کننده داده برای کل برنامه)
// export const TransactionProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(transactionReducer, initialState);

//   // ذخیره در LocalStorage هر وقت لیست تغییر کرد
//   useEffect(() => {
//     localStorage.setItem("transactions", JSON.stringify(state.transactions));
//   }, [state.transactions]);

//   // توابع کمکی برای تمیزی کد
//   const addTransaction = (transaction) => {
//     dispatch({ type: "ADD_TRANSACTION", payload: transaction });
//   };

//   const deleteTransaction = (id) => {
//     dispatch({ type: "DELETE_TRANSACTION", payload: id });
//   };

//   return (
//     <TransactionContext.Provider
//       value={{
//         transactions: state.transactions,
//         addTransaction,
//         deleteTransaction,
//       }}
//     >
//       {children}
//     </TransactionContext.Provider>
//   );
// };

// // ۵. یک هوک اختصاصی برای استفاده راحت‌تر در کامپوننت‌ها
// export const useTransactions = () => useContext(TransactionContext);
