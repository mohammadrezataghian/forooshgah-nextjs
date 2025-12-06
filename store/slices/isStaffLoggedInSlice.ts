import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface isStaffLoggedInState {
    value: boolean;
}

const initialState: isStaffLoggedInState = {
    value: false,
};

const isStaffLoggedInSlice = createSlice({
    name: "isStaffLoggedIn",
    initialState,
    reducers: {
      setIsStaffLoggedIn: (state, action: PayloadAction<boolean>) => {
        state.value = action.payload;
      },
      clearIsStaffLoggedIn: (state) => {
        state.value = false;
      },
    },
});

export const { setIsStaffLoggedIn, clearIsStaffLoggedIn } = isStaffLoggedInSlice.actions;
export default isStaffLoggedInSlice.reducer;