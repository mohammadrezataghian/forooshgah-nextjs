'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetProductDetails = (params:any,selectedItem:any) => {

const GetKala = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/GetKala`

  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [productDetails, setProductDetails] = useState<any>(null);

  useEffect(() => {
  const getProductDetails = async () => {
    setLoadingProducts(true);
    setError(null);

    try {
      const res = await axios.post(
        GetKala,
        params
      );

      setProductDetails(res?.data?.Data?.lst || []);
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in GetKala/productSlider"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
            params,
            GetKala,
          err.message + " , An unknown error occurred in GetKala/productSlider",
        );
      }
    } finally {
        setLoadingProducts(false);
    }
  };
  getProductDetails()
}, [selectedItem]);
  return { loadingProducts, error, productDetails };
};

export default useGetProductDetails;