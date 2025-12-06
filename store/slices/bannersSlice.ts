import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdvertisementResponse } from '@/types/types';

interface bannersState {
    value: AdvertisementResponse | null;
}

const initialState: bannersState = {
    value: null,
};

const bannersSlice = createSlice({
    name: "banners",
    initialState,
    reducers: {
      setBanners: (state, action: PayloadAction<AdvertisementResponse | null>) => {
        state.value = action.payload;
      },
      clearBanners: (state) => {
        state.value = null;
      },
    },
});

export const { setBanners, clearBanners } = bannersSlice.actions;
export default bannersSlice.reducer;