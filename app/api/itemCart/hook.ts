'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetCartBalance = (params:any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<any>(null);

  useEffect(() => {

    if (!params) return;

  const getBalance = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "/api/itemCart",
        { ...params },
      );

      setBalance(res?.data?.Data || []);
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in CheckBasketKalamojodi"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
            params,
          "/api/itemCart",
          err.message + " , An unknown error occurred in CheckBasketKalamojodi",
        );
      }
    } finally {
      setLoading(false);
    }
  };
}, []);

  return { balance, loading, error };
};

export default useGetCartBalance;
