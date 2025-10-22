'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetCalcFactor = (state:any,userToken:any) => {

const CalcFactorMarjue = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/CalcFactorMarjue`

  const [sumLoading,setSumLoading] = useState(false);
  const [sumError,setSumError] = useState<string | null>(null);
  const [sumResponse,setSumResponse] = useState<any>(null);


  useEffect(() => {
  const getCalcFactor = async () => {
    setSumLoading(true);
    setSumError(null);

    try {
      const res = await axios.post(
        CalcFactorMarjue,
        {...state,},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSumResponse(res.data.Data);
    } catch (err: any) {
        setSumError(
        err.message || "An unknown error occurred in CalcFactorMarjue"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          {...state,},
          CalcFactorMarjue,
          err.message + " , An unknown error occurred in CalcFactorMarjue",
          userToken
        );
      }
    } finally {
        setSumLoading(false);
    }
  };
  getCalcFactor();
  }, []);

  return { sumResponse, sumLoading, sumError };
};

export default useGetCalcFactor;
