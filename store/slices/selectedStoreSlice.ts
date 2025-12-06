import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface selectedStoreState {
    value: number;
}

const initialState: selectedStoreState = {
    value: 0,
};

const selectedStoreSlice = createSlice({
    name: "selectedStore",
    initialState,
    reducers: {
      setSelectedStore: (state, action: PayloadAction<number>) => {
        state.value = action.payload;
      },
      clearSelectedStore: (state) => {
        state.value = 0;
      },
    },
});

export const { setSelectedStore, clearSelectedStore } = selectedStoreSlice.actions;
export default selectedStoreSlice.reducer;