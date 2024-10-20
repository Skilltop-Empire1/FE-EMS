import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import loginReducer from "./slice/loginSlice";
import departmentApi from "./api/departmentApi";
import actionCellReducer from "./slice/actionCellSlice";

const store = configureStore({
    reducer: {
        login: loginReducer,
        actionCell: actionCellReducer,
        [authApi.reducerPath]: authApi.reducer,
        [departmentApi.reducerPath]: departmentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware, departmentApi.middleware),
});

export default store;
