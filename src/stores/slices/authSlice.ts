import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;

      return state;
    },
    logout: (state) => {
      state.user = null;
      return state;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
