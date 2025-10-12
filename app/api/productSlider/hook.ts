'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetProductDetails = (params:any,selectedItem:any) => {
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [productDetails, setProductDetails] = useState<any>(null);

  useEffect(() => {
  const getProductDetails = async () => {
    setLoadingProducts(true);
    setError(null);

    try {
      const res = await axios.post(
        "/api/productSlider", // call YOUR Next.js API route
        params
      );

      setProductDetails(res?.data?.Data?.lst || []);
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in getSahamPersonScore"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
            params,
          "/api/productSlider",
          err.message + " , An unknown error occurred in getSahamPersonScore",
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