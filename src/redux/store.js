import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import loginReducer from "./slice/loginSlice";
import departmentApi from "./api/departmentApi";
import staffApi from "./api/staffApi";
import actionCellReducer from "./slice/actionCellSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    actionCell: actionCellReducer,
    [authApi.reducerPath]: authApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [staffApi.reducerPath]: staffApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      departmentApi.middleware,
      staffApi.middleware
    ),
});

export default store;
