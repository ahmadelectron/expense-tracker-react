import { createSlice } from "@reduxjs/toolkit";

const savedTransactions =
  JSON.parse(localStorage.getItem("transactions")) || [];
const savedCategories = JSON.parse(localStorage.getItem("categories")) || [
  "خوراکی",
  "اجاره",
  "حقوق",
  "تفریح",
  "سایر",
];

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    list: savedTransactions,
    categories: savedCategories,
  },
  reducers: {
    addTransaction: (state, action) => {
      state.list.push(action.payload);
      localStorage.setItem("transactions", JSON.stringify(state.list));
    },
    deleteTransaction: (state, action) => {
      state.list = state.list.filter((t) => t.id !== action.payload);
      localStorage.setItem("transactions", JSON.stringify(state.list));
    },
    addCategory: (state, action) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
        localStorage.setItem("categories", JSON.stringify(state.categories));
      }
    },
  },
});

export const { addTransaction, deleteTransaction, addCategory } =
  transactionSlice.actions;
export default transactionSlice.reducer;
