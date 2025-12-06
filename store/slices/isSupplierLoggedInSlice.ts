import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface isSupplierLoggedInState {
    value: boolean;
}

const initialState: isSupplierLoggedInState = {
    value: false,
};

const isSupplierLoggedInSlice = createSlice({
    name: "isSupplierLoggedIn",
    initialState,
    reducers: {
      setIsSupplierLoggedIn: (state, action: PayloadAction<boolean>) => {
        state.value = action.payload;
      },
      clearIsSupplierLoggedIn: (state) => {
        state.value = false;
      },
    },
});

export const { setIsSupplierLoggedIn, clearIsSupplierLoggedIn } = isSupplierLoggedInSlice.actions;
export default isSupplierLoggedInSlice.reducer;