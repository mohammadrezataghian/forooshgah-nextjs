'use client'

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface isUserloggedInState {
    value: boolean;
}

const initialState: isUserloggedInState = {
    value: !!Cookies.get('user'),
};

const isUserloggedInSlice = createSlice({
    name: "isUserloggedIn",
    initialState,
    reducers: {
      setIsUserloggedIn: (state, action: PayloadAction<boolean>) => {
        state.value = action.payload;
      },
      clearIsUserloggedIn: (state) => {
        state.value = false;
      },
    },
});

export const { setIsUserloggedIn, clearIsUserloggedIn } = isUserloggedInSlice.actions;
export default isUserloggedInSlice.reducer;