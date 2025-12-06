import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConfigItem } from "@/types/types";

interface mainConfigState {
    value: ConfigItem[];
}

const initialState: mainConfigState = {
    value: [],
};

const mainConfigSlice = createSlice({
    name: "mainConfig",
    initialState,
    reducers: {
      setMainConfig: (state, action: PayloadAction<ConfigItem[]>) => {
        state.value = action.payload;
      },
      clearMainConfig: (state) => {
        state.value = [];
      },
    },
});

export const { setMainConfig, clearMainConfig } = mainConfigSlice.actions;
export default mainConfigSlice.reducer;