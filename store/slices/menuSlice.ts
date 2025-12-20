import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuResponse } from '@/types/types';

interface menuDataState {
    value: MenuResponse | null;
}

const initialState: menuDataState = {
    value: null,
};

const menuDataSlice = createSlice({
    name: "menuData",
    initialState,
    reducers: {
      setMenuData: (state, action: PayloadAction<MenuResponse | null>) => {
        state.value = action.payload;
      },
      clearMenuData: (state) => {
        state.value = null;
      },
    },
});

export const { setMenuData, clearMenuData } = menuDataSlice.actions;
export default menuDataSlice.reducer;