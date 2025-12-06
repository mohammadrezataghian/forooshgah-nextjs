import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      setSiteUrlAddress: (state, action: PayloadAction<string | null>) => {
        state.value = action.payload;
      },
      clearSiteUrlAddress: (state) => {
        state.value = null;
      },
    },
});

export const { setSiteUrlAddress, clearSiteUrlAddress } = siteUrlAddressSlice.actions;
export default siteUrlAddressSlice.reducer;