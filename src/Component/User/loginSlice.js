import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  data: {},
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state, { payload }) => {
      state.isAuth = true;
      state.data = payload;
    },
    logOut: (state) => {
      state.isAuth = false;
      state.data = {};
    },
  },
});
const { reducer, actions } = loginSlice;

export const { loginSuccess, logOut, userData } = actions;
export default reducer;
