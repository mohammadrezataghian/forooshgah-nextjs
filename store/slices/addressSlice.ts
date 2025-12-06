import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Address } from '@/types/types';

interface addressState {
    value: Address | undefined;
}

const initialState: addressState = {
    value: undefined,
};

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
      setAddress: (state, action: PayloadAction<Address | undefined>) => {
        state.value = action.payload;
      },
      clearAddress: (state) => {
        state.value = undefined;
      },
    },
});

export const { setAddress, clearAddress } = addressSlice.actions;
export default addressSlice.reducer;