import { createSlice } from "@reduxjs/toolkit";

const savedToken = localStorage.getItem('token') || '';
const userID = localStorage.getItem('uid') || '';

const initialAuthState = {
  isLoggedIn: !!savedToken,
  token: savedToken,
  userID: userID,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state,action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userID = action.payload.localId;
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('uid');
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
