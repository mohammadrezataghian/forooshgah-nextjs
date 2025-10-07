'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetResults = () => {
  const [loadingResults, setLoadingResults] = useState(false);
  const [errorResults, setErrorResults] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);

  const getReturnReason = async (token:any) => {
    setLoadingResults(true);
    setErrorResults(null);

    try {
      const res = await axios.get(
        "/api/activeGetWayOnlinePayment",
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
          "/api/activeGetWayOnlinePayment",
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