'use client'

import { useEffect, useState } from "react";
import { Product } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const useBrands = () => {

  const brandsData = useSelector((state:RootState)=> state.productListBrands.value)
// get data 
  const mainData = brandsData;
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    setProducts(mainData);
  }, [mainData]);
  // end get data 
 
  //filter gotten data
  const uniqueProducts = Array.from(
    new Map(
      products
        .filter((item:any) => item.NameMark !== "ندارد") // Remove items where NameMark is "ندارد"
        .map((item:any) => [item.NameKala, item]) // Remove duplicates based on NameKala
    ).values()
  );
  // filter gotten data
  
 
  const brands = uniqueProducts.map(item => ({
    id: item.FldIdMark,
    title: item.NameMark,
  }));
  return brands;
}
  export default useBrands;  