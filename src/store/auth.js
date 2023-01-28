import { createSlice } from "@reduxjs/toolkit";

const savedToken = localStorage.getItem('token') || '';
const savedEmail = localStorage.getItem('email') || '';

const initialAuthState = {
  isLoggedIn: !!savedToken,
  token: savedToken,
  email: savedEmail,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state,action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
