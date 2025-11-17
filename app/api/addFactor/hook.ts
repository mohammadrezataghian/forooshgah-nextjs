'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetAddFactor = () => {

const AddFactor = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/AddFactor`

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const getAddFactor = async (factorInfo:any,tokenInput:any) => {
    setLoading(true);
    setError(null);
    if(!tokenInput) return
    try {
      const res = await axios.post(
        AddFactor,
        factorInfo,
        {
          headers: {
            Authorization: `Bearer ${tokenInput}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResult(res);
      return res
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in AddFactor"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          factorInfo,
          AddFactor,
          err.message + " , An unknown error occurred in AddFactor",
          tokenInput
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error,getAddFactor };
};

export default useGetAddFactor;
