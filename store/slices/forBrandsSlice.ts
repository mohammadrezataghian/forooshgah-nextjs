import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from '@/types/types';

interface productListBrandsState {
    value: Product[];
}

const initialState: productListBrandsState = {
    value: [],
};

const productListBrandsSlice = createSlice({
    name: "productListBrands",
    initialState,
    reducers: {
      setproductListBrands: (state, action: PayloadAction<Product[]>) => {
        state.value = action.payload;
      },
      clearproductListBrands: (state) => {
        state.value = [];
      },
    },
});

export const { setproductListBrands, clearproductListBrands } = productListBrandsSlice.actions;
export default productListBrandsSlice.reducer;