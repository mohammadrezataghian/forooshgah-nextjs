// src/store/productSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  name: string;
  // add other product fields here
}

const getInitialState = (): Product[] => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem("products");
    return storedData ? JSON.parse(storedData) : [];
  }
  return [];
};

const productSlice = createSlice({
  name: "products",
  initialState: getInitialState(),
  reducers: {
    setProducts: (_state, action: PayloadAction<Product[]>) => {
      return action.payload;
    },
    clearProducts: () => {
      return [];
    },
  },
});

export const { setProducts, clearProducts } =
  productSlice.actions;

export default productSlice.reducer;
