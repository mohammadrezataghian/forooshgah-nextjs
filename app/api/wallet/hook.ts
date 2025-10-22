'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetWalletMoney = (userToken: string | null) => {

const getWalletMoney = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getWalletMoney`

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const getWallet = async (data: any) => {

    if (!userToken) return
    
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        getWalletMoney,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResponse(res);
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in getWalletMoney"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          getWalletMoney,
          err.message + " , An unknown error occurred in getWalletMoney",
          userToken
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, response, getWallet };
};

export default useGetWalletMoney;
