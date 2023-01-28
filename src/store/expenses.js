import { createSlice } from "@reduxjs/toolkit";

const initialExpensesState = {
  expenses: [],
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState: initialExpensesState,
  reducers: {
    addExpense(state, action) {
      state.expenses = [...state.expenses, action.payload];
    },
    deleteExpense(state, action) {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
    },
    fetchExpenses(state,action) {
      state.expenses = [...state.expenses, action.payload];
    },
    emptyExpenses(state) {
      state.expenses = [];
    }
  },
});

export const expensesActions = expensesSlice.actions;

export default expensesSlice.reducer;
