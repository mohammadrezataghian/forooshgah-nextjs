'use client'

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { productListBrands } from "@/shared/forBrands";

const useBrands = () => {

// get data 
  const [brandsData,setBrandsData] = useAtom(productListBrands);
  const mainData = brandsData;
  const [products, setProducts] = useState([]);
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