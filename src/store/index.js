import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import expensesReducer from "./expenses";

const store = configureStore({
  reducer: { auth: authReducer, expenses: expensesReducer },
});

export default store;
