import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface lastSearchValueState {
    value: string;
}

const initialState: lastSearchValueState = {
    value: "",
};

const lastSearchValueSlice = createSlice({
    name: "lastSearchValue",
    initialState,
    reducers: {
      setLastSearchValue: (state, action: PayloadAction<string>) => {
        state.value = action.payload;
      },
      clearLastSearchValue: (state) => {
        state.value = "";
      },
    },
});

export const { setLastSearchValue, clearLastSearchValue } = lastSearchValueSlice.actions;
export default lastSearchValueSlice.reducer;