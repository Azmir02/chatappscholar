import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "Login",
  initialState: {
    loggedIn: JSON.parse(localStorage.getItem("user")) || null,
  },
  reducers: {
    LoggedInUser: (state, action) => {
      state.loggedIn = action.payload;
    },
    LogeOutUser: (state) => {
      state.loggedIn = null;
    },
  },
});

export const { LoggedInUser, LogeOutUser } = userSlice.actions;

export default userSlice.reducer;
