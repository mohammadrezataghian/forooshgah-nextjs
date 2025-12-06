import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface payfullOrPartState {
    value: boolean;
}

const initialState: payfullOrPartState = {
    value: false,
};

const payfullOrPartSlice = createSlice({
    name: "payfullOrPart",
    initialState,
    reducers: {
      setPayfullOrPart: (state, action: PayloadAction<boolean>) => {
        state.value = action.payload;
      },
      clearPayfullOrPart: (state) => {
        state.value = false;
      },
    },
});

export const { setPayfullOrPart, clearPayfullOrPart } = payfullOrPartSlice.actions;
export default payfullOrPartSlice.reducer;