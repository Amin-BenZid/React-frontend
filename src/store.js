import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Component/User/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});
