'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetResults = () => {

const activeGetWayOnlinePayment = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/activeGetWayOnlinePayment`

  const [loadingResults, setLoadingResults] = useState(false);
  const [errorResults, setErrorResults] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);

  const getReturnReason = async (token:any) => {
    setLoadingResults(true);
    setErrorResults(null);

    try {
      const res = await axios.get(
        activeGetWayOnlinePayment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResults(res);
      return res
    } catch (err: any) {
        setErrorResults(
        err.message || "An unknown error occurred in activeGetWayOnlinePayment"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          '',
          activeGetWayOnlinePayment,
          err.message + " , An unknown error occurred in activeGetWayOnlinePayment",
          token
        );
      }
    } finally {
        setLoadingResults(false);
    }
  };

  return { results, loadingResults, errorResults,getReturnReason };
};

export default useGetResults;