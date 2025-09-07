'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetTotalFactor = (dataToSend: any) => {
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [errorPrice, setErrorPrice] = useState<string | null>(null);
  const [price, setPrice] = useState<any>(null);

  useEffect(() => {

    if (!dataToSend) return;

  const getPrice = async () => {
    setLoadingPrice(true);
    setErrorPrice(null);

    try {
      const res = await axios.post(
        "/api/totalFactor",
        { ...dataToSend }
      );

      setPrice(res?.data?.Data?.details || []);
    } catch (err: any) {
        setErrorPrice(
        err.message || "An unknown error occurred in CalcKalaListPrice"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          dataToSend,
          "/api/totalFactor",
          err.message + " , An unknown error occurred in CalcKalaListPrice",
        );
      }
    } finally {
        setLoadingPrice(false);
    }
  };
  getPrice()
}, [dataToSend]);

  return { price, loadingPrice, errorPrice };
};

export default useGetTotalFactor;
