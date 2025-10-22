'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetStocks = (userToken: string | null) => {

const SahamListPerson = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/SahamListPerson`

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stocks, setStocks] = useState<any>(null);

  const getStocks = async (params: any) => {

    if (!userToken) return

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        SahamListPerson,
        { ...params },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setStocks(res?.data?.Data || []);
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in SahamListPerson"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          params,
          SahamListPerson,
          err.message + " , An unknown error occurred in SahamListPerson",
          userToken
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { stocks, loading, error,getStocks };
};

export default useGetStocks;
