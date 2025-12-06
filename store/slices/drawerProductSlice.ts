import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from '@/types/types';

interface drawerSessionState {
    value: Product[];
}

const initialState: drawerSessionState = {
    value: [],
};

const drawerSessionSlice = createSlice({
    name: "drawerSession",
    initialState,
    reducers: {
      setDrawerSession: (state, action: PayloadAction<Product[]>) => {
        state.value = action.payload;
      },
      clearDrawerSession: (state) => {
        state.value = [];
      },
    },
});

export const { setDrawerSession, clearDrawerSession } = drawerSessionSlice.actions;
export default drawerSessionSlice.reducer;