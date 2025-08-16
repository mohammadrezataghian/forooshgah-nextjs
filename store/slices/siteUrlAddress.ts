import { createSlice,PayloadAction  } from "@reduxjs/toolkit";

interface siteUrlAddressState {
  value: string | null;
}

const initialState: siteUrlAddressState = {
  value: null,
};

const siteUrlAddressSlice = createSlice({
  name: "siteUrlAddress",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
        state.value = action.payload;
      },
      clearAddress: (state) => {
        state.value = null;
      },
  },
});

export const { setAddress, clearAddress } = siteUrlAddressSlice.actions;
export default siteUrlAddressSlice.reducer;
