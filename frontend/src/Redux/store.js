import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
import userSlice from "./user/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
