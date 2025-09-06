'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetAddFactor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const getAddFactor = async (factorInfo:any,tokenInput:any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "/api/addFactor", // call YOUR Next.js API route
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
          "/api/addFactor",
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
