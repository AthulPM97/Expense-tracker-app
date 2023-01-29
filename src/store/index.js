import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import expensesReducer from "./expenses";
import themeReducer from "./theme";

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
    theme: themeReducer,
  },
});

export default store;
