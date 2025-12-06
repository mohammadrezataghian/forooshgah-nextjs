import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface clubScoreState {
    value: null | number;
}

const initialState: clubScoreState = {
    value: null,
};

const clubScoreSlice = createSlice({
    name: "clubScore",
    initialState,
    reducers: {
      setClubScore: (state, action: PayloadAction<null | number>) => {
        state.value = action.payload;
      },
      clearClubScore: (state) => {
        state.value = null;
      },
    },
});

export const { setClubScore, clearClubScore } = clubScoreSlice.actions;
export default clubScoreSlice.reducer;