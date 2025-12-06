import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/types";

const getInitialState = (): Product[] => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("products");
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
    return [];
  };

interface ProductListUpdateState {
    value: Product[];
}

const initialState: ProductListUpdateState = {
    value: getInitialState(),
};

const productListUpdateSlice = createSlice({
    name: "productListUpdate",
    initialState,
    reducers: {
      setProductListUpdate: (state, action: PayloadAction<Product[]>) => {
        state.value = action.payload;
      },
      clearProductListUpdate: (state) => {
        state.value = [];
      },
    },
});

export const { setProductListUpdate, clearProductListUpdate } = productListUpdateSlice.actions;
export default productListUpdateSlice.reducer;