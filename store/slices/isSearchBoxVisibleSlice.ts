import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface searchBoxVisibleState {
    value: boolean;
}

const initialState: searchBoxVisibleState = {
    value: false,
};

const searchBoxVisibleSlice = createSlice({
    name: "searchBoxVisible",
    initialState,
    reducers: {
      setSearchBoxVisible: (state, action: PayloadAction<boolean>) => {
        state.value = action.payload;
      },
      clearSearchBoxVisible: (state) => {
        state.value = false;
      },
    },
});

export const { setSearchBoxVisible, clearSearchBoxVisible } = searchBoxVisibleSlice.actions;
export default searchBoxVisibleSlice.reducer;