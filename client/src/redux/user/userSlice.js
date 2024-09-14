import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    currentUser: null,
    loading: false,
    error: false
};

const userSlice = createSlice({
    name: "user",
    initialState: initalState,
    reducers: {
        signStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        signSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOut: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        clearError: (state) => {
            state.error = false;
        }
    }
});

export const { signStart, signSuccess, signFailure, signOut, clearError } = userSlice.actions;
export default userSlice.reducer;
