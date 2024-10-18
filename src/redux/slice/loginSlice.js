import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginSuccessful: (state, action )=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
})

export const { loginSuccessful, logout } = loginSlice.actions;

export default loginSlice.reducer;