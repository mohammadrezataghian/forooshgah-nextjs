'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetReceipts = (userToken: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipts, setReceipts] = useState<any>(null);

  const getReceipts = async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "/api/getFactorInfo",data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setReceipts(res);
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in GetFactorInfo"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          "/api/getFactorInfo",
          err.message + " , An unknown error occurred in GetFactorInfo",
          userToken
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, receipts, getReceipts };
};

export default useGetReceipts;
