'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";
import { useAtom } from "jotai";
import { productListBrands } from "@/shared/forBrands";

const useFetchProducts = (setProducts:any,setLoading:any,setTotalCount:any) => {

  const GetKala = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/GetKala`
  
  const [error, setError] = useState<string | null>(null);
  const [checkNamojod,setCheckNamojod] = useState<any>(null);
  const [brandsData,setBrandsData] = useAtom(productListBrands);

  const fetchProducts = async (payload: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        GetKala,payload);

      setProducts(res.data.Data.lst || [])
      setTotalCount(res?.data?.Data?.totalCount)
      setBrandsData(res.data.Data.lst || [])
      setCheckNamojod(res.data.resCode)
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in productList/GetKala"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          payload,
          GetKala,
          err.message + " , An unknown error occurred in productList/GetKala",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { error, fetchProducts,checkNamojod };
};

export default useFetchProducts;
