'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetReceipts = (userToken: string | null) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipts, setReceipts] = useState<any>(null);

  const getReceipts = async (params: any) => {

    if (!userToken) return

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "/api/customerOrderList",
        { ...params },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setReceipts(res?.data?.Data || [])
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in CustomerOrderList"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
            params,
          "/api/customerOrderList",
          err.message + " , An unknown error occurred in CustomerOrderList",
          userToken
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { receipts, loading, error,getReceipts };
};

export default useGetReceipts;
