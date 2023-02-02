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
    editExpense(state,action) {
      const existingExpense = state.expenses.find((expense) => expense.id === action.payload.id);
      existingExpense.amount = action.payload.amount;
      existingExpense.category = action.payload.category;
      existingExpense.description = action.payload.description;
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
