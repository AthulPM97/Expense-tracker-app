import { createSlice } from "@reduxjs/toolkit";

const initialExpensesState = {
  expenses: [],
  premiumEligible: false,
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
    },
    eligibleForPremium(state,action) {
      state.premiumEligible = action.payload;
    },
  },
});

export const expensesActions = expensesSlice.actions;

export default expensesSlice.reducer;
