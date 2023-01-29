import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {theme: "light"},
  reducers: {
    switchTheme(state) {
      state.theme = "dark";
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
