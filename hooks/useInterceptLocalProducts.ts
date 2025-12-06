'use client'

import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function useInterceptLocalProducts() {
  const productList = useSelector((state:RootState)=>state.productListUpdate.value)

  useEffect(() => {
    if (productList) {
      localStorage.setItem("products", JSON.stringify(productList));
    }
  }, [productList]);
  return productList.length;
}
