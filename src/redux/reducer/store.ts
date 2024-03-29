import { configureStore } from "@reduxjs/toolkit";
import { productAPI } from "../api/productAPI";
import { userAPI } from "../api/userAPI";
import { userReducer } from "./userReducer";
import { cartReducer } from "./cartReducer";
import { orderApi } from "../api/orderAPI";
import { dashboardApi } from "../api/dashboardAPI";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  middleware: (mid) => [
    ...mid(),
    userAPI.middleware,
    productAPI.middleware,
    orderApi.middleware,
    dashboardApi.middleware,
  ],
});

export type Rootstate = ReturnType<typeof store.getState>;
